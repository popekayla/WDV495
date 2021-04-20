let characters = [
    {
        "characterID": 0,
        "name": "Mokka",
        "race": "Tiefling",
        "class": "Druid",
        "level": "8",
        "proficiency": 3,
        "speed": 30,
        "initiative": 1,
        "ac": 16,
        "currentHealth": 49,
        "maxHealth": 49,
        "tempHealth": 0,
        "defenses": [
            "fire"
        ],
        "passives": {
            "perception": 17,
            "investigation": 13,
            "insight": 14
        },
        "abilities": {
            "strength": 10,
            "dexterity": 13,
            "constitution": 15,
            "intelligence": 16,
            "wisdom": 19,
            "charisma": 13
        },
        "savingThrows": {
            "strength": 2,
            "dexterity": 2,
            "constitution": 3,
            "intelligence": 7,
            "wisdom": 8,
            "charisma": 2
        },
        "skills": {
            "acrobatics": 1,
            "animal-handling": 4,
            "arcana": 3,
            "athletics": 3,
            "deception": 1,
            "history": 3,
            "insight": 4,
            "intimidation": 4,
            "investigation": 3,
            "medicine": 7,
            "nature": 3,
            "perception": 7,
            "performance": 1,
            "persuasion": 1,
            "religion": 3,
            "sleight-of-hand": 1,
            "stealth": 1,
            "survival": 4
        }
    },
    {
        "characterID": 1,
        "name": "Amella",
        "race": "Human",
        "class": "Tempest Cleric",
        "level": 4,
        "proficiency": 2,
        "speed": 30,
        "initiative": 1,
        "ac": 17,
        "currentHealth": 22,
        "maxHealth": 31,
        "tempHealth": 0,
        "defenses": [
            ""
        ],
        "passives": {
            "perception": 16,
            "investigation": 11,
            "insight": 14
        },
        "abilities": {
            "strength": 14,
            "dexterity": 12,
            "constitution": 14,
            "intelligence": 11,
            "wisdom": 18,
            "charisma": 11
        },
        "savingThrows": {
            "strength": 2,
            "dexterity": 1,
            "constitution": 2,
            "intelligence": 1,
            "wisdom": 6,
            "charisma": 2
        },
        "skills": {
            "acrobatics": 1,
            "animal-handling": 4,
            "arcana": 1,
            "athletics": 2,
            "deception": 0,
            "history": 3,
            "insight": 4,
            "intimidation": 0,
            "investigation": 1,
            "medicine": 4,
            "nature": 1,
            "perception": 6,
            "performance": 0,
            "persuasion": 2,
            "religion": 3,
            "sleight-of-hand": 1,
            "stealth": 1,
            "survival": 4
        }
    },
    {
        "characterID": 2,
        "name": "Fate",
        "race": "Tiefling",
        "class": "Shadow Sorcerer",
        "level": 4,
        "proficiency": 3,
        "speed": 30,
        "initiative": 1,
        "ac": 14,
        "currentHealth": 36,
        "maxHealth": 50,
        "tempHealth": 0,
        "defenses": [
            "Fire"
        ],
        "passives": {
            "perception": 11,
            "investigation": 10,
            "insight": 14
        },
        "abilities": {
            "strength": 10,
            "dexterity": 12,
            "constitution": 14,
            "intelligence": 11,
            "wisdom": 13,
            "charisma": 20
        },
        "savingThrows": {
            "strength": 0,
            "dexterity": 2,
            "constitution": 6,
            "intelligence": 1,
            "wisdom": 2,
            "charisma": 9
        },
        "skills": {
            "acrobatics": 1,
            "animal-handling": 1,
            "arcana": 3,
            "athletics": 1,
            "deception": 8,
            "history": 0,
            "insight": 4,
            "intimidation": 5,
            "investigation": 0,
            "medicine": 1,
            "nature": 0,
            "perception": 1,
            "performance": 5,
            "persuasion": 5,
            "religion": 0,
            "sleight-of-hand": 4,
            "stealth": 1,
            "survival": 1
        }
    }
]

localStorage.setItem("characters", JSON.stringify(characters));
