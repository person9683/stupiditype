const commonWords = [
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "it",
    "you", "he", "will", "not", "this", "but", "from", "or", "which", "one",
    "would", "all", "said", "there", "use", "each", "she", "do", "how",
    "their", "if", "we", "her", "an", "my", "no", "out", "up",
    "other", "some", "could", "than", "then", "them", "these", "so", "say", "what",
    "about", "who", "get", "if", "would", "make", "like", "him", "into", "time",
    "has", "look", "more", "write", "go", "see", "number", "way", "could",
    "people", "than", "first", "water", "been", "call", "who", "oil", "its", "now",
    "find", "long", "down", "day", "get", "come", "made", "may", "part", "take",
    "work", "place", "such", "need", "feel", "three", "state", "never", "become",
    "between", "high", "really", "something", "most", "another", "much", "family", "own", "out",
    "leave", "put", "old", "while", "mean", "on", "keep", "student", "why", "let",
    "above", "know", "whether", "now", "go", "only", "new", "get", "give",
    "know", "need", "make", "different", "two", "very", "come", "still", "over", "use",
    "through", "after", "without", "down", "under", "work", "life", "back", "few", "home",
    "big", "hand", "off", "end", "around", "right", "small", "place", "long", "year",
    "study", "system", "take", "number", "need", "live", "start", "school", "tell", "always",
    "together", "next", "keep", "think", "feel", "part", "number", "call", "work", "family",
    "just", "saw", "second", "young", "four", "light", "same", "eye", "head", "water",
    "give", "three", "man", "woman", "well", "tell", "let", "try", "course", "area"
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
}

function generateNewPrompt() {
    currentPrompt = getRandomWord();
    document.getElementById('prompt').textContent = currentPrompt;
    document.getElementById('prompt').style.color = 'gray';
}

document.getElementById('input').addEventListener('input', function() {
    const inputText = this.value;
    totalCharactersTyped += inputText.length;

    // Start the test on the first input
    if (!testStarted) {
        startTest(); // Start the test
    }

    // Check if the input matches the current prompt
    if (currentPrompt.startsWith(inputText)) {
        document.getElementById('prompt').style.color = 'black';
    } else {
        document.getElementById('prompt').style.color = 'red';
    }

    // Check if user has completed typing the current word
    if (inputText === currentPrompt) {
        correctWordsTyped++;
        totalWordsTyped++; // Increment total words typed
        this.value = ''; // Clear the input for the next word
        generateNewPrompt(); // Generate a new word prompt
        updateResults();
    }
});

function updateResults() {
    const timeElapsed = (new Date() - startTime) / 1000;
    const minutesTaken = timeElapsed / 60;
    const wpm = Math.round(totalCharactersTyped / 5 / minutesTaken);
    const accuracy = totalWordsTyped > 0 ? Math.round((correctWordsTyped / totalWordsTyped) * 100) : 0;

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

// Initial setup to display the first word
document.addEventListener('DOMContentLoaded', () => {
    generateNewPrompt(); // Display initial prompt when the page loads
});

// Listen for the Escape key to start a new test
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
    generateNewPrompt(); // Generate a new prompt for the new test
}
