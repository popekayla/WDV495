
/*Functions to make creating and appending elements faster*/
function createElement(element) {
    return document.createElement(element);
}

function appendElement(parent, element) {
    return parent.appendChild(element);
}

function adjacentElement(parent, position, element) {
    return parent.insertAdjacentElement(position, element);
}

window.onload = function () {
    //save elements in variables
    let characterSelect = document.querySelector('.characterSelect');
    let container = document.querySelector('.container');
    let proBonusContainer = document.querySelector('.pro-bonus');
    let abilitiesContainer = document.querySelector('.abilities');
    let savingContainer = document.querySelector('.saving-throws');
    let skillsContainer = document.querySelector('.skills');
    let acContainer = document.querySelector('.acBlock');
    let initiativeContainer = document.querySelector('.initiativeBlock');
    let speedContainer = document.querySelector('.speedBlock');
    let healthContainer = document.querySelector('.health p');
    let tempHealthContainer = document.querySelector('.health div:last-of-type p');
    let passivesContainer = document.querySelector('.passives');
    let defensesContainer = document.querySelector('.defenses');
    let editBtn = document.querySelector('.edit');
    let newCharBtn = document.querySelector('.new');
    let nameContainer = document.querySelector('.nameDisplay');
    let nameElement = document.querySelector('.name');
    let formElement = document.querySelector('form');

    //Fetch call to get data from JSON file and display it on the page

        let characters = localStorage.getItem("characters");
        characters = JSON.parse(characters);
        console.log(characters);
        //Creates and display options for each character in the characters object
        characters.map(function(character){
            let option = createElement('OPTION');
            option.text = character.name;
            option.value = character.characterID;
            appendElement(characterSelect, option);
            characterSelect.addEventListener('change', display);
        });

        //Function to create and add elements to display character information
        function display(ID) {
            formElement.classList.remove('invisible');

            //Gets currently displayed character's ID, if there is one
            let nameElement = document.querySelector('.name');
            let oldID = (nameElement != null ? nameElement.id : "");

            //Sets ID to value of clicked option, or to the ID passsed through the parameter if the select wasn't clicked
            ID = (this.value != undefined ? this.value : ID);

           //Gets selected character information 
            let character = characters[ID];  

                //If there is no currently displayed character, build the character display and insert info
                if(oldID == "") {
                    //Display name and basic info
                    let name = createElement('SPAN');
                    name.classList = 'editable name';
                    name.id = character.characterID;
                    name.innerHTML = character.name;

                    let race = createElement('SPAN');
                    race.classList = "editable race";
                    race.innerHTML = character.race;

                    let dndClass = createElement('SPAN');
                    dndClass.classList = "editable class";
                    dndClass.innerHTML = character.class;

                    let level = createElement('SPAN');
                    level.classList = "editable level";
                    level.innerHTML = character.level;

                    let basicInfo = document.querySelectorAll('.other-info p');
                    let span=[race, dndClass, level];

                    for (let i=0; i<basicInfo.length; i++) {
                        appendElement(basicInfo[i], span[i]);
                    }

                    appendElement(nameContainer, name);
 
                    //Display abilities
                    for(let i=0; i < Object.keys(character.abilities).length; i++) {
                            let div = createElement('DIV');
                            let editElement = createElement('SPAN');
                            let p = createElement('P');
                            
                            div.classList = 'ability';
                            editElement.classList = 'editable ' + Object.keys(character.abilities)[i] + "ability";
                            editElement.innerHTML=Object.values(character.abilities)[i];
                            p.innerHTML=Object.keys(character.abilities)[i];

                            appendElement(abilitiesContainer, div);
                            appendElement(div, editElement);
                            appendElement(div, p);
                    }

                    //Display Proficiency Bonus
                    let proBonus = createElement('SPAN');
                    proBonus.classList = "editable proficiency";
                    proBonus.innerHTML = character.proficiency;
                    adjacentElement(proBonusContainer, 'afterbegin', proBonus);

                    //Display Saving Throws
                    for(let i=0; i<Object.keys(character.savingThrows).length; i++) {
                        console.log(Object.values(character.savingThrows)[i]);
                        let p = createElement('P');
                        let span = createElement('SPAN');

                        p.classList = 'saving-throw';
                        span.classList  = 'editable '+ Object.keys(character.savingThrows)[i] + "save";

                        p.innerHTML = Object.keys(character.savingThrows)[i] + " ";
                        span.innerHTML = Object.values(character.savingThrows)[i];

                        //console.log(p);
                        appendElement(savingContainer, p);
                        appendElement(p, span);
                    }

                    //Display Skills
                    for(let i=0; i<Object.keys(character.skills).length; i++) {
                        let p = createElement('P');
                        let span = createElement('SPAN');

                        p.classList = 'skill';
                        span.classList  = 'editable ' + Object.keys(character.skills)[i];

                        p.innerHTML = Object.keys(character.skills)[i] + " ";
                        span.innerHTML = Object.values(character.skills)[i];

                    // console.log(p);
                        appendElement(skillsContainer, p);
                        appendElement(p, span);
                    } 

                    //Display AC/Initiative/Speed
                    let ac = createElement('SPAN');
                    ac.classList = "editable ac";
                    ac.innerHTML = character.ac;

                    let initiative = createElement('SPAN');
                    initiative.classList = "editable initiative";
                    initiative.innerHTML = character.initiative;

                    let speed = createElement('SPAN');
                    speed.classList = "editable speed";
                    speed.innerHTML = character.speed;

                    adjacentElement(acContainer, 'afterbegin', ac);
                    adjacentElement(initiativeContainer, 'afterbegin', initiative);
                    adjacentElement(speedContainer, 'afterbegin', speed);

                    //Display Health
                    let current = createElement('SPAN');
                    current.classList = "editable current-health";
                    current.innerHTML = character.currentHealth;

                    let total = createElement('SPAN');
                    total.classList = "editable max-health";
                    total.innerHTML = character.maxHealth;

                    let temp = createElement('SPAN');
                    temp.classList = "editable temp-health";
                    temp.innerHTML = character.tempHealth;

                    adjacentElement(healthContainer, 'afterbegin', current);
                    adjacentElement(healthContainer, 'beforeend', total);
                    adjacentElement(tempHealthContainer, 'beforebegin', temp);

                    //Display Passives
                    for(let i=0; i<Object.keys(character.passives).length; i++) {
                        let p = createElement('P');
                        let span = createElement('SPAN');

                        p.classList = 'skill';
                        span.classList  = 'editable ' + 'passive' + Object.keys(character.passives)[i];

                        p.innerHTML = Object.keys(character.passives)[i] + " ";
                        span.innerHTML = Object.values(character.passives)[i];

                        appendElement(passivesContainer, p);
                        appendElement(p, span);
                    } 

                    //Display Defenses
                    for(let i=0; i<character.defenses.length; i++) {
                        let span = createElement('SPAN');
                        span.classList  = 'defenses' + [i];

                        span.innerHTML = character.defenses[i];
                        
                        appendElement(defensesContainer, span);
                    } 


                } else { //Replaces displayed info with new character info
                    nameElement.innerHTML = character.name;
                    nameElement.id = character.characterID;

                    let abilitySpans = document.querySelectorAll('.abilities span');
                    let savingSpans = document.querySelectorAll('.saving-throws span');
                    let skillSpans = document.querySelectorAll('.skills span');
                    let otherInfoSpans = document.querySelectorAll('.other-info span');
                    let otherInfoContent = [character.race, character.class, character.level];
                    let currentHealth = document.querySelector('.current-health');
                    let maxHealth = document.querySelector('.max-health');
                    let tempHealth = document.querySelector('.temp-health');
                    let passivesSpans = document.querySelectorAll('.passives span');
                    let defensesSpans = document.querySelectorAll('.defenses span');

                    
                    for(let i=0; i<abilitySpans.length; i++) {
                        abilitySpans[i].innerHTML = Object.values(character.abilities)[i];
                    }

                    for(let i=0; i<savingSpans.length; i++) {
                        savingSpans[i].innerHTML = Object.values(character.savingThrows)[i];
                    }

                    for(let i=0; i<skillSpans.length; i++) {
                        skillSpans[i].innerHTML = Object.values(character.skills)[i];
                    }

                    for(let i=0; i<otherInfoSpans.length; i++) {
                        otherInfoSpans[i].innerHTML = otherInfoContent[i];
                    }

                    proBonusContainer.firstElementChild.innerHTML = character.proficiency;
                    acContainer.firstElementChild.innerHTML = character.ac;
                    initiativeContainer.firstElementChild.innerHTML = character.initiative;
                    speedContainer.firstElementChild.innerHTML = character.speed;

                    currentHealth.innerHTML = character.currentHealth;
                    maxHealth.innerHTML = character.maxHealth;
                    tempHealth.innerHTML = character.tempHealth;

                    for(let i=0; i<passivesSpans.length; i++) {
                        passivesSpans[i].innerHTML = Object.values(character.passives)[i];
                    } 

                    for(let i=0; i<defensesSpans.length; i++) {
                        defensesSpans[i].innerHTML = character.defenses[i];
                    }
                }
            
        };

        //Takes span elements and turns them into inputs for editing
        function displayForm(ID) {  
            // alert('connected');
            let editBtn = document.querySelector('.edit');

            //If new character button was clicked, call the display function to display character info
                if(this.classList.contains('new')) {
                    display(0);
                }
                let editableNumElements = document.querySelectorAll('.editable');
                let newBtn = createElement('BUTTON');
                newBtn.setAttribute("type", "button");
                newBtn.innerHTML = 'Save';
                newBtn.classList = 'saveBtn'
                editBtn.parentNode.replaceChild(newBtn, editBtn);
                
                ID = (characterSelect.value != 'undefined') ? characterSelect.value : characters.length;
                //alert(ID);
            // alert(characters.characterID);
                for(editable of editableNumElements) { 
                    let name = editable.classList.item(1);          
                    let input = createElement("INPUT");

                    if(this.classList.contains('edit')) {
                        let content = editable.innerHTML;
                        input.value = content;
                    }

                    input.setAttribute("type", "text");
                    input.setAttribute("name", name);
                    input.classList = "editable " + name;
                    editable.parentNode.replaceChild(input, editable);
                }

            //Async/await function call to save function
            newBtn.addEventListener('click', async function() {

                //Use of await means it waits until the promise has been recieved to return the object and save in a variable
                newCharList = await save(ID);
                //console.log(ID);
                //console.log(characters);

                //replace character JSON object with new one
                characters = newCharList;
                //console.log(characters);

                newCharList = JSON.stringify(newCharList);
                localStorage.setItem("characters", newCharList);

                let newID = document.querySelector('.name').id;
                
                //Replace save button with edit button
                let saveBtn = document.querySelector('.saveBtn');
                let newBtn = createElement('BUTTON');
                newBtn.innerHTML = 'Edit';
                newBtn.classList = 'edit';
                newBtn.setAttribute("type", "button");
                saveBtn.parentNode.replaceChild(newBtn, saveBtn);

                newBtn.addEventListener('click', displayForm);

                //Adds a new option to the select if there's a new character
                if(ID !== newID) {
                        let select = document.querySelector('select');
                        let option = createElement('OPTION');
                        option.innerHTML = characters[newID].name;
                        option.value = newID;
                        appendElement(select, option);
                }
                });
            }


        editBtn.addEventListener('click', displayForm);
        newCharBtn.addEventListener('click', displayForm);
    
    //Gets form data, posts it to python for processsing, and returns the updated character JSON object
    async function save(ID) {
        //alert('connected');
        let inputs = document.querySelectorAll('input');
        let isValid = true;

        //Simple validation
        for(input of inputs) {
            if(input.value == "") {
                alert("Please enter values");
                isValid = false;
                break;
            }
        }


        if(isValid) {
            //Gets values from form into FormData object so python can process it
            let character = new FormData();

            character.append("characterID", parseInt(ID));
            character.append("name", document.querySelector('.name').value);

            character.append("race", document.querySelector('.race').value);
            character.append("class", document.querySelector('.class').value);
            character.append("level", document.querySelector('.level').value);
            
            let abilityInputs = document.querySelectorAll('.abilities input');
            for(ability of abilityInputs) {
                character.append(ability.name, parseInt(ability.value));
            }

            let saveInputs = document.querySelectorAll('.saving-throws input');
            console.log(saveInputs);
            for(saveThrow of saveInputs) {
                character.append(saveThrow.name, parseInt(saveThrow.value));
                //console.log(saveThrow.name + ", " + saveThrow.value);
            }

            let skillInputs = document.querySelectorAll('.skills input');
            for(skill of skillInputs) {
                character.append(skill.name, parseInt(skill.value));
            }

            character.append("proficiency", document.querySelector('.proficiency').value);
            character.append("ac", document.querySelector('.ac').value);
            character.append("initiative", document.querySelector('.initiative').value);
            character.append('speed', document.querySelector('.speed').value);

            character.append("maxHealth", document.querySelector('.max-health').value);
            character.append("currentHealth", document.querySelector('.current-health').value);
            character.append("tempHealth", document.querySelector('.temp-health').value);

            let defenses = []
            defenses.push(document.querySelector('.defenses span').innerHTML);
            character.append("defenses", defenses);

            let passiveInputs = document.querySelectorAll('.passives input');
            for(passive of passiveInputs) {
                character.append(passive.name, parseInt(passive.value));
            }
            

            for(var pair of character.entries()) {
                console.log(pair[0]+ ', '+ pair[1]);
             }

            //Async await function using fetch to post the FormData object to the python file and gets updated character JSON data as response
            try {
                let data = await fetch('/PWA/py/saveData.py', {
                                method: 'post',
                                body: character
                                });
                    newData = data.json();
                    

                    //Replaces inputs with span elements to display updated character sheet
                    let editableInputs = document.querySelectorAll('input.editable');
            
                    for (input of editableInputs) {
                        let span = createElement('SPAN');
                        span.classList = input.classList;
                        span.innerHTML = input.value;
                        input.parentNode.replaceChild(span, input);
                    }
                    
                    let nameElement = document.querySelector('.name');
                    nameElement.id = ID;
                
                //Return the new character JSON object
                return await newData;
               
            //Error handling
            } catch(error) {
                console.error('Error:', error);
                };
        }

    }

    'use strict';
  
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('./sw.js');
    }

}