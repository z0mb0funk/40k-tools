"""Render a snapshot diff as readable Markdown.

Two views:
  * overview  - collective landscape: per-faction roll-up ranked by net change.
  * faction   - per-unit detail for a single faction.

Sign convention (from diff.py): positive = points went UP (nerf),
negative = points went DOWN / cheaper (buff).
"""
from __future__ import annotations


def _sign(n: int | None) -> str:
    if n is None:
        return "-"
    return f"+{n}" if n > 0 else str(n)


def render_overview(diff: dict) -> str:
    ov = diff["overall"]
    rows = []
    for slug, fd in diff["factions"].items():
        s = fd["summary"]
        rows.append((fd["name"], s["avg_pct"], s["net_points"], s["avg_delta"],
                     s["increased"], s["decreased"], s["unchanged"],
                     s["added"], s["removed"], s["matched"], s.get("wargear_units", 0)))
    # Rank by average % change: most-buffed (largest negative %) first.
    rows.sort(key=lambda r: r[1])

    out = []
    out.append(f"# MFM Points Comparison: {ov['old_version']} -> {ov['new_version']}\n")
    out.append(f"Factions compared: **{ov['factions_compared']}**  |  "
               f"units matched: **{ov['total_matched']}**\n")
    out.append("Convention: **negative = cheaper (buff)**, **positive = more "
               "expensive (nerf)**.\n")
    out.append("Columns: **Avg %** = mean per-unit cost change (best single "
               "'did this faction get cheaper/pricier' signal); **Net pts** and "
               "**Avg pts** = raw and mean base-tier point change; counts show "
               "how many units moved each way; **Wargear** = units that gained "
               "paid wargear options (new in 11th — wargear was free in 10th).\n")
    if ov["only_in_old"]:
        out.append(f"_Only in old ({ov['old_version']}):_ " + ", ".join(ov["only_in_old"]))
    if ov["only_in_new"]:
        out.append(f"_Only in new ({ov['new_version']}):_ " + ", ".join(ov["only_in_new"]))
    out.append("")
    out.append("## Faction roll-up (ranked: most cheaper -> most expensive, by Avg %)\n")
    out.append("| Faction | Avg % | Net pts | Avg pts | Cheaper | Pricier | Same | Added | Removed | Matched | Wargear |")
    out.append("|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|")
    for name, avgpct, net, avgd, inc, dec, unch, add, rem, matched, wg in rows:
        out.append(f"| {name} | {avgpct:+.1f}% | {_sign(net)} | {avgd:+.1f} | "
                   f"{dec} | {inc} | {unch} | {add} | {rem} | {matched} | {wg} |")
    out.append("")
    return "\n".join(out)


def render_faction(fd: dict, only_changes: bool = True) -> str:
    s = fd["summary"]
    out = [f"## {fd['name']}  ({fd['slug']})\n"]
    out.append(f"Units: {s['units_old']} -> {s['units_new']}  |  matched {s['matched']}  "
               f"|  cheaper {s['decreased']}  |  pricier {s['increased']}  "
               f"|  same {s['unchanged']}  |  added {s['added']}  |  removed {s['removed']}")
    out.append(f"Net points (matched, base tier): **{_sign(s['net_points'])}**  "
               f"(total increase {_sign(s['total_increase'])}, "
               f"total decrease {_sign(s['total_decrease'])})\n")

    changed = [u for u in fd["units"]
               if u["status"] in ("changed", "added", "removed", "resized")]
    changed.sort(key=lambda u: (u["base_delta"] is None, u["base_delta"] or 0))
    if changed:
        out.append("| Unit | Old | New | Δ base | Repeat copy | Note |")
        out.append("|---|---|---|---:|---:|---|")
        for u in changed:
            old = _tiers_str(u["old"])
            new = _tiers_str(u["new"])
            note = u["status"]
            if u.get("iterative"):
                note = (note + ", iterative") if note != "changed" else "iterative cost"
            rep = ""
            if u.get("repeat_surcharge") is not None:
                rep = f"{u.get('repeat_threshold')}: {_sign(u['repeat_surcharge'])} (={u['repeat_base']})"
            out.append(f"| {u['name']} | {old} | {new} | {_sign(u['base_delta'])} "
                       f"| {rep} | {note} |")
        out.append("")

    if not only_changes:
        same = [u for u in fd["units"] if u["status"] == "unchanged"]
        if same:
            out.append("Unchanged: " + ", ".join(u["name"] for u in same) + "\n")

    enh_ch = [e for e in fd["enhancements"] if e["status"] != "unchanged"]
    if enh_ch:
        out.append("### Enhancements\n")
        out.append("| Enhancement | Old | New | Δ | Note |")
        out.append("|---|---:|---:|---:|---|")
        for e in sorted(enh_ch, key=lambda e: (e["delta"] is None, e["delta"] or 0)):
            out.append(f"| {e['name']} | {e['old'] if e['old'] is not None else '-'} "
                       f"| {e['new'] if e['new'] is not None else '-'} "
                       f"| {_sign(e['delta'])} | {e['status']} |")
        out.append("")

    wg = [u for u in fd["units"] if u.get("wargear")]
    if wg:
        out.append("### Wargear (new paid options in 11th — were free in 10th)\n")
        out.append("| Unit | Option | Cost |")
        out.append("|---|---|---:|")
        for u in sorted(wg, key=lambda u: u["name"]):
            for w in u["wargear"]:
                out.append(f"| {u['name']} | {w['name']} | +{w['points']} |")
        out.append("")
    return "\n".join(out)


def _tiers_str(tiers: dict) -> str:
    if not tiers:
        return "-"
    return ", ".join(f"{m}m:{p}" for m, p in sorted(tiers.items()))


def render_full(diff: dict, only_changes: bool = True) -> str:
    parts = [render_overview(diff)]
    for slug in diff["factions"]:
        parts.append(render_faction(diff["factions"][slug], only_changes=only_changes))
    return "\n".join(parts)
