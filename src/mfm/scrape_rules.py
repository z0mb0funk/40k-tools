"""Scrape army rules and detachment rules/enhancements/stratagems from 40k.app.

For each faction, fetches:
    https://www.40k.app/factions/{faction-slug}/army-rules
    https://www.40k.app/factions/{faction-slug}/detachments/{detachment-slug}

Parses the rendered text to extract structured data.
"""
from __future__ import annotations

import json
import re
import time
from pathlib import Path
from typing import Any

import requests
from bs4 import BeautifulSoup

ARMY_RULES_URL = "https://www.40k.app/factions/{faction}/army-rules"
DETACHMENT_URL = "https://www.40k.app/factions/{faction}/detachments/{detachment}"
USER_AGENT = "Mozilla/5.0 (compatible; mfm-datasheets/0.1; personal use)"
DELAY = 1.5  # seconds between requests


# ---------------------------------------------------------------------------
# Slug helpers
# ---------------------------------------------------------------------------

def detachment_name_to_slug(name: str) -> str:
    """Convert a detachment name like 'BIOSANCTIC BROODSURGE' to URL slug."""
    slug = name.lower().strip()
    slug = re.sub(r"[^a-z0-9\s-]", "", slug)
    slug = re.sub(r"\s+", "-", slug)
    return slug


# ---------------------------------------------------------------------------
# HTML fetching & caching
# ---------------------------------------------------------------------------

def _fetch_html(
    url: str,
    cache_file: Path | None = None,
    force: bool = False,
    timeout: int = 30,
) -> str | None:
    """Fetch HTML from url, using cache when available. Returns None on error."""
    if cache_file and cache_file.exists() and not force:
        return cache_file.read_text(encoding="utf-8")

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


def fetch_army_rules_html(
    faction_slug: str,
    cache_dir: Path | None = None,
    force: bool = False,
) -> str | None:
    """Fetch the army rules page for a faction."""
    cache_file = None
    if cache_dir:
        cache_file = cache_dir / faction_slug / "army-rules.html"
    url = ARMY_RULES_URL.format(faction=faction_slug)
    return _fetch_html(url, cache_file=cache_file, force=force)


def fetch_detachment_html(
    faction_slug: str,
    detachment_slug: str,
    cache_dir: Path | None = None,
    force: bool = False,
) -> str | None:
    """Fetch the detachment page for a faction/detachment."""
    cache_file = None
    if cache_dir:
        cache_file = cache_dir / faction_slug / "detachments" / f"{detachment_slug}.html"
    url = DETACHMENT_URL.format(faction=faction_slug, detachment=detachment_slug)
    return _fetch_html(url, cache_file=cache_file, force=force)


# ---------------------------------------------------------------------------
# Parsing: Army Rules
# ---------------------------------------------------------------------------

def parse_army_rules(html: str) -> list[dict[str, str]]:
    """Parse army rules from the army-rules page HTML.

    The page uses sections with h2 titles and Text-module content divs.
    """
    soup = BeautifulSoup(html, "html.parser")
    rules: list[dict[str, str]] = []

    # Each rule is in a <section> with a header containing an h2 title
    sections = soup.find_all("section")
    for section in sections:
        h2 = section.find("h2")
        if not h2:
            continue
        name = h2.get_text(strip=True)
        if not name:
            continue
        # Skip navigation sections (Enhancements, Stratagems)
        if name.upper() in ("ENHANCEMENTS", "STRATAGEMS"):
            continue

        # Get the description from Text-module divs within this section
        text_divs = section.find_all(
            "div", class_=lambda c: c and "Text-module" in c
        )
        desc_parts = []
        for td in text_divs:
            # Use separator=" " to avoid newlines around <strong> tags
            text = td.get_text(separator=" ", strip=True)
            text = re.sub(r"\s+", " ", text).strip()
            if text:
                desc_parts.append(text)

        # Also grab any tables or sub-sections as part of the rule
        # Get all sibling sections that don't have h2 (they're sub-content)
        parent = section.parent
        if parent:
            all_sections = parent.find_all("section", recursive=False)
            found_self = False
            for sib in all_sections:
                if sib is section:
                    found_self = True
                    continue
                if found_self:
                    sib_h2 = sib.find("h2")
                    if sib_h2:
                        break  # hit next major section
                    # This sub-section is part of the current rule
                    sib_text = sib.get_text(separator=" ", strip=True)
                    sib_text = re.sub(r"\s+", " ", sib_text).strip()
                    if sib_text:
                        desc_parts.append(sib_text)

        description = "\n\n".join(desc_parts).strip()
        if description:
            rules.append({"name": name, "description": description})

    return rules


