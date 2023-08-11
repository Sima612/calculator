/*Variables */

let displayValue = '0';
let expression = '';
let decimalAdded = false;

/*DOM elements */
const display = document.querySelector('#calculator-display');
const backspaceButton = document.querySelector('#backspace');
const clearButton = document.querySelector('#clear');
const operateButton = document.querySelector('#operate');
const numberButtons = document.querySelectorAll('.container button[type="button"][value]');
const decimalButton = document.querySelector('#decimal');
const changeSignalButton = document.querySelector('#change-signal');

//TO DO: Add percentage support
//TO DO: Fix screen behavior when input cames from key board


//Backspace button click event listener
backspaceButton.addEventListener('click', handleBackspace);

//Operate button click event listener
operateButton.addEventListener('click', handleOperation);

//Clear button click event listener
clearButton.addEventListener('click', handleClear);

// Decimal button click event listener
decimalButton.addEventListener('click', handleDecimal);

// Change signal button click event listener
changeSignalButton.addEventListener('click', handleChangeSignal);


//Number button click event listener
numberButtons.forEach(button => {
    button.addEventListener('click', function(){
        
        if (displayValue.length < 10) {

            if (displayValue === '0' || displayValue === 'Error') {
                if(button.value.includes('.')){
                    handleDecimal();
                }
                displayValue = button.value;
                if (button.classList.contains('operator')) {
                    displayValue = 'Error';
                } else {
                    expression = button.value;
                }
            } else {
                if (button.classList.contains('operator')) {
                    if (expression.slice(-1) === ' '){
                        expression = expression.slice(0, -3);
                        displayValue = displayValue.slice(0, -1);
                        expression += ' ' + button.value + ' ';
                    } else {
                        expression += ' ' + button.value + ' ';
                    }
                    decimalAdded = false;
                } else {
                    expression += button.value;
                }
                displayValue += button.value;
            }
            updateDisplay();
        }
    });
});


//Clear button click event function
function handleClear() {
    displayValue = '0';
    expression = '';
    decimalAdded = false;
    updateDisplay();
}

//Backspace button click event function
function handleBackspace() {
    if (displayValue.length > 1) {
        //If the last character is an operator, remove the spaces around it
        if (expression.slice(-1) === ' ') {
            expression = expression.slice(0, -3);
        } else { //If the last character is a number, remove it
            expression = expression.slice(0, -1);
        }
        //If the last character was a decimal, set decimalAdded to false
        if (displayValue.slice(-1) === '.') {
            decimalAdded = false;
        }
        displayValue = displayValue.slice(0, -1);
    }
    else {
        displayValue = '0';
        expression = '';
    }
    updateDisplay();
}

//Decimal button click event function

function handleDecimal(){
    if(!decimalAdded){
        expression += '.';
        displayValue += '.';
        decimalAdded = true;
        updateDisplay();
    } else{
        return;
    }
};

/* Change signal button click event function */
function handleChangeSignal() {
    if (displayValue !== '0') {
        if (displayValue[0] === '-') {
            displayValue = displayValue.slice(1);
        } else {
            displayValue = '-' + displayValue;
        }
        if (expression.includes(' ')) {
            const parts = expression.split(' ');
            parts[parts.length - 1] = displayValue;
            expression = parts.join(' ');
        } else {
            expression = displayValue;
        }
        updateDisplay();
    };
};

//Operate button click event function
function handleOperation() {
    const expressionArray = expression.split(' ');
    //Evaluate expression by pairs until there's one result
    while (expressionArray.length > 1) {
        let operation = expressionArray.splice(0, 3);
        let result = operate(operation[1], parseFloat(operation[0]), parseFloat(operation[2]));
        expressionArray.unshift(result.toFixed(2));
        //If the result is an error, stop the loop
        if (expressionArray[0] === 'NaN') {
            break;
        }
    }
    //If the result is an error, clear the display  
    if (expressionArray[0] === 'NaN') {
        displayValue = 'Error';
        expression = '';
        updateDisplay();
    } else { //If the result is a number, update the display
        expression = expressionArray[0].toString();
        displayValue = expressionArray[0].toString();
        updateDisplay();
    }
    console.log(expressionArray)
};

/* Number button click event function */
function handleNumberInput(number) {
    if (displayValue === '0' || displayValue === 'Error') {
        if (number === '.') {
            displayValue = '0.';
            expression = '0.';
            decimalAdded = true;
        } else {
            displayValue = number;
            expression = number;
        }
    } else {
        displayValue += number;
        expression += number;
    }
    updateDisplay();
};

/*Operator button click event function */

function handleOperatorInput(operator) {
    if (displayValue !== 'Error') {
        if (expression.slice(-1) === ' ') {
            expression = expression.slice(0, -3);
        } else {
            expression += ' ';
        }

        if (expression.includes(' ')) {
            const parts = expression.split(' ');
            if (parts.length === 3) {
                const result = operate(parts[1], parseFloat(parts[0]), parseFloat(parts[2]));
                expression = result.toFixed(2) + ' ' + operator + ' ';
                displayValue = result.toFixed(2);
            } else {
                expression += operator + ' ';
                displayValue = parts[0] + operator;
            }
        } else {
            expression += operator + ' ';
            displayValue = operator;
        }

        decimalAdded = false;
        updateDisplay();
    };
};



/* Assignment letter a) Math functions */
function add(number1, number2) {
    const result = number1 + number2;
    return result;
};

function subtract(number1, number2) {
    const result = number1 - number2;
    return result;
};

function multiply(number1, number2) {
    const result = number1 * number2;
    return result;
};

function divide(number1, number2) {
    if (number2 === 0) {
        return NaN
    } else {
        const result = number1 / number2;
        return result;
    };
};

function percent(number1, number2) {
    const result = (number1 / 100) * number2;
    return result;
};

/*Assignment letter b) operate function */

function operate(operator, number1, number2) {
    let result;
    switch (operator) {
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

// Keyboard support
document.addEventListener('keydown', function (event) {
    const key = event.key;
    switch (key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            handleNumberInput(key);
            break;
        case '+':
        case '-':
        case '':
        case '/':
        case '*':
            handleOperatorInput(key);
            break;
        case '=':
        case 'Enter':
            event.preventDefault();
            handleOperation();
            break;
        case ',':
            handleDecimal();
            break;
        case 'Backspace':
            handleBackspace();
            break;
    };
});

/*Assignmet letter d) display update */

function updateDisplay() {
    let displayLenght = displayValue.slice(0, 11);
    display.innerText = displayLenght;
};

// Initial display update
updateDisplay();


