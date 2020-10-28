'use strict';

const start = document.getElementById('start'),
      cancel = document.getElementById('cancel'),
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

const AppData = function() {
  this.income = {}, 
  this.addIncome = [],
  this.incomeMonth = 0, 
  this.expenses = {}, 
  this.addExpenses = [],
  this.deposit = false,
  this.percentDeposit = 0,
  this.moneyDeposit = 0,
  this.budget = 0,
  this.budgetDay = 0,
  this.budgetMonth = 0,
  this.expensesMonth = 0;
};

AppData.prototype.start = function() {
  this.budget = +salaryAmount.value;
  
  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getBudget();
  this.getAddExpenses();
  this.getAddIncome();
  
  this.showResult();

  this.blockInputs();
  start.style.display = 'none';
  cancel.style.display = 'block';
};

AppData.prototype.reset = function() {
  document.querySelectorAll('section.main input[type="text"]').forEach(function(item) {
    item.value = '';
  });

  start.style.display = 'block';
  cancel.style.display = 'none';

  this.unblockInputs();
  this.startDisable();

  this.addExpenses = [];
  this.addIncome = [];
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expenses = {};
  this.expensesMonth = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.moneyDeposit = 0;
  this.percentDeposit = 0;

  periodAmount.innerHTML = 1;
  periodSelect.value = 1;
};

AppData.prototype.blockInputs = function() {
  document.querySelectorAll('.data input[type=text]').forEach(item => {
    item.disabled = true;   
  });
};

AppData.prototype.unblockInputs = function() {
  document.querySelectorAll('.data input[type=text]').forEach(item => {
    item.disabled = false;   
  });
};

AppData.prototype.showResult = function() {
  const _this = this;
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = this.getTargetMonth();
  incomePeriodValue.value = this.calcPeriod();
  periodSelect.addEventListener('input', function() {
    incomePeriodValue.value = _this.calcPeriod();
  });
};

AppData.prototype.addExpensesBlock = function() {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  cloneExpensesItem.querySelector('.expenses-title').value = '';
  cloneExpensesItem.querySelector('.expenses-amount').value = '';
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExspensesPlus);
  expensesItems = document.querySelectorAll('.expenses-items');

  document.querySelectorAll('.data input[type=text]').forEach(item => {
    item.addEventListener('focus', this.checkPlaceholder);
  });

  if (expensesItems.length === 3) {
    btnExspensesPlus.style.display = 'none';
  }
};

AppData.prototype.addIncomeBlock = function() {
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  cloneIncomeItem.querySelector('.income-title').value = '';
  cloneIncomeItem.querySelector('.income-amount').value = '';
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncomePlus);
  incomeItems = document.querySelectorAll('.income-items');

  document.querySelectorAll('.data input[type=text]').forEach(item => {
    item.addEventListener('focus', this.checkPlaceholder);
  });

  if (incomeItems.length === 3) {
    btnIncomePlus.style.display = 'none';
  }
};

AppData.prototype.getExpenses = function() {
  const _this = this;
  expensesItems.forEach(function(item) {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;

    if(itemExpenses !== '' && cashExpenses !== '') {
      _this.expenses[itemExpenses] = +cashExpenses;
    }
  });
};

AppData.prototype.getIncome = function() {
  const _this = this;
  incomeItems.forEach(function(item) {
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;

    if (itemIncome !== '' && cashIncome !== '') {
      _this.income[itemIncome] = +cashIncome;
    } 
  });

  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};

AppData.prototype.getAddExpenses = function() {
  const _this = this;
  let addExpenses = additionalExpensesItem.value.split(',');
  addExpenses.forEach(function(item) {
    item = item.trim();
    if (item !== '') {
      _this.addExpenses.push(item);
    }
  });
};

AppData.prototype.getAddIncome = function() {
  const _this = this;
  additionalIncomeItem.forEach(function(item) {
    let itemValue = item.value.trim();
    if(itemValue !== '') {
      _this.addIncome.push(itemValue);
    }
  });
};

AppData.prototype.getExpensesMonth = function() {
  for (let key in this.expenses) {
    this.expensesMonth += +this.expenses[key];
  }
};

AppData.prototype.eventTargetValue = function(e) {
  periodAmount.innerHTML = e.target.value;
};

AppData.prototype.getBudget = function() {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function() {
  return Math.ceil(targetAmount.value / this.budgetMonth);
};

AppData.prototype.getStatusIncome = function() {
  if (this.budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
  } else if (1200 > this.budgetDay >= 600) {
    return ('У вас средний уровень дохода');
  } else if (600 > this.budgetDay >= 0) {
    return ('К сожалению, у вас уровень дохода ниже среднего');
  } else {
    return ('Что то пошло не так');
  }
};

AppData.prototype.getInfoDeposit = function() {
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
};

AppData.prototype.calcPeriod = function() {
  return this.budgetMonth * periodSelect.value;
};

AppData.prototype.startDisable = function() {
  if (salaryAmount.value.trim() === '') {
    start.disabled = true;
  } else {
    start.disabled = false;
  }
};

AppData.prototype.checkPlaceholder = function(e) {
  const _this = this;
  const changeInput = function(e) {
    if (e.target.placeholder === 'Наименование') {
      if (!/^[,. а-яА-ЯёЁ]+$/.test(e.target.value) && e.target.value !== '') {
        alert('Допускается только ввод русских букв, пробела, точки и запятой!');
        e.target.value = '';
        _this.startDisable();
        e.target.removeEventListener('blur', changeInput);
      }
    }
    
    if (e.target.placeholder === 'Сумма') {
      if (!/^[\d]+$/.test(e.target.value) && e.target.value.trim() !== '') {
        alert('Допускается только ввод цифр!');
        e.target.value = '';
        _this.startDisable();
        e.target.removeEventListener('blur', changeInput);
      }
    } 
  };

  e.target.addEventListener('blur', changeInput);
};

AppData.prototype.eventsListeners = function() {
  this.startDisable();

  start.addEventListener('click', this.start.bind(this));
  cancel.addEventListener('click', this.reset.bind(this));
  btnExspensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
  btnIncomePlus.addEventListener('click', this.addIncomeBlock.bind(this));
  periodSelect.addEventListener('input', this.eventTargetValue);
  salaryAmount.addEventListener('input', this.startDisable);

  document.querySelectorAll('.data input[type=text]').forEach(item => {
    item.addEventListener('focus', this.checkPlaceholder.bind(this));
  });
};

const appData = new AppData();

appData.eventsListeners();

















