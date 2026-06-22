window.WARGEAR_RULES = window.WARGEAR_RULES || {};
window.WARGEAR_RULES["world-eaters"] = {
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
        "havoc launcher"
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
        "additional combi-bolter",
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
  "chaos-terminators": [
    {
      "type": "replace_per_n",
      "eligible_models": "Chaos Terminator",
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
          "forgefiend claws"
        ]
      ],
      "costs_points": false
    }
  ],
  "goremongers": [
    {
      "type": "replace_one",
      "eligible_models": "Goremonger",
      "max_swaps": 1,
      "replaces": [
        "chainblade"
      ],
      "choices": [
        "autopistol"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Goremonger",
      "max_swaps": 1,
      "replaces": [
        "chainblade"
      ],
      "choices": [
        "blood harpoon"
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
        "plasma cannon",
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
  "jakhals": [
    {
      "type": "replace_per_n",
      "eligible_models": "Jakhal",
      "per_models": 10,
      "max_swaps": 1,
      "replaces": [
        "chainblades"
      ],
      "choices": [
        "mauler chainblade"
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "Dishonoured models",
      "max_swaps": null,
      "replaces": [
        "paired manglers"
      ],
      "choices": [
        [
          "skullsmasher",
          "mangler"
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
        "icon of khorne"
      ],
      "costs_points": false
    }
  ],
  "khorne-berzerkers": [
    {
      "type": "replace_leader",
      "eligible_models": "Khorne Berzerker Champion",
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
      "type": "replace_per_n",
      "eligible_models": "Khorne Berzerker",
      "per_models": 5,
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
      "type": "replace_per_n",
      "eligible_models": "Khorne Berzerker",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "chainblade"
      ],
      "choices": [
        "khornate eviscerator"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "icon of khorne"
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
  ]
};