# ---------------------------------------------------------------------------
# Parsing: Detachment page
# ---------------------------------------------------------------------------

def parse_detachment(html: str, detachment_name: str, dp: int = 0) -> dict[str, Any]:
    """Parse a detachment page into structured data.

    The page structure is:
    - Hero header with DP, disposition, keyword
    - Sections with h2 titles: detachment rule name, "Enhancements", "Stratagems"
    - Enhancements are <article> elements with Enhancement-module classes
    - Stratagems are divs with Stratagem-module classes
    """
    soup = BeautifulSoup(html, "html.parser")

    result: dict[str, Any] = {
        "name": detachment_name,
        "dp": dp,
        "disposition": "",
        "detachment_rule": {"name": "", "description": ""},
        "enhancements": [],
        "stratagems": [],
    }

    # --- Extract disposition from hero content ---
    hero_content = soup.find(
        "div", class_=lambda c: c and "hero__content" in c
    )
    if hero_content:
        text = hero_content.get_text(separator=" ", strip=True)
        result["disposition"] = _extract_disposition(text)

    # --- Parse sections ---
    sections = soup.find_all("section")
    for section in sections:
        h2 = section.find("h2")
        if not h2:
            continue
        title = h2.get_text(strip=True)

        if title.upper() == "ENHANCEMENTS":
            result["enhancements"] = _parse_enhancements_html(section)
        elif title.upper() == "STRATAGEMS":
            result["stratagems"] = _parse_stratagems_html(section)
        else:
            # This is the detachment rule
            text_divs = section.find_all(
                "div", class_=lambda c: c and "Text-module" in c
            )
            desc_parts = []
            for td in text_divs:
                text = td.get_text(separator=" ", strip=True)
                text = re.sub(r"\s+", " ", text).strip()
                if text:
                    desc_parts.append(text)
            description = "\n\n".join(desc_parts).strip()
            if description and not result["detachment_rule"]["name"]:
                result["detachment_rule"] = {
                    "name": title,
                    "description": description,
                }

    return result


def _extract_disposition(text: str) -> str:
    """Extract the disposition from the hero header text."""
    dispositions = [
        "Take and Hold", "Purge the Foe", "Priority Assets",
        "Reconnaissance", "Disruption", "Search and Destroy",
    ]
    for disp in dispositions:
        if disp in text:
            return disp
    return ""


def _parse_enhancements_html(section) -> list[dict]:
    """Parse enhancements from the Enhancements section using HTML structure.

    Each enhancement is an <article> with:
    - Enhancement__name div
    - Enhancement__price div (contains "XX pts")
    - Text-module div with description (may contain restriction as bold text)
    """
    enhancements: list[dict] = []

    articles = section.find_all("article")
    for article in articles:
        name_div = article.find(
            "div", class_=lambda c: c and "enhancement__name" in c
        )
        price_div = article.find(
            "div", class_=lambda c: c and "enhancement__price" in c
        )
        text_div = article.find(
            "div", class_=lambda c: c and "Text-module" in c
        )

        name = name_div.get_text(strip=True) if name_div else ""
        points = 0
        if price_div:
            pts_match = re.search(r"(\d+)", price_div.get_text(strip=True))
            if pts_match:
                points = int(pts_match.group(1))

        # Parse restriction and description from text div
        restriction = ""
        description = ""
        if text_div:
            full_text = text_div.get_text(separator=" ", strip=True)
            full_text = re.sub(r"\s+", " ", full_text).strip()

            # Check if restriction is embedded as first sentence (ends with "only.")
            only_match = re.match(r"^(.+?only\.)\s*(.*)$", full_text, re.IGNORECASE)
            if only_match:
                restriction = only_match.group(1).strip()
                description = only_match.group(2).strip()
            else:
                description = full_text

        enhancements.append({
            "name": name,
            "points": points,
            "restriction": restriction,
            "description": description,
        })

    return enhancements


