---
inclusion: manual
---

# Warhammer 40,000 11th Edition Missions (Chapter Approved 2025-26)

Reference for the 11th-edition matched-play mission system: Force Dispositions,
the 25 asymmetric Primary missions, the Secondary deck, and Challenger cards.
Captured from web research (June 2026) so we don't have to re-scrape. Sources at
the bottom. This is rules *structure* for analysis/listbuilding, not a reprint of
GW card text.

## The big structural change vs 10th edition

- **Primaries are now asymmetric and chosen by army, not by deck.** Each army
  picks a **Force Disposition** (this is also what `data/dispositions.json`
  tags every detachment with). The mission you actually play is determined by
  **the pairing of your Disposition vs your opponent's Disposition.**
- In an **event**, you lock ONE Disposition for the whole tournament, so you only
  ever play the **5 missions** belonging to that Disposition (one vs each of the
  five possible opponent Dispositions, including the mirror).
- Primary cap **45 VP**, max **15 VP per turn**. Secondary + Challenger sit on top
  (overall cap 90 VP; Challenger adds up to 12 VP in its own pool).
- **5-objective maps = one big central objective. 6-objective maps = the centre is
  split into two smaller objectives.** A single big centre makes the game deadlier
  and faster; split centres are safer/steadier.

## The five Force Dispositions (identity + Goonhammer/TTB strength rating)

| Disposition | One-line identity | Own-mission strength (avg /5) |
|---|---|---|
| **Purge the Foe** | Kill things + hold one objective. Rewards what your army already does. | **3.6** (rated strongest) |
| **Reconnaissance** | Actions + spread to table quarters/flanks + mobile MSU trades. | **3.5** |
| **Priority Assets** | Action-on-objective economy (often centre/enemy territory) + hold + backcap. | **3.3** |
| **Take and Hold** | Pure objective holding. Low mental load, almost no actions/kills. | **2.6** (rated weakest) |
| **Disruption** | Aggressive forward control + terrain actions; **never scores own home**. Most diverse/demanding. | **2.2** (lowest) |

Note on ratings: these are *relative ease of maxing primary in each matchup*, per
Tabletop Battles/Goonhammer's preview reviews — a starting heuristic, not gospel.

## The 25 Primary missions (5x5 matchup grid)

Each cell = the mission name and the **scoring levers for the player of that ROW
disposition** when facing the COLUMN disposition. Mirror = diagonal.

Lever shorthand:
- **HOLD** = control 1+ non-home objective (the universal Command-phase baseline)
- **HOLD2** = bonus for holding 2+/3+ objectives
- **MORE** = control more objectives than opponent ("hold more")
- **CENTRE** = control central objective(s) specifically
- **ENEMYTERR** = bonus for holding objectives in the opponent's territory
- **FLIP** = control an objective you did NOT control at start of turn
- **BACKCAP** = control enemy home objective (usually end of battle)
- **KILL** = destroy 1+ enemy units
- **KILLMORE** = destroy more units than opponent did last turn
- **KILLOBJ** = destroy enemy units that are on/near objectives or terrain
- **QUARTERS** = units in separate table quarters, away from the centre (flank/spread)
- **ACTION** = mission-specific action on an objective/terrain (incl. marker mechanics
  like Trap/Decoy/Consecrate/Triangulate/Sensor Sweep/Secure/Vanguard)

### Take and Hold — your 5 missions
- vs Take and Hold — **Battlefield Dominance** (5obj): HOLD, MORE (+home-objective bonus). Mirror.
- vs Disruption — **Determined Acquisition** (5obj): HOLD, FLIP, ENEMYTERR (centre sits in enemy terr = 6VP/turn).
- vs Purge — **Immovable Object** (5obj): CENTRE, HOLD. (Bad matchup, ~1.5.)
- vs Priority Assets — **Inescapable Dominion** (6obj): HOLD2, MORE, BACKCAP.
- vs Reconnaissance — **Purge and Secure** (5obj): KILLOBJ, HOLD, FLIP. (Only TH mission with kills.)

