window.WARGEAR_RULES = window.WARGEAR_RULES || {};
window.WARGEAR_RULES["imperial-agents"] = {
  "aquila-kill-team": [
    {
      "type": "replace_per_n",
      "eligible_models": "model",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "infernus heavy bolter"
      ],
      "choices": [
        "frag cannon.",
        [
          "hellstorm bolt rifle",
          "astartes grenade launcher"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "model",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "heavy thunder hammer"
      ],
      "choices": [
        [
          "power weapon",
          "astartes shield"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "model",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "stalker bolt rifle"
      ],
      "choices": [
        "plasma incinerator"
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "model",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "deathwatch marksman bolt carbine"
      ],
      "choices": [
        "combat knife"
      ],
      "costs_points": false
    }
  ],
  "corvus-blackstar": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "twin assault cannon"
      ],
      "choices": [
        "twin lascannon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "blackstar rocket launchers"
      ],
      "choices": [
        "stormstrike missile launchers"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "hurricane bolter"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "auspex array",
        "infernum halo-launcher"
      ],
      "costs_points": false
    }
  ],
  "deathwatch-kill-team": [
    {
      "type": "replace_per_n",
      "eligible_models": "models",
      "per_models": 5,
      "max_swaps": 2,
      "replaces": [
        "boltgun",
        "power weapon"
      ],
      "choices": [
        [
          "boltgun",
          "astartes shield"
        ],
        [
          "power weapon",
          "astartes shield"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "models",
      "per_models": 5,
      "max_swaps": 2,
      "replaces": [
        "boltgun",
        "power weapon"
      ],
      "choices": [
        "deathwatch thunder hammer"
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "model",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "boltgun",
        "power weapon"
      ],
      "choices": [
        [
          "stalker-pattern boltgun",
          "close combat weapon"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "models",
      "per_models": 5,
      "max_swaps": 2,
      "replaces": [
        "boltgun",
        "power weapon"
      ],
      "choices": [
        [
          "deathwatch shotgun",
          "close combat weapon"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "model",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "boltgun",
        "power weapon"
      ],
      "choices": [
        [
          "frag cannon",
          "close combat weapon"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "model",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "boltgun",
        "power weapon"
      ],
      "choices": [
        [
          "infernus heavy bolter",
          "close combat weapon"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "model",
      "max_swaps": 1,
      "replaces": [
        "boltgun",
        "power weapon"
      ],
      "choices": [
        "black shield blades"
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Watch Sergeant",
      "max_swaps": 1,
      "replaces": [
        "power weapon"
      ],
      "choices": [
        "xenophase blade"
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Watch Sergeant",
      "max_swaps": 1,
      "replaces": [
        "boltgun"
      ],
      "choices": [
        "combi-weapon"
      ],
      "costs_points": false
    }
  ],
  "exaction-squad": [
    {
      "type": "replace_one",
      "eligible_models": "Exaction Vigilants",
      "max_swaps": 2,
      "replaces": [
        "arbites combat shotguns"
      ],
      "choices": [
        "(duplicates are not allowed):",
        "executioner shotgun",
        "arbites grenade launcher",
        "heavy stubber",
        "webber"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "Exaction Vigilant that is",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "excruciator maul"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "other Exaction Vigilant that is",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "arbites medi-kit"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "other Exaction Vigilant that is",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "soulguilt scanner"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "nuncio aquila"
      ],
      "costs_points": false
    }
  ],
  "grey-knights-terminator-squad": [
    {
      "type": "replace_one",
      "eligible_models": "Grey Knights Terminator",
      "max_swaps": 1,
      "replaces": [
        "storm bolter"
      ],
      "choices": [
        "incinerator",
        "psilencer",
        "psycannon"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "Grey Knights Terminator",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "ancient's banner"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Grey Knights Terminator",
      "max_swaps": 1,
      "replaces": [
        "storm bolter"
      ],
      "choices": [
        "narthecium"
      ],
      "costs_points": false
    }
  ],
  "imperial-navy-breachers": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "navis shotgun"
      ],
      "choices": [
        [
          "autopistol",
          "chainsword"
        ],
        [
          "bolt pistol",
          "power weapon"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Navis Armsman",
      "max_swaps": 1,
      "replaces": [
        "navis las-volley"
      ],
      "choices": [
        "meltagun",
        "plasma gun"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Navis Armsman",
      "max_swaps": 1,
      "replaces": [
        "navis shotgun"
      ],
      "choices": [
        [
          "autopistol",
          "power weapon"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Navis Armsman",
      "max_swaps": 1,
      "replaces": [
        "navis shotgun"
      ],
      "choices": [
        [
          "autopistol",
          "chainfist"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "demolition charge"
      ],
      "costs_points": false
    }
  ],
  "imperial-rhino": [
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
  "inquisitor": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "bolt pistol"
      ],
      "choices": [
        "combi-weapon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "blessed wardings"
      ],
      "choices": [
        [
          "psychic gifts",
          "psychic shock wave"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "if this model is equipped with 1 psychic gifts, its inquisitorial melee weapon"
      ],
      "choices": [
        "force weapon"
      ],
      "costs_points": false
    }
  ],
  "inquisitorial-agents": [
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "tome-skull"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "plasma pistol"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "eviscerator"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "mystic stave"
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "Gun Servitors",
      "max_swaps": null,
      "replaces": [
        "heavy bolter"
      ],
      "choices": [
        "multi-melta",
        "plasma cannon"
      ],
      "costs_points": false
    }
  ],
  "inquisitorial-chimera": [
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
  "sanctifiers": [
    {
      "type": "replace_one",
      "eligible_models": "Missionary",
      "max_swaps": 1,
      "replaces": [
        "plasma gun"
      ],
      "choices": [
        "meltagun"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "Missionary model",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "holy fire"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Sanctifier",
      "max_swaps": 1,
      "replaces": [
        "sanctifier melee weapon"
      ],
      "choices": [
        [
          "ministorum hand flamer",
          "close combat weapon"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Sanctifier",
      "max_swaps": 1,
      "replaces": [
        "sanctifier melee weapon"
      ],
      "choices": [
        [
          "close combat weapon",
          "simulacrum imperialis"
        ]
      ],
      "costs_points": false
    }
  ],
  "sisters-of-battle-immolator": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "immolation flamers"
      ],
      "choices": [
        "twin heavy bolter",
        "twin multi-melta"
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
  "sisters-of-battle-squad": [
    {
      "type": "replace_leader",
      "eligible_models": "Sister Superior",
      "max_swaps": 1,
      "replaces": [
        "boltgun"
      ],
      "choices": [
        "bolt pistol",
        "combi-weapon",
        "condemnor boltgun",
        "inferno pistol",
        "ministorum hand flamer",
        "plasma pistol"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "Sister Superior",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "chainsword",
        "power weapon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Battle Sister",
      "max_swaps": 1,
      "replaces": [
        "boltgun"
      ],
      "choices": [
        "artificer-crafted storm bolter",
        "meltagun",
        "ministorum flamer"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Battle Sister",
      "max_swaps": 1,
      "replaces": [
        "boltgun"
      ],
      "choices": [
        "artificer-crafted storm bolter",
        "heavy bolter",
        "meltagun",
        "ministorum flamer",
        "ministorum heavy flamer",
        "multi-melta"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "Battle Sister",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "simulacrum imperialis"
      ],
      "costs_points": false
    }
  ],
  "subductor-squad": [
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "nuncio aquila"
      ],
      "costs_points": false
    }
  ],
  "vigilant-squad": [
    {
      "type": "replace_one",
      "eligible_models": "Vigilants",
      "max_swaps": 2,
      "replaces": [
        "arbites combat shotgun"
      ],
      "choices": [
        "(duplicates are not allowed):",
        "executioner shotgun",
        "arbites grenade launcher",
        "heavy stubber",
        "webber"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "nuncio aquila"
      ],
      "costs_points": false
    }
  ]
};
