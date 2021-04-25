const wrapper = document.querySelector('.wrapper');
const display = document.querySelector('#display')
const buttons = Array.from(document.querySelectorAll('button'))
const operators = Array.from(document.querySelectorAll('.operator'))

let displayValue = '';
let displayValue2 = '';
let operator = '';

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
        displayValue = '';
        displayValue2 = '';
        display.textContent = '';
    }


    if(pressedType === 'BUTTON' && operator === '' && pressed.classList.value === 'number'){
        displayValue += pressedButton;
        display.textContent = displayValue;
    }

    if(pressedType === 'BUTTON' && operator === '+' && pressed.classList.value === 'number'){
        displayValue2 += pressedButton;
        display.textContent = displayValue2;
    }

    if(pressedType === 'BUTTON' && operator === '-' && pressed.classList.value === 'number'){
        displayValue2 += pressedButton;
        display.textContent = displayValue2;
    }

    

    if(pressedButton === '+'){
        if(displayValue2 !== ''){
            displayValue = operate(operator,displayValue,displayValue2);
            display.textContent = displayValue;
            displayValue2 = '';
            operator = '+';
        }else{
            operator = '+';
            display.textContent = '';
        }
    }


    if(pressedButton === '-'){
        if(displayValue2 !== ''){
            displayValue = operate(operator,displayValue,displayValue2);
            display.textContent = displayValue;
            displayValue2 = '';
            operator = '-';
        }else{
            operator = '-';
            display.textContent = '';
        }
    }

    if(pressedButton === '='){
        display.textContent = operate(operator,displayValue,displayValue2);
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

