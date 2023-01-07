const diceWidget = document.getElementById("dice-widget") as HTMLElement;
const diceWindow = document.getElementById("dice-window") as HTMLElement;

const rollHistory = document.getElementById("throw-history") as HTMLElement;

let diceWindowVisible = false;
diceWidget.addEventListener("click", () => {
  diceWindowVisible
    ? diceWidget.classList.add("white-shadow")
    : diceWidget.classList.remove("white-shadow");
  diceWindowVisible = !diceWindowVisible;
  diceWindow.style.display = diceWindowVisible ? "flex" : "none";
});

let diceSelected: 6 | 10 = 6;
const form = document.getElementById("lightswitch") as HTMLFormElement;
const radioButtons = form.querySelectorAll(
  'input[name="dice"]'
) as NodeListOf<HTMLInputElement>;

for (const radioButton of radioButtons) {
  radioButton.addEventListener("change", () => {
    diceSelected = Number(radioButton.value) as 6 | 10;
  });
}

let diceAmount = 1;
const decrementButton = document.querySelector(".decrement") as HTMLElement;
const incrementButton = document.querySelector(".increment") as HTMLElement;
const inputField = document.querySelector(
  'input[name="amount"]'
) as HTMLInputElement;

decrementButton.addEventListener("click", () => {
  inputField.value = Math.max(1, Number(inputField.value) - 1).toString();
  diceAmount = Number(inputField.value);
});

incrementButton.addEventListener("click", () => {
  inputField.value = (Number(inputField.value) + 1).toString();
  diceAmount = Number(inputField.value);
});

function rollDice(sides: number, amount: number): number[] {
  let results = [];
  for (let i = 0; i < amount; i++) {
    results.push(Math.floor(Math.random() * sides) + 1);
  }
  return results;
}
const countTotal = (arr: number[]) => arr.reduce((acc, val) => acc + val, 0);
const makeRollButton = document.getElementById(
  "make-roll"
) as HTMLButtonElement;
makeRollButton.addEventListener("click", () => {
  const newRollEntry = document.createElement("p");
  let results = rollDice(diceSelected, diceAmount);
  let total = countTotal(results);
  newRollEntry.textContent = `${diceAmount}D${diceSelected}: ${results}. TOTAL: ${total}`;
  rollHistory?.appendChild(newRollEntry);
});

const clearButton = document.getElementById("clear-history") as HTMLElement;
clearButton.addEventListener("click", () => {
  while (rollHistory.firstChild) {
    rollHistory.removeChild(rollHistory.firstChild);
  }
});
