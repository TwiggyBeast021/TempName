// Game state
let playerStats = {
  level: 1,
  experience: 0,
  maxHealth: 100,
  currentHealth: 100,
  constitution: 10,
  strength: 5,
  intelligence: 8,
  speed: 6
};

let encounters = [
  { name: "Goblin", experience: 20, health: 30, attack: 10, loot: { gold: 10 } },
  { name: "Skeleton", experience: 30, health: 40, attack: 15, loot: { gold: 20, item: "Sword" } },
  { name: "Orc", experience: 40, health: 50, attack: 20, loot: { gold: 30, item: "Armor" } }
];

let skills = {
  skill1: { name: "Skill 1", level: 1, description: "Increases attack power" },
  skill2: { name: "Skill 2", level: 1, description: "Increases defense" },
  skill3: { name: "Skill 3", level: 1, description: "Restores health" }
};

let inventory = [];

// Function to update player stats
function updateStats() {
  document.getElementById("level").textContent = playerStats.level;
  document.getElementById("experience").textContent = playerStats.experience;
  document.getElementById("health").textContent = playerStats.currentHealth;
  document.getElementById("constitution").textContent = playerStats.constitution;
  document.getElementById("strength").textContent = playerStats.strength;
  document.getElementById("intelligence").textContent = playerStats.intelligence;
  document.getElementById("speed").textContent = playerStats.speed;
  document.getElementById("skill1-level").textContent = skills.skill1.level;
  document.getElementById("skill2-level").textContent = skills.skill2.level;
  document.getElementById("skill3-level").textContent = skills.skill3.level;
}

// Function to open a specific tab
function openTab(tabName) {
  const tabButtons = document.getElementsByClassName("tab-button");
  const tabs = document.getElementsByClassName("tab");

  // Hide all tabs and deactivate tab buttons
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
    tabButtons[i].classList.remove("active");
  }

  // Show the selected tab and activate its button
  document.getElementById(tabName).classList.add("active");
  document.querySelector(`button[data-tab="${tabName}"]`).classList.add("active");
}

// Function to handle encounters
function encounter() {
  const encounterIndex = Math.floor(Math.random() * encounters.length);
  const encounter = encounters[encounterIndex];

  // Battle the encounter
  battle(encounter);
}

// Function to handle battles
function battle(enemy) {
  const playerAttack = Math.floor(Math.random() * playerStats.strength);
  const enemyAttack = Math.floor(Math.random() * enemy.attack);

  // Deduct health based on attack damage
  playerStats.currentHealth -= enemy.attack;
  enemy.health -= playerAttack;

  // Check if the player or enemy is defeated
  if (playerStats.currentHealth <= 0) {
    gameOver();
    return;
  }

  if (enemy.health <= 0) {
    victory(enemy);
    return;
  }

  // Log the battle outcome
  const log = document.getElementById("log");
  log.value += `You attack the ${enemy.name} for ${playerAttack} damage. The ${enemy.name} attacks you for ${enemy.attack} damage.\n`;
  log.scrollTop = log.scrollHeight;
}

// Function to handle victory
function victory(enemy) {
  playerStats.experience += enemy.experience;

  // Check if the player leveled up
  if (playerStats.experience >= 100) {
    levelUp();
  }

  // Grant loot rewards
  if (enemy.loot) {
    if (enemy.loot.gold) {
      // Grant gold
      log.value += `You find ${enemy.loot.gold} gold.\n`;
      // TODO: Add gold to player's inventory or currency
    }
    if (enemy.loot.item) {
      // Grant item
      log.value += `You find a ${enemy.loot.item}.\n`;
      inventory.push(enemy.loot.item);
      // Update inventory display
      updateInventory();
    }
  }

  // Log the victory
  const log = document.getElementById("log");
  log.value += `You defeat the ${enemy.name}! You gain ${enemy.experience} experience.\n`;
  log.scrollTop = log.scrollHeight;
}

// Function to handle level up
function levelUp() {
  playerStats.level++;
  playerStats.maxHealth += 10;
  playerStats.currentHealth = playerStats.maxHealth;
  playerStats.experience = 0;

  // Log the level up
  const log = document.getElementById("log");
  log.value += `Congratulations! You reached level ${playerStats.level}.\n`;
  log.scrollTop = log.scrollHeight;

  // Update player stats display
  updateStats();
}

// Function to upgrade a skill
function upgradeSkill(skillName) {
  const skill = skills[skillName];
  skill.level++;

  // Log the skill upgrade
  const log = document.getElementById("log");
  log.value += `You upgraded ${skill.name} to level ${skill.level}.\n`;
  log.scrollTop = log.scrollHeight;

  // Update player stats or perform other skill-related actions

  // Update player stats display
  updateStats();
}

// Function to update inventory display
function updateInventory() {
  const itemList = document.getElementById("item-list");
  itemList.innerHTML = "";

  for (let i = 0; i < inventory.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = inventory[i];
    itemList.appendChild(listItem);
  }
}

// Function to handle game over
function gameOver() {
  // Log the game over
  const log = document.getElementById("log");
  log.value += "Game Over! You have been defeated.\n";
  log.scrollTop = log.scrollHeight;

  // Disable encounter button
  document.querySelector("#explore button").disabled = true;
}

// Initialize the game
updateStats();
openTab("explore");
