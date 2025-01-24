// Выбираем дисплей и кнопки
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

// Переменные для работы калькулятора
let currentNumber = '';
let previousNumber = '';
let operator = null;

// Обработчик нажатий кнопок
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const value = button.textContent;

        if (!action) {
            // Нажата цифра или точка
            handleNumber(value);
        } else {
            // Нажата функциональная кнопка
            handleAction(action);
        }
        updateDisplay();
    });
});

// Функция для обновления дисплея
function updateDisplay() {
    if (operator && previousNumber) {
        // Показываем операцию в формате "предыдущее число оператор текущее число"
        display.value = `${previousNumber} ${getOperatorSymbol(operator)} ${currentNumber || ''}`;
    } else {
        // Показываем только текущее число
        display.value = currentNumber || '0';
    }
}

// Обработка чисел
function handleNumber(value) {
    if (value === '.' && currentNumber.includes('.')) return; // Не даем юзеру вводить две точки
    currentNumber += value;
}

// Обработка функциональных кнопок
function handleAction(action) {
    switch (action) {
        case 'clear':
            currentNumber = '';
            previousNumber = '';
            operator = null;
            break;
        case 'sign':
            if (currentNumber) currentNumber = String(-parseFloat(currentNumber));
            break;
        case 'add':
        case 'subtract':
        case 'multiply':
        case 'divide':
            if (currentNumber) {
                if (previousNumber) calculate();
                operator = action;
                previousNumber = currentNumber;
                currentNumber = '';
            }
            break;
        case 'equals':
            if (previousNumber && operator) calculate();
            operator = null;
            break;
    }
}

// Выполнение расчёта
function calculate() {
    const a = parseFloat(previousNumber);
    const b = parseFloat(currentNumber);
    if (isNaN(a) || isNaN(b)) return;

    switch (operator) {
        case 'add':
            currentNumber = String(a + b);
            break;
        case 'subtract':
            currentNumber = String(a - b);
            break;
        case 'multiply':
            currentNumber = String(a * b);
            break;
        case 'divide':
            currentNumber = b === 0 ? 'Ошибка' : String(a / b);
            break;
    }
    previousNumber = '';
}

// Получаем символ оператора для отображения на дисплее
function getOperatorSymbol(operator) {
    switch (operator) {
        case 'add': return '+';
        case 'subtract': return '−';
        case 'multiply': return '×';
        case 'divide': return '÷';
        default: return '';
    }
}