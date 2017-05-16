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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const callAjax = (lat, long, callback) => {
    let xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.responseText);
        }
    };

    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=bb94bab4df5a7cab30cfe69cc504cdb1`;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
};
/* harmony export (immutable) */ __webpack_exports__["b"] = callAjax;


const ktof = (kelvin) => {
    let temp = (1.8 * (kelvin - 273) + 32);
    return Math.round( temp * 100 ) / 100;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = ktof;



/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_js__ = __webpack_require__(0);


document.addEventListener('DOMContentLoaded', () => {
  // const $button = $r('button');
  $r('.addListItem').on('click', () => {
    let list = $r('ol');
    let input = $r('#listItem').elements[0].value;
    if ( input.length > 0 ) {
      list.append(
        `<li>`+
        input +
        "<button class='removeButton'>X</button>" +
        '</li>');

        $r('#listItem').elements[0].value = '';

        $r(".removeButton").on('click', (e) => {
          $r(e.currentTarget).parent().remove();
        });

        $r('li').on('click', (e) => {
          $r(e.currentTarget).toggleClass('strike');
        });
    }

    $r('.removeListItem').on('click', () => {
      $r('li').remove();
    });
  });

  const getWeather = (string) => {
    const weather = JSON.parse(string);
    const kelvin = weather.main.temp;
    const temp = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_js__["a" /* ktof */])(kelvin);

    let city = $r('.current-city');
    let currentTemp = $r('.temp');

    city.append(`<div> Current City: ${weather.name} </div>`);
    currentTemp.append(`<div> Current Temp: ${temp} F</div>`);
  };

  const getLocation = () => {
    let currentPos = navigator.geolocation;
    currentPos.getCurrentPosition((pos) => {
      let lat = pos.coords.latitude;
      let long = pos.coords.longitude;
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_js__["b" /* callAjax */])(lat, long, getWeather);
    });
  };

  const $weatherButton = $r('.get-weather');
  $weatherButton.on('click', () => {
    getLocation();
  });
});


/***/ })
/******/ ]);
//# sourceMappingURL=js.rQuery.js.map