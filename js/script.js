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
    
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getBudget();
    this.getAddExpenses();
    this.getAddIncome();
    
    this.showResult();

    if (start.textContent === 'Рассчитать') {
      this.blockInputs();
      start.textContent = 'Сбросить';
    } else {
      this.reset();
      start.textContent = 'Рассчитать';
      this.unblockInputs();
    }
  },

  reset: function() {
    document.querySelectorAll('section.main input[type="text"]').forEach(function(item) {
      item.value = '';
    });
  },

  blockInputs: function() {
    document.querySelectorAll('.data input[type=text]').forEach(item => {
        item.disabled = true;   
    });
  },

  unblockInputs: function() {
    document.querySelectorAll('.data input[type=text]').forEach(item => {
      item.disabled = false;   
    });
  },

  showResult: function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', function() {
      incomePeriodValue.value = appData.calcPeriod();
    });
  },

  addExpensesBlock: function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    console.log(expensesItems);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExspensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      btnExspensesPlus.style.display = 'none';
    }
  },

  addIncomeBlock: function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    console.log(incomeItems);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
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
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },

  getIncome: function() {
    incomeItems.forEach(function(item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = +cashIncome;
      } 
    });

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
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
      this.expensesMonth += +this.expenses[key];
    }
  },

  eventTargetValue: function(e) {
    periodAmount.innerHTML = e.target.value;
  },

  getBudget: function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },

  getTargetMonth: function() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  },

  getStatusIncome: function() {
    if (this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (1200 > this.budgetDay >= 600) {
      return ('У вас средний уровень дохода');
    } else if (600 > this.budgetDay >= 0) {
      return ('К сожалению, у вас уровень дохода ниже среднего');
    } else {
      return ('Что то пошло не так');
    }
  },

  getInfoDeposit: function() {
    if (this.deposit) {
      this.percentDeposit = prompt('Какой годовой процент?', 10);

      while (!isNumber(this.percentDeposit) || this.percentDeposit.trim() === '' || this.percentDeposit === null) {
        this.percentDeposit = prompt('Какой годовой процент?', 10);
      }

      this.moneyDeposit = prompt('Какая сумма заложена?', 10000);

      while (!isNumber(this.moneyDeposit) || this.moneyDeposit.trim() === '' || this.moneyDeposit === null) {
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
    }
  },

  calcPeriod: function() {
    return this.budgetMonth * periodSelect.value;
  },

  startDisable: function() {
    if (salaryAmount.value.trim() === '') {
      start.disabled = true;
    } else {
      start.disabled = false;
    }
  }
};

const bindStart = appData.start.bind(appData);

appData.startDisable();

start.addEventListener('click', bindStart);
btnExspensesPlus.addEventListener('click', appData.addExpensesBlock);
btnIncomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.eventTargetValue);
salaryAmount.addEventListener('input', appData.startDisable);

const checkNumber = e => {

  const changeNumber = e => {
      if (!/^[\d]+$/.test(e.target.value) && e.target.value !== '') {
          alert('Допускается только ввод цифр!');
          e.target.value = '';
          e.target.removeEventListener('blur', changeNumber);
      }
  };

  e.target.addEventListener('blur', changeNumber);
};

const checkText = e => {

  const changeText = e => {
      if (!/^[,. а-яА-ЯёЁ]+$/.test(e.target.value) && e.target.value !== '') {
          alert('Допускается только ввод русских букв, пробела, точки и запятой!');
          e.target.value = '';
          e.target.removeEventListener('blur', changeText);
      }
  };

  e.target.addEventListener('blur', changeText);
};

document.querySelectorAll('[placeholder="Наименование"]').forEach(item => {
  item.addEventListener('focus', checkText);
});

document.querySelectorAll('[placeholder="Сумма"]').forEach(item => {
  item.addEventListener('focus', checkNumber);
});














