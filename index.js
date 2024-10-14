const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('inputColor');

hexInput.addEventListener('input', displayHex);

function displayHex() {
    const hex = hexInput.value;
    //if hex is not a valid value, exit this function
    if(!isValidHex(hex)) return;
    //no matter with or without #, all treat like no # in the input
    const strippedHex = hex.replace('#', '');
    //change and display the hex color
    inputColor.style.backgroundColor = "#" + strippedHex;
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
console.log(convertHexToRGB("ffe"));

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

console.log(isValidHex('#123456')); //true
console.log(isValidHex("#0000000")) //false
console.log(isValidHex("#ffffff")) //true
console.log(isValidHex("#fff")) //true
console.log(isValidHex("fff")) //true
console.log(isValidHex("ac")) //false
console.log(isValidHex('#ABCDEF'));    // true (valid 6-digit hex)
console.log(isValidHex('#123GHI'));   // false (invalid character 'G')




