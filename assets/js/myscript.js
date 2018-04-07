/*
Main jscode will be here.
This is a word guess game writting in HTML, CSS, JavaScript, and Bootstrap
There will be several other variables that we need to declare.
Variables that need to be declared.
1) The will be an array of length ? of the bones I choose. Possible to make it an object to contain additional information about
the bone.
2) A listener, to start the game and know the state of each key press event.
3) An input of what the user has entered. May be able to resuse the listener.
4) An array to contain what letters the user already has entered.
5) A counter to minus minus with each unsuccessful guess.

Functions 
1) One can include a check to see if the letter chosen is in the guess
2) Function to re-write the puzzle section
3) Function to pop the letters used 
4) Function to minus the counter
5) Function to move all to lower case
6) Function to check if user input is a letter
*/

// Global variables. Research objects. Maybe add additional information about the correct bone when the user wins?
let wordBank = ["nasal", 
        "lacrimal", 
        "maxiallary", 
        "zygomatic", 
        "temporal", 
        "palatine", 
        "parietal", 
        "femur", 
        "malleus", 
        "incus", 
        "stapes", 
        "tibia", 
        "ulna",
        "radius",
        "humerus",
        "mandible",
        "sacrum",
        "phalanges",
        "metacarpals",
        "funny"];
// My research shows that const is the best practice for the use of the maxTries letiable.
const maxTries = 10;
let guessedLetters = [];
let currentWordIndex;
let guessingWord = [];
let remainingGuesses = 0;       // Lives
let hasFinished = false;        // Flag    
let wins = 0;                   // Set Wins to Zero
let losses = 0;                 // Set Losses to Zero

// This function is needed upon start of the game and upon either meeting a Game Win or Game Lose condition
function resetGame() {
remainingGuesses = maxTries;
document.getElementById("startMsg").innerText = "Press any letter to play.";
currentWordIndex = Math.floor(Math.random() * (wordBank.length));
guessedLetters = [];
guessingWord = [];
for (let i = 0; i < wordBank[currentWordIndex].length; i++) {
guessingWord.push("_");
}
updateGameContent();
};

// This function is needed to send to the html the updates and status of where we are in the game instance.
function updateGameContent() {

document.getElementById("winCount").innerText = wins;
document.getElementById("lossCount").innerText = losses;
let guessingWordText = "";
for (let i = 0; i < guessingWord.length; i++) {
guessingWordText += guessingWord[i];
}

console.log("CurrentWord:", guessingWordText);
console.log("GuessingWord:", guessingWord);
console.log("CurrentWordIndex:", currentWordIndex);
console.log("Bone:", wordBank[currentWordIndex]);
document.getElementById("currentWord").innerText = guessingWordText;
document.getElementById("remainingChances").innerText = remainingGuesses;
document.getElementById("usedLetters").innerText = guessedLetters;
};

// This function is called from within another function, letterPress(). It loops throught
// the length of the word to test all instances of the existing letter in the wordbank[n].
// I think this is the only way to say capture letters that repeat in the word such as the 'l' in malleus.
function evaluateGuess(letter) {
// Array to store strArray of letters in string
let strArray = [];
console.log("Current Word Index :", currentWordIndex);
// Loop through word finding all instances of guessed letter, store value in an array.
for (let i = 0; i < wordBank[currentWordIndex].length; i++) {
if (wordBank[currentWordIndex][i] === letter) {
    strArray.push(i);
}
}

if (strArray.length <= 0) {
remainingGuesses--;
} else {
for (let i = 0; i < strArray.length; i++) {
    guessingWord[strArray[i]] = letter;
}
}
};
/*Following pair of functions are called firstly upon a keydown event and lastly after letter
evaluation logic has completed*/
function checkWin() {
if (guessingWord.indexOf("_") === -1) {
wins++;
hasFinished = true;
document.getElementById("startMsg").innerText = "Congratulations!";
}
}; 


function checkLoss() {
if (remainingGuesses <= 0) {
hasFinished = true;
losses++;
document.getElementById("startMsg").innerText = "Sorry you lose!";
}
}

// Makes a guess
function letterPress(letter) {
if (remainingGuesses > 0) {
// Make sure we didn't use this letter yet
if (guessedLetters.indexOf(letter) === -1) {
    guessedLetters.push(letter);
    evaluateGuess(letter);
}
}

};

// Event listener
document.onkeydown = function (event) {
// If we finished a game, dump one keystroke and reset.
if (hasFinished) {
resetGame();
hasFinished = false;
} else {
// Check to make sure a-z was pressed.
if (event.keyCode >= 65 && event.keyCode <= 90) {
    letterPress(event.key.toLowerCase());
    updateGameContent();
    checkWin();
    checkLoss();
}
}
};    