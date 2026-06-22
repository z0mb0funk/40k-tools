window.WARGEAR_RULES = window.WARGEAR_RULES || {};
window.WARGEAR_RULES["black-templars"] = {
  "castellan": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "combi-weapon"
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
        "master-crafted power weapon"
      ],
      "choices": [
        "astartes chainsword"
      ],
      "costs_points": false
    }
  ],
  "crusader-squad": [
    {
      "type": "replace_leader",
      "eligible_models": "Sword Brother",
      "max_swaps": 1,
      "replaces": [
        "heavy bolt pistol"
      ],
      "choices": [
        "pyre pistol"
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "Neophytes",
      "max_swaps": null,
      "replaces": [
        "bolt pistol",
        "astartes chainsword"
      ],
      "choices": [
        [
          "neophyte firearm",
          "close combat weapon"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "Initiates",
      "max_swaps": null,
      "replaces": [
        "bolt rifle"
      ],
      "choices": [
        [
          "heavy bolt pistol",
          "astartes chainsword"
        ]
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "Initiates",
      "per_models": 10,
      "max_swaps": 2,
      "replaces": [
        "bolt rifle"
      ],
      "choices": [
        [
          "heavy bolt pistol",
          "power fist"
        ],
        "pyreblaster"
      ],
      "costs_points": false
    }
  ],
  "execrator": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "absolver bolt pistol"
      ],
      "choices": [
        "pyre pistol"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "master-crafted power weapon"
      ],
      "costs_points": false,
      "condition": "an absolver bolt pistol"
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
        "ironhail heavy stubber",
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
        "ironhail heavy stubber",
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
        "ironhail heavy stubber",
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
        "icarus rocket pod"
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
        "ironhail heavy stubber",
        "multi-melta"
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
  "marshal": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "plasma pistol"
      ],
      "choices": [
        "combi-weapon"
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
        "ironhail heavy stubber",
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
        "icarus rocket pod"
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
  "sword-brethren-squad": [
    {
      "type": "replace_any",
      "eligible_models": "Sword Brothers",
      "max_swaps": null,
      "replaces": [
        "astartes chainsword"
      ],
      "choices": [
        "master-crafted power weapon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "Sword Brother",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "astartes chainsword"
      ],
      "choices": [
        "thunder hammer"
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "Sword Brother",
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
      "type": "replace_per_n",
      "eligible_models": "Sword Brothers",
      "per_models": 5,
      "max_swaps": 2,
      "replaces": [
        "heavy bolt pistol"
      ],
      "choices": [
        "pyre pistol"
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "Sword Brother",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "heavy bolt pistol",
        "astartes chainsword"
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
      "eligible_models": "Terminator Squad Leader",
      "max_swaps": 1,
      "replaces": [
        "power fist"
      ],
      "choices": [
        "power weapon"
      ],
      "costs_points": false
    }
  ]
};
