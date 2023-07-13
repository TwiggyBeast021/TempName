// Game state
let playerStats = {
  level: 1,
  experience: 0,
  experienceNeeded: 100,
  maxHealth: 100,
  currentHealth: 100,
  constitution: 10,
  strength: 5,
  intelligence: 8,
  speed: 6
};

let encounters = [
  { name: "Goblin", experience: 5, health: 20, attack: 8, loot: { gold: 10 } },
  { name: "Skeleton", experience: 10, health: 30, attack: 12, loot: { gold: 20, item: "Sword" } },
  { name: "Orc", experience: 15, health: 40, attack: 16, loot: { gold: 30, item: "Armor" } },
  { name: "Dragon", experience: 20, health: 50, attack: 20, loot: { gold: 50, item: "Fire Breath" } }
];

let skills = {
  skill1: { name: "Skill 1", level: 1, experience: 0, experienceNeeded: 50, description: "Increases attack power" },
  skill2: { name: "Skill 2", level: 1, experience: 0, experienceNeeded: 50, description: "Increases defense" },
  skill3: { name: "Skill 3", level: 1, experience: 0, experienceNeeded: 50, description: "Restores health" }
};

let inventory = [];

// Function to update player stats
function updateStats() {
  document.getElementById("level").textContent = playerStats.level;
  document.getElementById("experience").textContent = playerStats.experience;
  document.getElementById("experience-needed").textContent = playerStats.experienceNeeded;
  document.getElementById("health").textContent = playerStats.maxHealth;
  document.getElementById("constitution").textContent = playerStats.constitution;
  document.getElementById("strength").textContent = playerStats.strength;
  document.getElementById("intelligence").textContent = playerStats.intelligence;
  document.getElementById("speed").textContent = playerStats.speed;
  document.getElementById("skill1-level").textContent = skills.skill1.level;
  document.getElementById("skill2-level").textContent = skills.skill2.level;
  document.getElementById("skill3-level").textContent = skills.skill3.level;
  document.getElementById("skill1-experience").textContent = skills.skill1.experience;
  document.getElementById("skill2-experience").textContent = skills.skill2.experience;
  document.getElementById("skill3-experience").textContent = skills.skill3.experience;
  document.getElementById("skill1-experience-needed").textContent = skills.skill1.experienceNeeded;
  document.getElementById("skill2-experience-needed").textContent = skills.skill2.experienceNeeded;
  document.getElementById("skill3-experience-needed").textContent = skills.skill3.experienceNeeded;

  // Update experience bar
  const experienceBar = document.getElementById("experience-bar");
  const experiencePercentage = (playerStats.experience / playerStats.experienceNeeded) * 100;
  experienceBar.style.width = `${experiencePercentage}%`;

  // Update health bar
  const healthBar = document.getElementById("health-bar");
  const healthPercentage = (playerStats.currentHealth / playerStats.maxHealth) * 100;
  healthBar.style.width = `${healthPercentage}%`;

  // Update current health and max health display in explore tab
  document.getElementById("current-health").textContent = playerStats.currentHealth;
  document.getElementById("max-health").textContent = playerStats.maxHealth;
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
    passOut();
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
  if (playerStats.experience >= playerStats.experienceNeeded) {
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

  // Update player stats display
  updateStats();
}

// Function to handle passing out
function passOut() {
  playerStats.currentHealth = playerStats.maxHealth * 0.5; // Reset health to half of max
  playerStats.experience = Math.floor(playerStats.experience * 0.5); // Lose half of experience

  // Log passing out
  const log = document.getElementById("log");
  log.value += "You pass out and wake up with reduced health and experience.\n";
  log.scrollTop = log.scrollHeight;

  // Update player stats display
  updateStats();
}

// Function to handle level up
function levelUp() {
  playerStats.level++;
  playerStats.experience = 0;
  playerStats.experienceNeeded *= 1.5; // Increase experience requirement

  // Increase player's stats upon leveling up
  playerStats.constitution += 2;
  playerStats.strength += 1;
  playerStats.intelligence += 1;
  playerStats.speed += 1;

  // Increase skill experience requirements
  skills.skill1.experienceNeeded *= 1.5;
  skills.skill2.experienceNeeded *= 1.5;
  skills.skill3.experienceNeeded *= 1.5;

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
  skill.experience += 10;

  // Check if the skill has reached the required experience for the next level
  if (skill.experience >= skill.experienceNeeded) {
    skill.level++;
    skill.experience = 0;
    skill.experienceNeeded *= 1.5;

    // Log the skill upgrade
    const log = document.getElementById("log");
    log.value += `You upgraded ${skill.name} to level ${skill.level}.\n`;
    log.scrollTop = log.scrollHeight;
  }

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
