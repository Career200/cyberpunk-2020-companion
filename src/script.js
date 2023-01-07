var diceWidget = document.getElementById("dice-widget");
var diceWindow = document.getElementById("dice-window");
var rollHistory = document.getElementById("throw-history");
var diceWindowVisible = false;
diceWidget.addEventListener("click", function () {
    diceWindowVisible
        ? diceWidget.classList.add("white-shadow")
        : diceWidget.classList.remove("white-shadow");
    diceWindowVisible = !diceWindowVisible;
    diceWindow.style.display = diceWindowVisible ? "flex" : "none";
});
var diceSelected = 6;
var form = document.getElementById("lightswitch");
var radioButtons = form.querySelectorAll('input[name="dice"]');
var _loop_1 = function (radioButton) {
    radioButton.addEventListener("change", function () {
        diceSelected = Number(radioButton.value);
    });
};
for (var _i = 0, radioButtons_1 = radioButtons; _i < radioButtons_1.length; _i++) {
    var radioButton = radioButtons_1[_i];
    _loop_1(radioButton);
}
var diceAmount = 1;
var decrementButton = document.querySelector(".decrement");
var incrementButton = document.querySelector(".increment");
var inputField = document.querySelector('input[name="amount"]');
decrementButton.addEventListener("click", function () {
    inputField.value = Math.max(1, Number(inputField.value) - 1).toString();
    diceAmount = Number(inputField.value);
});
incrementButton.addEventListener("click", function () {
    inputField.value = (Number(inputField.value) + 1).toString();
    diceAmount = Number(inputField.value);
});
function rollDice(sides, amount) {
    var results = [];
    for (var i = 0; i < amount; i++) {
        results.push(Math.floor(Math.random() * sides) + 1);
    }
    return results;
}
var countTotal = function (arr) { return arr.reduce(function (acc, val) { return acc + val; }, 0); };
var makeRollButton = document.getElementById("make-roll");
makeRollButton.addEventListener("click", function () {
    var newRollEntry = document.createElement("p");
    var results = rollDice(diceSelected, diceAmount);
    var total = countTotal(results);
    newRollEntry.textContent = "".concat(diceAmount, "D").concat(diceSelected, ": ").concat(results, ". TOTAL: ").concat(total);
    rollHistory === null || rollHistory === void 0 ? void 0 : rollHistory.appendChild(newRollEntry);
});
var clearButton = document.getElementById("clear-history");
clearButton.addEventListener("click", function () {
    while (rollHistory.firstChild) {
        rollHistory.removeChild(rollHistory.firstChild);
    }
});
