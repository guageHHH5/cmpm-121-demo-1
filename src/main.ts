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

const button = document.createElement("button");
button.innerHTML = "🍪";

const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "auto increment (10 🍪)";
upgradeButton.disabled = true;

button.style.padding = "100px, 1000px";
button.style.fontSize = "50px";
button.style.cursor = "pointer";

let clickcount = 0;
let autoIncRate = 0;
let lastFrame = 0;

const countUpdate = () => {
  counter!.innerHTML = `${clickcount.toFixed(0)} cookie(s)`;

  upgradeButton.disabled = clickcount < 10;
};

const animatedIncrement = (timestamp: number) => {
  if (!lastFrame) lastFrame = timestamp;

  const deltaT = (timestamp - lastFrame) / 1000;
  lastFrame = timestamp;

  if (autoIncRate > 0) {
    clickcount += autoIncRate * deltaT;
    countUpdate();
  }

  requestAnimationFrame(animatedIncrement);
};

button.addEventListener("click", () => {
  clickcount++;
  countUpdate();
});

upgradeButton.addEventListener("click", () => {
  if (clickcount >= 10) {
    clickcount -= 10;
    autoIncRate += 1;
    countUpdate();
  }
});

buttonContainer?.append(button);
upgradeContainer?.append(upgradeButton);

requestAnimationFrame(animatedIncrement);
