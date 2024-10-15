const commonWords = [
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "it",
    "you", "he", "will", "not", "this", "but", "from", "or", "which", "one",
    "would", "all", "said", "there", "use", "each", "the", "she", "do", "how",
    "their", "if", "we", "her", "she", "an", "my", "no", "out", "up",
    "other", "some", "could", "than", "then", "them", "these", "so", "say", "what",
    "about", "who", "get", "if", "would", "make", "like", "him", "into", "time",
    "has", "look", "more", "write", "go", "see", "number", "no", "way", "could",
    "people", "than", "first", "water", "been", "call", "who", "oil", "its", "now",
    "find", "long", "down", "day", "get", "come", "made", "may", "part", "take",
    "get", "work", "place", "such", "need", "feel", "three", "state", "never", "become",
    "between", "high", "really", "something", "most", "another", "much", "family", "own", "out",
    "leave", "put", "old", "while", "mean", "on", "keep", "student", "why", "let",
    "above", "know", "whether", "now", "the", "go", "only", "new", "get", "give",
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
let testStarted = false;
let currentPrompt = ""; // Current word to type

function getRandomWord() {
    const shuffledWords = commonWords.sort(() => 0.5 - Math.random());
    return shuffledWords[0]; // Get one random word
}

function startTest() {
    totalCharactersTyped = 0;
    correctWordsTyped = 0;
    document.getElementById('input').value = '';
    document.getElementById('results').textContent = 'WPM: 0, Accuracy: 0%'; // Reset results
    testStarted = true; // Mark that the test has started
    startTime = new Date();

    // Start the timer
    let timeLeft = 15;
    document.getElementById('timer').textContent = timeLeft; // Set initial countdown

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft; // Update timer display
        if (timeLeft <= 0) {
            endTest();
        }
    }, 1000);

    // Generate the first word prompt
    generateNewPrompt();
}

function generateNewPrompt() {
    currentPrompt = getRandomWord(); // Get a new random word
    document.getElementById('prompt').textContent = currentPrompt; // Display the word
    document.getElementById('prompt').style.color = 'gray'; // Set initial color
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
        document.getElementById('prompt').style.color = 'black'; // Change color to black on correct input
    } else {
        document.getElementById('prompt').style.color = 'red'; // Incorrect input
    }

    // Check if user has completed typing the current word
    if (inputText === currentPrompt) {
        correctWordsTyped++;
        this.value = ''; // Clear the input for the next word
        generateNewPrompt(); // Generate a new word prompt
        updateResults();
    }
});

function updateResults() {
    const timeElapsed = (new Date() - startTime) / 1000; // Time in seconds
    const minutesTaken = timeElapsed / 60; // Convert time taken to minutes
    const wpm = Math.round(totalCharactersTyped / 5 / minutesTaken); // WPM calculation
    const accuracy = Math.round((correctWordsTyped / (correctWordsTyped + 1)) * 100); // Accuracy calculation

    document.getElementById('results').textContent = `WPM: ${wpm}, Accuracy: ${accuracy}%`;
}

function endTest() {
    clearInterval(timerInterval); // Stop the timer
    const timeElapsed = (new Date() - startTime) / 1000; // Time taken in seconds
    const minutesTaken = timeElapsed / 60; // Convert time taken to minutes
    const wpm = Math.round(totalCharactersTyped / 5 / minutesTaken); // WPM calculation
    const accuracy = Math.round((correctWordsTyped / (correctWordsTyped + 1)) * 100); // Final accuracy calculation

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
    clearInterval(timerInterval); // Stop any existing timer
    testStarted = false; // Reset test state
    totalCharactersTyped = 0; // Reset character count
    correctWordsTyped = 0; // Reset correct word count
    document.getElementById('results').textContent = 'WPM: 0, Accuracy: 0%'; // Reset results
    document.getElementById('timer').textContent = '15'; // Reset timer
    document.getElementById('prompt').textContent = ''; // Clear prompt
    document.getElementById('input').value = ''; // Clear input
    currentPrompt = ""; // Clear the current prompt
    generateNewPrompt(); // Generate a new prompt for the new test
}
