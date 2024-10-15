import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Test Test Test";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const buttonContainer = document.getElementById("button-container");
const counter = document.getElementById("counter");
const button = document.createElement("button");
button.innerHTML = "🍪";

button.style.padding = "100px, 1000px";
button.style.fontSize = "50px";
button.style.cursor = "pointer";

let clickcount = 0;
let hasClicked = false;

const countUpdate = () => {
  counter!.innerHTML = `${clickcount} cookie(s)`;
};


button.addEventListener("click", () => {
  clickcount++;
  countUpdate();

  if(!hasClicked){
    hasClicked = true;

    setInterval(() => {
        clickcount++;
        countUpdate();
      }, 1000);      
  }
});

buttonContainer?.append(button);