def _parse_stratagems_html(section) -> list[dict]:
    """Parse stratagems from the Stratagems section using HTML structure.

    Each stratagem is a div with Stratagem-module classes containing:
    - stratagem__name div
    - stratagem__misc div (phase - type)
    - stratagem__main divs with <span> (field name) and <p> (field value)
    - stratagem__cost div (CP number)
    """
    stratagems: list[dict] = []

    strat_divs = section.find_all(
        "div", class_=lambda c: c and "stratagem__content" in c
    )

    for strat_div in strat_divs:
        name_div = strat_div.find(
            "div", class_=lambda c: c and "stratagem__name" in c
        )
        misc_div = strat_div.find(
            "div", class_=lambda c: c and "stratagem__misc" in c
        )

        name = name_div.get_text(strip=True) if name_div else ""

        # Parse phase and type from misc (e.g., "Any Phase - Strategic Ploy")
        phase = ""
        strat_type = ""
        if misc_div:
            misc_text = misc_div.get_text(separator=" ", strip=True)
            # Split on " - " to get phase and type
            parts = re.split(r"\s*[-–]\s*", misc_text, maxsplit=1)
            if len(parts) == 2:
                phase = parts[0].strip()
                strat_type = parts[1].strip()
            elif parts:
                phase = parts[0].strip()

        # Parse main fields (Target, When, Effect)
        when = ""
        target = ""
        effect = ""
        main_divs = strat_div.find_all(
            "div", class_=lambda c: c and "stratagem__main" in c
        )
        for main_div in main_divs:
            span = main_div.find("span")
            if not span:
                continue
            field_name = span.get_text(strip=True).lower()
            # Get the text after the span (in the <p> tag)
            p = main_div.find("p")
            field_value = p.get_text(separator=" ", strip=True) if p else ""

            if field_name == "when":
                when = field_value
            elif field_name == "target":
                target = field_value
            elif field_name == "effect":
                effect = field_value

        # Parse CP cost from sibling aside div
        cost = ""
        # The cost is in a sibling div (stratagem__aside > stratagem__cost)
        parent = strat_div.parent
        if parent:
            cost_div = parent.find(
                "div", class_=lambda c: c and "stratagem__cost" in c
            )
            if cost_div:
                cost_num = cost_div.get_text(strip=True)
                if cost_num.isdigit():
                    cost = f"{cost_num} CP"

        stratagems.append({
            "name": name,
            "cost": cost,
            "phase": phase,
            "type": strat_type,
            "when": when,
            "target": target,
            "effect": effect,
        })

    return stratagems


# ---------------------------------------------------------------------------
# High-level orchestration
# ---------------------------------------------------------------------------

