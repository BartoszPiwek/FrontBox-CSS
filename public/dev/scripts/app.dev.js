(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!this.json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));

},{}],2:[function(require,module,exports){
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.vhCheck = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    // don't know a better way to get the size of a CSS 100vh…
    function createTestElement() {
        var testElement = document.createElement('div');
        testElement.style.cssText =
            'position: fixed; top: 0; height: 100vh; pointer-events: none;';
        document.documentElement.insertBefore(testElement, document.documentElement.firstChild);
        return testElement;
    }
    function removeTestElement(element) {
        document.documentElement.removeChild(element);
    }
    //  in some browsers this will be bigger than window.innerHeight
    function checkSizes() {
        var vhTest = createTestElement();
        var windowHeight = window.innerHeight;
        var vh = vhTest.offsetHeight;
        var offset = vh - windowHeight;
        removeTestElement(vhTest);
        return {
            vh: vh,
            windowHeight: windowHeight,
            offset: offset,
            isNeeded: offset !== 0,
            value: 0,
        };
    }
    // export
    function noop() { }
    function computeDifference() {
        var sizes = checkSizes();
        sizes.value = sizes.offset;
        return sizes;
    }
    function redefineVhUnit() {
        var sizes = checkSizes();
        sizes.value = sizes.windowHeight * 0.01;
        return sizes;
    }

    var methods = /*#__PURE__*/Object.freeze({
        noop: noop,
        computeDifference: computeDifference,
        redefineVhUnit: redefineVhUnit
    });

    function isString(text) {
        return typeof text === "string" && text.length > 0;
    }
    function isFunction(f) {
        return typeof f === "function";
    }
    var defaultOptions = Object.freeze({
        cssVarName: 'vh-offset',
        redefineVh: false,
        method: computeDifference,
        force: false,
        bind: true,
        updateOnTouch: false,
        onUpdate: noop,
    });
    function getOptions(options) {
        // old options handling: only redefine the CSS var name
        if (isString(options)) {
            return __assign({}, defaultOptions, { cssVarName: options });
        }
        // be sure to have a configuration object
        if (typeof options !== 'object')
            return defaultOptions;
        // make sure we have the right options to start with
        var finalOptions = {
            force: options.force === true,
            bind: options.bind !== false,
            updateOnTouch: options.updateOnTouch === true,
            onUpdate: isFunction(options.onUpdate) ? options.onUpdate : noop,
        };
        // method change
        var redefineVh = options.redefineVh === true;
        finalOptions.method =
            methods[redefineVh ? 'redefineVhUnit' : 'computeDifference'];
        finalOptions.cssVarName = isString(options.cssVarName)
            ? options.cssVarName
            : redefineVh
                ? /*
                  when redefining vh unit we follow this article name convention
                  https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
                */
                    'vh'
                : defaultOptions.cssVarName;
        return finalOptions;
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
    var passiveSupported = false;
    var eventListeners = [];
    /* istanbul ignore next */
    try {
        var options = Object.defineProperty({}, "passive", {
            get: function () {
                passiveSupported = true;
            },
        });
        window.addEventListener("test", options, options);
        window.removeEventListener("test", options, options);
    }
    catch (err) {
        passiveSupported = false;
    }
    function addListener(eventName, callback) {
        eventListeners.push({
            eventName: eventName,
            callback: callback,
        });
        window.addEventListener(eventName, callback, 
        /* istanbul ignore next */
        passiveSupported ? { passive: true } : false);
    }
    function removeAll() {
        eventListeners.forEach(function (config) {
            window.removeEventListener(config.eventName, config.callback);
        });
        eventListeners = [];
    }

    function updateCssVar(cssVarName, result) {
        document.documentElement.style.setProperty("--" + cssVarName, result.value + "px");
    }
    function formatResult(sizes, options) {
        return __assign({}, sizes, { unbind: removeAll, recompute: options.method });
    }
    function vhCheck(options) {
        var config = Object.freeze(getOptions(options));
        var result = formatResult(config.method(), config);
        // usefulness check
        if (!result.isNeeded && !config.force) {
            return result;
        }
        updateCssVar(config.cssVarName, result);
        config.onUpdate(result);
        // enabled by default
        if (!config.bind)
            return result;
        function onWindowChange() {
            window.requestAnimationFrame(function () {
                var sizes = config.method();
                updateCssVar(config.cssVarName, sizes);
                config.onUpdate(formatResult(sizes, config));
            });
        }
        // be sure we don't duplicates events listeners
        result.unbind();
        // listen for orientation change
        // - this can't be configured
        // - because it's convenient and not a real performance bottleneck
        addListener('orientationchange', onWindowChange);
        // listen to touch move for scrolling
        // – disabled by default
        // - listening to scrolling can be expansive…
        if (config.updateOnTouch) {
            addListener('touchmove', onWindowChange);
        }
        return result;
    }

    return vhCheck;

})));

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var elements_1 = require("./bootstrap/elements");
var browser_1 = require("./bootstrap/browser");
var cookie_1 = require("./bootstrap/cookie");
var input_counter_1 = require("./bootstrap/input-counter");
var resize_1 = require("./bootstrap/resize");
var scrollLock_1 = require("./bootstrap/scrollLock");
var burger_menu_1 = require("./bootstrap/burger-menu");
/* Polyfill */
require('vh-check')(); // Get reliable CSS vh sizes (https://github.com/Hiswe/vh-check)
window.onload = function () {
    var browser = new browser_1.Browser(), scrollLock = new scrollLock_1.ScrollLock(), resize = new resize_1.Resize(), burger = new burger_menu_1.BurgerMenu({
        scrollLock: scrollLock,
        $burger: document.getElementById('burger-button'),
        cssClassActive: 'js_menu-active',
    });
    /* Forms */
    new input_counter_1.InputCounter({
        cssClass: {
            wrap: "[data-bind=\"input-counter\"]",
            input: ".input-counter__input",
            button: ".input-counter__btn",
            disable: "--disable",
        }
    });
    /* Informations */
    new cookie_1.InformationCookie();
    var scrollLockToggle = document.getElementById('scrollLock');
    scrollLockToggle.onclick = function (e) {
        scrollLock.change();
        e.preventDefault();
        return false;
    };
    /* Inform stylesheed to remove style fallback for JavaScript elements */
    elements_1.html.classList.remove('js_no');
};
},{"./bootstrap/browser":4,"./bootstrap/burger-menu":5,"./bootstrap/cookie":6,"./bootstrap/elements":8,"./bootstrap/input-counter":9,"./bootstrap/resize":10,"./bootstrap/scrollLock":11,"vh-check":2}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var elements_1 = require("./elements");
var css_1 = require("./css");
function getScrollbarWidth() {
    var output = window.innerWidth - document.documentElement.clientWidth;
    elements_1.html.style.setProperty('--scrollbarWidth', String(output) + "px");
    return output;
}
exports.getScrollbarWidth = getScrollbarWidth;
function getScrollPosition() {
    var output = window.pageYOffset || elements_1.html.scrollTop;
    return output;
}
exports.getScrollPosition = getScrollPosition;
function getTransitionEvent() {
    var element = document.createElement("getTransitionEvent"), transitions = {
        "transition": "transitionend",
        "OTransition": "oTransitionEnd",
        "MozTransition": "transitionend",
        "WebkitTransition": "webkitTransitionEnd"
    };
    for (var key in transitions) {
        if (element.style[key] !== undefined) {
            return transitions[key];
        }
    }
    /* test-code */
    console.error("Browser\n- fired getTransitionEvent() function and return undefined transition");
    /* end-test-code */
}
exports.getTransitionEvent = getTransitionEvent;
/**
 * @class Browser
 */
