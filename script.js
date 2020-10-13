'use strict';

const income = "Frilance",
  mission = 1000000,
  period = 8;


// lesson 3 
const money = +prompt('Ваш месячный доход?'),
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит'),
  deposit = confirm('Есть ли у вас депозит в банке?');

console.log(typeof money + ', ' + typeof income + ', ' + typeof deposit);

let budgetDay = Math.round(money / 30);
  

const expensesOne = prompt('Введите обязательную статью расходов?'),
  amountOne = prompt('Во сколько это обойдется?'),
  expensesTwo = prompt('Введите обязательную статью расходов?'),
  amountTwo = prompt('Во сколько это обойдется?');


// lesson 4
const getExpensesMonth = () => {
  return +amountOne + +amountTwo;
};

const getAccumulatedMonth = () => {
  return +money - +amountOne - +amountTwo;
};

const accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = () => {
  return mission / accumulatedMonth;
};

budgetDay = accumulatedMonth / 30;

const showTypeOf = (name) => {
  return typeof(name);
};

console.log(`${showTypeOf(money)}, ${showTypeOf(income)}, ${showTypeOf(deposit)}`);

console.log(`Расходы за месяц: ${getExpensesMonth()}`);

console.log(addExpenses.toLowerCase().split(', '));

console.log(`Cрок достижения цели в месяцах: ${getTargetMonth()}`);

console.log(`Бюджет на день: ${budgetDay}`);

const getStatusIncome = () => {
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