def scrape_faction_rules(
    faction_slug: str,
    faction_name: str,
    detachments: list[dict],
    cache_dir: Path | None = None,
    force: bool = False,
    delay: float = DELAY,
) -> dict[str, Any]:
    """Scrape all rules for a faction (army rules + all detachments)."""
    result: dict[str, Any] = {
        "faction": faction_name,
        "slug": faction_slug,
        "army_rules": [],
        "detachments": {},
    }

    # --- Army Rules ---
    print(f"  Fetching army rules...")
    html = fetch_army_rules_html(faction_slug, cache_dir=cache_dir, force=force)
    if html:
        result["army_rules"] = parse_army_rules(html)
        print(f"    → {len(result['army_rules'])} army rules found")
    else:
        print(f"    → failed to fetch army rules")

    needs_delay = _needed_delay(cache_dir, faction_slug, "army-rules.html", force)
    if needs_delay:
        time.sleep(delay)

    # --- Detachments ---
    total = len(detachments)
    for i, det in enumerate(detachments, 1):
        det_name = det["name"]
        det_dp = det.get("dp", 0)
        det_slug = detachment_name_to_slug(det_name)
        print(f"  [{i}/{total}] Detachment: {det_name} ({det_slug})")

        html = fetch_detachment_html(
            faction_slug, det_slug, cache_dir=cache_dir, force=force
        )
        if html:
            parsed = parse_detachment(html, det_name, dp=det_dp)
            result["detachments"][det_slug] = parsed
            enh_count = len(parsed.get("enhancements", []))
            strat_count = len(parsed.get("stratagems", []))
            print(f"    → rule: {parsed['detachment_rule']['name']}, "
                  f"{enh_count} enhancements, {strat_count} stratagems")
        else:
            print(f"    → failed to fetch")

        # Rate limit (skip for cached)
        if i < total:
            needs = _needed_delay(
                cache_dir, faction_slug,
                f"detachments/{det_slug}.html", force
            )
            if needs:
                time.sleep(delay)

    return result


def _needed_delay(
    cache_dir: Path | None, faction_slug: str, rel_path: str, force: bool
) -> bool:
    """Return True if we actually made a network request (need delay)."""
    if not cache_dir:
        return True  # no cache means we always fetch
    cache_file = cache_dir / faction_slug / rel_path
    # If file exists and we didn't force, it was served from cache
    if cache_file.exists() and not force:
        return False
    return True


def scrape_all_faction_rules(
    data_path: Path,
    out_dir: Path,
    cache_dir: Path | None = None,
    slugs: list[str] | None = None,
    force: bool = False,
) -> None:
    """Scrape rules for specified factions and write JSON output."""
    new_data = json.loads(data_path.read_text(encoding="utf-8"))
    all_factions = new_data.get("factions", {})

    target_slugs = slugs if slugs else list(all_factions.keys())

    for faction_slug in target_slugs:
        if faction_slug not in all_factions:
            print(f"⚠ Faction '{faction_slug}' not found in data, skipping")
            continue

        faction = all_factions[faction_slug]
        faction_name = faction["name"]
        detachments = faction.get("detachments", [])

        print(f"\n{'='*60}")
        print(f"Scraping rules: {faction_name} ({len(detachments)} detachments)")
        print(f"{'='*60}")

        rules_data = scrape_faction_rules(
            faction_slug=faction_slug,
            faction_name=faction_name,
            detachments=detachments,
            cache_dir=cache_dir,
            force=force,
        )

        # Write output
        out_dir.mkdir(parents=True, exist_ok=True)
        out_file = out_dir / f"{faction_slug}.json"
        out_file.write_text(
            json.dumps(rules_data, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        print(f"\n✓ Wrote rules → {out_file}")


def build_web_rules(data_dir: Path, web_dir: Path) -> None:
    """Convert data/rules/*.json into web/rules/*.js files."""
    web_dir.mkdir(parents=True, exist_ok=True)

    json_files = list(data_dir.glob("*.json"))
    if not json_files:
        print("No rules JSON files found in", data_dir)
        return

    for jf in json_files:
        faction_slug = jf.stem
        data = json.loads(jf.read_text(encoding="utf-8"))
        js_content = (
            "window.FACTION_RULES = window.FACTION_RULES || {};\n"
            f"window.FACTION_RULES[{json.dumps(faction_slug)}] = "
            f"{json.dumps(data, ensure_ascii=False)};\n"
        )
        out_file = web_dir / f"{faction_slug}.js"
        out_file.write_text(js_content, encoding="utf-8")
        print(f"  {faction_slug}.js")

    print(f"✓ Built {len(json_files)} web rules files → {web_dir}")
