"""Command-line entry point for the MFM points pipeline.

Subcommands:
  ingest-old   parse the previous-edition PDF        -> snapshot JSON
  ingest-new   scrape/parse the current site pages   -> snapshot JSON
  compare      diff two snapshot JSONs               -> Markdown report

Examples:
  python -m mfm.cli ingest-old --pdf previous_MFM.pdf --out data/old.json
  python -m mfm.cli ingest-new --all --cache data/raw --out data/new.json
  python -m mfm.cli ingest-new --slug genestealer-cults \
         --fixture genestealer-cults=../GSC.html --out data/new.json
  python -m mfm.cli compare --old data/old.json --new data/new.json \
         --out data/report.md
  python -m mfm.cli compare --old data/old.json --new data/new.json \
         --faction genestealer-cults
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from .models import Snapshot
from .parse_pdf import parse_pdf
from .scrape import build_new_snapshot
from .diff import diff_snapshots
from . import report as R
from . import normalize as N


def _save(snap: Snapshot, path: str) -> None:
    p = Path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(snap.to_dict(), ensure_ascii=False, indent=2), encoding="utf-8")


def _load(path: str) -> Snapshot:
    return Snapshot.from_dict(json.loads(Path(path).read_text(encoding="utf-8")))


def cmd_ingest_old(args) -> int:
    snap = parse_pdf(args.pdf, version=args.version)
    _save(snap, args.out)
    units = sum(len(f.units) for f in snap.factions.values())
    print(f"[old {snap.version}] {len(snap.factions)} factions, {units} units -> {args.out}")
    if snap.unmapped:
        print("  ignored headers:", "; ".join(snap.unmapped))
    return 0


def cmd_ingest_new(args) -> int:
    fixtures = {}
    for item in args.fixture or []:
        slug, _, path = item.partition("=")
        fixtures[slug] = path
    slugs = args.slug or (list(N.FACTION_SLUGS) if args.all else list(fixtures))
    if not slugs:
        print("error: specify --all, one or more --slug, or a --fixture", file=sys.stderr)
        return 2
    snap = build_new_snapshot(
        slugs=slugs,
        cache_dir=Path(args.cache) if args.cache else None,
        fixtures=fixtures, force=args.force, version=args.version)
    _save(snap, args.out)
    units = sum(len(f.units) for f in snap.factions.values())
    print(f"[new {snap.version}] {len(snap.factions)} factions, {units} units -> {args.out}")
    return 0


def cmd_build_app(args) -> int:
    diff = json.loads(Path(args.diff).read_text(encoding="utf-8"))
    new = json.loads(Path(args.new).read_text(encoding="utf-8"))
    import datetime
    payload = {"diff": diff, "new": new,
               "generated": datetime.date.today().isoformat()}
    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    js = "window.MFM = " + json.dumps(payload, ensure_ascii=False) + ";\n"
    out.write_text(js, encoding="utf-8")
    print(f"app data -> {args.out}  (open {out.parent}/index.html in a browser)")
    return 0


def cmd_compare(args) -> int:
    old, new = _load(args.old), _load(args.new)
    diff = diff_snapshots(old, new)
    if args.faction:
        if args.faction not in diff["factions"]:
            print(f"error: faction '{args.faction}' not in both snapshots", file=sys.stderr)
            return 2
        text = R.render_faction(diff["factions"][args.faction], only_changes=not args.all_units)
    elif args.overview:
        text = R.render_overview(diff)
    else:
        text = R.render_full(diff, only_changes=not args.all_units)
    if args.json:
        Path(args.json).write_text(json.dumps(diff, ensure_ascii=False, indent=2), encoding="utf-8")
    if args.out:
        Path(args.out).parent.mkdir(parents=True, exist_ok=True)
        Path(args.out).write_text(text, encoding="utf-8")
        print(f"report -> {args.out}")
    else:
        print(text)
    return 0


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(prog="mfm", description="MFM points ingestion & comparison")
    sub = p.add_subparsers(dest="cmd", required=True)

    po = sub.add_parser("ingest-old", help="parse the previous-edition PDF")
    po.add_argument("--pdf", required=True)
    po.add_argument("--out", required=True)
    po.add_argument("--version", default="v4.3")
    po.set_defaults(func=cmd_ingest_old)

    pn = sub.add_parser("ingest-new", help="scrape/parse the current site")
    pn.add_argument("--slug", action="append", help="faction slug (repeatable)")
    pn.add_argument("--all", action="store_true", help="all factions")
    pn.add_argument("--fixture", action="append", help="slug=path local HTML override")
    pn.add_argument("--cache", help="dir to cache fetched HTML")
    pn.add_argument("--force", action="store_true", help="ignore cache")
    pn.add_argument("--out", required=True)
    pn.add_argument("--version", default="v1.0")
    pn.set_defaults(func=cmd_ingest_new)

    pc = sub.add_parser("compare", help="diff two snapshots into a report")
    pc.add_argument("--old", required=True)
    pc.add_argument("--new", required=True)
    pc.add_argument("--faction", help="limit to one faction slug")
    pc.add_argument("--overview", action="store_true", help="collective roll-up only")
    pc.add_argument("--all-units", action="store_true", help="include unchanged units")
    pc.add_argument("--out", help="write Markdown here instead of stdout")
    pc.add_argument("--json", help="also write the raw diff JSON here")
    pc.set_defaults(func=cmd_compare)

    pa = sub.add_parser("build-app", help="embed diff+new JSON into web/data.js")
    pa.add_argument("--diff", required=True)
    pa.add_argument("--new", required=True)
    pa.add_argument("--out", default="web/data.js")
    pa.set_defaults(func=cmd_build_app)
    return p


def main(argv=None) -> int:
    args = build_parser().parse_args(argv)
    return args.func(args)


if __name__ == "__main__":
    raise SystemExit(main())
