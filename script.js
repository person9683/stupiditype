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

function getRandomWords(numWords) {
    const shuffledWords = commonWords.sort(() => 0.5 - Math.random());
    return shuffledWords.slice(0, numWords).join(' ');
}

function startTest() {
    const promptText = getRandomWords(10); // Adjust the number as needed
    document.getElementById('prompt').textContent = promptText;
    document.getElementById('input').value = '';
    startTime = new Date();
}

document.getElementById('input').addEventListener('input', function() {
    const inputText = this.value;
    // Logic for checking input against prompt and calculating WPM
});

function endTest() {
    endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000; // in seconds
    // Calculate WPM and accuracy
}

startTest();
