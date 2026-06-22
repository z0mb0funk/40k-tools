#!/usr/bin/env python3
"""
Parse wargear options text from datasheet JSON files into structured wargear-rules JSON.
Follows the format established by genestealer-cults-wargear-rules.json.
"""

import json
import os
import re
import sys

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'data', 'datasheets')
WEB_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'web', 'datasheets')

# Skip these files (already done or not faction datasheets)
SKIP_SLUGS = {'genestealer-cults'}


def slugify(name):
    """Convert a unit name to a slug."""
    return re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')


def parse_choices(choices_text):
    """Parse choices from text like '◦ 1 weapon1 ◦ 1 weapon2'."""
    # Split by the bullet character
    parts = re.split(r'◦', choices_text)
    choices = []
    for part in parts:
        part = part.strip()
        if not part:
            continue
        # Remove leading "1 " quantity prefix
        part = re.sub(r'^\d+\s+', '', part)
        part = part.strip().lower()
        if part:
            choices.append(part)
    return choices


def parse_multi_weapon_choices(choices_text):
    """Parse choices that may contain multi-weapon options like '1 weapon1 and 1 weapon2'."""
    parts = re.split(r'◦', choices_text)
    choices = []
    for part in parts:
        part = part.strip()
        if not part:
            continue
        # Check for comma-separated items within a single choice (e.g., "1 weapon1, 1 weapon2 and 1 weapon3")
        # Split by comma and "and" to get individual weapons
        if ',' in part:
            # Split by commas and "and"
            sub_parts = re.split(r',\s*|\s+and\s+', part)
            weapons = []
            for sp in sub_parts:
                sp = re.sub(r'^\d+\s+', '', sp.strip()).lower()
                if sp:
                    weapons.append(sp)
            if len(weapons) > 1:
                choices.append(weapons)
            elif weapons:
                choices.append(weapons[0])
        elif re.search(r'\s+and\s+', part):
            # "and" indicating multi-weapon choice (but no commas)
            and_parts = re.split(r'\s+and\s+', part)
            if len(and_parts) > 1:
                weapons = []
                for ap in and_parts:
                    ap = re.sub(r'^\d+\s+', '', ap.strip()).lower()
                    if ap:
                        weapons.append(ap)
                if weapons:
                    choices.append(weapons if len(weapons) > 1 else weapons[0])
            else:
                weapon = re.sub(r'^\d+\s+', '', part).lower()
                if weapon:
                    choices.append(weapon)
        else:
            # Single weapon
            weapon = re.sub(r'^\d+\s+', '', part).lower()
            if weapon:
                choices.append(weapon)
    return choices


def parse_replaces(replaces_text):
    """Parse the 'replaces' part, handling 'and' conjunctions."""
    # Remove leading quantity
    replaces_text = re.sub(r'^\d+\s+', '', replaces_text.strip())
    # Split by " and " to get multiple weapons being replaced
    parts = re.split(r'\s+and\s+', replaces_text)
    result = []
    for part in parts:
        part = re.sub(r'^\d+\s+', '', part.strip()).lower()
        if part:
            result.append(part)
    return result


