window.WARGEAR_RULES = window.WARGEAR_RULES || {};
window.WARGEAR_RULES["genestealer-cults"] = {
  "achilles-ridgerunners": [
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": ["heavy mining laser"],
      "choices": ["achilles missile launcher", "heavy mortar"],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": ["flare launcher"],
      "choices": ["spotter", "survey augur"],
      "costs_points": false
    }
  ],
  "acolyte-hybrids-with-autopistols": [
    {
      "type": "replace_one",
      "eligible_models": "Acolyte Hybrid",
      "max_swaps": 1,
      "replaces": ["autopistol"],
      "choices": ["cult icon"],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "Acolyte Hybrid",
      "per_models": 5,
      "max_swaps": 3,
      "replaces": ["autopistol", "cult claws and knife"],
      "choices": ["heavy mining tool"],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Acolyte Leader",
      "max_swaps": 1,
      "replaces": ["cult claws and knife"],
      "choices": ["leader's bio-weapons"],
      "costs_points": false
    }
  ],
  "acolyte-hybrids-with-hand-flamers": [
    {
      "type": "replace_one",
      "eligible_models": "Acolyte Hybrid",
      "max_swaps": 1,
      "replaces": ["hand flamer"],
      "choices": ["cult icon"],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "Acolyte Hybrid",
      "per_models": 5,
      "max_swaps": 2,
      "replaces": ["hand flamer"],
      "choices": ["demolition charges"],
      "costs_points": false
    },
    {
      "type": "replace_leader",
      "eligible_models": "Acolyte Leader",
      "max_swaps": 1,
      "replaces": ["cult claws and knife"],
      "choices": ["leader's bio-weapons"],
      "costs_points": false
    }
  ],
  "atalan-jackals": [
    {
      "type": "replace_per_n",
      "eligible_models": "Atalan Jackal",
      "per_models": 4,
      "max_swaps": 2,
      "replaces": ["close combat weapon"],
      "choices": ["atalan power weapon"],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "Atalan Jackal",
      "per_models": 4,
      "max_swaps": 1,
      "replaces": ["atalan small arms"],
      "choices": ["grenade launcher"],
      "costs_points": false
    },
    {
      "type": "replace_any",
      "eligible_models": "Atalan Wolfquad",
      "max_swaps": null,
      "replaces": ["heavy stubber"],
      "choices": ["atalan incinerator", "mining laser"],
      "costs_points": false
    }
  ],
  "goliath-rockgrinder": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": ["heavy mining laser"],
      "choices": ["clearance incinerator", "heavy seismic cannon"],
      "costs_points": false
    }
  ],
  "hybrid-metamorphs": [
    {
      "type": "replace_any",
      "eligible_models": "any",
      "max_swaps": null,
      "replaces": ["autopistol"],
      "choices": ["hand flamer"],
      "costs_points": false
    },
    {
      "type": "replace_one",
      "eligible_models": "Hybrid Metamorph",
      "max_swaps": 1,
      "replaces": ["autopistol"],
      "choices": ["cult icon"],
      "costs_points": false
    }
  ],
  "neophyte-hybrids": [
    {
      "type": "add_one",
      "eligible_models": "Neophyte Hybrid",
      "max_swaps": 1,
      "replaces": [],
      "choices": ["cult icon"],
      "costs_points": false
    },
    {
      "type": "replace_per_n",
      "eligible_models": "Neophyte Hybrid",
      "per_models": 10,
      "max_swaps": 2,
      "max_per_choice": 1,
      "replaces": ["hybrid firearm"],
      "choices": ["heavy stubber", "mining laser", "seismic cannon"],
      "costs_points": true
    },
    {
      "type": "replace_per_n",
      "eligible_models": "Neophyte Hybrid",
      "per_models": 10,
      "max_swaps": 2,
      "max_per_choice": 1,
      "replaces": ["hybrid firearm"],
      "choices": ["flamer", "grenade launcher", "webber"],
      "costs_points": true
    },
    {
      "type": "replace_leader",
      "eligible_models": "Neophyte Leader",
      "max_swaps": 1,
      "replaces": ["hybrid firearm", "close combat weapon"],
      "choices": [["anointed pistol", "chainsword"], ["anointed pistol", "power weapon"]],
      "costs_points": false
    }
  ],
  "sanctus": [
    {
      "type": "replace_one",
      "eligible_models": "any",
      "max_swaps": 1,
      "replaces": ["sanctus bio-dagger"],
      "choices": [["cult sniper rifle", "close combat weapon"]],
      "costs_points": false
    }
  ]
};
