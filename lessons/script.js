let money = 50000,
    income = "Frilance",
    addExpenses = "internet, taxi, study",
    deposit = true,
    mission = 1000000,
    period = 8;

alert("Hello, it's my first homework");
console.log("I'm here too");

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей/долларов/гривен/юани`);

console.log(addExpenses.toLowerCase().split(', '));

// добавил метод toFixed, т.к. "неудобно" смотреть на большое число в консоли
let budgetDay = (money / 30).toFixed(2);
console.log(budgetDay);



