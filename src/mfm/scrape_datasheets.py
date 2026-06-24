"""Scrape full datasheet info (stats, weapons, abilities) from 40k.app.

For each unit in a faction, fetches the rendered HTML from:
    https://www.40k.app/factions/{faction-slug}/units/{unit-slug}

Parses the structured HTML (Next.js SSR) to extract model stats, weapons,
abilities, and keywords into a clean JSON schema.
"""
from __future__ import annotations

import json
import re
import time
from pathlib import Path
from typing import Any

import requests
from bs4 import BeautifulSoup, Tag

BASE_URL = "https://www.40k.app/factions/{faction}/units/{unit}"
USER_AGENT = "Mozilla/5.0 (compatible; mfm-datasheets/0.1; personal use)"
DELAY = 1.5  # seconds between requests


# ---------------------------------------------------------------------------
# HTML fetching & caching
# ---------------------------------------------------------------------------

def fetch_unit_html(
    faction_slug: str,
    unit_slug: str,
    cache_dir: Path | None = None,
    force: bool = False,
    timeout: int = 30,
) -> str | None:
    """Fetch unit HTML, using cache when available. Returns None on HTTP error."""
    cache_file = None
    if cache_dir:
        cache_file = cache_dir / faction_slug / f"{unit_slug}.html"
        if cache_file.exists() and not force:
            return cache_file.read_text(encoding="utf-8")

    url = BASE_URL.format(faction=faction_slug, unit=unit_slug)
    try:
        resp = requests.get(url, headers={"User-Agent": USER_AGENT}, timeout=timeout)
        resp.raise_for_status()
    except requests.RequestException as e:
        print(f"  ⚠ Failed to fetch {url}: {e}")
        return None

    html = resp.text
    if cache_file:
        cache_file.parent.mkdir(parents=True, exist_ok=True)
        cache_file.write_text(html, encoding="utf-8")
    return html


def name_key_to_slug(name_key: str) -> str:
    """Convert a name_key like 'acolyte hybrids with hand flamers' to URL slug."""
    return name_key.strip().replace(" ", "-")


# ---------------------------------------------------------------------------
# HTML parsing helpers
# ---------------------------------------------------------------------------
# NOTE: BeautifulSoup's class_=lambda receives EACH class string individually,
# NOT the list. So lambdas operate on a single class name string.


def _find_by_class(soup_or_tag, tag_name: str, fragment: str):
    """Find first element whose class contains the fragment."""
    return soup_or_tag.find(tag_name, class_=lambda c: c and fragment in c)


def _find_all_by_class(soup_or_tag, tag_name: str, fragment: str):
    """Find all elements whose class contains the fragment."""
    return soup_or_tag.find_all(tag_name, class_=lambda c: c and fragment in c)


def _find_by_class_endswith(soup_or_tag, tag_name: str, suffix: str):
    """Find first element whose class ends with the suffix."""
    return soup_or_tag.find(tag_name, class_=lambda c: c and c.endswith(suffix))


def _find_all_by_class_endswith(soup_or_tag, tag_name: str, suffix: str):
    """Find all elements whose class ends with the suffix."""
    return soup_or_tag.find_all(tag_name, class_=lambda c: c and c.endswith(suffix))


def _find_section_by_header(soup: BeautifulSoup, header_text: str) -> Tag | None:
    """Find the parent section containing a header with exact text."""
    for el in _find_all_by_class(soup, "div", "header__title"):
        if el.get_text(strip=True) == header_text:
            # header__title is inside a header div, which is inside the section div
            header_div = el.parent
            section = header_div.parent if header_div else None
            return section
    return None


def _find_weapon_divs(section: Tag) -> list[Tag]:
    """Find weapon container divs within a section."""
    weapons = []
    seen = set()
    # A weapon div has class ending with __weapon OR contains __hasKeywords
    # and must contain a __weapon__profile child
    for d in section.find_all("div", class_=True):
        for cls in d["class"]:
            if "Weapons-module" in cls and (cls.endswith("__weapon") or "__hasKeywords" in cls):
                if id(d) not in seen:
                    # Verify it has a profile (not just a sub-element)
                    has_profile = _find_by_class(d, "div", "weapon__profile")
                    if has_profile:
                        seen.add(id(d))
                        weapons.append(d)
                break
    return weapons


