"""Generate a print-ready HTML army list reference sheet."""

HTML_HEAD = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>GSC Army List - Quick Reference</title>
<style>
  @page { size: landscape; margin: 3mm; }
  @media print {
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    body { font-size: 7pt; }
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 7pt; line-height: 1.1; }
  table { border-collapse: collapse; width: auto; }
  th, td { border: 1px solid #888; padding: 0px 1px; vertical-align: middle; text-align: center; white-space: nowrap; }
  th { background: #ddd !important; font-weight: bold; }
  .unit-name { font-weight: bold; font-size: 7pt; background: #f5f5dc !important; vertical-align: top; text-align: left; white-space: normal; max-width: 60px; }
  .stat { background: #e8d44d !important; font-weight: bold; }
  .ab { background: #fff !important; text-align: left; font-size: 6.5pt; white-space: normal; }
  .desc { text-align: left; font-size: 6pt; font-style: italic; white-space: normal; }
  .r { background: #d5c8e8 !important; }
  .m { background: #c8e8c8 !important; }
  .wn { text-align: left; font-size: 6.5pt; white-space: normal; }
  .sep td { border: none; height: 2px; background: #333 !important; padding: 0; }
  .empty { background: #f0f0f0 !important; color: #aaa; }
  .page-layout { display: flex; gap: 4px; align-items: flex-start; }
  .left-col { flex: 1; min-width: 0; }
  .right-col { width: 170px; font-size: 6pt; line-height: 1.15; flex-shrink: 0; }
  .rules-box { border: 1px solid #555; padding: 2px 3px; margin-bottom: 3px; }
  .rules-box h4 { font-size: 7pt; margin-bottom: 1px; background: #333; color: #fff; padding: 1px 3px; margin: -2px -3px 2px -3px; }
  .rules-box p { margin: 1px 0; white-space: normal; }
  .rules-box ul { margin: 0; padding-left: 10px; }
  .rules-box li { margin: 0; }
  .resurg { border-collapse: collapse; width: 100%; margin-top: 2px; }
  .resurg td { font-size: 6pt; padding: 0 2px; border: 1px solid #aaa; }
  .resurg th { font-size: 6pt; background: #555 !important; color: #fff; padding: 0 2px; text-align: left; }
  .strats { margin-top: 4px; }
  .strats h3 { font-size: 7.5pt; margin-bottom: 2px; }
  .strat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; }
  .strat { border: 1px solid #555; padding: 2px 3px; font-size: 6pt; line-height: 1.15; }
  .strat-name { font-weight: bold; font-size: 7pt; }
  .strat-type { font-size: 5.5pt; color: #555; margin-bottom: 1px; }
  .strat-body { white-space: normal; }
</style>
</head>
<body>
<div class="page-layout">
<div class="left-col">
<table>
<thead>
<tr>
  <th></th>
  <th>M</th><th>T</th><th>SV</th>
  <th>Inv</th><th>FNP</th><th>W</th>
  <th>LD</th><th>OC</th>
  <th>abilities</th>
  <th>rng</th><th>atks</th><th>sk</th>
  <th>S</th><th>AP</th><th>D</th>
  <th>wpn abilities</th>
</tr>
</thead>
<tbody>
"""

HTML_FOOT = """</tbody></table>
</div><!-- end left-col -->

<div class="right-col">

<div class="rules-box">
<h4>HYPERMORPHIC FURY</h4>
<p>+1 to Charge rolls for <b>ABERRANTS</b>, <b>BIOPHAGUS</b>, <b>PSG</b>.</p>
<p>If unit made a Charge this turn &amp; is selected to fight: <b>+1 Attack</b> to melee weapons.</p>
</div>

<div class="rules-box">
<h4>KILLER REPUTATION</h4>
<p><b>KILLER</b> = Kelermorph, Locus, Reductus Saboteur, Sanctus.</p>
<p>KILLER models' attacks: RR hit rolls of 1, RR wound rolls of 1.</p>
</div>

<div class="rules-box">
<h4>RESURGENCE</h4>
<p>When unit destroyed (all models have ability), spend RP shown below:</p>
<table class="resurg">
<tr><th>Unit</th><th>5</th><th>10</th></tr>
<tr><td>Aberrants</td><td>4</td><td>8</td></tr>
<tr><td>Acolytes / Metamorphs</td><td>2</td><td>4</td></tr>
<tr><td>Purestrain Genestealers</td><td>2</td><td>6</td></tr>
</table>
</div>

<div class="rules-box">
<h4>CULT AMBUSH</h4>
<p>During Declare Battle Formations: for each unit with Cult Ambush, place 1 Cult Ambush marker on battlefield &gt;9" from enemy deployment &amp; &gt;6" from other markers.</p>
<p>Your Movement phase: remove a marker to set up unit w/in 1" of it &amp; &gt;9" from enemies.</p>
</div>

<div class="rules-box">
<h4>ENHANCEMENTS</h4>
<p><b>Predatory Instincts</b> (Abominant): Heroic Intervention for -1CP once/turn. Can use twice per round.</p>
<p><b>Biomorph Adaptation</b> (Patriarch): +1AP, +1D on Patriarch's claws.</p>
</div>

</div><!-- end right-col -->
</div><!-- end page-layout -->

<div class="strats">
<h3>STRATAGEMS (all 1CP)</h3>
<div class="strat-grid">

<div class="strat">
<div class="strat-name">LIVING UP TO LEGEND</div>
<div class="strat-type">Heroes of the Uprising</div>
<div class="strat-body"><b>WHEN:</b> Shooting/Fight, after KILLER attacked &amp; destroyed enemy unit or CHARACTER.<br>
<b>TARGET:</b> That KILLER unit.<br>
<b>EFFECT:</b> Visible friendly battle-shocked GSC w/in 12" no longer battle-shocked.</div>
</div>

<div class="strat">
<div class="strat-name">SURGING BROODWORSHIP</div>
<div class="strat-type">Heroes of the Uprising</div>
<div class="strat-body"><b>WHEN:</b> Shooting/Fight, KILLER unit selected to attack.<br>
<b>TARGET:</b> That KILLER unit.<br>
<b>EFFECT:</b> KILLER models get [DEVASTATING WOUNDS].</div>
</div>

<div class="strat">
<div class="strat-name">LOYAL TO THE END</div>
<div class="strat-type">Heroes of the Uprising</div>
<div class="strat-body"><b>WHEN:</b> Fight, enemy targets KILLER unit.<br>
<b>TARGET:</b> That KILLER unit.<br>
<b>EFFECT:</b> KILLER model destroyed &amp; hasn't fought: D6 — 1: enemy 1MW; 2+: model fights then removed.</div>
</div>

<div class="strat">
<div class="strat-name">EVASIVE VANGUARD</div>
<div class="strat-type">Broodsurge — Strategic Ploy</div>
<div class="strat-body"><b>WHEN:</b> Any phase, enemy ends move w/in 9" of Cult Ambush marker.<br>
<b>TARGET:</b> One marker.<br>
<b>EFFECT:</b> Relocate marker anywhere &gt;9" from enemies.</div>
</div>

<div class="strat">
<div class="strat-name">HYPER-METABOLIC VIGOUR</div>
<div class="strat-type">Broodsurge — Battle Tactic</div>
<div class="strat-body"><b>WHEN:</b> Fight phase.<br>
<b>TARGET:</b> ABERRANTS/BIOPHAGUS/PSG not yet selected to fight.<br>
<b>EFFECT:</b> Pile-in &amp; Consolidate up to 6" (not 3"). No need to end closer.</div>
</div>

<div class="strat">
<div class="strat-name">SAINTLY PAROXYSM</div>
<div class="strat-type">Broodsurge — Epic Deed</div>
<div class="strat-body"><b>WHEN:</b> Fight, enemy destroys GSC CHARACTER.<br>
<b>TARGET:</b> That CHARACTER.<br>
<b>EFFECT:</b> D6: 2+ → D3 MW. Abominant/Patriarch: 2D3 MW.</div>
</div>

<div class="strat">
<div class="strat-name">GENE-TWISTED MUSCLE</div>
<div class="strat-type">Broodsurge — Battle Tactic</div>
<div class="strat-body"><b>WHEN:</b> Fight phase.<br>
<b>TARGET:</b> ABERRANTS/BIOPHAGUS/PSG not yet selected to fight.<br>
<b>EFFECT:</b> +1 to wound vs MONSTER/VEHICLE.</div>
</div>

<div class="strat">
<div class="strat-name">STIMULATED BIO-SURGE</div>
<div class="strat-type">Broodsurge — Battle Tactic</div>
<div class="strat-body"><b>WHEN:</b> Your Charge phase.<br>
<b>TARGET:</b> ABERRANTS/BIOPHAGUS/PSG that hasn't declared charge.<br>
<b>EFFECT:</b> +1 to charge roll per target selected (max +3).</div>
</div>

<div class="strat">
<div class="strat-name">BIO-HORROR REVELATION</div>
<div class="strat-type">Broodsurge — Strategic Ploy</div>
<div class="strat-body"><b>WHEN:</b> Start of opponent's Shooting.<br>
<b>TARGET:</b> ABERRANTS/BIOPHAGUS/PSG unit.<br>
<b>EFFECT:</b> Enemy w/in 9" must take Ld test (-1). Failed → -1 to hit your unit.</div>
</div>

</div>
</div>
</body></html>"""


def sep():
    return '<tr class="sep"><td colspan="17"></td></tr>\n'


def stat_cells(m, t, sv, inv, fnp, w, ld, oc):
    return "".join(f'<td class="stat">{v}</td>' for v in [m, t, sv, inv, fnp, w, ld, oc])


def wpn_row(rng, a, sk, s, ap, d, name_or_abilities, melee=False):
    cls = "m" if melee else "r"
    return (f'<td class="{cls}">{rng}</td><td class="{cls}">{a}</td>'
            f'<td class="{cls}">{sk}</td><td class="{cls}">{s}</td>'
            f'<td class="{cls}">{ap}</td><td class="{cls}">{d}</td>'
            f'<td class="{cls} wn">{name_or_abilities}</td>')


def empty_wpn():
    return '<td class="empty">-</td>' * 7


def unit_block(name, rows):
    """rows is a list of (stat_or_desc, wpn_or_empty) tuples."""
    n = len(rows)
    out = sep()
    for i, (left, right) in enumerate(rows):
        out += "<tr>"
        if i == 0:
            out += f'<td class="unit-name" rowspan="{n}">{name}</td>'
        out += left + right + "</tr>\n"
    return out


# --- ARMY LIST DATA ---

units = []

# 1) 10x Aberrants + Abominant (Predatory Instincts) + Biophagus
units.append(unit_block("Aberrants<br>+Abominant<br>(Pred Inst)<br>+Biophagus", [
    (stat_cells("6\"","6","5+","-","5+","3","7+","1") + '<td class="ab">DS, FNP 5+, cult ambush</td>', empty_wpn()),
    ('<td colspan="9" class="desc">-1 wound roll for S&gt;T6 while led; '
     '<b>Pred Inst:</b> heroic intervention for -1CP once/turn (can use twice/round)</td>',
     wpn_row("m","3","3+","7","-2","2","aberrant weapons",True)),
    (stat_cells("6\"","6","5+","-","5+","5","7+","1") + '<td class="ab">DS, FNP 5+, leader</td>', empty_wpn()),
    ('<td colspan="9" class="desc"><b>Abominant:</b> attached fight on death(4+); regen 2+ full W end of phase</td>',
     wpn_row("m","4","3+","12","-2","D6+1","power sledgehammer",True)),
    (stat_cells("6\"","3","5+","-","-","3","7+","1") + '<td class="ab">DS, support; lethal hits melee</td>',
     wpn_row("12\"","1","3+","3","0","1","pistol",False)),
    ('<td colspan="9" class="desc"><b>Biophagus:</b> once/battle +3A&D goad; familiar: +1 wound vs INF once/battle</td>',
     wpn_row("m","1","3+","2","0","D3","anti-infantry 2+",True)),
]))

# 2) 10x Aberrants + Abominant + Biophagus
units.append(unit_block("Aberrants<br>+Abominant<br>+Biophagus", [
    (stat_cells("6\"","6","5+","-","5+","3","7+","1") + '<td class="ab">DS, FNP 5+, cult ambush</td>', empty_wpn()),
    ('<td colspan="9" class="desc">-1 wound roll for S&gt;T6 while led</td>',
     wpn_row("m","3","3+","7","-2","2","aberrant weapons",True)),
    (stat_cells("6\"","6","5+","-","5+","5","7+","1") + '<td class="ab">DS, FNP 5+, leader</td>',
     wpn_row("m","4","3+","12","-2","D6+1","power sledgehammer",True)),
    ('<td colspan="9" class="desc"><b>Abominant:</b> attached fight on death(4+); regen 2+ full W end of phase</td>',
     empty_wpn()),
    (stat_cells("6\"","3","5+","-","-","3","7+","1") + '<td class="ab">DS, support; lethal hits melee</td>',
     wpn_row("12\"","1","3+","3","0","1","pistol",False)),
    ('<td colspan="9" class="desc"><b>Biophagus:</b> once/battle +3A&D goad; familiar: +1 wound vs INF once/battle</td>',
     wpn_row("m","1","3+","2","0","D3","anti-infantry 2+",True)),
]))

# 3) 10x Purestrain Genestealers + Patriarch (Biomorph Adaptation)
units.append(unit_block("PSG x10<br>+Patriarch<br>(Biomorph)", [
    (stat_cells("8\"","4","5+","5+","-","2","7+","1") + '<td class="ab">DS, infiltrators, cult ambush</td>', empty_wpn()),
    ('<td colspan="9" class="desc">swift &amp; deadly: advance and charge</td>',
     wpn_row("m","4","2+","4","-2","1","cult claws and talons",True)),
    (stat_cells("8\"","5","4+","4+","-","6","6+","1") + '<td class="ab">DS, infiltrators, leader, psyker</td>', empty_wpn()),
    ('<td colspan="9" class="desc"><b>Patriarch:</b> unit gets dev wounds melee; enemies w/in 6\" BS fight start (12\" once/game); '
     '<b>Biomorph:</b> +1AP +1D on claws</td>',
     wpn_row("m","5","2+","6","-3","3","dev wounds, twin-linked",True)),
]))

# 4) 5x Purestrain Genestealers
units.append(unit_block("PSG x5", [
    (stat_cells("8\"","4","5+","5+","-","2","7+","1") + '<td class="ab">DS, infiltrators, cult ambush</td>', empty_wpn()),
    ('<td colspan="9" class="desc">swift &amp; deadly: advance and charge</td>',
     wpn_row("m","4","2+","4","-2","1","cult claws and talons",True)),
]))

# 5) Kelermorph x2
for _ in range(2):
    units.append(unit_block("Kelermorph", [
        (stat_cells("6\"","3","5+","5+","-","3","7+","1") + '<td class="ab">DS, lone op</td>',
         wpn_row("12\"","6","2+","6","-2","1","dev wounds, pistol",False)),
        ('<td colspan="9" class="desc">heroic fusillade: target takes BS test after shooting; '
         'hypersensory: enemy w/in 8\" → shoot + move D6\"</td>',
         wpn_row("m","3","3+","3","0","1","close combat wpn",True)),
    ]))

# 6) Reductus Saboteur
units.append(unit_block("Reductus<br>Saboteur", [
    (stat_cells("6\"","3","5+","5+","-","3","7+","1") + '<td class="ab">DS, infiltrators, lone op, stealth, grenades</td>',
     wpn_row("12\"","1","3+","3","0","1","pistol",False)),
    ('<td colspan="9" class="desc">grenade strat 0CP; planted explosives: enemy w/in 8\" → D3+3 MW on 2+</td>',
     wpn_row("8\"","D6","3+","9","-2","2","assault, blast, one shot",False)),
    ('<td colspan="9" class="desc"></td>',
     wpn_row("24\"","D6+3","3+","5","0","1","blast, indirect fire",False)),
    ('<td colspan="9" class="desc"></td>',
     wpn_row("m","2","3+","3","0","1","close combat wpn",True)),
]))

# 7) Sanctus (bio-dagger)
units.append(unit_block("Sanctus<br>(dagger)", [
    (stat_cells("6\"","3","5+","5+","-","3","7+","1") + '<td class="ab">DS, infiltrators, lone op, stealth</td>', empty_wpn()),
    ('<td colspan="9" class="desc">can\'t be snap-shot; psychic spoor: pick prey → RR hit+wound vs it</td>',
     wpn_row("m","6","2+","3","-2","2","anti-inf 3+, precision",True)),
]))

# 8) Sanctus (sniper rifle)
units.append(unit_block("Sanctus<br>(sniper)", [
    (stat_cells("6\"","3","5+","5+","-","3","7+","1") + '<td class="ab">DS, infiltrators, lone op, stealth</td>',
     wpn_row("36\"","1","3+","7","-2","3","anti-psyker 2+, heavy, precision",False)),
    ('<td colspan="9" class="desc">creeping shadow: enemy w/in 8\" → move 6\"; can\'t be snap-shot; prey: RR hit+wound</td>',
     wpn_row("m","2","3+","3","0","1","close combat wpn",True)),
]))

# 9) 10x Hybrid Metamorphs w/ flamers (cult icon)
units.append(unit_block("Metamorphs<br>x10 flamers<br>(cult icon)", [
    (stat_cells("6\"","4","5+","-","5+","1","7+","1") + '<td class="ab">DS, FNP 5+, scouts 6\", cult ambush</td>',
     wpn_row("12\"","D6","N/A","3","0","1","ignores cover, pistol, torrent",False)),
    ('<td colspan="9" class="desc">brood surge: enemy shoots &amp; kills model → surge D6\"; cult icon: regen D3 (3 on obj)</td>',
     wpn_row("m","3","3+","5","-1","2","mutations (strike)",True)),
    ('<td colspan="9" class="desc"></td>',
     wpn_row("m","5","3+","4","-1","1","mutations (sweep)",True)),
    ('<td colspan="9" class="desc"><b>Leader:</b></td>',
     wpn_row("m","5","3+","5","-1","2","leader\'s cult weapons",True)),
]))

# 10) 5x Acolyte Hybrids w/ flamers (x2)
for _ in range(2):
    units.append(unit_block("Acolytes x5<br>flamers", [
        (stat_cells("6\"","4","5+","-","-","1","7+","2") + '<td class="ab">DS, cult ambush</td>',
         wpn_row("12\"","D6","N/A","3","0","1","ignores cover, pistol, torrent",False)),
        ('<td colspan="9" class="desc">industrialised destruction: RR wound 1s (full RR on obj)</td>',
         wpn_row("m","3","3+","4","-1","1","cult claws and knife",True)),
        ('<td colspan="9" class="desc"><b>Leader:</b></td>',
         wpn_row("m","5","3+","5","-2","1","leader\'s bio-weapons",True)),
    ]))

# 11) 5x Acolyte Hybrids w/ heavy mining tools (cult icon)
units.append(unit_block("Acolytes x5<br>mining tools<br>(cult icon)", [
    (stat_cells("6\"","4","5+","-","-","1","7+","2") + '<td class="ab">DS, cult ambush</td>',
     wpn_row("12\"","1","4+","3","0","1","pistol",False)),
    ('<td colspan="9" class="desc">claimed for cult: 4+ on obj = +1CP; cult icon: regen D3 (3 on obj)</td>',
     wpn_row("m","2","3+","5","-2","3","anti-vehicle 4+, mining tool",True)),
    ('<td colspan="9" class="desc"><b>Leader:</b></td>',
     wpn_row("m","5","3+","5","-2","1","leader\'s bio-weapons",True)),
]))

# 12) Achilles Ridgerunner (mortar + spotter)
units.append(unit_block("Ridgerunner<br>(mortar<br>+spotter)", [
    (stat_cells("12\"","7","3+","-","-","8","7+","3") + '<td class="ab">deadly demise 1, scouts 9\"</td>',
     wpn_row("48\"","D6+3","3+","6","0","1","blast, indirect fire",False)),
    ('<td colspan="9" class="desc">crossfire: target gets +1AP from GSC rest of turn; spotter: BS 3+</td>',
     wpn_row("36\"","3","3+","4","0","1","rapid fire 3, twin-linked",False)),
    ('<td colspan="9" class="desc"></td>',
     wpn_row("m","3","4+","5","0","1","armoured hull",True)),
]))


# --- OUTPUT ---
with open("/Users/chasetucker/Desktop/mfm-tool/list_sheet.html", "w") as f:
    f.write(HTML_HEAD)
    for u in units:
        f.write(u)
    f.write(HTML_FOOT)

print("Generated list_sheet.html")
