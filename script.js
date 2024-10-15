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
let currentWords = []; // Array to hold the current 10 words
let typedWords = []; // Array to hold the correctly typed words
let currentInput = ""; // Track the current input

function getRandomWords(count) {
    const shuffledWords = commonWords.sort(() => 0.5 - Math.random());
    return shuffledWords.slice(0, count); // Get 'count' random words
}

function startTest() {
    totalCharactersTyped = 0;
    correctWordsTyped = 0;
    totalWordsTyped = 0; // Reset total words
    currentInput = ""; // Reset current input
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

    generateNewWords(); // Generate initial set of words
}

function generateNewWords() {
    currentWords = getRandomWords(10); // Get 10 random words
    updatePromptDisplay(); // Display the words
}

function updatePromptDisplay() {
    const promptText = currentWords.join(' ');
    const typedText = typedWords.join(' ');
    document.getElementById('prompt').innerHTML = `<span style="color: gray;">${promptText}</span><br/><span style="color: green;">${typedText}</span>`;
}

document.addEventListener('keydown', function(event) {
    // Start the test on the first key press
    if (!testStarted) {
        startTest();
    }

    // Check if the user pressed the space key
    if (event.key === ' ') {
        event.preventDefault(); // Prevent default space action

        if (currentInput.length > 0) {
            const currentWord = currentWords[0];

            // Check if the current input matches the current word
            if (currentInput === currentWord) {
                correctWordsTyped++;
                totalWordsTyped++; // Increment total words typed
                typedWords.push(currentWord); // Add the correctly typed word to the list
                currentWords.shift(); // Remove the typed word

                currentInput = ""; // Reset current input
                if (currentWords.length === 0) {
                    generateNewWords(); // Generate a new set of words if all are typed
                }
                updatePromptDisplay(); // Update the display
                updateResults(); // Update results after typing
            }
        }
    } else if (event.key.length === 1) { // Check if the key pressed is a character
        currentInput += event.key; // Add character to current input
    }
});

// Handle input for the first word
document.addEventListener('keydown', function(event) {
    // Start the test on the first key press
    if (!testStarted) {
        startTest();
    }
});

// Update results function
function updateResults() {
    const timeElapsed = (new Date() - startTime) / 1000;
    const minutesTaken = timeElapsed / 60;
    const wpm = Math.round((totalWordsTyped / minutesTaken)); // Calculate WPM based on words typed
    const accuracy = totalWordsTyped > 0 ? Math.round((correctWordsTyped / totalWordsTyped) * 100) : 0;

    document.getElementById('results').textContent = `WPM: ${wpm}, Accuracy: ${accuracy}%`;
}

function endTest() {
    clearInterval(timerInterval);
    const timeElapsed = (new Date() - startTime) / 1000;
    const minutesTaken = timeElapsed / 60;
    const wpm = Math.round((totalWordsTyped / minutesTaken)); // Calculate WPM based on words typed
    const accuracy = totalWordsTyped > 0 ? Math.round((correctWordsTyped / totalWordsTyped) * 100) : 0;

    document.getElementById('results').textContent = `Final WPM: ${wpm}, Final Accuracy: ${accuracy}%`;
}

// Initial setup to display the first set of words
document.addEventListener('DOMContentLoaded', () => {
    generateNewWords(); // Display initial words when the page loads
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
    currentInput = ""; // Reset current input
    document.getElementById('results').textContent = 'WPM: 0, Accuracy: 0%';
    document.getElementById('timer').textContent = '15';
    document.getElementById('prompt').textContent = '';
    currentWords = [];
    typedWords = []; // Reset typed words
    generateNewWords(); // Generate a new set of words for the new test
}
