const calc = {
    currentInput: '0',
    previousInput: '0',
    operator: undefined,
  };

// Buttons
const numBtns = document.querySelectorAll('.num');
const operatorBtns = document.querySelectorAll('.operator');

const equalsBtn = document.querySelector('#equalsBtn')
const clearBtn = document.querySelector('#clearBtn')
const pointBtn = document.querySelector('#point')
let resultFigure = document.querySelector("#result")

// Operator Functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// Resets calculator functions (AC button)
let clear = function () {
    calc["currentInput"] = '0';
    calc["previousInput"] = '0';
    calc["operator"] = undefined;
}

let updateDisplay = function () {
    resultFigure.innerText = calc["currentInput"];
    console.log("screen cleared");
}

// Appends the number to screen and calc object
let appendNumber = function (number) {
    // if a point is typed and already present, return
    if (number === '.' && resultFigure.innerText.includes(".")) return
    resultFigure.innerText = resultFigure.innerText === "0" ? number.toString() : resultFigure.innerText + number.toString();
    calc["currentInput"] = resultFigure.innerText;
}

let compute = function () {
    let symbol = calc["operator"];
    let prev = parseFloat(calc["previousInput"])
    let curr = parseFloat(calc["currentInput"])
    if (isNaN(prev) || isNaN(curr)) return
    let answer;

    if (symbol === "+") {
        answer = add(prev, curr);
    } else if (symbol === "-") {
        answer = subtract(prev, curr);
    } else if (symbol === "×") {
        answer = multiply(prev, curr);
    } else if (symbol === "÷") {
        answer = divide(prev, curr);
    }

    calc["currentInput"] = answer.toString();
    return answer;
}

let chooseOperator = function (operator) {
    if (calc["previousInput"] !== '0'){
        compute()
    }
    calc["previousInput"] = calc["currentInput"];
    calc["currentInput"] = '0';
    resultFigure.innerText = calc["currentInput"];
    
    if (operator === "+"){
        calc["operator"] = "+";
    } else if (operator === "-") {
        calc["operator"] = "-";
    } else if (operator === "×") {
        calc["operator"] = "*";
    } else if (operator === "÷") {
        calc["operator"] = "/";
    }
    return
}

// Event Listeners
clearBtn.addEventListener('click', () => {
    clear();
    updateDisplay();
});

numBtns.forEach((button) => 
    button.addEventListener('click', () => appendNumber(button.innerText)));

operatorBtns.forEach((operator) => 
    operator.addEventListener('click', () => chooseOperator(operator.innerText)));

equalsBtn.addEventListener('click', () => {
    compute();
    updateDisplay();
});