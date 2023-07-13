// Initialize stats
let score = 0;
let level = 1;

// Get DOM elements
const scoreElement = document.getElementById("score");
const levelElement = document.getElementById("level");
const encounterButton = document.getElementById("encounter");

// Handle encounter button click
encounterButton.addEventListener("click", function() {
    // Generate a random encounter value
    const encounterValue = Math.floor(Math.random() * 10) + 1;
    
    // Update score and level
    score += encounterValue;
    level = Math.floor(score / 10) + 1;
    
    // Update DOM elements
    scoreElement.textContent = "Score: " + score;
    levelElement.textContent = "Level: " + level;
});
