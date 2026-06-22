"""Parse a new-edition MFM faction page (server-rendered HTML) into a Faction.

Structure (verified against the live site + saved Genestealer Cults page):

  <h3>UNITS</h3>
    <div class="flex flex-col space-y-1 m-1 ...">          # one per unit
      <div class="... text-xl text-white">UNIT NAME</div>
      <div class="space-y-1">
        <div>YOUR UNIT COSTS</div>                          # or threshold label
        <ul class="leaders ..."><li><span>5 models</span><span>70 pts</span></li>...</ul>
      </div>
      ... (more cost blocks for iterative costs, plus LEADER/WARGEAR sections)
  <h3>DETACHMENTS</h3>
    ... detachment cards each with an ENHANCEMENTS <ul>
"""
from __future__ import annotations

import re

from bs4 import BeautifulSoup, Tag

from .models import CostBlock, CostTier, Enhancement, Faction, Unit, WargearOption, Detachment
from . import normalize as N

UNIT_CARD_CLASSES = {"flex", "flex-col", "space-y-1", "m-1"}
COST_LABELS = ("UNIT COSTS", "UNITS COST")

# React streaming SSR maps deferred content into placeholders via
# $RS("S:x","P:y") -- the hidden <div id="S:x"> content belongs in
# <template id="P:y">. A freshly fetched page needs this resolved; an
# already-rendered (browser-saved) page does not.
_RS_RE = re.compile(r'\$RS\("(S:[^"]+)","(P:[^"]+)"\)')


def _resolve_streaming(soup: BeautifulSoup) -> None:
    """In place: fill <template id="P:*"> placeholders with their resolved
    hidden-div content so the DOM matches what a browser would render."""
    html = str(soup)
    if "$RS(" not in html:
        return
    p_to_s = {p: s for s, p in _RS_RE.findall(html)}
    if not p_to_s:
        return
    hidden = {d.get("id"): d for d in soup.find_all("div", id=re.compile(r"^S:"))}
    for tmpl in soup.find_all("template", id=re.compile(r"^P:")):
        src = hidden.get(p_to_s.get(tmpl.get("id")))
        if src is None:
            continue
        for child in reversed(list(src.contents)):
            tmpl.insert_after(child)
        tmpl.decompose()


def _is_unit_card(tag: Tag) -> bool:
    classes = set(tag.get("class") or [])
    return UNIT_CARD_CLASSES.issubset(classes)


def _title(card: Tag) -> str | None:
    """Card title lives in a .text-xl element (a <div> for units, a <span> for
    detachments)."""
    hdr = card.find(class_="text-xl")
    return hdr.get_text(strip=True) if hdr else None


def _tiers_from_ul(ul: Tag) -> list[CostTier]:
    tiers: list[CostTier] = []
    for li in ul.find_all("li"):
        spans = li.find_all("span")
        if len(spans) >= 2:
            m = N.parse_models(spans[0].get_text(strip=True))
            p = N.parse_points(spans[1].get_text(strip=True))
            if m is not None and p is not None:
                tiers.append(CostTier(models=m, points=p))
    return tiers


def _cost_blocks(card: Tag) -> list[CostBlock]:
    """Collect every labelled cost block in a unit card (handles iterative costs).

    Each cost list is a ``<ul>`` whose immediately-preceding sibling ``<div>`` is
    the label ("YOUR UNIT COSTS", "YOUR 3RD+ UNITS COST", ...). Keying off the
    ``<ul>`` avoids matching the wrapper divs that also contain the label text.
    """
    blocks: list[CostBlock] = []
    for ul in card.find_all("ul"):
        label_div = ul.find_previous_sibling("div")
        if label_div is None:
            continue
        label = label_div.get_text(strip=True)
        if not any(k in label.upper() for k in COST_LABELS):
            continue
        tiers = _tiers_from_ul(ul)
        if tiers:
            blocks.append(CostBlock(threshold=N.normalize_threshold(label), tiers=tiers))
    return blocks


def _is_descendant(ancestor: Tag, node: Tag) -> bool:
    p = node
    while p is not None:
        if p is ancestor:
            return True
        p = p.parent
    return False


def _wargear(card: Tag) -> list[WargearOption]:
    """Parse a unit card's WARGEAR OPTIONS list (name + per-item points)."""
    out: list[WargearOption] = []
    for d in card.find_all("div"):
        if not d.get_text(strip=True).upper().startswith("WARGEAR OPTION"):
            continue
        ul = d.find("ul")               # the list inside this wargear wrapper
        if not ul:
            continue
        for li in ul.find_all("li"):
            spans = li.find_all("span")
            if len(spans) >= 2:
                nm = spans[0].get_text(strip=True)
                pts = N.parse_points(spans[1].get_text(strip=True))
                if nm and pts is not None:
                    out.append(WargearOption(name=nm, points=pts))
        break
    return out


