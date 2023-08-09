/*Variables */

let displayValue = '0';

/*DOM elements */
const display = document.querySelector('#calculator-display');
const backspaceButton = document.querySelector('#backspace');
const numberButtons = document.querySelectorAll('.container button[type="button"][value]');

//Backspace button click event listener
backspaceButton.addEventListener('click', handleBackspace);

//Number button click event listener
numberButtons.forEach(button => {
    button.addEventListener('click',() => handleNumberButtonClick(button.value));
});

//Backspace button click event handler
function handleBackspace(){
    if(displayValue.length > 1){
            displayValue = displayValue.slice(0, -1);
        }
        else{
            displayValue = '0';
        }
        updateDisplay();
    
}

// function updateDispaly(){
//     display.innerText = dispalyValue;
// }
function handleNumberButtonClick(number) {
    if (displayValue === '0' || displayValue === 'Error') {
        displayValue = number;
    } else {
        displayValue += number;
    }
    updateDisplay();
}


/* Assignment letter a) Math functions */
function add(number1, number2){
    const result = number1 + number2;
    displayValue = result.toString();
    updateDisplay();
    return result;
}

function subtract(number1, number2){
    const result = number1 - number2;
    displayValue = result.toString();
    updateDisplay();
    return result;
}

function multiply(number1, number2){
    const result = number1 * number2;
    displayValue = result.toString();
    updateDisplay();
    return result;
}

function divide(number1, number2){
    if (number2 === 0) {
        return number1;
    } else {
        const result = number1 / number2;
        displayValue = result.toString();
        updateDisplay();
        return result;
    }
}

function percent(number1, number2){
    const result = (number1 / 100) * number2;
    displayValue = result.toString();
    updateDisplay();
    return result;
}

/*Assignment letter b) operate function */

function operate(operator, number1, number2){
    let result;
    switch(operator) {
        case '+':
            result = add(number1, number2);
            break;
        case '-':
            result = subtract(number1, number2);
            break;
        case '*':
            result = multiply(number1, number2);
            break;
        case '/':
            result = divide(number1, number2);
            break;
    }
    return result;
}

/*Assignmet letter d) display atualization */

function updateDisplay() {
    display.innerText = displayValue;
}

// Initial display update
updateDisplay();

