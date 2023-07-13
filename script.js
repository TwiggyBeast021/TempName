// Initialize stats
let score = 0;
let level = 1;

// Get DOM elements
const scoreElement = document.getElementById("score");
const levelElement = document.getElementById("level");
const increaseScoreButton = document.getElementById("increaseScoreButton");
const increaseLevelButton = document.getElementById("increaseLevelButton");
const logList = document.getElementById("logList");
const progressBar = document.querySelector("#progressBar .progress");

// Handle encounter button click
increaseScoreButton.addEventListener("click", function() {
    increaseStat("score", 1);
});

increaseLevelButton.addEventListener("click", function() {
    increaseStat("level", 1);
});

// Function to increase stats
function increaseStat(stat, amount) {
    const interval = setInterval(function() {
        if (score >= amount) {
            clearInterval(interval);
            score -= amount;
            level = Math.floor(score / 10) + 1;
            updateStats();
        }
    }, 1000);

    progressBar.style.width = "0%";
    progressBar.style.transition = "width " + amount + "s";

    setTimeout(function() {
        progressBar.style.width = "100%";
    }, 100);

    setTimeout(function() {
        clearInterval(interval);
        updateStats();
    }, amount * 1000);
}

// Update stats and log
function updateStats() {
    scoreElement.textContent = "Score: " + Math.round(score);
    levelElement.textContent = "Level: " + Math.round(level);
    logList.innerHTML += "<li>Score increased to " + Math.round(score) + ", Level increased to " + Math.round(level) + "</li>";
}
