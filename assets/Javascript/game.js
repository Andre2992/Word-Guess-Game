//grab reference to DOM elements
var $newGameButton = document.getElementById("new-game-button");
var $placeholders = document.getElementById("placeholders");
var $guessedLetters = document.getElementById("guessed-letters");
var guessesLeft = document.getElementById("guesses-left");
var $wins = document.getElementById("wins");
var $losses = document.getElementById("losses");
//Create variables for game: wordbank' wins, losses' picked word, guesses left, games running, picked word placeholder, guessed letter bank, incorrect letter bank
var wordBank = ["Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Bobcats", "Chicago Bulls", "Cleveland Cavaliers",
    "Dallas Mavericks", "Denver Nuggets", "Detroit Pistons", "GoldenState Warriors", "Houston Rockets",
    "Indiana Pacers", "LA Clippers", "LA Lakers", "Memphis Grizzlies", "Miami Heat", "Milwaukee Bucks",
    "Minnesota Timberwolves", "New Orleans Pelicans", "New York Knicks", "Oklahoma City Thunder", "Orlando Magic",
    "Philadelphia Sixers", "Phoenix Suns", "Portland Trail Blazers", "Sacramento Kings", "San Antonio Spurs",
    "Toronto Raptors", "Utah Jazz", "Washington Wizards"];
var wins = 0;
var losses = 0
var guessesLeft = 10;
var gameRunning = false;
var pickedWord = "";
var pickedWordPlaceholderArray = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];
//newGame function to reset all stats, pick new word and creat placeholders
function newGame() {
    //reset all game info
    gameRunning = true;
    guessesLeft = 10;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceholderArray = [];

    //Pick a new word
    pickedWord = wordBank[Math.floor(Math.random() + wordBank.length)];

    //Create placeholders out of new pickedWord..for, if, else loop
    for (var i = 0; i < pickedWord.length; i++) {
        if (pickedWord[i]) === " ") {
            pickedWordPlaceholderArray.push(" ");
        } else {
            pickedWordPlaceholderArray.push("_");
        }
    }
    //Write all new game info to the DOM
    $guessesLeft.textContent = guessesLeft
    $placeholders.textContent = pickedWordPlaceholderArray.join("");
    $guessedLetters.textContent = incorrectLetterBank;
    //letterGuess function, takes in the letter you pressed and sees if it's in the selected word
    function letterGuess(letter) {
        console.log(letter);

        if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1) {
            //run game logic
            guessedLetterBank.push(letter);

            //check if guessesd letter is in my word
            for (var i = 0; i < pickedWord.length; i++) {
                //convert both values to lower case so I can compare correctly
                if (pickedWord[i].toLowerCase[] === letter.toLowerCase()) {
                    //If a match,swap out that character in the placeholder with actual letter
                    pickedWordPlaceholderArray[i] = pickedWord[i];
                }
            }
            $placeholders.textContent = pickedWordPlaceholderArray.join("");
        }
        else {
            if (gameRunning === false) {
                alert("This game isn't running, click New Game!");
            } else {
                alert("You've already guessed this letter, please try another!");
            }
        }
    }
    //checkIncorrect(letters)
    function checkIncorrect(letter) {
        if (pickedWordPlaceholderArray.indexOf(letter.toLowerCase()) === -1 &&
            pickedWordPlaceholderArray.indexOf(letter.toUpperCase()) === -1)
            guessesLeft--;
        incorrectLetterBank.push(letter);
        $guessedLetters.textContent = incorrectLetterBank.join(" ");
        guessesLeft.textContent = guessesLeft;
    }
}

//checklose
function checkLoss() {
    if (guessesLeft === 0) {
        losses++;
        gameRunning = false;
        $losses.textContent = losses;
        $placeholders.textContent=pickedWord;
    }
    checkWin();
}

//checkwin
function checkWin() {
    if (pickedWord.toLocaleLowerCase() === pickedWordPlaceholderArray.join("").toLowerCase()) {
        wins++;
        gameRunning = false;
        $wins.textContent = wins;
    }
}
//add event listener for new game button
$newGameButton.addEventListener("click", newGame);

//Add onkeyup event to trigger letterGuess
document.onkeyup = function (event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterGuess(event.key);
    }
}
