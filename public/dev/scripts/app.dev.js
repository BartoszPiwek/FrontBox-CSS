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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var browser_1 = require("./frontbox/data/browser");
var cookie_1 = require("./frontbox/information/cookie");
var elements_1 = require("./frontbox/data/elements");
var input_counter_1 = require("./frontbox/form/input-counter");
var v_units_1 = require("./frontbox/polyfill/v-units");
var resize_1 = require("./frontbox/bind/resize");
window.onload = function () {
    var browser = new browser_1.Browser(), resize = new resize_1.Resize();
    /**
     * Forms
     */
    new input_counter_1.InputCounter({
        cssClass: {
            wrap: "[data-bind=\"input-counter\"]",
            input: ".input-counter__input",
            button: ".input-counter__btn",
            disable: "--disable",
        }
    });
    /**
     * Informations
     */
    new cookie_1.InformationCookie();
    /**
     * Polyfill
     */
    new v_units_1.vUnits();
    /* Inform stylesheed to remove style fallback for JavaScript elements */
    elements_1.html.classList.remove('js_no');
};
},{"./frontbox/bind/resize":3,"./frontbox/data/browser":4,"./frontbox/data/elements":6,"./frontbox/form/input-counter":7,"./frontbox/information/cookie":8,"./frontbox/polyfill/v-units":9}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var elements_1 = require("./../data/elements");
var css_1 = require("./../data/css");
/**
 * @class Browser
 */
var Browser = /** @class */ (function () {
    function Browser() {
        console.log("Browser");
        this.transitionEvent = this.getTransitionEvent();
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
    Browser.prototype.getTransitionEvent = function () {
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
    };
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
},{"./../data/css":5,"./../data/elements":6}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.body = document.getElementById('body');
exports.html = document.getElementsByTagName('html')[0];
exports.root = document.documentElement;
},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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
var elements_1 = require("../data/elements");
var InformationCookie = /** @class */ (function () {
    function InformationCookie(data) {
        var _this = this;
        this.data = {
            template: false,
        };
        this.getContent = function (callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'cookies.html');
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
},{"../data/elements":6,"js-cookie":1}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var elements_1 = require("../data/elements");
var vUnits = /** @class */ (function () {
    function vUnits() {
        var _this = this;
        this.template = "<p id='test-v-units' style='width: 50vw; opacity: 0;'></p>";
        if (this.test()) {
            this.CSS = elements_1.root.style;
            this.refresh();
            window.onresize = function () {
                _this.onResize();
            };
        }
    }
    vUnits.prototype.test = function () {
        elements_1.body.insertAdjacentHTML('beforeend', this.template);
        var vUnitTest = document.getElementById("test-v-units");
        var elemWidth = Number(getComputedStyle(vUnitTest, null).width);
        var halfWidth = Number(window.innerWidth / 2);
        vUnitTest.parentNode.removeChild(vUnitTest);
        return elemWidth !== halfWidth;
    };
    vUnits.prototype.onResize = function () {
        var active = document.getElementsByClassName('full-height');
        if (active.length) {
            this.refresh();
        }
    };
    vUnits.prototype.refresh = function () {
        this.heightSize = window.innerHeight * 0.01;
        this.CSS.setProperty('--vh', this.heightSize + "px");
    };
    return vUnits;
}());
exports.vUnits = vUnits;
},{"../data/elements":6}]},{},[2])

//# sourceMappingURL=app.dev.js.map
