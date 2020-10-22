'use strict';

// Восстановить порядок книг
const books = document.querySelector('.books'),
      book = books.querySelectorAll('.book');
      
book[0].classList.add('book-two');
book[1].classList.add('book-one');
book[2].classList.add('book-six');
book[3].classList.add('book-four');
book[4].classList.add('book-three');
book[5].classList.add('book-five');

const bookOne = document.querySelector('.book-one'),
      bookTwo = document.querySelector('.book-two'),
      bookThree = document.querySelector('.book-three'),
      bookFour = document.querySelector('.book-four'),
      bookFive = document.querySelector('.book-five'),
      bookSix = document.querySelector('.book-six');

bookTwo.before(bookOne);
books.append(bookSix);
bookFour.before(bookThree);

// Заменить картинку заднего фона на другую из папки image
const body = document.querySelector('body');
body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

// Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
bookThree.querySelector('h2 a').textContent = 'Книга 3. this и Прототипы Объектов';

// Удалить рекламу со страницы
document.querySelector('.adv').remove();

// Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы элементов, поможет dev tools)
const chaptersTwo = bookTwo.querySelectorAll('ul li'),
      chaptersFive = bookFive.querySelectorAll('ul li');

chaptersTwo[2].before(chaptersTwo[3]);
chaptersTwo[2].before(chaptersTwo[6]);
chaptersTwo[2].before(chaptersTwo[8]);
chaptersTwo[2].before(chaptersTwo[4]);
chaptersTwo[2].before(chaptersTwo[5]);
chaptersTwo[10].before(chaptersTwo[2]);

chaptersFive[2].before(chaptersFive[9]);
chaptersFive[9].after(chaptersFive[3]);
chaptersFive[3].after(chaptersFive[4]);
chaptersFive[5].before(chaptersFive[6]);
chaptersFive[5].before(chaptersFive[7]);

// в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
const chaptersSix = bookSix.querySelectorAll('ul li');

const newElem = document.createElement('li');
newElem.textContent = 'Глава 8: За пределами ES6';

chaptersSix[8].after(newElem);











