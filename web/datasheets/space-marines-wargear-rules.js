window.WARGEAR_RULES = window.WARGEAR_RULES || {};
window.WARGEAR_RULES["space-marines"] = {
  "aggressor-squad": [
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "flamestorm gauntlets"
      ],
      "choices": [
        [
          "auto boltstorm gauntlets",
          "fragstorm grenade launcher"
        ]
      ],
      "costs_points": false
    }
  ],
  "ancient": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "bolt rifle",
        "close combat weapon"
      ],
      "choices": [
        "power weapon"
      ],
      "costs_points": false
    }
  ],
  "ancient-in-terminator-armour": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "power fist"
      ],
      "choices": [
        "chainfist",
        "close combat weapon",
        "power weapon",
        "thunder hammer"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "storm bolter",
        "power fist"
      ],
      "choices": [
        "twin lightning claws",
        [
          "thunder hammer",
          "terminator storm shield"
        ]
      ],
      "costs_points": false
    }
  ],
  "assault-intercessor-squad": [
    {
      "type": "replace_leader",
      "eligible_models": "Assault Intercessor Sergeant",
      "max_swaps": 1,
      "replaces": [
        "heavy bolt pistol"
      ],
      "choices": [
        "hand flamer",
        "plasma pistol"
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Assault Intercessor Sergeant",
      "max_swaps": 1,
      "replaces": [
        "astartes chainsword"
      ],
      "choices": [
        "power fist",
        "power weapon",
        "thunder hammer"
      ],
      "costs_points": false
    }
  ],
  "assault-intercessors-with-jump-packs": [
    {
      "type": "replace_per_n",
      "eligible_models": "Assault Intercessor with Jump Pack",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "heavy bolt pistol"
      ],
      "choices": [
        "plasma pistol"
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Assault Intercessor Sergeant with Jump Pack",
      "max_swaps": 1,
      "replaces": [
        "astartes chainsword"
      ],
      "choices": [
        "power weapon",
        "power fist"
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Assault Intercessor Sergeant with Jump Pack",
      "max_swaps": 1,
      "replaces": [
        "heavy bolt pistol"
      ],
      "choices": [
        "hand flamer",
        "plasma pistol"
      ],
      "costs_points": false
    }
  ],
  "astraeus": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "astraeus las-rippers"
      ],
      "choices": [
        "plasma eradicators"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "twin heavy bolter"
      ],
      "choices": [
        "twin lascannon"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "ironhail heavy stubber"
      ],
      "costs_points": false
    }
  ],
  "bladeguard-veteran-squad": [
    {
      "type": "replace_leader",
      "eligible_models": "Bladeguard Veteran Sergeant",
      "max_swaps": 1,
      "replaces": [
        "heavy bolt pistol"
      ],
      "choices": [
        "neo-volkite pistol",
        "plasma pistol"
      ],
      "costs_points": false
    }
  ],
  "brutalis-dreadnought": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "twin heavy bolter"
      ],
      "choices": [
        "twin multi-melta"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "brutalis fists",
        "brutalis bolt rifles"
      ],
      "choices": [
        "brutalis talons"
      ],
      "costs_points": false
    }
  ],
  "captain": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "bolt pistol, master-crafted bolter",
        "close combat weapon"
      ],
      "choices": [
        [
          "heavy bolt pistol",
          "power fist"
        ],
        [
          "heavy bolt pistol",
          "master-crafted power weapon"
        ],
        [
          "neo-volkite pistol",
          "power fist"
        ],
        [
          "neo-volkite pistol",
          "master-crafted power weapon"
        ],
        [
          "plasma pistol",
          "power fist"
        ],
        [
          "plasma pistol",
          "master-crafted power weapon"
        ],
        [
          "heavy bolt pistol",
          "master-crafted power weapon",
          "relic shield"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "close combat weapon"
      ],
      "choices": [
        "master-crafted power weapon",
        "power fist"
      ],
      "costs_points": false
    }
  ],
  "captain-in-gravis-armour": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "master-crafted heavy bolt rifle",
        "master-crafted power weapon"
      ],
      "choices": [
        [
          "boltstorm gauntlet",
          "power fist",
          "relic chainsword"
        ],
        [
          "boltstorm gauntlet",
          "power fist",
          "relic blade"
        ],
        [
          "boltstorm gauntlet",
          "power fist",
          "relic fist"
        ]
      ],
      "costs_points": false
    }
  ],
  "captain-in-terminator-armour": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "storm bolter"
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
        "relic weapon"
      ],
      "choices": [
        "relic fist"
      ],
      "costs_points": false
    }
  ],
  "captain-with-jump-pack": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "heavy bolt pistol"
      ],
      "choices": [
        "plasma pistol",
        "hand flamer"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "astartes chainsword"
      ],
      "choices": [
        "power fist",
        "relic weapon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "heavy bolt pistol",
        "astartes chainsword"
      ],
      "choices": [
        [
          "thunder hammer",
          "relic shield"
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
        "relic shield"
      ],
      "costs_points": false,
      "condition": "a heavy bolt pistol and an astartes chainsword"
    }
  ],
  "centurion-assault-squad": [
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "twin flamer"
      ],
      "choices": [
        "twin meltagun"
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "centurion bolters"
      ],
      "choices": [
        "centurion assault launcher"
      ],
      "costs_points": false
    }
  ],
  "centurion-devastator-squad": [
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "centurion bolters"
      ],
      "choices": [
        "centurion missile launcher"
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "grav-cannon"
      ],
      "choices": [
        "twin heavy bolter",
        "twin lascannon"
      ],
      "costs_points": false
    }
  ],
  "chaplain-in-terminator-armour": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "storm bolter"
      ],
      "choices": [
        "relic shield"
      ],
      "costs_points": false
    }
  ],
  "chaplain-with-jump-pack": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "bolt pistol"
      ],
      "choices": [
        "boltgun",
        "combi-weapon",
        "grav-pistol",
        "hand flamer",
        "inferno pistol",
        "plasma pistol",
        "storm bolter",
        "power fist"
      ],
      "costs_points": false
    }
  ],
  "desolation-squad": [
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "superfrag rocket launcher"
      ],
      "choices": [
        "superkrak rocket launcher"
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Desolation Sergeant",
      "max_swaps": 1,
      "replaces": [
        "superfrag rocket launcher or superkrak rocket launcher"
      ],
      "choices": [
        "vengor launcher"
      ],
      "costs_points": false
    }
  ],
  "devastator-squad": [
    {
      "type": "replace_one",
      "eligible_models": "Devastator Marines",
      "max_swaps": 4,
      "replaces": [
        "boltgun"
      ],
      "choices": [
        "grav-cannon",
        "heavy bolter",
        "lascannon",
        "missile launcher",
        "multi-melta",
        "plasma cannon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Devastator Sergeant",
      "max_swaps": 1,
      "replaces": [
        "bolt pistol",
        "boltgun"
      ],
      "choices": [
        "different weapons from the following list:",
        "astartes chainsword",
        "bolt pistol",
        "boltgun",
        "combi-weapon",
        "grav-pistol",
        "plasma pistol",
        "power fist",
        "power weapon",
        "thunder hammer this model can only be equipped with 2 ranged weapons if 1 of them is a pistol (and it can only have 1 pistol)"
      ],
      "costs_points": false
    }
  ],
  "dreadnought": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "assault cannon"
      ],
      "choices": [
        "heavy plasma cannon",
        "multi-melta",
        "twin lascannon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "dreadnought combat weapon",
        "storm bolter"
      ],
      "choices": [
        [
          "missile launcher",
          "close combat weapon"
        ],
        [
          "heavy flamer",
          "dreadnought combat weapon"
        ]
      ],
      "costs_points": false
    }
  ],
  "eliminator-squad": [
    {
      "type": "replace_leader",
      "eligible_models": "Eliminator Sergeant",
      "max_swaps": 1,
      "replaces": [
        "bolt sniper rifle"
      ],
      "choices": [
        "instigator bolt carbine",
        "las fusil"
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "Eliminators",
      "max_swaps": null,
      "replaces": [
        "bolt sniper rifle"
      ],
      "choices": [
        "las fusil"
      ],
      "costs_points": false
    }
  ],
  "eradicator-squad": [
    {
      "type": "replace_per_n",
      "eligible_models": "Eradicator",
      "per_models": 3,
      "max_swaps": 1,
      "replaces": [
        "melta rifle"
      ],
      "choices": [
        "multi-melta"
      ],
      "costs_points": false
    }
  ],
  "firestrike-servo-turrets": [
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "twin firestrike las-talon"
      ],
      "choices": [
        "twin firestrike autocannon"
      ],
      "costs_points": false
    }
  ],
  "gladiator-lancer": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "storm bolters"
      ],
      "choices": [
        "fragstorm grenade launchers"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "ironhail heavy stubber"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "icarus rocket pod"
      ],
      "costs_points": false
    }
  ],
  "gladiator-reaper": [
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "ironhail heavy stubber"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "icarus rocket pod"
      ],
      "costs_points": false
    }
  ],
  "gladiator-valiant": [
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "ironhail heavy stubber"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "icarus rocket pod"
      ],
      "costs_points": false
    }
  ],
  "hammerfall-bunker": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "hammerfall heavy bolter array"
      ],
      "choices": [
        "hammerfall heavy flamer array"
      ],
      "costs_points": false
    }
  ],
  "heavy-intercessor-squad": [
    {
      "type": "replace_per_n",
      "eligible_models": "Heavy Intercessor",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "heavy bolt rifle"
      ],
      "choices": [
        "heavy bolter"
      ],
      "costs_points": false
    }
  ],
  "hellblaster-squad": [
    {
      "type": "replace_leader",
      "eligible_models": "Hellblaster Sergeant",
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
  "impulsor": [
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "ironhail heavy stubber"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "storm bolters"
      ],
      "choices": [
        "fragstorm grenade launchers"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "bellicatus missile array",
        "ironhail skytalon array",
        "orbital comms array",
        "shield dome"
      ],
      "costs_points": false
    }
  ],
  "inceptor-squad": [
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "assault bolters"
      ],
      "choices": [
        "plasma exterminators"
      ],
      "costs_points": false
    }
  ],
  "incursor-squad": [
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "haywire mine"
      ],
      "costs_points": false
    }
  ],
  "infiltrator-squad": [
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "helix gauntlet"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "infiltrator comms array"
      ],
      "costs_points": false
    }
  ],
  "intercessor-squad": [
    {
      "type": "replace_leader",
      "eligible_models": "Intercessor Sergeant",
      "max_swaps": 1,
      "replaces": [
        "bolt rifle"
      ],
      "choices": [
        "astartes chainsword",
        "hand flamer",
        "plasma pistol",
        "power weapon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Intercessor Sergeant",
      "max_swaps": 1,
      "replaces": [
        "close combat weapon"
      ],
      "choices": [
        "astartes chainsword",
        "power fist",
        "power weapon",
        "thunder hammer"
      ],
      "costs_points": false
    },
    {
      "type": "add_per_n",
      "eligible_models": "model",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "astartes grenade launcher"
      ],
      "costs_points": false
    }
  ],
  "invader-atv": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "onslaught gatling cannon"
      ],
      "choices": [
        "multi-melta"
      ],
      "costs_points": false
    }
  ],
  "invictor-tactical-warsuit": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "incendium cannon"
      ],
      "choices": [
        "twin ironhail autocannon"
      ],
      "costs_points": false
    }
  ],
  "land-raider": [
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
        "storm bolter"
      ],
      "costs_points": false
    }
  ],
  "land-raider-crusader": [
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
        "storm bolter"
      ],
      "costs_points": false
    }
  ],
  "land-raider-redeemer": [
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
        "storm bolter"
      ],
      "costs_points": false
    }
  ],
  "land-speeder": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "onslaught gatling cannon"
      ],
      "choices": [
        "heavy flamer"
      ],
      "costs_points": false
    }
  ],
  "librarian-in-terminator-armour": [
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "combi-weapon",
        "storm bolter"
      ],
      "costs_points": false
    }
  ],
  "lieutenant": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "master-crafted bolt rifle"
      ],
      "choices": [
        "plasma pistol",
        "master-crafted power weapon",
        "power fist"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "bolt pistol, master-crafted bolt rifle",
        "close combat weapon"
      ],
      "choices": [
        [
          "neo-volkite pistol",
          "master-crafted power weapon",
          "storm shield"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "bolt pistol"
      ],
      "choices": [
        "heavy bolt pistol"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "close combat weapon"
      ],
      "choices": [
        "master-crafted power weapon",
        "power fist"
      ],
      "costs_points": false
    }
  ],
  "outrider-squad": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "onslaught gatling cannon"
      ],
      "choices": [
        "multi-melta"
      ],
      "costs_points": false
    }
  ],
  "predator-annihilator": [
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
  "predator-destructor": [
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
  "razorback": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "twin heavy bolter"
      ],
      "choices": [
        "twin lascannon"
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
  "redemptor-dreadnought": [
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "icarus rocket pod"
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
        "onslaught gatling cannon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "heavy onslaught gatling cannon"
      ],
      "choices": [
        "macro plasma incinerator"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "twin fragstorm grenade launcher"
      ],
      "choices": [
        "twin storm bolter"
      ],
      "costs_points": false
    }
  ],
  "reiver-squad": [
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "combat knife"
      ],
      "choices": [
        [
          "bolt carbine",
          "close combat weapon"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "Reiver Sergeant",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "combat knife"
      ],
      "costs_points": false,
      "condition": "1 bolt carbine"
    },
    {
      "type": "add_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [],
      "choices": [
        "reiver grav-chute"
      ],
      "costs_points": false
    },
    {
      "type": "add_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [],
      "choices": [
        "grapnel launcher"
      ],
      "costs_points": false
    }
  ],
  "repulsor": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "twin heavy bolter"
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
        "heavy onslaught gatling cannon"
      ],
      "choices": [
        "las-talon"
      ],
      "costs_points": false
    }
  ],
  "repulsor-executioner": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "macro plasma incinerator"
      ],
      "choices": [
        "heavy laser destroyer"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "ironhail heavy stubber"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "icarus rocket pod"
      ],
      "costs_points": false
    }
  ],
  "rhino": [
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
  "scout-squad": [
    {
      "type": "replace_leader",
      "eligible_models": "Scout Sergeant",
      "max_swaps": 1,
      "replaces": [
        "boltgun"
      ],
      "choices": [
        "astartes chainsword"
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "boltgun"
      ],
      "choices": [
        "astartes shotgun",
        "combat knife"
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "Scout",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "boltgun"
      ],
      "choices": [
        "scout sniper rifle"
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "Scout",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "boltgun"
      ],
      "choices": [
        "heavy bolter",
        "missile launcher"
      ],
      "costs_points": false
    }
  ],
  "sternguard-veteran-squad": [
    {
      "type": "replace_leader",
      "eligible_models": "Sternguard Veteran Sergeant",
      "max_swaps": 1,
      "replaces": [
        "sternguard bolt rifle"
      ],
      "choices": [
        "astartes chainsword",
        "combi-weapon",
        "power weapon",
        "power fist",
        [
          "astartes chainsword",
          "sternguard bolt rifle"
        ],
        [
          "power weapon",
          "sternguard bolt rifle"
        ],
        [
          "power fist",
          "sternguard bolt rifle"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "sternguard bolt rifle"
      ],
      "choices": [
        "combi-weapon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "Sternguard Veteran",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "sternguard bolt rifle"
      ],
      "choices": [
        "pyrecannon",
        "sternguard heavy bolter"
      ],
      "costs_points": false
    }
  ],
  "stormhawk-interceptor": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "skyhammer missile launcher"
      ],
      "choices": [
        "twin heavy bolter",
        "typhoon missile launcher"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "las-talon"
      ],
      "choices": [
        "icarus stormcannon"
      ],
      "costs_points": false
    }
  ],
  "stormraven-gunship": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "twin assault cannon"
      ],
      "choices": [
        "twin heavy plasma cannon",
        "twin lascannon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "typhoon missile launcher"
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
        "hurricane bolters"
      ],
      "costs_points": false
    }
  ],
  "stormtalon-gunship": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "skyhammer missile launcher"
      ],
      "choices": [
        "twin heavy bolter",
        "twin lascannon",
        "typhoon missile launcher"
      ],
      "costs_points": false
    }
  ],
  "tactical-squad": [
    {
      "type": "replace_one",
      "eligible_models": "Tactical Marine",
      "max_swaps": 1,
      "replaces": [
        "boltgun"
      ],
      "choices": [
        "flamer",
        "heavy bolter",
        "grav-cannon",
        "grav-gun",
        "lascannon",
        "meltagun",
        "missile launcher",
        "multi-melta",
        "plasma cannon",
        "plasma gun"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Tactical Marine",
      "max_swaps": 1,
      "replaces": [
        "boltgun"
      ],
      "choices": [
        "flamer",
        "grav-gun",
        "meltagun",
        "plasma gun"
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Tactical Sergeant",
      "max_swaps": 1,
      "replaces": [
        "bolt pistol",
        "boltgun"
      ],
      "choices": [
        [
          "twin lightning claws",
          "or 2 different weapons from the following list:"
        ],
        "astartes chainsword",
        "bolt pistol",
        "boltgun",
        "combi-weapon",
        "grav-pistol",
        "plasma pistol",
        "storm bolter",
        "power fist",
        "power weapon",
        "thunder hammer this model can only be equipped with 2 ranged weapons if 1 of them is a pistol (and it can only have 1 pistol)"
      ],
      "costs_points": false
    }
  ],
  "terminator-assault-squad": [
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "thunder hammer",
        "storm shield"
      ],
      "choices": [
        "twin lightning claws"
      ],
      "costs_points": false
    }
  ],
  "terminator-squad": [
    {
      "type": "replace_per_n",
      "eligible_models": "Terminator",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "storm bolter"
      ],
      "choices": [
        "assault cannon",
        "heavy flamer",
        [
          "cyclone missile launcher",
          "storm bolter"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "power fist"
      ],
      "choices": [
        "chainfist"
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Terminator Sergeant",
      "max_swaps": 1,
      "replaces": [
        "power fist"
      ],
      "choices": [
        "power weapon"
      ],
      "costs_points": false
    }
  ],
  "thunderhawk-gunship": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "thunderhawk heavy cannon"
      ],
      "choices": [
        "turbo-laser destructor"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "thunderhawk cluster bombs"
      ],
      "choices": [
        "hellstrike missile battery"
      ],
      "costs_points": false
    }
  ],
  "vanguard-veteran-squad-with-jump-packs": [
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "bolt pistol"
      ],
      "choices": [
        "storm shield",
        "grav-pistol",
        "hand flamer",
        "inferno pistol",
        "plasma pistol"
      ],
      "costs_points": false
    }
  ],
  "vindicator": [
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
  "whirlwind": [
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
  ]
};
