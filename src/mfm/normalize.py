"""Name/threshold/faction normalization.

Old (PDF) and new (HTML) sources differ in casing, punctuation, and faction
labelling. Everything that needs to *match* across editions goes through here.
"""
from __future__ import annotations

import re
import unicodedata

# Canonical faction slugs (from the live site index) -> display names.
FACTION_SLUGS: dict[str, str] = {
    "adepta-sororitas": "Adepta Sororitas",
    "adeptus-custodes": "Adeptus Custodes",
    "adeptus-mechanicus": "Adeptus Mechanicus",
    "aeldari": "Aeldari",
    "astra-militarum": "Astra Militarum",
    "black-templars": "Black Templars",
    "blood-angels": "Blood Angels",
    "chaos-daemons": "Chaos Daemons",
    "chaos-knights": "Chaos Knights",
    "chaos-space-marines": "Chaos Space Marines",
    "chaos-titan-legions": "Chaos Titan Legions",
    "dark-angels": "Dark Angels",
    "death-guard": "Death Guard",
    "deathwatch": "Deathwatch",
    "drukhari": "Drukhari",
    "emperors-children": "Emperor\u2019s Children",
    "genestealer-cults": "Genestealer Cults",
    "grey-knights": "Grey Knights",
    "imperial-agents": "Imperial Agents",
    "imperial-knights": "Imperial Knights",
    "leagues-of-votann": "Leagues of Votann",
    "necrons": "Necrons",
    "orks": "Orks",
    "space-marines": "Space Marines",
    "space-wolves": "Space Wolves",
    "tau-empire": "T\u2019au Empire",
    "thousand-sons": "Thousand Sons",
    "titan-legions": "Titan Legions",
    "tyranids": "Tyranids",
    "world-eaters": "World Eaters",
}


def _ascii_fold(text: str) -> str:
    """Replace curly quotes and accents with plain ASCII."""
    text = text.replace("\u2019", "'").replace("\u2018", "'")
    text = text.replace("\u201c", '"').replace("\u201d", '"')
    nfkd = unicodedata.normalize("NFKD", text)
    return "".join(c for c in nfkd if not unicodedata.combining(c))


def name_key(name: str) -> str:
    """Canonical key for matching unit/enhancement names across editions.

    Lowercase, ASCII-folded, apostrophes/punctuation stripped, whitespace
    collapsed. "Emperor\u2019s Children" and "EMPERORS CHILDREN" both ->
    "emperors children".
    """
    s = _ascii_fold(name).lower()
    s = s.replace("'", "")
    s = re.sub(r"[^a-z0-9]+", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def faction_key_from_header(header: str) -> str | None:
    """Map a PDF page header (e.g. "CODEX: GENESTEALER CULTS") to a slug.

    Returns None when the header is not a recognized faction (Legends/Forge
    World index pages, "UNALIGNED FORCES", etc.), so callers can flag it.
    """
    h = _ascii_fold(header).upper()
    h = re.sub(r"^(CODEX\s+SUPPLEMENT|CODEX|INDEX)\s*:?\s*", "", h).strip()
    h = re.sub(r"\s+", " ", h)
    target = name_key(h)
    for slug, disp in FACTION_SLUGS.items():
        if name_key(disp) == target:
            return slug
    # A few headers the PDF uses that differ from the display name.
    aliases = {
        "astra militarum": "astra-militarum",
        "adeptus astra telepathica": None,
    }
    return aliases.get(target)


def normalize_threshold(label: str) -> str:
    """Map a 'YOUR ... COSTS' label to a short threshold key.

    "YOUR UNIT COSTS"            -> "default"
    "YOUR 1ST TO 2ND UNITS COST" -> "1st to 2nd"
    "YOUR 3RD+ UNITS COST"       -> "3rd+"
    "YOUR 1ST UNIT COSTS"        -> "1st"
    "YOUR 2ND+ UNITS COST"       -> "2nd+"
    """
    s = _ascii_fold(label).lower().strip()
    m = re.search(r"your\s+(.*?)\s+units?\s+costs?", s)
    if not m:
        return "default"
    mid = m.group(1).strip()
    mid = re.sub(r"\s*\+\s*", "+", mid)
    mid = re.sub(r"\s+", " ", mid)
    return "default" if not mid else mid


def threshold_range(threshold: str) -> tuple[int, int | None]:
    """Ordinal range a cost block applies to, as (lo, hi); hi=None means open.

    "default"     -> (1, None)   every copy
    "1st to 2nd"  -> (1, 2)
    "3rd+"        -> (3, None)
    "2nd+"        -> (2, None)
    "1st"         -> (1, 1)
    """
    t = (threshold or "").lower().strip()
    if not t or t == "default":
        return (1, None)
    nums = [int(n) for n in re.findall(r"(\d+)", t)]
    has_plus = "+" in t
    if "to" in t and len(nums) >= 2:
        return (nums[0], nums[1])
    if nums:
        lo = nums[0]
        return (lo, None) if has_plus else (lo, lo)
    return (1, None)


_INT_RE = re.compile(r"(\d[\d,]*)")


# New-edition factions that were Space Marine *supplements* in the old edition.
# Their pages list mostly chapter-specific units, so for comparison they fall
# back to the shared vanilla Space Marines list for any unit not in the
# chapter's own (supplement) entry.
FACTION_PARENTS: dict[str, str] = {
    "black-templars": "space-marines",
    "blood-angels": "space-marines",
    "dark-angels": "space-marines",
}


def parse_int(text: str) -> int | None:
    """First integer in the text, tolerating thousands separators ('2,100')."""
    m = _INT_RE.search(text or "")
    return int(m.group(1).replace(",", "")) if m else None


def parse_models(text: str) -> int | None:
    """'5 models' / '1 model' -> int."""
    return parse_int(text)


def parse_points(text: str) -> int | None:
    """'130 pts' -> 130."""
    return parse_int(text)


def is_upgrade_name(name: str) -> bool:
    """MFM tags unit upgrades with a '(Upgrade)' suffix in the enhancement list."""
    return "(upgrade)" in (name or "").lower()