### Purge the Foe — your 5 missions
- vs Take and Hold — **Unstoppable Force** (5obj): KILL, HOLD, FLIP, CENTRE(endgame). Rated 5 (great).
- vs Purge — **Meatgrinder** (mirror): KILL, HOLD, KILLMORE, BACKCAP.
- vs Reconnaissance — **Consecrate** (6obj): kill→**ACTION** (consecrate objs via kills), HOLD, MORE, BACKCAP.
- vs Priority Assets — **Destroyer's Wrath** (6obj): KILL, HOLD, MORE, KILLMORE.
- vs Disruption — **Punishment** (5obj): KILL ("condemned" leaves table), HOLD, MORE, BACKCAP.

### Priority Assets — your 5 missions (always an ACTION)
- vs Take and Hold — **Secure Asset** (6obj): ACTION, KILLOBJ(near centre), HOLD, HOLD2.
- vs Purge — **Vital Link** (6obj): ACTION (incrementing markers on centre), CENTRE, HOLD, BACKCAP(10).
- vs Priority Assets — **Sabotage** (mirror, 5obj): ACTION (+ENEMYTERR bonus), HOLD.
- vs Disruption — **Extract Relic** (6obj): ACTION (Sensor Sweep), KILLOBJ, HOLD, relic endgame.
- vs Reconnaissance — **Vanguard Operation** (3x single-centre): ACTION(in enemy terr), KILL, HOLD, BACKCAP(10).

### Disruption — your 5 missions (NEVER scores own home; must go forward)
- vs Disruption — **Outmanoeuvre** (mirror, 5obj): HOLD (escalating 4/5/6 per obj), BACKCAP(10).
- vs Take and Hold — **Death Trap** (5obj): ACTION (Booby Trap terrain), KILLOBJ(in trapped terrain), HOLD.
- vs Purge — **Delaying Action** (5obj): KILL, HOLD, CENTRE+expansion combo. (Bad matchup ~1.5.)
- vs Priority Assets — **Locate and Deny** (5obj, small centre): KILLOBJ, ACTION(sensor sweep/relic), HOLD.
- vs Reconnaissance — **Smoke and Mirrors** (6obj): ACTION (Decoy terrain, +ENEMYTERR), HOLD, decoy endgame(10).

