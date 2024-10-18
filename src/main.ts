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

const AmuletButton = document.createElement("button");
AmuletButton.innerHTML = "🧿";
AmuletButton.disabled = true;
document.body.append(AmuletButton);

let isActive = false;
let cooldown = false;

let clickcount = 0;
let lastFrame = 0;
let totalgrowth = 0;
const upgrades = [
  {
    name: "Apprentice's Familiar",
    baseCost: 10,
    cost: 10,
    growthRate: 0.1,
    count: 0,
    description:
      "Every budding Wandcrafter has a faithful familiar—an animal bound to their magical aura. These creatures help you gather raw magical energy and focus it into wands.",
  },
  {
    name: "The Wandmaker's Forge",
    baseCost: 100,
    cost: 100,
    growthRate: 2.0,
    count: 0,
    description:
      "Hidden deep within the heart of the Wandspire, the Wandmaker's Forge is where legendary wands are created, capable of pulling latent energy from the magical realm itself.",
  },
  {
    name: "Enchanted Spellbook",
    baseCost: 1000,
    cost: 1000,
    growthRate: 50.0,
    count: 0,
    description:
      "An ancient tome containing forgotten spells of wand-making. Each spell within produces wands by bending the laws of reality.",
  },
  {
    name: "Arcane Crystal",
    baseCost: 1500,
    cost: 1500,
    growthRate: 150.0,
    count: 0,
    description:
      "A rare crystal that radiates pure magic. These crystals were once used by the greatest Archmages to create hundreds of wands in mere moments.",
  },
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
  upgradeButton.innerHTML = `${upgrade.name} (${upgrade.cost.toFixed(2)} 🪄, +${upgrade.growthRate} wands/sec) <br>
    <small>${upgrade.description}</small>`;
  upgradeButton.disabled = true;

  upgradeButton.addEventListener("click", () =>
    handlepurchase(upgrade, upgradeButton),
  );
  upgradeContainer?.append(upgradeButton);

  const checkUpgrade = () => {
    upgradeButton.disabled = clickcount < upgrade.cost;
    upgradeButton.innerHTML = `${upgrade.name} (${upgrade.cost.toFixed(2)} 🪄, +${upgrade.growthRate} wands/sec) <br>
    <small>${upgrade.description}</small>`;
    requestAnimationFrame(checkUpgrade);
  };
  checkUpgrade();
});

const activateAmulet = () => {
  if (isActive || cooldown) return;

  totalgrowth *= 2;
  isActive = true;
  cooldown = true;

  AmuletButton.disabled = true;

  let amuletTime = 30;

  const interval = setInterval(() => {
    amuletTime--;

    if (amuletTime <= 0) {
      clearInterval(interval);
      totalgrowth /= 2;
      isActive = false;

      let cooldowntime = 60;

      const coolinterval = setInterval(() => {
        cooldowntime--;

        if (cooldowntime <= 0) {
          clearInterval(coolinterval);
          AmuletButton.disabled = false;

          cooldown = false;
        }
      }, 1000);
    }
  }, 1000);
};

AmuletButton.addEventListener("click", activateAmulet);

const checkAmuletAvail = () => {
  if (clickcount >= 1000 && !cooldown) {
    AmuletButton.disabled = false;
  } else {
    AmuletButton.disabled = true;
  }

  requestAnimationFrame(checkAmuletAvail);
};
checkAmuletAvail();
buttonContainer?.append(button);

requestAnimationFrame(animatedIncrement);
