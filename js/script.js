

document.addEventListener("DOMContentLoaded", function () {
    const guessedLetters = document.querySelector("ul");
    const guessButton = document.querySelector(".guess");
    const inputField = document.getElementById("letter");

    // Add event listener to the guess button
    guessButton.addEventListener("click", function(e) {
        // Log that the button was clicked
        console.log("Guess button clicked!");

        // Capture the value of the input field
        const inputValue = inputField.value;
        console.log("Input value:", inputValue);

        // Clear the input field
        inputField.value = "";

        // Prevent the form from submitting
        e.preventDefault();
    });

    const guessForm = document.getElementById("guess-form");
    const wordInProgress = document.getElementById("word-in-progress");
    const remaining = document.getElementById("remaining");
    const span = document.getElementById("span");
    const message = document.getElementById("message");
    const playItAgain = document.getElementById("play-it-again");
    const word = "magnolia";

    // Function to display circles for the word
    const hiddenWord = function() {
        wordInProgress.innerText = "●".repeat(word.length);
    };

    hiddenWord();
});