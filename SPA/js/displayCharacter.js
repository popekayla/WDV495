
/*Functions to make creating and appending elements faster*/
function createElement(element) {
    return document.createElement(element);
}

function appendElement(parent, element) {
    return parent.appendChild(element);
}


function makeNumElementsEditable(e) {
    //alert('hi!');
    let editElement = e.target;
    let editElementContent = editElement.innerHTML;

    let input = document.createElement("INPUT")
    input.setAttribute("type", "number");
    input.value = editElementContent;

    editElement.parentNode.replaceChild(input, editElement);

    input.focus();

    input.addEventListener('blur', function() {
        console.log('hi');
        let newContent = input.value;
        let newElement = document.createElement("P");
        newElement.classList = "editable";
        newElement.innerHTML = newContent;

        input.parentNode.replaceChild(newElement, input);

        newElement.addEventListener('click', makeNumElementsEditable);
    });
}

window.onload = function () {
    let characterSelect = document.querySelector('.characterSelect');
    let container = document.querySelector('.container');
    let abilitiesContainer = document.querySelector('.abilities');
    let savingContainer = document.querySelector('.saving-throws');
    let skillsContainer = document.querySelector('.skills');
    let editBtn = document.querySelector('.edit');
    let newCharBtn = document.querySelector('.new');
    let nameContainer = document.querySelector('.nameDisplay');
    let nameElement = document.querySelector('.name');
    let formElement = document.querySelector('form');


    let url = 'database/character.json';

    async function save(ID) {
        //alert('connected');
        let inputs = document.querySelectorAll('input');
        let isValid = true;
        for(input of inputs) {
            if(input.value == "") {
                alert("Please enter values");
                isValid = false;
                break;
            }
        }

        if(isValid) {
            let character = new FormData();

            character.append("characterID", parseInt(ID));
            character.append("name", document.querySelector('.name').value);
            
            let abilityInputs = document.querySelectorAll('.abilities input');
            for(ability of abilityInputs) {
                character.append(ability.name, parseInt(ability.value));
            }

            let saveInputs = document.querySelectorAll('.saving-throws input');
            console.log(saveInputs);
            for(saveThrow of saveInputs) {
                character.append(saveThrow.name, parseInt(saveThrow.value));
                console.log(saveThrow.name + ", " + saveThrow.value);
            }

            let skillInputs = document.querySelectorAll('.skills input');
            for(skill of skillInputs) {
                character.append(skill.name, parseInt(skill.value));
            }

            try {
                let data = await fetch('/SPA/py/saveData.py', {
                                method: 'post',
                                body: character
                                });
                    newData = data.json();
                    //console.log("success", newData);
                    let editableInputs = document.querySelectorAll('input.editable');
                    //for loop length of inputs
                    //for character[i] classList
                    //replace inputs
                    for (input of editableInputs) {
                        let span = createElement('SPAN');
                        span.classList = input.classList;
                        span.innerHTML = input.value;
                        input.parentNode.replaceChild(span, input);
                    }
                    
                    let nameElement = document.querySelector('.name');
                    nameElement.id = ID;

                return await newData;
                //display(data);
            } catch(error) {
                console.error('Error:', error);
                };
        }

    }

    fetch(url)
    .then((resp) => resp.json())
    .then(data =>{
        console.log(data);
        let characters = data;
        console.log("Keys: " + Object.keys(characters).length);
        function displayForm(ID) {  
           // alert('connected');
           let editBtn = document.querySelector('.edit');
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

           newBtn.addEventListener('click', async function() {
               newCharList = await save(ID);
               //characters = newCharList;
               console.log(ID);
               //console.log(characters);
               characters = newCharList;
               console.log(characters);
               let newID = document.querySelector('.name').id;
               
               let saveBtn = document.querySelector('.saveBtn');

               let newBtn = createElement('BUTTON');
               newBtn.innerHTML = 'Edit';
               newBtn.classList = 'edit';
               newBtn.setAttribute("type", "button");
               saveBtn.parentNode.replaceChild(newBtn, saveBtn);

               newBtn.addEventListener('click', displayForm);
               if(ID !== newID) {
                    let select = document.querySelector('select');
                    let option = createElement('OPTION');
                    option.innerHTML = characters[newID].name;
                    option.value = newID;
                    appendElement(select, option);
               }
            })
        }
        function display(ID) {
            formElement.classList.remove('invisible');
            let nameElement = document.querySelector('.name');
            let oldID = (nameElement != null ? nameElement.id : "");
            ID = (this.value != undefined ? this.value: ID);
           // alert(characters[ID].name);
            let character = characters[ID];  
                if(oldID == "") {
                    let name = createElement('SPAN');
                    name.classList = 'editable name';
                    name.id = character.characterID;
                    name.innerHTML = character.name;
                    appendElement(nameContainer, name);
                    //console.log(Object.keys(character.abilities).length);
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
                } else {
                    nameElement.innerHTML = character.name;
                    nameElement.id = character.characterID;
                    let abilitySpans = document.querySelectorAll('.abilities span');
                    let savingSpans = document.querySelectorAll('.saving-throws span');
                    let skillSpans = document.querySelectorAll('.skills span');
                    
                    for(let i=0; i<abilitySpans.length; i++) {
                        abilitySpans[i].innerHTML = Object.values(character.abilities)[i];
                    }

                    for(let i=0; i<savingSpans.length; i++) {
                        savingSpans[i].innerHTML = Object.values(character.savingThrows)[i];
                    }

                    for(let i=0; i<skillSpans.length; i++) {
                        skillSpans[i].innerHTML = Object.values(character.skills)[i];
                    }
                }
            
        };
        characters.map(function(character){
            let option = createElement('OPTION');
            option.text = character.name;
            option.value = character.characterID;
            appendElement(characterSelect, option);
            characterSelect.addEventListener('change', display);
        });
       // display(0);

        editBtn.addEventListener('click', displayForm);
        newCharBtn.addEventListener('click', displayForm);

        
    })
    .catch(function(error) {
      console.log(error);
    });

}