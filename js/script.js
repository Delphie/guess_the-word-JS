document.addEventListener("DOMContentLoaded", function () {
    let guessedLetters = [];
    const guessButton = document.querySelector(".guess");
    const inputField = document.getElementById("letter");
    const message = document.getElementById("message");
    const wordInProgress = document.getElementById("word-in-progress");
    const word = "magnolia"; // The word to guess

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

    // Function to display hidden word with circles (●)
    const hiddenWord = function() {
        wordInProgress.innerText = "●".repeat(word.length); // Display circles for each letter of the word
    };

    // Event listener for Guess button
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

    hiddenWord(); // Initialize the word display with circles (●)
});