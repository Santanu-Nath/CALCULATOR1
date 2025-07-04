const resultElement = document.getElementById('result');
const clearBtn = document.getElementById('clear-button');
const deleteBtn = document.getElementById('delete-button');
const divideBtn = document.getElementById('divide-button');
const multiplyBtn = document.getElementById('multiply-button');
const subtractBtn = document.getElementById('subtract-button');
const addBtn = document.getElementById('add-button');
const decimalBtn = document.getElementById('decimal-button');
const equalBtn = document.getElementById('equal-button');
const numberBtns = document.querySelectorAll('.number');

//initialize the variables
let result = '';
let operation = '';
let previousOperand = 0;

// Example 24 + 5 
// operation = +
// previousOperand  = 24
// result = 29

//function to append number
const appendNumber = (number) => {
    if(number ==='.' && result.includes('.')) return;
    result += number;
    updateDisplay();
}

//Function to update display
const updateDisplay = () => {
    if(operation){
        resultElement.innerText = `${previousOperand} ${operation} ${result}`;
    }
    else{
    resultElement.innerText = result;
    }
}

//function to select operators
const selectOperator = (operatorValue) => {
    if (result === '') return;

    if(operation !== '' && previousOperand !== '') {
        calculateResult();
    }
    operation = operatorValue;
    previousOperand = result;
    result = '';
    updateDisplay();
}

//function to calculate result
const calculateResult = () => {
    let evaluatedResult;
    const prev = parseFloat(previousOperand);   
    const current = result;

    if(isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            evaluatedResult = prev + current;
            break;
        case '-':
            evaluatedResult = prev - current;
            break;
        case '*':
            evaluatedResult = prev * current;
            break;
        case '/':
            evaluatedResult = prev / current;
            break;
        default:
            break;    
    }

    result = evaluatedResult.toString();
    operation = '';
    previousOperand = '';

}

//Add event listener to number button
numberBtns.forEach(button =>{
    button.addEventListener('click', ()=> {
        //console.log(button.innerText);
         appendNumber(button.innerText);
    });
});

//function to clear display
const clearDisplay = () => {
    result = '';
    previousOperand = '';
    operation = '';
    updateDisplay();
}

//function to  delete last digit
const deleteLastDigit = () => {
    if(result === '') return;
    result = result.slice(0,-1);
    updateDisplay();
}

decimalBtn.addEventListener('click', () => appendNumber('.'));
addBtn.addEventListener('click', () => selectOperator('+'));
subtractBtn.addEventListener('click', () => selectOperator('-'));
multiplyBtn.addEventListener('click', () => selectOperator('*'));
divideBtn.addEventListener('click', () => selectOperator('/'));
equalBtn.addEventListener('click', () => {
    if(result === '') return;
    calculateResult();
    updateDisplay();
});

clearBtn.addEventListener('click', clearDisplay);
deleteBtn.addEventListener('click', deleteLastDigit);
