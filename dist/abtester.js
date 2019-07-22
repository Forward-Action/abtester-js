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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/url-search-params-polyfill/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/url-search-params-polyfill/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {/**\n *\n *\n * @author Jerry Bendy <jerry@icewingcc.com>\n * @licence MIT\n *\n */\n\n(function(self) {\n    'use strict';\n\n    var nativeURLSearchParams = self.URLSearchParams ? self.URLSearchParams : null,\n        isSupportObjectConstructor = nativeURLSearchParams && (new nativeURLSearchParams({a: 1})).toString() === 'a=1',\n        // There is a bug in safari 10.1 (and earlier) that incorrectly decodes `%2B` as an empty space and not a plus.\n        decodesPlusesCorrectly = nativeURLSearchParams && (new nativeURLSearchParams('s=%2B').get('s') === '+'),\n        __URLSearchParams__ = \"__URLSearchParams__\",\n        prototype = URLSearchParamsPolyfill.prototype,\n        iterable = !!(self.Symbol && self.Symbol.iterator);\n\n    if (nativeURLSearchParams && isSupportObjectConstructor && decodesPlusesCorrectly) {\n        return;\n    }\n\n\n    /**\n     * Make a URLSearchParams instance\n     *\n     * @param {object|string|URLSearchParams} search\n     * @constructor\n     */\n    function URLSearchParamsPolyfill(search) {\n        search = search || \"\";\n\n        // support construct object with another URLSearchParams instance\n        if (search instanceof URLSearchParams || search instanceof URLSearchParamsPolyfill) {\n            search = search.toString();\n        }\n        this [__URLSearchParams__] = parseToDict(search);\n    }\n\n\n    /**\n     * Appends a specified key/value pair as a new search parameter.\n     *\n     * @param {string} name\n     * @param {string} value\n     */\n    prototype.append = function(name, value) {\n        appendTo(this [__URLSearchParams__], name, value);\n    };\n\n    /**\n     * Deletes the given search parameter, and its associated value,\n     * from the list of all search parameters.\n     *\n     * @param {string} name\n     */\n    prototype.delete = function(name) {\n        delete this [__URLSearchParams__] [name];\n    };\n\n    /**\n     * Returns the first value associated to the given search parameter.\n     *\n     * @param {string} name\n     * @returns {string|null}\n     */\n    prototype.get = function(name) {\n        var dict = this [__URLSearchParams__];\n        return name in dict ? dict[name][0] : null;\n    };\n\n    /**\n     * Returns all the values association with a given search parameter.\n     *\n     * @param {string} name\n     * @returns {Array}\n     */\n    prototype.getAll = function(name) {\n        var dict = this [__URLSearchParams__];\n        return name in dict ? dict [name].slice(0) : [];\n    };\n\n    /**\n     * Returns a Boolean indicating if such a search parameter exists.\n     *\n     * @param {string} name\n     * @returns {boolean}\n     */\n    prototype.has = function(name) {\n        return name in this [__URLSearchParams__];\n    };\n\n    /**\n     * Sets the value associated to a given search parameter to\n     * the given value. If there were several values, delete the\n     * others.\n     *\n     * @param {string} name\n     * @param {string} value\n     */\n    prototype.set = function set(name, value) {\n        this [__URLSearchParams__][name] = ['' + value];\n    };\n\n    /**\n     * Returns a string containg a query string suitable for use in a URL.\n     *\n     * @returns {string}\n     */\n    prototype.toString = function() {\n        var dict = this[__URLSearchParams__], query = [], i, key, name, value;\n        for (key in dict) {\n            name = encode(key);\n            for (i = 0, value = dict[key]; i < value.length; i++) {\n                query.push(name + '=' + encode(value[i]));\n            }\n        }\n        return query.join('&');\n    };\n\n    // There is a bug in Safari 10.1 and `Proxy`ing it is not enough.\n    var forSureUsePolyfill = !decodesPlusesCorrectly;\n    var useProxy = (!forSureUsePolyfill && nativeURLSearchParams && !isSupportObjectConstructor && self.Proxy)\n    /*\n     * Apply polifill to global object and append other prototype into it\n     */\n    self.URLSearchParams = useProxy ?\n        // Safari 10.0 doesn't support Proxy, so it won't extend URLSearchParams on safari 10.0\n        new Proxy(nativeURLSearchParams, {\n            construct: function(target, args) {\n                return new target((new URLSearchParamsPolyfill(args[0]).toString()));\n            }\n        }) :\n        URLSearchParamsPolyfill;\n\n\n    var USPProto = self.URLSearchParams.prototype;\n\n    USPProto.polyfill = true;\n\n    /**\n     *\n     * @param {function} callback\n     * @param {object} thisArg\n     */\n    USPProto.forEach = USPProto.forEach || function(callback, thisArg) {\n        var dict = parseToDict(this.toString());\n        Object.getOwnPropertyNames(dict).forEach(function(name) {\n            dict[name].forEach(function(value) {\n                callback.call(thisArg, value, name, this);\n            }, this);\n        }, this);\n    };\n\n    /**\n     * Sort all name-value pairs\n     */\n    USPProto.sort = USPProto.sort || function() {\n        var dict = parseToDict(this.toString()), keys = [], k, i, j;\n        for (k in dict) {\n            keys.push(k);\n        }\n        keys.sort();\n\n        for (i = 0; i < keys.length; i++) {\n            this.delete(keys[i]);\n        }\n        for (i = 0; i < keys.length; i++) {\n            var key = keys[i], values = dict[key];\n            for (j = 0; j < values.length; j++) {\n                this.append(key, values[j]);\n            }\n        }\n    };\n\n    /**\n     * Returns an iterator allowing to go through all keys of\n     * the key/value pairs contained in this object.\n     *\n     * @returns {function}\n     */\n    USPProto.keys = USPProto.keys || function() {\n        var items = [];\n        this.forEach(function(item, name) {\n            items.push([name]);\n        });\n        return makeIterator(items);\n    };\n\n    /**\n     * Returns an iterator allowing to go through all values of\n     * the key/value pairs contained in this object.\n     *\n     * @returns {function}\n     */\n    USPProto.values = USPProto.values || function() {\n        var items = [];\n        this.forEach(function(item) {\n            items.push([item]);\n        });\n        return makeIterator(items);\n    };\n\n    /**\n     * Returns an iterator allowing to go through all key/value\n     * pairs contained in this object.\n     *\n     * @returns {function}\n     */\n    USPProto.entries = USPProto.entries || function() {\n        var items = [];\n        this.forEach(function(item, name) {\n            items.push([name, item]);\n        });\n        return makeIterator(items);\n    };\n\n\n    if (iterable) {\n        USPProto[self.Symbol.iterator] = USPProto[self.Symbol.iterator] || USPProto.entries;\n    }\n\n\n    function encode(str) {\n        var replace = {\n            '!': '%21',\n            \"'\": '%27',\n            '(': '%28',\n            ')': '%29',\n            '~': '%7E',\n            '%20': '+',\n            '%00': '\\x00'\n        };\n        return encodeURIComponent(str).replace(/[!'\\(\\)~]|%20|%00/g, function(match) {\n            return replace[match];\n        });\n    }\n\n    function decode(str) {\n        return decodeURIComponent(str.replace(/\\+/g, ' '));\n    }\n\n    function makeIterator(arr) {\n        var iterator = {\n            next: function() {\n                var value = arr.shift();\n                return {done: value === undefined, value: value};\n            }\n        };\n\n        if (iterable) {\n            iterator[self.Symbol.iterator] = function() {\n                return iterator;\n            };\n        }\n\n        return iterator;\n    }\n\n    function parseToDict(search) {\n        var dict = {};\n\n        if (typeof search === \"object\") {\n            for (var key in search) {\n                if (search.hasOwnProperty(key)) {\n                    appendTo(dict, key, search[key])\n                }\n            }\n\n        } else {\n            // remove first '?'\n            if (search.indexOf(\"?\") === 0) {\n                search = search.slice(1);\n            }\n\n            var pairs = search.split(\"&\");\n            for (var j = 0; j < pairs.length; j++) {\n                var value = pairs [j],\n                    index = value.indexOf('=');\n\n                if (-1 < index) {\n                    appendTo(dict, decode(value.slice(0, index)), decode(value.slice(index + 1)));\n\n                } else {\n                    if (value) {\n                        appendTo(dict, decode(value), '');\n                    }\n                }\n            }\n        }\n\n        return dict;\n    }\n\n    function appendTo(dict, name, value) {\n        var val = typeof value === 'string' ? value : (\n            value !== null && typeof value.toString === 'function' ? value.toString() : JSON.stringify(value)\n        )\n\n        if (name in dict) {\n            dict[name].push(val);\n        } else {\n            dict[name] = [val];\n        }\n    }\n\n})(typeof global !== 'undefined' ? global : (typeof window !== 'undefined' ? window : this));\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack://ABTester/./node_modules/url-search-params-polyfill/index.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack://ABTester/(webpack)/buildin/global.js?");

/***/ }),

/***/ "./src/abtester.js":
/*!*************************!*\
  !*** ./src/abtester.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\n__webpack_require__(/*! url-search-params-polyfill */ \"./node_modules/url-search-params-polyfill/index.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar ABTester = function () {\n    function ABTester(config) {\n        _classCallCheck(this, ABTester);\n\n        this.params = new URLSearchParams(window.location.search);\n        this.variants = config.variants;\n        this.analytics = window.ga ? true : false;\n        this.experimentName = config.experimentName;\n        /* Dev mode - return given variant */\n        if (this.devMode()) {\n            return this.setDevModeVariant();\n        }\n        var variantId = this.readCookie(config.cookieName);\n        if (!variantId || !this.variants[variantId]) {\n            variantId = Math.floor(Math.random() * this.variants.length);\n            this.setCookie(config.cookieName, variantId, 7);\n        }\n        this.variant = this.variants[variantId];\n        this.init();\n    }\n\n    /* \r\n     * Decies whether we can run the test now or we \r\n     * need to wait for DOM content to be loaded.\r\n     */\n\n    _createClass(ABTester, [{\n        key: 'init',\n        value: function init() {\n            if (this.variant.redirect && this.variant.redirect !== undefined) {\n                this.runTest();\n            } else {\n                if (document.readyState !== 'loading') {\n                    this.runTest();\n                } else {\n                    document.addEventListener(\"DOMContentLoaded\", this.runTest.bind(this));\n                }\n            }\n        }\n\n        /*\r\n         * Check this test is valid, sends analytics\r\n         * and runs the test\r\n         */\n\n    }, {\n        key: 'runTest',\n        value: function runTest() {\n            var variant = this.variant;\n            if (variant.callback && variant.redirect) {\n                return console.error(\"You can't define both a callback and a redirect\");\n            }\n            if (this.analytics) {\n                ga('send', 'event', this.experimentName, variant.name);\n            }\n            if (variant.callback) {\n                return variant.callback.call(window, arguments);\n            } else if (variant.redirect) {\n                return window.location = variant.redirect;\n            }\n        }\n\n        /*\r\n         * Returns the value of the given cookie.\r\n         */\n\n    }, {\n        key: 'readCookie',\n        value: function readCookie(name) {\n            var nameEQ = name + '=',\n                ca = document.cookie.split(';'),\n                i,\n                c;\n            for (i = 0; i < ca.length; i++) {\n                c = ca[i];\n                while (c.charAt(0) === ' ') {\n                    c = c.substring(1, c.length);\n                }\n                if (c.indexOf(nameEQ) === 0) {\n                    return c.substring(nameEQ.length, c.length);\n                }\n            }\n            return null;\n        }\n\n        /*\r\n         * Sets a cookie for the root path with the \r\n         * given name, value and days duration.\r\n         */\n\n    }, {\n        key: 'setCookie',\n        value: function setCookie(cname, cvalue, exdays) {\n            var d = new Date();\n            d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);\n            var expires = \"expires=\" + d.toUTCString();\n            document.cookie = cname + \"=\" + cvalue + \";\" + expires + \";path=/\";\n        }\n\n        /*\r\n         * Checks if a variant parameter is passed by a dev\r\n         */\n\n    }, {\n        key: 'devMode',\n        value: function devMode() {\n            if (this.params.get('variant[' + this.experimentName + ']') || this.params.get('variant')) {\n                return true;\n            }\n            return false;\n        }\n\n        /*\r\n         * Sets up variant from the url parameter and runs test\r\n         */\n\n    }, {\n        key: 'setDevModeVariant',\n        value: function setDevModeVariant() {\n            /* \r\n             * Use the variant ID specified with an experiment name, if available\r\n             * Otherwise, use the simple variant parameter.\r\n             */\n            var variantId = this.params.get('variant[' + this.experimentName + ']') || this.params.get('variant');\n            this.variant = this.variants[variantId];\n            this.init();\n        }\n    }]);\n\n    return ABTester;\n}();\n\nexports.default = ABTester;\n\n//# sourceURL=webpack://ABTester/./src/abtester.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = __webpack_require__(/*! ./abtester.js */ \"./src/abtester.js\").default;\n\n//# sourceURL=webpack://ABTester/./src/main.js?");

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/main.js */\"./src/main.js\");\n\n\n//# sourceURL=webpack://ABTester/multi_./src/main.js?");

/***/ })

/******/ });