
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
