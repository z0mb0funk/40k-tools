window.WARGEAR_RULES = window.WARGEAR_RULES || {};
window.WARGEAR_RULES["astra-militarum"] = {
  "armoured-sentinels": [
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "multi-laser"
      ],
      "choices": [
        "autocannon",
        "heavy flamer",
        "lascannon",
        "missile launcher",
        "plasma cannon"
      ],
      "costs_points": false
    },
    {
      "type": "add_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [],
      "choices": [
        "sentinel chainsaw"
      ],
      "costs_points": false
    },
    {
      "type": "add_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [],
      "choices": [
        "hunter-killer missile"
      ],
      "costs_points": false
    }
  ],
  "artillery-team": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "heavy mortar"
      ],
      "choices": [
        "siege cannon",
        "heavy quad launcher",
        "multiple rocket launcher"
      ],
      "costs_points": false
    }
  ],
  "attilan-rough-riders": [
    {
      "type": "replace_per_n",
      "eligible_models": "model",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "hunting lance"
      ],
      "choices": [
        "goad lance"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "Rough Rider Sergeant",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "power sabre"
      ],
      "costs_points": false
    }
  ],
  "baneblade": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "twin heavy flamers"
      ],
      "choices": [
        "twin heavy bolters"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        [
          "lascannons",
          "twin heavy bolters"
        ],
        [
          "lascannons",
          "twin heavy flamers"
        ]
      ],
      "costs_points": false
    }
  ],
  "banehammer": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "twin heavy flamers"
      ],
      "choices": [
        "twin heavy bolters"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        [
          "lascannons",
          "twin heavy bolters"
        ],
        [
          "lascannons",
          "twin heavy flamers"
        ]
      ],
      "costs_points": false
    }
  ],
  "banesword": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "twin heavy flamers"
      ],
      "choices": [
        "twin heavy bolters"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        [
          "lascannons",
          "twin heavy bolters"
        ],
        [
          "lascannons",
          "twin heavy flamers"
        ]
      ],
      "costs_points": false
    }
  ],
  "basilisk": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "heavy bolter"
      ],
      "choices": [
        "heavy flamer"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "hunter-killer missile"
      ],
      "costs_points": false
    }
  ],
  "bullgryn-squad": [
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "grenadier gauntlet"
      ],
      "choices": [
        "bullgryn maul"
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "slabshield"
      ],
      "choices": [
        "brute shield"
      ],
      "costs_points": false
    }
  ],
  "cadian-castellan": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "chainsword"
      ],
      "choices": [
        [
          "boltgun",
          "close combat weapon"
        ],
        "power fist",
        "power weapon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "laspistol"
      ],
      "choices": [
        "bolt pistol",
        "plasma pistol"
      ],
      "costs_points": false
    }
  ],
  "cadian-command-squad": [
    {
      "type": "replace_one",
      "eligible_models": "Cadian Veteran Guardsman",
      "max_swaps": 1,
      "replaces": [
        "lasgun",
        "regimental standard"
      ],
      "choices": [
        "flamer",
        "grenade launcher",
        "meltagun",
        "plasma gun"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Cadian Veteran Guardsman",
      "max_swaps": 1,
      "replaces": [
        "laspistol"
      ],
      "choices": [
        "bolt pistol",
        "plasma pistol"
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Cadian Commander",
      "max_swaps": 1,
      "replaces": [
        "laspistol"
      ],
      "choices": [
        "bolt pistol",
        "plasma pistol"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Cadian Veteran Guardsman",
      "max_swaps": 1,
      "replaces": [
        "chainsword"
      ],
      "choices": [
        [
          "flamer",
          "close combat weapon"
        ],
        [
          "grenade launcher",
          "close combat weapon"
        ],
        [
          "meltagun",
          "close combat weapon"
        ],
        [
          "plasma gun",
          "close combat weapon"
        ],
        "power fist",
        "power weapon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Cadian Commander",
      "max_swaps": 1,
      "replaces": [
        "chainsword"
      ],
      "choices": [
        "power fist",
        "power weapon"
      ],
      "costs_points": false
    }
  ],
  "cadian-heavy-weapons-squad": [
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "heavy bolter"
      ],
      "choices": [
        "autocannon",
        "lascannon",
        "missile launcher",
        "mortar"
      ],
      "costs_points": false
    }
  ],
  "cadian-recon-squad": [
    {
      "type": "replace_one",
      "eligible_models": "Recon Trooper",
      "max_swaps": 1,
      "replaces": [
        "lasgun"
      ],
      "choices": [
        "autostubber"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Recon Trooper",
      "max_swaps": 1,
      "replaces": [
        "lasgun"
      ],
      "choices": [
        "plasma gun",
        "meltagun"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Recon Trooper",
      "max_swaps": 1,
      "replaces": [
        "lasgun"
      ],
      "choices": [
        "long-las"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "Recon Trooper",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        [
          "vox-caster",
          "vox-relay beacon"
        ]
      ],
      "costs_points": false
    }
  ],
  "cadian-shock-troops": [
    {
      "type": "replace_per_n",
      "eligible_models": "Shock Troopers",
      "per_models": 10,
      "max_swaps": 2,
      "replaces": [
        "lasgun"
      ],
      "choices": [
        "flamer",
        "grenade launcher",
        "meltagun",
        "plasma gun"
      ],
      "costs_points": false
    },
    {
      "type": "add_per_n",
      "eligible_models": "Shock Trooper",
      "per_models": 10,
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "vox-caster"
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "Shock Trooper Sergeants",
      "max_swaps": null,
      "replaces": [
        "laspistol"
      ],
      "choices": [
        "bolt pistol"
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "Shock Trooper Sergeants",
      "max_swaps": null,
      "replaces": [
        "laspistol",
        "chainsword"
      ],
      "choices": [
        [
          "sergeant's autogun",
          "close combat weapon"
        ]
      ],
      "costs_points": false
    }
  ],
  "catachan-command-squad": [
    {
      "type": "replace_any",
      "eligible_models": "Veteran Guardsmen",
      "max_swaps": null,
      "replaces": [
        "lasgun"
      ],
      "choices": [
        "flamer",
        "grenade launcher",
        "heavy flamer",
        "meltagun",
        "plasma gun",
        "sniper rifle"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "Veteran Guardsman",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "master vox"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "Veteran Guardsman",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "medi-pack"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "Veteran Guardsman",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "regimental standard.  a model can only take 1 of these options"
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Catachan Commander",
      "max_swaps": 1,
      "replaces": [
        "laspistol"
      ],
      "choices": [
        "bolt pistol",
        "plasma pistol"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "Catachan Commander",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "boltgun",
        "chainsword",
        "power fist",
        "power weapon"
      ],
      "costs_points": false
    }
  ],
  "catachan-heavy-weapons-squad": [
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "heavy bolter"
      ],
      "choices": [
        "autocannon",
        "lascannon",
        "missile launcher",
        "mortar"
      ],
      "costs_points": false
    }
  ],
  "catachan-jungle-fighters": [
    {
      "type": "replace_per_n",
      "eligible_models": "Jungle Fighter",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "lasgun"
      ],
      "choices": [
        "flamer"
      ],
      "costs_points": false
    },
    {
      "type": "add_per_n",
      "eligible_models": "Jungle Fighter",
      "per_models": 10,
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "vox-caster"
      ],
      "costs_points": false
    }
  ],
  "chimera": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "heavy bolter"
      ],
      "choices": [
        "heavy flamer"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "multi-laser"
      ],
      "choices": [
        "heavy bolter",
        "heavy flamer"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "heavy stubber",
        "storm bolter"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "hunter-killer missile"
      ],
      "costs_points": false
    }
  ],
  "commissar": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "bolt pistol"
      ],
      "choices": [
        "plasma pistol"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "chainsword"
      ],
      "choices": [
        "power weapon"
      ],
      "costs_points": false
    }
  ],
  "death-korps-of-krieg": [
    {
      "type": "replace_per_n",
      "eligible_models": "Death Korps Troopers",
      "per_models": 10,
      "max_swaps": 2,
      "replaces": [
        "lasgun"
      ],
      "choices": [
        "flamer",
        "grenade launcher",
        "long-las",
        "meltagun",
        "plasma gun"
      ],
      "costs_points": false
    },
    {
      "type": "add_per_n",
      "eligible_models": "Death Korps Trooper",
      "per_models": 10,
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "death korps medi-pack"
      ],
      "costs_points": false
    },
    {
      "type": "add_per_n",
      "eligible_models": "Death Korps Trooper",
      "per_models": 10,
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "vox-caster.  a model can only take 1 of these options"
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "Death Korps Watchmasters",
      "max_swaps": null,
      "replaces": [
        "laspistol",
        "chainsword"
      ],
      "choices": [
        [
          "boltgun",
          "close combat weapon"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "Death Korps Watchmasters",
      "max_swaps": null,
      "replaces": [
        "chainsword"
      ],
      "choices": [
        "power weapon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "Death Korps Watchmasters",
      "max_swaps": null,
      "replaces": [
        "laspistol"
      ],
      "choices": [
        "bolt pistol",
        "plasma pistol"
      ],
      "costs_points": false
    }
  ],
  "deathstrike": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "heavy bolter"
      ],
      "choices": [
        "heavy flamer"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "hunter-killer missile"
      ],
      "costs_points": false
    }
  ],
  "doomhammer": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "twin heavy flamers"
      ],
      "choices": [
        "twin heavy bolters"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        [
          "lascannons",
          "twin heavy bolters"
        ],
        [
          "lascannons",
          "twin heavy flamers"
        ]
      ],
      "costs_points": false
    }
  ],
  "field-ordnance-battery": [
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "malleus rocket launcher"
      ],
      "choices": [
        "bombast field gun",
        "heavy lascannon"
      ],
      "costs_points": false
    }
  ],
  "hellhammer": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "twin heavy flamers"
      ],
      "choices": [
        "twin heavy bolters"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        [
          "lascannons",
          "twin heavy bolters"
        ],
        [
          "lascannons",
          "twin heavy flamers"
        ]
      ],
      "costs_points": false
    }
  ],
  "hellhound": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "inferno cannon"
      ],
      "choices": [
        "chem cannon",
        "melta cannon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "heavy flamer"
      ],
      "choices": [
        "heavy bolter",
        "multi-melta"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "hunter-killer missile"
      ],
      "costs_points": false
    }
  ],
  "hippogriff-afv": [
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "heavy stubber"
      ],
      "choices": [
        "meltagun"
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "vigilator cannon"
      ],
      "choices": [
        "chiron gatling cannon",
        "melta cannon",
        "lascannon"
      ],
      "costs_points": false
    }
  ],
  "hydra": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "heavy bolter"
      ],
      "choices": [
        "heavy flamer"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "hunter-killer missile"
      ],
      "costs_points": false
    }
  ],
  "kasrkin": [
    {
      "type": "replace_one",
      "eligible_models": "Kasrkin Troopers",
      "max_swaps": 4,
      "replaces": [
        "hot-shot lasgun"
      ],
      "choices": [
        "flamer",
        "grenade launcher",
        "hot-shot volley gun",
        "meltagun",
        "plasma gun"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Kasrkin Trooper",
      "max_swaps": 1,
      "replaces": [
        "hot-shot lasgun"
      ],
      "choices": [
        "hot-shot marksman rifle"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Kasrkin Trooper",
      "max_swaps": 1,
      "replaces": [
        "hot-shot lasgun"
      ],
      "choices": [
        [
          "hot-shot laspistol",
          "melta mine"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "Kasrkin Trooper",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "vox-caster"
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Kasrkin Sergeant",
      "max_swaps": 1,
      "replaces": [
        "chainsword"
      ],
      "choices": [
        "power weapon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Kasrkin Sergeant",
      "max_swaps": 1,
      "replaces": [
        "hot-shot laspistol"
      ],
      "choices": [
        "bolt pistol",
        "plasma pistol"
      ],
      "costs_points": false
    }
  ],
  "krieg-combat-engineers": [
    {
      "type": "replace_one",
      "eligible_models": "Krieg Combat Engineer",
      "max_swaps": 1,
      "replaces": [
        "autopistol",
        "trench club"
      ],
      "choices": [
        [
          "flamer",
          "close combat weapon"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Krieg Combat Engineer",
      "max_swaps": 1,
      "replaces": [
        "autopistol",
        "trench club"
      ],
      "choices": [
        [
          "autopistol",
          "remote mine",
          "close combat weapon"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "autopistol",
        "trench club"
      ],
      "choices": [
        [
          "combat shotgun",
          "close combat weapon"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Krieg Engineer Watchmaster",
      "max_swaps": 1,
      "replaces": [
        "autopistol"
      ],
      "choices": [
        "bolt pistol",
        "hand flamer",
        "plasma pistol"
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Krieg Engineer Watchmaster",
      "max_swaps": 1,
      "replaces": [
        "trench club"
      ],
      "choices": [
        "chainsword",
        "power weapon"
      ],
      "costs_points": false
    }
  ],
  "krieg-command-squad": [
    {
      "type": "replace_one",
      "eligible_models": "Veteran Guardsman",
      "max_swaps": 1,
      "replaces": [
        "boltgun"
      ],
      "choices": [
        "flamer",
        "grenade launcher",
        "meltagun",
        "plasma gun"
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Lord Commissar",
      "max_swaps": 1,
      "replaces": [
        "power weapon"
      ],
      "choices": [
        "power fist"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "Lord Commissar",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "plasma pistol"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Veteran Guardsman",
      "max_swaps": 1,
      "replaces": [
        "chainsword"
      ],
      "choices": [
        "trench club",
        "power weapon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Veteran Guardsman",
      "max_swaps": 1,
      "replaces": [
        "laspistol"
      ],
      "choices": [
        "bolt pistol",
        "plasma pistol"
      ],
      "costs_points": false
    }
  ],
  "krieg-heavy-weapons-squad": [
    {
      "type": "replace_any",
      "eligible_models": "Heavy Weapons Gunners",
      "max_swaps": null,
      "replaces": [
        "lascannon"
      ],
      "choices": [
        "krieg heavy flamer",
        "twin krieg heavy stubber"
      ],
      "costs_points": false
    }
  ],
  "leman-russ-battle-tank": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "lascannon"
      ],
      "choices": [
        "heavy bolter",
        "heavy flamer"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "heavy bolters",
        "heavy flamers",
        "multi-meltas",
        "plasma cannons"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "heavy stubber",
        "storm bolter"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "hunter-killer missile"
      ],
      "costs_points": false
    }
  ],
  "leman-russ-commander": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "leman russ battle cannon"
      ],
      "choices": [
        "demolisher battle cannon",
        "eradicator nova cannon",
        "executioner plasma cannon",
        "exterminator autocannon",
        "punisher gatling cannon",
        "vanquisher battle cannon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "lascannon"
      ],
      "choices": [
        "heavy bolter",
        "heavy flamer"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "heavy bolters",
        "heavy flamers",
        "multi-meltas",
        "plasma cannons"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "heavy stubber",
        "storm bolter"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "hunter-killer missile"
      ],
      "costs_points": false
    }
  ],
  "leman-russ-demolisher": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "lascannon"
      ],
      "choices": [
        "heavy bolter",
        "heavy flamer"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "heavy bolters",
        "heavy flamers",
        "multi-meltas",
        "plasma cannons"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "heavy stubber",
        "storm bolter"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "hunter-killer missile"
      ],
      "costs_points": false
    }
  ],
  "leman-russ-eradicator": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "lascannon"
      ],
      "choices": [
        "heavy bolter",
        "heavy flamer"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "heavy bolters",
        "heavy flamers",
        "multi-meltas",
        "plasma cannons"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "heavy stubber",
        "storm bolter"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "hunter-killer missile"
      ],
      "costs_points": false
    }
  ],
  "leman-russ-executioner": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "lascannon"
      ],
      "choices": [
        "heavy bolter",
        "heavy flamer"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "heavy bolters",
        "heavy flamers",
        "multi-meltas",
        "plasma cannons"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "heavy stubber",
        "storm bolter"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "hunter-killer missile"
      ],
      "costs_points": false
    }
  ],
  "leman-russ-exterminator": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "lascannon"
      ],
      "choices": [
        "heavy bolter",
        "heavy flamer"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "heavy bolters",
        "heavy flamers",
        "multi-meltas",
        "plasma cannons"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "heavy stubber",
        "storm bolter"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "hunter-killer missile"
      ],
      "costs_points": false
    }
  ],
  "leman-russ-punisher": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "lascannon"
      ],
      "choices": [
        "heavy bolter",
        "heavy flamer"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "heavy bolters",
        "heavy flamers",
        "multi-meltas",
        "plasma cannons"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "heavy stubber",
        "storm bolter"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "hunter-killer missile"
      ],
      "costs_points": false
    }
  ],
  "leman-russ-vanquisher": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "lascannon"
      ],
      "choices": [
        "heavy bolter",
        "heavy flamer"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "heavy bolters",
        "heavy flamers",
        "multi-meltas",
        "plasma cannons"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "heavy stubber",
        "storm bolter"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "hunter-killer missile"
      ],
      "costs_points": false
    }
  ],
  "manticore": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "heavy bolter"
      ],
      "choices": [
        "heavy flamer"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "hunter-killer missile"
      ],
      "costs_points": false
    }
  ],
  "militarum-tempestus-command-squad": [
    {
      "type": "replace_any",
      "eligible_models": "Tempestus Scions",
      "max_swaps": null,
      "replaces": [
        "hot-shot lasgun"
      ],
      "choices": [
        "flamer",
        "grenade launcher",
        "hot-shot volley gun",
        "meltagun",
        "plasma gun"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "Tempestus Scion",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "regimental standard"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Tempestus Scion",
      "max_swaps": 1,
      "replaces": [
        "hot-shot lasgun"
      ],
      "choices": [
        [
          "hot-shot laspistol",
          "master vox"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Tempestus Scion",
      "max_swaps": 1,
      "replaces": [
        "hot-shot lasgun"
      ],
      "choices": [
        [
          "hot-shot laspistol",
          "medi-pack"
        ],
        [
          "hot-shot lasgun",
          "hot-shot laspistol",
          "medi-pack"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Tempestor Prime",
      "max_swaps": 1,
      "replaces": [
        "bolt pistol"
      ],
      "choices": [
        "plasma pistol",
        "command rod"
      ],
      "costs_points": false
    }
  ],
  "ministorum-priest": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "zealot's vindictor"
      ],
      "choices": [
        [
          "holy pistol",
          "power weapon"
        ]
      ],
      "costs_points": false
    }
  ],
  "ogryn-bodyguard": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "ripper gun"
      ],
      "choices": [
        "grenadier gauntlet",
        "bullgryn maul"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "huge knife"
      ],
      "choices": [
        "brute shield",
        "slabshield"
      ],
      "costs_points": false
    }
  ],
  "ratlings": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "sniper rifle"
      ],
      "choices": [
        "tankstopper rifle"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "demolition gear"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "ratling battlemutt"
      ],
      "costs_points": false
    }
  ],
  "rogal-dorn-battle-tank": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "twin battle cannon"
      ],
      "choices": [
        [
          "oppressor cannon",
          "co-axial autocannon"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "castigator gatling cannon"
      ],
      "choices": [
        "pulveriser cannon"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "meltaguns",
        "additional heavy stubbers"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "heavy bolters",
        "multi-meltas"
      ],
      "costs_points": false
    }
  ],
  "rogal-dorn-commander": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "twin battle cannon"
      ],
      "choices": [
        [
          "oppressor cannon",
          "coaxial autocannon"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "castigator gatling cannon"
      ],
      "choices": [
        "pulveriser cannon"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "meltaguns",
        "additional heavy stubbers"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "heavy bolters",
        "multi-meltas"
      ],
      "costs_points": false
    }
  ],
  "scout-sentinels": [
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "multi-laser"
      ],
      "choices": [
        "autocannon",
        "heavy flamer",
        "lascannon",
        "missile launcher",
        "plasma cannon"
      ],
      "costs_points": false
    },
    {
      "type": "add_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [],
      "choices": [
        "sentinel chainsaw"
      ],
      "costs_points": false
    },
    {
      "type": "add_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [],
      "choices": [
        "hunter-killer missile"
      ],
      "costs_points": false
    }
  ],
  "shadowsword": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "twin heavy flamers"
      ],
      "choices": [
        "twin heavy bolters"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        [
          "lascannons",
          "twin heavy bolters"
        ],
        [
          "lascannons",
          "twin heavy flamers"
        ]
      ],
      "costs_points": false
    }
  ],
  "stormlord": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "twin heavy flamers"
      ],
      "choices": [
        "twin heavy bolters"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        [
          "lascannons",
          "twin heavy bolters"
        ],
        [
          "lascannons",
          "twin heavy flamers"
        ]
      ],
      "costs_points": false
    }
  ],
  "stormsword": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "twin heavy flamers"
      ],
      "choices": [
        "twin heavy bolters"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        [
          "lascannons",
          "twin heavy bolters"
        ],
        [
          "lascannons",
          "twin heavy flamers"
        ]
      ],
      "costs_points": false
    }
  ],
  "taurox": [
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "storm bolter"
      ],
      "costs_points": false
    }
  ],
  "taurox-prime": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "taurox battle cannon"
      ],
      "choices": [
        "taurox gatling cannon",
        "taurox missile launcher"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "twin taurox hot-shot volley gun"
      ],
      "choices": [
        "twin autocannon"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "storm bolter"
      ],
      "costs_points": false
    }
  ],
  "tempestus-aquilons": [
    {
      "type": "replace_leader",
      "eligible_models": "Tempestor Aquilon",
      "max_swaps": 1,
      "replaces": [
        "sentry flamer"
      ],
      "choices": [
        "sentry hot-shot volley gun",
        "sentry grenade launcher"
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Tempestor Aquilon",
      "max_swaps": 1,
      "replaces": [
        "hot-shot lascarbine"
      ],
      "choices": [
        "chainsword",
        "power weapon",
        "hot-shot laspistol"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "Tempestor Aquilon",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "bolt pistol",
        "hot-shot laspistol"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Tempestus Aquilon",
      "max_swaps": 1,
      "replaces": [
        "hot-shot lascarbine"
      ],
      "choices": [
        "melta carbine",
        "plasma carbine"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Tempestus Aquilon",
      "max_swaps": 1,
      "replaces": [
        "hot-shot lascarbine"
      ],
      "choices": [
        "hot-shot laspistols"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Tempestus Aquilon",
      "max_swaps": 1,
      "replaces": [
        "hot-shot lascarbine"
      ],
      "choices": [
        "hot-shot long-las"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Tempestus Aquilons",
      "max_swaps": 2,
      "replaces": [
        "hot-shot lascarbine"
      ],
      "choices": [
        "hot-shot laspistol"
      ],
      "costs_points": false
    }
  ],
  "tempestus-scions": [
    {
      "type": "replace_per_n",
      "eligible_models": "Tempestus Scions",
      "per_models": 5,
      "max_swaps": 2,
      "replaces": [
        "hot-shot lasgun"
      ],
      "choices": [
        "flamer",
        "grenade launcher",
        "hot-shot volley gun",
        "meltagun",
        "plasma gun"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Tempestus Scion",
      "max_swaps": 1,
      "replaces": [
        "hot-shot lasgun"
      ],
      "choices": [
        [
          "hot-shot laspistol",
          "vox-caster"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Tempestor",
      "max_swaps": 1,
      "replaces": [
        "chainsword"
      ],
      "choices": [
        "power fist",
        "power weapon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Tempestor",
      "max_swaps": 1,
      "replaces": [
        "hot-shot laspistol"
      ],
      "choices": [
        "bolt pistol",
        "plasma pistol"
      ],
      "costs_points": false
    }
  ],
  "valkyrie": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "multi-laser"
      ],
      "choices": [
        "lascannon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "hellstrike missiles"
      ],
      "choices": [
        "multiple rocket pods"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "heavy bolters"
      ],
      "costs_points": false
    }
  ],
  "wyvern": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "heavy bolter"
      ],
      "choices": [
        "heavy flamer"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "hunter-killer missile"
      ],
      "costs_points": false
    }
  ]
};
