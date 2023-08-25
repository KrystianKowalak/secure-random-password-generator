//----------------------------------------Assignment Code----------------------------------------
const generateButton = document.querySelector("#generate");

//----------------------------------------Function Declarations----------------------------------------
//Retrieves password length from user
//Takes in a boolen flag for invalid input
//Returns password length (8 - 128) or NULL if cancelled
function getPasswordLength(bool) {
  //Variable declaration
  let errorFlag = bool;
  let passwordLength;

  //Function prompt
  if(!errorFlag)
  {
    //Defualt prompt
    passwordLength = prompt("Please enter the length of the password:", "Enter length");
  }
  else
  {
    //Recussive prompt after invalid input
    passwordLength = prompt("Please enter a valid input (valid input: 8 - 128):", "Enter length");
  }
  
  //Flag for cancelling
  if(passwordLength == null)
  {
    return passwordLength;
  }

  //Parsing string input into integer
  passwordLength = parseInt(passwordLength);

  //Invalid input check  
  if((passwordLength < 8) || (passwordLength > 128) || (!passwordLength))
  {
    errorFlag = true;
    //Recurssion
    passwordLength = getPasswordLength(errorFlag);
    return passwordLength;
  }

  //Valid input return
  return passwordLength;
};

//Retrieves password criteria from user
//Returns password criteria array or NULL array if none are selected
function getPasswordCriteria(){
  //Variable declaration
  let lowerCaseCharacters;
  let upperCaseCharacters;
  let numericCharacters;
  let specialCharacters;

  //Boolean prompt for usable characters
  numericCharacters = confirm("Do you want to include numeric characters? (Ok: Yes Cancel: No)")
  lowerCaseCharacters = confirm("Do you want to include lowercase characters? (Ok: Yes Cancel: No)")
  upperCaseCharacters = confirm("Do you want to include uppercase characters? (Ok: Yes Cancel: No)")
  specialCharacters = confirm("Do you want to include special characters? (Ok: Yes Cancel: No)")

  //Flag for checking if no characters were selected
  if((!numericCharacters) && (!lowerCaseCharacters) && (!upperCaseCharacters) && (!specialCharacters))
  {
    return null;
  }

  //Password criteria return
  return [numericCharacters, lowerCaseCharacters, upperCaseCharacters, specialCharacters];
};

//Random password generator
//Takes in password length and an array of the password criteria
//Returns randomly generated password
function createPassword(int, array){
  //Variable declaration
  const possibleCharacters=["0123456789", "abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", " !#$%&'()*+,-./:;<=>?@[\]^_`{|}~"];
  let usableCharacters = "";
  let password = "";

  //Defines usable characters from the password criteria array
  for(let i = 0; i < array.length; i++){
    if(array[i])
    {
      usableCharacters = usableCharacters.concat(possibleCharacters[i]);
    }
  }

  //Randomly generates password based on usable characters and specified length
  for(let i = 0; i < int; i++){
    password += usableCharacters.charAt(Math.floor(Math.random() * usableCharacters.length));
  }

  return password;
};

function writePassword(){
  //Variable declaration
  let passwordText = document.querySelector("#password");
  let password = "";
  let passwordLength;
  let passwordCriteria;

  //Flag to make sure a password length was provided
  passwordLength = getPasswordLength(false);
  if(passwordLength == null){
    alert("Please provide a password length and try again!");
    return;
  }

  //Flag to make sure at least one passoword criteria was provided
  passwordCriteria = getPasswordCriteria();
  if(passwordCriteria == null){
    alert("Please provide a at least one passoword criteria and try again!");
    return;
  }

  //Printing password to specified query
  password = createPassword(passwordLength, passwordCriteria);
  passwordText.value = password;
};

//----------------------------------------Function calls----------------------------------------
// Add event listener to generate button
generateButton.addEventListener("click", writePassword);