# ---------------------------------------------------------------------------
# Main parsing logic
# ---------------------------------------------------------------------------

def parse_datasheet(html: str, name_key: str, faction_slug: str) -> dict[str, Any] | None:
    """Parse a unit datasheet page into structured data."""
    soup = BeautifulSoup(html, "html.parser")

    # Basic info
    unit_name = name_key.replace("-", " ").title()
    # Try to get the actual title from h1
    h1 = soup.find("h1")
    if h1:
        unit_name = h1.get_text(strip=True)

    result: dict[str, Any] = {
        "name": unit_name,
        "name_key": name_key,
        "slug": name_key_to_slug(name_key),
        "models": [],
        "ranged_weapons": [],
        "melee_weapons": [],
        "core_abilities": [],
        "faction_abilities": [],
        "unit_abilities": {},
        "keywords": [],
        "wargear_options": [],
        "wargear_abilities": {},
        "leader_info": None,
        "transport": None,
    }

    # --- Models ---
    result["models"] = _parse_models(soup)

    # --- Ranged weapons ---
    ranged_section = _find_section_by_header(soup, "Ranged weapons")
    if ranged_section:
        result["ranged_weapons"] = _parse_weapons(ranged_section, is_ranged=True)

    # --- Melee weapons ---
    melee_section = _find_section_by_header(soup, "Melee weapons")
    if melee_section:
        result["melee_weapons"] = _parse_weapons(melee_section, is_ranged=False)

    # --- Keywords ---
    keywords_section = _find_section_by_header(soup, "Keywords")
    if keywords_section:
        result["keywords"] = _parse_keyword_list(keywords_section)

    # --- Core abilities ---
    core_section = _find_section_by_header(soup, "Core abilities")
    if core_section:
        result["core_abilities"] = _parse_keyword_list(core_section)

    # --- Faction abilities ---
    faction_section = _find_section_by_header(soup, "Faction abilities")
    if faction_section:
        result["faction_abilities"] = _parse_keyword_list(faction_section)

    # --- Unit abilities ---
    result["unit_abilities"] = _parse_unit_abilities(soup)

    # --- Wargear abilities ---
    result["wargear_abilities"] = _parse_wargear_abilities(soup)

    # --- Wargear options (raw text) ---
    result["wargear_options"] = _parse_wargear_options(soup)

    # --- Leader info ---
    result["leader_info"] = _parse_leader_info(soup)

    # --- Transport ---
    result["transport"] = _parse_transport(soup)

    return result


def _parse_models(soup: BeautifulSoup) -> list[dict]:
    """Parse model stat lines (M, T, SV, W, LD, OC + notes for invuln/FNP)."""
    models = []
    # Model divs have class ending with __model (not __model__xxx)
    model_divs = _find_all_by_class_endswith(soup, "div", "__model")
    # Filter to only Models-module ones (not other __model classes)
    model_divs = [d for d in model_divs
                  if any("Models-module" in c for c in d["class"])]

    for md in model_divs:
        model: dict[str, Any] = {
            "name": "",
            "m": "",
            "t": None,
            "sv": "",
            "invuln": None,
            "fnp": None,
            "w": None,
            "ld": "",
            "oc": None,
        }

        # Name
        name_div = _find_by_class(md, "div", "model__name")
        if name_div:
            # Name text is before the base size span
            base_span = _find_by_class(name_div, "span", "baseSize")
            if base_span:
                # Get text before span
                name_text = ""
                for child in name_div.children:
                    if child == base_span:
                        break
                    if hasattr(child, "get_text"):
                        name_text += child.get_text(strip=True)
                    elif isinstance(child, str):
                        name_text += child.strip()
                model["name"] = name_text.strip()
            else:
                model["name"] = name_div.get_text(strip=True)

        # Notes (FNP, Invulnerable save)
        notes_div = _find_by_class(md, "div", "model__notes")
        if notes_div:
            notes_text = notes_div.get_text(separator=" ", strip=True)
            # Parse "Feel No Pain: X+"
            fnp_match = re.search(r"Feel No Pain:\s*(\d+\+)", notes_text)
            if fnp_match:
                model["fnp"] = fnp_match.group(1)
            # Parse "Invulnerable save: X+"
            inv_match = re.search(r"Invulnerable save:\s*(\d+\+)", notes_text, re.IGNORECASE)
            if inv_match:
                model["invuln"] = inv_match.group(1)

        # Characteristics: M, T, SV, W, LD, OC (6 values in child divs)
        chars_div = _find_by_class(md, "div", "model__characteristics")
        if chars_div:
            stat_divs = chars_div.find_all("div", recursive=False)
            stats = [s.get_text(strip=True) for s in stat_divs]
            if len(stats) >= 6:
                model["m"] = stats[0]
                model["t"] = _to_int_or_str(stats[1])
                model["sv"] = stats[2]
                model["w"] = _to_int_or_str(stats[3])
                model["ld"] = stats[4]
                model["oc"] = _to_int_or_str(stats[5])

        models.append(model)

    return models


