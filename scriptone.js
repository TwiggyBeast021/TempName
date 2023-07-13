javascript
let energy = 0;
let metal = 0;
let energyGenerators = 0;
let metalGenerators = 0;
let adventureProgress = 0;

const energyElement = document.getElementById('energy');
const metalElement = document.getElementById('metal');
const scavengeButton = document.getElementById('scavenge');
const generateEnergyButton = document.getElementById('generateEnergy');
const createFlashlightButton = document.getElementById('createFlashlight');
const createGeneratorButton = document.getElementById('createGenerator');
const adventureButton = document.getElementById('adventure');
const adventureProgressbar = document.getElementById('adventureProgressbar');
const adventureLog = document.getElementById('adventureLog');

scavengeButton.addEventListener('click', scavenge);
generateEnergyButton.addEventListener('click', generateEnergy);
createFlashlightButton.addEventListener('click', createFlashlight);
createGeneratorButton.addEventListener('click', createGenerator);
adventureButton.addEventListener('click', goAdventure);

function scavenge() {
  scavengeButton.disabled = true;
  setTimeout(() => {
    const randomMetal = Math.floor(Math.random() * 3) + 1;
    metal += randomMetal;
    metalElement.textContent = metal;
    scavengeButton.disabled = false;

    if (metal >= 10) {
      createFlashlightButton.disabled = false;
    }
  }, 5000);
}

function generateEnergy() {
  generateEnergyButton.disabled = true;
  setTimeout(() => {
    energy += 3;
    energyElement.textContent = energy;
    generateEnergyButton.disabled = false;

    if (energy >= 10 && metal >= 5) {
      createGeneratorButton.disabled = false;
    }
  }, 1000);
}

function createFlashlight() {
  if (energy >= 10 && metal >= 5) {
    energy -= 10;
    metal -= 5;
    energyElement.textContent = energy;
    metalElement.textContent = metal;
    createFlashlightButton.disabled = true;
    scavengeButton.addEventListener('click', scavenge);

    if (energy >= 25 && metal >= 50) {
      createGeneratorButton.disabled = false;
    }
  }
}

function createGenerator() {
  if (energy >= 25 && metal >= 50) {
    energy -= 25;
    metal -= 50;
    energyGenerators++;
    energyElement.textContent = energy;
    metalElement.textContent = metal;
    createGeneratorButton.disabled = true;
    adventureButton.disabled = false;
  }
}

function goAdventure() {
  adventureButton.disabled = true;
  adventureProgress = 0;
  adventureLog.innerHTML = '';

  const adventureInterval = setInterval(() => {
    adventureProgress += 10;
    adventureProgressbar.style.width = `${adventureProgress}%`;

    if (adventureProgress >= 100) {
      clearInterval(adventureInterval);
      adventureButton.disabled = false;
      adventureProgressbar.style.width = '0%';

      const randomEvent = Math.floor(Math.random() * 3);
      switch (randomEvent) {
        case 0:
          adventureLog.innerHTML += '<p>You found a lost treasure chest filled with Energy!</p>';
          energy += 50;
          energyElement.textContent = energy;
          break;
        case 1:
          adventureLog.innerHTML += '<p>You encountered a group of friendly survivors who offered you Metal!</p>';
          metal += 25;
          metalElement.textContent = metal;
          break;
        case 2:
          adventureLog.innerHTML += '<p>You stumbled upon a mysterious ruin, but found nothing of value.</p>';
          break;
      }
    }
  }, 100);
}
