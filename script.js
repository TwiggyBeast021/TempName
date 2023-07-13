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
};

// Enemies
const enemies = [
  { name: "Goblin", maxHealth: 50, attack: 10, experience: 20, dropRate: 0.5 },
  { name: "Orc", maxHealth: 100, attack: 20, experience: 40, dropRate: 0.3 },
  { name: "Dragon", maxHealth: 200, attack: 30, experience: 80, dropRate: 0.1 },
];

// Inventory
let inventory = [];

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
  const playerAttackDamage = calculateAttackDamage();
  enemy.currentHealth -= playerAttackDamage;
  log.value += `You hit the ${enemy.name} for ${playerAttackDamage.toFixed(2)} damage.\n`;

  // Check if the enemy is defeated
  if (enemy.currentHealth <= 0) {
    victory(enemy);
    return;
  }

  // Enemy attack
  const enemyAttackDamage = enemy.attack;
  player.currentHealth -= enemyAttackDamage;
  log.value += `The ${enemy.name} hits you for ${enemyAttackDamage.toFixed(2)} damage.\n`;

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

// Function to calculate attack damage
function calculateAttackDamage() {
  return player.strength;
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
    inventory.push(item);
    log.value += `The ${enemy.name} dropped ${item}!\n`;
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

  log.value += `Congratulations! You reached level ${player.level}.\n`;

  player.experienceNeeded = Math.floor(player.experienceNeeded * 1.5);
  player.experience = 0;

  updateStats();
}

// Function to generate a random item
function generateRandomItem() {
  const items = ["Sword", "Shield", "Potion", "Amulet", "Armor"];
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

// Function to update player stats
function updateStats() {
  document.getElementById("level").textContent = player.level;
  document.getElementById("experience").textContent = player.experience;
  document.getElementById("experience-needed").textContent = player.experienceNeeded;
  document.getElementById("current-health").textContent = player.currentHealth.toFixed(2);
  document.getElementById("max-health").textContent = player.maxHealth;
  document.getElementById("constitution").textContent = player.constitution;
  document.getElementById("strength").textContent = player.strength;
  document.getElementById("intelligence").textContent = player.intelligence;
  document.getElementById("speed").textContent = player.speed;
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