def _parse_weapons(section: Tag, is_ranged: bool) -> list[dict]:
    """Parse weapon profiles from a Ranged/Melee weapons section."""
    weapons = []
    weapon_divs = _find_weapon_divs(section)

    for wd in weapon_divs:
        weapon: dict[str, Any] = {}

        # Name (may have ➤ prefix for variant profiles)
        name_div = _find_by_class(wd, "div", "weapon__name")
        name = name_div.get_text(strip=True) if name_div else ""
        # Strip ➤ prefix
        name = name.lstrip("➤").strip()
        weapon["name"] = name

        # Profile stats
        profile_div = _find_by_class(wd, "div", "weapon__profile")
        if profile_div:
            # The range column has a specific class
            range_div = _find_by_class(profile_div, "div", "weapon__range")
            range_text = range_div.get_text(strip=True) if range_div else ""

            # Get all other stat divs (those without weapon__range class)
            stat_values = []
            for child_div in profile_div.find_all("div", recursive=False):
                child_classes = " ".join(child_div.get("class", []))
                if "weapon__range" in child_classes:
                    continue
                stat_values.append(child_div.get_text(strip=True))

            if is_ranged:
                weapon["range"] = range_text
                weapon["a"] = stat_values[0] if len(stat_values) > 0 else ""
                weapon["bs"] = stat_values[1] if len(stat_values) > 1 else ""
                weapon["s"] = _to_int_or_str(stat_values[2]) if len(stat_values) > 2 else ""
                weapon["ap"] = _to_int_or_str(stat_values[3]) if len(stat_values) > 3 else ""
                weapon["d"] = stat_values[4] if len(stat_values) > 4 else ""
            else:
                # Melee: A, WS, S, AP, D (range is "Melee")
                weapon["a"] = stat_values[0] if len(stat_values) > 0 else ""
                weapon["ws"] = stat_values[1] if len(stat_values) > 1 else ""
                weapon["s"] = _to_int_or_str(stat_values[2]) if len(stat_values) > 2 else ""
                weapon["ap"] = _to_int_or_str(stat_values[3]) if len(stat_values) > 3 else ""
                weapon["d"] = stat_values[4] if len(stat_values) > 4 else ""

        # Weapon abilities/keywords (Pistol, Torrent, etc.)
        keywords_div = _find_by_class(wd, "div", "weapon__keywords")
        abilities_list = []
        if keywords_div:
            kw_texts = _find_all_by_class(keywords_div, "div", "keyword__text")
            abilities_list = [k.get_text(strip=True) for k in kw_texts]
        weapon["abilities"] = ", ".join(abilities_list)

        weapons.append(weapon)

    return weapons


def _parse_keyword_list(section: Tag) -> list[str]:
    """Parse a keywords/abilities section into a list of strings."""
    keywords = []
    kw_divs = _find_all_by_class(section, "div", "keyword__text")
    for kd in kw_divs:
        text = kd.get_text(strip=True)
        if text:
            keywords.append(text)
    return keywords


