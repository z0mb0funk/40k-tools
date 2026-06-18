"""Compare two snapshots (old vs new) and compute points deltas.

Conventions:
  * A *positive* delta means the cost went UP (a nerf); negative means it went
    DOWN / cheaper (a buff).
  * Units are matched by normalized name; cost tiers are matched by model count.
  * For new-edition iterative-cost units the comparison uses the base block
    (the lowest threshold, e.g. "1st to 2nd"), which represents the standard
    cost comparable to the old single value. The 3rd+ surcharge is reported as
    extra context but not counted in the headline delta.
"""
from __future__ import annotations

from .models import Snapshot, Faction, Unit
from . import normalize as N


def _tiers_map(unit: Unit) -> dict[int, int]:
    block = unit.base_block()
    return {t.models: t.points for t in block.tiers} if block else {}


def _block_base(unit: Unit, predicate) -> int | None:
    """Base-tier (lowest model count) points of the first cost block whose
    threshold matches ``predicate``; None if there is no such block."""
    for b in unit.cost_blocks:
        if predicate(b.threshold) and b.tiers:
            return min(b.tiers, key=lambda t: t.models).points
    return None


def _base_ordinal_block(unit: Unit):
    """The cost block covering the 1st copy (lowest min-ordinal)."""
    best = None
    for b in unit.cost_blocks:
        lo, _ = N.threshold_range(b.threshold)
        if best is None or lo < N.threshold_range(best.threshold)[0]:
            best = b
    return best


def _repeat_block(unit: Unit):
    """The surcharge block (smallest min-ordinal greater than 1), or None.

    Handles both schemes: GSC '3rd+' (from 3rd copy) and Chaos Knights '2nd+'
    (from 2nd copy)."""
    cands = [(N.threshold_range(b.threshold)[0], b) for b in unit.cost_blocks]
    cands = [(lo, b) for lo, b in cands if lo > 1]
    if not cands:
        return None
    return min(cands, key=lambda x: x[0])[1]


def diff_unit(old: Unit | None, new: Unit | None) -> dict:
    name = (new or old).name
    if old and not new:
        return {"name": name, "status": "removed",
                "old": _tiers_map(old), "new": {}, "tiers": [], "base_delta": None,
                "base_old": None, "base_pct": None}
    if new and not old:
        return {"name": name, "status": "added",
                "old": {}, "new": _tiers_map(new), "tiers": [],
                "base_delta": None, "base_old": None, "base_pct": None,
                "iterative": len(new.cost_blocks) > 1,
                "wargear": [{"name": w.name, "points": w.points} for w in new.wargear]}

    old_t, new_t = _tiers_map(old), _tiers_map(new)
    tiers = []
    for m in sorted(set(old_t) | set(new_t)):
        o, n = old_t.get(m), new_t.get(m)
        delta = (n - o) if (o is not None and n is not None) else None
        tiers.append({"models": m, "old": o, "new": n, "delta": delta})

    common = sorted(set(old_t) & set(new_t))
    base_old = old_t[common[0]] if common else None
    base_delta = (new_t[common[0]] - old_t[common[0]]) if common else None
    base_pct = (100.0 * base_delta / base_old) if (base_delta is not None and base_old) else None

    # New iterative-cost units: the surcharge ("repeat") tier and when it starts.
    # GSC starts at the 3rd copy ("3rd+"); Chaos Knights at the 2nd ("2nd+").
    base_blk = _base_ordinal_block(new)
    rep_blk = _repeat_block(new)
    base_first = min(base_blk.tiers, key=lambda t: t.models).points if (base_blk and base_blk.tiers) else None
    repeat_tiers = {t.models: t.points for t in rep_blk.tiers} if rep_blk else {}
    repeat_base = min(rep_blk.tiers, key=lambda t: t.models).points if (rep_blk and rep_blk.tiers) else None
    repeat_from = N.threshold_range(rep_blk.threshold)[0] if rep_blk else None
    repeat_threshold = rep_blk.threshold if rep_blk else None
    repeat_surcharge = (repeat_base - base_first) if (repeat_base is not None and base_first is not None) else None

    status = "unchanged"
    if any(t["delta"] for t in tiers):
        status = "changed"
    elif base_delta is None:
        status = "resized"          # tiers don't line up (model counts changed)
    return {"name": name, "status": status, "old": old_t, "new": new_t,
            "tiers": tiers, "base_delta": base_delta,
            "base_old": base_old, "base_pct": base_pct,
            "iterative": len(new.cost_blocks) > 1,
            "repeat_from": repeat_from, "repeat_threshold": repeat_threshold,
            "repeat_tiers": repeat_tiers, "repeat_base": repeat_base,
            "repeat_surcharge": repeat_surcharge,
            "wargear": [{"name": w.name, "points": w.points} for w in new.wargear]}