### Reconnaissance — your 5 missions
- vs Take and Hold — **Reconnaissance Sweep** (5obj): QUARTERS (3/6VP), KILL(1/unit), HOLD.
- vs Purge — **Triangulation** (6obj): ACTION (Triangulate, escalating 3/6/10), HOLD, endgame control 4+ (10).
- vs Reconnaissance — **Gather Intel** (mirror, 5obj): CENTRE(rd1, 6VP), HOLD, ACTION(Extract Intel 7/unit), endgame markers.
- vs Disruption — **Surveil the Foe** (6obj): ACTION (Surveil 18"), HOLD, marker-clearing, marker dominance(5).
- vs Priority Assets — **Search and Scour** (5obj): CENTRE, KILLOBJ(in terrain), HOLD2, endgame clear own DZ(5).

## Lever frequency across all 25 mission-perspectives (disposition-agnostic)

How often each scoring lever shows up as something the active player is rewarded
for, across all 25 (your-side) mission profiles:

| Lever | Count | % of the 25 missions |
|---|---|---|
| HOLD (control 1+ non-home objective) | 25 | **100%** |
| Killing in some form (KILL/KILLMORE/KILLOBJ) | 14 | **56%** |
| Mission ACTION (incl. terrain-marker mechanics) | 12 | **48%** |
| BACKCAP (enemy home objective) | 7 | **28%** |
| CENTRE as a distinct scoring lever | 6 | **24%** |
| MORE ("hold more than opponent") | 5 | **20%** |
| FLIP (take a new objective) | 3 | **12%** |
| ENEMYTERR bonus | 3 | **12%** |
| HOLD2 (multi-objective bonus) | 2 | **8%** |
| QUARTERS / flank-spread | 1 | **4%** |

Reading: holding the midboard is universal; killing and actions each drive about
half the missions; backcap and centre-control are common secondary levers;
flanking/quarter-spread is almost exclusively a Reconnaissance phenomenon.

## Secondary missions — the 18-card deck

Shared deck. Choose ONE mode before the game:
- **Fixed:** lock **2** secondary missions (from the Fixed-eligible cards) for the
  whole game; they're always active.
- **Tactical:** draw to **2 active cards each turn**, **may hold** cards across turns
  to score them when the board lines up, and may discard. Secondary scoring is
  **capped at 15 VP/turn** (mirrors the primary 15/turn cap).

**Fixed-eligible (confirmed by FIXED tag on the cards): A Grievous Blow,
Assassination, Bring It Down, Engage on All Fronts.** That's a tiny, kill-heavy
pool (3 kill + 1 spread), so Fixed = "commit to killing." Whether any other
carry-overs are also Fixed is TBC, but the pool looks ~4.

**VERIFIED ROSTER (source: gdmissions.app/11th/secondary-missions — the
authoritative current 11th-edition deck). This is the full deck: 18 cards.**
Card scoring text on that site is stored as card IMAGES (not OCR-able by the agent),
so the per-card VP notes below are inferred from card name + 10th-ed lineage and are
marked UNVERIFIED where the exact numbers aren't confirmed. The card NAMES and the
FIXED tags ARE verified.

History note: this corrects an earlier reconstruction from the Pariah Nexus /
CA2025 transitional deck. The real 11th deck **dropped** Cull the Horde, Marked for
Death, Recover Assets, Extend Battle Lines, Storm Hostile Objective, Establish Locus,
Sabotage, and Area Denial; **Plunder replaced Sabotage** and **Centre Ground replaced
Area Denial**; and it **added** A Grievous Blow, Beacon, Burden of Trust, Forward
Position, and Outflank.

**The 18 cards (✔ = FIXED-eligible tag on the site):**
A Grievous Blow ✔, A Tempting Target, Assassination ✔, Beacon, Behind Enemy Lines,
Bring It Down ✔, Burden of Trust, Centre Ground, Cleanse, Defend Stronghold,
Display of Might, Engage on All Fronts ✔, Forward Position, No Prisoners, Outflank,
Overwhelming Force, Plunder, Secure No Man's Land.
(Only 4 carry the FIXED tag in the site's list: A Grievous Blow, Assassination,
Bring It Down, Engage on All Fronts — verify whether others are also Fixed-eligible.)

**Grouping by intent — VERIFIED (7 new/replaced cards read off the cards; carry-overs
named-verified, exact VP for Priority-2 carry-overs still to confirm):**

- **Kill designated targets (5 / ~28%)**
  - Assassination ✔ — kill enemy CHARACTERS.
  - Bring It Down ✔ — kill VEHICLE/MONSTER units.
  - A Grievous Blow ✔ (Fixed/Tactical) — kill enemy units of Starting Strength 13+
    (Fixed 4VP per such unit/turn; Tactical 5VP if one+ killed). Cull-the-Horde successor.
  - No Prisoners — kill non-CHARACTER units.
  - Overwhelming Force — kill enemy units on/near objectives.

- **Objective / ground hold (5 / ~28%)**
  - Secure No Man's Land — control No Man's Land objectives (classically near-free).
  - Defend Stronghold — hold your own/home objectives (compulsory re-draw round 1).
  - A Tempting Target — hold one opponent-chosen NML objective.
  - Burden of Trust — guard objectives (assign a unit in range + control); 2VP each, MAX 5VP.
  - Centre Ground (replaces Area Denial) — friendly unit within 3" of board centre with
    no enemy within 3" (3VP) / within 6" (5VP). End of your turn.

- **Positioning / presence — spread, forward, flank (6 / ~33%)**
  - Engage on All Fronts ✔ — be in board quarters (escalating VP for 2/3/4 quarters).
  - Behind Enemy Lines — units wholly within enemy deployment zone.
  - Forward Position — control enemy home and/or expansion objectives (5VP, end of turn);
    round-1 re-draw allowed.
  - Beacon — designate a unit; 3VP if outside your DZ, 5VP if outside your territory,
    at end of opponent's turn / end of round 5.
  - Outflank — units within 6" of a board edge outside your territory (3VP); units on
    OPPOSITE (parallel) edges, one outside your territory (5VP). Excl. AIRCRAFT/Battle-shocked.
  - Display of Might — more of your units wholly in NML than opponent's.

- **Perform actions (2 / ~11%)**
  - Cleanse — action on NML objectives.
  - Plunder (replaces Sabotage) — Objective Action in your Shooting phase by one unit in a
    terrain area outside your territory, once/turn, completes immediately; 5VP if a terrain
    area was plundered this turn. (Re-draw if you also hold Cleanse.)

**Confirmed FIXED-eligible (FIXED tag on card): A Grievous Blow, Assassination,
Bring It Down, Engage on All Fronts.** All seven new/replaced Tactical cards above
(Beacon, Burden of Trust, Forward Position, Outflank, Plunder, Centre Ground) are
**Tactical-only**. Whether any Priority-2 carry-overs are also Fixed is still TBC, but
the Fixed pool looks small (~4), which makes Tactical the heavy default in 11th.

Secondary takeaways (now on verified data):
- **~28% kill / ~28% hold / ~33% positioning / ~11% action.** Actions collapsed from
  the old deck (only Cleanse + Plunder remain) — the deck is far less action-dependent
  than the 10th-ed/CA25 versions.
- **Board geography is the dominant theme.** 11th explicitly rewards every zone:
  centre (Centre Ground), quarters (Engage on All Fronts), flanks/edges (Outflank),
  and the enemy backfield (Behind Enemy Lines, Forward Position, Beacon). So flanking
  is FAR better represented in the secondary deck than in primaries (where it's
  ~Reconnaissance-only). A mobile, go-wide army can fish these regardless of disposition.
- Two heavy anti-list kill cards (Bring It Down, A Grievous Blow) are Fixed-eligible and
  punish big VEHICLE/MONSTER skews or large (13+) units — listbuilding caution stands.

## Fixed vs Tactical — statistics (source caveat: win-rate split is 10th-ed data)

- **Usage:** Fixed picked ~29% early in 10th, ~15% later; CA25 note: players "largely
  ignore Fixed these days." Tactical is the field default.
- **Win rate (10th-ed Leviathan data, ties not wins):** Fixed **46%** vs Tactical
  **48.3%**; Fixed averaged ~2 VP/game less. Heavy **selection bias** — Fixed is
  taken when expected to over-perform, so blind-Fixed is likely worse.
- **When Fixed is taken** it concentrates on **Bring It Down (~14 VP avg) + Assassination**
  (the "kill pair") — only worth it if the army guarantees ~15+ VP.
- **Per-secondary average ≈ 2.6 VP** (10th/CA25 data). Random card EV ~2–2.5 VP.
- **Tactical mechanics (11th):** draw to 2 active/turn, hold across turns, cap 15 VP/turn.
  Holding is the key tool — bank a card for the turn your primary push also trips it.
- **Near-free hold cards to fish (11th deck):** Secure No Man's Land, Centre Ground,
  A Tempting Target. **Build-for-it / harder:** Behind Enemy Lines, Outflank, Plunder.
- **Disposition interaction:** the 2 action cards (Cleanse, Plunder) compete for the same
  units as a Priority Assets / Reconnaissance / Disruption *primary* action — so they pair
  WORSE with action-dispositions, not better. Hold/position cards are the clean overlap.

## Fixed vs Tactical — efficiency / pairing with the primary

Efficiency = double-dipping: a secondary is "free" when its trigger overlaps what your
primary already forces you to do (opportunity cost ~0). The two pools pair differently:

- **Fixed pool is ~4 cards, kill-dominated** → pairs with the *kill* primary lever
  (56% of missions, concentrated in Purge the Foe). With only **2** locked cards (both
  likely kill, both target-dependent and un-cyclable), Fixed is a high-variance bet:
  one dead card halves your output.
- **Tactical pool is hold/position-heavy** → pairs with the *hold* lever (100% of
  missions, every disposition). Draw-2-and-hold lets you time a held hold/position card
  to the turn you make your primary objective push, scoring both tracks off one move.

**Verdict by disposition:**
- **Purge the Foe → Fixed** is genuinely efficient (kill-every-turn primary + 2 Fixed
  kill cards double-dip) — but ONLY into a target-rich opponent; otherwise Tactical.
- **Take and Hold / Reconnaissance / Disruption / Priority Assets → Tactical.** Fish the
  hold/position/forward cards that ride the objectives/zones your primary already needs.
  Reconnaissance has the richest overlap (Engage/Outflank/Beacon/Forward Position match
  its spread game); Take and Hold leans Secure NML / Centre Ground / A Tempting Target.
- **Caveat:** don't stack the 2 action secondaries onto an action-hungry disposition.

## Challenger cards (catch-up mechanic)

Shared deck of **9 cards**. At the start of a battle round, a player **6+ VP behind**
becomes the Challenger and draws one at the start of their Command phase. Each card
= a 0CP Stratagem OR a simple Mission worth **3VP** (pick one, then discard). Adds
up to 12VP in its own pool. The 9 (Stratagem/Mission): Force a Breach/Secure
Extraction Zone, Opportunistic Strike/Sow Chaos, Burst of Speed/Focused Effort,
Renewed Focus/Establish Comms, Pivotal Moment/Attrition, Great Haste/Over the Line,
Strategic Retreat/Zone Defence, All In/Self Preservation, Harboured Power/Dug In.
Most missions reward: kill something, get into enemy DZ, or hold objectives —
i.e. the same things as the rest of the game.

## Implications for listbuilding by Disposition (high level)

- **Take and Hold:** go-wide, cheap high-OC scoring chaff; expect your scoring
  units on the centre to get killed (4/5 missions have a big central objective).
- **Purge the Foe:** durable damage dealers + disposable cappers; "be the cat,"
  don't give up free kills; watch Priority Assets matchup.
- **Priority Assets:** reliable fast action units; ALSO want 1 super-durable tarpit
  for the Purge matchup (Vital Link); beware getting engagement-blocked off terrain.
- **Reconnaissance:** hyper-mobile MSU, Infiltrators/Scouts, Lone Operatives, dedicated
  transports; one tough unit to hold a single midboard objective. Hard into Purge.
- **Disruption:** 2-3 Infiltrating units for turn-1 marker spam + forward control;
  flexible toolbox. Punished hard by Purge; demands the most list flexibility.

## Sources

- Tabletop Battles / Goonhammer "11th Edition Force Disposition Review" series
  (Take and Hold, Purge the Foe, Priority Assets, Reconnaissance, Disruption),
  Jun 2026 — the per-matchup primary scoring detail.
- Goonhammer "Reviews: The Chapter Approved 2025 Mission Deck", May 2025 —
  primary/secondary/Challenger/Twist changes and the secondary deck composition.
- Warhammer Community Chapter Approved 2025-26 announcement articles.
- Spikey Bits "Chapter Approved Mission Deck: Review Guide" (Jul 2025) — secondary
  change notes (Display of Might, Overwhelming Force, No Prisoners back on Fixed).
- Goonhammer Hammer of Math: "Fixed vs Tactical Secondary Missions" (Apr 2024),
  "10th Edition Secondary Objective Statistics" (Aug 2023), "Early Results from
  Chapter Approved 2025-26" (Jun 2025) — Fixed/Tactical usage, win rate, scoring.
- **gdmissions.app/11th** — authoritative current 11th-edition mission app
  (primary decks, the 18-card secondary deck, force disposition matrix). Card text
  is served as IMAGES, so exact per-card VP must be read off the cards, not scraped.
- Wahapedia `wh40k11ed/the-rules/chapter-approved-2025-26` — full ruleset, but does
  NOT load via the agent's fetch tools.
- `data/dispositions.json` in this repo tags every detachment with its Disposition.
