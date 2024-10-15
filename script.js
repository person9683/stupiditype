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

let startTime, endTime;
let currentPrompt = '';

function getRandomWords(numWords) {
    const shuffledWords = commonWords.sort(() => 0.5 - Math.random());
    return shuffledWords.slice(0, numWords).join(' ');
}

function startTest() {
    currentPrompt = getRandomWords(10); // Change 10 to the desired number of words
    document.getElementById('prompt').textContent = currentPrompt;
    document.getElementById('input').value = '';
    document.getElementById('results').textContent = ''; // Clear results
    startTime = new Date();
}

document.getElementById('input').addEventListener('input', function() {
    const inputText = this.value;

    // Check if input matches the prompt
    if (currentPrompt.startsWith(inputText)) {
        document.getElementById('prompt').style.color = 'green'; // Correct input
    } else {
        document.getElementById('prompt').style.color = 'red'; // Incorrect input
    }

    // Check if user has completed typing
    if (inputText === currentPrompt) {
        endTest();
    }
});

function endTest() {
    endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000; // Time taken in seconds
    const charactersTyped = document.getElementById('input').value.length; // Total characters typed

    const minutesTaken = timeTaken / 60; // Convert time taken to minutes
    const wpm = Math.round(charactersTyped / 5 / minutesTaken); // WPM calculation
    const accuracy = Math.round((charactersTyped / currentPrompt.length) * 100); // Accuracy calculation

    document.getElementById('results').textContent = `WPM: ${wpm}, Accuracy: ${accuracy}%`;
}

// Start the test when the page loads
startTest();
