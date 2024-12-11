// Получаем баланс из LocalStorage или устанавливаем 500 по умолчанию
let currenBalanceDisplay = document.querySelector('.balance--count');
let savedBalance = localStorage.getItem('balance');

// Проверяем, есть ли значение в LocalStorage и валидируем его как число
let currenBalance = savedBalance !== null && !isNaN(parseInt(savedBalance)) ? parseInt(savedBalance) : 500;

// Отображаем баланс на странице balance.html
if (currenBalanceDisplay) {
    currenBalanceDisplay.textContent = currenBalance;
}

let balanceText = document.querySelector('.balance--text');
balanceText.style.fontSize = '25px';
balanceText.style.textAlign = 'center';
balanceText.style.textTransform = 'uppercase';

// Логика для внесения суммы на странице deposit.html
let confirmDeposit = document.querySelector('.confirm__deposit--button');
let inputData = document.querySelector('.atm--input');

if (confirmDeposit) {
    confirmDeposit.addEventListener('click', function () {
        let enteredSumm = inputData.value.trim();

        // Проверяем, что введено только положительное целое число
        if (/^\d+$/.test(enteredSumm)) {
            enteredSumm = parseInt(enteredSumm, 10); // Преобразуем строку в число
            currenBalance += enteredSumm; // Обновляем баланс
            localStorage.setItem('balance', currenBalance); // Сохраняем баланс в LocalStorage
            setTimeout(() => {
                balanceText.textContent = `Вы внесли ${enteredSumm} ₽`;
            }, 500);
            setTimeout(() => {
                balanceText.textContent = `Ваш баланс: ${currenBalance} ₽`;
            }, 3000);
        } else {
            setTimeout(() => {
                balanceText.textContent = 'Введите корректное положительное число!';
            }, 500);
            setTimeout(() => {
                balanceText.textContent = '';
            }, 2500);
        }

        inputData.value = ""; // Очищаем поле ввода
    });
}



// Логика для выведения суммы на странице withdraw.html

let confirmWithdraw = document.querySelector('.confirm__withdraw--button');

if (confirmWithdraw) {
    confirmWithdraw.addEventListener('click', function () {
        let enteredSumm = inputData.value.trim();

        // Проверяем, что введено только положительное целое число
        if (/^\d+$/.test(enteredSumm)) {
            enteredSumm = parseInt(enteredSumm, 10); // Преобразуем строку в число

            if (currenBalance < enteredSumm) {
                setTimeout(() => {
                    balanceText.textContent = 'На карте недостаточно средств';
                }, 200);
                setTimeout(() => {
                    balanceText.textContent = '';
                }, 1500);
                setTimeout(() => {
                    balanceText.textContent = `Ваш баланс: ${currenBalance} ₽`;
                }, 1600);
            } else {
                currenBalance -= enteredSumm; // Обновляем баланс
                localStorage.setItem('balance', currenBalance); // Сохраняем баланс в LocalStorage
                setTimeout(() => {
                    balanceText.textContent = `Вы сняли ${enteredSumm} ₽`;
                }, 500);
                setTimeout(() => {
                    balanceText.textContent = `Ваш баланс: ${currenBalance} ₽`;
                }, 3000);
            }
        } else {
            setTimeout(() => {
                balanceText.textContent = 'Введите корректное положительное число!';
            }, 500);
            setTimeout(() => {
                balanceText.textContent = '';
            }, 2500);
        }

        inputData.value = ""; // Очищаем поле ввода
    });
}


// Логика для очистки поля ввода
let clearSumm = document.querySelector('.clear--button');
if (clearSumm) {
    clearSumm.addEventListener('click', function () {
        inputData.value = "";
    });
}
