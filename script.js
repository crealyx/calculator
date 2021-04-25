const wrapper = document.querySelector('.wrapper');
const display = document.querySelector('#display')
const buttons = Array.from(document.querySelectorAll('button'))
const operatorArray = Array.from(document.querySelectorAll('.operator'))


let operators = [];
operatorArray.forEach(operator => {
    operators.push(operator.outerText);
});

let displayValue = '';
let displayValue2 = '';
let operator = '';
let equation = false;
// Math functions
let add = (num1,num2) => parseInt(num1) + parseInt(num2);
let subtract = (num1,num2) => parseInt(num1) - parseInt(num2);
let divide = (num1,num2) => parseInt(num1) / parseInt(num2);
let multiply = (num1,num2) => parseInt(num1) * parseInt(num2);

// Add listener to wrapper that returns only button clicks
wrapper.addEventListener('click', e => {
    let pressed = e.target;
    let pressedButton = e.target.textContent;
    let pressedType = e.target.tagName;
    

    if(pressedButton === 'CLEAR'){
        clearAll();
        display.textContent = '';
    }

    for (let i = 0; i < operators.length; i++) {
        if(pressedButton === operators[i]){
            if(displayValue2 !== ''){
                displayValue = operate(operator,displayValue,displayValue2);
                display.textContent = displayValue;
                displayValue2 = '';
                operator = operators[i];
            }else{
                operator = operators[i];
            }
        }
        
    }
    

    if(pressedType === 'BUTTON' && pressed.classList.value === 'number'){
        if(operator === ''){
            if(equation){
                displayValue = '';
                equation = false;
            }
            displayValue += pressedButton;
            display.textContent = displayValue;
        }
        if(operator === '+' || operator === '-' || operator === '/' || operator === '*'){

            display.textContent = '';
            displayValue2 += pressedButton;
            display.textContent = displayValue2;
        }   
    }

    // remove displayValue if user presses a number after an equation
    // keep displayValue if user presses a operator after an equation
    if(pressedButton === '='){
        displayValue = operate(operator,displayValue,displayValue2);
        display.textContent = displayValue;
        displayValue2 = '';
        operator = '';
        equation = true;
    }
})

// Operate function
function operate (operator,num1,num2){
    return operator === '+' ? add(num1,num2)
        : operator === '-' ? subtract(num1,num2)
        : operator === '/' ? divide(num1,num2)
        : operator === '*' ? multiply(num1,num2)
    : false;
}

function clearAll() {
    displayValue = '';
    displayValue2 = '';
    operator = '';
}