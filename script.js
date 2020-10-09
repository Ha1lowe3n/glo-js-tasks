const money = 50000,
      income = "Frilance",
      addExpenses = "internet, taxi, study",
      deposit = true,
      mission = 1000000,
      period = 8;

alert("Hello, it's my first homework");
console.log("I'm here too");

console.log(typeof money + ', ' + typeof income + ', ' + typeof deposit);

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

console.log(addExpenses.toLowerCase().split(', '));

// добавил метод toFixed, т.к. "неудобно" смотреть на большое число в консоли
let budgetDay = Math.round(money / 30);
console.log(budgetDay);





