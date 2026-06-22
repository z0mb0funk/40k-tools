window.WARGEAR_RULES = window.WARGEAR_RULES || {};
window.WARGEAR_RULES["adepta-sororitas"] = {
  "battle-sisters-squad": [
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
  "canoness": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "bolt pistol"
      ],
      "choices": [
        "condemnor boltgun",
        "inferno pistol",
        "plasma pistol"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "hallowed chainsword"
      ],
      "choices": [
        "blessed blade",
        "power weapon"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "brazier of holy fire",
        "null rod"
      ],
      "costs_points": false,
      "condition": "a hallowed chainsword"
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "rod of office"
      ],
      "costs_points": false,
      "condition": "a plasma pistol and a power weapon"
    }
  ],
  "canoness-with-jump-pack": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "blessed halberd"
      ],
      "choices": [
        "holy eviscerator",
        [
          "ministorum hand flamer",
          "power weapon"
        ]
      ],
      "costs_points": false
    }
  ],
  "castigator": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "castigator autocannons"
      ],
      "choices": [
        "castigator battle cannon"
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
  "celestian-insidiants": [
    {
      "type": "replace_leader",
      "eligible_models": "Celestian Insidiant",
      "max_swaps": 1,
      "replaces": [
        "superior's condemnor bolt pistol"
      ],
      "choices": [
        "inferno pistol"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Celestian Insidiants",
      "max_swaps": 2,
      "replaces": [
        "condemnor bolt pistol"
      ],
      "choices": [
        "ministorum hand flamer"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Celestian Insidiants",
      "max_swaps": 2,
      "replaces": [
        "condemnor bolt pistol",
        "null mace"
      ],
      "choices": [
        "blessed sword"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Celestian Insidiant",
      "max_swaps": 1,
      "replaces": [
        "condemnor bolt pistol",
        "null mace"
      ],
      "choices": [
        "virge of admonition"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Celestian Insidiant",
      "max_swaps": 1,
      "replaces": [
        "condemnor bolt pistol"
      ],
      "choices": [
        "denuncia oratory"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "Celestian Insidiant",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "simulacrum imperialis"
      ],
      "costs_points": false
    }
  ],
  "celestian-sacresants": [
    {
      "type": "replace_leader",
      "eligible_models": "Sacresant Superior",
      "max_swaps": 1,
      "replaces": [
        "hallowed mace"
      ],
      "choices": [
        "spear of the faithful"
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Sacresant Superior",
      "max_swaps": 1,
      "replaces": [
        "bolt pistol"
      ],
      "choices": [
        "inferno pistol",
        "ministorum hand flamer",
        "plasma pistol"
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "hallowed mace"
      ],
      "choices": [
        "anointed halberd"
      ],
      "costs_points": false
    }
  ],
  "dominion-squad": [
    {
      "type": "replace_leader",
      "eligible_models": "Dominion Superior",
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
      "eligible_models": "Dominion Superior",
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
      "eligible_models": "Dominions",
      "max_swaps": 4,
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
      "type": "add_one",
      "eligible_models": "Dominion",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "simulacrum imperialis"
      ],
      "costs_points": false
    }
  ],
  "exorcist": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "exorcist missile launcher"
      ],
      "choices": [
        "exorcist conflagration rockets"
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
  "immolator": [
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
  "mortifiers": [
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "anchorite sarcophagus"
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "heavy bolters"
      ],
      "choices": [
        [
          "heavy bolter",
          "mortifier flamer"
        ],
        "mortifier flamers"
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "twin penitent buzz-blades"
      ],
      "choices": [
        "twin penitent flails",
        [
          "penitent buzz-blade",
          "penitent flail"
        ]
      ],
      "costs_points": false
    }
  ],
  "palatine": [
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
    }
  ],
  "paragon-warsuits": [
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "paragon storm bolters"
      ],
      "choices": [
        "paragon grenade launchers"
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "heavy bolter"
      ],
      "choices": [
        "ministorum heavy flamer",
        "multi-melta"
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "paragon war blade"
      ],
      "choices": [
        "paragon war mace"
      ],
      "costs_points": false
    }
  ],
  "penitent-engines": [
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "twin penitent buzz-blades"
      ],
      "choices": [
        [
          "penitent buzz-blade",
          "penitent flail"
        ],
        "twin penitent flails"
      ],
      "costs_points": false
    }
  ],
  "retributor-squad": [
    {
      "type": "replace_leader",
      "eligible_models": "Retributor Superior",
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
      "eligible_models": "Retributor Superior",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "chainsword",
        "power weapon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "Retributor",
      "max_swaps": null,
      "replaces": [
        "heavy bolter"
      ],
      "choices": [
        "ministorum heavy flamer",
        "multi-melta"
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
  "seraphim-squad": [
    {
      "type": "replace_leader",
      "eligible_models": "Seraphim Superior",
      "max_swaps": 1,
      "replaces": [
        "bolt pistols"
      ],
      "choices": [
        [
          "bolt pistol",
          "chainsword"
        ],
        [
          "bolt pistol",
          "plasma pistol"
        ],
        [
          "bolt pistol",
          "power weapon"
        ],
        [
          "plasma pistol",
          "chainsword"
        ],
        [
          "plasma pistol",
          "power weapon"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "Seraphim",
      "per_models": 5,
      "max_swaps": 2,
      "replaces": [
        "bolt pistols"
      ],
      "choices": [
        "inferno pistols",
        "ministorum hand flamers"
      ],
      "costs_points": false
    }
  ],
  "sisters-novitiate-squad": [
    {
      "type": "replace_leader",
      "eligible_models": "Novitiate Superior",
      "max_swaps": 1,
      "replaces": [
        "bolt pistol",
        "boltgun"
      ],
      "choices": [
        [
          "bolt pistol",
          "power weapon"
        ],
        [
          "plasma pistol",
          "power weapon"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Sister Novitiate",
      "max_swaps": 1,
      "replaces": [
        "autogun"
      ],
      "choices": [
        "sacred banner"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Sister Novitiate",
      "max_swaps": 1,
      "replaces": [
        "autogun"
      ],
      "choices": [
        "simulacrum imperialis"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Sisters Novitiate",
      "max_swaps": 2,
      "replaces": [
        "autogun"
      ],
      "choices": [
        "ministorum flamer"
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "Sisters Novitiate",
      "max_swaps": null,
      "replaces": [
        "autogun",
        "close combat weapon"
      ],
      "choices": [
        "novitiate melee weapons"
      ],
      "costs_points": false
    }
  ],
  "sororitas-rhino": [
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
  "zephyrim-squad": [
    {
      "type": "add_one",
      "eligible_models": "Zephyrim Superior",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "sacred banner"
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Zephyrim Superior",
      "max_swaps": 1,
      "replaces": [
        "bolt pistol"
      ],
      "choices": [
        "plasma pistol"
      ],
      "costs_points": false
    }
  ]
};
