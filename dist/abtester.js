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

__webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ABTester = function () {
    function ABTester(config) {
        _classCallCheck(this, ABTester);

        this.params = new URLSearchParams(window.location.search);
        this.variants = config.variants;
        this.analytics = window.ga ? true : false;
        this.experimentName = config.experimentName;
        /* Dev mode - return given variant */
        if (this.devMode()) {
            return this.setDevModeVariant();
        }
        var variantId = this.readCookie(config.cookieName);
        if (!variantId || !this.variants[variantId]) {
            variantId = Math.floor(Math.random() * this.variants.length);
            this.setCookie(config.cookieName, variantId, 7);
        }
        this.variant = this.variants[variantId];
        this.init();
    }

    /* 
     * Decies whether we can run the test now or we 
     * need to wait for DOM content to be loaded.
     */

    _createClass(ABTester, [{
        key: 'init',
        value: function init() {
            if (this.variant.redirect && this.variant.redirect !== undefined) {
                this.runTest();
            } else {
                if (document.readyState !== 'loading') {
                    this.runTest();
                } else {
                    document.addEventListener("DOMContentLoaded", this.runTest.bind(this));
                }
            }
        }

        /*
         * Check this test is valid, sends analytics
         * and runs the test
         */

    }, {
        key: 'runTest',
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

        /*
         * Returns the value of the given cookie.
         */

    }, {
        key: 'readCookie',
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

        /*
         * Sets a cookie for the root path with the 
         * given name, value and days duration.
         */

    }, {
        key: 'setCookie',
        value: function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }

        /*
         * Checks if a variant parameter is passed by a dev
         */

    }, {
        key: 'devMode',
        value: function devMode() {
            if (this.params.get('variant[' + this.experimentName + ']') || this.params.get('variant')) {
                return true;
            }
            return false;
        }

        /*
         * Sets up variant from the url parameter and runs test
         */

    }, {
        key: 'setDevModeVariant',
        value: function setDevModeVariant() {
            /* 
             * Use the variant ID specified with an experiment name, if available
             * Otherwise, use the simple variant parameter.
             */
            var variantId = this.params.get('variant[' + this.experimentName + ']') || this.params.get('variant');
            this.variant = this.variants[variantId];
            this.init();
        }
    }]);

    return ABTester;
}();

exports.default = ABTester;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 *
 *
 * @author Jerry Bendy <jerry@icewingcc.com>
 * @licence MIT
 *
 */