var Browser = /** @class */ (function () {
    function Browser() {
        console.log("Browser");
        this.transitionEvent = getTransitionEvent();
        this.portable = this.getMobileOperatingSystem();
        this.refresh();
        /* test-code */
        console.table({
            width: this.width,
            height: this.height,
            responsive: this.responsive,
            orientation: this.orientation,
            portable: this.portable,
        });
        /* end-test-code */
    }
    ;
    /* Determine the mobile operating system */
    Browser.prototype.getMobileOperatingSystem = function () {
        var userAgent = navigator.userAgent || navigator.vendor;
        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return 'Windows Phone';
        }
        if (/android/i.test(userAgent)) {
            return 'Android';
        }
        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !!navigator.platform) {
            return 'iOS';
        }
        // PHP user agent
        if (elements_1.body.classList.contains('device-portable')) {
            return true;
        }
        return false;
    };
    ;
    Browser.prototype.refresh = function () {
        /* Prepare variables */
        var width = window.innerWidth, lastWidth = this.width, height = window.innerHeight, lastHeight = this.height, orientation = this.getOrientation(), lastOrientation = this.orientation;
        /* Set variables */
        this.width = width;
        this.height = height;
        this.responsive = this.getResponsive();
        /**
         * Don't refresh page if user change tab
         * @browser Opera
         */
        if (lastWidth === width && lastHeight === height && lastOrientation) {
            return false;
        }
    };
    Browser.prototype.getResponsive = function () {
        for (var key in css_1.breakpointsDefault) {
            var value = css_1.breakpointsDefault[key];
            if (window.matchMedia("(min-width: " + value + "px)").matches) {
                return key;
            }
        }
        return 'mobile';
    };
    Browser.prototype.getOrientation = function () {
        if (window.matchMedia("(orientation: portrait)").matches) {
            return 'portrait';
        }
        else {
            return 'landscape';
        }
    };
    return Browser;
}());
exports.Browser = Browser;
;
},{"./css":7,"./elements":8}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var elements_1 = require("./elements");
var BurgerMenu = /** @class */ (function () {
    function BurgerMenu(param) {
        this.active = false;
        this.moving = false;
        this.expandTime = 300;
        this.expandStyle = 'from-right';
        this.$button = param.$burger;
        this.cssClassActive = param.cssClassActive;
        this.scrollLock = param.scrollLock;
        this.refresh();
    }
    BurgerMenu.prototype.refresh = function () {
        var _this = this;
        this.$button.onclick = function () {
            if (_this.moving) {
                return false;
            }
            _this.moving = true;
            _this.toggle({
                end: function () {
                    _this.scrollLock.change();
                    _this.moving = false;
                }
            });
        };
    };
    BurgerMenu.prototype.toggle = function (callback) {
        if (callback.begin) {
            callback.begin();
        }
        elements_1.html.classList.toggle(this.cssClassActive);
        if (callback.end) {
            callback.end();
        }
    };
    return BurgerMenu;
}());
exports.BurgerMenu = BurgerMenu;
},{"./elements":8}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Inform users that your site uses cookies
 *
 * @class Cookie
 * @version 1.0
 * @require
 * JavaScript Cookie - https://github.com/js-cookie/js-cookie
 *
 * 21.05.2019 Convert jQuery code to vanilla JS
 */
