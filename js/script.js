// Get references to the #generate element
var generateBtn = document.querySelector('#generate');
console.log('generateBtn');

// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.',
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];


// Function to prompt user for password options
function getPasswordOptions() {

    // Object to store user input
    var passwordOptions = {
      length: undefined,
      hasSpecialCharacters: undefined,
      hasNumericCharacters: undefined,
      hasLowerCasedCharacters: undefined,
      hasUpperCasedCharacters: undefined,
      
    };
  
  // Variable to store length of password from user input
  length = window.prompt("What is the length of the password to be generated? ");

  // Conditional statement to check if password length is a number. Prompts end if this evaluates false
  // Conditional statement to check if password length is at least 8 characters long. Prompts end if this evaluates false
  // Conditional statement to check if password length is less than 128 characters long. Prompts end if this evaluates false
  if (!isNaN(length) && length > 8 && length < 128) {    
    // value entered is an integer greater than or equal to 8 and less that 128 c
    passwordOptions.length = this.length;
  } else {
    // if not stop prompts.....maybe add a message or alert why the prompts are ending
    alert("password doesn't meet the basic requirements!")
    return null;
  }
 
  // Variable to store boolean regarding the inclusion of special characters
  passwordOptions.hasSpecialCharacters = confirm('Click OK to confirm including special characters.');

  // Variable to store boolean regarding the inclusion of numeric characters
  passwordOptions.hasNumericCharacters = confirm('Click OK to confirm including numeric characters.');

  // Variable to store boolean regarding the inclusion of lowercase characters
  passwordOptions.hasLowerCasedCharacters = confirm('Click OK to confirm including lowercase characters.');

  // Variable to store boolean regarding the inclusion of uppercase characters
  passwordOptions.hasUpperCasedCharacters = confirm('Click OK to confirm including uppercase characters.');

  // Conditional statement to check if user does not include any types of characters. Password generator ends if all four variables evaluate to false
  if (!passwordOptions.hasLowerCasedCharacters &&
      !passwordOptions.hasNumericCharacters &&
      !passwordOptions.hasSpecialCharacters &&
      !passwordOptions.hasUpperCasedCharacters) {
        alert("password must contain one of the 4 options!")
        return null;    
      }

  return passwordOptions;
}

// Function for getting a random element from an array
function getRandom(arr) {
  var randIndex = Math.floor(Math.random() * arr.length);
  var randElement = arr[randIndex];

  return randElement;
}

// Function to generate password with user input
function generatePassword() {

  var options = getPasswordOptions();

  // Check if an options object exists, if not exit the function
  if (!options) return null;

  // Variable to store password as it's being concatenated
  var result = [];

  // Array to store types of characters to include in password
  var possibleCharacters = [];

  // Array to contain one of each type of chosen character to ensure each will be used
  var guaranteedCharacters = [];

  var guaranteedCnt = 0;
  // Conditional statement that adds array of special characters into array of possible characters based on user input
  if (options.hasSpecialCharacters) {
    var special = [];
    for (let x = 0; x < options.length; x++) {
      special[x] = getRandom(specialCharacters);
    }
    possibleCharacters = possibleCharacters.concat(special);
    // Push new random special character to guaranteedCharacters
    guaranteedCharacters[guaranteedCnt++] = getRandom(specialCharacters);
  }

  // Conditional statement that adds array of numeric characters into array of possible characters based on user input
  if (options.hasNumericCharacters) {
    var numbers = [];
    for (let x = 0; x < options.length; x++) {
      numbers[x] = getRandom(numericCharacters);
    }
    possibleCharacters = possibleCharacters.concat(numbers);
    // Push new random special character to guaranteedCharacters
    guaranteedCharacters[guaranteedCnt++] = getRandom(numericCharacters);
  }
  
  // Conditional statement that adds array of lowercase characters into array of possible characters based on user input
  if (options.hasLowerCasedCharacters) {
    lower = [];
    for (let x = 0; x < options.length; x++) {
      lower[x] = getRandom(lowerCasedCharacters);
    }
    possibleCharacters = possibleCharacters.concat(lower);
    // Push new random lower-cased character to guaranteedCharacters
    guaranteedCharacters[guaranteedCnt++] = getRandom(lowerCasedCharacters);
  }
  
  // Conditional statement that adds array of uppercase characters into array of possible characters based on user input
  if (options.hasUpperCasedCharacters) {
    upper = [];
    for (let x = 0; x < options.length; x++) {
      upper[x] = getRandom(upperCasedCharacters);
    }
    possibleCharacters = possibleCharacters.concat(upper);
    // Push new random upper-cased character to guaranteedCharacters
    guaranteedCharacters[guaranteedCnt++] = getRandom(upperCasedCharacters);
  }

  // put the guaranteed characters in the front of the result
  result = guaranteedCharacters.slice();

  // For loop to iterate over the password length from the options object, selecting random indices from the array of possible characters and concatenating those characters into the result variable
  for (let x = guaranteedCharacters.length; x < (options.length); x++) {
    result[x] = getRandom(possibleCharacters);
  }
   
  // Transform and return the result into a string and replace the commas
  return result.join(',').replaceAll(',', '');
}



// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  //display the value returned from the generatePassword function
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);
