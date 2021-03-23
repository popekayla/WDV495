var Color = /** @class */ (function () {
    function Color() {
    }
    //Sets the r, g, and b value to a random number between 0 and 255
    Color.prototype.randomizeColor = function () {
        this.r = Math.floor(Math.random() * 256);
        this.g = Math.floor(Math.random() * 256);
        this.b = Math.floor(Math.random() * 256);
    };
    //Returns a random number between  and 255
    Color.prototype.randomizeNumber = function () {
        return Math.floor(Math.random() * 256);
    };
    //Gets the stored values of r, g, and b and returns them as a string rgb(r,g,b)
    Color.prototype.generateRGB = function () {
        return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
    };
    //Gets the stored values of r, g, and b and takes in a number a returns them as a string rgba(r,g,b,a)
    Color.prototype.generateRGBA = function (a) {
        return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + a + ')';
    };
    //Takes the stored r, g, b values, converts them to hexadecimal code and returns a string
    Color.prototype.convertRGBToHex = function () {
        //Divide number by 16
        //First hex = quotient
        //Second hex = remainder
        var hex = [];
        hex.push(Math.floor(this.r / 16));
        hex.push(Math.round(this.r % 16));
        hex.push(Math.floor(this.g / 16));
        hex.push(Math.round(this.g % 16));
        hex.push(Math.floor(this.b / 16));
        hex.push(Math.round(this.b % 16));
        for (var i = 0; i <= 5; i++) {
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
    };
    //Takes a hex value and coverts it to RGB value
    Color.prototype.convertHexToRGB = function (hexCode) {
        //convert letters to numbers
        //multiple first number by 16
        //Add second number
        var hex = hexCode.split("");
        hex.shift();
        console.log(hex);
        console.log(parseFloat(hex[0]));
        for (var i = 0; i <= 5; i++) {
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
            }
            else {
                hex[i] = parseFloat(hex[i]);
            }
        }
        console.log(hex);
        this.r = (hex[0] * 16) + hex[1];
        this.g = (hex[2] * 16) + hex[3];
        this.b = (hex[4] * 16) + hex[5];
        console.log(this.r + ',' + this.g + ',' + this.b);
    };
    return Color;
}());
//Defers javascript until the window has loaded so selectors can be selected
window.onload = function () {
    //Get HTML elements
    var colorBox = document.querySelector('.color-box');
    var color = new Color;
    var inputs = document.querySelectorAll('input[type=number]');
    var randomBtns = document.querySelectorAll('.random');
    var switches = document.querySelectorAll('.switch');
    var hexForm = document.getElementById('hexForm');
    var textDisplay = document.querySelector('.color-box p');
    var rInput = document.getElementById('inr');
    var gInput = document.getElementById('ing');
    var bInput = document.getElementById('inb');
    var hexInput = document.getElementById('hexInput');
    //Sets the mode to RGB or Hex color
    function swtichGenerator(e) {
        var generatorID = this.id;
        if (generatorID == 'RGB') {
            if (document.getElementById('RGBForm').classList.contains('hidden')) {
                document.getElementById('RGBForm').classList.remove('hidden');
                document.getElementById('hexForm').classList.add('hidden');
                textDisplay.innerHTML = color.generateRGB();
                rInput.value = color.r;
                gInput.value = color.g;
                bInput.value = color.b;
            }
        }
        else {
            if (document.getElementById('hexForm').classList.contains('hidden')) {
                document.getElementById('hexForm').classList.remove('hidden');
                document.getElementById('RGBForm').classList.add('hidden');
                textDisplay.innerHTML = color.convertRGBToHex();
                document.getElementById('hexInput').value = color.convertRGBToHex();
            }
        }
    }
    //Generates a random number for the r, g, or b value
    function addRandomNumber(e) {
        var colorID = this.id;
        var inputID = "in" + colorID;
        var randomNumber = color.randomizeNumber();
        document.getElementById(inputID).value = randomNumber;
        color.colorID = randomNumber;
        getInputColor();
    }
    //Gets the inputed value and changes the display to that color
    function getInputColor() {
        if (hexForm.classList.contains('hidden')) {
            color.r = parseFloat(rInput.value);
            color.g = parseFloat(gInput.value);
            color.b = parseFloat(bInput.value);
        }
        else {
            var hex = hexInput.value;
            console.log("function" + hex);
            color.convertHexToRGB(hex);
        }
        changeColor();
    }
    //Generates a random color, and sets the HTML input values to that color, calls the changeColor function
    function addRandomColor() {
        color.randomizeColor();
        if (hexForm.classList.contains('hidden')) {
            rInput.value = color.r;
            gInput.value = color.g;
            bInput.value = color.b;
        }
        else {
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
        }
        else {
            textDisplay.innerHTML = color.convertRGBToHex();
        }
        changeTextColor();
    }
    //Determines the percieved brightness of the generated color to determine if black or white font color will have better contrast
    function changeTextColor() {
        var r = color.r * 0.2126;
        var g = color.g * 0.7152;
        var b = color.b * 0.0722;
        var sum = r + g + b;
        var percievedLightness = sum / 255;
        if (percievedLightness <= 0.5) {
            textDisplay.style.color = '#ffffff';
        }
        else {
            textDisplay.style.color = '#000000';
        }
    }
    //set event listeners and call functions
    addRandomColor();
    document.querySelector(".random-color").addEventListener("click", addRandomColor);
    document.querySelector('.randomHex').addEventListener("click", getInputColor);
    for (var _i = 0, switches_1 = switches; _i < switches_1.length; _i++) {
        var btn = switches_1[_i];
        btn.addEventListener('click', swtichGenerator);
    }
    for (var _a = 0, randomBtns_1 = randomBtns; _a < randomBtns_1.length; _a++) {
        var btn = randomBtns_1[_a];
        btn.addEventListener("click", addRandomNumber);
    }
    for (var _b = 0, inputs_1 = inputs; _b < inputs_1.length; _b++) {
        var input = inputs_1[_b];
        input.addEventListener("change", getInputColor);
    }
    document.addEventListener('keyup', function (event) {
        if (event.code === 'Space') {
            addRandomColor();
        }
    });
};