var Cookies = require("js-cookie");
var elements_1 = require("./elements");
var InformationCookie = /** @class */ (function () {
    function InformationCookie(data) {
        var _this = this;
        this.data = {
            template: null,
        };
        this.getContent = function (callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'partials/cookies.html');
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4)
                    return;
                if (xhr.status >= 200 && xhr.status < 300) {
                    callback.apply(this, [xhr.responseText]);
                }
            };
        };
        /**
         * Show information
         */
        this.mount = function (cookiesContentHTML) {
            elements_1.body.insertAdjacentHTML('beforeend', cookiesContentHTML);
            _this.cookie = document.getElementById('js_cookies-information');
            _this.accept = document.querySelectorAll('.js_cookies-close');
            _this.bindClick();
        };
        this.show = function () {
            if (_this.data.template) {
                _this.mount(_this.data.template);
            }
            else {
                _this.getContent(function (cookiesContentHTML) {
                    _this.mount(cookiesContentHTML);
                });
            }
        };
        if (!Cookies.get('using_cookies')) {
            this.data = Object.assign(this.data, data);
            this.show();
            /* test-code */
            console.log("Cookie\n - show information about using cookies");
            /* end-test-code */
        }
        /* test-code */
        else {
            console.log("Cookie\n - information already showed");
        }
        /* end-test-code */
    }
    InformationCookie.prototype.bindClick = function () {
        var _this = this;
        this.accept.forEach(function (item) {
            item.addEventListener('click', function () {
                _this.onClick();
            });
        });
    };
    InformationCookie.prototype.onClick = function () {
        Cookies.set('using_cookies', 1);
        this.cookie.classList.add("js_cookies-information--hide");
        /* test-code */
        console.log("Cookie\n - accepted cookies");
        /* end-test-code */
        return false;
    };
    return InformationCookie;
}());
exports.InformationCookie = InformationCookie;
},{"./elements":8,"js-cookie":1}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var root = document.querySelector(':root');
var CSS = window.getComputedStyle(root);
exports.breakpointsDefault = {
    desktop: Number(CSS.getPropertyValue("--desktop")),
    tablet: Number(CSS.getPropertyValue("--tablet")),
    fablet: Number(CSS.getPropertyValue("--fablet")),
    mobile: Number(CSS.getPropertyValue("--mobile")),
};
exports.breakpointsHeader = {
    desktop: Number(CSS.getPropertyValue("--headerDesktop")),
    tablet: Number(CSS.getPropertyValue("--headerTablet")),
    fablet: Number(CSS.getPropertyValue("--headerFablet")),
    mobile: Number(CSS.getPropertyValue("--headerMobile")),
};
},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.body = document.body;
exports.html = document.documentElement;
exports.CSS = window.getComputedStyle(exports.html);
},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InputCounter = /** @class */ (function () {
    function InputCounter(data) {
        this.database = [];
        this.active = false;
        this.cssClass = data.cssClass;
        this.refresh();
        this.active = true;
    }
    InputCounter.prototype.changeValue = function () {
    };
    InputCounter.prototype.bind = function () {
    };
    InputCounter.prototype.unbind = function () {
    };
    InputCounter.prototype.loopElement = function () { };
    InputCounter.prototype.add = function (wrap) {
        var input, button, value, max, min;
        input = wrap.querySelector('.input-counter__input');
        button = wrap.querySelectorAll('.input-counter__btn');
        value = Number(input.value);
        min = Number(input.min);
        max = Number(input.max);
        this.database.push({
            wrap: wrap,
            input: input,
            button: button,
            value: value,
            max: max,
            min: min,
        });
        // Bind input change
        input.onfocus = function () {
            input.select();
        };
        input.oninput = function () {
            var valueNew = Number(input.value);
            console.log(valueNew);
            if (!valueNew) {
                input.value = String(value);
                return false;
            }
            value = valueNew;
            if (valueNew >= max) {
                value = max;
                console.log("max");
            }
            else if (valueNew <= min) {
                value = min;
                console.log("min");
            }
            input.value = String(value);
            input.select();
        };
    };
    InputCounter.prototype.refresh = function () {
        var _this = this;
        /* Off previous bind clicks */
        if (this.active) {
            // this.$input.off("click");
            // this.$button.off("input");
            this.active = false;
        }
        ;
        /* Get elements wrap */
        var wrap = document.querySelectorAll("[data-bind=\"input-counter\"]");
        /* Fill database */
        wrap.forEach(function (item) {
            _this.add(item);
        });
        console.log(this.database);
        this.active = true;
    };
    return InputCounter;
}());
exports.InputCounter = InputCounter;
},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resize = /** @class */ (function () {
    /* Constructor */
    function Resize(data) {
        /* Arguments */
        this.data = {
            template: false,
        };
        /* Time to fire resize */
        this.resizeTime = 400;
    }
    Resize.prototype.trigger = function () {
    };
    Resize.prototype.add = function () {
    };
    Resize.prototype.clean = function () {
    };
    Resize.prototype.run = function () {
    };
    Resize.prototype.resize = function () {
    };
    return Resize;
}());
exports.Resize = Resize;
},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var elements_1 = require("./elements");
var browser_1 = require("./browser");
/**
 * Toggle scroll lock for body element
 * Export "%scrollbar-placeholder" to include scrollbar space
 *
 * @class ScrollLock
 * @version 1.0
 * @css
 * scroll-lock.scss
 * @require
 * getScrollbarWidth, getScrollPosition
 *
 * 20.06.2019 Add
 */
