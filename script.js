'use strict';

// Кнопку "Рассчитать" через id
const btnStart = document.querySelector('#start');

// Кнопки “+” (плюс) через Tag, каждую в своей переменной 
const btnIncome = document.querySelectorAll('button')[0],
      btnExspenses = document.querySelectorAll('button')[1];

// Чекбокс по id через querySelector
const checkBox = document.querySelector('#deposit-check');

// Поля для ввода возможных доходов (additional_income-item) при помощи querySelectorAll
const addIncomeItem = document.querySelectorAll('.additional_income-item');

// Каждый элемент в правой части программы через класс(не через querySelector), которые имеют в имени класса "-value", начиная с class="budget_day-value" и заканчивая class="target_month-value">
const budgetDayValue = document.getElementsByClassName('budget_day-value'),
      expensesMonthValue = document.getElementsByClassName('expenses_month-value'),
      addIncomeValue = document.getElementsByClassName('additional_income-value'),
      addExpensesValue = document.getElementsByClassName('additional_expenses-value'),
      incomePeriodValue = document.getElementsByClassName('income_period-value'),
      targetMonthValue = document.getElementsByClassName('target_month-value');

// Оставшиеся поля через querySelector каждый в отдельную переменную: поля ввода (input) с левой стороны и не забудьте про range.
const periodSelect = document.querySelector('.period-select'),
      salaryAmount = document.querySelector('.salary-amount'),
      incomeItems = document.querySelector('.income-items'),
      expensesItems = document.querySelector('.expenses-items'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent'),
      targetAmount = document.querySelector('.target-amount');


// функция для правильного окончания слов
const declination = function(number, txt) {
  let cases = [2, 0, 1, 1, 1, 2];
  return txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isString = function(n) {
  return typeof(n) !== 'string' || isNumber(n) || n.trim() === '' || n === null;
};

let money;

const start = function() {
  do {
    money = prompt('Ваш месячный доход?', 50000);
  }
  while (!isNumber(money) || money.trim() === '' || money === null);
};
start();

const appData = {
  income: {}, // дополнительные доходы
  addIncome: [], // печисляем доп. доходы
  expenses: {}, // доп. расходы
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 1000000,
  period: 3,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function() {
    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome = prompt('Какой у вас дополнительный заработок', 'Такси');
      
      while (isString(itemIncome)) {
        itemIncome = prompt('Какой у вас дополнительный заработок', 'Такси');
      }

      let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 20000);

      while (!isNumber(cashIncome) || cashIncome.trim() === '' || cashIncome === null) {
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 20000);
      }

      appData.income[itemIncome] = cashIncome;
    }

    const addExpenses = prompt('Перечислите возможные расходы через запятую', 'Квартплата, проездной, кредит');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) {
      let expensesStr;

      if (i === 0) {
        expensesStr = 'Детский сад';
      } else {
        expensesStr = 'ЖКХ';
      }

      let a = prompt(`Введите обязательную статью расходов?`, `${expensesStr}`);

      while (isString(a)) {
        a = prompt(`Введите обязательную статью расходов?`, `${expensesStr}`);
      }

      let b = prompt('Во сколько это обойдется?');
      
      while (!isNumber(b) || b.trim() === '' || b === null) {
        b = prompt('Во сколько это обойдется?');
      }

      appData.expenses[a] = b;
    }
  },

  getExpensesMonth: function() {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },

  getBudget: function() {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: function() {
    return Math.ceil(appData.mission / appData.budgetMonth);
  },

  getStatusIncome: function() {
    if (appData.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (1200 > appData.budgetDay >= 600) {
      return ('У вас средний уровень дохода');
    } else if (600 > appData.budgetDay >= 0) {
      return ('К сожалению, у вас уровень дохода ниже среднего');
    } else {
      return ('Что то пошло не так');
    }
  },

  getInfoDeposit: function() {
    if (appData.deposit) {
      appData.percentDeposit = prompt('Какой годовой процент?', 10);

      while (!isNumber(appData.percentDeposit) || appData.percentDeposit.trim() === '' || appData.percentDeposit === null) {
        appData.percentDeposit = prompt('Какой годовой процент?', 10);
      }

      appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);

      while (!isNumber(appData.moneyDeposit) || appData.moneyDeposit.trim() === '' || appData.moneyDeposit === null) {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
    }
  },

  calcSavedMoney: function() {
    return appData.budgetMonth * appData.period;
  }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

const numberMonth = appData.getTargetMonth();

console.log(`Расходы за месяц: ${appData.expensesMonth}`);
console.log(`Цель будет достигнута за ${appData.getTargetMonth()} ${declination(numberMonth, ['месяц', 'месяца', 'месяцев'])}`);
console.log(`${appData.getStatusIncome()}`);

for (let key in appData) {
  console.log(`Наша программа включает в себя данные: ${key} - ${appData[key]}`);
}

console.log(appData.addExpenses.map(function(item) {
  return item[0].toUpperCase() + item.slice(1);
}).join(', '));











