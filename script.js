const wrapper = document.querySelector('.wrapper');
const display = document.querySelector('#display')
const decimal = document.querySelector('#decimal')
const buttons = Array.from(document.querySelectorAll('button'))
const operatorArray = Array.from(document.querySelectorAll('.operator'))

// Push operators to an array
let operators = [];
operatorArray.forEach(operator => {
    operators.push(operator.outerText);
});

// Initialize
let operand1 = '';
let operand2 = '';
let operator = '';
let equalPressed = false;

// Math functions
let add = (num1,num2) => parseFloat(num1) + parseFloat(num2);
let subtract = (num1,num2) => parseFloat(num1) - parseFloat(num2);
let divide = (num1,num2) => parseFloat(num1) / parseFloat(num2);
let multiply = (num1,num2) => parseFloat(num1) * parseFloat(num2);

// Listens button clicks and executes respective functions according to conditions
wrapper.addEventListener('click', e => {
    let pressed = e.target;
    let pressedButton = e.target.textContent;
    let pressedType = e.target.tagName;
    

    if(pressedButton === 'CLEAR'){
        clearAll();
    }

    if(pressedButton === 'DELETE'){
        backspace();
    }

 
    // Changes operators
    for (let i = 0; i < operators.length; i++) {
        if(pressedButton === operators[i]){
            if(operand2 !== ''){
                operand1 = operate(operator,operand1,operand2);
                display.textContent = operand1;
                operand2 = '';
                operator = operators[i];
            }else{
                operator = operators[i];
            }
        }
        
    }
    
    // Gives values to operands
    if(pressedType === 'BUTTON' && pressed.classList.value === 'number'){
        if(operator === ''){
            if(equalPressed){
                operand1 = '';
                equalPressed = false;
            }
            operand1 += pressedButton;
            display.textContent = operand1;
        }

        if(operator === '+' || operator === '-' || operator === '/' || operator === '*'){
            display.textContent = '';
            operand2 += pressedButton;
            display.textContent = operand2;
        }   

    }

    // Calculates the operands by chosen operation
    if(pressedButton === '='){
        if(operator === '/' && operand1 === '0' || operator === '/' && operand2 === '0'){
            display.textContent = 'Cant divide with zero';
        }
        else if(operand1 !== '' && operand2 !== '' && operator !== ''){
            operand1 = operate(operator,operand1,operand2);
            display.textContent = operand1;
            operand2 = '';
            operator = '';
            equation = true;
        }
    }
})

// Operations
function operate (operator,num1,num2){
    return operator === '+' ? Math.round(add(num1,num2)*100)/100
        : operator === '-' ? Math.round(subtract(num1,num2)*100)/100
        : operator === '/' ? Math.round(divide(num1,num2)*100)/100
        : operator === '*' ? Math.round(multiply(num1,num2)*100)/100
    : false;
}

// Clears everything
function clearAll() {
    operand1 = '';
    operand2 = '';
    operator = '';
    display.textContent = '0';
}

// Removes one number from the end
function backspace() {
    let array = [];
    array = display.textContent.split('');
    array.pop();
    let deleted = array.join('');
    operand1 = deleted;
    display.textContent = deleted;
    if(display.textContent === ''){
        display.textContent = 0;
    }
}