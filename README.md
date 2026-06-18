# MFM Tool — Warhammer 40,000 Points Explorer & List Builder

A web tool for Warhammer 40,000 (11th edition) that **compares points changes
across every faction** and provides a **rules-aware list builder**. Built to
solve a real problem: understanding how a points update reshapes the
competitive landscape, and drafting lists with correct, fiddly point costs.

**Live demo:** _add your Amplify URL here_

> Built rapidly through AI-assisted development — see `.kiro/steering/` for the
> architecture and codebase guides that drove the iteration.

## What it does

- **Across-faction comparison** — ranks all factions by average per-unit %
  change (buffs vs nerfs), with net points, counts, and new-wargear flags.
- **Per-faction breakdown** — every unit's old/new cost, iterative repeat-copy
  surcharges, enhancement changes, and new paid wargear.
- **List builder** — drag-and-drop army building with iterative (requisition)
  pricing, wargear, character (leader/support) attachment, enhancements vs
  upgrades with the 4-total / 3-per-upgrade rules, a Detachment Points budget,
  battle-size targets, and save/copy.

## Engineering highlights

- **Resilient ingestion:** parses the previous edition from a multi-column PDF
  (column detection, running-header faction tracking, Legends/supplement
  handling) and the current edition by scraping the live site, including
  resolving React streaming-SSR placeholders.
- **Normalized schema + diff engine:** one data contract powers both the
  comparison and the builder; cross-edition matching handles renamed/split
  factions (e.g. Space Marine chapters) and variable iterative-cost schemes.
- **Zero-backend web app:** vanilla JS, no framework/build step; data is baked
  into a generated `data.js`, so it hosts as a static site for ~$0.

## Data sources

Ingest MFM points from two editions and compare them, per faction and across
the board.

* **New edition (current):** scraped from the live site
  `https://mfm.warhammer-community.com/en/<faction>` (server-rendered HTML).
* **Old edition (previous):** parsed from the previous MFM PDF.

The comparison is built to be **re-runnable**: when a new MFM drops, re-scrape
and re-diff with the same commands.

## Install

```bash
pip install -r requirements.txt
```

## Pipeline

Everything runs through `python -m mfm.cli` (with `src` on `PYTHONPATH`).

### 1. Ingest the old edition (PDF)

```bash
PYTHONPATH=src python -m mfm.cli ingest-old \
  --pdf /path/to/previous_MFM.pdf --out data/old.json --version v4.3
```

Parses the two/three-column PDF, tracks the faction from each page's running
header, and **ignores the Legends / Forge World section** (pages whose header
lacks a `CODEX:` / `INDEX:` prefix).

### 2. Ingest the new edition (live site)

```bash
# all factions, caching raw HTML for reproducibility
PYTHONPATH=src python -m mfm.cli ingest-new --all \
  --cache data/raw --out data/new.json

# use a locally-saved page instead of fetching one faction
PYTHONPATH=src python -m mfm.cli ingest-new --all --cache data/raw \
  --fixture "genestealer-cults=/path/to/saved.html" --out data/new.json
```

The pages use React streaming SSR; the parser resolves the deferred
`<template>` placeholders so fetched pages parse the same as a browser-rendered
save. Iterative ("1st to 2nd" / "3rd+") costs are captured per threshold.

### 3. Compare

```bash
# full report (overview + every faction's changes) to a file
PYTHONPATH=src python -m mfm.cli compare --old data/old.json --new data/new.json \
  --out data/report.md --json data/diff.json

# collective roll-up only
PYTHONPATH=src python -m mfm.cli compare --old data/old.json --new data/new.json --overview

# one faction in detail
PYTHONPATH=src python -m mfm.cli compare --old data/old.json --new data/new.json \
  --faction genestealer-cults
```

## Going forward (web-only)

The PDF is a **one-time baseline** (`old.json`, v4.3). From here on, both sides
of a comparison come from the web:

1. Keep the current `new.json` as your baseline snapshot (optionally rename it,
   e.g. `data/snap-2026-06.json`).
2. When a new MFM drops, re-scrape into a fresh snapshot and diff against the
   previous one:

   ```bash
   PYTHONPATH=src python -m mfm.cli ingest-new --all --cache data/raw --force \
     --out data/snap-LATEST.json --version v1.1
   PYTHONPATH=src python -m mfm.cli compare \
     --old data/snap-2026-06.json --new data/snap-LATEST.json --out data/report.md
   ```

`compare` works on any two snapshots regardless of source, so web-vs-web diffs
need no PDF.

## Visual explorer (web app)

After generating `diff.json` and `new.json`, embed them into the app and open it:

```bash
PYTHONPATH=src python -m mfm.cli build-app \
  --diff data/diff.json --new data/new.json --out web/data.js
# then open web/index.html in a browser (no server needed)
```

`build-app` writes `web/data.js` (data embedded as `window.MFM`), so the page
loads everything via `<script>` tags and works straight from `file://`. The app
has three tabs:

* **Across factions** - sortable roll-up of every faction's changes, colour
  coded (green = cheaper, red = pricier), with a **Wargear** column counting
  units that gained paid wargear. Click a faction to drill in.
