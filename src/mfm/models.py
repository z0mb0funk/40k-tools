"""Normalized data model shared by both ingestion paths (HTML/new, PDF/old).

The whole pipeline speaks this schema so the diff engine never has to care
where the data came from. Everything serializes to/from plain dicts (JSON).
"""
from __future__ import annotations

from dataclasses import dataclass, field, asdict
from typing import Any


@dataclass
class CostTier:
    """A single (model-count -> points) row within a cost block."""
    models: int
    points: int

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)

    @staticmethod
    def from_dict(d: dict) -> "CostTier":
        return CostTier(models=int(d["models"]), points=int(d["points"]))


@dataclass
class CostBlock:
    """A labelled set of tiers.

    ``threshold`` captures the new 11th-ed iterative-cost concept, e.g.
    "default", "1st to 2nd", "3rd+". Old (PDF) data only ever has "default".
    """
    threshold: str
    tiers: list[CostTier] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return {"threshold": self.threshold, "tiers": [t.to_dict() for t in self.tiers]}

    @staticmethod
    def from_dict(d: dict) -> "CostBlock":
        return CostBlock(threshold=d["threshold"],
                         tiers=[CostTier.from_dict(t) for t in d.get("tiers", [])])


@dataclass
class WargearOption:
    name: str
    points: int

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)

    @staticmethod
    def from_dict(d: dict) -> "WargearOption":
        return WargearOption(name=d["name"], points=int(d["points"]))


@dataclass
class Unit:
    name: str                       # display name as printed (source casing)
    name_key: str                   # normalized key for matching
    cost_blocks: list[CostBlock] = field(default_factory=list)
    wargear: list[WargearOption] = field(default_factory=list)
    leader_targets: list[str] = field(default_factory=list)   # unit names it can join
    is_character: bool = False
    attach_type: str | None = None  # "leader", "support", or "leader/support"

    def base_block(self) -> CostBlock | None:
        """The block used for cross-edition comparison.

        Prefers the explicit 'default' block; otherwise the first/lowest
        threshold (so an iterative unit still compares against its base cost).
        """
        if not self.cost_blocks:
            return None
        for b in self.cost_blocks:
            if b.threshold == "default":
                return b
        return self.cost_blocks[0]

    def to_dict(self) -> dict[str, Any]:
        return {"name": self.name, "name_key": self.name_key,
                "cost_blocks": [b.to_dict() for b in self.cost_blocks],
                "wargear": [w.to_dict() for w in self.wargear],
                "leader_targets": self.leader_targets,
                "is_character": self.is_character,
                "attach_type": self.attach_type}

    @staticmethod
    def from_dict(d: dict) -> "Unit":
        return Unit(name=d["name"], name_key=d["name_key"],
                    cost_blocks=[CostBlock.from_dict(b) for b in d.get("cost_blocks", [])],
                    wargear=[WargearOption.from_dict(w) for w in d.get("wargear", [])],
                    leader_targets=d.get("leader_targets", []),
                    is_character=d.get("is_character", False),
                    attach_type=d.get("attach_type"))


@dataclass
class Enhancement:
    name: str
    name_key: str
    points: int
    detachment: str | None = None
    is_upgrade: bool = False         # MFM marks these "(Upgrade)"; go on units, not characters

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)

    @staticmethod
    def from_dict(d: dict) -> "Enhancement":
        return Enhancement(name=d["name"], name_key=d["name_key"],
                           points=int(d["points"]), detachment=d.get("detachment"),
                           is_upgrade=d.get("is_upgrade", False))


@dataclass
class Detachment:
    name: str
    dp: int | None = None           # Detachment Points cost (new edition only)

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)

    @staticmethod
    def from_dict(d: dict) -> "Detachment":
        return Detachment(name=d["name"], dp=d.get("dp"))


@dataclass
class Faction:
    slug: str                       # canonical key, e.g. "genestealer-cults"
    name: str                       # display name, e.g. "Genestealer Cults"
    units: list[Unit] = field(default_factory=list)
    enhancements: list[Enhancement] = field(default_factory=list)
    detachments: list[Detachment] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return {"slug": self.slug, "name": self.name,
                "units": [u.to_dict() for u in self.units],
                "enhancements": [e.to_dict() for e in self.enhancements],
                "detachments": [d.to_dict() for d in self.detachments]}

    @staticmethod
    def from_dict(d: dict) -> "Faction":
        dets = []
        for x in d.get("detachments", []):
            dets.append(Detachment.from_dict(x) if isinstance(x, dict) else Detachment(name=x))
        return Faction(slug=d["slug"], name=d["name"],
                       units=[Unit.from_dict(u) for u in d.get("units", [])],
                       enhancements=[Enhancement.from_dict(e) for e in d.get("enhancements", [])],
                       detachments=dets)


@dataclass
class Snapshot:
    """A full MFM edition: every faction's points at one point in time."""
    source: str                     # "new" (html) | "old" (pdf)
    version: str                    # e.g. "v1.0" / "v4.3"
    factions: dict[str, Faction] = field(default_factory=dict)
    # factions that were parsed but could not be mapped to a canonical slug
    unmapped: list[str] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return {"source": self.source, "version": self.version,
                "factions": {k: v.to_dict() for k, v in self.factions.items()},
                "unmapped": self.unmapped}

    @staticmethod
    def from_dict(d: dict) -> "Snapshot":
        return Snapshot(source=d["source"], version=d["version"],
                        factions={k: Faction.from_dict(v) for k, v in d.get("factions", {}).items()},
                        unmapped=d.get("unmapped", []))
