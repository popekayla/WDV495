#!C:\Users\popek\AppData\Local\Programs\Python\Python39/python.exe
import cgi
import json


form = cgi.FieldStorage()

characterID = int(form.getvalue('characterID'))
name = form.getvalue('name')

strenghability = int(form.getvalue('strengthability'))
dexterityability = int(form.getvalue('dexterityability'))
constitutionability = int(form.getvalue('constitutionability'))
intelligenceability = int(form.getvalue('intelligenceability'))
wisdomability = int(form.getvalue('wisdomability'))
charismaability = int(form.getvalue('charismaability'))

strengthSave = int(form.getvalue('strengthsave'))
dexteritySave = int(form.getvalue('dexteritysave'))
constitutionSave = int(form.getvalue('constitutionsave'))
intelligenceSave = int(form.getvalue('intelligencesave'))
wisdomSave = int(form.getvalue('wisdomsave'))
charismaSave = int(form.getvalue('charismasave'))

acrobatics = int(form.getvalue('acrobatics'))
animal_handling = int(form.getvalue('animal-handling'))
arcana = int(form.getvalue('arcana'))
athletics = int(form.getvalue('athletics'))
deception = int(form.getvalue('deception'))
history = int(form.getvalue('history'))
insight = int(form.getvalue('insight'))
intimidation = int(form.getvalue('intimidation'))
investigation = int(form.getvalue('investigation'))
medicine = int(form.getvalue('medicine'))
nature = int(form.getvalue('nature'))
perception = int(form.getvalue('perception'))
performance = int(form.getvalue('performance'))
persuasion = int(form.getvalue('persuasion'))
religion = int(form.getvalue('religion'))
sleight_of_hand = int(form.getvalue('sleight-of-hand'))
stealth = int(form.getvalue('stealth'))
survival = int(form.getvalue('survival'))


abilities = {
    "strength": strenghability,
    "dexterity": dexterityability,
    "constitution": constitutionability,
    "intelligence": intelligenceability,
    "wisdom": wisdomability,
    "charisma": charismaability
    }
savingThrows = {
    "strength": strengthSave,
    "dexterity": dexteritySave,
    "constitution": constitutionSave,
    "intelligence": intelligenceSave,
    "wisdom": wisdomSave,
    "charisma": charismaSave
}
skills = {
    "acrobatics": acrobatics,
    "animal-handling": animal_handling,
    "arcana": arcana,
    "athletics": athletics,
    "deception": deception,
    "history": history,
    "insight": insight,
    "intimidation": intimidation,
    "investigation": investigation,
    "medicine": medicine,
    "nature": nature,
    "perception": perception,
    "performance": performance,
    "persuasion": persuasion,
    "religion": religion,
    "sleight-of-hand": sleight_of_hand,
    "stealth": stealth,
    "survival": survival
}
newChar = { "characterID": characterID, "name": name, "abilities" : abilities, "savingThrows": savingThrows, "skills": skills }

print("Content-Type: text/html \r\n")

with open('../database/character.json') as jsonFile:
    data = json.load(jsonFile)
    update = "false"
    for x in range(len(data)):
        if data[x]["characterID"] == characterID:
            for key in data[x]:
                #print(data[x].get(key))
                #print(newChar.get(key))
                if data[x].get(key) != newChar.get(key):
                    data[x][key] = newChar[key]
            update = "true"
            break        

    if update != "true":
        data.append(newChar)
        #print(newChar)

updatedData = json.dumps(data, indent = 4)
with open('../database/character.json', "w") as outFile:
    outFile.write(updatedData)

#print(data)
updatedCharacters = json.dumps(data)

print(updatedCharacters)