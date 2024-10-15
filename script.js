const commonWords = [
    // (your list of words)
];

let startTime, timerInterval;
let totalCharactersTyped = 0;
let correctWordsTyped = 0;
let totalWordsTyped = 0; // Track total words typed
let testStarted = false;
let currentPrompt = "";

function getRandomWord() {
    const shuffledWords = commonWords.sort(() => 0.5 - Math.random());
    return shuffledWords[0]; // Get one random word
}

function startTest() {
    totalCharactersTyped = 0;
    correctWordsTyped = 0;
    totalWordsTyped = 0; // Reset total words
    document.getElementById('input').value = '';
    document.getElementById('results').textContent = 'WPM: 0, Accuracy: 0%';
    testStarted = true;
    startTime = new Date();

    let timeLeft = 15;
    document.getElementById('timer').textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 0) {
            endTest();
        }
    }, 1000);

    generateNewPrompt();
}

function generateNewPrompt() {
    currentPrompt = getRandomWord();
    document.getElementById('prompt').textContent = currentPrompt;
    document.getElementById('prompt').style.color = 'gray';
}

document.getElementById('input').addEventListener('input', function() {
    const inputText = this.value;
    totalCharactersTyped += inputText.length;

    if (!testStarted) {
        startTest();
    }

    if (currentPrompt.startsWith(inputText)) {
        document.getElementById('prompt').style.color = 'black';
    } else {
        document.getElementById('prompt').style.color = 'red';
    }

    if (inputText === currentPrompt) {
        correctWordsTyped++;
        totalWordsTyped++; // Increment total words typed
        this.value = ''; 
        generateNewPrompt();
        updateResults();
    }
});

function updateResults() {
    const timeElapsed = (new Date() - startTime) / 1000;
    const minutesTaken = timeElapsed / 60;
    const wpm = Math.round(totalCharactersTyped / 5 / minutesTaken);
    const accuracy = totalWordsTyped > 0 ? Math.round((correctWordsTyped / totalWordsTyped) * 100) : 0; // Updated accuracy calculation

    document.getElementById('results').textContent = `WPM: ${wpm}, Accuracy: ${accuracy}%`;
}

function endTest() {
    clearInterval(timerInterval);
    const timeElapsed = (new Date() - startTime) / 1000;
    const minutesTaken = timeElapsed / 60;
    const wpm = Math.round(totalCharactersTyped / 5 / minutesTaken);
    const accuracy = totalWordsTyped > 0 ? Math.round((correctWordsTyped / totalWordsTyped) * 100) : 0;

    document.getElementById('results').textContent = `Final WPM: ${wpm}, Final Accuracy: ${accuracy}%`;
}

document.addEventListener('DOMContentLoaded', () => {
    generateNewPrompt();
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        resetTest();
    }
});

function resetTest() {
    clearInterval(timerInterval);
    testStarted = false;
    totalCharactersTyped = 0;
    correctWordsTyped = 0;
    totalWordsTyped = 0; // Reset total words
    document.getElementById('results').textContent = 'WPM: 0, Accuracy: 0%';
    document.getElementById('timer').textContent = '15';
    document.getElementById('prompt').textContent = '';
    document.getElementById('input').value = '';
    currentPrompt = "";
    generateNewPrompt();
