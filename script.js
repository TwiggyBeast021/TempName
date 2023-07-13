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

let skills = {
  skill1: { name: "Power Strike", level: 1, experience: 0, experienceNeeded: 50, description: "Increases attack power" },
  skill2: { name: "Defensive Stance", level: 1, experience: 0, experienceNeeded: 50, description: "Increases defense" },
  skill3: { name: "Healing Touch", level: 1, experience: 0, experienceNeeded: 50, description: "Restores health" }
};

let inventory = [];

let currentEnemy = null;

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

  // Update enemy health bar
  if (currentEnemy) {
    const enemyHealthBar = document.getElementById("enemy-health-bar");
    const enemyHealthPercentage = (currentEnemy.health / currentEnemy.maxHealth) * 100;
    enemyHealthBar.style.width = `${enemyHealthPercentage}%`;
    document.getElementById("enemy-health").textContent = currentEnemy.health;
  }
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
function startCombat() {
  if (!currentEnemy) {
    const encounterIndex = Math.floor(Math.random() * encounters.length);
    currentEnemy = { ...encounters[encounterIndex] };
    log.value += `You encountered a ${currentEnemy.name}!\n`;
    log.scrollTop = log.scrollHeight;
    updateStats();
  }
}

// Function to handle battles
function battle() {
  const playerAttackSpeed = playerStats.speed;
  const enemyAttackSpeed = currentEnemy.speed;

  // Player attack
  if (Math.random() < getCriticalHitChance(playerStats.intelligence)) {
    const playerAttackDamage = playerStats.strength * 1.5;
    currentEnemy.health -= playerAttackDamage;
    log.value += `You critically hit the ${currentEnemy.name} for ${playerAttackDamage} damage!\n`;
  } else {
    const playerAttackDamage = playerStats.strength;
    currentEnemy.health -= playerAttackDamage;
    log.value += `You hit the ${currentEnemy.name} for ${playerAttackDamage} damage.\n`;
  }

  // Enemy attack
  const enemyAttackDamage = currentEnemy.attack;
  playerStats.currentHealth -= enemyAttackDamage;
  log.value += `The ${currentEnemy.name} hits you for ${enemyAttackDamage} damage.\n`;

  // Check if the player or enemy is defeated
  if (playerStats.currentHealth <= 0) {
    playerStats.currentHealth = 0;
    passOut();
    return;
  }

  if (currentEnemy.health <= 0) {
    victory();
    return;
  }

  // Log the battle outcome
  log.scrollTop = log.scrollHeight;
  updateStats();
}

// Function to calculate critical hit chance based on intelligence
function getCriticalHitChance(intelligence) {
  const baseCriticalHitChance = 0.15;
  const intelligenceModifier = 0.01;
  return baseCriticalHitChance + (intelligence * intelligenceModifier);
}

// Function to handle victory
function victory() {
  const enemyLoot = currentEnemy.loot;

  // Grant experience
  playerStats.experience += currentEnemy.experience;

  // Check if the player leveled up
  if (playerStats.experience >= playerStats.experienceNeeded) {
    levelUp();
  }

  // Grant loot rewards
  if (enemyLoot) {
    if (enemyLoot.gold) {
      log.value += `You find ${enemyLoot.gold} gold.\n`;
      // TODO: Add gold to player's inventory or currency
    }
    if (enemyLoot.item) {
      log.value += `You find a ${enemyLoot.item}.\n`;
      inventory.push(enemyLoot.item);
      // Update inventory display
      updateInventory();
    }
  }

  // Log the victory
  log.value += `You defeat the ${currentEnemy.name}! You gain ${currentEnemy.experience} experience.\n`;
  currentEnemy = null;

  // Update player stats display
  updateStats();
}

// Function to handle passing out
function passOut() {
  playerStats.currentHealth = playerStats.maxHealth * 0.5; // Reset health to half of max
  playerStats.experience = Math.floor(playerStats.experience * 0.5); // Lose half of experience
  log.value += "You pass out and wake up with reduced health and experience.\n";
  currentEnemy = null;

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
  playerStats.strength += 2;
  playerStats.intelligence += 2;
  playerStats.speed += 2;

  // Increase skill experience requirements
  skills.skill1.experienceNeeded *= 1.5;
  skills.skill2.experienceNeeded *= 1.5;
  skills.skill3.experienceNeeded *= 1.5;

  // Log the level up
  log.value += `Congratulations! You reached level ${playerStats.level}.\n`;

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
  log.value += "Game Over! You have been defeated.\n";

  // Disable encounter button
  document.getElementById("start-combat").disabled = true;
}

// Initialize the game
updateStats();
openTab("explore");
