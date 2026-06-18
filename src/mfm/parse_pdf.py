"""Parse the previous-edition MFM PDF into per-faction snapshots.

Layout facts (verified against previous_MFM06052026.pdf, v4.3):
  * Each page has a full-width running header band near the top (top < ~100),
    e.g. "CODEX: GENESTEALER CULTS". This sets the current faction.
  * The body is a two-column "newspaper" layout. Reading order is the entire
    left column top-to-bottom, then the entire right column.
  * Entries use dotted leaders: "<name/size> .......... <NN> pts".
  * A "DETACHMENT ENHANCEMENTS" header separates unit costs from the
    detachment/enhancement section.

Old data has no iterative-cost concept, so every unit gets a single "default"
cost block.
"""
from __future__ import annotations

import re

import pdfplumber

from .models import CostBlock, CostTier, Enhancement, Faction, Unit, Snapshot, Detachment
from . import normalize as N

HEADER_MAX_TOP = 132         # covers 2-line supplement headers (chapter on 2nd line)
HEADER_MIN_SIZE = 20         # running-header font is ~32pt; body is ~8pt
BODY_TOP = 104               # body start when a running header is present
BODY_TOP_CONT = 40           # body start on continuation pages (no header)

COST_RE = re.compile(r"^(\d+)\s+models?\b.*?\.{2,}\s*(\d[\d,]*)\s*pts", re.I)
ENH_RE = re.compile(r"^(.*?\S)\s*\.{2,}\s*(\d[\d,]*)\s*pts", re.I)
ENH_HEADER_RE = re.compile(r"ENHANCEMENTS", re.I)
NOISE_RE = re.compile(r"^\s*\d{1,3}\s*$")   # bare page numbers
# Header text that marks a non-faction section (Legends / Forge World / etc.).
# Hitting one of these stops attributing pages to the previous faction.
DIVIDER_RE = re.compile(r"^(INDEX\s*:|WARHAMMER LEGENDS|UNALIGNED|CODEX SUPPLEMENT|MUNITORUM)", re.I)
# Legitimate (current-points) section headers always carry a CODEX:/INDEX:
# prefix. Bare ALL-CAPS faction names mark the Legends / Forge World section,
# which we ignore entirely.
SECTION_PREFIX_RE = re.compile(r"^\s*(CODEX|INDEX)\b", re.I)


def _page_header(page) -> str:
    """The running header, read only from large-font words near the top.

    Continuation pages have no large header, so this returns "" for them
    (letting the caller carry the current faction forward).
    """
    words = [w for w in page.extract_words(extra_attrs=["size"])
             if w["top"] < HEADER_MAX_TOP and w.get("size", 0) >= HEADER_MIN_SIZE]
    words.sort(key=lambda w: (round(w["top"] / 5), w["x0"]))
    return " ".join(w["text"] for w in words).strip()


def _column_bands(page, body_top: float, bin_w: float = 3.0,
                  min_gutter: float = 7.0) -> list[tuple[float, float]]:
    """Detect column x-ranges from a coverage histogram.

    The PDF uses a fixed ~150px column grid (2 or 3 columns per page). We find
    whitespace gutters via coverage, then subdivide any band that is too wide
    (a gutter occasionally gets bridged by a stray glyph) on the fixed grid.
    """
    words = [w for w in page.extract_words() if w["top"] > body_top]
    if not words:
        return [(0.0, page.width)]
    W = page.width
    nbins = int(W / bin_w) + 1
    covered = [False] * nbins
    for w in words:
        a = max(0, int(w["x0"] / bin_w))
        b = min(nbins - 1, int(w["x1"] / bin_w))
        for i in range(a, b + 1):
            covered[i] = True
    raw: list[tuple[float, float]] = []
    start = None
    gap = 0
    for i in range(nbins):
        if covered[i]:
            if start is None:
                start = i * bin_w
            gap = 0
        else:
            gap += 1
            if start is not None and gap * bin_w >= min_gutter:
                raw.append((start, (i - gap + 1) * bin_w))
                start = None
    if start is not None:
        raw.append((start, W))

    bands: list[tuple[float, float]] = []
    for a, b in raw:
        if b - a <= 20:
            continue
        if b - a > 200:                       # a gutter was bridged: subdivide
            n = max(1, round((b - a) / 150.0))
            step = (b - a) / n
            for k in range(n):
                bands.append((a + k * step, a + (k + 1) * step))
        else:
            bands.append((a, b))
    return bands or [(0.0, W)]


