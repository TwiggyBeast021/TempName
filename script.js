// Variables for tracking game progress
let energy = 0;
let generator1Cost = 10;
let modifier1Cost = 100;
let generatorProgress = 0;
let modifierProgress = 0;

// Function to update the energy display with rounded values
function updateEnergyDisplay() {
  document.getElementById("energyDisplay").textContent = Math.round(energy);
}

// Function to handle the click button click event
function handleClick() {
  energy++;
  updateEnergyDisplay();
}

// Function to handle generator purchase
function purchaseGenerator() {
  if (energy >= generator1Cost) {
    energy -= generator1Cost;
    generator1Cost *= 1.5; // Increase the cost for the next generator

    // Enable the next generator after a certain progress
    if (generatorProgress >= 100) {
      // Enable the generator button
      document.getElementById("generator2").disabled = false;
    }

    updateEnergyDisplay();
    updateGeneratorProgress();
  }
}

// Function to handle modifier purchase
function purchaseModifier() {
  if (energy >= modifier1Cost) {
    energy -= modifier1Cost;
    modifier1Cost *= 2; // Increase the cost for the next modifier

    // Enable the next modifier after a certain progress
    if (modifierProgress >= 100) {
      // Enable the modifier button
      document.getElementById("modifier2").disabled = false;
    }

    updateEnergyDisplay();
    updateModifierProgress();
  }
}

// Function to update the generator purchase progress
function updateGeneratorProgress() {
  generatorProgress = Math.min((energy / generator1Cost) * 100, 100);
  document.getElementById("generatorProgress").value = generatorProgress;
}

// Function to update the modifier purchase progress
function updateModifierProgress() {
  modifierProgress = Math.min((energy / modifier1Cost) * 100, 100);
  document.getElementById("modifierProgress").value = modifierProgress;
}

// Function to handle prestige
function prestige() {
  // Implement your own logic for prestige

  // Reset game progress

  // Add bonus or multiplier to energy production

  // Disable all generators and modifiers

  // Enable prestige again after reaching certain conditions
}

// Add event listeners to buttons
document.getElementById("clickButton").addEventListener("click", handleClick);
document.getElementById("generator1").addEventListener("click", purchaseGenerator);
document.getElementById("modifier1").addEventListener("click", purchaseModifier);
document.getElementById("prestigeButton").addEventListener("click", prestige);

// Add smooth energy increase every second
setInterval(function() {
  energy += generatorProgress / 10; // Adjust the increment based on progress
  updateEnergyDisplay();
}, 1000);
