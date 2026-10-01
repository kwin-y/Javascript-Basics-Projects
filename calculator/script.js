//arithmetic
function add(a, b) {
    return a + b;
}


function subtract(a, b) {
    return a - b;
}


function multiply(a, b) {
    return a * b;
}


function divide(a, b) {

    if (b === 0) {
        return "Nice try!";
    }

    return a / b;
}


//operate function

function operate(operator, a, b) {

    switch (operator) {

        case "+":
            return add(a, b);

        case "-":
            return subtract(a, b);

        case "*":
            return multiply(a, b);

        case "/":
            return divide(a, b);

        default:
            return null;
    }
}


//variables of calculator

let firstNumber = "";
let operator = "";
let secondNumber = "";

let shouldResetDisplay = false;


//html elements

const display = document.querySelector(".display");

const numberButtons =
    document.querySelectorAll(".number");

const operatorButtons =
    document.querySelectorAll(".operator");

const equalsButton =
    document.querySelector(".equals");

const clearButton =
    document.querySelector(".clear");

const decimalButton =
    document.querySelector(".decimal");

const backspaceButton =
    document.querySelector(".backspace");


//format result

function formatResult(result) {

    if (typeof result !== "number") {
        return result;
    }

    // Prevent extremely long decimal answers
    return Math.round(result * 100000000) / 100000000;
}


//calculate

function calculate() {

    // Make sure all three parts exist
    if (
        firstNumber === "" ||
        operator === "" ||
        secondNumber === ""
    ) {
        return;
    }


    const a = Number(firstNumber);
    const b = Number(secondNumber);


    let result = operate(operator, a, b);


    // Round long decimal answers
    result = formatResult(result);


    // Store result as the new first number
    firstNumber = result.toString();

    // Empty second number
    secondNumber = "";


    // Show result
    display.textContent = result;


    // Next number starts a new calculation
    shouldResetDisplay = true;
}


//number buttons

numberButtons.forEach(button => {

    button.addEventListener("click", () => {

        const number = button.textContent;


        // If a calculation was just completed,
        // pressing a number starts a new calculation
        if (shouldResetDisplay) {

            firstNumber = "";
            secondNumber = "";
            operator = "";

            shouldResetDisplay = false;
        }


        // Entering first number
        if (operator === "") {

            firstNumber += number;

            display.textContent = firstNumber;
        }


        // Entering second number
        else {

            secondNumber += number;

            display.textContent = secondNumber;
        }

    });

});


//operator buttons

operatorButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Do nothing if there is no first number
        if (firstNumber === "") {
            return;
        }


        // If there is already a second number,
        // calculate before using the new operator
        if (
            operator !== "" &&
            secondNumber !== ""
        ) {

            calculate();
        }


        // Store the new operator
        operator = button.textContent;


        // The result should now be ready for another number
        shouldResetDisplay = false;

    });

});


//equals button

equalsButton.addEventListener("click", () => {

    calculate();

});


//clear button

clearButton.addEventListener("click", () => {

    firstNumber = "";
    operator = "";
    secondNumber = "";

    shouldResetDisplay = false;

    display.textContent = "0";

});


//decimal button

decimalButton.addEventListener("click", () => {

    // If previous calculation ended, start a new number
    if (shouldResetDisplay) {

        firstNumber = "";
        secondNumber = "";
        operator = "";

        shouldResetDisplay = false;
    }


    // Entering decimal into first number
    if (operator === "") {

        if (!firstNumber.includes(".")) {

            // If nothing has been entered,
            // start with 0.
            if (firstNumber === "") {
                firstNumber = "0";
            }

            firstNumber += ".";

            display.textContent = firstNumber;
        }

    }


    // Entering decimal into second number
    else {

        if (!secondNumber.includes(".")) {

            if (secondNumber === "") {
                secondNumber = "0";
            }

            secondNumber += ".";

            display.textContent = secondNumber;
        }

    }

});


//backspace
backspaceButton.addEventListener("click", () => {

    // Do nothing if showing a completed result
    if (shouldResetDisplay) {
        return;
    }


    // Remove from first number
    if (operator === "") {

        firstNumber =
            firstNumber.slice(0, -1);

        if (firstNumber === "") {
            display.textContent = "0";
        }

        else {
            display.textContent = firstNumber;
        }

    }


    // Remove from second number
    else {

        secondNumber =
            secondNumber.slice(0, -1);

        if (secondNumber === "") {
            display.textContent = "0";
        }

        else {
            display.textContent = secondNumber;
        }

    }

});


//keyboard support

document.addEventListener("keydown", event => {

    const key = event.key;


    // Numbers
    if (key >= "0" && key <= "9") {

        const button =
            document.querySelector(
                `.number:nth-of-type(${Number(key)})`
            );

        handleKeyboardNumber(key);
    }


    // Operators
    else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/"
    ) {

        handleKeyboardOperator(key);
    }


    // Equals
    else if (key === "Enter" || key === "=") {

        calculate();
    }


    // Decimal
    else if (key === ".") {

        decimalButton.click();
    }


    // Backspace
    else if (key === "Backspace") {

        backspaceButton.click();
    }


    // Clear
    else if (key === "Escape") {

        clearButton.click();
    }

});


//keyboard number function

function handleKeyboardNumber(number) {

    if (shouldResetDisplay) {

        firstNumber = "";
        secondNumber = "";
        operator = "";

        shouldResetDisplay = false;
    }


    if (operator === "") {

        firstNumber += number;

        display.textContent = firstNumber;
    }

    else {

        secondNumber += number;

        display.textContent = secondNumber;
    }

}


//keyboard ooperator function

function handleKeyboardOperator(selectedOperator) {

    if (firstNumber === "") {
        return;
    }


    if (
        operator !== "" &&
        secondNumber !== ""
    ) {

        calculate();
    }


    operator = selectedOperator;

    shouldResetDisplay = false;

}