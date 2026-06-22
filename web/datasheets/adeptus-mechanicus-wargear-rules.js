window.WARGEAR_RULES = window.WARGEAR_RULES || {};
window.WARGEAR_RULES["adeptus-mechanicus"] = {
  "archaeopter-fusilave": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "command uplink"
      ],
      "choices": [
        "chaff launcher"
      ],
      "costs_points": false
    }
  ],
  "archaeopter-stratoraptor": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "command uplink"
      ],
      "choices": [
        "chaff launcher"
      ],
      "costs_points": false
    }
  ],
  "archaeopter-transvector": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "command uplink"
      ],
      "choices": [
        "chaff launcher"
      ],
      "costs_points": false
    }
  ],
  "ironstrider-ballistarii": [
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "twin cognis autocannon"
      ],
      "choices": [
        "twin cognis lascannon"
      ],
      "costs_points": false
    }
  ],
  "kastelan-robots": [
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "twin kastelan fist"
      ],
      "choices": [
        [
          "kastelan phosphor blaster",
          "kastelan fist"
        ],
        [
          "twin kastelan phosphor blaster",
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
        "incendine combustor"
      ],
      "choices": [
        "heavy phosphor blaster"
      ],
      "costs_points": false
    }
  ],
  "kataphron-breachers": [
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "heavy arc rifle"
      ],
      "choices": [
        "torsion cannon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "arc claw"
      ],
      "choices": [
        "hydraulic claw"
      ],
      "costs_points": false
    }
  ],
  "kataphron-destroyers": [
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "heavy grav-cannon"
      ],
      "choices": [
        "kataphron plasma culverin"
      ],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "phosphor blaster"
      ],
      "choices": [
        "cognis flamer"
      ],
      "costs_points": false
    }
  ],
  "onager-dunecrawler": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "eradication beamer"
      ],
      "choices": [
        [
          "daedalus missile launcher",
          "icarus array"
        ],
        [
          "neutron laser",
          "cognis heavy stubber"
        ],
        "twin onager heavy phosphor blaster"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "additional cognis heavy stubber"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "broad spectrum data-tether"
      ],
      "costs_points": false
    }
  ],
  "serberys-raiders": [
    {
      "type": "add_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "enhanced data-tether"
      ],
      "costs_points": false
    }
  ],
  "serberys-sulphurhounds": [
    {
      "type": "replace_per_n",
      "eligible_models": "Serberys Sulphurhound",
      "per_models": 3,
      "max_swaps": 1,
      "replaces": [
        "twin phosphor pistols"
      ],
      "choices": [
        [
          "phosphor blast carbine",
          "phosphor pistol"
        ]
      ],
      "costs_points": false
    }
  ],
  "servitor-battleclade": [
    {
      "type": "replace_one",
      "eligible_models": "Combat Servitor",
      "max_swaps": 1,
      "replaces": [
        "phosphor blaster"
      ],
      "choices": [
        "meltagun"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Combat Servitor models",
      "max_swaps": 3,
      "replaces": [
        "phosphor blaster"
      ],
      "choices": [
        "incendine igniter"
      ],
      "costs_points": false
    }
  ],
  "sicarian-infiltrators": [
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": [
        "stubcarbine",
        "power weapon"
      ],
      "choices": [
        [
          "flechette blaster",
          "taser goad"
        ]
      ],
      "costs_points": false
    }
  ],
  "sicarian-ruststalkers": [
    {
      "type": "replace_any",
      "eligible_models": "Sicarian Ruststalkers",
      "max_swaps": null,
      "replaces": [
        "transonic razor",
        "chordclaw"
      ],
      "choices": [
        "transonic blades"
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Sicarian Ruststalker Princeps",
      "max_swaps": 1,
      "replaces": [
        "transonic razor",
        "chordclaw"
      ],
      "choices": [
        [
          "transonic blades",
          "chordclaw"
        ]
      ],
      "costs_points": false
    }
  ],
  "skitarii-rangers": [
    {
      "type": "add_one",
      "eligible_models": "Skitarii Ranger Alpha",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "alpha combat weapon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Skitarii Ranger Alpha",
      "max_swaps": 1,
      "replaces": [
        "galvanic rifle"
      ],
      "choices": [
        "mechanicus pistol"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Skitarii Ranger",
      "max_swaps": 1,
      "replaces": [
        "galvanic rifle"
      ],
      "choices": [
        "arc rifle"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Skitarii Ranger",
      "max_swaps": 1,
      "replaces": [
        "galvanic rifle"
      ],
      "choices": [
        "plasma caliver"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Skitarii Ranger",
      "max_swaps": 1,
      "replaces": [
        "galvanic rifle"
      ],
      "choices": [
        "transuranic arquebus"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "Skitarii Ranger",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "enhanced data-tether",
        "omnispex"
      ],
      "costs_points": false
    }
  ],
  "skitarii-vanguard": [
    {
      "type": "add_one",
      "eligible_models": "Skitarii Vanguard Alpha",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "alpha combat weapon"
      ],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Skitarii Vanguard Alpha",
      "max_swaps": 1,
      "replaces": [
        "radium carbine"
      ],
      "choices": [
        "mechanicus pistol"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Skitarii Vanguard",
      "max_swaps": 1,
      "replaces": [
        "radium carbine"
      ],
      "choices": [
        "arc rifle"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Skitarii Vanguard",
      "max_swaps": 1,
      "replaces": [
        "radium carbine"
      ],
      "choices": [
        "plasma caliver"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Skitarii Vanguard",
      "max_swaps": 1,
      "replaces": [
        "radium carbine"
      ],
      "choices": [
        "transuranic arquebus"
      ],
      "costs_points": false
    },
    {
      "type": "add_one",
      "eligible_models": "Skitarii Vanguard",
      "max_swaps": 1,
      "replaces": [],
      "choices": [
        "enhanced data-tether",
        "omnispex"
      ],
      "costs_points": false
    }
  ],
  "skorpius-disintegrator": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "belleros energy cannon"
      ],
      "choices": [
        "ferrumite cannon"
      ],
      "costs_points": false
    }
  ],
  "sydonian-skatros": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "radium jezzail"
      ],
      "choices": [
        "skatros transuranic arquebus"
      ],
      "costs_points": false
    }
  ],
  "tech-priest-dominus": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "macrostubber"
      ],
      "choices": [
        "phosphor serpenta"
      ],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "volkite blaster"
      ],
      "choices": [
        "eradication ray"
      ],
      "costs_points": false
    }
  ],
  "tech-priest-manipulus": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": [
        "magnarail lance"
      ],
      "choices": [
        "transonic cannon"
      ],
      "costs_points": false
    }
  ]
};
