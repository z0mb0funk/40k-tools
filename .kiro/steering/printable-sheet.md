---
inclusion: manual
---

# Printable Army Reference Sheet

How to generate a one-page printable quick-reference sheet for a 40k army list.

## What it is

A single landscape HTML page containing:
- Unit stat blocks (M/T/SV/Inv/FNP/W/LD/OC) with condensed abilities
- Weapon profiles (ranged in purple, melee in green)
- Detachment rules sidebar (right column)
- Stratagems grid (below the table)

Designed to print on one landscape page with background colors enabled.

## How to generate

1. Edit `generate_sheet.py` in the repo root with the army list data.
2. Run `python3 generate_sheet.py` — outputs `list_sheet.html`.
3. Open in browser, Cmd+P, set Landscape, check "Background graphics", adjust scale.

## Where to get unit data

- **Datasheets (stats + weapons):** https://www.40k.app/factions/{faction-slug}/units/{unit-slug}
  - Example: https://www.40k.app/factions/genestealer-cults/units/aberrants
  - Contains: M, T, SV, W, LD, OC, invuln/FNP, weapon profiles (A/BS/S/AP/D), abilities
- **Wahapedia (backup):** https://wahapedia.ru/wh40k10ed/factions/{faction-slug}/{UnitName}
  - Note: may not render via fetch tools; 40k.app is more reliable for scraping

## Where to get detachment rules / stratagems

- **Faction Packs (official):** Download PDFs from https://www.warhammer-community.com/en-gb/downloads/warhammer-40000/
- **40k.app detachment pages:** https://www.40k.app/factions/{faction-slug}/detachments/{detachment-slug}

## Where to get disposition pairings

- Already stored in `data/dispositions.json` (266 detachments across 28 factions)
- Original source:
  - Xenos: https://www.warhammer-community.com/en-gb/articles/fchkklcq/new40k-download-new-xenos-faction-packs-today/
  - Imperial: https://www.warhammer-community.com/en-gb/articles/8nrrdlgr/new40k-download-new-imperial-faction-packs-today/
  - Chaos: https://www.warhammer-community.com/en-gb/articles/2wzoc1fz/new40k-download-new-chaos-faction-packs-today/
  - Space Marines: https://www.warhammer-community.com/en-gb/articles/2ekfivpk/new40k-download-new-space-marine-faction-packs-today/

## Key conventions

- **De-duplicate units:** If the same unit appears multiple times in a list, only show its stats/weapons once on the sheet. The sheet is a reference, not a roster.
- **Condense abilities:** Use shorthand (DS = Deep Strike, FNP = Feel No Pain, lone op = Lone Operative, etc.)
- **Leader/support stats:** Show the character's stat line and weapons as sub-rows under the parent unit block.
- **Enhancement effects:** Note stat modifications inline (e.g., "Biomorph: +1AP +1D on claws" means the Patriarch row shows AP-3, D3 instead of base values).
- **Sizing:** Scale font sizes up when fewer unique units allow more space. The sheet should fill the page.

## Print settings (Chrome)

- Layout: Landscape
- Scale: Custom (80-100% depending on content density)
- More Settings → Background graphics: ON
- Margins: Minimum
