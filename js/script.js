'use strict';

const start = document.getElementById('start'),
      btnIncomePlus = document.getElementsByTagName('button')[0],
      btnExspensesPlus = document.getElementsByTagName('button')[1],
      checkBox = document.querySelector('#deposit-check'),
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
      budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
      budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
      expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
      additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
      incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
      targetMonthValue = document.getElementsByClassName('target_month-value')[0],
      periodSelect = document.querySelector('.period-select'),
      salaryAmount = document.querySelector('.salary-amount'),
      incomeTitle = document.querySelector('.income-items .income-title'),
      expensesTitle = document.querySelector('.expenses-items .expenses-title'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent'),
      targetAmount = document.querySelector('.target-amount');
      

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount');


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

const appData = {
  income: {}, 
  addIncome: [],
  incomeMonth: 0, 
  expenses: {}, 
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  
  start: function() {

    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getBudget();
    appData.getAddExpenses();
    appData.getAddIncome();
    
    appData.showResult();
  },

  showResult: function() {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcPeriod();
    periodSelect.addEventListener('input', function() {
      incomePeriodValue.value = appData.calcPeriod();
    });
  },

  addExpensesBlock: function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExspensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      btnExspensesPlus.style.display = 'none';
    }
  },

  addIncomeBlock: function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncomePlus);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      btnIncomePlus.style.display = 'none';
    }
  },

  getExpenses: function() {
    expensesItems.forEach(function(item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;

      if(itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },

  getIncome: function() {
    incomeItems.forEach(function(item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      } 
    });

    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },

  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },

  getAddIncome: function() {
    additionalIncomeItem.forEach(function(item) {
      let itemValue = item.value.trim();
      if(itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },

  getExpensesMonth: function() {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },

  eventTargetValue: function(e) {
    periodAmount.innerHTML = e.target.value;
  },

  getBudget: function() {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: function() {
    return Math.ceil(targetAmount.value / appData.budgetMonth);
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

  calcPeriod: function() {
    return appData.budgetMonth * periodSelect.value;
  },

  startDisable: function() {
    if (salaryAmount.value.trim() === '') {
      start.disabled = true;
    } else {
      start.disabled = false;
    }
  }
};

appData.startDisable();

start.addEventListener('click', appData.start);
btnExspensesPlus.addEventListener('click', appData.addExpensesBlock);
btnIncomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.eventTargetValue);
salaryAmount.addEventListener('input', appData.startDisable);

// const numberMonth = appData.getTargetMonth();

// if (appData.getTargetMonth() > 0) {
//   console.log(`Цель будет достигнута за ${appData.getTargetMonth()} ${declination(numberMonth, ['месяц', 'месяца', 'месяцев'])}`);
// } else {
//   console.log('Цель не будет достигнута');
// }


// for (let key in appData) {
//   console.log(`Наша программа включает в себя данные: ${key} - ${appData[key]}`);
// }

// console.log(appData.addExpenses.map(function(item) {
//   return item[0].toUpperCase() + item.slice(1);
// }).join(', '));