var ScrollLock = /** @class */ (function () {
    function ScrollLock() {
    }
    ScrollLock.prototype.on = function () {
        this.positionTop = browser_1.getScrollPosition();
        elements_1.body.style.top = "-" + this.positionTop + "px";
        elements_1.html.classList.add('js_scroll-lock');
        this.state = true;
    };
    ScrollLock.prototype.off = function () {
        elements_1.html.classList.remove('js_scroll-lock');
        window.scrollTo(0, this.positionTop);
        elements_1.body.style.top = '';
        this.positionTop = 0;
        this.state = false;
    };
    ScrollLock.prototype.change = function (state) {
        if (state && this.state === state) {
            /* test-code */
            console.info("ScrollLock\n- fired scrollLock() function with parameter '" + state + "', but state is already '" + this.state + "'");
            /* end-test-code */
            return false;
        }
        browser_1.getScrollbarWidth();
        if (state === true || this.state) {
            this.off();
        }
        else {
            this.on();
        }
        /* test-code */
        console.info("ScrollLock\n- fired scrollLock() function with parameter '" + state + "', state is '" + this.state + "'");
        /* end-test-code */
    };
    return ScrollLock;
}());
exports.ScrollLock = ScrollLock;
},{"./browser":4,"./elements":8}]},{},[3])

//# sourceMappingURL=app.dev.js.map
