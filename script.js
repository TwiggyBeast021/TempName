// Player state
let player = {
  level: 1,
  experience: 0,
  experienceNeeded: 100,
  maxHealth: 100,
  currentHealth: 100,
  constitution: 10,
  strength: 5,
  intelligence: 8,
  speed: 6,
  criticalChance: 0.15,
  criticalDamageMultiplier: 1.5,
  dodgeChance: 0.1,
  defense: 0,
};

// Skills
let skills = {
  attack: {
    level: 1,
    experience: 0,
    experienceNeeded: 100,
    attackBonus: 0,
    speedBonus: 0,
  },
  defense: {
    level: 1,
    experience: 0,
    experienceNeeded: 100,
    defenseBonus: 0,
  },
  criticalHit: {
    level: 1,
    experience: 0,
    experienceNeeded: 100,
    criticalChanceBonus: 0,
    criticalDamageBonus: 0,
  },
  dodge: {
    level: 1,
    experience: 0,
    experienceNeeded: 100,
    dodgeChanceBonus: 0,
  },
};

// Enemies
const enemies = [
  { name: "Slime", maxHealth: 10, attack: 2, experience: 5, dropRate: 0.5 },
  { name: "Goblin", maxHealth: 20, attack: 4, experience: 10, dropRate: 0.3 },
  { name: "Orc", maxHealth: 30, attack: 6, experience: 15, dropRate: 0.2 },
  { name: "Dragon", maxHealth: 50, attack: 10, experience: 25, dropRate: 0.1 },
];

// Inventory
let inventory = {
  armor: [],
  weapon: [],
};

// Function to start combat
function startCombat() {
  const enemyIndex = Math.floor(Math.random() * enemies.length);
  const enemy = enemies[enemyIndex];
  log.value += `You encountered a ${enemy.name}!\n`;

  // Attack the enemy
  attackEnemy(enemy);
}

// Function to attack the enemy
function attackEnemy(enemy) {
  const playerAttackSpeed = calculateAttackSpeed();
  const enemyAttackSpeed = enemy.speed;

  const playerAttackDamage = calculateAttackDamage();
  const enemyAttackDamage = enemy.attack;

  // Player attacks
  if (playerAttackSpeed >= enemyAttackSpeed) {
    enemy.currentHealth -= playerAttackDamage;
    log.value += `You hit the ${enemy.name} for ${playerAttackDamage.toFixed(2)} damage.\n`;
  }

  // Enemy attacks
  player.currentHealth -= enemyAttackDamage;
  log.value += `The ${enemy.name} hits you for ${enemyAttackDamage.toFixed(2)} damage.\n`;

  // Check if the enemy is defeated
  if (enemy.currentHealth <= 0) {
    victory(enemy);
    return;
  }

  // Check if the player is defeated
  if (player.currentHealth <= 0) {
    defeat(enemy);
    return;
  }

  // Update stats
  updateStats();

  // Continue combat
  setTimeout(() => {
    attackEnemy(enemy);
  }, 1000);
}

// Function to calculate attack speed
function calculateAttackSpeed() {
  return player.speed + skills.attack.speedBonus;
}

// Function to calculate attack damage
function calculateAttackDamage() {
  const baseDamage = player.strength + skills.attack.attackBonus;
  const isCritical = Math.random() < player.criticalChance + skills.criticalHit.criticalChanceBonus;
  const damageMultiplier = isCritical ? player.criticalDamageMultiplier + skills.criticalHit.criticalDamageBonus : 1;

  return baseDamage * damageMultiplier;
}

// Function to handle victory
function victory(enemy) {
  log.value += `You defeated the ${enemy.name} and gained ${enemy.experience} experience.\n`;
  player.experience += enemy.experience;

  // Check if the player leveled up
  if (player.experience >= player.experienceNeeded) {
    levelUp();
  }

  // Check if the enemy drops an item
  if (Math.random() < enemy.dropRate) {
    const item = generateRandomItem();
    inventory[item.category].push(item);
    log.value += `The ${enemy.name} dropped ${item.name}!\n`;
    updateInventory();
  }

  // Reset enemy's health
  enemy.currentHealth = enemy.maxHealth;

  // Update stats
  updateStats();
}

// Function to handle defeat
function defeat(enemy) {
  log.value += "You have been defeated.\n";
  player.currentHealth = player.maxHealth * 0.5; // Reset health to half of max
  player.experience = Math.floor(player.experience * 0.5); // Reduce experience by half

  // Reset enemy's health
  enemy.currentHealth = enemy.maxHealth;

  // Update stats
  updateStats();
}

