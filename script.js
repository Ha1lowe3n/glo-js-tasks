'use strict';

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const income = "Frilance",
  mission = 1000000,
  period = 8,
  addExpenses = prompt('Перечислите возможные расходы через запятую', 
  'Квартплата, проездной, кредит'),
  deposit = confirm('Есть ли у вас депозит в банке?');

let money;

const start = function() {

  do {
    money = prompt('Ваш месячный доход?');
  }
  while (!isNumber(money) || money.trim() === '' || money === null);
};
start();

let budgetDay = Math.round(money / 30);

let expenses = [];

const getExpensesMonth = function() {
  let sum = 0;
  let b;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов?');
    
    b = prompt('Во сколько это обойдется?');

    while (!isNumber(b) || b.trim() === '' || b === null) {
      b = prompt('Во сколько это обойдется?');
    }

    sum += parseFloat(b);
    
  }
  console.log(expenses);

  return sum;
};

let expensesAmount = getExpensesMonth();

const getAccumulatedMonth = function() {
  return money - expensesAmount;
};
const accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function() {
  return mission / accumulatedMonth;
};
const targetMonth = getTargetMonth();

budgetDay = accumulatedMonth / 30;

const showTypeOf = function(name) {
  return typeof(name);
};

console.log(`${showTypeOf(money)}, ${showTypeOf(income)}, ${showTypeOf(deposit)}`);

console.log(`Расходы за месяц: ${expensesAmount}`);

console.log(addExpenses.toLowerCase().split(', '));

if (targetMonth >= 0) {
  console.log(`Cрок достижения цели в месяцах: ${targetMonth}`);
} else {
  console.log(`Цель не будет достигнута`);
}
   
console.log(`Бюджет на день: ${budgetDay}`);

const getStatusIncome = function() {
  if (budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
  } else if (1200 > budgetDay >= 600) {
    return ('У вас средний уровень дохода');
  } else if (600 > budgetDay >= 0) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else {
    return ('Что то пошло не так');
  }
};

console.log(getStatusIncome());




