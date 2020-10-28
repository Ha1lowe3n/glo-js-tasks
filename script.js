'use strict';

function DomElement (selector, height, width, bg, fontSize) {
  this.selector = selector;    
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}

DomElement.prototype.createNewDiv = function () {
  let div;
  if (this.selector[0] === '.') {
    div = document.createElement('div');
    div.classList.add(this.selector.slice(1));
  } else if (this.selector[0] === '#') {
    div = document.createElement('p');
    div.id = this.selector.slice(1);
  }

  div.style.cssText = `height: ${this.height}px;
    width: ${this.width}px;
    background: ${this.bg};
    font-size: ${this.fontSize}px;`;

  return div;
};

const classDiv = new DomElement('.new-div', 200, 200, 'black', 20);
const pDiv = new DomElement('#new-p', 100, 100, 'green', 10);

document.body.append(classDiv.createNewDiv());
document.body.append(pDiv.createNewDiv());
    
