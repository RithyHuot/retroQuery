/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

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


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

let DOMNodeCollection = __webpack_require__(1);

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


/***/ })
/******/ ]);
//# sourceMappingURL=lib.rQuery.js.map