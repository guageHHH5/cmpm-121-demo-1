import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Scuffed Cookie Clicker";
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
button.innerHTML = "🍪";

button.style.padding = "100px, 1000px";
button.style.fontSize = "50px";
button.style.cursor = "pointer";

let clickcount = 0;
let lastFrame = 0;
let totalgrowth = 0;
const upgrades = [
  { name: "A", cost: 10, growthRate: 0.1, count: 0 },
  { name: "B", cost: 100, growthRate: 2.0, count: 0 },
  { name: "C", cost: 1000, growthRate: 50.0, count: 0 },
];

const countUpdate = () => {
  counter!.innerHTML = `${clickcount.toFixed(0)} cookie(s)`;
  growthrate!.innerHTML = `Growth Rate: ${totalgrowth.toFixed(2)} cookies/sec`;
  purchases!.innerHTML = ` Purchases:
    <ul>
      ${upgrades.map((upgrade) => `<li>${upgrade.name}: ${upgrade.count}</li>`).join("")}
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
    countUpdate();
    button.disabled = clickcount < upgrade.cost;
  }
};

upgrades.forEach((upgrade) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `Buy ${upgrade.name} (${upgrade.cost} 🍪, +${upgrade.growthRate} cookies/sec)`;
  upgradeButton.disabled = true;

  upgradeButton.addEventListener("click", () =>
    handlepurchase(upgrade, upgradeButton),
  );
  upgradeContainer?.append(upgradeButton);

  const checkUpgrade = () => {
    upgradeButton.disabled = clickcount < upgrade.cost;
    requestAnimationFrame(checkUpgrade);
  };
  checkUpgrade();
});

buttonContainer?.append(button);

requestAnimationFrame(animatedIncrement);
