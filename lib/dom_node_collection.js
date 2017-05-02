class DOMNodeCollection {
  constructor(arr){
    this.arr = arr;
  }

  html(string) {
    if (string === undefined) {
      return this.arr[0].innerHTML;
    } else {
      for (let i = 0; i < this.arr.length; i++) {
        this.arr[i].innerHTML = string;
      }
    }
  }

  empty() {
    this.html("");
  }

  append(outerHTML) {
    if(typeof outerHTML === "string" || outerHTML instanceof HTMLElement){
      for (let i = 0; i < this.arr.length; i++) {
        this.arr[i].appendChild(outerHTML);
      }
    } else {
      for (let i = 0; i < this.arr.length; i++) {
        for (var j = 0; j < outerHTML.arr.length; j++) {
          this.arr[i].appendChild(outerHTML.arr[j]);
        }
      }
    }
  }

  attr (string, value) {
    if (value === undefined) {
      return this.arr[0].getAttribute(string);
    } else {
      this.arr.forEach((el) => {
        el.setAttribute(string, value);
      });
    }
  }

  addClass (string) {
    this.arr.forEach((el) => {
      if (el.className) {
        el.className += ` ${string}`;
      } else {
        el.className = string;
      }
    });
  }

  removeClass (string) {
    this.arr.forEach((el) => {
      el.className = el.className.replace(` ${string}`, '');
      el.className = el.className.replace(`${string}`, '');
    });
  }

  children () {
    let children = [];

    this.arr.forEach ((el)=> {
      for (var i = 0; i < el.children.length; i++) {
        children.push(el.children[i]);
      }
    });

    let newDom = new DOMNodeCollection(children);
    return newDom;
  }

  parent () {
    let parents = [];

    this.arr.forEach((el) => {
      parents.push(el.parentNode);
    });

    let newDom = new DOMNodeCollection(parents);
    return newDom;
  }

  find (selector) {
    let nodes = [];
    this.arr.forEach( (el) => {
      let nodeList = el.querySelectorAll(selector);
      nodes = nodes.concat(Array.from(nodeList));
    });
    let newDom = new DOMNodeCollection(nodes);
    return newDom;
  }

  remove() {
    this.arr.forEach( (el) => {
      el.outerHTML = '';
    });
  }
}

 module.exports = DOMNodeCollection;