def parse_single_option(text, unit_models=None):
    """Parse a single wargear option text into a structured rule."""
    text = text.strip()
    if not text:
        return None

    # Normalize whitespace
    text = re.sub(r'\s+', ' ', text)
    
    # Normalize special dash/hyphen characters
    text = text.replace('\u2010', '-').replace('\u2011', '-').replace('\u2012', '-')
    text = text.replace('\u2013', '-').replace('\u2014', '-').replace('\u2015', '-')
    text = text.replace('\u2212', '-')
    
    # Normalize special bullet characters  
    text = text.replace('▪', '◦')
    
    # Normalize curly quotes/apostrophes to straight
    text = text.replace('\u2018', "'").replace('\u2019', "'")
    text = text.replace('\u201c', '"').replace('\u201d', '"')
    
    # Strip trailing asterisks and double-asterisks (footnote markers)
    text = re.sub(r'\*+\s*$', '', text)
    
    # Remove inline asterisks from weapon names (footnote markers)
    text = re.sub(r'\*+', '', text)
    
    # Remove trailing constraint text after choices (starting with "You cannot", "This model's", etc.)
    text = re.sub(r'\s+You cannot .+$', '', text)
    text = re.sub(r'\s+This weapon cannot .+$', '', text)
    text = re.sub(r'\s+This model.s .+? cannot .+$', '', text)
    text = re.sub(r"\s+That model's .+? cannot .+$", '', text)
    text = re.sub(r'\s+That model .+$', '', text)
    
    # Remove parenthetical constraints like "(that model's X cannot be replaced)"
    text = re.sub(r'\s*\([^)]*cannot[^)]*\)', '', text)
    # Remove parenthetical constraints like "(you can...)" or "(this model's...)"  
    text = re.sub(r'\s*\((?:you can|this model)[^)]*\)', '', text)
    
    # Fix common OCR/encoding issues
    text = text.replace('lf this', 'If this')  # lowercase L instead of I
    
    # Remove leading bullet character if present
    text = re.sub(r'^◦\s*', '', text)
    
    # Normalize textual numbers to digits
    number_words = {'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5',
                    'six': '6', 'seven': '7', 'eight': '8', 'nine': '9', 'ten': '10'}
    for word, digit in number_words.items():
        # Replace "Up to two" -> "Up to 2", "For every five" -> "For every 5"
        text = re.sub(rf'\b{word}\b', digit, text, flags=re.IGNORECASE)
    
    # Fix "equipped 1" -> "equipped with 1"  
    text = re.sub(r'equipped (\d)', r'equipped with \1', text)
    
    # Skip non-option text (notes, constraints)
    skip_patterns = [
        r"^These options cannot",
        r"^This is not cumulative",
        r"^Note:",
        r"^If equipped",
        r"^You can select one of the following options:",
        r"^That model",
        r"cannot be replaced\.?\s*$",
        r"cannot select",
        r"^You cannot",
        r"^The same model cannot",
    ]
    for pat in skip_patterns:
        if re.search(pat, text, re.IGNORECASE):
            return None
    
    # Normalize "one of the following options:" to "one of the following:"
    text = re.sub(r'one of the following\s+options\s*:?', 'one of the following:', text, flags=re.IGNORECASE)
    # Fix "1 of the following" back (from number normalization)
    text = re.sub(r'\b1 of the following', 'one of the following', text)

    rule = {
        "costs_points": False
    }

    # ===== PATTERN: "All models in this unit can each be equipped with X" =====
    m = re.match(
        r"All (?:of the )?models in this unit can each be equipped with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        choices_text = m.group(1)
        rule["type"] = "add_any"
        rule["eligible_models"] = "any"
        rule["max_swaps"] = None
        rule["replaces"] = []
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "All [Models] in this unit can each have X replaced with Y" =====
    m = re.match(
        r"All (?:of the )?([\w\s]+?) in this unit can each have their (.+?) replaced with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        model_name = m.group(1).strip()
        replaces_text = m.group(2)
        choices_text = m.group(3)
        rule["type"] = "replace_any"
        # "models" means any
        if model_name.lower() == "models":
            rule["eligible_models"] = "any"
        else:
            rule["eligible_models"] = model_name
        rule["max_swaps"] = None
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "All models in this unit can each have X replaced with Y" =====
    m = re.match(
        r"All (?:of the )?models in this unit can each have their (.+?) replaced with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        replaces_text = m.group(1)
        choices_text = m.group(2)
        rule["type"] = "replace_any"
        rule["eligible_models"] = "any"
        rule["max_swaps"] = None
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "Any number of models can each have their X replaced with Y" =====
    m = re.match(
        r"Any number of (?:models|(\w[\w\s]*?)) can each have their (.+?) replaced (?:with )?(.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        model_name = m.group(1)
        replaces_text = m.group(2)
        choices_text = m.group(3)
        rule["type"] = "replace_any"
        rule["eligible_models"] = model_name.strip() if model_name else "any"
        rule["max_swaps"] = None
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "Any number of models can each be equipped with X" (add) =====
    m = re.match(
        r"Any number of (?:models|(\w[\w\s]*?)) can each be equipped with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        model_name = m.group(1)
        choices_text = m.group(2)
        rule["type"] = "replace_any"
        rule["eligible_models"] = model_name.strip() if model_name else "any"
        rule["max_swaps"] = None
        rule["replaces"] = []
        choices = parse_multi_weapon_choices("◦ " + choices_text)
        rule["choices"] = choices
        # This is actually an add since replaces is empty
        rule["type"] = "add_any"
        return rule

    # ===== PATTERN: "For every N models in this unit, (up to )M [Model]'s X can be replaced with Y" =====
    m = re.match(
        r"For every (\d+) models? in (?:this unit|the unit),?\s*(?:up to )?(\d+) ([\w\s]+?)(?:'s|') (.+?) can be replaced with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        per_models = int(m.group(1))
        max_swaps = int(m.group(2))
        model_name = m.group(3).strip()
        replaces_text = m.group(4)
        choices_text = m.group(5)
        rule["type"] = "replace_per_n"
        rule["eligible_models"] = model_name
        rule["per_models"] = per_models
        rule["max_swaps"] = max_swaps
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "For every N models in this unit, up to M [Model] can each have their X replaced with Y" =====
    m = re.match(
        r"For every (\d+) models? in (?:this unit|the unit),?\s*(?:up to )?(\d+) ([\w\s]+?) can each have their (.+?) replaced with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        per_models = int(m.group(1))
        max_swaps = int(m.group(2))
        model_name = m.group(3).strip()
        replaces_text = m.group(4)
        choices_text = m.group(5)
        rule["type"] = "replace_per_n"
        rule["eligible_models"] = model_name
        rule["per_models"] = per_models
        rule["max_swaps"] = max_swaps
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "For every N models in this unit, M model's X can be replaced with Y" (alt) =====
    m = re.match(
        r"For every (\d+) models? in (?:this unit|the unit),?\s*(\d+) ([\w\s]+?)(?:'s|') (.+?) can be replaced with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        per_models = int(m.group(1))
        max_swaps = int(m.group(2))
        model_name = m.group(3).strip()
        replaces_text = m.group(4)
        choices_text = m.group(5)
        rule["type"] = "replace_per_n"
        rule["eligible_models"] = model_name
        rule["per_models"] = per_models
        rule["max_swaps"] = max_swaps
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "Up to N [Model] can each have their X replaced with Y" =====
    m = re.match(
        r"Up to (\d+) ([\w\s]+?) can each have their (.+?) replaced with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        max_swaps = int(m.group(1))
        model_name = m.group(2).strip()
        replaces_text = m.group(3)
        choices_text = m.group(4)
        rule["type"] = "replace_one"
        rule["eligible_models"] = model_name
        rule["max_swaps"] = max_swaps
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following" in choices_text:
            choices_part = re.split(r'one of the following\s*(?:options\s*)?:?\s*', choices_text, maxsplit=1)[-1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices(choices_text if '◦' in choices_text else "◦ " + choices_text)
        return rule

    # ===== PATTERN: "Up to N [Model] can each be equipped with X" =====
    m = re.match(
        r"Up to (\d+) ([\w\s]+?) can each be equipped with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        max_swaps = int(m.group(1))
        model_name = m.group(2).strip()
        choices_text = m.group(3)
        rule["type"] = "add_one"
        rule["eligible_models"] = model_name
        rule["max_swaps"] = max_swaps
        rule["replaces"] = []
        choices = parse_multi_weapon_choices("◦ " + choices_text)
        rule["choices"] = choices
        return rule

    # ===== PATTERN: "The [Leader]'s X can be replaced with Y" =====
    m = re.match(
        r"The ([\w\s]+?)(?:'s|') (.+?) can be replaced with:?\s+(.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        model_name = m.group(1).strip()
        replaces_text = m.group(2)
        choices_text = m.group(3)
        rule["type"] = "replace_leader"
        rule["eligible_models"] = model_name
        rule["max_swaps"] = 1
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices(choices_text if '◦' in choices_text else "◦ " + choices_text)
        return rule

    # ===== PATTERN: "The [Leader] can be equipped with Y" (add to leader) =====
    m = re.match(
        r"The ([\w\s]+?) can be equipped with:?\s+(.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        model_name = m.group(1).strip()
        choices_text = m.group(2)
        rule["type"] = "add_one"
        rule["eligible_models"] = model_name
        rule["max_swaps"] = 1
        rule["replaces"] = []
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices(choices_text if '◦' in choices_text else "◦ " + choices_text)
        return rule

    # ===== PATTERN: "N [Model]'s X can be replaced with Y" =====
    m = re.match(
        r"(\d+) ([\w\s]+?)(?:'s|') (.+?) can be replaced with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        max_swaps = int(m.group(1))
        model_name = m.group(2).strip()
        replaces_text = m.group(3)
        choices_text = m.group(4)
        rule["type"] = "replace_one"
        rule["eligible_models"] = model_name
        rule["max_swaps"] = max_swaps
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "This model's X can be replaced with Y" =====
    m = re.match(
        r"This model(?:'s|') (.+?) can be replaced with:?\s+(.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        replaces_text = m.group(1)
        choices_text = m.group(2)
        rule["type"] = "replace_one"
        rule["eligible_models"] = "any"
        rule["max_swaps"] = 1
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices(choices_text if '◦' in choices_text else "◦ " + choices_text)
        return rule

    # ===== PATTERN: "This model can be equipped with X" =====
    m = re.match(
        r"This model can be equipped with:?\s+(.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        choices_text = m.group(1)
        rule["type"] = "add_one"
        rule["eligible_models"] = "any"
        rule["max_swaps"] = 1
        rule["replaces"] = []
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "Each [Model]'s X can be replaced with Y" =====
    m = re.match(
        r"Each ([\w\s]+?)(?:'s|') (.+?) can be replaced with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        model_name = m.group(1).strip()
        replaces_text = m.group(2)
        choices_text = m.group(3)
        rule["type"] = "replace_any"
        rule["eligible_models"] = model_name
        rule["max_swaps"] = None
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "N model(s) can be equipped with X" =====
    m = re.match(
        r"(\d+) (?:model|models) can be equipped with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        max_swaps = int(m.group(1))
        choices_text = m.group(2)
        rule["type"] = "add_one"
        rule["eligible_models"] = "any"
        rule["max_swaps"] = max_swaps
        rule["replaces"] = []
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "1 [Model] equipped with X can be equipped with Y" =====
    m = re.match(
        r"(\d+) ([\w\s]+?) equipped with .+? can be equipped with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        max_swaps = int(m.group(1))
        model_name = m.group(2).strip()
        choices_text = m.group(3)
        rule["type"] = "add_one"
        rule["eligible_models"] = model_name
        rule["max_swaps"] = max_swaps
        rule["replaces"] = []
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices(choices_text if '◦' in choices_text else "◦ " + choices_text)
        return rule

    # ===== PATTERN: "1 model in this unit equipped with X can be equipped with Y" =====
    m = re.match(
        r"(\d+) model(?:s)? in this unit equipped with .+? can be equipped with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        max_swaps = int(m.group(1))
        choices_text = m.group(2)
        rule["type"] = "add_one"
        rule["eligible_models"] = "any"
        rule["max_swaps"] = max_swaps
        rule["replaces"] = []
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices(choices_text if '◦' in choices_text else "◦ " + choices_text)
        return rule

    # ===== PATTERN: "[Model] model can have its X replaced with Y" =====
    m = re.match(
        r"(\d+) ([\w\s]+?) model(?:s)? can (?:each )?have (?:its|their) (.+?) replaced with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        max_swaps = int(m.group(1))
        model_name = m.group(2).strip()
        replaces_text = m.group(3)
        choices_text = m.group(4)
        rule["type"] = "replace_one"
        rule["eligible_models"] = model_name
        rule["max_swaps"] = max_swaps
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "One [Model]'s X can be replaced with Y" =====
    m = re.match(
        r"One ([\w\s]+?)(?:'s|') (.+?) can be replaced with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        model_name = m.group(1).strip()
        replaces_text = m.group(2)
        choices_text = m.group(3)
        rule["type"] = "replace_one"
        rule["eligible_models"] = model_name
        rule["max_swaps"] = 1
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "If this model/the [Model] is equipped with X, it can be equipped with Y" =====
    m = re.match(
        r"If (?:this model|the ([\w\s]+?)) is equipped with (.+?), it can be equipped with:?\s+(.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        model_name = m.group(1)
        condition = m.group(2).strip()
        choices_text = m.group(3)
        rule["type"] = "add_one"
        rule["eligible_models"] = model_name.strip() if model_name else "any"
        rule["max_swaps"] = 1
        rule["replaces"] = []
        rule["condition"] = condition.lower()
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices(choices_text if '◦' in choices_text else "◦ " + choices_text)
        return rule

    # ===== PATTERN: "Any number of [Models] can each replace their X with Y" =====
    m = re.match(
        r"Any number of ([\w\s]+?) can each replace their (.+?) with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        model_name = m.group(1).strip()
        replaces_text = m.group(2)
        choices_text = m.group(3)
        rule["type"] = "replace_any"
        rule["eligible_models"] = model_name if model_name.lower() != "models" else "any"
        rule["max_swaps"] = None
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "One [Model] can replace their X with Y" =====
    m = re.match(
        r"One ([\w\s]+?) can replace their (.+?) with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        model_name = m.group(1).strip()
        replaces_text = m.group(2)
        choices_text = m.group(3)
        rule["type"] = "replace_one"
        rule["eligible_models"] = model_name
        rule["max_swaps"] = 1
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "N [Model] can (each) replace their X with Y" =====
    m = re.match(
        r"(\d+) ([\w\s]+?) can (?:each )?replace their (.+?) with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        max_swaps = int(m.group(1))
        model_name = m.group(2).strip()
        replaces_text = m.group(3)
        choices_text = m.group(4)
        rule["type"] = "replace_one"
        rule["eligible_models"] = model_name
        rule["max_swaps"] = max_swaps
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "Up to N [Model] can replace their X with Y" =====
    m = re.match(
        r"Up to (?:one|(\d+)) ([\w\s]+?) can (?:each )?replace their (.+?) with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        max_swaps = int(m.group(1)) if m.group(1) else 1
        model_name = m.group(2).strip()
        replaces_text = m.group(3)
        choices_text = m.group(4)
        rule["type"] = "replace_one"
        rule["eligible_models"] = model_name
        rule["max_swaps"] = max_swaps
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "N [Model] equipped with X can be equipped with Y" (with "not equipped" variant) =====
    m = re.match(
        r"(\d+) ([\w\s]+?) (?:not )?equipped with .+? can (?:replace (?:its|their) (.+?) with|be equipped with) (.+?)(?:\s*\(.+?\))?\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        max_swaps = int(m.group(1))
        model_name = m.group(2).strip()
        replaces_text = m.group(3)
        choices_text = m.group(4)
        if replaces_text:
            rule["type"] = "replace_one"
            rule["eligible_models"] = model_name
            rule["max_swaps"] = max_swaps
            rule["replaces"] = parse_replaces(replaces_text)
        else:
            rule["type"] = "add_one"
            rule["eligible_models"] = model_name
            rule["max_swaps"] = max_swaps
            rule["replaces"] = []
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "The [Model] can replace its X with Y" =====
    m = re.match(
        r"The ([\w\s]+?) can replace its (.+?) with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        model_name = m.group(1).strip()
        replaces_text = m.group(2)
        choices_text = m.group(3)
        rule["type"] = "replace_leader"
        rule["eligible_models"] = model_name
        rule["max_swaps"] = 1
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "N model can replace its X with Y" =====
    m = re.match(
        r"(\d+) ([\w\s]+?) can replace (?:its|their) (.+?) with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        max_swaps = int(m.group(1))
        model_name = m.group(2).strip()
        replaces_text = m.group(3)
        choices_text = m.group(4)
        rule["type"] = "replace_one"
        rule["eligible_models"] = model_name
        rule["max_swaps"] = max_swaps
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "For every N models, this unit can have M [token]" =====
    m = re.match(
        r"For every (\d+) models? in (?:this|the) unit,?\s*(?:it|this unit) can have (\d+) (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        per_models = int(m.group(1))
        max_swaps = int(m.group(2))
        token_name = m.group(3).strip().lower()
        rule["type"] = "add_per_n"
        rule["eligible_models"] = "any"
        rule["per_models"] = per_models
        rule["max_swaps"] = max_swaps
        rule["replaces"] = []
        rule["choices"] = [token_name]
        return rule

    # ===== PATTERN: "For every N models, 1 model can replace its X with Y" =====
    m = re.match(
        r"For every (\d+) models? in (?:this|the) unit,?\s*(\d+) ([\w\s]+?) can replace (?:its|their) (.+?) with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        per_models = int(m.group(1))
        max_swaps = int(m.group(2))
        model_name = m.group(3).strip()
        replaces_text = m.group(4)
        choices_text = m.group(5)
        rule["type"] = "replace_per_n"
        rule["eligible_models"] = model_name
        rule["per_models"] = per_models
        rule["max_swaps"] = max_swaps
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "For every N models, 1 model can have its/their X replaced with Y" =====
    m = re.match(
        r"For every (\d+) models? in (?:this|the) unit,?\s*(\d+) ([\w\s]+?) can have (?:its|their) (.+?) replaced with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        per_models = int(m.group(1))
        max_swaps = int(m.group(2))
        model_name = m.group(3).strip()
        replaces_text = m.group(4)
        choices_text = m.group(5)
        rule["type"] = "replace_per_n"
        rule["eligible_models"] = model_name
        rule["per_models"] = per_models
        rule["max_swaps"] = max_swaps
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "For every N models, up to M models' X can each be replaced with Y" =====
    m = re.match(
        r"For every (\d+) models? in (?:this|the) unit,?\s*(?:up to )?(\d+) ([\w\s]+?)(?:'|') (.+?) can each be replaced with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        per_models = int(m.group(1))
        max_swaps = int(m.group(2))
        model_name = m.group(3).strip()
        replaces_text = m.group(4)
        choices_text = m.group(5)
        rule["type"] = "replace_per_n"
        rule["eligible_models"] = model_name
        rule["per_models"] = per_models
        rule["max_swaps"] = max_swaps
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "For every N models, 1 [Model] equipped with X can be equipped with Y" =====
    m = re.match(
        r"For every (\d+) models? in (?:this|the) unit,?\s*(\d+) ([\w\s]+?) equipped with .+? can be equipped with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        per_models = int(m.group(1))
        max_swaps = int(m.group(2))
        model_name = m.group(3).strip()
        choices_text = m.group(4)
        rule["type"] = "add_per_n"
        rule["eligible_models"] = model_name
        rule["per_models"] = per_models
        rule["max_swaps"] = max_swaps
        rule["replaces"] = []
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "For every N models, 1 model equipped with X can have its Y replaced with Z" =====
    m = re.match(
        r"For every (\d+) models? in (?:this|the) unit,?\s*(\d+) ([\w\s]+?) (?:that is )?(?:not )?equipped with .+? can have (?:its|their) (.+?) replaced with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        per_models = int(m.group(1))
        max_swaps = int(m.group(2))
        model_name = m.group(3).strip()
        replaces_text = m.group(4)
        choices_text = m.group(5)
        rule["type"] = "replace_per_n"
        rule["eligible_models"] = model_name
        rule["per_models"] = per_models
        rule["max_swaps"] = max_swaps
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "For every N models, up M [Model] can each have their X replaced with Y" (typo "up" instead of "up to") =====
    m = re.match(
        r"For every (\d+) models? in (?:this|the) unit,?\s*up (?:to )?(\d+) ([\w\s]+?) can each have their (.+?) replaced with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        per_models = int(m.group(1))
        max_swaps = int(m.group(2))
        model_name = m.group(3).strip()
        replaces_text = m.group(4)
        choices_text = m.group(5)
        rule["type"] = "replace_per_n"
        rule["eligible_models"] = model_name
        rule["per_models"] = per_models
        rule["max_swaps"] = max_swaps
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "For every N models, 1 [Model] can replace its X with Y" with "one of the following" =====
    m = re.match(
        r"For every (\d+) models? in (?:this|the) unit,?\s*(\d+) ([\w\s]+?) can (?:replace|have) (?:its|their) (.+?)(?:replaced with| with) (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        per_models = int(m.group(1))
        max_swaps = int(m.group(2))
        model_name = m.group(3).strip()
        replaces_text = m.group(4)
        choices_text = m.group(5)
        rule["type"] = "replace_per_n"
        rule["eligible_models"] = model_name
        rule["per_models"] = per_models
        rule["max_swaps"] = max_swaps
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "Any number of this model's X can each be replaced with Y" =====
    m = re.match(
        r"Any number of this model's (.+?) can each be replaced with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        replaces_text = m.group(1)
        choices_text = m.group(2)
        rule["type"] = "replace_any"
        rule["eligible_models"] = "any"
        rule["max_swaps"] = None
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "This model's X can each be replaced with Y" =====
    m = re.match(
        r"This model's (.+?) can each be replaced with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        replaces_text = m.group(1)
        choices_text = m.group(2)
        rule["type"] = "replace_any"
        rule["eligible_models"] = "any"
        rule["max_swaps"] = None
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "Any number of models can each replace one of their X with Y" =====
    m = re.match(
        r"Any number of (?:models|(\w[\w\s]*?)) can each replace (?:\d+ of )?their (.+?) with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        model_name = m.group(1)
        replaces_text = m.group(2)
        choices_text = m.group(3)
        rule["type"] = "replace_any"
        rule["eligible_models"] = model_name.strip() if model_name else "any"
        rule["max_swaps"] = None
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "N models can each have their X replaced with Y" =====
    m = re.match(
        r"(\d+) models can each have their (.+?) replaced with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        max_swaps = int(m.group(1))
        replaces_text = m.group(2)
        choices_text = m.group(3)
        rule["type"] = "replace_one"
        rule["eligible_models"] = "any"
        rule["max_swaps"] = max_swaps
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "N [Model] can have its X replaced with Y" (without "equipped" constraint) =====
    m = re.match(
        r"(\d+) ([\w\s]+?) can have (?:its|their) (.+?) replaced with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        max_swaps = int(m.group(1))
        model_name = m.group(2).strip()
        replaces_text = m.group(3)
        choices_text = m.group(4)
        rule["type"] = "replace_one"
        rule["eligible_models"] = model_name
        rule["max_swaps"] = max_swaps
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "N [Model] can have its X or its Y replaced with Z" (or-choice in replaces) =====
    m = re.match(
        r"(\d+) ([\w\s]+?) can have (?:its|their) (.+?) (?:or (?:its|their) (.+?) )?replaced with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        max_swaps = int(m.group(1))
        model_name = m.group(2).strip()
        replaces_text = m.group(3)
        alt_replaces = m.group(4)
        choices_text = m.group(5)
        replaces = parse_replaces(replaces_text)
        if alt_replaces:
            replaces.extend(parse_replaces(alt_replaces))
        rule["type"] = "replace_one"
        rule["eligible_models"] = model_name
        rule["max_swaps"] = max_swaps
        rule["replaces"] = replaces
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "If this unit contains N models, up to M [Model] can each have their X replaced with Y" =====
    m = re.match(
        r"If this unit contains \d+ models,?\s*(?:up to )?(\d+)(?: additional)? ([\w\s]+?) can each have their (.+?) replaced with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        max_swaps = int(m.group(1))
        model_name = m.group(2).strip()
        replaces_text = m.group(3)
        choices_text = m.group(4)
        rule["type"] = "replace_one"
        rule["eligible_models"] = model_name
        rule["max_swaps"] = max_swaps
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "Each model can have each X it is equipped with replaced with Y" =====
    m = re.match(
        r"Each model can have (?:each|every) (.+?) (?:it is|they are) equipped with replaced with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        replaces_text = m.group(1)
        choices_text = m.group(2)
        rule["type"] = "replace_any"
        rule["eligible_models"] = "any"
        rule["max_swaps"] = None
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "One model can replace its X with Y" =====
    m = re.match(
        r"(?:1|one) model can replace its (.+?) with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        replaces_text = m.group(1)
        choices_text = m.group(2)
        rule["type"] = "replace_one"
        rule["eligible_models"] = "any"
        rule["max_swaps"] = 1
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "This model's X and Y can be replaced with: ◦ choices" (colon before choices) =====
    m = re.match(
        r"This model(?:'s|') (.+?) can be replaced with:\s*(.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        replaces_text = m.group(1)
        choices_text = m.group(2)
        rule["type"] = "replace_one"
        rule["eligible_models"] = "any"
        rule["max_swaps"] = 1
        rule["replaces"] = parse_replaces(replaces_text)
        rule["choices"] = parse_multi_weapon_choices(choices_text)
        return rule

    # ===== PATTERN: "This model can have its X replaced with Y" =====
    m = re.match(
        r"This model can have its (.+?) replaced with (.+?)\.?\s*$",
        text, re.IGNORECASE
    )
    if m:
        replaces_text = m.group(1)
        choices_text = m.group(2)
        rule["type"] = "replace_one"
        rule["eligible_models"] = "any"
        rule["max_swaps"] = 1
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== PATTERN: "[Model]'s X can be replaced with Y" (without leading number) =====
    # e.g., "The Sacresant Superior's hallowed mace can be replaced with 1 spear of the faithful."
    # Already handled by "The [Leader]'s" pattern above

    # ===== FALLBACK: Try to parse anything with "replaced with" =====
    m = re.search(r"(.+?)\s+can be replaced with\s+(.+?)\.?\s*$", text, re.IGNORECASE)
    if m:
        before = m.group(1).strip()
        choices_text = m.group(2)
        
        # Try to figure out what's being replaced
        replaces_match = re.search(r"(?:'s|')\s+(.+?)$", before)
        if replaces_match:
            replaces_text = replaces_match.group(1)
        else:
            replaces_text = before
        
        rule["type"] = "replace_one"
        rule["eligible_models"] = "any"
        rule["max_swaps"] = 1
        rule["replaces"] = parse_replaces(replaces_text)
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    # ===== FALLBACK: "equipped with" pattern =====
    m = re.search(r"can be equipped with\s+(.+?)(?:\s*\(.+?\))?\.?\s*$", text, re.IGNORECASE)
    if m:
        choices_text = m.group(1)
        rule["type"] = "add_one"
        rule["eligible_models"] = "any"
        rule["max_swaps"] = 1
        rule["replaces"] = []
        if "one of the following:" in choices_text:
            choices_part = choices_text.split("one of the following:")[1]
            rule["choices"] = parse_multi_weapon_choices(choices_part)
        else:
            rule["choices"] = parse_multi_weapon_choices("◦ " + choices_text)
        return rule

    return None


def parse_wargear_options(wargear_options, unit_models=None):
    """Parse all wargear options for a unit."""
    rules = []
    for option_text in wargear_options:
        # Some options might have multiple sentences separated by periods + spaces
        # But typically each entry in the array is one option
        # Handle multi-sentence entries by splitting on sentence boundaries
        # that look like separate options
        sentences = re.split(r'\s{2,}', option_text.strip())
        for sentence in sentences:
            sentence = sentence.strip()
            if not sentence:
                continue
            rule = parse_single_option(sentence, unit_models)
            if rule:
                rules.append(rule)
    return rules


def process_faction(slug):
    """Process a single faction's datasheet file."""
    input_path = os.path.join(DATA_DIR, f"{slug}.json")
    
    if not os.path.exists(input_path):
        print(f"  SKIP: {input_path} not found")
        return 0, 0

    with open(input_path, 'r') as f:
        units = json.load(f)

    result = {}
    total_options = 0
    parsed_options = 0
    unparsed = []

    for unit in units:
        if not unit.get('wargear_options'):
            continue

        unit_slug = unit['slug']
        unit_models = [m['name'] for m in unit.get('models', [])]
        
        rules = []
        for option_text in unit['wargear_options']:
            sentences = re.split(r'\s{2,}', option_text.strip())
            for sentence in sentences:
                sentence = sentence.strip()
                if not sentence:
                    continue
                total_options += 1
                rule = parse_single_option(sentence, unit_models)
                if rule:
                    parsed_options += 1
                    rules.append(rule)
                else:
                    unparsed.append(f"  [{unit['name']}] {sentence[:100]}")

        if rules:
            result[unit_slug] = rules

    # Write JSON output
    if result:
        # Reorder keys to match reference format
        ordered_result = {}
        for unit_slug, rules in result.items():
            ordered_rules = []
            for rule in rules:
                ordered_rule = {}
                # Key order: type, eligible_models, per_models (if present), max_swaps, replaces, choices, costs_points, condition (if present)
                for key in ['type', 'eligible_models', 'per_models', 'max_swaps', 'replaces', 'choices', 'costs_points', 'condition']:
                    if key in rule:
                        ordered_rule[key] = rule[key]
                ordered_rules.append(ordered_rule)
            ordered_result[unit_slug] = ordered_rules

        output_path = os.path.join(DATA_DIR, f"{slug}-wargear-rules.json")
        with open(output_path, 'w') as f:
            json.dump(ordered_result, f, indent=2)
        
        # Write JS output
        js_output_path = os.path.join(WEB_DIR, f"{slug}-wargear-rules.js")
        with open(js_output_path, 'w') as f:
            f.write('window.WARGEAR_RULES = window.WARGEAR_RULES || {};\n')
            f.write(f'window.WARGEAR_RULES["{slug}"] = ')
            json.dump(ordered_result, f, indent=2)
            f.write(';\n')

    if unparsed:
        print(f"  Unparsed options ({len(unparsed)}):")
        for u in unparsed[:10]:
            print(f"    {u}")
        if len(unparsed) > 10:
            print(f"    ... and {len(unparsed) - 10} more")

    return total_options, parsed_options


def main():
    # Get list of faction slugs from data/datasheets/*.json (exclude wargear-rules files)
    all_files = os.listdir(DATA_DIR)
    faction_slugs = []
    for f in sorted(all_files):
        if f.endswith('.json') and not f.endswith('-wargear-rules.json'):
            slug = f[:-5]  # remove .json
            if slug not in SKIP_SLUGS:
                faction_slugs.append(slug)

    # Allow processing specific factions via command line
    if len(sys.argv) > 1:
        faction_slugs = [s for s in sys.argv[1:] if s in faction_slugs]

    print(f"Processing {len(faction_slugs)} factions...")
    print()

    grand_total = 0
    grand_parsed = 0

    for slug in faction_slugs:
        print(f"Processing: {slug}")
        total, parsed = process_faction(slug)
        grand_total += total
        grand_parsed += parsed
        if total > 0:
            print(f"  Parsed {parsed}/{total} options ({100*parsed//total}%)")
        print()

    print(f"\n{'='*60}")
    print(f"TOTAL: Parsed {grand_parsed}/{grand_total} options ({100*grand_parsed//grand_total if grand_total else 0}%)")
    print(f"{'='*60}")


if __name__ == '__main__':
    main()
