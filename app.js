// Calc object to manage inputs
const calc = {
    currentInput: '0',
    previousInput: '0',
    operator: undefined,
  };

// Buttons
const numBtns = document.querySelectorAll('.num');
const operatorBtns = document.querySelectorAll('.operator');
const equalsBtn = document.querySelector('#equalsBtn')
const acBtn = document.querySelector('#acBtn')
const ceBtn = document.querySelector('#ceBtn')
const pointBtn = document.querySelector('#point')
let resultFigure = document.querySelector("#result")

// Operator Functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// Resets calculator functions/values (AC button)
let ac = function () {
    calc["currentInput"] = '0';
    calc["previousInput"] = '0';
    calc["operator"] = undefined;
}

// Deletes previous entry (CE button)
let ce = function () {
    calc["currentInput"] = calc["currentInput"].slice(0, -1);
}

// Update calculator screen
let updateDisplay = function () {
    resultFigure.innerText = calc["currentInput"];
}

// Appends the number to screen and calc object
let appendNumber = function (number) {
    // if a point is typed and already present, return
    if (number === '.' && resultFigure.innerText.includes(".")) return
    resultFigure.innerText = resultFigure.innerText === "0" ? number.toString() : resultFigure.innerText + number.toString();
    calc["currentInput"] = resultFigure.innerText;
}

// Computes an answer
let compute = function () {
    let operator = calc["operator"];
    let prev = parseFloat(calc["previousInput"])
    let curr = parseFloat(calc["currentInput"])
    console.log(prev);
    console.log(curr);
    if (isNaN(prev) || isNaN(curr)) return
    
    let answer;
    if (operator === "add") {
        answer = add(prev, curr);
    } else if (operator === "subtract") {
        answer = subtract(prev, curr);
    } else if (operator === "multiply") {
        answer = multiply(prev, curr);
    } else if (operator === "divide") {
        answer = divide(prev, curr);
    }
    calc["currentInput"] = answer.toString();
    console.log("computed answer " + answer);
}

// Updates calc object depending on operator
let chooseOperator = function (operator) {
    if (calc["previousInput"] !== '0'){
        compute()
    }
    calc["previousInput"] = calc["currentInput"];
    calc["currentInput"] = '0';
    resultFigure.innerText = calc["currentInput"];
    
    if (operator === "addBtn"){
        calc["operator"] = "add";
    } else if (operator === "subtractBtn") {
        calc["operator"] = "subtract";
    } else if (operator === "multiplyBtn") {
        calc["operator"] = "multiply";
    } else if (operator === "divideBtn") {
        calc["operator"] = "divide";
    }
}

// Event Listeners
acBtn.addEventListener('click', () => {
    ac();
    updateDisplay();
});

ceBtn.addEventListener('click', () => {
    ce();
    updateDisplay();
});

numBtns.forEach((button) => 
    button.addEventListener('click', () => appendNumber(button.innerText)));

operatorBtns.forEach((operator) => 
    operator.addEventListener('click', () => chooseOperator(operator.id)));

equalsBtn.addEventListener('click', () => {
    compute();
    updateDisplay();
});