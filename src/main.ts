import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "🧙‍♂️The Lore of Wandspire🧙‍♂️";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const buttonContainer = document.getElementById("button-container");
const counter = document.getElementById("counter");
const upgradeContainer = document.getElementById("upgrade-container");
const growthrate = document.getElementById("growth-rate");
const purchases = document.getElementById("purchases");

const button = document.createElement("button");
button.innerHTML = "🪄";

button.style.padding = "100px, 1000px";
button.style.fontSize = "50px";
button.style.cursor = "pointer";

let clickcount = 0;
let lastFrame = 0;
let totalgrowth = 0;
const upgrades = [
  { name: "Apprentice's Familiar", baseCost: 10, cost: 10, growthRate: 0.1, count: 0 },
  { name: "The Wandmaker's Forge", baseCost: 100, cost: 100, growthRate: 2.0, count: 0 },
  { name: "Enchanted Spellbook", baseCost: 1000, cost: 1000, growthRate: 50.0, count: 0 },
];

const countUpdate = () => {
  counter!.innerHTML = `${clickcount.toFixed(0)} wand(s)`;
  growthrate!.innerHTML = `Growth Rate: ${totalgrowth.toFixed(2)} wands/sec`;
  purchases!.innerHTML = ` Purchases:
    <ul>
      ${upgrades.map((upgrade) => `<li>${upgrade.name}: ${upgrade.count} </li>`).join("")}
    </ul>
  `;
};

const animatedIncrement = (timestamp: number) => {
  if (!lastFrame) lastFrame = timestamp;

  const deltaT = (timestamp - lastFrame) / 1000;
  lastFrame = timestamp;

  if (totalgrowth > 0) {
    clickcount += totalgrowth * deltaT;
    countUpdate();
  }

  requestAnimationFrame(animatedIncrement);
};

button.addEventListener("click", () => {
  clickcount++;
  countUpdate();
});

const handlepurchase = (
  upgrade: { name: string; cost: number; growthRate: number; count: number },
  button: HTMLButtonElement,
) => {
  if (clickcount >= upgrade.cost) {
    clickcount -= upgrade.cost;
    upgrade.count += 1;
    totalgrowth += upgrade.growthRate;

    upgrade.cost *= 1.15;

    countUpdate();
    button.disabled = clickcount < upgrade.cost;
  }
};

upgrades.forEach((upgrade) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `${upgrade.name} (${upgrade.cost.toFixed(2)} 🪄, +${upgrade.growthRate} wands/sec)`;
  upgradeButton.disabled = true;

  upgradeButton.addEventListener("click", () =>
    handlepurchase(upgrade, upgradeButton),
  );
  upgradeContainer?.append(upgradeButton);

  const checkUpgrade = () => {
    upgradeButton.disabled = clickcount < upgrade.cost;
    upgradeButton.innerHTML = `${upgrade.name} (${upgrade.cost.toFixed(2)} 🪄, +${upgrade.growthRate} wands/sec)`;
    requestAnimationFrame(checkUpgrade);
  };
  checkUpgrade();
});

buttonContainer?.append(button);

requestAnimationFrame(animatedIncrement);
