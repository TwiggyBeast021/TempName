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
  criticalHit: { name: "Critical Hit", level: 1, experience: 0, experienceNeeded: 50, description: "Increases critical hit chance" },
  dodge: { name: "Dodge", level: 1, experience: 0, experienceNeeded: 50, description: "Increases evasion chance" },
  combat: { name: "Combat", level: 1, experience: 0, experienceNeeded: 50, description: "Increases attack damage" }
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
  document.getElementById("current-health").textContent = playerStats.currentHealth;
  document.getElementById("attack-damage").textContent = calculateAttackDamage().toFixed(2);
  document.getElementById("attack-speed").textContent = calculateAttackSpeed().toFixed(2);
  document.getElementById("critical-hit-chance").textContent = (getCriticalHitChance() * 100).toFixed(2) + "%";
  document.getElementById("critical-hit-damage").textContent = calculateCriticalHitDamage().toFixed(2);

  // Update skill progress bars
  updateSkillProgressBar("skill1", skills.criticalHit);
  updateSkillProgressBar("skill2", skills.dodge);
  updateSkillProgressBar("skill3", skills.combat);

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

  // Update player stats display
  updateStats();
}

// Function to handle encounters
function startCombat() {
  if (!currentEnemy) {
    const encounterIndex = Math.floor(Math.random() * encounters.length);
    currentEnemy = { ...encounters[encounterIndex] };
    log.value += `You encountered a ${currentEnemy.name}!\n`;
    log.scrollTop = log.scrollHeight;
    updateStats();

    // Disable the "Start Combat" button after encountering an enemy
    document.getElementById("start-combat").disabled = true;

    // Enable the "Attack" button to allow the player to perform attacks
    document.getElementById("attack").disabled = false;
  }
}

// Function to handle player attacks
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
  log.value += `The ${currentEnemy.name} hits you for ${enemyAttackDamage} damage.\n`;

  // Check if the player is defeated
  if (playerStats.currentHealth <= 0) {
    playerStats.currentHealth = 0;
    passOut();
    return;
  }

  // Update player stats display
  updateStats();
}

// Function to calculate attack damage
function calculateAttackDamage() {
  return playerStats.strength;
}

// Function to calculate attack speed
function calculateAttackSpeed() {
  return playerStats.speed * 0.1;
}

// Function to get critical hit chance
function getCriticalHitChance() {
  return playerStats.intelligence * 0.01 * skills.criticalHit.level;
}

// Function to calculate critical hit damage
function calculateCriticalHitDamage() {
  return calculateAttackDamage() * 1.5;
}

// Function to update skill progress bar
function updateSkillProgressBar(skillId, skill) {
  const progressBar = document.getElementById(`${skillId}-bar`);
  const progressPercentage = (skill.experience / skill.experienceNeeded) * 100;
  progressBar.style.width = `${progressPercentage}%`;
  const progressText = document.getElementById(`${skillId}-progress`);
  progressText.textContent = `${skill.experience}/${skill.experienceNeeded}`;
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

  // Enable the "Start Combat" button after victory
  document.getElementById("start-combat").disabled = false;

  // Disable the "Attack" button after victory
  document.getElementById("attack").disabled = true;

  // Update player stats display
  updateStats();
}

// Function to handle passing out
function passOut() {
  playerStats.currentHealth = playerStats.maxHealth * 0.5; // Reset health to half of max
  playerStats.experience = Math.floor(playerStats.experience * 0.5); // Lose half of experience
  log.value += "You pass out and wake up with reduced health and experience.\n";
  currentEnemy = null;

  // Enable the "Start Combat" button after passing out
  document.getElementById("start-combat").disabled = false;

  // Disable the "Attack" button after passing out
  document.getElementById("attack").disabled = true;

  // Update player stats display
  updateStats();
}

// Function to handle level up
function levelUp() {
  playerStats.level++;
  playerStats.experience = 0;
  playerStats.experienceNeeded *= 1.5; // Increase experience requirement

  // Increase player's stats upon leveling up
  playerStats.maxHealth += playerStats.constitution;
  playerStats.constitution += 2;
  playerStats.strength += 2;
  playerStats.intelligence += 2;
  playerStats.speed += 2;

  // Increase skill experience requirements
  skills.criticalHit.experienceNeeded *= 1.5;
  skills.dodge.experienceNeeded *= 1.5;
  skills.combat.experienceNeeded *= 1.5;

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

    // Perform skill-specific actions based on the skill name
    switch (skillName) {
      case "criticalHit":
        // Increase critical hit chance
        playerStats.intelligence += 2;
        break;
      case "dodge":
        // Increase evasion chance
        playerStats.speed += 2;
        break;
      case "combat":
        // Increase attack damage
        playerStats.strength += 2;
        break;
    }

    // Log the skill upgrade
    log.value += `You upgraded ${skill.name} to level ${skill.level}.\n`;
    log.scrollTop = log.scrollHeight;
  }

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
