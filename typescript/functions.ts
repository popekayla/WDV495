class Color{
    r: number;
    g: number;
    b: number;
    //Sets the r, g, and b value to a random number between 0 and 255
    randomizeColor() {
        this.r = Math.floor(Math.random() * 256);
        this.g = Math.floor(Math.random() * 256);
        this.b = Math.floor(Math.random() * 256);
    }
    //Returns a random number between  and 255
    randomizeNumber() {
        return Math.floor(Math.random() * 256);
    }
    //Gets the stored values of r, g, and b and returns them as a string rgb(r,g,b)
    generateRGB() {
        return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
    }
    //Gets the stored values of r, g, and b and takes in a number a returns them as a string rgba(r,g,b,a)
    generateRGBA(a:number) {
        return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + a + ')';
    }
    //Takes the stored r, g, b values, converts them to hexadecimal code and returns a string
    convertRGBToHex() {
        //Divide number by 16
        //First hex = quotient
        //Second hex = remainder
        let hex = [];

        hex.push(Math.floor(this.r / 16));
        hex.push(Math.round(this.r % 16));
        hex.push(Math.floor(this.g / 16));
        hex.push(Math.round(this.g % 16));
        hex.push(Math.floor(this.b / 16));
        hex.push(Math.round(this.b % 16));


        for(let i=0; i<=5; i++) {
            if (hex[i] > 9) {
                if (hex[i] === 10) {
                    hex[i] = 'A';
                }
                if (hex[i] === 11) {
                    hex[i] = 'B';
                }
                if (hex[i] === 12) {
                    hex[i] = 'C';
                }
                if (hex[i] === 13) {
                    hex[i] = 'D';
                }
                if (hex[i] === 14) {
                    hex[i] = 'E';
                }
                if (hex[i] === 15) {
                    hex[i] = 'F';
                }
            }
        }

        return '#' + hex[0] + hex[1] + hex[2] + hex[3] + hex[4] + hex[5];
        
    }
    //Takes a hex value and coverts it to RGB value
    convertHexToRGB(hexCode:any) {
        //convert letters to numbers
        //multiple first number by 16
        //Add second number

        let hex = hexCode.split("");
        hex.shift();
        console.log(hex);
        console.log(parseFloat(hex[0]));
        for (let i=0; i<=5; i++) {
            if (isNaN(hex[i])) {
                hex[i] = hex[i].toUpperCase();
                if (hex[i] === 'A') {
                    hex[i] = 10;
                }
                if (hex[i] === 'B') {
                    hex[i] = 11;
                }
                if (hex[i] === 'C') {
                    hex[i] = 12;
                }
                if (hex[i] === 'D') {
                    hex[i] = 13;
                }
                if (hex[i] === 'E') {
                    hex[i] = 14;
                }
                if (hex[i] === 'F') {
                    hex[i] = 15;
                }
            } else {
                hex[i] = parseFloat(hex[i]);
            }
        }
        console.log(hex);
        this.r = (hex[0] * 16) + hex[1];
        this.g = (hex[2] * 16) + hex[3];
        this.b = (hex[4] * 16) + hex[5];

        console.log(this.r + ',' + this.g + ',' + this.b);

    }
}

//Defers javascript until the window has loaded so selectors can be selected
window.onload = function () {

    //Get HTML elements
    let colorBox = (document.querySelector('.color-box')  as HTMLElement);
    let color = new Color;
    let inputs = (document.querySelectorAll('input[type=number]') as any);
    let randomBtns = (document.querySelectorAll('.random')  as any);
    let switches = (document.querySelectorAll('.switch')  as any);
    let hexForm = document.getElementById('hexForm');
    let textDisplay = (document.querySelector('.color-box p') as HTMLElement);
    let rInput =  (document.getElementById('inr') as HTMLInputElement);
    let gInput =  (document.getElementById('ing') as HTMLInputElement);
    let bInput =  (document.getElementById('inb') as HTMLInputElement);
    let hexInput = (document.getElementById('hexInput') as HTMLInputElement);

    //Sets the mode to RGB or Hex color
    function swtichGenerator(e) {
        let generatorID = this.id;
        if(generatorID == 'RGB') {
            if (document.getElementById('RGBForm').classList.contains('hidden')) {
                document.getElementById('RGBForm').classList.remove('hidden');
                document.getElementById('hexForm').classList.add('hidden');
                textDisplay.innerHTML = color.generateRGB();  
                rInput.value = (color.r as any);
                gInput.value = (color.g as any);
                bInput.value = (color.b as any);
            }
        } else {
            if (document.getElementById('hexForm').classList.contains('hidden')) {
                document.getElementById('hexForm').classList.remove('hidden');
                document.getElementById('RGBForm').classList.add('hidden');
                textDisplay.innerHTML = color.convertRGBToHex();
                (document.getElementById('hexInput') as HTMLInputElement).value = color.convertRGBToHex();
            }
        }
    }

    
    //Generates a random number for the r, g, or b value
    function addRandomNumber(e) {
        let colorID = this.id;
        let inputID = "in" + colorID;
        let randomNumber = color.randomizeNumber();
        (document.getElementById(inputID) as HTMLInputElement).value = (randomNumber as any);
        color.colorID = randomNumber;
        getInputColor();
    }

    //Gets the inputed value and changes the display to that color
    function getInputColor() {
        if(hexForm.classList.contains('hidden')) {
            color.r = parseFloat(rInput.value);
            color.g = parseFloat(gInput.value);
            color.b = parseFloat(bInput.value);
        } else {
            let hex = hexInput.value;
            console.log("function" + hex);
            color.convertHexToRGB(hex);
        }
        changeColor();
    }
       
    //Generates a random color, and sets the HTML input values to that color, calls the changeColor function
    function addRandomColor() {
        color.randomizeColor();
        if(hexForm.classList.contains('hidden')) {
            rInput.value = (color.r as any);
            gInput.value = (color.g as any);
            bInput.value = (color.b as any);
        } else {
            hexInput.value = color.convertRGBToHex();
        }
        changeColor();
    }

    //Changes the background color of the box, sets the display color value and makes a call to determine text color
    function changeColor() {
        colorBox.style.backgroundColor = color.generateRGB();
        colorBox.style.boxShadow = "0 0 1.5em " + color.generateRGBA(0.8);
        if (hexForm.classList.contains('hidden')) {
            textDisplay.innerHTML = color.generateRGB();
        } else {
            textDisplay.innerHTML = color.convertRGBToHex();
        }
        changeTextColor();
    }

    //Determines the percieved brightness of the generated color to determine if black or white font color will have better contrast
    function changeTextColor() {
        let r = color.r * 0.2126;
        let g = color.g * 0.7152;
        let b = color.b * 0.0722;
        let sum = r + g + b;
        let percievedLightness = sum / 255;
        if(percievedLightness <= 0.5) {
            textDisplay.style.color = '#ffffff';
        } else {
            textDisplay.style.color = '#000000';
        }
    }

    //set event listeners and call functions
    addRandomColor();

    document.querySelector(".random-color").addEventListener("click", addRandomColor);

    document.querySelector('.randomHex').addEventListener("click", getInputColor);

    for (let btn of switches) {
        btn.addEventListener('click', swtichGenerator);
    }

    for (let btn of randomBtns) {
        btn.addEventListener("click", addRandomNumber);
    }

    for (let input of inputs) {
        input.addEventListener("change", getInputColor);
    }

    document.addEventListener('keyup', event => {
        if (event.code === 'Space') {
          addRandomColor();
        }
      })
};
