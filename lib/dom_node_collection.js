class DOMNodeCollection {
  constructor(elements){
    this.elements = elements;
  }

  each(cb) {
    this.elements.forEach(cb);
  }

  html(input) {
    if (typeof input === "string") {
      this.each(element => element.innerHTML = input);
    } else {
      if (this.elements.length > 0) {
        return this.nodes[0].innerHTML;
      }
    }
  }

  empty() {
    this.html("");
  }

  append(outerHTML) {
    if ( this.elements.length === 0) return;

    if (typeof outerHTML === 'object' && !(outerHTML instanceof DOMNodeCollection)){
      outerHTML = $r(outerHTML);
    }

    if (typeof outerHTML === "string") {
      this.each(element => element.innerHTML += outerHTML);
    } else if ( outerHTML instanceof DOMNodeCollection) {
      this.each( element => {
        element.each(childElement => {
          element.appendChild(childElement.cloneNode(true));
        });
      });
    }
  }

  attr (key, value) {
    if (value === undefined) {
      return this.elements[0].getAttribute(key);
    } else {
      this.each(el => el.setAttribute(key, value));
    }
  }

  addClass (newClass) {
    this.each(el => el.classList.add(newClass));
  }

  removeClass (oldClass) {
    this.each(el => el.classList.remove(oldClass));
  }

  children () {
    let children = [];

    this.each( el => {
      const childElement = el.children;
      children = children.concat(Array.from(childElement));
    });

    return new DOMNodeCollection(children);
  }

  parent () {
    let parents = [];

    this.each( el => parents.push(el.parentNode));

    return new DOMNodeCollection(parents);
  }

  find (selector) {
    let nodes = [];
    this.map(el => {
      let nodeList = el.querySelectorAll(selector);
      nodes = nodes.concat(Array.from(nodeList));
    });

    return new DOMNodeCollection(nodes);
  }

  remove() {
    this.each(el => el.parentNode.removeChild(el));
  }

  on(event, cb) {
    this.each(el => {
      el.addEventListener(event, cb);
      const eventKey = `rQueryEvent-${event}`;
      if (typeof el[eventKey] === "undefined") {
        el[eventKey] = [];
      }

      el[eventKey].push(cb);
    });
  }

  off(event, cb) {
    this.each(el =>{
      const eventKey = `rQueryEvent-${event}`;
      if (el[eventKey]) {
        node[eventKey].forEach(cb => el.removeEventListener(event, cb));
      }
      el[eventKey] = [];
    });
  }

  toggleClass(toggleClass) {
    this.each(el => el.classList.toggle(toggleClass));
  }
}

module.exports = DOMNodeCollection;