// Function to level up
function levelUp() {
  player.level++;
  player.maxHealth += player.constitution;
  player.constitution += 2;
  player.strength += 2;
  player.intelligence += 2;
  player.speed += 2;
  player.experienceNeeded = Math.floor(player.experienceNeeded * 1.5);
  player.experience = 0;

  // Level up skills
  for (const skill in skills) {
    const currentSkill = skills[skill];
    currentSkill.experience = 0;
    currentSkill.experienceNeeded = Math.floor(currentSkill.experienceNeeded * 1.5);
    currentSkill.level++;
  }

  log.value += `Congratulations! You reached level ${player.level}.\n`;

  // Update stats
  updateStats();
}

// Function to generate a random item
function generateRandomItem() {
  const categories = ["armor", "weapon"];
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const items = {
    armor: [
      { name: "Leather Armor", category: "armor", defenseBonus: 2 },
      { name: "Iron Armor", category: "armor", defenseBonus: 4 },
      { name: "Steel Armor", category: "armor", defenseBonus: 6 },
    ],
    weapon: [
      { name: "Wooden Sword", category: "weapon", attackBonus: 2 },
      { name: "Iron Sword", category: "weapon", attackBonus: 4 },
      { name: "Steel Sword", category: "weapon", attackBonus: 6 },
    ],
  };

  const randomItem = items[randomCategory][Math.floor(Math.random() * items[randomCategory].length)];
  return randomItem;
}

// Function to update player stats
function updateStats() {
  document.getElementById("level").textContent = player.level;
  document.getElementById("experience").textContent = player.experience;
  document.getElementById("experience-needed").textContent = player.experienceNeeded;
  document.getElementById("current-health").textContent = player.currentHealth.toFixed(2);
  document.getElementById("max-health").textContent = player.maxHealth.toFixed(2);
  document.getElementById("constitution").textContent = player.constitution;
  document.getElementById("strength").textContent = player.strength;
  document.getElementById("intelligence").textContent = player.intelligence;
  document.getElementById("speed").textContent = player.speed;
  document.getElementById("defense").textContent = player.defense;
  document.getElementById("critical-chance").textContent = (player.criticalChance * 100).toFixed(2) + "%";
  document.getElementById("critical-damage").textContent = (player.criticalDamageMultiplier * 100).toFixed(0) + "%";
  document.getElementById("dodge-chance").textContent = (player.dodgeChance * 100).toFixed(2) + "%";

  updateProgressBar("experience-bar", player.experience, player.experienceNeeded);

  updateSkill("attack", skills.attack);
  updateSkill("defense", skills.defense);
  updateSkill("critical-hit", skills.criticalHit);
  updateSkill("dodge", skills.dodge);
}

// Function to update skill
function updateSkill(skillName, skill) {
  document.getElementById(`${skillName}-level`).textContent = skill.level;
  document.getElementById(`${skillName}-experience`).textContent = skill.experience;
  document.getElementById(`${skillName}-experience-needed`).textContent = skill.experienceNeeded;
  updateProgressBar(`${skillName}-bar`, skill.experience, skill.experienceNeeded);
}

// Function to update progress bar
function updateProgressBar(barId, currentValue, maxValue) {
  const bar = document.getElementById(barId);
  const progress = (currentValue / maxValue) * 100;
  bar.style.width = `${progress}%`;
}

// Function to update inventory
function updateInventory() {
  const armorList = document.getElementById("armor-list");
  const weaponList = document.getElementById("weapon-list");

  armorList.innerHTML = "";
  weaponList.innerHTML = "";

  for (const item of inventory.armor) {
    const listItem = document.createElement("li");
    listItem.textContent = item.name;
    armorList.appendChild(listItem);
  }

  for (const item of inventory.weapon) {
    const listItem = document.createElement("li");
    listItem.textContent = item.name;
    weaponList.appendChild(listItem);
  }
}

// Function to switch tabs
function openTab(tabName) {
  const tabs = document.getElementsByClassName("tab");
  const tabButtons = document.getElementsByClassName("tab-button");

  for (let i = 0; i < tabs.length; i++) {
    tabs[i].style.display = "none";
  }

  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove("active");
  }

  document.getElementById(tabName).style.display = "block";
  document.querySelector(`[data-tab="${tabName}"]`).classList.add("active");
}

// Initialize the game
updateStats();
openTab("explore");
