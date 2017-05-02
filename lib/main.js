let DOMNodeCollection = require('./dom_node_collection.js');

function $l(selector) {
  if(typeof selector === "string"){
    let elementList = document.querySelectorAll(selector);
    let nodeArray = Array.from(elementList);
    let newDom = new DOMNodeCollection(nodeArray);
    return newDom;
  } else if (selector instanceof HTMLElement){
    let newDom = new DOMNodeCollection([selector]);
    return newDom;
  }


}

window.$l = $l;

let p = $l('p');
p.addClass("someClass");
p.addClass("someOtherClass");
p.addClass("moreClass");

let b = $l("h2");
b.addClass("someOtherClass");
p.removeClass("someOtherClass");

let uls = $l('ul')