def _parse_unit_abilities(soup: BeautifulSoup) -> dict[str, str]:
    """Parse unit abilities (name -> condensed description)."""
    abilities = {}

    # Find the "Unit abilities" header
    unit_abilities_header = None
    for el in _find_all_by_class(soup, "div", "header__title"):
        if el.get_text(strip=True) == "Unit abilities":
            unit_abilities_header = el
            break

    if not unit_abilities_header:
        return abilities

    # The unit abilities section is the grandparent of the header title
    header_div = unit_abilities_header.parent
    section = header_div.parent if header_div else None

    if not section:
        # Fallback: look for ability divs after the header
        section = soup

    # Find ability containers within/after this section
    # Unit abilities have an ability__name div with descriptive text
    ability_divs = _find_all_by_class(section, "div", "Abilities-module")
    ability_divs = [d for d in ability_divs
                    if any(c.endswith("__ability") for c in d["class"])]

    for ab in ability_divs:
        name_el = _find_by_class(ab, "div", "ability__name")
        if not name_el:
            continue
        name = name_el.get_text(strip=True)
        if not name:
            continue

        # Get description text from the Text-module div
        text_div = _find_by_class(ab, "div", "Text-module")
        if text_div:
            desc = text_div.get_text(separator=" ", strip=True)
            desc = re.sub(r"\s+", " ", desc).strip()
            abilities[name] = desc

    return abilities


def _parse_wargear_abilities(soup: BeautifulSoup) -> dict[str, str]:
    """Parse wargear ability descriptions (e.g., Cult Icon -> description)."""
    wargear = {}

    # Find the "Wargear" header (not "Wargear options")
    wargear_section = None
    for el in _find_all_by_class(soup, "div", "header__title"):
        if el.get_text(strip=True) == "Wargear":
            header_div = el.parent
            wargear_section = header_div.parent if header_div else None
            break

    if not wargear_section:
        return wargear

    # Find ability containers within this section
    ability_divs = [d for d in _find_all_by_class(wargear_section, "div", "Abilities-module")
                    if any(c.endswith("__ability") for c in d["class"])]

    for ab in ability_divs:
        name_el = _find_by_class(ab, "div", "ability__name")
        if not name_el:
            continue
        name = name_el.get_text(strip=True)
        if not name:
            continue

        text_div = _find_by_class(ab, "div", "Text-module")
        if text_div:
            desc = text_div.get_text(separator=" ", strip=True)
            desc = re.sub(r"\s+", " ", desc).strip()
            wargear[name] = desc

    return wargear


def _parse_wargear_options(soup: BeautifulSoup) -> list[str]:
    """Parse wargear options text (the rules for what can be swapped)."""
    options = []
    wargear_options_section = None
    for el in _find_all_by_class(soup, "div", "header__title"):
        if el.get_text(strip=True) == "Wargear options":
            header_div = el.parent
            wargear_options_section = header_div.parent if header_div else None
            break

    if not wargear_options_section:
        return options

    # Get all text divs within the section (each rule is typically in its own text block)
    text_divs = _find_all_by_class(wargear_options_section, "div", "Text-module")
    for td in text_divs:
        text = td.get_text(separator=" ", strip=True)
        text = re.sub(r"\s+", " ", text).strip()
        if text:
            options.append(text)

    # If no Text-module divs found, fall back to getting all direct text content
    if not options:
        full_text = wargear_options_section.get_text(separator="\n", strip=True)
        # Remove the header text itself
        lines = [ln.strip() for ln in full_text.split("\n") if ln.strip() and ln.strip() != "Wargear options"]
        options = lines

    return options


def _parse_leader_info(soup: BeautifulSoup) -> dict | None:
    """Parse leader/led-by/supported-by information."""
    info = None

    ability_divs = [d for d in _find_all_by_class(soup, "div", "Abilities-module")
                    if any(c.endswith("__ability") for c in d["class"])]

    for ab in ability_divs:
        name_el = _find_by_class(ab, "div", "ability__name")
        if not name_el:
            continue
        name = name_el.get_text(strip=True)

        if name == "Led by":
            leaders = []
            for link in ab.find_all("a", href=True):
                leaders.append(link.get_text(strip=True).upper())
            if leaders:
                info = info or {}
                info["led_by"] = leaders
                info["type"] = "bodyguard"

        elif name == "Supported by":
            supports = []
            for link in ab.find_all("a", href=True):
                supports.append(link.get_text(strip=True).upper())
            if supports:
                info = info or {}
                info["supported_by"] = supports

    return info


