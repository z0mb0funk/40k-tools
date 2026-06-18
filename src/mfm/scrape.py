"""Fetch new-edition faction pages from the live MFM site.

The pages are server-rendered, so a plain HTTP GET returns the full HTML that
parse_html can consume. Raw HTML is cached so re-runs (and diffs) are offline
and reproducible.
"""
from __future__ import annotations

import time
from pathlib import Path

import requests

from .models import Snapshot
from .parse_html import parse_faction_html
from . import normalize as N

BASE_URL = "https://mfm.warhammer-community.com/en/{slug}"
USER_AGENT = "Mozilla/5.0 (compatible; mfm-points-tool/0.1; personal use)"
NEW_VERSION = "v1.0"


def fetch_html(slug: str, cache_dir: Path | None = None,
               timeout: int = 30, force: bool = False) -> str:
    """Return the HTML for a faction page, using the cache when available."""
    cache_file = (cache_dir / f"{slug}.html") if cache_dir else None
    if cache_file and cache_file.exists() and not force:
        return cache_file.read_text(encoding="utf-8")
    resp = requests.get(BASE_URL.format(slug=slug),
                        headers={"User-Agent": USER_AGENT}, timeout=timeout)
    resp.raise_for_status()
    html = resp.text
    if cache_file:
        cache_file.parent.mkdir(parents=True, exist_ok=True)
        cache_file.write_text(html, encoding="utf-8")
    return html


def build_new_snapshot(slugs: list[str] | None = None,
                       cache_dir: Path | None = None,
                       fixtures: dict[str, str] | None = None,
                       force: bool = False, delay: float = 0.5,
                       version: str = NEW_VERSION) -> Snapshot:
    """Build a 'new' Snapshot for the given slugs (default: all factions).

    ``fixtures`` maps slug -> local HTML path, letting you supply an already
    downloaded page (e.g. the saved Genestealer Cults file) instead of fetching.
    """
    slugs = slugs or list(N.FACTION_SLUGS.keys())
    fixtures = fixtures or {}
    snap = Snapshot(source="new", version=version)
    for slug in slugs:
        if slug in fixtures:
            html = Path(fixtures[slug]).read_text(encoding="utf-8")
        else:
            html = fetch_html(slug, cache_dir=cache_dir, force=force)
            if delay:
                time.sleep(delay)
        faction = parse_faction_html(html, slug)
        snap.factions[slug] = faction
    return snap
