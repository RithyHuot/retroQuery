let DOMNodeCollection = require('./dom_node_collection.js');

let documentReady = false;
const documentReadyCallbacks = [];

window.$r = function $r(selector) {
  if(typeof selector === "string"){
    let elementList = document.querySelectorAll(selector);
    let nodeArray = Array.from(elementList);
    let newDom = new DOMNodeCollection(nodeArray);
    return newDom;
  } else if (selector instanceof HTMLElement){
    let newDom = new DOMNodeCollection([selector]);
    return newDom;
  } else if (typeof selector === "function") {
      if (!documentReady) {
        documentReadyCallbacks.push(selector);
      } else {
        selector();
      }
    }
};

document.addEventListener('DOMContentLoaded', ()=> {
  documentReady = true;
  documentReadyCallbacks.forEach(cb => cb());
});

$r.extend = (base, ...objs) => {
  objs.forEach(obj => {
    for(let prop in obj) {
      base[prop] = obj[prop];
    }
  });

  return base;
};

$r.ajax = options => {
  const request = new XMLHttpRequest();
  const defaults = {
    contentType: 'application/x-www.form-urlencoded; charset=UTF-8',
    method: 'GET',
    url:'',
    success: () => {},
    errors: () => {},
    data: {}
  };

  options = $r.extend(defaults, options);
  options.method = options.method.toUpperCase();

  request.open(options.method, options.url, true);
  request.onload = e => {
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };

  request.send(JSON.stringify(options.data));
};
