/*Variables */

let displayValue = '0';
let expression = '';

/*DOM elements */
const display = document.querySelector('#calculator-display');
const backspaceButton = document.querySelector('#backspace');
const clearButton = document.querySelector('#clear');
const operateButton = document.querySelector('#operate');
const numberButtons = document.querySelectorAll('.container button[type="button"][value]');

//TO DO: Add keyboard support
//TO DO: Add decimal point support
//TO DO: Add negative number support
//TO DO: Add percentage support
//TO DO: Display overflow support

//Backspace button click event listener
backspaceButton.addEventListener('click', handleBackspace);

//Operate button click event listener
operateButton.addEventListener('click', handleOperation);

//Clear button click event listener
clearButton.addEventListener('click', handleClear);

//Number button click event listener
numberButtons.forEach(button => {
    button.addEventListener('click', function(){
        if (displayValue === '0' || displayValue === 'Error') {
            displayValue = button.value;
            //If the first button is an operator, don't add it to the expression
            if (button.classList.contains('operator')){
                displayValue = 'Error';
            } else {
                expression = button.value;
            }
        } else {
            //If the button is an operator, add spaces around it
            if (button.classList.contains('operator')){
                //If the last character is an operator, replace it with the new one
                if (expression.slice(-1) === ' '){ 
                    expression = expression.slice(0, -3);
                    displayValue = displayValue.slice(0, -1);
                    expression += ' ' + button.value + ' ';
                } else { //If the last character is a number, add the new operator
                    expression += ' ' + button.value + ' ';
                }
            } else {
                expression += button.value;
            }
            displayValue += button.value;
        }
        updateDisplay();
    });
});

//Clear button click event function
function handleClear(){
    displayValue = '0';
    expression = '';
    updateDisplay();
}

//Backspace button click event function
function handleBackspace(){
    if(displayValue.length > 1){
            //If the last character is an operator, remove the spaces around it
            if (expression.slice(-1) === ' '){
                expression = expression.slice(0, -3);
            } else { //If the last character is a number, remove it
                expression = expression.slice(0, -1);
            }
            displayValue = displayValue.slice(0, -1);
        }
        else{
            displayValue = '0';
            expression = '';
        }
        updateDisplay(); 
}

//Operate button click event function
function handleOperation(){
    const expressionArray = expression.split(' ');
    //Evaluate expression by pairs until there's one result
    while (expressionArray.length > 1){
        let operation = expressionArray.splice(0, 3);
        let result = operate(operation[1], parseFloat(operation[0]), parseFloat(operation[2]));
        expressionArray.unshift(result.toFixed(2));
        //If the result is an error, stop the loop
        if (expressionArray[0] === 'NaN'){
            break;
        }
    }
    //If the result is an error, clear the display  
    if (expressionArray[0] === 'NaN'){
        displayValue = 'Error';
        expression = '';
        updateDisplay();
    } else{ //If the result is a number, update the display
        expression = expressionArray[0].toString();
        displayValue = expressionArray[0].toString();
        updateDisplay();
    }
    
}

/* Assignment letter a) Math functions */
function add(number1, number2){
    const result = number1 + number2;
    return result;
}

function subtract(number1, number2){
    const result = number1 - number2;
    return result;
}

function multiply(number1, number2){
    const result = number1 * number2;
    return result;
}

function divide(number1, number2){
    if (number2 === 0) {
        return NaN
    } else {
        const result = number1 / number2;
        return result;
    }
}

function percent(number1, number2){
    const result = (number1 / 100) * number2;
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

/*Assignmet letter d) display update */

function updateDisplay() {
    display.innerText = displayValue;
}

// Initial display update
updateDisplay();

