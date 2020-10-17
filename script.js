'use strict';

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

const start = function() {
  do {
    money = prompt('Ваш месячный доход?');
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
  mission: 1000000,
  period: 3,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function() {
    const addExpenses = prompt('Перечислите возможные расходы через запятую', 'Квартплата, проездной, кредит');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) {
      let a = prompt('Введите обязательную статью расходов?', 'Детский сад'),
          b = prompt('Во сколько это обойдется?');
      
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
  }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log(`Расходы за месяц: ${appData.expensesMonth}`);
console.log(`Цель будет достигнута за ${appData.getTargetMonth()} месяцев`);
console.log(`${appData.getStatusIncome()}`);

for (let key in appData) {
  console.log(`Наша программа включает в себя данные: ${key} - ${appData[key]}`);
}








