const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('inputColor');
const alteredColor = document.getElementById('alteredColor');
const alteredColorText = document.getElementById('alteredColorText');
const sliderText = document.getElementById('sliderText');
const slider = document.getElementById('slider');
const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');
const toggleBtn = document.getElementById('toggleBtn');

hexInput.addEventListener('input', displayHex);
slider.addEventListener('input', displayPercentage);
toggleBtn.addEventListener('click', displayToggle);

function displayHex() {
    const hex = hexInput.value;
    //if hex is not a valid value, exit this function
    if(!isValidHex(hex)) return;
    //no matter with or without #, all treat like no # in the input
    const strippedHex = hex.replace('#', '');
    //change and display the hex color
    inputColor.style.backgroundColor = "#" + strippedHex;
    reset();
}

function convertHexToRGB(hex){
    if(!isValidHex(hex)) return null; //null to keep behavior clear and explicit
    let strippedHex = hex.replace('#', '');

    if(strippedHex.length === 3){
        strippedHex = strippedHex[0] + strippedHex[0] + strippedHex[1] + strippedHex[1] + strippedHex[2] + strippedHex[2];
    }

    //why use 16 as 2nd para: The hexadecimal system uses 16 symbols: 0-9 represent values zero to nine, and A-F (or a-f) represent values ten to fifteen. Therefore, when you want to convert a hexadecimal string to a decimal number, you need to specify that the string is in base 16.
    const r = parseInt(strippedHex.substring(0,2), 16); 
    const g = parseInt(strippedHex.substring(2,4), 16);
    const b = parseInt(strippedHex.substring(4,6), 16);
    
    return {r:r, g:g, b:b}
}
// console.log(convertHexToRGB("ffe"));
function convertRGBToHex(r,g,b){
    const firstPair = ("0" + r.toString(16)).slice(-2);
    const secondPair = ("0" + g.toString(16)).slice(-2);
    const thirdPair = ("0" + b.toString(16)).slice(-2);

    const hex = "#" + firstPair + secondPair + thirdPair;
    return hex;
}
console.log(convertRGBToHex(0,255,255));
//check if the color is valid
function isValidHex (hex){
    // Check if the input hex is falsy (null, undefined, empty string, etc.)
    if(!hex) return false;

    // Remove the '#' character from the hex string if it exists
    const strippedHex = hex.replace('#', ''); 

    // Return true if the length of the stripped hex is either 3 or 6
    if (strippedHex.length === 3 || strippedHex.length === 6) {
        // Use a for loop to check if each character in the stripped hex is a valid character
        for (let i = 0; i < strippedHex.length; i++) {
            const char = strippedHex[i];
            if (!((char >= '0' && char <= '9') || 
                  (char >= 'A' && char <= 'F') || 
                  (char >= 'a' && char <= 'f'))) {
                return false;
            }
        }
        return true; // Return true only after validating characters
    }
    return false; // Return false if length is not 3 or 6

}

function displayPercentage(){
    //check hex color if valid.
    if(!isValidHex(hexInput.value)) return;

    sliderText.textContent = `${slider.value}%`;

    //calculate the appropriate value for the color alteration 
    //between positive and negative
    const valueAddition = toggleBtn.classList.contains('toggled') ? -slider.value: slider.value;

    //get the altered hex value
    const alteredHex = alterColor(hexInput.value, valueAddition);

    //update the altered color
    alteredColor.style.backgroundColor = alteredHex;
    alteredColorText.innerText = `Altered Color ${alteredHex}`;

}

function alterColor(hex, percentage){
    const {r,g,b} = convertHexToRGB(hex); 

    const amount = Math.floor((percentage/100) * 255);

    const newR = increaseWithin0To255(r, amount);
    const newG = increaseWithin0To255(g, amount);
    const newB = increaseWithin0To255(b, amount);

    return convertRGBToHex(newR, newG, newB);
}

function increaseWithin0To255(hex, amount){
    const newHex = hex + amount;
    if(newHex > 255) return 255;
    if(newHex < 0) return 0;
    return newHex;
}



function displayToggle(){
    if(toggleBtn.classList.contains('toggled')){
        toggleBtn.classList.remove('toggled');
        lightenText.classList.remove('unselected');
        darkenText.classList.add('unselected');
    }else{
        toggleBtn.classList.add('toggled');
        lightenText.classList.add('unselected');
        darkenText.classList.remove('unselected');
    }
    reset();
}

function reset(){
    slider.value = 0;
    sliderText.innerText = `0%`;
    alteredColor.style.backgroundColor = hexInput.value;
    alteredColorText.innerText = `Altered Color ${hexInput.value}`;
}

