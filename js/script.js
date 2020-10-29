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
const declination = (number, txt) => {
  let cases = [2, 0, 1, 1, 1, 2];
  return txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isString = (n) => {
  return typeof(n) !== 'string' || isNumber(n) || n.trim() === '' || n === null;
};

class AppData {
  constructor() {
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
  }

  start() {
    this.budget = +salaryAmount.value;
  
    this.getExpInc();
    this.getExpensesMonth();
    this.getBudget();
    this.getAddExpInc();
    
    this.showResult();

    this.blockInputs();
    start.style.display = 'none';
    cancel.style.display = 'block';
  }

  reset() {
    document.querySelectorAll('section.main input[type="text"]').forEach((item) => {
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
  }

  blockInputs() {
    document.querySelectorAll('.data input[type=text]').forEach(item => {
      item.disabled = true;   
    });
  }

  unblockInputs() {
    document.querySelectorAll('.data input[type=text]').forEach(item => {
      item.disabled = false;   
    });
  }

  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', () => {
      incomePeriodValue.value = this.calcPeriod();
    });
  }

  addExpIncBlock(e) {
    const target = e.target;
    const startStr = target.parentNode.className;
    const cloneItem = document.querySelector(`.${startStr}-items`).cloneNode(true);
    cloneItem.querySelector(`.${startStr}-title`).value = '';
    cloneItem.querySelector(`.${startStr}-amount`).value = '';
    target.parentNode.insertBefore(cloneItem, target);

    document.querySelectorAll('.data input[type=text]').forEach(item => {
      item.addEventListener('focus', this.checkPlaceholder.bind(this));
    });

    if (document.querySelectorAll(`.${startStr}-items`).length === 3) {
        target.style.display = 'none';
    }
  }

  getExpInc() {
    const count = (item) => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;

      if (itemTitle !== '' && itemAmount !== '') {
        this[startStr][itemTitle] = +itemAmount;
      } 
    };
      
    incomeItems.forEach(count);
    expensesItems.forEach(count);

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  getAddExpInc() {
    const addFunc = (item) => {
      console.log(item);
      if (item.className === undefined) {
        item = item.trim();
        if (item !== '') {
          this.addExpenses.push(item);
        }
      } 
      
      else if (item.className === 'additional_income-item') {
        const itemValue = item.value.trim();
        if (item !== '') {
          this.addIncome.push(itemValue);
        } 
      }   
    };

    additionalExpensesItem.value.split(',').forEach(addFunc);
    additionalIncomeItem.forEach(addFunc);
  }

  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  }

  eventTargetValue(e) {
    periodAmount.innerHTML = e.target.value;
  }

  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  }

  getStatusIncome() {
    if (this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (1200 > this.budgetDay >= 600) {
      return ('У вас средний уровень дохода');
    } else if (600 > this.budgetDay >= 0) {
      return ('К сожалению, у вас уровень дохода ниже среднего');
    } else {
      return ('Что то пошло не так');
    }
  }

  getInfoDeposit() {
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
  }

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }

  startDisable() {
    if (salaryAmount.value.trim() === '') {
      start.disabled = true;
    } else {
      start.disabled = false;
    }
  }

  checkPlaceholder(e) {
    const changeInput = (e) => {
      if (e.target.placeholder === 'Наименование') {
        if (!/^[,. а-яА-ЯёЁ]+$/.test(e.target.value) && e.target.value !== '') {
          alert('Допускается только ввод русских букв, пробела, точки и запятой!');
          e.target.value = '';
          this.startDisable();
          e.target.removeEventListener('blur', changeInput);
        }
      }
      
      if (e.target.placeholder === 'Сумма') {
        if (!/^[\d]+$/.test(e.target.value) && e.target.value.trim() !== '') {
          alert('Допускается только ввод цифр!');
          e.target.value = '';
          this.startDisable();
          e.target.removeEventListener('blur', changeInput);
        }
      } 
    };
  
    e.target.addEventListener('blur', changeInput);
  }

  eventsListeners() {
    this.startDisable();

    start.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
    btnExspensesPlus.addEventListener('click', this.addExpIncBlock.bind(this));
    btnIncomePlus.addEventListener('click', this.addExpIncBlock.bind(this));
    periodSelect.addEventListener('input', this.eventTargetValue);
    salaryAmount.addEventListener('input', this.startDisable);

    document.querySelectorAll('.data input[type=text]').forEach(item => {
      item.addEventListener('focus', this.checkPlaceholder.bind(this));
    });
  }

}

const appData = new AppData();

appData.eventsListeners();

















