// Initialize stats
let score = 0;
let level = 1;
let constitution = 0;
let strength = 0;
let speed = 0;
let perception = 0;
let charisma = 0;
let intelligence = 0;
let isActionInProgress = false;

// Get DOM elements
const scoreElement = document.getElementById("score");
const levelElement = document.getElementById("level");
const constitutionElement = document.getElementById("constitution");
const strengthElement = document.getElementById("strength");
const speedElement = document.getElementById("speed");
const perceptionElement = document.getElementById("perception");
const charismaElement = document.getElementById("charisma");
const intelligenceElement = document.getElementById("intelligence");
const increaseScoreButton = document.getElementById("increaseScoreButton");
const increaseLevelButton = document.getElementById("increaseLevelButton");
const increaseConstitutionButton = document.getElementById("increaseConstitutionButton");
const increaseStrengthButton = document.getElementById("increaseStrengthButton");
const increaseSpeedButton = document.getElementById("increaseSpeedButton");
const increasePerceptionButton = document.getElementById("increasePerceptionButton");
const increaseCharismaButton = document.getElementById("increaseCharismaButton");
const increaseIntelligenceButton = document.getElementById("increaseIntelligenceButton");
const logList = document.getElementById("logList");
const progressBar = document.querySelector("#progressBar .progress");

// Handle increase score button click
increaseScoreButton.addEventListener("click", function() {
  if (!isActionInProgress) {
    isActionInProgress = true;
    increaseStat("score", 1);
  }
});

// Handle increase level button click
increaseLevelButton.addEventListener("click", function() {
  if (!isActionInProgress) {
    isActionInProgress = true;
    increaseStat("level", 1);
  }
});

// Handle increase constitution button click
increaseConstitutionButton.addEventListener("click", function() {
  if (!isActionInProgress) {
    isActionInProgress = true;
    increaseStat("constitution", 1);
  }
});

// Handle increase strength button click
increaseStrengthButton.addEventListener("click", function() {
  if (!isActionInProgress) {
    isActionInProgress = true;
    increaseStat("strength", 1);
  }
});

// Handle increase speed button click
increaseSpeedButton.addEventListener("click", function() {
  if (!isActionInProgress) {
    isActionInProgress = true;
    increaseStat("speed", 1);
  }
});

// Handle increase perception button click
increasePerceptionButton.addEventListener("click", function() {
  if (!isActionInProgress) {
    isActionInProgress = true;
    increaseStat("perception", 1);
  }
});

// Handle increase charisma button click
increaseCharismaButton.addEventListener("click", function() {
  if (!isActionInProgress) {
    isActionInProgress = true;
    increaseStat("charisma", 1);
  }
});

// Handle increase intelligence button click
increaseIntelligenceButton.addEventListener("click", function() {
  if (!isActionInProgress) {
    isActionInProgress = true;
    increaseStat("intelligence", 1);
  }
});

// Function to increase stats
function increaseStat(stat, amount) {
  const interval = setInterval(function() {
    if (amount <= 0) {
      clearInterval(interval);
      isActionInProgress = false;
      updateStats();
    } else {
      switch (stat) {
        case "score":
          score += 1;
          break;
        case "level":
          level += 1;
          break;
        case "constitution":
          constitution += 1;
          break;
        case "strength":
          strength += 1;
          break;
        case "speed":
          speed += 1;
          break;
        case "perception":
          perception += 1;
          break;
        case "charisma":
          charisma += 1;
          break;
        case "intelligence":
          intelligence += 1;
          break;
      }
      amount--;
    }
  }, 1000);

  progressBar.style.width = "0%";
  progressBar.style.transition = "width " + amount + "s";

  setTimeout(function() {
    progressBar.style.width = "100%";
  }, 100);

  setTimeout(function() {
    clearInterval(interval);
    isActionInProgress = false;
    updateStats();
  }, amount * 1000);
}

// Update stats and log
function updateStats() {
  scoreElement.textContent = "Score: " + Math.round(score);
  levelElement.textContent = "Level: " + Math.round(level);
  constitutionElement.textContent = "Constitution: " + Math.round(constitution);
  strengthElement.textContent = "Strength: " + Math.round(strength);
  speedElement.textContent = "Speed: " + Math.round(speed);
  perceptionElement.textContent = "Perception: " + Math.round(perception);
  charismaElement.textContent = "Charisma: " + Math.round(charisma);
  intelligenceElement.textContent = "Intelligence: " + Math.round(intelligence);
  logList.innerHTML += `<li>Stats updated</li>`;
}
