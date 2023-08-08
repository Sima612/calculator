/*Variables */

let displayValue = '0';

/*DOM elements */
const display = document.querySelector('#calculator-display');

/* Assignment letter a) Math functions */

function add(number1, number2){
    return number1 + number2;
};

function subtract(number1, number2){
    return number1 - number2;
};

function multiply(number1, number2){
    return number1 * number2;
};

function divide(number1, number2){
    if(number2 === 0){
        return number1
    } else{
    return number1 / number2;
    };
};

function percent(number1,number2){
    return (number1 / 100) * number2;
};

/*Assignmet letter b) operate function */

function operate(operator, number1, number2){
    switch(operator) {
        case '+':
            return add(number1, number2);
            break;
        case '-':
            return subtract(number1, number2);
            break;
        case '*':
            return multiply(number1, number2);
            break;
        case '/':
            return divide(number1, number2);
            break;
    };
};

/*Assignmet letter d) display atualization */

display.innerText = displayValue;
