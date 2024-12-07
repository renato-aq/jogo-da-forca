const secretWord = "carolinne de jesus santos e santos".toLowerCase();
const wordDisplay = document.getElementById("word-display");
const message = document.getElementById("message");
const hangman = document.getElementById("hangman");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
const usedLettersDiv = document.getElementById("used-letters");

let guessedLetters = [];
let wrongGuesses = 0;

function displayWord() {
    wordDisplay.innerHTML = secretWord
        .split("")
        .map(letter =>
            letter === " " ? `<span class="space"> </span>` :
                guessedLetters.includes(letter) ? `<span>${letter}</span>` : `<span>_</span>`
        )
        .join("");
}

function updateHangman() {
    hangman.textContent = `Erros: ${wrongGuesses}/6`;
}

function updateUsedLetters() {
    usedLettersDiv.textContent = `Letras usadas: ${guessedLetters.join(", ")}`;
}

function checkWinOrLose() {
    if (!wordDisplay.textContent.includes("_")) {
        message.textContent = "Parabéns! Você venceu!";
        guessButton.disabled = true;
        guessInput.disabled = true;
    } else if (wrongGuesses >= 6) {
        message.textContent = "Você perdeu! A palavra era: " + secretWord;
        guessButton.disabled = true;
        guessInput.disabled = true;
    }
}

guessButton.addEventListener("click", () => {
    const guess = guessInput.value.toLowerCase();
    guessInput.value = "";
    if (!guess || guess.length !== 1 || guessedLetters.includes(guess)) {
        message.textContent = "Por favor, insira uma letra válida.";
        return;
    }

    guessedLetters.push(guess);
    if (secretWord.includes(guess)) {
        message.textContent = "Boa! Continue!";
    } else {
        message.textContent = "Errado! Tente novamente.";
        wrongGuesses++;
    }

    displayWord();
    updateHangman();
    updateUsedLetters();
    checkWinOrLose();
});

displayWord();
updateHangman();
