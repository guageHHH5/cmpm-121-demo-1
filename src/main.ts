import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Test Test Test";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const buttonContainer = document.getElementById("button-container");

const button = document.createElement("button");
button.innerHTML = "🍪";

button.style.padding = "100px, 1000px";
button.style.fontSize = "50px";
button.style.cursor = "pointer";

button.addEventListener("click", () => {
  alert("placeholder");
});

buttonContainer?.append(button);
