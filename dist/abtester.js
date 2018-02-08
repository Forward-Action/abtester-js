var ABTester =
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

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(2).default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ABTester = function () {
    function ABTester(config) {
        _classCallCheck(this, ABTester);

        this.variants = config.variants;
        this.analytics = window.ga ? true : false;
        /* Dev mode - return given variant */
        if (this.devMode()) {
            return this.setDevModeVariant();
        }
        var variantId = this.readCookie(config.cookieName);
        if (!variantId || !this.variants[variantId]) {
            variantId = Math.floor(Math.random() * this.variants.length);
            this.setCookie(config.cookieName, variantId, 7);
        }
        this.experimentName = config.experimentName;
        this.variant = this.variants[variantId];
        this.init();
    }

    _createClass(ABTester, [{
        key: "init",
        value: function init() {
            if (this.variant.redirect && this.variant.redirect !== undefined) {
                this.runTest();
            } else {
                document.addEventListener("DOMContentLoaded", this.runTest.bind(this));
            }
        }
    }, {
        key: "runTest",
        value: function runTest() {
            var variant = this.variant;
            if (variant.callback && variant.redirect) {
                return console.error("You can't define both a callback and a redirect");
            }
            if (this.analytics) {
                ga('send', 'event', this.experimentName, variant.name);
            }
            if (variant.callback) {
                return variant.callback.call(window, arguments);
            } else if (variant.redirect) {
                return window.location = variant.redirect;
            }
        }
    }, {
        key: "readCookie",
        value: function readCookie(name) {
            var nameEQ = name + '=',
                ca = document.cookie.split(';'),
                i,
                c;
            for (i = 0; i < ca.length; i++) {
                c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }
            return null;
        }
    }, {
        key: "setCookie",
        value: function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }

        /*
         * Gets a URL Parameter by name
         */

    }, {
        key: "getParameterByName",
        value: function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
            var results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }

        /*
         * Checks if a variant parameter is passed by a dev
         */

    }, {
        key: "devMode",
        value: function devMode() {
            if (this.getParameterByName('variant')) {
                return true;
            }
            return false;
        }

        /*
         * Sets up variant from the url parameter and runs test
         */

    }, {
        key: "setDevModeVariant",
        value: function setDevModeVariant() {
            var variantId = this.getParameterByName('variant');
            this.variant = this.variants[variantId];
            this.init();
        }
    }]);

    return ABTester;
}();

exports.default = ABTester;

/***/ })
/******/ ]);