def _attach_info(card: Tag) -> tuple[str | None, list[str]]:
    """Return (attach_type, target unit names) from the card's LEADER/SUPPORT
    section(s). attach_type is 'leader', 'support', or 'leader/support'."""
    types: set[str] = set()
    names: list[str] = []
    for d in card.find_all("div"):
        label = d.get_text(strip=True).upper()
        if label not in ("LEADER", "SUPPORT", "LEADER/SUPPORT", "LEADER / SUPPORT"):
            continue
        if "LEADER" in label:
            types.add("leader")
        if "SUPPORT" in label:
            types.add("support")
        wrapper = d.find_parent("div")
        if wrapper:
            for sp in wrapper.find_all("span", class_="font-bold"):
                txt = sp.get_text(strip=True)
                names.extend(p.strip() for p in txt.split(",") if p.strip())
    if not types:
        return None, []
    attach_type = "leader/support" if {"leader", "support"} <= types else next(iter(types))
    # dedupe targets, preserve order
    seen, uniq = set(), []
    for n in names:
        if n not in seen:
            seen.add(n); uniq.append(n)
    return attach_type, uniq


def _section_cards(soup: BeautifulSoup, header_text: str) -> list[Tag]:
    """Unit/detachment cards that fall under a given <h3> section header."""
    h = soup.find(lambda t: t.name in ("h2", "h3") and
                  t.get_text(strip=True).upper() == header_text.upper())
    if not h:
        return []
    # Cards after this header but before the next h2/h3.
    cards: list[Tag] = []
    for el in h.find_all_next():
        if el.name in ("h2", "h3") and el is not h:
            break
        if el.name == "div" and _is_unit_card(el):
            cards.append(el)
    return cards


def parse_faction_html(html: str, slug: str, name: str | None = None) -> Faction:
    soup = BeautifulSoup(html, "html.parser")
    _resolve_streaming(soup)
    display = name or N.FACTION_SLUGS.get(slug, slug)
    faction = Faction(slug=slug, name=display)

    seen: set[str] = set()
    for card in _section_cards(soup, "UNITS"):
        uname = _title(card)
        if not uname:
            continue
        blocks = _cost_blocks(card)
        if not blocks:
            continue  # a card with no cost block isn't a costed unit
        key = N.name_key(uname)
        if key in seen:
            continue
        seen.add(key)
        attach_type, targets = _attach_info(card)
        # Determine if this is a Character: either it leads other units,
        # or it has the CHARACTER keyword (standalone characters like Knights)
        is_char = bool(targets)
        if not is_char:
            # Check for CHARACTER in the card text (keyword section)
            kw_text = ""
            for kw_div in card.find_all("div", class_=lambda c: c and "keyword" in c.lower()):
                kw_text += kw_div.get_text(" ", strip=True).upper()
            if not kw_text:
                kw_text = card.get_text(" ", strip=True).upper()
            if "CHARACTER" in kw_text.split():
                is_char = True
        faction.units.append(Unit(name=uname, name_key=key, cost_blocks=blocks,
                                   wargear=_wargear(card),
                                   leader_targets=targets,
                                   is_character=is_char,
                                   attach_type=attach_type))

    _parse_detachments(soup, faction)
    return faction


def _parse_detachments(soup: BeautifulSoup, faction: Faction) -> None:
    det_cards = _section_cards(soup, "DETACHMENTS")
    for card in det_cards:
        # Detachment name = the card's title (.text-xl span), if present.
        title = card.find(class_="text-xl")
        det_name = title.get_text(strip=True) if title else None
        if det_name:
            dp = None
            for sp in card.find_all("span"):
                txt = sp.get_text(strip=True)
                if txt.endswith("DP"):
                    dp = N.parse_int(txt)
                    break
            faction.detachments.append(Detachment(name=det_name, dp=dp))
        # Enhancements: an ENHANCEMENTS label followed by a <ul> of name/pts rows.
        for label_div in card.find_all("div"):
            if label_div.get_text(strip=True).upper() != "ENHANCEMENTS":
                continue
            ul = label_div.find_next("ul")
            if not ul or not _is_descendant(card, ul):
                continue
            for li in ul.find_all("li"):
                spans = li.find_all("span")
                if len(spans) >= 2:
                    nm = spans[0].get_text(strip=True)
                    pts = N.parse_points(spans[1].get_text(strip=True))
                    if nm and pts is not None:
                        faction.enhancements.append(Enhancement(
                            name=nm, name_key=N.name_key(nm),
                            points=pts, detachment=det_name,
                            is_upgrade=N.is_upgrade_name(nm)))
