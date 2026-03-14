document.addEventListener("DOMContentLoaded", function () {
    let guessedLetters = [];
    let remainingGuesses = 8; // Number of guesses remaining
    const guessButton = document.querySelector(".guess");
    const inputField = document.getElementById("letter");
    const message = document.querySelector(".message");
    const wordInProgress = document.querySelector(".word-in-progress");
    let word = "";
    const guessedLettersElement = document.querySelector(".guessed-letters");
    const remainingGuessesContainer = document.querySelector(".remaining");
    const playAgainButton = document.querySelector(".play-again");

    // Function to fetch a random word from the provided URL
    const getWord = async function() {
    const response = await fetch(
      "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
    );

    const words = await response.text();

    console.log(words);

    const wordArray = words.split("\n");
    console.log(wordArray);

    const randomIndex = Math.floor(Math.random() * wordArray.length);
    const randomWord = wordArray[randomIndex].trim();

    word = randomWord;

  hiddenWord();
};
// Function to update the display of guessed letters
const updateGuessedLetters = function() {
  guessedLettersElement.innerHTML = "";

  guessedLetters.forEach(function(letter) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  });
};

// Function to update the word in progress display based on guessed letters
const updateWordInProgress = function(guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");

  console.log(wordArray);

  const revealedWord = wordArray.map(function(letter) {
    if (guessedLetters.includes(letter)) {
      return letter;
    } else {
      return "●";
    }
  });

  wordInProgress.innerText = revealedWord.join(" ");
 
  checkIfPlayerWon();
};


    // Function to validate player input
    const validatePlayerInput = function(inputValue) {
        const acceptedLetter = /^[a-zA-Z]$/; // Regular expression to check for a valid letter

        if (inputValue === "") {
            return "Please enter a letter.";
        } else if (inputValue.length > 1) {
            return "Only one letter at a time!";
        } else if (!inputValue.match(acceptedLetter)) {
            return "Please enter a valid letter (A-Z).";
        } else {
            return ""; // Return an empty string if input is valid
        }
    };

    // Function to handle a player's guess
const makeGuess = function(letter) {
  const upperCaseLetter = letter.toUpperCase();

  if (guessedLetters.includes(upperCaseLetter)) {
    message.innerText = "You've already guessed that letter! Try a different one.";
  } else {
    guessedLetters.push(upperCaseLetter);
    console.log("Updated guessed letters:", guessedLetters);


  updateGuessedLetters();
  updateRemainingGuesses(upperCaseLetter);
  updateWordInProgress(guessedLetters);
  }

  console.log("Player guessed:", upperCaseLetter);
};
    // Function to handle a player's guess
    /* Non updated code kept for refernece 
    
    const makeGuess = function(letter) {
        const upperCaseLetter = letter.toUpperCase(); // Convert to uppercase for uniformity

        // Check if the letter has already been guessed
        if (guessedLetters.includes(upperCaseLetter)) {
            message.innerText = "You've already guessed that letter! Try a different one.";
        } else {
            guessedLetters.push(upperCaseLetter); // Add to guessedLetters if not guessed before
            console.log("Updated guessed letters:", guessedLetters);
            // Update the message with the new guess
            message.innerText = `You guessed: ${upperCaseLetter}`;
        }
        console.log("Player guessed:", upperCaseLetter); // Log the guessed letter
    };
    */

    // Function to display hidden word with circles (●)
    const hiddenWord = function() {
        wordInProgress.innerText = "●".repeat(word.length); // Display circles for each letter of the word
    };

    // Function to update remaining guesses and display messages
const updateRemainingGuesses = function(guess) {
  const wordUpper = word.toUpperCase();
  const guessesSpan = document.querySelector(".remaining span");

  if (!wordUpper.includes(guess)) {
    message.innerText = `Sorry, the word has no ${guess}.`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Good guess! The word has the letter ${guess}.`;
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `<p class="highlight">Game over! The word was ${wordUpper}</p>`;
    startOver();
  } else if (remainingGuesses === 1) {
    guessesSpan.innerText = `${remainingGuesses} guess`;
  } else {
    guessesSpan.innerText = `${remainingGuesses} guesses`;
  }
};

// Function to check if the player has won
    const checkIfPlayerWon = function() {
      const revealed = wordInProgress.innerText.split(" ").join("");

     if (revealed === word.toUpperCase()) {
    message.classList.add("win");
    message.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
    startOver();
  }
};
/* old function for reference if (wordInProgress.innerText === word.toUpperCase()) {
  message.classList.add("win");
  message.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
  startOver();
}
};*/

    // Function to start a new game
    const startOver = function() {
  guessButton.classList.add("hide");
  remainingGuessesContainer.classList.add("hide");
  guessedLettersElement.classList.add("hide");
  playAgainButton.classList.remove("hide");
};

// Event listener for the guess button
    guessButton.addEventListener("click", function(e) {
        e.preventDefault(); // Prevent form submission

        message.innerText = ""; // Clear previous messages

        const inputValue = inputField.value.trim(); // Trim any extra whitespace
        console.log("Input value:", inputValue);

        // Validate the input
        const validationMessage = validatePlayerInput(inputValue);
        console.log("Validation message:", validationMessage); 

        if (validationMessage) {
            message.innerText = validationMessage; // Show error message if validation fails
        } else {
            console.log("Valid input:", inputValue);
            makeGuess(inputValue); // Call makeGuess with the valid input
        }

        inputField.value = ""; // Clear the input field after each guess
    });

    playAgainButton.addEventListener("click", function() {
  message.classList.remove("win");
  message.innerText = "";

  guessedLetters = [];
  remainingGuesses = 8;

  guessedLettersElement.innerHTML = "";
  document.querySelector(".remaining span").innerText = `${remainingGuesses} guesses`;

  guessButton.classList.remove("hide");
  remainingGuessesContainer.classList.remove("hide");
  guessedLettersElement.classList.remove("hide");
  playAgainButton.classList.add("hide");

  getWord();
});
    getWord();    
    //hiddenWord(); // Initialize the word display with circles (●)
});