(function(self) {
    'use strict';

    var nativeURLSearchParams = self.URLSearchParams ? self.URLSearchParams : null,
        isSupportObjectConstructor = nativeURLSearchParams && (new nativeURLSearchParams({a: 1})).toString() === 'a=1',
        // There is a bug in safari 10.1 (and earlier) that incorrectly decodes `%2B` as an empty space and not a plus.
        decodesPlusesCorrectly = nativeURLSearchParams && (new nativeURLSearchParams('s=%2B').get('s') === '+'),
        __URLSearchParams__ = "__URLSearchParams__",
        prototype = URLSearchParamsPolyfill.prototype,
        iterable = !!(self.Symbol && self.Symbol.iterator);

    if (nativeURLSearchParams && isSupportObjectConstructor && decodesPlusesCorrectly) {
        return;
    }


    /**
     * Make a URLSearchParams instance
     *
     * @param {object|string|URLSearchParams} search
     * @constructor
     */
    function URLSearchParamsPolyfill(search) {
        search = search || "";

        // support construct object with another URLSearchParams instance
        if (search instanceof URLSearchParams || search instanceof URLSearchParamsPolyfill) {
            search = search.toString();
        }
        this [__URLSearchParams__] = parseToDict(search);
    }


    /**
     * Appends a specified key/value pair as a new search parameter.
     *
     * @param {string} name
     * @param {string} value
     */
    prototype.append = function(name, value) {
        appendTo(this [__URLSearchParams__], name, value);
    };

    /**
     * Deletes the given search parameter, and its associated value,
     * from the list of all search parameters.
     *
     * @param {string} name
     */
    prototype.delete = function(name) {
        delete this [__URLSearchParams__] [name];
    };

    /**
     * Returns the first value associated to the given search parameter.
     *
     * @param {string} name
     * @returns {string|null}
     */
    prototype.get = function(name) {
        var dict = this [__URLSearchParams__];
        return name in dict ? dict[name][0] : null;
    };

    /**
     * Returns all the values association with a given search parameter.
     *
     * @param {string} name
     * @returns {Array}
     */
    prototype.getAll = function(name) {
        var dict = this [__URLSearchParams__];
        return name in dict ? dict [name].slice(0) : [];
    };

    /**
     * Returns a Boolean indicating if such a search parameter exists.
     *
     * @param {string} name
     * @returns {boolean}
     */
    prototype.has = function(name) {
        return name in this [__URLSearchParams__];
    };

    /**
     * Sets the value associated to a given search parameter to
     * the given value. If there were several values, delete the
     * others.
     *
     * @param {string} name
     * @param {string} value
     */
    prototype.set = function set(name, value) {
        this [__URLSearchParams__][name] = ['' + value];
    };

    /**
     * Returns a string containg a query string suitable for use in a URL.
     *
     * @returns {string}
     */
    prototype.toString = function() {
        var dict = this[__URLSearchParams__], query = [], i, key, name, value;
        for (key in dict) {
            name = encode(key);
            for (i = 0, value = dict[key]; i < value.length; i++) {
                query.push(name + '=' + encode(value[i]));
            }
        }
        return query.join('&');
    };

    // There is a bug in Safari 10.1 and `Proxy`ing it is not enough.
    var forSureUsePolyfill = !decodesPlusesCorrectly;
    var useProxy = (!forSureUsePolyfill && nativeURLSearchParams && !isSupportObjectConstructor && self.Proxy)
    /*
     * Apply polifill to global object and append other prototype into it
     */
    self.URLSearchParams = useProxy ?
        // Safari 10.0 doesn't support Proxy, so it won't extend URLSearchParams on safari 10.0
        new Proxy(nativeURLSearchParams, {
            construct: function(target, args) {
                return new target((new URLSearchParamsPolyfill(args[0]).toString()));
            }
        }) :
        URLSearchParamsPolyfill;


    var USPProto = self.URLSearchParams.prototype;

    USPProto.polyfill = true;

    /**
     *
     * @param {function} callback
     * @param {object} thisArg
     */
    USPProto.forEach = USPProto.forEach || function(callback, thisArg) {
        var dict = parseToDict(this.toString());
        Object.getOwnPropertyNames(dict).forEach(function(name) {
            dict[name].forEach(function(value) {
                callback.call(thisArg, value, name, this);
            }, this);
        }, this);
    };

    /**
     * Sort all name-value pairs
     */
    USPProto.sort = USPProto.sort || function() {
        var dict = parseToDict(this.toString()), keys = [], k, i, j;
        for (k in dict) {
            keys.push(k);
        }
        keys.sort();

        for (i = 0; i < keys.length; i++) {
            this.delete(keys[i]);
        }
        for (i = 0; i < keys.length; i++) {
            var key = keys[i], values = dict[key];
            for (j = 0; j < values.length; j++) {
                this.append(key, values[j]);
            }
        }
    };

    /**
     * Returns an iterator allowing to go through all keys of
     * the key/value pairs contained in this object.
     *
     * @returns {function}
     */
    USPProto.keys = USPProto.keys || function() {
        var items = [];
        this.forEach(function(item, name) {
            items.push([name]);
        });
        return makeIterator(items);
    };

    /**
     * Returns an iterator allowing to go through all values of
     * the key/value pairs contained in this object.
     *
     * @returns {function}
     */
    USPProto.values = USPProto.values || function() {
        var items = [];
        this.forEach(function(item) {
            items.push([item]);
        });
        return makeIterator(items);
    };

    /**
     * Returns an iterator allowing to go through all key/value
     * pairs contained in this object.
     *
     * @returns {function}
     */
    USPProto.entries = USPProto.entries || function() {
        var items = [];
        this.forEach(function(item, name) {
            items.push([name, item]);
        });
        return makeIterator(items);
    };


    if (iterable) {
        USPProto[self.Symbol.iterator] = USPProto[self.Symbol.iterator] || USPProto.entries;
    }


    function encode(str) {
        var replace = {
            '!': '%21',
            "'": '%27',
            '(': '%28',
            ')': '%29',
            '~': '%7E',
            '%20': '+',
            '%00': '\x00'
        };
        return encodeURIComponent(str).replace(/[!'\(\)~]|%20|%00/g, function(match) {
            return replace[match];
        });
    }

    function decode(str) {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    }

    function makeIterator(arr) {
        var iterator = {
            next: function() {
                var value = arr.shift();
                return {done: value === undefined, value: value};
            }
        };

        if (iterable) {
            iterator[self.Symbol.iterator] = function() {
                return iterator;
            };
        }

        return iterator;
    }

    function parseToDict(search) {
        var dict = {};

        if (typeof search === "object") {
            for (var key in search) {
                if (search.hasOwnProperty(key)) {
                    appendTo(dict, key, search[key])
                }
            }

        } else {
            // remove first '?'
            if (search.indexOf("?") === 0) {
                search = search.slice(1);
            }

            var pairs = search.split("&");
            for (var j = 0; j < pairs.length; j++) {
                var value = pairs [j],
                    index = value.indexOf('=');

                if (-1 < index) {
                    appendTo(dict, decode(value.slice(0, index)), decode(value.slice(index + 1)));

                } else {
                    if (value) {
                        appendTo(dict, decode(value), '');
                    }
                }
            }
        }

        return dict;
    }

    function appendTo(dict, name, value) {
        var val = typeof value === 'string' ? value : (
            value !== null && typeof value.toString === 'function' ? value.toString() : JSON.stringify(value)
        )

        if (name in dict) {
            dict[name].push(val);
        } else {
            dict[name] = [val];
        }
    }

})(typeof global !== 'undefined' ? global : (typeof window !== 'undefined' ? window : this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);