def _column_lines(page, x0: float, x1: float, body_top: float) -> list[str]:
    crop = page.crop((max(0, x0 - 1), body_top, min(page.width, x1 + 1), page.height))
    text = crop.extract_text(x_tolerance=1.5) or ""
    return [ln.strip() for ln in text.splitlines() if ln.strip()]


def _ordered_lines(page, body_top: float) -> list[str]:
    """Body lines in reading order: each column top-to-bottom, left to right."""
    lines: list[str] = []
    for x0, x1 in _column_bands(page, body_top):
        lines.extend(_column_lines(page, x0, x1, body_top))
    return lines


class _FactionState:
    """Accumulates parse state for one faction across one or more pages."""

    def __init__(self, faction: Faction):
        self.faction = faction
        self.mode = "unit"            # "unit" | "enh"
        self.cur_unit: Unit | None = None
        self.cur_detachment: str | None = None
        self._unit_keys: set[str] = set()

    def feed(self, lines: list[str]) -> None:
        for raw in lines:
            line = raw.strip()
            if not line or NOISE_RE.match(line):
                continue
            if ENH_HEADER_RE.search(line) and "pts" not in line.lower():
                self.mode = "enh"
                self.cur_detachment = None
                continue

            cost = COST_RE.match(line)
            if cost and self.mode == "unit":
                self._add_tier(int(cost.group(1)), int(cost.group(2).replace(",", "")))
                continue

            if self.mode == "enh":
                m = ENH_RE.match(line)
                if m and not COST_RE.match(line):
                    name = m.group(1).strip()
                    self.faction.enhancements.append(Enhancement(
                        name=name, name_key=N.name_key(name),
                        points=int(m.group(2).replace(",", "")), detachment=self.cur_detachment,
                        is_upgrade=N.is_upgrade_name(name)))
                else:
                    # no-pts line in enhancement mode => detachment group name
                    self.cur_detachment = line
                    if line not in [d.name for d in self.faction.detachments]:
                        self.faction.detachments.append(Detachment(name=line))
                continue

            # unit mode, not a cost line => new unit name
            if not cost:
                self._start_unit(line)

    def _start_unit(self, name: str) -> None:
        key = N.name_key(name)
        if key in self._unit_keys:
            # duplicate header (e.g. continued page) -> reuse existing unit
            self.cur_unit = next((u for u in self.faction.units if u.name_key == key), None)
            return
        unit = Unit(name=name, name_key=key, cost_blocks=[CostBlock("default", [])])
        self.faction.units.append(unit)
        self._unit_keys.add(key)
        self.cur_unit = unit

    def _add_tier(self, models: int, points: int) -> None:
        if self.cur_unit is None:
            return
        self.cur_unit.cost_blocks[0].tiers.append(CostTier(models=models, points=points))


def parse_pdf(path: str, version: str = "v4.3") -> Snapshot:
    snap = Snapshot(source="old", version=version)
    states: dict[str, _FactionState] = {}
    unmapped: set[str] = set()
    current: str | None = None

    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            header = _page_header(page)         # "" on continuation pages
            if header and not SECTION_PREFIX_RE.match(header):
                # Bare-name large-font header => Legends / Forge World section.
                # Ignore it and stop attributing to the previous faction.
                current = None
                unmapped.add(header)
                continue
            slug = N.faction_key_from_header(header) if header else None
            if header and slug is None:
                # A CODEX:/INDEX: header we don't map to a current faction
                # (e.g. "INDEX: ADEPTUS TITANICUS"). Skip and stop attribution.
                current = None
                unmapped.add(header)
                continue
            if slug is not None:
                current = slug
                body_top = BODY_TOP
            else:
                # No running header => continuation of the current faction.
                if current is None:
                    continue
                slug = current
                body_top = BODY_TOP_CONT
            if slug not in states:
                fac = Faction(slug=slug, name=N.FACTION_SLUGS.get(slug, slug))
                snap.factions[slug] = fac
                states[slug] = _FactionState(fac)
            states[slug].feed(_ordered_lines(page, body_top))

    # drop units that never got any tier (stray header text)
    for fac in snap.factions.values():
        fac.units = [u for u in fac.units if u.base_block() and u.base_block().tiers]
    snap.unmapped = sorted(unmapped)
    return snap
