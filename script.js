'use strict';

// генерация числа
const randomNumber = function (min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
};

// проверка на число
const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const numberGame = function() {
    const hideNumber = randomNumber(1, 100);
    const startGame = function() {
        const enteredNumber = prompt('Угадай число от 1 до 100');

        if (enteredNumber === null) {
            alert('Игра окончена');

        } else if (isNumber(enteredNumber)) {
            if (enteredNumber > hideNumber) {
                alert('Загаданное число меньше');
                startGame();
            } else if (enteredNumber < hideNumber) {
                alert('Загаданное число больше');
                startGame();
            } else {
                alert('Поздравляю, Вы угадали!!!');
            }
            
        } else {
            alert('Введи число!');
            startGame();
        }
    };

    startGame();
};

numberGame();
    
