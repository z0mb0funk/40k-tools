window.WARGEAR_RULES = window.WARGEAR_RULES || {};
window.WARGEAR_RULES["death-guard"] = {
  "blightlord-terminators": [
    {
      "type": "replace_per_n",
      "eligible_models": "models",
      "per_models": 5,
      "max_swaps": 3,
      "replaces": [
        "combi-bolters"
      ],
      "choices": [
        "combi-weapon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "Blightlord Terminator",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "combi-bolter",
        "bubotic blade"
      ],
      "choices": [
        "flail of corruption"
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "Blightlord Terminator",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "combi-bolter"
      ],
      "choices": [
        "blight launcher"
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "Blightlord Terminator",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "combi-bolter"
      ],
      "choices": [
        "reaper autocannon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "Blightlord Terminator",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "combi-bolter"
      ],
      "choices": [
        "plague spewer"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "combi-bolter",
        "bubotic blade"
      ],
      "choices": [
        [
          "plague spewer",
          "close combat weapon"
        ]
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
  "chaos-predator-annihilator": [
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "lascannons",
        "heavy bolters"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "combi-weapon",
        "combi-bolter"
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
        "lascannons",
        "heavy bolters"
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
  "deathshroud-terminators": [
    {
      "type": "add_one",
      "eligible_models": "Deathshroud Champion",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "additional plaguespurt gauntlet"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "Deathshroud Champion",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "icon of despair"
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
  "foetid-bloat-drone": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "fleshmower"
      ],
      "choices": [
        "plaguespitters"
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
        "twin lascannon",
        "twin heavy bolter",
        "additional helbrute fist"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "of this model",
      "max_swaps": 1,
      "replaces": [
        "helbrute fists"
      ],
      "choices": [
        "missile launcher"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "of this model",
      "max_swaps": 1,
      "replaces": [
        "helbrute fists"
      ],
      "choices": [
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
        "heavy flamer that helbrute fist cannot then be replaced"
      ],
      "costs_points": false
    }
  ],
  "plagueburst-crawler": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "entropy cannons"
      ],
      "choices": [
        "plaguespitters"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "heavy slugger"
      ],
      "choices": [
        "rothail volley gun"
      ],
      "costs_points": false
    }
  ],
  "plague-marines": [
    {
      "type": "replace_leader",
      "eligible_models": "Plague Champion",
      "max_swaps": 1,
      "replaces": [
        "boltgun"
      ],
      "choices": [
        "bolt pistol",
        "plasma gun",
        "plasma pistol"
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Plague Champion",
      "max_swaps": 1,
      "replaces": [
        "plague knives"
      ],
      "choices": [
        "bubotic weapons",
        "power fist"
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "Plague Marine",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "boltgun"
      ],
      "choices": [
        "blight launcher"
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "Plague Marine",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "boltgun"
      ],
      "choices": [
        "plague spewer"
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "Plague Marine",
      "per_models": 5,
      "max_swaps": 1,
      "replaces": [
        "boltgun"
      ],
      "choices": [
        "meltagun",
        "plague belcher",
        "plasma gun"
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "Plague Marines",
      "per_models": 5,
      "max_swaps": 2,
      "replaces": [
        "boltgun"
      ],
      "choices": [
        "bubotic weapons"
      ],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "Plague Marines",
      "per_models": 5,
      "max_swaps": 2,
      "replaces": [
        "boltgun"
      ],
      "choices": [
        "heavy plague weapon"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "Plague Marine",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "icon of despair"
      ],
      "costs_points": false
    }
  ]
};
