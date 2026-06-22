window.WARGEAR_RULES = window.WARGEAR_RULES || {};
window.WARGEAR_RULES["chaos-space-marines"] = {
  "chaos-bikers": [
    {
      "type": "replace_leader",
      "eligible_models": "Biker Champion",
      "max_swaps": 1,
      "replaces": [
        "bolt pistol"
      ],
      "choices": [
        "plasma pistol",
        "accursed weapon",
        "astartes chainsword",
        "power fist"
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "Chaos Bikers",
      "max_swaps": null,
      "replaces": [
        "bolt pistol"
      ],
      "choices": [
        "astartes chainsword"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Chaos Bikers",
      "max_swaps": 2,
      "replaces": [
        "combi-bolter"
      ],
      "choices": [
        "flamer",
        "meltagun",
        "plasma gun"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "chaos icon"
      ],
      "costs_points": false
    }
  ],
  "chaos-land-raider": [
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "combi-bolter",
        "combi-weapon"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "havoc launcher"
      ],
      "costs_points": false
    }
  ],
  "chaos-lord": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "daemon hammer"
      ],
      "choices": [
        "accursed weapon",
        "astartes chainsword"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "plasma pistol"
      ],
      "choices": [
        "power fist"
      ],
      "costs_points": false
    }
  ],
  "chaos-lord-in-terminator-armour": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "combi-bolter"
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
        "exalted weapon"
      ],
      "choices": [
        "chainfist",
        "power fist"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "combi-bolter",
        "exalted weapon"
      ],
      "choices": [
        "paired accursed weapons"
      ],
      "costs_points": false
    }
  ],
  "chaos-lord-with-jump-pack": [
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
        "accursed weapon"
      ],
      "choices": [
        "power fist"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "bolt pistol",
        "accursed weapon"
      ],
      "choices": [
        "twin lightning claws"
      ],
      "costs_points": false
    }
  ],
  "chaos-predator-annihilator": [
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "heavy bolters",
        "lascannons"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "combi-bolter",
        "combi-weapon"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "havoc launcher"
      ],
      "costs_points": false
    }
  ],
  "chaos-predator-destructor": [
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "heavy bolters",
        "lascannons"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "combi-bolter",
        "combi-weapon"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "havoc launcher"
      ],
      "costs_points": false
    }
  ],
  "chaos-rhino": [
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "combi-bolter",
        "combi-weapon"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "havoc launcher or can replace 1 combi-bolter with 1 havoc launcher"
      ],
      "costs_points": false
    }
  ],
  "chaos-terminator-squad": [
    {
      "type": "replace_per_n",
      "eligible_models": "Terminator",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "combi-bolter"
      ],
      "choices": [
        "heavy flamer",
        "reaper autocannon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "combi-bolter"
      ],
      "choices": [
        "combi-weapon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "model",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "combi-bolter",
        "accursed weapon"
      ],
      "choices": [
        "paired accursed weapons"
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "models",
      "per_models": 5,
      "max_swaps": 3,
      "replaces": [
        "accursed weapon"
      ],
      "choices": [
        "power fist"
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "model",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "accursed weapon"
      ],
      "choices": [
        "chainfist"
      ],
      "costs_points": false
    }
  ],
  "chaos-vindicator": [
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "combi-bolter",
        "combi-weapon"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "havoc launcher"
      ],
      "costs_points": false
    }
  ],
  "chosen": [
    {
      "type": "replace_per_n",
      "eligible_models": "models",
      "per_models": 5,
      "max_swaps": 2,
      "replaces": [
        "bolt pistol"
      ],
      "choices": [
        "plasma pistol"
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "models",
      "per_models": 5,
      "max_swaps": 2,
      "replaces": [
        "boltgun"
      ],
      "choices": [
        "combi-weapon"
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
        "accursed weapon"
      ],
      "choices": [
        "paired accursed weapons"
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "model equipped with a boltgun",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "accursed weapon"
      ],
      "choices": [
        "power fist"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "chaos icon"
      ],
      "costs_points": false
    }
  ],
  "cultist-mob": [
    {
      "type": "replace_leader",
      "eligible_models": "Cultist Champion",
      "max_swaps": 1,
      "replaces": [
        "autopistol"
      ],
      "choices": [
        "bolt pistol"
      ],
      "costs_points": false
    }
  ],
  "defiler": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "hades battle cannon"
      ],
      "choices": [
        "ectoplasma destructor"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "excruciator cannons"
      ],
      "choices": [
        "magma cutters"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "heavy baleflamer"
      ],
      "choices": [
        "hades lascannon",
        "heavy reaper autocannon",
        "electroscourge"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "heavy missile launcher"
      ],
      "choices": [
        "hades lascannon",
        "heavy reaper autocannon",
        "electroscourge"
      ],
      "costs_points": false
    }
  ],
  "fellgor-beastmen": [
    {
      "type": "replace_leader",
      "eligible_models": "Fellgor Champion",
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
      "eligible_models": "Fellgor Beastman",
      "max_swaps": 1,
      "replaces": [
        "close combat weapon"
      ],
      "choices": [
        "great weapon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Fellgor Beastman",
      "max_swaps": 1,
      "replaces": [
        "close combat weapon"
      ],
      "choices": [
        "corrupted stave"
      ],
      "costs_points": false
    }
  ],
  "forgefiend": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "hades autocannons"
      ],
      "choices": [
        "ectoplasma cannons"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "forgefiend jaws"
      ],
      "choices": [
        [
          "ectoplasma cannon",
          "armoured limbs"
        ]
      ],
      "costs_points": false
    }
  ],
  "havocs": [
    {
      "type": "replace_leader",
      "eligible_models": "Havoc Champion",
      "max_swaps": 1,
      "replaces": [
        "astartes chainsword"
      ],
      "choices": [
        "accursed weapon",
        "power fist"
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Havoc Champion",
      "max_swaps": 1,
      "replaces": [
        "flamer"
      ],
      "choices": [
        "boltgun",
        "meltagun",
        "plasma gun",
        "plasma pistol",
        "accursed weapon",
        "power fist"
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "Havocs",
      "max_swaps": null,
      "replaces": [
        "havoc autocannon or havoc lascannon"
      ],
      "choices": [
        "havoc autocannon",
        "havoc heavy bolter",
        "havoc lascannon",
        "havoc missile launcher",
        "havoc reaper chaincannon"
      ],
      "costs_points": false
    }
  ],
  "helbrute": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "multi-melta"
      ],
      "choices": [
        "helbrute plasma cannon",
        "twin autocannon",
        "twin heavy bolter",
        "twin lascannon",
        "helbrute fist"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "missile launcher"
      ],
      "choices": [
        "helbrute fist",
        "helbrute hammer",
        "power scourge"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "combi-bolter",
        "heavy flamer"
      ],
      "costs_points": false
    }
  ],
  "heldrake": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "hades autocannon"
      ],
      "choices": [
        "baleflamer"
      ],
      "costs_points": false
    }
  ],
  "khorne-lord-of-skulls": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "gorestorm cannon"
      ],
      "choices": [
        "daemongore cannon",
        "ichor cannon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "hades gatling cannon"
      ],
      "choices": [
        "skullhurler"
      ],
      "costs_points": false
    }
  ],
  "legionaries": [
    {
      "type": "replace_leader",
      "eligible_models": "Aspiring Champion",
      "max_swaps": 1,
      "replaces": [
        "boltgun"
      ],
      "choices": [
        "plasma pistol",
        "accursed weapon",
        "astartes chainsword",
        "heavy melee weapon maximum 1 per model"
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Aspiring Champion",
      "max_swaps": 1,
      "replaces": [
        "bolt pistol"
      ],
      "choices": [
        "plasma pistol",
        "accursed weapon",
        "astartes chainsword",
        "heavy melee weapon maximum 1 per model"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "chaos icon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "Legionaries",
      "max_swaps": null,
      "replaces": [
        "boltgun"
      ],
      "choices": [
        "astartes chainsword"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Legionary",
      "max_swaps": 1,
      "replaces": [
        "boltgun"
      ],
      "choices": [
        "heavy melee weapon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Legionary",
      "max_swaps": 1,
      "replaces": [
        "boltgun"
      ],
      "choices": [
        "balefire tome"
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "Legionary",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "boltgun"
      ],
      "choices": [
        "one of the following (duplicates are not allowed):",
        [
          "plasma pistol",
          "astartes chainsword"
        ],
        "flamer",
        "havoc autocannon",
        "heavy bolter",
        "lascannon",
        "meltagun",
        "missile launcher",
        "plasma gun",
        "reaper chaincannon"
      ],
      "costs_points": false
    }
  ],
  "lord-discordant-on-helstalker": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "helstalker autocannon"
      ],
      "choices": [
        "baleflamer"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "techno-virus injector"
      ],
      "choices": [
        "magma cutter"
      ],
      "costs_points": false
    }
  ],
  "maulerfiend": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "lasher tendrils"
      ],
      "choices": [
        "magma cutters"
      ],
      "costs_points": false
    }
  ],
  "nemesis-claw": [
    {
      "type": "replace_leader",
      "eligible_models": "Visionary",
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
      "type": "replace_leader",
      "eligible_models": "Visionary",
      "max_swaps": 1,
      "replaces": [
        "nostraman chainblade"
      ],
      "choices": [
        "accursed weapon",
        "power fist"
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "Legionaries",
      "max_swaps": null,
      "replaces": [
        "boltgun"
      ],
      "choices": [
        "astartes chainsword"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "boltgun"
      ],
      "choices": [
        "heavy bolter",
        "missile launcher"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Legionary",
      "max_swaps": 1,
      "replaces": [
        "boltgun"
      ],
      "choices": [
        "flamer",
        "meltagun",
        "plasma gun"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Legionaries",
      "max_swaps": 4,
      "replaces": [
        "boltgun"
      ],
      "choices": [
        "(duplicates are not allowed):",
        "accursed weapon",
        "nostraman chainglaive",
        "paired accursed weapons",
        [
          "voice eater",
          "astartes chainsword"
        ]
      ],
      "costs_points": false
    }
  ],
  "possessed": [
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "chaos icon"
      ],
      "costs_points": false
    }
  ],
  "raptors": [
    {
      "type": "replace_leader",
      "eligible_models": "Raptor Champion",
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
      "type": "replace_leader",
      "eligible_models": "Raptor Champion",
      "max_swaps": 1,
      "replaces": [
        "astartes chainsword"
      ],
      "choices": [
        "accursed weapon 1 heavy melee weapon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "Raptors",
      "per_models": 5,
      "max_swaps": 2,
      "replaces": [
        "bolt pistol"
      ],
      "choices": [
        "plasma pistol"
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "Raptors",
      "per_models": 5,
      "max_swaps": 2,
      "replaces": [
        "astartes chainsword"
      ],
      "choices": [
        "heavy melee weapon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "Raptor",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "astartes chainsword"
      ],
      "choices": [
        "mutations"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Raptors",
      "max_swaps": 2,
      "replaces": [
        "astartes chainsword"
      ],
      "choices": [
        [
          "flamer",
          "close combat weapon 1 meltagun",
          "close combat weapon 1 plasma gun",
          "close combat weapon"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Raptors",
      "max_swaps": 2,
      "replaces": [
        "astartes chainsword"
      ],
      "choices": [
        [
          "one of the following options: 1 flamer",
          "close combat weapon 1 meltagun",
          "close combat weapon 1 plasma gun",
          "close combat weapon"
        ]
      ],
      "costs_points": false
    }
  ],
  "red-corsairs-raiders": [
    {
      "type": "replace_leader",
      "eligible_models": "Red Corsairs Raider Champion",
      "max_swaps": 1,
      "replaces": [
        "bolt pistol"
      ],
      "choices": [
        "hand flamer"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "boltgun"
      ],
      "choices": [
        "meltagun",
        "red corsairs raider's reaver's blade can be replaced with 1 power fist"
      ],
      "costs_points": false
    }
  ],
  "red-corsairs-reave-captain": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "power sword"
      ],
      "choices": [
        "power maul"
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
    }
  ],
  "sorcerer-in-terminator-armour": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "combi-bolter"
      ],
      "choices": [
        "combi-weapon"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "chaos familiar"
      ],
      "costs_points": false
    }
  ],
  "traitor-guardsmen-squad": [
    {
      "type": "replace_one",
      "eligible_models": "Traitor Guardsmen",
      "max_swaps": 3,
      "replaces": [
        "lasgun"
      ],
      "choices": [
        "(duplicates are not allowed):",
        "cultist grenade launcher",
        "flamer",
        "meltagun",
        "plasma gun",
        "cultist sniper rifle"
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Traitor Sergeant",
      "max_swaps": 1,
      "replaces": [
        "close combat weapon"
      ],
      "choices": [
        "chainsword",
        "power weapon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Traitor Sergeant",
      "max_swaps": 1,
      "replaces": [
        "corrupted pistol"
      ],
      "choices": [
        "boltgun"
      ],
      "costs_points": false
    }
  ]
};
