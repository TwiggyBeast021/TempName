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
  speed: 6,
};

let skills = {
  criticalHit: { name: "Critical Hit", level: 1, experience: 0, experienceNeeded: 50 },
  dodge: { name: "Dodge", level: 1, experience: 0, experienceNeeded: 50 },
  combat: { name: "Combat", level: 1, experience: 0, experienceNeeded: 50 },
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
  document.getElementById("current-health").textContent = playerStats.currentHealth.toFixed(2);

  // Update skill levels and progress bars
  updateSkill("skill1", skills.criticalHit);
  updateSkill("skill2", skills.dodge);
  updateSkill("skill3", skills.combat);
}

// Function to update skill progress bar and level
function updateSkill(skillId, skill) {
  const progressBar = document.getElementById(`${skillId}-bar`);
  const progressText = document.getElementById(`${skillId}-progress`);
  const progressPercentage = (skill.experience / skill.experienceNeeded) * 100;
  progressBar.style.width = `${progressPercentage}%`;
  progressText.textContent = `${skill.experience}/${skill.experienceNeeded}`;
  document.getElementById(`${skillId}-level`).textContent = skill.level;
}

// Function to start combat
function startCombat() {
  if (currentEnemy === null) {
    const enemyIndex = Math.floor(Math.random() * enemies.length);
    currentEnemy = { ...enemies[enemyIndex] };
    log.value += `You encountered a ${currentEnemy.name}!\n`;
    updateStats();

    document.getElementById("start-combat").disabled = true;
    document.getElementById("attack").disabled = false;
  }
}

// Function to handle player attack
function attack() {
  // Player attack
  if (Math.random() < getCriticalHitChance()) {
    const playerAttackDamage = calculateAttackDamage() * 1.5;
    currentEnemy.health -= playerAttackDamage;
    log.value += `You critically hit the ${currentEnemy.name} for ${playerAttackDamage.toFixed(2)} damage!\n`;
  } else {
    const playerAttackDamage = calculateAttackDamage();
    currentEnemy.health -= playerAttackDamage;
    log.value += `You hit the ${currentEnemy.name} for ${playerAttackDamage.toFixed(2)} damage.\n`;
  }

  // Check if the enemy is defeated
  if (currentEnemy.health <= 0) {
    victory();
    return;
  }

  // Enemy attack
  const enemyAttackDamage = currentEnemy.attack;
  playerStats.currentHealth -= enemyAttackDamage;
  log.value += `The ${currentEnemy.name} hits you for ${enemyAttackDamage.toFixed(2)} damage.\n`;

  // Check if the player is defeated
  if (playerStats.currentHealth <= 0) {
    defeat();
    return;
  }

  updateStats();
}

// Function to calculate attack damage
function calculateAttackDamage() {
  return playerStats.strength;
}

// Function to calculate critical hit chance
function getCriticalHitChance() {
  return playerStats.intelligence * 0.01 * skills.criticalHit.level;
}

// Function to handle victory
function victory() {
  log.value += `You defeated the ${currentEnemy.name} and gained ${currentEnemy.experience} experience.\n`;
  playerStats.experience += currentEnemy.experience;
  currentEnemy = null;
  updateStats();

  document.getElementById("start-combat").disabled = false;
  document.getElementById("attack").disabled = true;
}

// Function to handle defeat
function defeat() {
  log.value += "You have been defeated.\n";
  currentEnemy = null;
  playerStats.currentHealth = playerStats.maxHealth * 0.5; // Reset health to half of max
  playerStats.experience = Math.floor(playerStats.experience * 0.5); // Reduce experience by half
  updateStats();

  document.getElementById("start-combat").disabled = false;
  document.getElementById("attack").disabled = true;
}

// Function to level up
function levelUp() {
  playerStats.level++;
  playerStats.maxHealth += playerStats.constitution;
  playerStats.constitution += 2;
  playerStats.strength += 2;
  playerStats.intelligence += 2;
  playerStats.speed += 2;

  log.value += `Congratulations! You reached level ${playerStats.level}.\n`;

  playerStats.experienceNeeded = Math.floor(playerStats.experienceNeeded * 1.5);
  playerStats.experience = 0;

  updateStats();
}

// Function to upgrade a skill
function upgradeSkill(skillName) {
  const skill = skills[skillName];
  skill.experience += 10;

  if (skill.experience >= skill.experienceNeeded) {
    skill.level++;
    skill.experienceNeeded = Math.floor(skill.experienceNeeded * 1.5);
    skill.experience = 0;

    switch (skillName) {
      case "criticalHit":
        playerStats.intelligence += 2;
        break;
      case "dodge":
        playerStats.speed += 2;
        break;
      case "combat":
        playerStats.strength += 2;
        break;
    }

    log.value += `You upgraded ${skill.name} to level ${skill.level}.\n`;
  }

  updateStats();
}

// Update inventory display
function updateInventory() {
  const itemList = document.getElementById("item-list");
  itemList.innerHTML = "";

  for (let i = 0; i < inventory.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = inventory[i];
    itemList.appendChild(listItem);
  }
}

// Initialize the game
updateStats();