def diff_enhancements(old: Faction, new: Faction, old_fallback: Faction | None = None) -> list[dict]:
    old_e = {e.name_key: e for e in old.enhancements}
    fb_e = {e.name_key: e for e in old_fallback.enhancements} if old_fallback else {}
    new_e = {e.name_key: e for e in new.enhancements}
    out = []
    for k in sorted(set(old_e) | set(new_e)):
        o, n = old_e.get(k), new_e.get(k)
        if o is None and n is not None and k in fb_e:
            o = fb_e[k]                       # shared (parent) enhancement
        if o and n:
            out.append({"name": n.name, "old": o.points, "new": n.points,
                        "delta": n.points - o.points,
                        "status": "changed" if n.points != o.points else "unchanged"})
        elif n:
            out.append({"name": n.name, "old": None, "new": n.points,
                        "delta": None, "status": "added"})
        else:
            out.append({"name": o.name, "old": o.points, "new": None,
                        "delta": None, "status": "removed"})
    return out


def diff_faction(old: Faction, new: Faction, old_fallback: Faction | None = None) -> dict:
    old_u = {u.name_key: u for u in old.units}
    new_u = {u.name_key: u for u in new.units}
    fb_u = {u.name_key: u for u in old_fallback.units} if old_fallback else {}

    # Compared keys = old (chapter) units + new units. Fallback (parent) units
    # are only consulted to resolve a new unit's old cost; they never appear as
    # "removed" on their own.
    keys = set(old_u) | set(new_u)
    unit_diffs = []
    matched_via_parent = 0
    for k in sorted(keys):
        o = old_u.get(k)
        if o is None and k in new_u and k in fb_u:
            o = fb_u[k]
            matched_via_parent += 1
        unit_diffs.append(diff_unit(o, new_u.get(k)))

    increased = [d for d in unit_diffs if (d["base_delta"] or 0) > 0]
    decreased = [d for d in unit_diffs if (d["base_delta"] or 0) < 0]
    unchanged = [d for d in unit_diffs if d["status"] == "unchanged"]
    added = [d for d in unit_diffs if d["status"] == "added"]
    removed = [d for d in unit_diffs if d["status"] == "removed"]
    deltas = [d["base_delta"] for d in unit_diffs if d["base_delta"] is not None]
    pcts = [d["base_pct"] for d in unit_diffs if d.get("base_pct") is not None]

    def _median(xs):
        if not xs:
            return 0
        xs = sorted(xs)
        n = len(xs)
        return xs[n // 2] if n % 2 else (xs[n // 2 - 1] + xs[n // 2]) / 2

    enh = diff_enhancements(old, new, old_fallback)
    return {
        "slug": new.slug, "name": new.name,
        "units": unit_diffs,
        "enhancements": enh,
        "summary": {
            "units_old": len(old.units), "units_new": len(new.units),
            "matched": len(deltas),
            "matched_via_parent": matched_via_parent,
            "increased": len(increased), "decreased": len(decreased),
            "unchanged": len(unchanged), "added": len(added), "removed": len(removed),
            "net_points": sum(deltas),
            "avg_delta": round(sum(deltas) / len(deltas), 1) if deltas else 0,
            "median_delta": _median(deltas),
            "avg_pct": round(sum(pcts) / len(pcts), 1) if pcts else 0.0,
            "total_increase": sum(d for d in deltas if d > 0),
            "total_decrease": sum(d for d in deltas if d < 0),
            "enh_changed": sum(1 for e in enh if e["status"] == "changed"),
            "wargear_units": sum(1 for u in unit_diffs if u.get("wargear")),
        },
    }


def diff_snapshots(old: Snapshot, new: Snapshot) -> dict:
    slugs = sorted(set(old.factions) & set(new.factions))
    faction_diffs = {}
    for s in slugs:
        parent_slug = N.FACTION_PARENTS.get(s)
        fallback = old.factions.get(parent_slug) if parent_slug else None
        faction_diffs[s] = diff_faction(old.factions[s], new.factions[s], fallback)
    overall = {
        "old_version": old.version, "new_version": new.version,
        "factions_compared": len(slugs),
        "only_in_old": sorted(set(old.factions) - set(new.factions)),
        "only_in_new": sorted(set(new.factions) - set(old.factions)),
        "net_points": sum(fd["summary"]["net_points"] for fd in faction_diffs.values()),
        "total_increased": sum(fd["summary"]["increased"] for fd in faction_diffs.values()),
        "total_decreased": sum(fd["summary"]["decreased"] for fd in faction_diffs.values()),
        "total_matched": sum(fd["summary"]["matched"] for fd in faction_diffs.values()),
    }
    return {"overall": overall, "factions": faction_diffs}