* **Faction changes** - per-unit old/new/Δ table including the repeat-copy
  surcharge column, enhancement changes, and a **Wargear** breakdown of each
  unit's paid options (new in 11th — wargear was free in 10th, so these are
  new costs rather than deltas).
* **List builder** - pick a faction, then:
  * Add units (drag into the list or click +), each with its own squad-size
    selector. Iterative-cost units auto-charge the repeat-copy price from the
    correct copy onward - the **3rd** for GSC (`3rd+`) or the **2nd** for Chaos
    Knights (`2nd+`); the tier label is shown on the unit.
  * **Wargear** options appear per unit with +/- steppers and add their
    per-item cost to the running total.
  * **Attach characters** by dragging a character onto a unit it can lead
    (validated against the unit's LEADER/SUPPORT target list); the character
    nests under the unit. Characters are badged **Leader** (gold), **Support**
    (blue), or **Ldr/Sup** so you can tell the ability apart at a glance.
  * **Enhancements** attach by dragging onto a character (its slot or row);
    one per character.
  Running total shows points, unit count and model count.
  * **Battle size** target (Combat Patrol/Incursion/Strike Force/Onslaught)
    with a live **remaining** readout that turns red when you go over.
  * **Enhancements** (characters) and **Upgrades** (non-character units) are
    listed separately. Drag an enhancement onto a character, or an upgrade onto
    a unit (the MFM marks upgrades with a "(Upgrade)" suffix). The builder
    enforces the 11th-ed limits: **4 enhancement/upgrade selections total**, an
    enhancement is unique (once each), and a single upgrade may be applied to
    **up to 3 units** (counting as one selection). A `selections X/4` counter
    is shown.
  * **Detachments** are selectable up to a **Detachment Points (DP)** budget
    (default 3). Each detachment shows its DP cost (parsed from the MFM site,
    e.g. Biosanctic Broodsurge 2DP + Xenocult Masses 1DP = 3DP); adding one that
    would exceed the budget is blocked. The enhancement list pools across all
    selected detachments.
  * **Save / load** lists to the browser (localStorage), and **Copy** the list
    as plain text for sharing.

If your browser blocks local `<script>` loading, serve the folder instead:
`python3 -m http.server -d web 8000` then visit `http://localhost:8000`.

## Metrics

The roll-up reports several per-faction measures (all compare a unit's **base
tier** = lowest model count, across editions):

* **Avg %** - mean per-unit percentage change. Best single "did this faction get
  cheaper or pricier" signal; normalizes a +5 on a 45pt model vs a 300pt tank.
  The roll-up is ranked by this.
* **Net pts** - raw sum of per-unit point deltas. Useful but dominated by big
  models and by how many units a faction has; not a "list feel" number.
* **Avg pts / median** - mean and median per-unit point change.
* **Cheaper / Pricier / Same / Added / Removed** counts - the clearest read of
  how broadly a faction moved.

## Space Marine chapters

The new edition splits Black Templars, Blood Angels and Dark Angels into their
own factions. In the old PDF these were `CODEX SUPPLEMENT:` pages; the PDF
parser now reads them as `black-templars` / `blood-angels` / `dark-angels`.
For comparison each chapter falls back to the shared vanilla `space-marines`
list (see `FACTION_PARENTS` in `normalize.py`) for any unit not in its own
supplement entry, without surfacing the ~90 vanilla units the chapter page
doesn't list as "removed". Space Wolves and Deathwatch were already standalone
sections in the old PDF.

## Layout

```
src/mfm/
  models.py      normalized schema (Snapshot/Faction/Unit/CostBlock/...)
  normalize.py   name keys, faction slug/alias map, threshold parsing
  parse_html.py  new-edition HTML parser (+ streaming-placeholder resolver)
  parse_pdf.py   old-edition PDF parser (column detection, faction tracking)
  scrape.py      live fetch + HTML cache
  diff.py        snapshot comparison
  report.py      Markdown rendering
  cli.py         ingest-old / ingest-new / compare
data/
  raw/           cached faction HTML
  old.json new.json diff.json report.md
```

## Known limitations

* Faction taxonomy differs between editions. Titan Legions and Chaos Titan
  Legions have no old-codex match (they lived in the old Legends/Forge World
  pages, which are intentionally skipped) and are listed as "only in new".
* Enhancement matching is by normalized name. Renames/hyphenation changes
  (e.g. "Firepoint Commander" -> "Fire-point Commander") surface as an
  add + remove pair rather than a delta.
* Base-tier delta is the headline per-unit number; a change to only a larger
  tier (e.g. the 10-model price) shows Δ 0 there but appears in the per-unit
  tier columns.
* Detachment names are captured best-effort from the PDF (they carry no points
  in the old edition, so they don't affect the points diff).
* The builder treats any unit with a LEADER/SUPPORT target list as a
  "character" eligible for enhancements; upgrades may be dropped on any
  non-character unit. The MFM points data does not record which specific units
  a given upgrade is legal on, so unit-level upgrade eligibility is not
  validated (the 4-total and 3-per-upgrade caps are).
