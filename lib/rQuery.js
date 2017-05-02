/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

let DOMNodeCollection = __webpack_require__(1);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);