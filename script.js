const player = {
  name: "Player",
  health: 100,
  maxHealth: 100,
  damage: 10,
  level: 1,
  experience: 0,
  experienceNeeded: 100,
  gold: 0,
  skills: {
    attack: {
      level: 1,
      damageMultiplier: 1.2,
    },
    defense: {
      level: 1,
      damageReduction: 0.1,
    },
    healing: {
      level: 1,
      healingAmount: 20,
    },
  },
};

const enemy = {
  name: "Enemy",
  health: 50,
  maxHealth: 50,
  damage: 5,
  gold: 10,
};

const attackBtn = document.getElementById("attack-btn");
const lootBtn = document.getElementById("loot-btn");
const resetBtn = document.getElementById("reset-btn");
const log = document.getElementById("log");

attackBtn.addEventListener("click", () => {
  playerAttack();
  if (enemy.health > 0) {
    enemyAttack();
  }
});

lootBtn.addEventListener("click", () => {
  lootEnemy();
});

resetBtn.addEventListener("click", () => {
  resetGame();
});

function playerAttack() {
  const playerDamage = calculateDamage(player.damage * player.skills.attack.damageMultiplier);
  enemy.health -= playerDamage;

  logMessage("Player attacked the enemy for " + playerDamage + " damage.");

  if (enemy.health <= 0) {
    logMessage("Player defeated the enemy!");
    player.experience += 50;
    player.gold += enemy.gold;
    checkLevelUp();
    generateNewEnemy();
  }
}

function enemyAttack() {
  const enemyDamage = calculateDamage(enemy.damage - player.skills.defense.damageReduction);
  player.health -= enemyDamage;

  logMessage("Enemy attacked the player for " + enemyDamage + " damage.");

  if (player.health <= 0) {
    logMessage("Player has been defeated!");
    attackBtn.disabled = true;
    lootBtn.disabled = true;
  }
}

function calculateDamage(damage) {
  return Math.floor(Math.random() * (damage + 1));
}

function logMessage(message) {
  log.innerHTML += "<p>" + message + "</p>";
  log.scrollTop = log.scrollHeight;
}

function checkLevelUp() {
  if (player.experience >= player.experienceNeeded) {
    player.level++;
    player.experience -= player.experienceNeeded;
    player.damage += 5;
    player.experienceNeeded += player.level * 100;

    logMessage(
      "Congratulations! You leveled up to level " +
        player.level +
        ". Damage increased to " +
        player.damage +
        "."
    );
  }

  document.getElementById("player-level").textContent = player.level;
  document.getElementById("player-gold").textContent = player.gold;
  document.getElementById("player-experience").textContent = player.experience;
  document.getElementById("attack-skill-level").textContent = player.skills.attack.level;
  document.getElementById("defense-skill-level").textContent = player.skills.defense.level;
  document.getElementById("healing-skill-level").textContent = player.skills.healing.level;
}

function generateNewEnemy() {
  const enemyLevel = player.level * 2;
  enemy.health = 50 + enemyLevel * 10;
  enemy.maxHealth = enemy.health;
  enemy.damage = 5 + enemyLevel * 2;
  enemy.gold = 10 + enemyLevel * 5;

  document.getElementById("enemy-health").textContent = enemy.health;
  document.getElementById("enemy-damage").textContent = enemy.damage;
}

function lootEnemy() {
  player.gold += enemy.gold;
  logMessage("You looted " + enemy.gold + " gold from the enemy.");

  checkLevelUp();
  generateNewEnemy();
}

function resetGame() {
  player.health = player.maxHealth;
  player.damage = 10;
  player.level = 1;
  player.experience = 0;
  player.experienceNeeded = 100;
  player.gold = 0;
  player.skills.attack.level = 1;
  player.skills.defense.level = 1;
  player.skills.healing.level = 1;

  enemy.health = enemy.maxHealth;
  enemy.damage = 5;
  enemy.gold = 10;

  log.innerHTML = "";
  attackBtn.disabled = false;
  lootBtn.disabled = false;
  document.getElementById("player-health").textContent = player.health;
  document.getElementById("player-damage").textContent = player.damage;
  document.getElementById("player-level").textContent = player.level;
  document.getElementById("player-gold").textContent = player.gold;
  document.getElementById("player-experience").textContent = player.experience;
  document.getElementById("attack-skill-level").textContent = player.skills.attack.level;
  document.getElementById("defense-skill-level").textContent = player.skills.defense.level;
  document.getElementById("healing-skill-level").textContent = player.skills.healing.level;
  document.getElementById("enemy-health").textContent = enemy.health;
  document.getElementById("enemy-damage").textContent = enemy.damage;
}

document.getElementById("player-health").textContent = player.health;
document.getElementById("player-damage").textContent = player.damage;
document.getElementById("player-level").textContent = player.level;
document.getElementById("player-gold").textContent = player.gold;
document.getElementById("player-experience").textContent = player.experience;
document.getElementById("attack-skill-level").textContent = player.skills.attack.level;
document.getElementById("defense-skill-level").textContent = player.skills.defense.level;
document.getElementById("healing-skill-level").textContent = player.skills.healing.level;
document.getElementById("enemy-health").textContent = enemy.health;
document.getElementById("enemy-damage").textContent = enemy.damage;
