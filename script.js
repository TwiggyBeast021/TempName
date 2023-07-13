const player = {
  name: "Player",
  level: 1,
  experience: 0,
  experienceNeeded: 100,
  maxHealth: 100,
  currentHealth: 100,
  constitution: 5,
  strength: 5,
  intelligence: 5,
  speed: 5,
  defense: 5,
  criticalChance: 0.15,
  criticalDamageMultiplier: 1.5,
  dodgeChance: 0.1,
};

const enemy = {
  name: "Enemy",
  maxHealth: 20,
  currentHealth: 20,
  attack: 5,
};

const skills = [
  { name: "Attack", level: 1, experience: 0, experienceNeeded: 100 },
  { name: "Defense", level: 1, experience: 0, experienceNeeded: 100 },
  { name: "Critical Hit", level: 1, experience: 0, experienceNeeded: 100 },
  { name: "Dodge", level: 1, experience: 0, experienceNeeded: 100 },
];

function startCombat() {
  document.getElementById("start-combat").disabled = true;
  document.getElementById("log").innerHTML = "";

  while (player.currentHealth > 0 && enemy.currentHealth > 0) {
    playerAttack();
    if (enemy.currentHealth > 0) {
      enemyAttack();
    }
  }

  if (player.currentHealth <= 0) {
    document.getElementById("log").innerHTML += "<p>You have been defeated!</p>";
  } else {
    document.getElementById("log").innerHTML += "<p>You defeated the enemy!</p>";
    player.experience += 50;
    checkLevelUp();
  }

  document.getElementById("start-combat").disabled = false;
}

function playerAttack() {
  const damage = calculateDamage(player.strength, enemy.defense);
  enemy.currentHealth -= damage;

  document.getElementById("log").innerHTML += "<p>You attacked the enemy for " + damage.toFixed(2) + " damage.</p>";
  updateHealthBars();
}

function enemyAttack() {
  const damage = calculateDamage(enemy.attack, player.defense);
  player.currentHealth -= damage;

  document.getElementById("log").innerHTML += "<p>The enemy attacked you for " + damage.toFixed(2) + " damage.</p>";
  updateHealthBars();
}

function calculateDamage(attack, defense) {
  const baseDamage = attack - defense;
  const randomModifier = Math.random() * 0.2 + 0.9;
  const damage = baseDamage * randomModifier;

  return damage;
}

function updateHealthBars() {
  const playerHealthBar = document.getElementById("player-health-bar");
  const enemyHealthBar = document.getElementById("enemy-health-bar");

  const playerHealthPercentage = (player.currentHealth / player.maxHealth) * 100;
  const enemyHealthPercentage = (enemy.currentHealth / enemy.maxHealth) * 100;

  playerHealthBar.style.width = playerHealthPercentage + "%";
  enemyHealthBar.style.width = enemyHealthPercentage + "%";

  document.getElementById("player-health-text").textContent = "HP: " + player.currentHealth.toFixed(2) + " / " + player.maxHealth.toFixed(2);
  document.getElementById("enemy-health-text").textContent = "HP: " + enemy.currentHealth.toFixed(2) + " / " + enemy.maxHealth.toFixed(2);
}

function checkLevelUp() {
  if (player.experience >= player.experienceNeeded) {
    player.level++;
    player.experience -= player.experienceNeeded;
    player.experienceNeeded += player.level * 100;
    player.maxHealth += player.constitution * 10;
    player.strength += player.level;
    player.intelligence += player.level;
    player.speed += player.level;
    player.defense += player.level;
    player.criticalChance += 0.02;
    player.criticalDamageMultiplier += 0.1;
    player.dodgeChance += 0.02;

    updatePlayerStats();
  }
}

function updatePlayerStats() {
  document.getElementById("level").textContent = player.level;
  document.getElementById("constitution").textContent = player.constitution;
  document.getElementById("strength").textContent = player.strength;
  document.getElementById("intelligence").textContent = player.intelligence;
  document.getElementById("speed").textContent = player.speed;
  document.getElementById("defense").textContent = player.defense;
  document.getElementById("critical-chance").textContent = (player.criticalChance * 100).toFixed(2) + "%";
  document.getElementById("critical-damage").textContent = player.criticalDamageMultiplier.toFixed(2) + "x";
  document.getElementById("dodge-chance").textContent = (player.dodgeChance * 100).toFixed(2) + "%";
}

updateHealthBars();
updatePlayerStats();