def _parse_transport(soup: BeautifulSoup) -> str | None:
    """Parse transport capacity if present."""
    transport_section = _find_section_by_header(soup, "Transport")
    if transport_section:
        text_div = _find_by_class(transport_section, "div", "Text-module")
        if text_div:
            return text_div.get_text(separator=" ", strip=True)
    return None


def _to_int_or_str(val: str):
    """Convert to int if possible, otherwise return the string."""
    try:
        return int(val)
    except (ValueError, TypeError):
        return val


# ---------------------------------------------------------------------------
# High-level scraping orchestration
# ---------------------------------------------------------------------------

def scrape_faction(
    faction_slug: str,
    units: list[dict],
    cache_dir: Path | None = None,
    force: bool = False,
    delay: float = DELAY,
) -> list[dict]:
    """Scrape all units for a faction, returning list of datasheet dicts."""
    results = []
    total = len(units)

    for i, unit in enumerate(units, 1):
        name_key = unit["name_key"]
        unit_slug = name_key_to_slug(name_key)
        print(f"  [{i}/{total}] {unit['name']} ({unit_slug})")

        html = fetch_unit_html(faction_slug, unit_slug, cache_dir=cache_dir, force=force)
        if not html:
            print(f"    → skipped (no HTML)")
            continue

        datasheet = parse_datasheet(html, name_key, faction_slug)
        if datasheet:
            results.append(datasheet)
        else:
            print(f"    → parse failed")

        # Respect rate limits (skip delay for cached)
        if cache_dir:
            cache_file = cache_dir / faction_slug / f"{unit_slug}.html"
            if cache_file.exists() and not force:
                continue  # was cached, no delay needed
        if i < total:
            time.sleep(delay)

    return results


def scrape_all_factions(
    data_path: Path,
    out_dir: Path,
    cache_dir: Path | None = None,
    slugs: list[str] | None = None,
    force: bool = False,
) -> None:
    """Scrape datasheets for specified factions (or all) and write JSON."""
    # Load faction data from new.json
    new_data = json.loads(data_path.read_text(encoding="utf-8"))
    all_factions = new_data.get("factions", {})

    target_slugs = slugs if slugs else list(all_factions.keys())

    for faction_slug in target_slugs:
        if faction_slug not in all_factions:
            print(f"⚠ Faction '{faction_slug}' not found in data, skipping")
            continue

        faction = all_factions[faction_slug]
        units = faction.get("units", [])
        print(f"\n{'='*60}")
        print(f"Scraping {faction['name']} ({len(units)} units)")
        print(f"{'='*60}")

        datasheets = scrape_faction(
            faction_slug, units, cache_dir=cache_dir, force=force
        )

        # Write output
        out_dir.mkdir(parents=True, exist_ok=True)
        out_file = out_dir / f"{faction_slug}.json"
        out_file.write_text(
            json.dumps(datasheets, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        print(f"\n✓ Wrote {len(datasheets)} datasheets → {out_file}")


def build_web_datasheets(data_dir: Path, web_dir: Path) -> None:
    """Convert data/datasheets/*.json into web/datasheets/*.js files.
    Skips *-wargear-rules.json files (those use a separate format)."""
    web_dir.mkdir(parents=True, exist_ok=True)

    json_files = [f for f in data_dir.glob("*.json") if not f.name.endswith("-wargear-rules.json")]
    if not json_files:
        print("No datasheet JSON files found in", data_dir)
        return

    for jf in json_files:
        faction_slug = jf.stem
        data = json.loads(jf.read_text(encoding="utf-8"))
        js_content = (
            "window.DATASHEETS = window.DATASHEETS || {};\n"
            f"window.DATASHEETS[{json.dumps(faction_slug)}] = "
            f"{json.dumps(data, ensure_ascii=False)};\n"
        )
        out_file = web_dir / f"{faction_slug}.js"
        out_file.write_text(js_content, encoding="utf-8")
        print(f"  {faction_slug}.js ({len(data)} units)")

    print(f"✓ Built {len(json_files)} web datasheet files → {web_dir}")
