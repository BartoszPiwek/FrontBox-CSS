(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
/**
 * Libs
 */
// global.$ = require('jquery');
// global.jQuery = $;
// global.Cookies = require('js-cookie');
// require('slick-carousel');
// require('select2')();
// require('./frontbox/libs/getStyle');
// var 
// Sharer = require('slick-carousel'); // http://ellisonleao.github.io/sharer.js/

/**
 * jQuery plugins
 */
require('./frontbox/jquery/scrollBlock')();

(function($, _) {
    'use strict';

    /**
     * Elements
     */
    var 
    ELEMENTS = {
        $body: $("body"),
        $header: $("#header"),
        $headerPlaceholder: $("#header-placeholder"),
        $window: $(window),
        $overlay: $("#page-overlay"),
        $html: $('html'),
        $page: $('html, body'),
    };

    /* test-code */
    /**
     * Debug
     */
    global.DEBUG = {};

    global.DEBUG.console = require('./frontbox/debug/console')({
        // open: true,
        ELEMENTS: ELEMENTS,
    });
    global.DEBUG.variable = require('./frontbox/debug/variables')({
        OPTIONS: {
            open: true,
        },
        ELEMENTS: ELEMENTS,
    });
    /* end-test-code */
    
    /**
     * Required
     */

    /* CSS Variables */
    const
    root = document.querySelector(':root'),
    CSS = window.getComputedStyle(root),
    BREAKPOINTS = {
        desktop: Number(CSS.getPropertyValue("--desktop")),
        tablet: Number(CSS.getPropertyValue("--tablet")),
        fablet: Number(CSS.getPropertyValue("--fablet")),
        mobile: Number(CSS.getPropertyValue("--mobile")),
    };

    /* Resize */
    var RESIZE = require('./frontbox/bind/resize')({
        ELEMENTS: ELEMENTS,
        template: {
            // loading: false,
            loading: `<div class="animation-donut-spinner"></div>`,
        },
    });

    var DEVICE = require('./frontbox/data/device')({
        ELEMENTS: ELEMENTS,
        RESIZE: RESIZE,
        BREAKPOINTS: BREAKPOINTS,
    });


    var FUNCTIONS = require('./frontbox/functions');

    var BROWSER = require('./frontbox/data/browser')();
    var SCROLL = require('./frontbox/data/scroll')({
        DEVICE: DEVICE
    });
    
    /**
     * Animations
     */
    var transitionHeight = require('./frontbox/transitionHeight')({
        BROWSER : BROWSER,
    });



    /**
     * Smooth scroll to target
     * 
     *!@param {ELEMENTS} ELEMENTS
     *!@param {SCROLL} SCROLL
     *!@param {FUNCTIONS} FUNCTIONS
     */
    var scrollTo = require('./frontbox/scrollTo')({
        ELEMENTS: ELEMENTS,
        SCROLL: SCROLL,
        FUNCTIONS: FUNCTIONS,
        SETTINGS: {
            // active automatic scroll page to element via URL hash
            autoScroll: false,
            // divide distance by this value to calculate time scroll
            time: 2,
            // min time scroll
            minTime: 400,
            // max time scroll
            maxTime: 1200,
            // run autoScroll when hash in URL is begin with this string
            prefixAutoScroll: 'scroll-'
        },
     });

    /**
     * Create fixed element when page is scroll
     * 
     *!@param {ELEMENTS} ELEMENTS
     *!@param {ELEMENTS} SCROLL
     * @param {null, number} SETTINGS.offset when create sticky element
     * null - automatic 
     * number - how many pixel user may scroll to trigger sticky   
     * @param {bool} SETTINGS.placeholder add height to placeholder when trigger sticky
     * set true only if @header-always-sticky = false
     * @param {jQuery Object} $elementSpy sticky element 
     */
    require('./frontbox/navbar/sticky')({
        ELEMENTS: ELEMENTS,
        SCROLL: SCROLL,
        SETTINGS: {
            placeholder: true,
            offset: false,
        },
        $elementSpy: $("#sticky-element"),
    });

    /**
     * Burger menu
     * 
     * !@param {ELEMENTS} ELEMENTS
     * !@param {FUNCTIONS} FUNCTIONS
     * @param {Bool} OPTIONS.dropdown
     * menu items can be expand
     * @param {Bool, Number} OPTIONS.dropdownResponsive
     * breakpoint to trigger item expand
     */
    require('./frontbox/navbar/burgerMenu')({
        ELEMENTS: ELEMENTS,
        FUNCTIONS: FUNCTIONS,
        OPTIONS: {
            dropdown: true,
            dropdownResponsive: 2,
        }
    });

    /**
     * Cookies
     * 
     * !@param {ELEMENTS} ELEMENTS
     * @param {String} OPTIONS.imgSrc patch to image
     * @param {String} OPTIONS.content content text
     */
    // require('./frontbox/cookies')({
    //     ELEMENTS: ELEMENTS,
    //     OPTIONS: {
    //         imgSrc: `/assets/images/cookies.png`,
    //         content: `W naszym serwisie wykorzystujemy pliki Cookies. Są one zapisywane na dysku urządzenia końcowego użytkownika w celach statystycznych oraz ułatwienia korzystania z serwisu. Ustawienia te zawsze można zmienić. Szczegółowe informacje o plikach Cookies znajdują się w <a href="#" target="_blank">Polityce Prywatności</a>`,
    //     },
    // });

    /**
     * Tabs
     * 
     * !@param {ELEMENTS} ELEMENTS
     * @param {String} OPTIONS.imgSrc patch to image
     * @param {String} OPTIONS.content content text
     */
    require('./frontbox/tabs')({
        ELEMENTS: ELEMENTS,
        OPTIONS: {
            imgSrc: `/assets/images/cookies.png`,
            content: `W naszym serwisie wykorzystujemy pliki Cookies. Są one zapisywane na dysku urządzenia końcowego użytkownika w celach statystycznych oraz ułatwienia korzystania z serwisu. Ustawienia te zawsze można zmienić. Szczegółowe informacje o plikach Cookies znajdują się w <a href="#" target="_blank">Polityce Prywatności</a>`,
        },
    });

    /**
     * Show more content
     * 
     * !@param {TRANSITIONHEIGHT} transitionHeight
     */
    require('./frontbox/showMore')({
        TRANSITIONHEIGHT: transitionHeight,
        RESIZE: RESIZE,
    });

    /**
     * Google Maps API
     * 
     * !@param {FUNCTIONS} FUNCTIONS
     * !@param {SCROLL} SCROLL
     * @param {Number} OPTIONS.center patch to image
     * @param {Number} OPTIONS.content content text
     */
    // var googleMaps = require('./googleMaps')({
    //     FUNCTIONS: FUNCTIONS,
    //     SCROLL: SCROLL,
    //     OPTIONS: {
    //         // First position
    //         center: {
    //             lat: 51.919437,
    //             lng: 19.145136,
    //         },
    //         mapID: "map",
    //         zoom: 5.8,
    //         disableDefaultUI: true,
    //         streetViewControl: false,
    //         draggable: false,
    //         scaleControl: false,
    //         scrollwheel: false,
    //         styles: require('./googleMapsStyle'),
    //         markerSize: [21, 34],
    //     },
    // });

    /**
     * Select2
     */
    // var $select2 = $(".select2");
    // if ($select2.length) {
    //    $select2.select2({
    //        minimumResultsForSearch: -1,
    //    });
    // }

    /* test-code */
    var
    $iframe = $("[data-iframe]");
    $iframe.each(function (index, element) {
        var 
        $this = $(this),
        find = $this.attr("data-iframe"),
        $content = $(`[data-iframe-content="${find}"]`);

        $this.contents().find("body").append( '<link rel="stylesheet" type="text/css" href="/css/style.dev.css">' );
        $this.contents().find("body").append( '<meta name="viewport" content="width=device-width, initial-scale=1">' );
        $this.contents().find("body").append( '<style> body,html { padding: 0!important; margin: 0!important; position: static!important; height: auto!important; min-height: auto!important; } </style>' );
        $this.contents().find("body").append( $content );
    });
    /* end-test-code */

    /* test-code */
    DEBUG.console.add("Running correct...");
    /* end-test-code */

    // Inform stylesheed to remove style fallback for JavaScript elements
    ELEMENTS.$html.removeClass("no_js");

})($, window);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./frontbox/bind/resize":2,"./frontbox/data/browser":3,"./frontbox/data/device":4,"./frontbox/data/scroll":5,"./frontbox/debug/console":6,"./frontbox/debug/variables":7,"./frontbox/functions":8,"./frontbox/jquery/scrollBlock":9,"./frontbox/navbar/burgerMenu":10,"./frontbox/navbar/sticky":11,"./frontbox/scrollTo":12,"./frontbox/showMore":13,"./frontbox/tabs":14,"./frontbox/transitionHeight":15}],2:[function(require,module,exports){
/**
 * Resize
 */

module.exports = (data) => {

    var
    QUEUE = {
        width: {},
        height: {},
        all: {},
    };

    var
    DATA = {
        active: false,
        time: 0,
        loading: false,
        appendTemplate: false,
    };

    var
    resizeTime = 400;

    var
    ELEMENTS,
    TEMPLATE = {
        loading: null,
    };

    var
    start = () => {
        ELEMENTS = data.ELEMENTS;
        TEMPLATE.loading = data.template.loading;
    };

    var
    trigger = () => {

        DATA.time = 500;

        if (!DATA.active) {
            DATA.active = true;
            resize();
        }
    };

    var
    add = (name, callback, type) => {
        QUEUE[type][name] = [callback];
        
        /* test-code */
        DEBUG.console.add(`resize: add ${name}`);
        /* end-test-code */
    };

    var
    remove = (name, type) => {
        delete queue[type][name];

        /* test-code */
        DEBUG.console.add(`resize: remove ${name}`);
        /* end-test-code */
    };

    var
    clean = () => {
        queue = {};

        /* test-code */
        DEBUG.console.add(`resize: clean queue`);
        /* end-test-code */
    };

    var
    run = (type) => {
        switch (type) {
            case 'width':
                resizeWidth();
                break;
            case 'height':
                resizeHeight();
                break;
            default:
                resizeAll();
                break;
        }
    };

    var
    resize = (type) => {

        /* Append loading template */
        if ( !DATA.appendTemplate && TEMPLATE.loading ) {
            ELEMENTS.$body.append( `<div class="js_resizeLoading"><div class="js_resizeLoading__content">${TEMPLATE.loading}</div></div>` );
            DATA.appendTemplate = true;
        }

        window.setTimeout( () => {

            DATA.time -= 50;

            if (DATA.time > 0) {
                if ( !DATA.loading ) {
                    DATA.loading = true;
                    if ( TEMPLATE.loading ) {
                        ELEMENTS.$body.addClass("js_resize");
                    }
                }
                resize(type);
            } 
            else {
                if ( DATA.loading ) {
                    DATA.loading = false;
                    if ( TEMPLATE.loading) {
                        ELEMENTS.$body.removeClass("js_resize");
                    }
                }
                DATA.active = false;
                run(type);
            }
            /* test-code */
            DEBUG.variable.refresh("Resize");
            /* end-test-code */
        }, 50);
    };
    var 
    resizeWidth = () => {
        $.each(QUEUE.width, function(index, value) {
            (value[0])();
        });
    };
    var
    resizeHeight = () => {
        $.each(QUEUE.height, function(index, value) {
            (value[0])();
        });
    };
    var
    resizeAll = () => {
        resizeHeight();
        resizeWidth();
        $.each(QUEUE.all, function(index, value) {
            (value[0])();
        });
    };


    /* test-code */
    DEBUG.variable.add("Resize", DATA);
    /* end-test-code */

    start();

    return {
        add: add,
        remove: remove,
        resize: resize,
        trigger: trigger,
    };
  
};
},{}],3:[function(require,module,exports){
module.exports = () => {

    var 
    
    DATA = {},

    whichTransitionEvent = () => {
        var t,
            el = document.createElement("fakeelement");
      
        var transitions = {
          "transition"      : "transitionend",
          "OTransition"     : "oTransitionEnd",
          "MozTransition"   : "transitionend",
          "WebkitTransition": "webkitTransitionEnd"
        }
      
        for (t in transitions){
          if (el.style[t] !== undefined){
            return transitions[t];
          }
        }
    },

    checkWitchTransitionEvent = () => {
        DATA.witchTransitionEvent = whichTransitionEvent();
    },

    refresh = () => {
        DATA.transitionEvent = checkWitchTransitionEvent();
    };

    return DATA;

};
},{}],4:[function(require,module,exports){
module.exports = (argument) => {
    
    var 
    BREAKPOINTS         = null,
    ELEMENTS            = null,
    RESIZE              = null;

    var
    DATA = {
        width           : null,
        height          : null,
        responsive      : null,
        os              : null,
    };

    /* Start module */
    const
    start = () => {

        /* Prepare arguments data */
        BREAKPOINTS = argument.BREAKPOINTS;
        ELEMENTS = argument.ELEMENTS;
        RESIZE = argument.RESIZE;

        DATA.os = getMobileOperatingSystem();
        refresh();

        /* Trigger function if user resize page */
        ELEMENTS.$window.on('resize orientationchange', refresh);
    };

    /* Refresh module */
    const
    refresh = () => {

        /* Prepare data */
        let
        width = ELEMENTS.$window.width(),
        lastWidth = DATA.width;
        height = ELEMENTS.$window.height();

        DATA.width = width;
        DATA.height = height;
        DATA.responsive = null;

        /* Check active breakpoint */ 
        for (const key in BREAKPOINTS) {
            const value = BREAKPOINTS[key];
            
            if (width > value) {
                DATA.responsive = key;
                break;
            }
        }
        if (!DATA.responsive) {
            DATA.responsive = 'mobile';
        }

        /* Trigger resize queue (ignore first time) */
        if (lastWidth && !DATA.os) {
            if (DATA.width === lastWidth) {
                RESIZE.trigger('width');
            }
            else {
                RESIZE.trigger();
            }
        }

        /* test-code */
        DEBUG.variable.refresh('device');
        /* end-test-code */
    };

    /* Determine the mobile operating system */
    const 
    getMobileOperatingSystem = () => {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        
        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return "Windows Phone";
        }
      
        if (/android/i.test(userAgent)) {
            return "Android";
        }
      
        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
        }
      
        return false;
    };
    
    /* test-code */
    DEBUG.variable.add('device', DATA);
    /* end-test-code */

    start();

    return DATA;
};
},{}],5:[function(require,module,exports){
module.exports = (data) => {

    var 
    DATA = {
        lastCenter          : null,
        center              : null,
        top                 : null,
        speed               : null,
        direction           : null,
    },
    DEVICE = data.DEVICE;


    var bind = () => {

        $(window).scroll(refresh);

        $(window).on('resize orientationchange', function() {
            refresh();
        });

        refresh();
    };

    var refresh = () => {
        DATA.lastCenter = DATA.center || 0;

        DATA.top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        DATA.center = DATA.top + DEVICE.height / 2;

        DATA.speed = Math.abs(DATA.lastCenter - DATA.center);

        if (DATA.center > DATA.lastCenter) {
            DATA.direction = "down";
        } else {
            DATA.direction = "up";
        }

        /* test-code */
        DEBUG.variable.refresh('scroll');
        /* end-test-code */
    };

    /* test-code */
    DEBUG.variable.add('scroll', DATA);
    /* end-test-code */

    bind();

    return DATA;
};
},{}],6:[function(require,module,exports){
module.exports = (data) => {

    DATA = {
        $container: null,
        $element: null,
        $button: null,
        $body: null,
        open: false,
    };

    $.extend( DATA, data );
    
    var start = (data) => {

        var debugBoxClass = 'debug-box debug-box--console';
        if (!DATA.open) {
            debugBoxClass += ' debug-box--hide';
        }
    
        var debugBox = $(`<div class='${debugBoxClass}' id='debug-box-console'></div>`);
        var debugBoxButton = $("<div id='debug-box-console-button' class='debug-box__button'>FrontBox console</div>");
        var debugBoxContainer = $("<div id='debug-box-console-container' class='debug-box__container'></div>");
    
        DATA.ELEMENTS.$body.append(debugBox);
        DATA.$element = $("#debug-box-console");
    
        DATA.$element.append(debugBoxButton);
        DATA.$element.append(debugBoxContainer);
    
        DATA.$button = $("#debug-box-console-button");
        DATA.$container = $("#debug-box-console-container");
    
        var toggleDebugBox = () => {
            DATA.$element.toggleClass("debug-box--hide");
        };
        
        DATA.$button.on("click", toggleDebugBox);
    
    };
    
    var add = (addString, addonClass = '') => {
        DATA.$container.prepend("<p class='" + addonClass + "'>"+addString+"</p>");
    };

    start();

    return {
        add: add,
    };

};
},{}],7:[function(require,module,exports){
module.exports = (argument) => {

    var 
    ELEMENTS = null;

    var
    BOX = {
        $container: null,
        $content: null,
        $button: null,
        $body: null,
    },
    OPTIONS = {
        open: false,
    };

    const
    CLASS = {
        container       : `debug-box debug-box--variables`,
        button          : `debug-box__button`,
        content         : `debug-box__container`,
        item            : `debug-box__item`,
    };

    var
    CONTENT = {};

    /* Start module */
    var 
    start = (data) => {

        /* Prepare arguments data */
        $.extend( OPTIONS, argument.OPTIONS );
        ELEMENTS = argument.ELEMENTS;

        /* Check if container must be default open */
        if (!OPTIONS.open) {
            CLASS.container += ' debug-box--hide';
        }
        
        /* Create template */
        BOX.$container      = $(`<div class='${CLASS.container}'></div>`);
        BOX.$button         = $(`<div class='${CLASS.button}'>FrontBox variables</div>`);
        BOX.$content        = $(`<div class='${CLASS.content}'></div>`);
        
        /* Draw template */
        ELEMENTS.$body.append( BOX.$container );
        BOX.$container.append( BOX.$button );
        BOX.$container.append( BOX.$content );
        
        /* Bind toggle container */
        BOX.$button.on("click", toggleContainer);
    };
    

    /* Show data in content */
    const
    add = (dataName, DATA) => {
        
        CONTENT[dataName] = {
            data: DATA,
            name: dataName.split(" ").join("-").toLowerCase(),
        };

        BOX.$content.append(`<p class="${CLASS.item}">${CONTENT[dataName].name}</p>`);
        
        for (const key in DATA) {
            const value = DATA[key];

            let
            name = key.split(" ").join("-").toLowerCase(),
            id = `debug-variable-${CONTENT[dataName].name}-${name}`;
            $item = $(`<p> ${key} <span id='${id}'>${value}</span> </p>`);
            
            BOX.$content.append($item);

            $item.on("click", {$item}, toggleValue);
        }
    };

    /* Refresh data name in content */ 
    const
    refresh = (name) => {
        var
        item = CONTENT[name],
        data = item.data;

        for (const key in data) {
            const value = data[key];

            let
            name = key.split(" ").join("-").toLowerCase(),
            find = `debug-variable-${item.name}-${name}`;

            $(`#${find}`).text(value);
        }
    };
    
    /* Toogle container */
    const
    toggleContainer = () => {
        BOX.$container.toggleClass("debug-box--hide");
    };
    /* Toogle value */
    const
    toggleValue = (e) => {      
        e.data.$item.toggleClass("js_focus");
    };

    start();

    return {
        add: add,
        refresh: refresh,
    };

};
},{}],8:[function(require,module,exports){
module.exports = {

    /**
     * Convert string to boolean
     * fastest method http://jsben.ch/cqVSj
     */
    getBoolean(value) {
		switch (value){
			case true:
			case "true":
			case 1:
			case "1":
			case "on":
			case "yes":
				return true;
			default: 
				return false;
		}
    },
    
    /*
     * Determine Overflow
     */
    determineOverflow: function(content, container) {

        if (content instanceof jQuery)
        {
			content = content[0];
		}
        if (container instanceof jQuery)
        {
			container = container[0];
		}

		var
		containerMetrics = container.getBoundingClientRect(),
		containerMetricsRight = Math.floor(containerMetrics.right),
		containerMetricsLeft = Math.floor(containerMetrics.left),
		contentMetrics = content.getBoundingClientRect(),
		contentMetricsRight = Math.floor(contentMetrics.right),
		contentMetricsLeft = Math.floor(contentMetrics.left);

        if (containerMetricsLeft > contentMetricsLeft && containerMetricsRight < contentMetricsRight) 
        {
			return "both";
        } 
        else if (contentMetricsLeft <= containerMetricsLeft) 
        {
			return "left";
        } 
        else if (contentMetricsRight >= containerMetricsRight)
        {
			return "right";
        }
        else 
        {
			return "none";
		}
    },
        
};
},{}],9:[function(require,module,exports){
module.exports = () => {

    /**
     * $.disablescroll
     * Author: Josh Harrison - aloof.co
     *
     * Disables scroll events from mousewheels, touchmoves and keypresses.
     * Use while jQuery is animating the scroll position for a guaranteed super-smooth ride!
     */

    ;(function($) {

        "use strict";

        var instance, proto;

        function UserScrollDisabler($container, options) {
            // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
            // left: 37, up: 38, right: 39, down: 40
            this.opts = $.extend({
                handleWheel : true,
                handleScrollbar: true,
                handleKeys : true,
                scrollEventKeys : [32, 33, 34, 35, 36, 37, 38, 39, 40]
            }, options);
            
            this.$container = $container;
            this.$document = $(document);
            this.lockToScrollPos = [0, 0];

            this.disable();
        }

        proto = UserScrollDisabler.prototype;

        proto.disable = function() {
            var t = this;

            if(t.opts.handleWheel) {
                t.$container.on(
                    "mousewheel.disablescroll DOMMouseScroll.disablescroll touchmove.disablescroll",
                    t._handleWheel
                );
            }
            
            if(t.opts.handleScrollbar) {
                t.lockToScrollPos = [
                    t.$container.scrollLeft(),
                    t.$container.scrollTop()
                ];
                t.$container.on("scroll.disablescroll", function() {
                    t._handleScrollbar.call(t);
                });
            }

            if(t.opts.handleKeys) {
                t.$document.on("keydown.disablescroll", function(event) {
                    t._handleKeydown.call(t, event);
                });
            }
        };
            
        proto.undo = function() {
            var t = this;
            t.$container.off(".disablescroll");
            if(t.opts.handleKeys) {
                t.$document.off(".disablescroll");
            }
        };
        
        proto._handleWheel = function(event) {
            event.preventDefault();
        };
        
        proto._handleScrollbar = function() {
            this.$container.scrollLeft(this.lockToScrollPos[0]);
            this.$container.scrollTop(this.lockToScrollPos[1]);
        };
        
        proto._handleKeydown = function(event) {
            for (var i = 0; i < this.opts.scrollEventKeys.length; i++) {
                if (event.keyCode === this.opts.scrollEventKeys[i]) {
                    event.preventDefault();
                    return;
                }
            }
        };
            

        // Plugin wrapper for object
        $.fn.scrollDisable = function(method) {

            // If calling for the first time, instantiate the object and save
            // reference. The plugin can therefore only be instantiated once per
            // page. You can pass options object in through the method parameter.
            if( ! instance && (typeof method === "object" || ! method)) {
                instance = new UserScrollDisabler(this, method);
            }

            // Instance created, no method specified. Call disable again
            if(instance && typeof method === "undefined") {
                instance.disable();
            }

            // Instance already created, and a method is being explicitly called,
            // e.g. .scrollDisable('undo');
            else if(instance && instance[method]) {
                instance[method].call(instance);
            }

        };

        // Global access
        window.UserScrollDisabler = UserScrollDisabler;

    })(jQuery);

};
},{}],10:[function(require,module,exports){
module.exports = (data) => {

    var
        DATA = {
            $burger: null,
            $menu: null,
            $menu_container: null,
        },
        ELEMENTS = data.ELEMENTS,
        FUNCTIONS = data.FUNCTIONS,
        SETTINGS = {
            wait: 300,
            style: 'under-header',
        },
        active = false,
        moving = false;


    if (data.SETTINGS) {
        $.extend(DATA, data.SETTINGS);
    }

    var start = (settings = false) => {

        DATA.$burger = $("#burger-button");


        if (DATA.$burger.length) {
            DATA.$menu = $("#burger-menu");
            DATA.$menu_container = $("#burger-menu-container");
        }

        DATA.$burger.on("click", burgerClick);

        /* test-code */
        // DEBUG.variable.add({
        //     'Burger active': active,
        //     'Burger moving': moving,
        // });
        /* end-test-code */
    };

    var toggleOff = () => {

        /* test-code */
        DEBUG.console.add("Burger toggleOff", "click");
        /* end-test-code */

        moving = true;
        active = false;

        ELEMENTS.$html.removeClass('js_menu-active');


        /* test-code */
        // DEBUG.variable.add({
        //     'Burger moving': moving,
        //     'Burger active': active,
        // });
        /* end-test-code */

        window.setTimeout(function() {
            ELEMENTS.$body.scrollDisable("undo");
            moving = false;
            ELEMENTS.$html.removeClass('js_menu-active--end');

            /* test-code */
            // DEBUG.variable.add({
            //     'Burger moving': moving,
            // });
            /* end-test-code */

        }, SETTINGS.wait);

    };

    var toggleOn = () => {
        ELEMENTS.$body.scrollDisable();

        /* test-code */
        DEBUG.console.add("Burger toggleOn", "click");
        /* end-test-code */

        if (SETTINGS.style) {
            switch (SETTINGS.style) {

                /**
                 * For burger animation
                 * @import "../plugins/animation/navbar/under-header";
                 */
                case 'under-header':
                    DATA.$menu = DATA.$menu_container.offsetHeight + 'px';
                    break;

                default:
                    break;
            }
        }

        ELEMENTS.$html.addClass('js_menu-active');
        ELEMENTS.$overlay.on('click', toggleOverlay);

        moving = true;
        active = true;

        /* test-code */
        // DEBUG.variable.add({
        //     'Burger active': active,
        //     'Burger moving': moving,
        // });
        /* end-test-code */

        window.setTimeout(function() {

            ELEMENTS.$html.addClass('js_menu-active--end');
            moving = false;

            /* test-code */
            // DEBUG.variable.add({
            //     'Burger moving': moving,
            // });
            /* end-test-code */

        }, SETTINGS.wait);

    };

    var toggleOverlay = () => {

        /* test-code */
        DEBUG.console.add("Burger overlay toggleOff", "click");
        /* end-test-code */

        ELEMENTS.$overlay.off('click', toggleOverlay);

        toggleOff();

        return false;
    };

    var burgerClick = () => {

        if (!moving) {

            /* test-code */
            DEBUG.console.add("Burger clicked", "click");
            /* end-test-code */

            if (active) {
                toggleOff();
            } else {
                toggleOn();
            }

        }
        /* test-code */
        else {
            DEBUG.console.add("Burger click blocked. Burger is moving");
        }
        /* end-test-code */

        return false;
    };

    start();

};
},{}],11:[function(require,module,exports){
module.exports = (data) => {

    var 
    SETTINGS = {
        spyTop: true,
        offset: 1,
        spyTopClass: 'js_sticky-element--active',
    },
    ELEMENTS = data.ELEMENTS,
    SCROLL = data.SCROLL,
    $elementSpy = data.$elementSpy,
    DATA = {
        height: null,
        offset: null,
    },
    active = false,
    position = null;

    if (data.SETTINGS) {
        $.extend(DATA, data.SETTINGS);
    }

    var start = (data) => {

        if ($elementSpy.length) {

            $(window).on('resize orientationchange', function() {
                refresh();
            });
    
            refresh();
            
            if (SETTINGS.spyTop) 
            {
                spyTop();
    
                ELEMENTS.$window.on("scroll", () => {
                    spyTop();
                });   
            }

            /* test-code */
            DEBUG.console.add(`Start sticky.js {offset: ${DATA.offset}; }`);
            /* end-test-code */
        }
    };

    var refresh = () => {
        calculateHeader();
        
        if (!SETTINGS.offset) {
            DATA.offset = SETTINGS.offset;
        }
        else {
            DATA.offset = $elementSpy.offset().top;
        }
    };

    var calculateHeader = (data) => {

        position = $elementSpy.offset().top;
        DATA.height = $elementSpy.outerHeight(true);

        /* test-code */
        // DEBUG.variable.add({
        //     "Header height": DATA.height,
        //     "Header position": position,
        // });
        /* end-test-code */
    };

    var spyTop = () => {

        if (SCROLL.top > DATA.offset) 
        {
            if (!active) 
            {
                active = true;
                // ELEMENTS.$headerPlaceholder.css({height: DATA.height});
                ELEMENTS.$html.addClass(SETTINGS.spyTopClass);
            }
        } 
        else 
        {
            if (active) {
                active = false;
                // ELEMENTS.$headerPlaceholder.css({height: ""});
                ELEMENTS.$html.removeClass(SETTINGS.spyTopClass);
            }
        }

        /* test-code */
        // DEBUG.variable.add({
        //   'Header active': active,
        // });
        /* end-test-code */

    };

    start();

    return {

    };

};
},{}],12:[function(require,module,exports){
/*=========================================================================
|| Smooth scroll to target
===========================================================================
|| Required
|| * SCROLL
|| * ELEMENTS
|| * FUNCTIONS
||
|| * data-element - select elements separate with comma ( $("data-lement") )
|| * data-toggle - select type of toggle
||
|| Data-toggle type:
|| * collapse - collapse data-element ( use less/javascript/_collapse.less class )
|| * something else - toggle data-element using class on data-toggle
=========================================================================*/
module.exports = (data) => {
    
    var
    SCROLL = data.SCROLL,
    ELEMENTS = data.ELEMENTS,
    FUNCTIONS = data.FUNCTIONS,
    // all clickable scroll elements
    $elements = null,
    // bool page is scroll
    active = false;

    var
    SETTINGS = {
        // active automatic scroll page to element via URL hash
        autoScroll: false,
        // divide distance by this value to calculate time scroll
        time: 2,
        // min time scroll
        minTime: 400,
        // max time scroll
        maxTime: 1200,
        // run autoScroll when hash in URL is begin with this string
        prefixAutoScroll: 'scroll-'
    };

    $.extend( SETTINGS, data.SETTINGS );

    /**
     * Start function
     * 
     * @param {Object} data
     * replace values in SETTINGS 
     */
    var
    start = (data) => {

        /* test-code */
        DEBUG.console.add("Start: scrollTo");
        /* end-test-code */
        

        if (SETTINGS.autoScroll) 
        {
            autoScroll();
        }

        refresh();

    };

    /**
     * Automatic scroll page to element ID
     * when user visit page with hash
     * begin with SETTINGS.prefixAutoScroll
     */
    var
    autoScroll = () => {
        var 
        hash = window.location.hash;
        
        // Check if page must trigger autoScroll
        if( hash.startsWith( "#" + SETTINGS.prefixAutoScroll ) ) {

            // Fix annoying jumping when user disturb scroll
            ELEMENTS.$body.scrollDisable(true);

            // Remove hash from url
            var 
            cleanUrl = location.protocol + "//" + location.host + location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
            
            // Create target ID from hash
            var 
            targetID = hash.substring(hash.indexOf('-')+1, hash.lenght);

            /* test-code */
            DEBUG.console.add("scrollTo.js auto trigger function autoScroll().", 'auto');
            /* end-test-code */
            
            // Fix annoying jumping when page is still not ready
            window.setTimeout(()=>{
                on(targetID);
            }, 900);

        }
    };

    /**
     * Scroll function
     * @param {Event interface} event 
     * @param {jQuery object; String ID} target 
     * @param {Number} time 
     */
    var
    scroll = (event, target = false, time = false) => {
        var
        targetID, $target, $this;

        // Check event and remove default action
        if (event) {
            /* test-code */
            DEBUG.console.add(`Click scrollTo: event.preventDefault()`, 'click');
            /* end-test-code */
            $this = $(event.currentTarget);
            event.preventDefault();
        }

        // Check target element
        if (!target) {
            targetID = "#" + $this.attr("data-scroll");
            $target = $(targetID);
        } 
        else {
            if (target instanceof jQuery) {
                $target = target;
                targetID = "#" + $target.attr("ID");
            } 
            else {
                targetID = "#" + target;
                $target = $(targetID);
            }
        }

        // Check if scroll animation is free to use
        if (!active) {

            // Check $target exist
            if ($target.length) {

                // Block other scroll triggers
                active = true;

                // Grab target top position
                var
                targetPositionTop = $target.offset().top,
                // Scroll position
                scrollTo = targetPositionTop;    
                
                // Calculate scrollTime 
                var scrollTime = Math.round(Math.abs(targetPositionTop - SCROLL.top) / SETTINGS.time);
                if (scrollTime < SETTINGS.minTime) 
                {
                    scrollTime = SETTINGS.minTime;
                } 
                else if (scrollTime > SETTINGS.maxTime) 
                {
                    scrollTime = SETTINGS.maxTime;
                }
                

                /* test-code */
                DEBUG.console.add(`Click scrollTo: scroll to element {target: <strong>${targetID}</strong>; speed <strong>${scrollTime}ms</strong>; position: <strong>${scrollTo}</strong>}`, 'click');
                /* end-test-code */

                // Animate scroll
                ELEMENTS.$body.scrollDisable();
                ELEMENTS.$page.animate({
                    scrollTop: scrollTo,
                }, 1200, () => {
                    ELEMENTS.$body.scrollDisable('undo');
                    active = false;
                });
                // ELEMENTS.$page.animate({
                //     scrollTop: targetPositionTop - ELEMENTS.$header.outerHeight(true),
                // }, scrollTime, () => {
                //     FUNCTIONS.onUserScroll();
                //     active = false;
                // });

                return false;
            }
            else {
                /* test-code */
                DEBUG.console.add(`Error scrollTo: element <strong>${targetID}</strong> doesn't exist`, 'error');
                /* end-test-code */
                return false;
            }
        }
        /* test-code */
        else 
        {
            DEBUG.console.add(`Warning scrollTo: scroll animation wouldn't finish`, 'warning');
        }
        /* end-test-code */
    };

    /**
     * Scroll to element
     * @param {jQuery object; String ID} element 
     * @param {Number} time 
     * @return {Bool}
     */
    var
    on = (element, time = false) => {
        return scroll(false, element, time);
    };
    
    /**
     * Refresh binded $elements
     */
    var
    refresh = () => 
    {

        if ($elements) 
        {
            $elements.off("click", scroll);

            /* test-code */
            DEBUG.console.add("Refresh: scrollTo {length: " + $elements.length + ";}");
            /* end-test-code */
        }
        

        $elements = $("[data-scroll]");
        $elements.on("click", scroll);

        /* test-code */
        DEBUG.console.add("Data: scrollTo {length: " + $elements.length + ";}");
        /* end-test-code */
    };

    start();
  
};
},{}],13:[function(require,module,exports){
module.exports = (data) => {

  var
  $items = null;

  var
  TRANSITIONHEIGHT, RESIZE;

  var
  start = () => {

    TRANSITIONHEIGHT = data.TRANSITIONHEIGHT;
    RESIZE = data.RESIZE;

    // RESIZE.add("showMore", () => {
    //   refresh();
    // });

    refresh();
  };

  var
  refresh = () => {
    if ($items) {
      $items.off("click", click);
    }
    $items = $(`[data='showMore']`);

    if ($items.length) {
      $items.each( (index, element) => {
        checkVisibleSpace(element);
      });
    }

  };

  var
  checkVisibleSpace = (element) => {
    var
    $this = $(element),
    dataTarget = $this.attr('data-target'),
    $wrap, $container;

    switch (dataTarget) {
      case "prevElement":
        $wrap = $this.prev();
        $container = $wrap.find(".show-more__content").first();
        break;
      case "nextElement":
        $wrap = $this.next();
        $container = $wrap.find(".show-more__content").first();
        break;
    
      default:
        let 
        wrapId = $this.attr(`data-target`);
        $wrap = $(`#${wrapId}`);
        $container = $wrap.find(".show-more__content").first();
        break;
    }
    
    if ($wrap.outerHeight( true ) < $container.outerHeight( true )) {
      $this.removeClass("hide");
      $this.on("click", {$this}, click);          
    } 
    else {
      $this.addClass("hide");
    }

  };

  var
  click = (paramData) => {
    var 
    param = paramData.data,
    $this = param.$this,
    dataTarget = $this.attr(`data-target`),
    $container,
    $wrap;

    switch (dataTarget) {
      case "prevElement":
        $wrap = $this.prev();
        $container = $wrap.find(".show-more__content").first();
        break;
      case "nextElement":
        $wrap = $this.next();
        $container = $wrap.find(".show-more__content").first();
        break;
    
      default:
        $container = $this;
        break;
    }

    if ($this.hasClass("js_active")) {
      off($this, $wrap, $container);
      return false;
    }
    console.log($container);
    on($this, $wrap, $container);
  };

  var
  on = ($link, $item, $container) => {

    $link.addClass("js_active");

    TRANSITIONHEIGHT.on({
      $this: $item, 
      $clicked: $link,
      $container: $container,            
      callback: () => {
        $item.addClass("show-more--active");
      },  
    });
  };
  
  var
  off = ($link, $item, $container) => {

    $link.removeClass("js_active");

    TRANSITIONHEIGHT.off({
      $this: $item, 
      $container: $container,    
      callbackBefore: () => {
        $item.removeClass("show-more--active");
      } 
    });
  };

  start();

};
},{}],14:[function(require,module,exports){
module.exports = (data) => {

  var  
  $ELEMENTS = {
    links: [],
  },
  DATA = null,
  SETTINGS = {
    match: {
      switch: "tab-switch",
      field: "tab-field",
      content: "tab-content",
    },
  };

  var
  start = () => {
    
    $.extend( SETTINGS, data.SETTINGS );

    refresh();
  };

  var
  refresh = () => {

    if ($ELEMENTS.links.length) {
      $ELEMENTS.links.off("click", changeTab);
    }

    $ELEMENTS.fields = $(`.${SETTINGS.match.field}`);

    fillDatabase();

    if ($ELEMENTS.links.length) {
      $ELEMENTS.links.on("click", changeTab);
    }

    /* test-code */
    DEBUG.console.add(`tabs : refresh {length ${$ELEMENTS.fields.length}}`);
    /* end-test-code */

  };

  var
  fillDatabase = () => {

    DATA = {};

    $ELEMENTS.fields.each(function (index, element) {
      
      var
      $this = $(this),
      field = $this.attr("data-tabs-field");
            
      DATA[field] = {
        switchActive: null,
        contentActive: null,
      };
      
    });

  };

  var
  changeTab = () => {



  };

  
    // // Function for clicked elements
    // onClick: function() {
    //   var self = Main.tabs;
      
    //   var $this = $(this),
    //       dataTabs = $this.attr('data-tabs'),
    //       dataTabsStep = $this.attr('data-tabs-step');
  
    //   if (self.data[dataTabs].active !== dataTabsStep) {
  
    //     var data = self.data[dataTabs],
    //         contentHeight = data.$activeContent.outerHeight( true );
  
    //     if (!data.block) {
    //       data.block = true;
  
    //       var $clickedTab = data.$items.eq(dataTabsStep);
    
    //       $clickedTab.addClass("js_tabs--active");
  
    //       data.$activeContent.css({height: contentHeight});
    //       data.$content.css({height: contentHeight});
    //       data.$activeContent.removeClass("js_tabs--active");
    
    //       window.setTimeout(function() {
    
    //         data.$activeContent.css('height', '');
    //         data.$activeTab.removeClass("js_tabs--active");
            
    //         window.setTimeout(function() {
    
    //           data.$activeContent = data.$contentItems.eq(dataTabsStep);
    //           data.$activeTab = $clickedTab;
    
    //           contentHeight = data.$activeContent.children().outerHeight( true );
    //           data.$content.css({height: contentHeight});
    //           data.$activeContent.css({height: contentHeight});
    
    //           window.setTimeout(function() {
    
    //             data.$activeContent.addClass("js_tabs--active");
    //             data.$activeContent.css('height', '');
    //             data.$content.css('height', '');
    
    //             data.block = false;
        
    //           }, 200);
      
    //         }, 200);
    
    //       }, 1);
  
    //       /* test-code */
    //       let name = 'Tabs ' + dataTabs + ' active';
    //       let debugObject = {};
    //       debugObject[name] = dataTabsStep;
    //       Main.debugVariables.add(debugObject);
    //       /* end-test-code */
  
    //     } 
    //     data.active = dataTabsStep;
    //   }
  
    //   return false;
    // },
  
    // add(dataTabs, settings = null) {

    //   var self = Main.tabs;
  
    //   var $items = $('[data-tabs="'+ dataTabs +'"]');
  
    //   if ($items.length) {
  
    //     var $content = $('[data-tabs-content="'+ dataTabs +'"]'),
    //         output = {};
  
    //     output = {};
    //     output.$items = $items;
    //     output.$content = $content;
    //     output.$contentItems = $content.find("[data-tabs-content-step]");
    //     output.block = false;
  
    //     var $activeContent = $content.find(".js_tabs--active");
        
    //     if ($activeContent.length) {
    //       output.$activeContent = $activeContent;
    //     } else {
    //       output.$activeContent = false;
    //     }
  
    //     var $activeTab = $items.parent().find(".js_tabs--active");
        
    //     if ($activeTab.length) {
    //       output.$activeTab = $activeTab;
    //     } else {
    //       output.$activeTab = false;
    //     }
  
    //     self.data[dataTabs] = output;
  
    //     $items.on("click", self.onClick);
  
    //     /* test-code */
    //     if ((typeof output.$activeTab === 'object') + (typeof output.$activeContent === 'object') === 2) {
    //       let name = "Tabs " + dataTabs + " active";
    //       let debugObject = {};
    //       debugObject[name] = output.$activeTab.attr("data-tabs-step");
    //       Main.debugVariables.add(debugObject);
    //     }
    //     Main.debugConsole.add("Add tabs '" + dataTabs + "' {length: "+ $items.length +";}");
    //     if ($items.length !== output.$contentItems.length) {
    //       Main.debugConsole.add("Tabs '" + dataTabs + "' - length do not match {tabs: " + $items.length + "; contents: " + output.$contentItems.length + ";}", "warning");
    //     }
    //     if ((typeof output.$activeTab === 'object') + (typeof output.$activeContent === 'object') === 1) {
    //       Main.debugConsole.add("Tabs '" + dataTabs + "' - active class do not match {activeTab: " + output.$activeTab + "; $activeContent: " + output.$activeContent + ";}", "warning");
    //     }
    //     /* end-test-code */
  
    //   }
  
    // }

    start();

};
},{}],15:[function(require,module,exports){
module.exports = (data) => {

    var
    DATA = [],      /* Opened (transitioned on) jQuery elements */
    BROWSER;        /* browser.js data */

    var
    start = () => {
        BROWSER = data.BROWSER;
    };

    /**
     * Toggle transition height
     */
    var
    toggle = (options) => {

        let
        active = null;

        $.each(DATA, function (indexInArray, valueOfElement) { 
             if ( options.$clicked.is(valueOfElement) ) {
                active = valueOfElement;    
                return false;         
             }
        });

        if (active) {
            DATA.splice( options.$clicked, 1 );     
            off(options);    
        }
        else {
            DATA.push( options.$clicked );   
            on(options);
        }

    };

    /**
     * Create transition
     * @param {Object} options 
     * $this {jQuery object} 
     * time {Number}
     * callback {Function} 
     */
    var
    on = (param) => {
        var
        $child, height;

        if (param.$container) {
            height = param.$container.children().outerHeight(true);
        } else {
            $child = param.$this.children();
            height = $child.outerHeight(true);
        }

        /* test-code */
        DEBUG.console.add(`Clicked "Show more" on {$container ${height}}`, "click");
        /* end-test-code */

        param.$clicked
            .addClass("js_expand__link--active");

        param.$container
            .addClass("js_transitionHeight")
            .css('height', height)
            .one(BROWSER.transitionEvent, () => {
                
                param.$container
                    .removeClass("js_transitionHeight")
                    .addClass("js_expand__container--active")
                    .css('height', '');

                if (param.callback) {
                    (param.callback());
                }

            });

    };

    var
    off = (param) => {

        var
        height = param.$container.outerHeight(true);
        
        /* test-code */
        DEBUG.console.add(`Clicked "Show more" off`, "click");
        /* end-test-code */

        param.$clicked
            .removeClass("js_expand__link--active");
       
        param.$container
            .css('height', height)
            .removeClass("js_expand__container--active")
            .addClass("js_transitionHeight")
            .css('height', '')
            .one(BROWSER.transitionEvent, () => {

                param.$container
                    .removeClass("js_expand__container--close js_transitionHeight")
            
                if (param.callback) {
                    (param.callback());
                }
            });

    };

    start(data);

    return {
        toggle: toggle,
        on: on,
        off: off,
    };

};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL2Zyb250Ym94L2JpbmQvcmVzaXplLmpzIiwic3JjL2pzL2Zyb250Ym94L2RhdGEvYnJvd3Nlci5qcyIsInNyYy9qcy9mcm9udGJveC9kYXRhL2RldmljZS5qcyIsInNyYy9qcy9mcm9udGJveC9kYXRhL3Njcm9sbC5qcyIsInNyYy9qcy9mcm9udGJveC9kZWJ1Zy9jb25zb2xlLmpzIiwic3JjL2pzL2Zyb250Ym94L2RlYnVnL3ZhcmlhYmxlcy5qcyIsInNyYy9qcy9mcm9udGJveC9mdW5jdGlvbnMuanMiLCJzcmMvanMvZnJvbnRib3gvanF1ZXJ5L3Njcm9sbEJsb2NrLmpzIiwic3JjL2pzL2Zyb250Ym94L25hdmJhci9idXJnZXJNZW51LmpzIiwic3JjL2pzL2Zyb250Ym94L25hdmJhci9zdGlja3kuanMiLCJzcmMvanMvZnJvbnRib3gvc2Nyb2xsVG8uanMiLCJzcmMvanMvZnJvbnRib3gvc2hvd01vcmUuanMiLCJzcmMvanMvZnJvbnRib3gvdGFicy5qcyIsInNyYy9qcy9mcm9udGJveC90cmFuc2l0aW9uSGVpZ2h0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDM1FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDck1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKipcclxuICogTGlic1xyXG4gKi9cclxuLy8gZ2xvYmFsLiQgPSByZXF1aXJlKCdqcXVlcnknKTtcclxuLy8gZ2xvYmFsLmpRdWVyeSA9ICQ7XHJcbi8vIGdsb2JhbC5Db29raWVzID0gcmVxdWlyZSgnanMtY29va2llJyk7XHJcbi8vIHJlcXVpcmUoJ3NsaWNrLWNhcm91c2VsJyk7XHJcbi8vIHJlcXVpcmUoJ3NlbGVjdDInKSgpO1xyXG4vLyByZXF1aXJlKCcuL2Zyb250Ym94L2xpYnMvZ2V0U3R5bGUnKTtcclxuLy8gdmFyIFxyXG4vLyBTaGFyZXIgPSByZXF1aXJlKCdzbGljay1jYXJvdXNlbCcpOyAvLyBodHRwOi8vZWxsaXNvbmxlYW8uZ2l0aHViLmlvL3NoYXJlci5qcy9cclxuXHJcbi8qKlxyXG4gKiBqUXVlcnkgcGx1Z2luc1xyXG4gKi9cclxucmVxdWlyZSgnLi9mcm9udGJveC9qcXVlcnkvc2Nyb2xsQmxvY2snKSgpO1xyXG5cclxuKGZ1bmN0aW9uKCQsIF8pIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEVsZW1lbnRzXHJcbiAgICAgKi9cclxuICAgIHZhciBcclxuICAgIEVMRU1FTlRTID0ge1xyXG4gICAgICAgICRib2R5OiAkKFwiYm9keVwiKSxcclxuICAgICAgICAkaGVhZGVyOiAkKFwiI2hlYWRlclwiKSxcclxuICAgICAgICAkaGVhZGVyUGxhY2Vob2xkZXI6ICQoXCIjaGVhZGVyLXBsYWNlaG9sZGVyXCIpLFxyXG4gICAgICAgICR3aW5kb3c6ICQod2luZG93KSxcclxuICAgICAgICAkb3ZlcmxheTogJChcIiNwYWdlLW92ZXJsYXlcIiksXHJcbiAgICAgICAgJGh0bWw6ICQoJ2h0bWwnKSxcclxuICAgICAgICAkcGFnZTogJCgnaHRtbCwgYm9keScpLFxyXG4gICAgfTtcclxuXHJcbiAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgIC8qKlxyXG4gICAgICogRGVidWdcclxuICAgICAqL1xyXG4gICAgZ2xvYmFsLkRFQlVHID0ge307XHJcblxyXG4gICAgZ2xvYmFsLkRFQlVHLmNvbnNvbGUgPSByZXF1aXJlKCcuL2Zyb250Ym94L2RlYnVnL2NvbnNvbGUnKSh7XHJcbiAgICAgICAgLy8gb3BlbjogdHJ1ZSxcclxuICAgICAgICBFTEVNRU5UUzogRUxFTUVOVFMsXHJcbiAgICB9KTtcclxuICAgIGdsb2JhbC5ERUJVRy52YXJpYWJsZSA9IHJlcXVpcmUoJy4vZnJvbnRib3gvZGVidWcvdmFyaWFibGVzJykoe1xyXG4gICAgICAgIE9QVElPTlM6IHtcclxuICAgICAgICAgICAgb3BlbjogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIEVMRU1FTlRTOiBFTEVNRU5UUyxcclxuICAgIH0pO1xyXG4gICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJlcXVpcmVkXHJcbiAgICAgKi9cclxuXHJcbiAgICAvKiBDU1MgVmFyaWFibGVzICovXHJcbiAgICBjb25zdFxyXG4gICAgcm9vdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJzpyb290JyksXHJcbiAgICBDU1MgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShyb290KSxcclxuICAgIEJSRUFLUE9JTlRTID0ge1xyXG4gICAgICAgIGRlc2t0b3A6IE51bWJlcihDU1MuZ2V0UHJvcGVydHlWYWx1ZShcIi0tZGVza3RvcFwiKSksXHJcbiAgICAgICAgdGFibGV0OiBOdW1iZXIoQ1NTLmdldFByb3BlcnR5VmFsdWUoXCItLXRhYmxldFwiKSksXHJcbiAgICAgICAgZmFibGV0OiBOdW1iZXIoQ1NTLmdldFByb3BlcnR5VmFsdWUoXCItLWZhYmxldFwiKSksXHJcbiAgICAgICAgbW9iaWxlOiBOdW1iZXIoQ1NTLmdldFByb3BlcnR5VmFsdWUoXCItLW1vYmlsZVwiKSksXHJcbiAgICB9O1xyXG5cclxuICAgIC8qIFJlc2l6ZSAqL1xyXG4gICAgdmFyIFJFU0laRSA9IHJlcXVpcmUoJy4vZnJvbnRib3gvYmluZC9yZXNpemUnKSh7XHJcbiAgICAgICAgRUxFTUVOVFM6IEVMRU1FTlRTLFxyXG4gICAgICAgIHRlbXBsYXRlOiB7XHJcbiAgICAgICAgICAgIC8vIGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICBsb2FkaW5nOiBgPGRpdiBjbGFzcz1cImFuaW1hdGlvbi1kb251dC1zcGlubmVyXCI+PC9kaXY+YCxcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIERFVklDRSA9IHJlcXVpcmUoJy4vZnJvbnRib3gvZGF0YS9kZXZpY2UnKSh7XHJcbiAgICAgICAgRUxFTUVOVFM6IEVMRU1FTlRTLFxyXG4gICAgICAgIFJFU0laRTogUkVTSVpFLFxyXG4gICAgICAgIEJSRUFLUE9JTlRTOiBCUkVBS1BPSU5UUyxcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICB2YXIgRlVOQ1RJT05TID0gcmVxdWlyZSgnLi9mcm9udGJveC9mdW5jdGlvbnMnKTtcclxuXHJcbiAgICB2YXIgQlJPV1NFUiA9IHJlcXVpcmUoJy4vZnJvbnRib3gvZGF0YS9icm93c2VyJykoKTtcclxuICAgIHZhciBTQ1JPTEwgPSByZXF1aXJlKCcuL2Zyb250Ym94L2RhdGEvc2Nyb2xsJykoe1xyXG4gICAgICAgIERFVklDRTogREVWSUNFXHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBBbmltYXRpb25zXHJcbiAgICAgKi9cclxuICAgIHZhciB0cmFuc2l0aW9uSGVpZ2h0ID0gcmVxdWlyZSgnLi9mcm9udGJveC90cmFuc2l0aW9uSGVpZ2h0Jykoe1xyXG4gICAgICAgIEJST1dTRVIgOiBCUk9XU0VSLFxyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNtb290aCBzY3JvbGwgdG8gdGFyZ2V0XHJcbiAgICAgKiBcclxuICAgICAqIUBwYXJhbSB7RUxFTUVOVFN9IEVMRU1FTlRTXHJcbiAgICAgKiFAcGFyYW0ge1NDUk9MTH0gU0NST0xMXHJcbiAgICAgKiFAcGFyYW0ge0ZVTkNUSU9OU30gRlVOQ1RJT05TXHJcbiAgICAgKi9cclxuICAgIHZhciBzY3JvbGxUbyA9IHJlcXVpcmUoJy4vZnJvbnRib3gvc2Nyb2xsVG8nKSh7XHJcbiAgICAgICAgRUxFTUVOVFM6IEVMRU1FTlRTLFxyXG4gICAgICAgIFNDUk9MTDogU0NST0xMLFxyXG4gICAgICAgIEZVTkNUSU9OUzogRlVOQ1RJT05TLFxyXG4gICAgICAgIFNFVFRJTkdTOiB7XHJcbiAgICAgICAgICAgIC8vIGFjdGl2ZSBhdXRvbWF0aWMgc2Nyb2xsIHBhZ2UgdG8gZWxlbWVudCB2aWEgVVJMIGhhc2hcclxuICAgICAgICAgICAgYXV0b1Njcm9sbDogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vIGRpdmlkZSBkaXN0YW5jZSBieSB0aGlzIHZhbHVlIHRvIGNhbGN1bGF0ZSB0aW1lIHNjcm9sbFxyXG4gICAgICAgICAgICB0aW1lOiAyLFxyXG4gICAgICAgICAgICAvLyBtaW4gdGltZSBzY3JvbGxcclxuICAgICAgICAgICAgbWluVGltZTogNDAwLFxyXG4gICAgICAgICAgICAvLyBtYXggdGltZSBzY3JvbGxcclxuICAgICAgICAgICAgbWF4VGltZTogMTIwMCxcclxuICAgICAgICAgICAgLy8gcnVuIGF1dG9TY3JvbGwgd2hlbiBoYXNoIGluIFVSTCBpcyBiZWdpbiB3aXRoIHRoaXMgc3RyaW5nXHJcbiAgICAgICAgICAgIHByZWZpeEF1dG9TY3JvbGw6ICdzY3JvbGwtJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgZml4ZWQgZWxlbWVudCB3aGVuIHBhZ2UgaXMgc2Nyb2xsXHJcbiAgICAgKiBcclxuICAgICAqIUBwYXJhbSB7RUxFTUVOVFN9IEVMRU1FTlRTXHJcbiAgICAgKiFAcGFyYW0ge0VMRU1FTlRTfSBTQ1JPTExcclxuICAgICAqIEBwYXJhbSB7bnVsbCwgbnVtYmVyfSBTRVRUSU5HUy5vZmZzZXQgd2hlbiBjcmVhdGUgc3RpY2t5IGVsZW1lbnRcclxuICAgICAqIG51bGwgLSBhdXRvbWF0aWMgXHJcbiAgICAgKiBudW1iZXIgLSBob3cgbWFueSBwaXhlbCB1c2VyIG1heSBzY3JvbGwgdG8gdHJpZ2dlciBzdGlja3kgICBcclxuICAgICAqIEBwYXJhbSB7Ym9vbH0gU0VUVElOR1MucGxhY2Vob2xkZXIgYWRkIGhlaWdodCB0byBwbGFjZWhvbGRlciB3aGVuIHRyaWdnZXIgc3RpY2t5XHJcbiAgICAgKiBzZXQgdHJ1ZSBvbmx5IGlmIEBoZWFkZXItYWx3YXlzLXN0aWNreSA9IGZhbHNlXHJcbiAgICAgKiBAcGFyYW0ge2pRdWVyeSBPYmplY3R9ICRlbGVtZW50U3B5IHN0aWNreSBlbGVtZW50IFxyXG4gICAgICovXHJcbiAgICByZXF1aXJlKCcuL2Zyb250Ym94L25hdmJhci9zdGlja3knKSh7XHJcbiAgICAgICAgRUxFTUVOVFM6IEVMRU1FTlRTLFxyXG4gICAgICAgIFNDUk9MTDogU0NST0xMLFxyXG4gICAgICAgIFNFVFRJTkdTOiB7XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiB0cnVlLFxyXG4gICAgICAgICAgICBvZmZzZXQ6IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJGVsZW1lbnRTcHk6ICQoXCIjc3RpY2t5LWVsZW1lbnRcIiksXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEJ1cmdlciBtZW51XHJcbiAgICAgKiBcclxuICAgICAqICFAcGFyYW0ge0VMRU1FTlRTfSBFTEVNRU5UU1xyXG4gICAgICogIUBwYXJhbSB7RlVOQ1RJT05TfSBGVU5DVElPTlNcclxuICAgICAqIEBwYXJhbSB7Qm9vbH0gT1BUSU9OUy5kcm9wZG93blxyXG4gICAgICogbWVudSBpdGVtcyBjYW4gYmUgZXhwYW5kXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2wsIE51bWJlcn0gT1BUSU9OUy5kcm9wZG93blJlc3BvbnNpdmVcclxuICAgICAqIGJyZWFrcG9pbnQgdG8gdHJpZ2dlciBpdGVtIGV4cGFuZFxyXG4gICAgICovXHJcbiAgICByZXF1aXJlKCcuL2Zyb250Ym94L25hdmJhci9idXJnZXJNZW51Jykoe1xyXG4gICAgICAgIEVMRU1FTlRTOiBFTEVNRU5UUyxcclxuICAgICAgICBGVU5DVElPTlM6IEZVTkNUSU9OUyxcclxuICAgICAgICBPUFRJT05TOiB7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICBkcm9wZG93blJlc3BvbnNpdmU6IDIsXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb29raWVzXHJcbiAgICAgKiBcclxuICAgICAqICFAcGFyYW0ge0VMRU1FTlRTfSBFTEVNRU5UU1xyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IE9QVElPTlMuaW1nU3JjIHBhdGNoIHRvIGltYWdlXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gT1BUSU9OUy5jb250ZW50IGNvbnRlbnQgdGV4dFxyXG4gICAgICovXHJcbiAgICAvLyByZXF1aXJlKCcuL2Zyb250Ym94L2Nvb2tpZXMnKSh7XHJcbiAgICAvLyAgICAgRUxFTUVOVFM6IEVMRU1FTlRTLFxyXG4gICAgLy8gICAgIE9QVElPTlM6IHtcclxuICAgIC8vICAgICAgICAgaW1nU3JjOiBgL2Fzc2V0cy9pbWFnZXMvY29va2llcy5wbmdgLFxyXG4gICAgLy8gICAgICAgICBjb250ZW50OiBgVyBuYXN6eW0gc2Vyd2lzaWUgd3lrb3J6eXN0dWplbXkgcGxpa2kgQ29va2llcy4gU8SFIG9uZSB6YXBpc3l3YW5lIG5hIGR5c2t1IHVyesSFZHplbmlhIGtvxYRjb3dlZ28gdcW8eXRrb3duaWthIHcgY2VsYWNoIHN0YXR5c3R5Y3pueWNoIG9yYXogdcWCYXR3aWVuaWEga29yenlzdGFuaWEgeiBzZXJ3aXN1LiBVc3Rhd2llbmlhIHRlIHphd3N6ZSBtb8W8bmEgem1pZW5pxIcuIFN6Y3plZ8OzxYJvd2UgaW5mb3JtYWNqZSBvIHBsaWthY2ggQ29va2llcyB6bmFqZHVqxIUgc2nEmSB3IDxhIGhyZWY9XCIjXCIgdGFyZ2V0PVwiX2JsYW5rXCI+UG9saXR5Y2UgUHJ5d2F0bm/Fm2NpPC9hPmAsXHJcbiAgICAvLyAgICAgfSxcclxuICAgIC8vIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGFic1xyXG4gICAgICogXHJcbiAgICAgKiAhQHBhcmFtIHtFTEVNRU5UU30gRUxFTUVOVFNcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBPUFRJT05TLmltZ1NyYyBwYXRjaCB0byBpbWFnZVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IE9QVElPTlMuY29udGVudCBjb250ZW50IHRleHRcclxuICAgICAqL1xyXG4gICAgcmVxdWlyZSgnLi9mcm9udGJveC90YWJzJykoe1xyXG4gICAgICAgIEVMRU1FTlRTOiBFTEVNRU5UUyxcclxuICAgICAgICBPUFRJT05TOiB7XHJcbiAgICAgICAgICAgIGltZ1NyYzogYC9hc3NldHMvaW1hZ2VzL2Nvb2tpZXMucG5nYCxcclxuICAgICAgICAgICAgY29udGVudDogYFcgbmFzenltIHNlcndpc2llIHd5a29yenlzdHVqZW15IHBsaWtpIENvb2tpZXMuIFPEhSBvbmUgemFwaXN5d2FuZSBuYSBkeXNrdSB1cnrEhWR6ZW5pYSBrb8WEY293ZWdvIHXFvHl0a293bmlrYSB3IGNlbGFjaCBzdGF0eXN0eWN6bnljaCBvcmF6IHXFgmF0d2llbmlhIGtvcnp5c3RhbmlhIHogc2Vyd2lzdS4gVXN0YXdpZW5pYSB0ZSB6YXdzemUgbW/FvG5hIHptaWVuacSHLiBTemN6ZWfDs8WCb3dlIGluZm9ybWFjamUgbyBwbGlrYWNoIENvb2tpZXMgem5hamR1asSFIHNpxJkgdyA8YSBocmVmPVwiI1wiIHRhcmdldD1cIl9ibGFua1wiPlBvbGl0eWNlIFByeXdhdG5vxZtjaTwvYT5gLFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3cgbW9yZSBjb250ZW50XHJcbiAgICAgKiBcclxuICAgICAqICFAcGFyYW0ge1RSQU5TSVRJT05IRUlHSFR9IHRyYW5zaXRpb25IZWlnaHRcclxuICAgICAqL1xyXG4gICAgcmVxdWlyZSgnLi9mcm9udGJveC9zaG93TW9yZScpKHtcclxuICAgICAgICBUUkFOU0lUSU9OSEVJR0hUOiB0cmFuc2l0aW9uSGVpZ2h0LFxyXG4gICAgICAgIFJFU0laRTogUkVTSVpFLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHb29nbGUgTWFwcyBBUElcclxuICAgICAqIFxyXG4gICAgICogIUBwYXJhbSB7RlVOQ1RJT05TfSBGVU5DVElPTlNcclxuICAgICAqICFAcGFyYW0ge1NDUk9MTH0gU0NST0xMXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gT1BUSU9OUy5jZW50ZXIgcGF0Y2ggdG8gaW1hZ2VcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBPUFRJT05TLmNvbnRlbnQgY29udGVudCB0ZXh0XHJcbiAgICAgKi9cclxuICAgIC8vIHZhciBnb29nbGVNYXBzID0gcmVxdWlyZSgnLi9nb29nbGVNYXBzJykoe1xyXG4gICAgLy8gICAgIEZVTkNUSU9OUzogRlVOQ1RJT05TLFxyXG4gICAgLy8gICAgIFNDUk9MTDogU0NST0xMLFxyXG4gICAgLy8gICAgIE9QVElPTlM6IHtcclxuICAgIC8vICAgICAgICAgLy8gRmlyc3QgcG9zaXRpb25cclxuICAgIC8vICAgICAgICAgY2VudGVyOiB7XHJcbiAgICAvLyAgICAgICAgICAgICBsYXQ6IDUxLjkxOTQzNyxcclxuICAgIC8vICAgICAgICAgICAgIGxuZzogMTkuMTQ1MTM2LFxyXG4gICAgLy8gICAgICAgICB9LFxyXG4gICAgLy8gICAgICAgICBtYXBJRDogXCJtYXBcIixcclxuICAgIC8vICAgICAgICAgem9vbTogNS44LFxyXG4gICAgLy8gICAgICAgICBkaXNhYmxlRGVmYXVsdFVJOiB0cnVlLFxyXG4gICAgLy8gICAgICAgICBzdHJlZXRWaWV3Q29udHJvbDogZmFsc2UsXHJcbiAgICAvLyAgICAgICAgIGRyYWdnYWJsZTogZmFsc2UsXHJcbiAgICAvLyAgICAgICAgIHNjYWxlQ29udHJvbDogZmFsc2UsXHJcbiAgICAvLyAgICAgICAgIHNjcm9sbHdoZWVsOiBmYWxzZSxcclxuICAgIC8vICAgICAgICAgc3R5bGVzOiByZXF1aXJlKCcuL2dvb2dsZU1hcHNTdHlsZScpLFxyXG4gICAgLy8gICAgICAgICBtYXJrZXJTaXplOiBbMjEsIDM0XSxcclxuICAgIC8vICAgICB9LFxyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWxlY3QyXHJcbiAgICAgKi9cclxuICAgIC8vIHZhciAkc2VsZWN0MiA9ICQoXCIuc2VsZWN0MlwiKTtcclxuICAgIC8vIGlmICgkc2VsZWN0Mi5sZW5ndGgpIHtcclxuICAgIC8vICAgICRzZWxlY3QyLnNlbGVjdDIoe1xyXG4gICAgLy8gICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMSxcclxuICAgIC8vICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgdmFyXHJcbiAgICAkaWZyYW1lID0gJChcIltkYXRhLWlmcmFtZV1cIik7XHJcbiAgICAkaWZyYW1lLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XHJcbiAgICAgICAgdmFyIFxyXG4gICAgICAgICR0aGlzID0gJCh0aGlzKSxcclxuICAgICAgICBmaW5kID0gJHRoaXMuYXR0cihcImRhdGEtaWZyYW1lXCIpLFxyXG4gICAgICAgICRjb250ZW50ID0gJChgW2RhdGEtaWZyYW1lLWNvbnRlbnQ9XCIke2ZpbmR9XCJdYCk7XHJcblxyXG4gICAgICAgICR0aGlzLmNvbnRlbnRzKCkuZmluZChcImJvZHlcIikuYXBwZW5kKCAnPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCIvY3NzL3N0eWxlLmRldi5jc3NcIj4nICk7XHJcbiAgICAgICAgJHRoaXMuY29udGVudHMoKS5maW5kKFwiYm9keVwiKS5hcHBlbmQoICc8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTFcIj4nICk7XHJcbiAgICAgICAgJHRoaXMuY29udGVudHMoKS5maW5kKFwiYm9keVwiKS5hcHBlbmQoICc8c3R5bGU+IGJvZHksaHRtbCB7IHBhZGRpbmc6IDAhaW1wb3J0YW50OyBtYXJnaW46IDAhaW1wb3J0YW50OyBwb3NpdGlvbjogc3RhdGljIWltcG9ydGFudDsgaGVpZ2h0OiBhdXRvIWltcG9ydGFudDsgbWluLWhlaWdodDogYXV0byFpbXBvcnRhbnQ7IH0gPC9zdHlsZT4nICk7XHJcbiAgICAgICAgJHRoaXMuY29udGVudHMoKS5maW5kKFwiYm9keVwiKS5hcHBlbmQoICRjb250ZW50ICk7XHJcbiAgICB9KTtcclxuICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuXHJcbiAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgIERFQlVHLmNvbnNvbGUuYWRkKFwiUnVubmluZyBjb3JyZWN0Li4uXCIpO1xyXG4gICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgIC8vIEluZm9ybSBzdHlsZXNoZWVkIHRvIHJlbW92ZSBzdHlsZSBmYWxsYmFjayBmb3IgSmF2YVNjcmlwdCBlbGVtZW50c1xyXG4gICAgRUxFTUVOVFMuJGh0bWwucmVtb3ZlQ2xhc3MoXCJub19qc1wiKTtcclxuXHJcbn0pKCQsIHdpbmRvdyk7IiwiLyoqXHJcbiAqIFJlc2l6ZVxyXG4gKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gKGRhdGEpID0+IHtcclxuXHJcbiAgICB2YXJcclxuICAgIFFVRVVFID0ge1xyXG4gICAgICAgIHdpZHRoOiB7fSxcclxuICAgICAgICBoZWlnaHQ6IHt9LFxyXG4gICAgICAgIGFsbDoge30sXHJcbiAgICB9O1xyXG5cclxuICAgIHZhclxyXG4gICAgREFUQSA9IHtcclxuICAgICAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgICAgIHRpbWU6IDAsXHJcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICAgICAgYXBwZW5kVGVtcGxhdGU6IGZhbHNlLFxyXG4gICAgfTtcclxuXHJcbiAgICB2YXJcclxuICAgIHJlc2l6ZVRpbWUgPSA0MDA7XHJcblxyXG4gICAgdmFyXHJcbiAgICBFTEVNRU5UUyxcclxuICAgIFRFTVBMQVRFID0ge1xyXG4gICAgICAgIGxvYWRpbmc6IG51bGwsXHJcbiAgICB9O1xyXG5cclxuICAgIHZhclxyXG4gICAgc3RhcnQgPSAoKSA9PiB7XHJcbiAgICAgICAgRUxFTUVOVFMgPSBkYXRhLkVMRU1FTlRTO1xyXG4gICAgICAgIFRFTVBMQVRFLmxvYWRpbmcgPSBkYXRhLnRlbXBsYXRlLmxvYWRpbmc7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhclxyXG4gICAgdHJpZ2dlciA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgREFUQS50aW1lID0gNTAwO1xyXG5cclxuICAgICAgICBpZiAoIURBVEEuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIERBVEEuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmVzaXplKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXJcclxuICAgIGFkZCA9IChuYW1lLCBjYWxsYmFjaywgdHlwZSkgPT4ge1xyXG4gICAgICAgIFFVRVVFW3R5cGVdW25hbWVdID0gW2NhbGxiYWNrXTtcclxuICAgICAgICBcclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICBERUJVRy5jb25zb2xlLmFkZChgcmVzaXplOiBhZGQgJHtuYW1lfWApO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgIH07XHJcblxyXG4gICAgdmFyXHJcbiAgICByZW1vdmUgPSAobmFtZSwgdHlwZSkgPT4ge1xyXG4gICAgICAgIGRlbGV0ZSBxdWV1ZVt0eXBlXVtuYW1lXTtcclxuXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgREVCVUcuY29uc29sZS5hZGQoYHJlc2l6ZTogcmVtb3ZlICR7bmFtZX1gKTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICB9O1xyXG5cclxuICAgIHZhclxyXG4gICAgY2xlYW4gPSAoKSA9PiB7XHJcbiAgICAgICAgcXVldWUgPSB7fTtcclxuXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgREVCVUcuY29uc29sZS5hZGQoYHJlc2l6ZTogY2xlYW4gcXVldWVgKTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICB9O1xyXG5cclxuICAgIHZhclxyXG4gICAgcnVuID0gKHR5cGUpID0+IHtcclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnd2lkdGgnOlxyXG4gICAgICAgICAgICAgICAgcmVzaXplV2lkdGgoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdoZWlnaHQnOlxyXG4gICAgICAgICAgICAgICAgcmVzaXplSGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJlc2l6ZUFsbCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXJcclxuICAgIHJlc2l6ZSA9ICh0eXBlKSA9PiB7XHJcblxyXG4gICAgICAgIC8qIEFwcGVuZCBsb2FkaW5nIHRlbXBsYXRlICovXHJcbiAgICAgICAgaWYgKCAhREFUQS5hcHBlbmRUZW1wbGF0ZSAmJiBURU1QTEFURS5sb2FkaW5nICkge1xyXG4gICAgICAgICAgICBFTEVNRU5UUy4kYm9keS5hcHBlbmQoIGA8ZGl2IGNsYXNzPVwianNfcmVzaXplTG9hZGluZ1wiPjxkaXYgY2xhc3M9XCJqc19yZXNpemVMb2FkaW5nX19jb250ZW50XCI+JHtURU1QTEFURS5sb2FkaW5nfTwvZGl2PjwvZGl2PmAgKTtcclxuICAgICAgICAgICAgREFUQS5hcHBlbmRUZW1wbGF0ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCggKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgREFUQS50aW1lIC09IDUwO1xyXG5cclxuICAgICAgICAgICAgaWYgKERBVEEudGltZSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmICggIURBVEEubG9hZGluZyApIHtcclxuICAgICAgICAgICAgICAgICAgICBEQVRBLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICggVEVNUExBVEUubG9hZGluZyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRUxFTUVOVFMuJGJvZHkuYWRkQ2xhc3MoXCJqc19yZXNpemVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzaXplKHR5cGUpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICggREFUQS5sb2FkaW5nICkge1xyXG4gICAgICAgICAgICAgICAgICAgIERBVEEubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICggVEVNUExBVEUubG9hZGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBFTEVNRU5UUy4kYm9keS5yZW1vdmVDbGFzcyhcImpzX3Jlc2l6ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBEQVRBLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcnVuKHR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgICAgICBERUJVRy52YXJpYWJsZS5yZWZyZXNoKFwiUmVzaXplXCIpO1xyXG4gICAgICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICAgICAgfSwgNTApO1xyXG4gICAgfTtcclxuICAgIHZhciBcclxuICAgIHJlc2l6ZVdpZHRoID0gKCkgPT4ge1xyXG4gICAgICAgICQuZWFjaChRVUVVRS53aWR0aCwgZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICh2YWx1ZVswXSkoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICB2YXJcclxuICAgIHJlc2l6ZUhlaWdodCA9ICgpID0+IHtcclxuICAgICAgICAkLmVhY2goUVVFVUUuaGVpZ2h0LCBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcclxuICAgICAgICAgICAgKHZhbHVlWzBdKSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHZhclxyXG4gICAgcmVzaXplQWxsID0gKCkgPT4ge1xyXG4gICAgICAgIHJlc2l6ZUhlaWdodCgpO1xyXG4gICAgICAgIHJlc2l6ZVdpZHRoKCk7XHJcbiAgICAgICAgJC5lYWNoKFFVRVVFLmFsbCwgZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICh2YWx1ZVswXSkoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgREVCVUcudmFyaWFibGUuYWRkKFwiUmVzaXplXCIsIERBVEEpO1xyXG4gICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgIHN0YXJ0KCk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhZGQ6IGFkZCxcclxuICAgICAgICByZW1vdmU6IHJlbW92ZSxcclxuICAgICAgICByZXNpemU6IHJlc2l6ZSxcclxuICAgICAgICB0cmlnZ2VyOiB0cmlnZ2VyLFxyXG4gICAgfTtcclxuICBcclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcclxuXHJcbiAgICB2YXIgXHJcbiAgICBcclxuICAgIERBVEEgPSB7fSxcclxuXHJcbiAgICB3aGljaFRyYW5zaXRpb25FdmVudCA9ICgpID0+IHtcclxuICAgICAgICB2YXIgdCxcclxuICAgICAgICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmFrZWVsZW1lbnRcIik7XHJcbiAgICAgIFxyXG4gICAgICAgIHZhciB0cmFuc2l0aW9ucyA9IHtcclxuICAgICAgICAgIFwidHJhbnNpdGlvblwiICAgICAgOiBcInRyYW5zaXRpb25lbmRcIixcclxuICAgICAgICAgIFwiT1RyYW5zaXRpb25cIiAgICAgOiBcIm9UcmFuc2l0aW9uRW5kXCIsXHJcbiAgICAgICAgICBcIk1velRyYW5zaXRpb25cIiAgIDogXCJ0cmFuc2l0aW9uZW5kXCIsXHJcbiAgICAgICAgICBcIldlYmtpdFRyYW5zaXRpb25cIjogXCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCJcclxuICAgICAgICB9XHJcbiAgICAgIFxyXG4gICAgICAgIGZvciAodCBpbiB0cmFuc2l0aW9ucyl7XHJcbiAgICAgICAgICBpZiAoZWwuc3R5bGVbdF0gIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cmFuc2l0aW9uc1t0XTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrV2l0Y2hUcmFuc2l0aW9uRXZlbnQgPSAoKSA9PiB7XHJcbiAgICAgICAgREFUQS53aXRjaFRyYW5zaXRpb25FdmVudCA9IHdoaWNoVHJhbnNpdGlvbkV2ZW50KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlZnJlc2ggPSAoKSA9PiB7XHJcbiAgICAgICAgREFUQS50cmFuc2l0aW9uRXZlbnQgPSBjaGVja1dpdGNoVHJhbnNpdGlvbkV2ZW50KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBEQVRBO1xyXG5cclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IChhcmd1bWVudCkgPT4ge1xyXG4gICAgXHJcbiAgICB2YXIgXHJcbiAgICBCUkVBS1BPSU5UUyAgICAgICAgID0gbnVsbCxcclxuICAgIEVMRU1FTlRTICAgICAgICAgICAgPSBudWxsLFxyXG4gICAgUkVTSVpFICAgICAgICAgICAgICA9IG51bGw7XHJcblxyXG4gICAgdmFyXHJcbiAgICBEQVRBID0ge1xyXG4gICAgICAgIHdpZHRoICAgICAgICAgICA6IG51bGwsXHJcbiAgICAgICAgaGVpZ2h0ICAgICAgICAgIDogbnVsbCxcclxuICAgICAgICByZXNwb25zaXZlICAgICAgOiBudWxsLFxyXG4gICAgICAgIG9zICAgICAgICAgICAgICA6IG51bGwsXHJcbiAgICB9O1xyXG5cclxuICAgIC8qIFN0YXJ0IG1vZHVsZSAqL1xyXG4gICAgY29uc3RcclxuICAgIHN0YXJ0ID0gKCkgPT4ge1xyXG5cclxuICAgICAgICAvKiBQcmVwYXJlIGFyZ3VtZW50cyBkYXRhICovXHJcbiAgICAgICAgQlJFQUtQT0lOVFMgPSBhcmd1bWVudC5CUkVBS1BPSU5UUztcclxuICAgICAgICBFTEVNRU5UUyA9IGFyZ3VtZW50LkVMRU1FTlRTO1xyXG4gICAgICAgIFJFU0laRSA9IGFyZ3VtZW50LlJFU0laRTtcclxuXHJcbiAgICAgICAgREFUQS5vcyA9IGdldE1vYmlsZU9wZXJhdGluZ1N5c3RlbSgpO1xyXG4gICAgICAgIHJlZnJlc2goKTtcclxuXHJcbiAgICAgICAgLyogVHJpZ2dlciBmdW5jdGlvbiBpZiB1c2VyIHJlc2l6ZSBwYWdlICovXHJcbiAgICAgICAgRUxFTUVOVFMuJHdpbmRvdy5vbigncmVzaXplIG9yaWVudGF0aW9uY2hhbmdlJywgcmVmcmVzaCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qIFJlZnJlc2ggbW9kdWxlICovXHJcbiAgICBjb25zdFxyXG4gICAgcmVmcmVzaCA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgLyogUHJlcGFyZSBkYXRhICovXHJcbiAgICAgICAgbGV0XHJcbiAgICAgICAgd2lkdGggPSBFTEVNRU5UUy4kd2luZG93LndpZHRoKCksXHJcbiAgICAgICAgbGFzdFdpZHRoID0gREFUQS53aWR0aDtcclxuICAgICAgICBoZWlnaHQgPSBFTEVNRU5UUy4kd2luZG93LmhlaWdodCgpO1xyXG5cclxuICAgICAgICBEQVRBLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgREFUQS5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgREFUQS5yZXNwb25zaXZlID0gbnVsbDtcclxuXHJcbiAgICAgICAgLyogQ2hlY2sgYWN0aXZlIGJyZWFrcG9pbnQgKi8gXHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gQlJFQUtQT0lOVFMpIHtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBCUkVBS1BPSU5UU1trZXldO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHdpZHRoID4gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIERBVEEucmVzcG9uc2l2ZSA9IGtleTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghREFUQS5yZXNwb25zaXZlKSB7XHJcbiAgICAgICAgICAgIERBVEEucmVzcG9uc2l2ZSA9ICdtb2JpbGUnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogVHJpZ2dlciByZXNpemUgcXVldWUgKGlnbm9yZSBmaXJzdCB0aW1lKSAqL1xyXG4gICAgICAgIGlmIChsYXN0V2lkdGggJiYgIURBVEEub3MpIHtcclxuICAgICAgICAgICAgaWYgKERBVEEud2lkdGggPT09IGxhc3RXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgUkVTSVpFLnRyaWdnZXIoJ3dpZHRoJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBSRVNJWkUudHJpZ2dlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICBERUJVRy52YXJpYWJsZS5yZWZyZXNoKCdkZXZpY2UnKTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICB9O1xyXG5cclxuICAgIC8qIERldGVybWluZSB0aGUgbW9iaWxlIG9wZXJhdGluZyBzeXN0ZW0gKi9cclxuICAgIGNvbnN0IFxyXG4gICAgZ2V0TW9iaWxlT3BlcmF0aW5nU3lzdGVtID0gKCkgPT4ge1xyXG4gICAgICAgIHZhciB1c2VyQWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50IHx8IG5hdmlnYXRvci52ZW5kb3IgfHwgd2luZG93Lm9wZXJhO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFdpbmRvd3MgUGhvbmUgbXVzdCBjb21lIGZpcnN0IGJlY2F1c2UgaXRzIFVBIGFsc28gY29udGFpbnMgXCJBbmRyb2lkXCJcclxuICAgICAgICBpZiAoL3dpbmRvd3MgcGhvbmUvaS50ZXN0KHVzZXJBZ2VudCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiV2luZG93cyBQaG9uZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgXHJcbiAgICAgICAgaWYgKC9hbmRyb2lkL2kudGVzdCh1c2VyQWdlbnQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIkFuZHJvaWRcIjtcclxuICAgICAgICB9XHJcbiAgICAgIFxyXG4gICAgICAgIC8vIGlPUyBkZXRlY3Rpb24gZnJvbTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvOTAzOTg4NS8xNzc3MTBcclxuICAgICAgICBpZiAoL2lQYWR8aVBob25lfGlQb2QvLnRlc3QodXNlckFnZW50KSAmJiAhd2luZG93Lk1TU3RyZWFtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcImlPU1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgLyogdGVzdC1jb2RlICovXHJcbiAgICBERUJVRy52YXJpYWJsZS5hZGQoJ2RldmljZScsIERBVEEpO1xyXG4gICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgIHN0YXJ0KCk7XHJcblxyXG4gICAgcmV0dXJuIERBVEE7XHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSAoZGF0YSkgPT4ge1xyXG5cclxuICAgIHZhciBcclxuICAgIERBVEEgPSB7XHJcbiAgICAgICAgbGFzdENlbnRlciAgICAgICAgICA6IG51bGwsXHJcbiAgICAgICAgY2VudGVyICAgICAgICAgICAgICA6IG51bGwsXHJcbiAgICAgICAgdG9wICAgICAgICAgICAgICAgICA6IG51bGwsXHJcbiAgICAgICAgc3BlZWQgICAgICAgICAgICAgICA6IG51bGwsXHJcbiAgICAgICAgZGlyZWN0aW9uICAgICAgICAgICA6IG51bGwsXHJcbiAgICB9LFxyXG4gICAgREVWSUNFID0gZGF0YS5ERVZJQ0U7XHJcblxyXG5cclxuICAgIHZhciBiaW5kID0gKCkgPT4ge1xyXG5cclxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKHJlZnJlc2gpO1xyXG5cclxuICAgICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZSBvcmllbnRhdGlvbmNoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZWZyZXNoKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJlZnJlc2goKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIHJlZnJlc2ggPSAoKSA9PiB7XHJcbiAgICAgICAgREFUQS5sYXN0Q2VudGVyID0gREFUQS5jZW50ZXIgfHwgMDtcclxuXHJcbiAgICAgICAgREFUQS50b3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCAwO1xyXG4gICAgICAgIERBVEEuY2VudGVyID0gREFUQS50b3AgKyBERVZJQ0UuaGVpZ2h0IC8gMjtcclxuXHJcbiAgICAgICAgREFUQS5zcGVlZCA9IE1hdGguYWJzKERBVEEubGFzdENlbnRlciAtIERBVEEuY2VudGVyKTtcclxuXHJcbiAgICAgICAgaWYgKERBVEEuY2VudGVyID4gREFUQS5sYXN0Q2VudGVyKSB7XHJcbiAgICAgICAgICAgIERBVEEuZGlyZWN0aW9uID0gXCJkb3duXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgREFUQS5kaXJlY3Rpb24gPSBcInVwXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICBERUJVRy52YXJpYWJsZS5yZWZyZXNoKCdzY3JvbGwnKTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICB9O1xyXG5cclxuICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgREVCVUcudmFyaWFibGUuYWRkKCdzY3JvbGwnLCBEQVRBKTtcclxuICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuXHJcbiAgICBiaW5kKCk7XHJcblxyXG4gICAgcmV0dXJuIERBVEE7XHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSAoZGF0YSkgPT4ge1xyXG5cclxuICAgIERBVEEgPSB7XHJcbiAgICAgICAgJGNvbnRhaW5lcjogbnVsbCxcclxuICAgICAgICAkZWxlbWVudDogbnVsbCxcclxuICAgICAgICAkYnV0dG9uOiBudWxsLFxyXG4gICAgICAgICRib2R5OiBudWxsLFxyXG4gICAgICAgIG9wZW46IGZhbHNlLFxyXG4gICAgfTtcclxuXHJcbiAgICAkLmV4dGVuZCggREFUQSwgZGF0YSApO1xyXG4gICAgXHJcbiAgICB2YXIgc3RhcnQgPSAoZGF0YSkgPT4ge1xyXG5cclxuICAgICAgICB2YXIgZGVidWdCb3hDbGFzcyA9ICdkZWJ1Zy1ib3ggZGVidWctYm94LS1jb25zb2xlJztcclxuICAgICAgICBpZiAoIURBVEEub3Blbikge1xyXG4gICAgICAgICAgICBkZWJ1Z0JveENsYXNzICs9ICcgZGVidWctYm94LS1oaWRlJztcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICB2YXIgZGVidWdCb3ggPSAkKGA8ZGl2IGNsYXNzPScke2RlYnVnQm94Q2xhc3N9JyBpZD0nZGVidWctYm94LWNvbnNvbGUnPjwvZGl2PmApO1xyXG4gICAgICAgIHZhciBkZWJ1Z0JveEJ1dHRvbiA9ICQoXCI8ZGl2IGlkPSdkZWJ1Zy1ib3gtY29uc29sZS1idXR0b24nIGNsYXNzPSdkZWJ1Zy1ib3hfX2J1dHRvbic+RnJvbnRCb3ggY29uc29sZTwvZGl2PlwiKTtcclxuICAgICAgICB2YXIgZGVidWdCb3hDb250YWluZXIgPSAkKFwiPGRpdiBpZD0nZGVidWctYm94LWNvbnNvbGUtY29udGFpbmVyJyBjbGFzcz0nZGVidWctYm94X19jb250YWluZXInPjwvZGl2PlwiKTtcclxuICAgIFxyXG4gICAgICAgIERBVEEuRUxFTUVOVFMuJGJvZHkuYXBwZW5kKGRlYnVnQm94KTtcclxuICAgICAgICBEQVRBLiRlbGVtZW50ID0gJChcIiNkZWJ1Zy1ib3gtY29uc29sZVwiKTtcclxuICAgIFxyXG4gICAgICAgIERBVEEuJGVsZW1lbnQuYXBwZW5kKGRlYnVnQm94QnV0dG9uKTtcclxuICAgICAgICBEQVRBLiRlbGVtZW50LmFwcGVuZChkZWJ1Z0JveENvbnRhaW5lcik7XHJcbiAgICBcclxuICAgICAgICBEQVRBLiRidXR0b24gPSAkKFwiI2RlYnVnLWJveC1jb25zb2xlLWJ1dHRvblwiKTtcclxuICAgICAgICBEQVRBLiRjb250YWluZXIgPSAkKFwiI2RlYnVnLWJveC1jb25zb2xlLWNvbnRhaW5lclwiKTtcclxuICAgIFxyXG4gICAgICAgIHZhciB0b2dnbGVEZWJ1Z0JveCA9ICgpID0+IHtcclxuICAgICAgICAgICAgREFUQS4kZWxlbWVudC50b2dnbGVDbGFzcyhcImRlYnVnLWJveC0taGlkZVwiKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIERBVEEuJGJ1dHRvbi5vbihcImNsaWNrXCIsIHRvZ2dsZURlYnVnQm94KTtcclxuICAgIFxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgdmFyIGFkZCA9IChhZGRTdHJpbmcsIGFkZG9uQ2xhc3MgPSAnJykgPT4ge1xyXG4gICAgICAgIERBVEEuJGNvbnRhaW5lci5wcmVwZW5kKFwiPHAgY2xhc3M9J1wiICsgYWRkb25DbGFzcyArIFwiJz5cIithZGRTdHJpbmcrXCI8L3A+XCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzdGFydCgpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYWRkOiBhZGQsXHJcbiAgICB9O1xyXG5cclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IChhcmd1bWVudCkgPT4ge1xyXG5cclxuICAgIHZhciBcclxuICAgIEVMRU1FTlRTID0gbnVsbDtcclxuXHJcbiAgICB2YXJcclxuICAgIEJPWCA9IHtcclxuICAgICAgICAkY29udGFpbmVyOiBudWxsLFxyXG4gICAgICAgICRjb250ZW50OiBudWxsLFxyXG4gICAgICAgICRidXR0b246IG51bGwsXHJcbiAgICAgICAgJGJvZHk6IG51bGwsXHJcbiAgICB9LFxyXG4gICAgT1BUSU9OUyA9IHtcclxuICAgICAgICBvcGVuOiBmYWxzZSxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3RcclxuICAgIENMQVNTID0ge1xyXG4gICAgICAgIGNvbnRhaW5lciAgICAgICA6IGBkZWJ1Zy1ib3ggZGVidWctYm94LS12YXJpYWJsZXNgLFxyXG4gICAgICAgIGJ1dHRvbiAgICAgICAgICA6IGBkZWJ1Zy1ib3hfX2J1dHRvbmAsXHJcbiAgICAgICAgY29udGVudCAgICAgICAgIDogYGRlYnVnLWJveF9fY29udGFpbmVyYCxcclxuICAgICAgICBpdGVtICAgICAgICAgICAgOiBgZGVidWctYm94X19pdGVtYCxcclxuICAgIH07XHJcblxyXG4gICAgdmFyXHJcbiAgICBDT05URU5UID0ge307XHJcblxyXG4gICAgLyogU3RhcnQgbW9kdWxlICovXHJcbiAgICB2YXIgXHJcbiAgICBzdGFydCA9IChkYXRhKSA9PiB7XHJcblxyXG4gICAgICAgIC8qIFByZXBhcmUgYXJndW1lbnRzIGRhdGEgKi9cclxuICAgICAgICAkLmV4dGVuZCggT1BUSU9OUywgYXJndW1lbnQuT1BUSU9OUyApO1xyXG4gICAgICAgIEVMRU1FTlRTID0gYXJndW1lbnQuRUxFTUVOVFM7XHJcblxyXG4gICAgICAgIC8qIENoZWNrIGlmIGNvbnRhaW5lciBtdXN0IGJlIGRlZmF1bHQgb3BlbiAqL1xyXG4gICAgICAgIGlmICghT1BUSU9OUy5vcGVuKSB7XHJcbiAgICAgICAgICAgIENMQVNTLmNvbnRhaW5lciArPSAnIGRlYnVnLWJveC0taGlkZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qIENyZWF0ZSB0ZW1wbGF0ZSAqL1xyXG4gICAgICAgIEJPWC4kY29udGFpbmVyICAgICAgPSAkKGA8ZGl2IGNsYXNzPScke0NMQVNTLmNvbnRhaW5lcn0nPjwvZGl2PmApO1xyXG4gICAgICAgIEJPWC4kYnV0dG9uICAgICAgICAgPSAkKGA8ZGl2IGNsYXNzPScke0NMQVNTLmJ1dHRvbn0nPkZyb250Qm94IHZhcmlhYmxlczwvZGl2PmApO1xyXG4gICAgICAgIEJPWC4kY29udGVudCAgICAgICAgPSAkKGA8ZGl2IGNsYXNzPScke0NMQVNTLmNvbnRlbnR9Jz48L2Rpdj5gKTtcclxuICAgICAgICBcclxuICAgICAgICAvKiBEcmF3IHRlbXBsYXRlICovXHJcbiAgICAgICAgRUxFTUVOVFMuJGJvZHkuYXBwZW5kKCBCT1guJGNvbnRhaW5lciApO1xyXG4gICAgICAgIEJPWC4kY29udGFpbmVyLmFwcGVuZCggQk9YLiRidXR0b24gKTtcclxuICAgICAgICBCT1guJGNvbnRhaW5lci5hcHBlbmQoIEJPWC4kY29udGVudCApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8qIEJpbmQgdG9nZ2xlIGNvbnRhaW5lciAqL1xyXG4gICAgICAgIEJPWC4kYnV0dG9uLm9uKFwiY2xpY2tcIiwgdG9nZ2xlQ29udGFpbmVyKTtcclxuICAgIH07XHJcbiAgICBcclxuXHJcbiAgICAvKiBTaG93IGRhdGEgaW4gY29udGVudCAqL1xyXG4gICAgY29uc3RcclxuICAgIGFkZCA9IChkYXRhTmFtZSwgREFUQSkgPT4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIENPTlRFTlRbZGF0YU5hbWVdID0ge1xyXG4gICAgICAgICAgICBkYXRhOiBEQVRBLFxyXG4gICAgICAgICAgICBuYW1lOiBkYXRhTmFtZS5zcGxpdChcIiBcIikuam9pbihcIi1cIikudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBCT1guJGNvbnRlbnQuYXBwZW5kKGA8cCBjbGFzcz1cIiR7Q0xBU1MuaXRlbX1cIj4ke0NPTlRFTlRbZGF0YU5hbWVdLm5hbWV9PC9wPmApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIERBVEEpIHtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBEQVRBW2tleV07XHJcblxyXG4gICAgICAgICAgICBsZXRcclxuICAgICAgICAgICAgbmFtZSA9IGtleS5zcGxpdChcIiBcIikuam9pbihcIi1cIikudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICAgICAgaWQgPSBgZGVidWctdmFyaWFibGUtJHtDT05URU5UW2RhdGFOYW1lXS5uYW1lfS0ke25hbWV9YDtcclxuICAgICAgICAgICAgJGl0ZW0gPSAkKGA8cD4gJHtrZXl9IDxzcGFuIGlkPScke2lkfSc+JHt2YWx1ZX08L3NwYW4+IDwvcD5gKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIEJPWC4kY29udGVudC5hcHBlbmQoJGl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgJGl0ZW0ub24oXCJjbGlja1wiLCB7JGl0ZW19LCB0b2dnbGVWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKiBSZWZyZXNoIGRhdGEgbmFtZSBpbiBjb250ZW50ICovIFxyXG4gICAgY29uc3RcclxuICAgIHJlZnJlc2ggPSAobmFtZSkgPT4ge1xyXG4gICAgICAgIHZhclxyXG4gICAgICAgIGl0ZW0gPSBDT05URU5UW25hbWVdLFxyXG4gICAgICAgIGRhdGEgPSBpdGVtLmRhdGE7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBkYXRhW2tleV07XHJcblxyXG4gICAgICAgICAgICBsZXRcclxuICAgICAgICAgICAgbmFtZSA9IGtleS5zcGxpdChcIiBcIikuam9pbihcIi1cIikudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICAgICAgZmluZCA9IGBkZWJ1Zy12YXJpYWJsZS0ke2l0ZW0ubmFtZX0tJHtuYW1lfWA7XHJcblxyXG4gICAgICAgICAgICAkKGAjJHtmaW5kfWApLnRleHQodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBcclxuICAgIC8qIFRvb2dsZSBjb250YWluZXIgKi9cclxuICAgIGNvbnN0XHJcbiAgICB0b2dnbGVDb250YWluZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgQk9YLiRjb250YWluZXIudG9nZ2xlQ2xhc3MoXCJkZWJ1Zy1ib3gtLWhpZGVcIik7XHJcbiAgICB9O1xyXG4gICAgLyogVG9vZ2xlIHZhbHVlICovXHJcbiAgICBjb25zdFxyXG4gICAgdG9nZ2xlVmFsdWUgPSAoZSkgPT4geyAgICAgIFxyXG4gICAgICAgIGUuZGF0YS4kaXRlbS50b2dnbGVDbGFzcyhcImpzX2ZvY3VzXCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzdGFydCgpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYWRkOiBhZGQsXHJcbiAgICAgICAgcmVmcmVzaDogcmVmcmVzaCxcclxuICAgIH07XHJcblxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydCBzdHJpbmcgdG8gYm9vbGVhblxyXG4gICAgICogZmFzdGVzdCBtZXRob2QgaHR0cDovL2pzYmVuLmNoL2NxVlNqXHJcbiAgICAgKi9cclxuICAgIGdldEJvb2xlYW4odmFsdWUpIHtcclxuXHRcdHN3aXRjaCAodmFsdWUpe1xyXG5cdFx0XHRjYXNlIHRydWU6XHJcblx0XHRcdGNhc2UgXCJ0cnVlXCI6XHJcblx0XHRcdGNhc2UgMTpcclxuXHRcdFx0Y2FzZSBcIjFcIjpcclxuXHRcdFx0Y2FzZSBcIm9uXCI6XHJcblx0XHRcdGNhc2UgXCJ5ZXNcIjpcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0ZGVmYXVsdDogXHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgLypcclxuICAgICAqIERldGVybWluZSBPdmVyZmxvd1xyXG4gICAgICovXHJcbiAgICBkZXRlcm1pbmVPdmVyZmxvdzogZnVuY3Rpb24oY29udGVudCwgY29udGFpbmVyKSB7XHJcblxyXG4gICAgICAgIGlmIChjb250ZW50IGluc3RhbmNlb2YgalF1ZXJ5KVxyXG4gICAgICAgIHtcclxuXHRcdFx0Y29udGVudCA9IGNvbnRlbnRbMF07XHJcblx0XHR9XHJcbiAgICAgICAgaWYgKGNvbnRhaW5lciBpbnN0YW5jZW9mIGpRdWVyeSlcclxuICAgICAgICB7XHJcblx0XHRcdGNvbnRhaW5lciA9IGNvbnRhaW5lclswXTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXJcclxuXHRcdGNvbnRhaW5lck1ldHJpY3MgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcblx0XHRjb250YWluZXJNZXRyaWNzUmlnaHQgPSBNYXRoLmZsb29yKGNvbnRhaW5lck1ldHJpY3MucmlnaHQpLFxyXG5cdFx0Y29udGFpbmVyTWV0cmljc0xlZnQgPSBNYXRoLmZsb29yKGNvbnRhaW5lck1ldHJpY3MubGVmdCksXHJcblx0XHRjb250ZW50TWV0cmljcyA9IGNvbnRlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcblx0XHRjb250ZW50TWV0cmljc1JpZ2h0ID0gTWF0aC5mbG9vcihjb250ZW50TWV0cmljcy5yaWdodCksXHJcblx0XHRjb250ZW50TWV0cmljc0xlZnQgPSBNYXRoLmZsb29yKGNvbnRlbnRNZXRyaWNzLmxlZnQpO1xyXG5cclxuICAgICAgICBpZiAoY29udGFpbmVyTWV0cmljc0xlZnQgPiBjb250ZW50TWV0cmljc0xlZnQgJiYgY29udGFpbmVyTWV0cmljc1JpZ2h0IDwgY29udGVudE1ldHJpY3NSaWdodCkgXHJcbiAgICAgICAge1xyXG5cdFx0XHRyZXR1cm4gXCJib3RoXCI7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIGlmIChjb250ZW50TWV0cmljc0xlZnQgPD0gY29udGFpbmVyTWV0cmljc0xlZnQpIFxyXG4gICAgICAgIHtcclxuXHRcdFx0cmV0dXJuIFwibGVmdFwiO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSBpZiAoY29udGVudE1ldHJpY3NSaWdodCA+PSBjb250YWluZXJNZXRyaWNzUmlnaHQpXHJcbiAgICAgICAge1xyXG5cdFx0XHRyZXR1cm4gXCJyaWdodFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIFxyXG4gICAgICAgIHtcclxuXHRcdFx0cmV0dXJuIFwibm9uZVwiO1xyXG5cdFx0fVxyXG4gICAgfSxcclxuICAgICAgICBcclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqICQuZGlzYWJsZXNjcm9sbFxyXG4gICAgICogQXV0aG9yOiBKb3NoIEhhcnJpc29uIC0gYWxvb2YuY29cclxuICAgICAqXHJcbiAgICAgKiBEaXNhYmxlcyBzY3JvbGwgZXZlbnRzIGZyb20gbW91c2V3aGVlbHMsIHRvdWNobW92ZXMgYW5kIGtleXByZXNzZXMuXHJcbiAgICAgKiBVc2Ugd2hpbGUgalF1ZXJ5IGlzIGFuaW1hdGluZyB0aGUgc2Nyb2xsIHBvc2l0aW9uIGZvciBhIGd1YXJhbnRlZWQgc3VwZXItc21vb3RoIHJpZGUhXHJcbiAgICAgKi9cclxuXHJcbiAgICA7KGZ1bmN0aW9uKCQpIHtcclxuXHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgICAgIHZhciBpbnN0YW5jZSwgcHJvdG87XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIFVzZXJTY3JvbGxEaXNhYmxlcigkY29udGFpbmVyLCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIC8vIHNwYWNlYmFyOiAzMiwgcGFnZXVwOiAzMywgcGFnZWRvd246IDM0LCBlbmQ6IDM1LCBob21lOiAzNlxyXG4gICAgICAgICAgICAvLyBsZWZ0OiAzNywgdXA6IDM4LCByaWdodDogMzksIGRvd246IDQwXHJcbiAgICAgICAgICAgIHRoaXMub3B0cyA9ICQuZXh0ZW5kKHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZVdoZWVsIDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGhhbmRsZVNjcm9sbGJhcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGhhbmRsZUtleXMgOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsRXZlbnRLZXlzIDogWzMyLCAzMywgMzQsIDM1LCAzNiwgMzcsIDM4LCAzOSwgNDBdXHJcbiAgICAgICAgICAgIH0sIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy4kY29udGFpbmVyID0gJGNvbnRhaW5lcjtcclxuICAgICAgICAgICAgdGhpcy4kZG9jdW1lbnQgPSAkKGRvY3VtZW50KTtcclxuICAgICAgICAgICAgdGhpcy5sb2NrVG9TY3JvbGxQb3MgPSBbMCwgMF07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRpc2FibGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RvID0gVXNlclNjcm9sbERpc2FibGVyLnByb3RvdHlwZTtcclxuXHJcbiAgICAgICAgcHJvdG8uZGlzYWJsZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBpZih0Lm9wdHMuaGFuZGxlV2hlZWwpIHtcclxuICAgICAgICAgICAgICAgIHQuJGNvbnRhaW5lci5vbihcclxuICAgICAgICAgICAgICAgICAgICBcIm1vdXNld2hlZWwuZGlzYWJsZXNjcm9sbCBET01Nb3VzZVNjcm9sbC5kaXNhYmxlc2Nyb2xsIHRvdWNobW92ZS5kaXNhYmxlc2Nyb2xsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdC5faGFuZGxlV2hlZWxcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHQub3B0cy5oYW5kbGVTY3JvbGxiYXIpIHtcclxuICAgICAgICAgICAgICAgIHQubG9ja1RvU2Nyb2xsUG9zID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIHQuJGNvbnRhaW5lci5zY3JvbGxMZWZ0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgdC4kY29udGFpbmVyLnNjcm9sbFRvcCgpXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgdC4kY29udGFpbmVyLm9uKFwic2Nyb2xsLmRpc2FibGVzY3JvbGxcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdC5faGFuZGxlU2Nyb2xsYmFyLmNhbGwodCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodC5vcHRzLmhhbmRsZUtleXMpIHtcclxuICAgICAgICAgICAgICAgIHQuJGRvY3VtZW50Lm9uKFwia2V5ZG93bi5kaXNhYmxlc2Nyb2xsXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdC5faGFuZGxlS2V5ZG93bi5jYWxsKHQsIGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgcHJvdG8udW5kbyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHQuJGNvbnRhaW5lci5vZmYoXCIuZGlzYWJsZXNjcm9sbFwiKTtcclxuICAgICAgICAgICAgaWYodC5vcHRzLmhhbmRsZUtleXMpIHtcclxuICAgICAgICAgICAgICAgIHQuJGRvY3VtZW50Lm9mZihcIi5kaXNhYmxlc2Nyb2xsXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICBwcm90by5faGFuZGxlV2hlZWwgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJvdG8uX2hhbmRsZVNjcm9sbGJhciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRjb250YWluZXIuc2Nyb2xsTGVmdCh0aGlzLmxvY2tUb1Njcm9sbFBvc1swXSk7XHJcbiAgICAgICAgICAgIHRoaXMuJGNvbnRhaW5lci5zY3JvbGxUb3AodGhpcy5sb2NrVG9TY3JvbGxQb3NbMV0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJvdG8uX2hhbmRsZUtleWRvd24gPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMub3B0cy5zY3JvbGxFdmVudEtleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSB0aGlzLm9wdHMuc2Nyb2xsRXZlbnRLZXlzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgLy8gUGx1Z2luIHdyYXBwZXIgZm9yIG9iamVjdFxyXG4gICAgICAgICQuZm4uc2Nyb2xsRGlzYWJsZSA9IGZ1bmN0aW9uKG1ldGhvZCkge1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgY2FsbGluZyBmb3IgdGhlIGZpcnN0IHRpbWUsIGluc3RhbnRpYXRlIHRoZSBvYmplY3QgYW5kIHNhdmVcclxuICAgICAgICAgICAgLy8gcmVmZXJlbmNlLiBUaGUgcGx1Z2luIGNhbiB0aGVyZWZvcmUgb25seSBiZSBpbnN0YW50aWF0ZWQgb25jZSBwZXJcclxuICAgICAgICAgICAgLy8gcGFnZS4gWW91IGNhbiBwYXNzIG9wdGlvbnMgb2JqZWN0IGluIHRocm91Z2ggdGhlIG1ldGhvZCBwYXJhbWV0ZXIuXHJcbiAgICAgICAgICAgIGlmKCAhIGluc3RhbmNlICYmICh0eXBlb2YgbWV0aG9kID09PSBcIm9iamVjdFwiIHx8ICEgbWV0aG9kKSkge1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBuZXcgVXNlclNjcm9sbERpc2FibGVyKHRoaXMsIG1ldGhvZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEluc3RhbmNlIGNyZWF0ZWQsIG5vIG1ldGhvZCBzcGVjaWZpZWQuIENhbGwgZGlzYWJsZSBhZ2FpblxyXG4gICAgICAgICAgICBpZihpbnN0YW5jZSAmJiB0eXBlb2YgbWV0aG9kID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5kaXNhYmxlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEluc3RhbmNlIGFscmVhZHkgY3JlYXRlZCwgYW5kIGEgbWV0aG9kIGlzIGJlaW5nIGV4cGxpY2l0bHkgY2FsbGVkLFxyXG4gICAgICAgICAgICAvLyBlLmcuIC5zY3JvbGxEaXNhYmxlKCd1bmRvJyk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYoaW5zdGFuY2UgJiYgaW5zdGFuY2VbbWV0aG9kXSkge1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2VbbWV0aG9kXS5jYWxsKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBHbG9iYWwgYWNjZXNzXHJcbiAgICAgICAgd2luZG93LlVzZXJTY3JvbGxEaXNhYmxlciA9IFVzZXJTY3JvbGxEaXNhYmxlcjtcclxuXHJcbiAgICB9KShqUXVlcnkpO1xyXG5cclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IChkYXRhKSA9PiB7XHJcblxyXG4gICAgdmFyXHJcbiAgICAgICAgREFUQSA9IHtcclxuICAgICAgICAgICAgJGJ1cmdlcjogbnVsbCxcclxuICAgICAgICAgICAgJG1lbnU6IG51bGwsXHJcbiAgICAgICAgICAgICRtZW51X2NvbnRhaW5lcjogbnVsbCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIEVMRU1FTlRTID0gZGF0YS5FTEVNRU5UUyxcclxuICAgICAgICBGVU5DVElPTlMgPSBkYXRhLkZVTkNUSU9OUyxcclxuICAgICAgICBTRVRUSU5HUyA9IHtcclxuICAgICAgICAgICAgd2FpdDogMzAwLFxyXG4gICAgICAgICAgICBzdHlsZTogJ3VuZGVyLWhlYWRlcicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhY3RpdmUgPSBmYWxzZSxcclxuICAgICAgICBtb3ZpbmcgPSBmYWxzZTtcclxuXHJcblxyXG4gICAgaWYgKGRhdGEuU0VUVElOR1MpIHtcclxuICAgICAgICAkLmV4dGVuZChEQVRBLCBkYXRhLlNFVFRJTkdTKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc3RhcnQgPSAoc2V0dGluZ3MgPSBmYWxzZSkgPT4ge1xyXG5cclxuICAgICAgICBEQVRBLiRidXJnZXIgPSAkKFwiI2J1cmdlci1idXR0b25cIik7XHJcblxyXG5cclxuICAgICAgICBpZiAoREFUQS4kYnVyZ2VyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBEQVRBLiRtZW51ID0gJChcIiNidXJnZXItbWVudVwiKTtcclxuICAgICAgICAgICAgREFUQS4kbWVudV9jb250YWluZXIgPSAkKFwiI2J1cmdlci1tZW51LWNvbnRhaW5lclwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIERBVEEuJGJ1cmdlci5vbihcImNsaWNrXCIsIGJ1cmdlckNsaWNrKTtcclxuXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgLy8gREVCVUcudmFyaWFibGUuYWRkKHtcclxuICAgICAgICAvLyAgICAgJ0J1cmdlciBhY3RpdmUnOiBhY3RpdmUsXHJcbiAgICAgICAgLy8gICAgICdCdXJnZXIgbW92aW5nJzogbW92aW5nLFxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgIH07XHJcblxyXG4gICAgdmFyIHRvZ2dsZU9mZiA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgREVCVUcuY29uc29sZS5hZGQoXCJCdXJnZXIgdG9nZ2xlT2ZmXCIsIFwiY2xpY2tcIik7XHJcbiAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgICAgICBtb3ZpbmcgPSB0cnVlO1xyXG4gICAgICAgIGFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBFTEVNRU5UUy4kaHRtbC5yZW1vdmVDbGFzcygnanNfbWVudS1hY3RpdmUnKTtcclxuXHJcblxyXG4gICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgIC8vIERFQlVHLnZhcmlhYmxlLmFkZCh7XHJcbiAgICAgICAgLy8gICAgICdCdXJnZXIgbW92aW5nJzogbW92aW5nLFxyXG4gICAgICAgIC8vICAgICAnQnVyZ2VyIGFjdGl2ZSc6IGFjdGl2ZSxcclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBFTEVNRU5UUy4kYm9keS5zY3JvbGxEaXNhYmxlKFwidW5kb1wiKTtcclxuICAgICAgICAgICAgbW92aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIEVMRU1FTlRTLiRodG1sLnJlbW92ZUNsYXNzKCdqc19tZW51LWFjdGl2ZS0tZW5kJyk7XHJcblxyXG4gICAgICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICAgICAgLy8gREVCVUcudmFyaWFibGUuYWRkKHtcclxuICAgICAgICAgICAgLy8gICAgICdCdXJnZXIgbW92aW5nJzogbW92aW5nLFxyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgICAgICB9LCBTRVRUSU5HUy53YWl0KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciB0b2dnbGVPbiA9ICgpID0+IHtcclxuICAgICAgICBFTEVNRU5UUy4kYm9keS5zY3JvbGxEaXNhYmxlKCk7XHJcblxyXG4gICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKFwiQnVyZ2VyIHRvZ2dsZU9uXCIsIFwiY2xpY2tcIik7XHJcbiAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgICAgICBpZiAoU0VUVElOR1Muc3R5bGUpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChTRVRUSU5HUy5zdHlsZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICogRm9yIGJ1cmdlciBhbmltYXRpb25cclxuICAgICAgICAgICAgICAgICAqIEBpbXBvcnQgXCIuLi9wbHVnaW5zL2FuaW1hdGlvbi9uYXZiYXIvdW5kZXItaGVhZGVyXCI7XHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3VuZGVyLWhlYWRlcic6XHJcbiAgICAgICAgICAgICAgICAgICAgREFUQS4kbWVudSA9IERBVEEuJG1lbnVfY29udGFpbmVyLm9mZnNldEhlaWdodCArICdweCc7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgRUxFTUVOVFMuJGh0bWwuYWRkQ2xhc3MoJ2pzX21lbnUtYWN0aXZlJyk7XHJcbiAgICAgICAgRUxFTUVOVFMuJG92ZXJsYXkub24oJ2NsaWNrJywgdG9nZ2xlT3ZlcmxheSk7XHJcblxyXG4gICAgICAgIG1vdmluZyA9IHRydWU7XHJcbiAgICAgICAgYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgLy8gREVCVUcudmFyaWFibGUuYWRkKHtcclxuICAgICAgICAvLyAgICAgJ0J1cmdlciBhY3RpdmUnOiBhY3RpdmUsXHJcbiAgICAgICAgLy8gICAgICdCdXJnZXIgbW92aW5nJzogbW92aW5nLFxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuXHJcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBFTEVNRU5UUy4kaHRtbC5hZGRDbGFzcygnanNfbWVudS1hY3RpdmUtLWVuZCcpO1xyXG4gICAgICAgICAgICBtb3ZpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgICAgICAvLyBERUJVRy52YXJpYWJsZS5hZGQoe1xyXG4gICAgICAgICAgICAvLyAgICAgJ0J1cmdlciBtb3ZpbmcnOiBtb3ZpbmcsXHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgICAgIH0sIFNFVFRJTkdTLndhaXQpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIHRvZ2dsZU92ZXJsYXkgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKFwiQnVyZ2VyIG92ZXJsYXkgdG9nZ2xlT2ZmXCIsIFwiY2xpY2tcIik7XHJcbiAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgICAgICBFTEVNRU5UUy4kb3ZlcmxheS5vZmYoJ2NsaWNrJywgdG9nZ2xlT3ZlcmxheSk7XHJcblxyXG4gICAgICAgIHRvZ2dsZU9mZigpO1xyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBidXJnZXJDbGljayA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgaWYgKCFtb3ZpbmcpIHtcclxuXHJcbiAgICAgICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgICAgICBERUJVRy5jb25zb2xlLmFkZChcIkJ1cmdlciBjbGlja2VkXCIsIFwiY2xpY2tcIik7XHJcbiAgICAgICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuXHJcbiAgICAgICAgICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIHRvZ2dsZU9mZigpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdG9nZ2xlT24oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKFwiQnVyZ2VyIGNsaWNrIGJsb2NrZWQuIEJ1cmdlciBpcyBtb3ZpbmdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuXHJcbiAgICBzdGFydCgpO1xyXG5cclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IChkYXRhKSA9PiB7XHJcblxyXG4gICAgdmFyIFxyXG4gICAgU0VUVElOR1MgPSB7XHJcbiAgICAgICAgc3B5VG9wOiB0cnVlLFxyXG4gICAgICAgIG9mZnNldDogMSxcclxuICAgICAgICBzcHlUb3BDbGFzczogJ2pzX3N0aWNreS1lbGVtZW50LS1hY3RpdmUnLFxyXG4gICAgfSxcclxuICAgIEVMRU1FTlRTID0gZGF0YS5FTEVNRU5UUyxcclxuICAgIFNDUk9MTCA9IGRhdGEuU0NST0xMLFxyXG4gICAgJGVsZW1lbnRTcHkgPSBkYXRhLiRlbGVtZW50U3B5LFxyXG4gICAgREFUQSA9IHtcclxuICAgICAgICBoZWlnaHQ6IG51bGwsXHJcbiAgICAgICAgb2Zmc2V0OiBudWxsLFxyXG4gICAgfSxcclxuICAgIGFjdGl2ZSA9IGZhbHNlLFxyXG4gICAgcG9zaXRpb24gPSBudWxsO1xyXG5cclxuICAgIGlmIChkYXRhLlNFVFRJTkdTKSB7XHJcbiAgICAgICAgJC5leHRlbmQoREFUQSwgZGF0YS5TRVRUSU5HUyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHN0YXJ0ID0gKGRhdGEpID0+IHtcclxuXHJcbiAgICAgICAgaWYgKCRlbGVtZW50U3B5Lmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUgb3JpZW50YXRpb25jaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJlZnJlc2goKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICAgICAgcmVmcmVzaCgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKFNFVFRJTkdTLnNweVRvcCkgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNweVRvcCgpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBFTEVNRU5UUy4kd2luZG93Lm9uKFwic2Nyb2xsXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzcHlUb3AoKTtcclxuICAgICAgICAgICAgICAgIH0pOyAgIFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICAgICAgREVCVUcuY29uc29sZS5hZGQoYFN0YXJ0IHN0aWNreS5qcyB7b2Zmc2V0OiAke0RBVEEub2Zmc2V0fTsgfWApO1xyXG4gICAgICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgcmVmcmVzaCA9ICgpID0+IHtcclxuICAgICAgICBjYWxjdWxhdGVIZWFkZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoIVNFVFRJTkdTLm9mZnNldCkge1xyXG4gICAgICAgICAgICBEQVRBLm9mZnNldCA9IFNFVFRJTkdTLm9mZnNldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIERBVEEub2Zmc2V0ID0gJGVsZW1lbnRTcHkub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdmFyIGNhbGN1bGF0ZUhlYWRlciA9IChkYXRhKSA9PiB7XHJcblxyXG4gICAgICAgIHBvc2l0aW9uID0gJGVsZW1lbnRTcHkub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgIERBVEEuaGVpZ2h0ID0gJGVsZW1lbnRTcHkub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcblxyXG4gICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgIC8vIERFQlVHLnZhcmlhYmxlLmFkZCh7XHJcbiAgICAgICAgLy8gICAgIFwiSGVhZGVyIGhlaWdodFwiOiBEQVRBLmhlaWdodCxcclxuICAgICAgICAvLyAgICAgXCJIZWFkZXIgcG9zaXRpb25cIjogcG9zaXRpb24sXHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgc3B5VG9wID0gKCkgPT4ge1xyXG5cclxuICAgICAgICBpZiAoU0NST0xMLnRvcCA+IERBVEEub2Zmc2V0KSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghYWN0aXZlKSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vIEVMRU1FTlRTLiRoZWFkZXJQbGFjZWhvbGRlci5jc3Moe2hlaWdodDogREFUQS5oZWlnaHR9KTtcclxuICAgICAgICAgICAgICAgIEVMRU1FTlRTLiRodG1sLmFkZENsYXNzKFNFVFRJTkdTLnNweVRvcENsYXNzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gRUxFTUVOVFMuJGhlYWRlclBsYWNlaG9sZGVyLmNzcyh7aGVpZ2h0OiBcIlwifSk7XHJcbiAgICAgICAgICAgICAgICBFTEVNRU5UUy4kaHRtbC5yZW1vdmVDbGFzcyhTRVRUSU5HUy5zcHlUb3BDbGFzcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgIC8vIERFQlVHLnZhcmlhYmxlLmFkZCh7XHJcbiAgICAgICAgLy8gICAnSGVhZGVyIGFjdGl2ZSc6IGFjdGl2ZSxcclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBzdGFydCgpO1xyXG5cclxuICAgIHJldHVybiB7XHJcblxyXG4gICAgfTtcclxuXHJcbn07IiwiLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbnx8IFNtb290aCBzY3JvbGwgdG8gdGFyZ2V0XHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG58fCBSZXF1aXJlZFxyXG58fCAqIFNDUk9MTFxyXG58fCAqIEVMRU1FTlRTXHJcbnx8ICogRlVOQ1RJT05TXHJcbnx8XHJcbnx8ICogZGF0YS1lbGVtZW50IC0gc2VsZWN0IGVsZW1lbnRzIHNlcGFyYXRlIHdpdGggY29tbWEgKCAkKFwiZGF0YS1sZW1lbnRcIikgKVxyXG58fCAqIGRhdGEtdG9nZ2xlIC0gc2VsZWN0IHR5cGUgb2YgdG9nZ2xlXHJcbnx8XHJcbnx8IERhdGEtdG9nZ2xlIHR5cGU6XHJcbnx8ICogY29sbGFwc2UgLSBjb2xsYXBzZSBkYXRhLWVsZW1lbnQgKCB1c2UgbGVzcy9qYXZhc2NyaXB0L19jb2xsYXBzZS5sZXNzIGNsYXNzIClcclxufHwgKiBzb21ldGhpbmcgZWxzZSAtIHRvZ2dsZSBkYXRhLWVsZW1lbnQgdXNpbmcgY2xhc3Mgb24gZGF0YS10b2dnbGVcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXHJcbm1vZHVsZS5leHBvcnRzID0gKGRhdGEpID0+IHtcclxuICAgIFxyXG4gICAgdmFyXHJcbiAgICBTQ1JPTEwgPSBkYXRhLlNDUk9MTCxcclxuICAgIEVMRU1FTlRTID0gZGF0YS5FTEVNRU5UUyxcclxuICAgIEZVTkNUSU9OUyA9IGRhdGEuRlVOQ1RJT05TLFxyXG4gICAgLy8gYWxsIGNsaWNrYWJsZSBzY3JvbGwgZWxlbWVudHNcclxuICAgICRlbGVtZW50cyA9IG51bGwsXHJcbiAgICAvLyBib29sIHBhZ2UgaXMgc2Nyb2xsXHJcbiAgICBhY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICB2YXJcclxuICAgIFNFVFRJTkdTID0ge1xyXG4gICAgICAgIC8vIGFjdGl2ZSBhdXRvbWF0aWMgc2Nyb2xsIHBhZ2UgdG8gZWxlbWVudCB2aWEgVVJMIGhhc2hcclxuICAgICAgICBhdXRvU2Nyb2xsOiBmYWxzZSxcclxuICAgICAgICAvLyBkaXZpZGUgZGlzdGFuY2UgYnkgdGhpcyB2YWx1ZSB0byBjYWxjdWxhdGUgdGltZSBzY3JvbGxcclxuICAgICAgICB0aW1lOiAyLFxyXG4gICAgICAgIC8vIG1pbiB0aW1lIHNjcm9sbFxyXG4gICAgICAgIG1pblRpbWU6IDQwMCxcclxuICAgICAgICAvLyBtYXggdGltZSBzY3JvbGxcclxuICAgICAgICBtYXhUaW1lOiAxMjAwLFxyXG4gICAgICAgIC8vIHJ1biBhdXRvU2Nyb2xsIHdoZW4gaGFzaCBpbiBVUkwgaXMgYmVnaW4gd2l0aCB0aGlzIHN0cmluZ1xyXG4gICAgICAgIHByZWZpeEF1dG9TY3JvbGw6ICdzY3JvbGwtJ1xyXG4gICAgfTtcclxuXHJcbiAgICAkLmV4dGVuZCggU0VUVElOR1MsIGRhdGEuU0VUVElOR1MgKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0IGZ1bmN0aW9uXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXHJcbiAgICAgKiByZXBsYWNlIHZhbHVlcyBpbiBTRVRUSU5HUyBcclxuICAgICAqL1xyXG4gICAgdmFyXHJcbiAgICBzdGFydCA9IChkYXRhKSA9PiB7XHJcblxyXG4gICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKFwiU3RhcnQ6IHNjcm9sbFRvXCIpO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgaWYgKFNFVFRJTkdTLmF1dG9TY3JvbGwpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYXV0b1Njcm9sbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVmcmVzaCgpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdXRvbWF0aWMgc2Nyb2xsIHBhZ2UgdG8gZWxlbWVudCBJRFxyXG4gICAgICogd2hlbiB1c2VyIHZpc2l0IHBhZ2Ugd2l0aCBoYXNoXHJcbiAgICAgKiBiZWdpbiB3aXRoIFNFVFRJTkdTLnByZWZpeEF1dG9TY3JvbGxcclxuICAgICAqL1xyXG4gICAgdmFyXHJcbiAgICBhdXRvU2Nyb2xsID0gKCkgPT4ge1xyXG4gICAgICAgIHZhciBcclxuICAgICAgICBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgcGFnZSBtdXN0IHRyaWdnZXIgYXV0b1Njcm9sbFxyXG4gICAgICAgIGlmKCBoYXNoLnN0YXJ0c1dpdGgoIFwiI1wiICsgU0VUVElOR1MucHJlZml4QXV0b1Njcm9sbCApICkge1xyXG5cclxuICAgICAgICAgICAgLy8gRml4IGFubm95aW5nIGp1bXBpbmcgd2hlbiB1c2VyIGRpc3R1cmIgc2Nyb2xsXHJcbiAgICAgICAgICAgIEVMRU1FTlRTLiRib2R5LnNjcm9sbERpc2FibGUodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBSZW1vdmUgaGFzaCBmcm9tIHVybFxyXG4gICAgICAgICAgICB2YXIgXHJcbiAgICAgICAgICAgIGNsZWFuVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0ICsgbG9jYXRpb24ucGF0aG5hbWU7XHJcbiAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgZG9jdW1lbnQudGl0bGUsIGNsZWFuVXJsKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSB0YXJnZXQgSUQgZnJvbSBoYXNoXHJcbiAgICAgICAgICAgIHZhciBcclxuICAgICAgICAgICAgdGFyZ2V0SUQgPSBoYXNoLnN1YnN0cmluZyhoYXNoLmluZGV4T2YoJy0nKSsxLCBoYXNoLmxlbmdodCk7XHJcblxyXG4gICAgICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICAgICAgREVCVUcuY29uc29sZS5hZGQoXCJzY3JvbGxUby5qcyBhdXRvIHRyaWdnZXIgZnVuY3Rpb24gYXV0b1Njcm9sbCgpLlwiLCAnYXV0bycpO1xyXG4gICAgICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBGaXggYW5ub3lpbmcganVtcGluZyB3aGVuIHBhZ2UgaXMgc3RpbGwgbm90IHJlYWR5XHJcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgICAgICBvbih0YXJnZXRJRCk7XHJcbiAgICAgICAgICAgIH0sIDkwMCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTY3JvbGwgZnVuY3Rpb25cclxuICAgICAqIEBwYXJhbSB7RXZlbnQgaW50ZXJmYWNlfSBldmVudCBcclxuICAgICAqIEBwYXJhbSB7alF1ZXJ5IG9iamVjdDsgU3RyaW5nIElEfSB0YXJnZXQgXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGltZSBcclxuICAgICAqL1xyXG4gICAgdmFyXHJcbiAgICBzY3JvbGwgPSAoZXZlbnQsIHRhcmdldCA9IGZhbHNlLCB0aW1lID0gZmFsc2UpID0+IHtcclxuICAgICAgICB2YXJcclxuICAgICAgICB0YXJnZXRJRCwgJHRhcmdldCwgJHRoaXM7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGV2ZW50IGFuZCByZW1vdmUgZGVmYXVsdCBhY3Rpb25cclxuICAgICAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKGBDbGljayBzY3JvbGxUbzogZXZlbnQucHJldmVudERlZmF1bHQoKWAsICdjbGljaycpO1xyXG4gICAgICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICAgICAgICAgICR0aGlzID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIHRhcmdldCBlbGVtZW50XHJcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0SUQgPSBcIiNcIiArICR0aGlzLmF0dHIoXCJkYXRhLXNjcm9sbFwiKTtcclxuICAgICAgICAgICAgJHRhcmdldCA9ICQodGFyZ2V0SUQpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBqUXVlcnkpIHtcclxuICAgICAgICAgICAgICAgICR0YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRJRCA9IFwiI1wiICsgJHRhcmdldC5hdHRyKFwiSURcIik7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0SUQgPSBcIiNcIiArIHRhcmdldDtcclxuICAgICAgICAgICAgICAgICR0YXJnZXQgPSAkKHRhcmdldElEKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgc2Nyb2xsIGFuaW1hdGlvbiBpcyBmcmVlIHRvIHVzZVxyXG4gICAgICAgIGlmICghYWN0aXZlKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayAkdGFyZ2V0IGV4aXN0XHJcbiAgICAgICAgICAgIGlmICgkdGFyZ2V0Lmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEJsb2NrIG90aGVyIHNjcm9sbCB0cmlnZ2Vyc1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBHcmFiIHRhcmdldCB0b3AgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgIHZhclxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0UG9zaXRpb25Ub3AgPSAkdGFyZ2V0Lm9mZnNldCgpLnRvcCxcclxuICAgICAgICAgICAgICAgIC8vIFNjcm9sbCBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsVG8gPSB0YXJnZXRQb3NpdGlvblRvcDsgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBzY3JvbGxUaW1lIFxyXG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRpbWUgPSBNYXRoLnJvdW5kKE1hdGguYWJzKHRhcmdldFBvc2l0aW9uVG9wIC0gU0NST0xMLnRvcCkgLyBTRVRUSU5HUy50aW1lKTtcclxuICAgICAgICAgICAgICAgIGlmIChzY3JvbGxUaW1lIDwgU0VUVElOR1MubWluVGltZSkgXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVGltZSA9IFNFVFRJTkdTLm1pblRpbWU7XHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc2Nyb2xsVGltZSA+IFNFVFRJTkdTLm1heFRpbWUpIFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRpbWUgPSBTRVRUSU5HUy5tYXhUaW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgICAgICAgICBERUJVRy5jb25zb2xlLmFkZChgQ2xpY2sgc2Nyb2xsVG86IHNjcm9sbCB0byBlbGVtZW50IHt0YXJnZXQ6IDxzdHJvbmc+JHt0YXJnZXRJRH08L3N0cm9uZz47IHNwZWVkIDxzdHJvbmc+JHtzY3JvbGxUaW1lfW1zPC9zdHJvbmc+OyBwb3NpdGlvbjogPHN0cm9uZz4ke3Njcm9sbFRvfTwvc3Ryb25nPn1gLCAnY2xpY2snKTtcclxuICAgICAgICAgICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBbmltYXRlIHNjcm9sbFxyXG4gICAgICAgICAgICAgICAgRUxFTUVOVFMuJGJvZHkuc2Nyb2xsRGlzYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgRUxFTUVOVFMuJHBhZ2UuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxUbyxcclxuICAgICAgICAgICAgICAgIH0sIDEyMDAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBFTEVNRU5UUy4kYm9keS5zY3JvbGxEaXNhYmxlKCd1bmRvJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIEVMRU1FTlRTLiRwYWdlLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHNjcm9sbFRvcDogdGFyZ2V0UG9zaXRpb25Ub3AgLSBFTEVNRU5UUy4kaGVhZGVyLm91dGVySGVpZ2h0KHRydWUpLFxyXG4gICAgICAgICAgICAgICAgLy8gfSwgc2Nyb2xsVGltZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIEZVTkNUSU9OUy5vblVzZXJTY3JvbGwoKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBhY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgICAgICAgICAgREVCVUcuY29uc29sZS5hZGQoYEVycm9yIHNjcm9sbFRvOiBlbGVtZW50IDxzdHJvbmc+JHt0YXJnZXRJRH08L3N0cm9uZz4gZG9lc24ndCBleGlzdGAsICdlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgIGVsc2UgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBERUJVRy5jb25zb2xlLmFkZChgV2FybmluZyBzY3JvbGxUbzogc2Nyb2xsIGFuaW1hdGlvbiB3b3VsZG4ndCBmaW5pc2hgLCAnd2FybmluZycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2Nyb2xsIHRvIGVsZW1lbnRcclxuICAgICAqIEBwYXJhbSB7alF1ZXJ5IG9iamVjdDsgU3RyaW5nIElEfSBlbGVtZW50IFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWUgXHJcbiAgICAgKiBAcmV0dXJuIHtCb29sfVxyXG4gICAgICovXHJcbiAgICB2YXJcclxuICAgIG9uID0gKGVsZW1lbnQsIHRpbWUgPSBmYWxzZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzY3JvbGwoZmFsc2UsIGVsZW1lbnQsIHRpbWUpO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWZyZXNoIGJpbmRlZCAkZWxlbWVudHNcclxuICAgICAqL1xyXG4gICAgdmFyXHJcbiAgICByZWZyZXNoID0gKCkgPT4gXHJcbiAgICB7XHJcblxyXG4gICAgICAgIGlmICgkZWxlbWVudHMpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgJGVsZW1lbnRzLm9mZihcImNsaWNrXCIsIHNjcm9sbCk7XHJcblxyXG4gICAgICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICAgICAgREVCVUcuY29uc29sZS5hZGQoXCJSZWZyZXNoOiBzY3JvbGxUbyB7bGVuZ3RoOiBcIiArICRlbGVtZW50cy5sZW5ndGggKyBcIjt9XCIpO1xyXG4gICAgICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICAkZWxlbWVudHMgPSAkKFwiW2RhdGEtc2Nyb2xsXVwiKTtcclxuICAgICAgICAkZWxlbWVudHMub24oXCJjbGlja1wiLCBzY3JvbGwpO1xyXG5cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICBERUJVRy5jb25zb2xlLmFkZChcIkRhdGE6IHNjcm9sbFRvIHtsZW5ndGg6IFwiICsgJGVsZW1lbnRzLmxlbmd0aCArIFwiO31cIik7XHJcbiAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG4gICAgfTtcclxuXHJcbiAgICBzdGFydCgpO1xyXG4gIFxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gKGRhdGEpID0+IHtcclxuXHJcbiAgdmFyXHJcbiAgJGl0ZW1zID0gbnVsbDtcclxuXHJcbiAgdmFyXHJcbiAgVFJBTlNJVElPTkhFSUdIVCwgUkVTSVpFO1xyXG5cclxuICB2YXJcclxuICBzdGFydCA9ICgpID0+IHtcclxuXHJcbiAgICBUUkFOU0lUSU9OSEVJR0hUID0gZGF0YS5UUkFOU0lUSU9OSEVJR0hUO1xyXG4gICAgUkVTSVpFID0gZGF0YS5SRVNJWkU7XHJcblxyXG4gICAgLy8gUkVTSVpFLmFkZChcInNob3dNb3JlXCIsICgpID0+IHtcclxuICAgIC8vICAgcmVmcmVzaCgpO1xyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgcmVmcmVzaCgpO1xyXG4gIH07XHJcblxyXG4gIHZhclxyXG4gIHJlZnJlc2ggPSAoKSA9PiB7XHJcbiAgICBpZiAoJGl0ZW1zKSB7XHJcbiAgICAgICRpdGVtcy5vZmYoXCJjbGlja1wiLCBjbGljayk7XHJcbiAgICB9XHJcbiAgICAkaXRlbXMgPSAkKGBbZGF0YT0nc2hvd01vcmUnXWApO1xyXG5cclxuICAgIGlmICgkaXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICRpdGVtcy5lYWNoKCAoaW5kZXgsIGVsZW1lbnQpID0+IHtcclxuICAgICAgICBjaGVja1Zpc2libGVTcGFjZShlbGVtZW50KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gIH07XHJcblxyXG4gIHZhclxyXG4gIGNoZWNrVmlzaWJsZVNwYWNlID0gKGVsZW1lbnQpID0+IHtcclxuICAgIHZhclxyXG4gICAgJHRoaXMgPSAkKGVsZW1lbnQpLFxyXG4gICAgZGF0YVRhcmdldCA9ICR0aGlzLmF0dHIoJ2RhdGEtdGFyZ2V0JyksXHJcbiAgICAkd3JhcCwgJGNvbnRhaW5lcjtcclxuXHJcbiAgICBzd2l0Y2ggKGRhdGFUYXJnZXQpIHtcclxuICAgICAgY2FzZSBcInByZXZFbGVtZW50XCI6XHJcbiAgICAgICAgJHdyYXAgPSAkdGhpcy5wcmV2KCk7XHJcbiAgICAgICAgJGNvbnRhaW5lciA9ICR3cmFwLmZpbmQoXCIuc2hvdy1tb3JlX19jb250ZW50XCIpLmZpcnN0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJuZXh0RWxlbWVudFwiOlxyXG4gICAgICAgICR3cmFwID0gJHRoaXMubmV4dCgpO1xyXG4gICAgICAgICRjb250YWluZXIgPSAkd3JhcC5maW5kKFwiLnNob3ctbW9yZV9fY29udGVudFwiKS5maXJzdCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgbGV0IFxyXG4gICAgICAgIHdyYXBJZCA9ICR0aGlzLmF0dHIoYGRhdGEtdGFyZ2V0YCk7XHJcbiAgICAgICAgJHdyYXAgPSAkKGAjJHt3cmFwSWR9YCk7XHJcbiAgICAgICAgJGNvbnRhaW5lciA9ICR3cmFwLmZpbmQoXCIuc2hvdy1tb3JlX19jb250ZW50XCIpLmZpcnN0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlmICgkd3JhcC5vdXRlckhlaWdodCggdHJ1ZSApIDwgJGNvbnRhaW5lci5vdXRlckhlaWdodCggdHJ1ZSApKSB7XHJcbiAgICAgICR0aGlzLnJlbW92ZUNsYXNzKFwiaGlkZVwiKTtcclxuICAgICAgJHRoaXMub24oXCJjbGlja1wiLCB7JHRoaXN9LCBjbGljayk7ICAgICAgICAgIFxyXG4gICAgfSBcclxuICAgIGVsc2Uge1xyXG4gICAgICAkdGhpcy5hZGRDbGFzcyhcImhpZGVcIik7XHJcbiAgICB9XHJcblxyXG4gIH07XHJcblxyXG4gIHZhclxyXG4gIGNsaWNrID0gKHBhcmFtRGF0YSkgPT4ge1xyXG4gICAgdmFyIFxyXG4gICAgcGFyYW0gPSBwYXJhbURhdGEuZGF0YSxcclxuICAgICR0aGlzID0gcGFyYW0uJHRoaXMsXHJcbiAgICBkYXRhVGFyZ2V0ID0gJHRoaXMuYXR0cihgZGF0YS10YXJnZXRgKSxcclxuICAgICRjb250YWluZXIsXHJcbiAgICAkd3JhcDtcclxuXHJcbiAgICBzd2l0Y2ggKGRhdGFUYXJnZXQpIHtcclxuICAgICAgY2FzZSBcInByZXZFbGVtZW50XCI6XHJcbiAgICAgICAgJHdyYXAgPSAkdGhpcy5wcmV2KCk7XHJcbiAgICAgICAgJGNvbnRhaW5lciA9ICR3cmFwLmZpbmQoXCIuc2hvdy1tb3JlX19jb250ZW50XCIpLmZpcnN0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJuZXh0RWxlbWVudFwiOlxyXG4gICAgICAgICR3cmFwID0gJHRoaXMubmV4dCgpO1xyXG4gICAgICAgICRjb250YWluZXIgPSAkd3JhcC5maW5kKFwiLnNob3ctbW9yZV9fY29udGVudFwiKS5maXJzdCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgJGNvbnRhaW5lciA9ICR0aGlzO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgkdGhpcy5oYXNDbGFzcyhcImpzX2FjdGl2ZVwiKSkge1xyXG4gICAgICBvZmYoJHRoaXMsICR3cmFwLCAkY29udGFpbmVyKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coJGNvbnRhaW5lcik7XHJcbiAgICBvbigkdGhpcywgJHdyYXAsICRjb250YWluZXIpO1xyXG4gIH07XHJcblxyXG4gIHZhclxyXG4gIG9uID0gKCRsaW5rLCAkaXRlbSwgJGNvbnRhaW5lcikgPT4ge1xyXG5cclxuICAgICRsaW5rLmFkZENsYXNzKFwianNfYWN0aXZlXCIpO1xyXG5cclxuICAgIFRSQU5TSVRJT05IRUlHSFQub24oe1xyXG4gICAgICAkdGhpczogJGl0ZW0sIFxyXG4gICAgICAkY2xpY2tlZDogJGxpbmssXHJcbiAgICAgICRjb250YWluZXI6ICRjb250YWluZXIsICAgICAgICAgICAgXHJcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XHJcbiAgICAgICAgJGl0ZW0uYWRkQ2xhc3MoXCJzaG93LW1vcmUtLWFjdGl2ZVwiKTtcclxuICAgICAgfSwgIFxyXG4gICAgfSk7XHJcbiAgfTtcclxuICBcclxuICB2YXJcclxuICBvZmYgPSAoJGxpbmssICRpdGVtLCAkY29udGFpbmVyKSA9PiB7XHJcblxyXG4gICAgJGxpbmsucmVtb3ZlQ2xhc3MoXCJqc19hY3RpdmVcIik7XHJcblxyXG4gICAgVFJBTlNJVElPTkhFSUdIVC5vZmYoe1xyXG4gICAgICAkdGhpczogJGl0ZW0sIFxyXG4gICAgICAkY29udGFpbmVyOiAkY29udGFpbmVyLCAgICBcclxuICAgICAgY2FsbGJhY2tCZWZvcmU6ICgpID0+IHtcclxuICAgICAgICAkaXRlbS5yZW1vdmVDbGFzcyhcInNob3ctbW9yZS0tYWN0aXZlXCIpO1xyXG4gICAgICB9IFxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgc3RhcnQoKTtcclxuXHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSAoZGF0YSkgPT4ge1xyXG5cclxuICB2YXIgIFxyXG4gICRFTEVNRU5UUyA9IHtcclxuICAgIGxpbmtzOiBbXSxcclxuICB9LFxyXG4gIERBVEEgPSBudWxsLFxyXG4gIFNFVFRJTkdTID0ge1xyXG4gICAgbWF0Y2g6IHtcclxuICAgICAgc3dpdGNoOiBcInRhYi1zd2l0Y2hcIixcclxuICAgICAgZmllbGQ6IFwidGFiLWZpZWxkXCIsXHJcbiAgICAgIGNvbnRlbnQ6IFwidGFiLWNvbnRlbnRcIixcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgdmFyXHJcbiAgc3RhcnQgPSAoKSA9PiB7XHJcbiAgICBcclxuICAgICQuZXh0ZW5kKCBTRVRUSU5HUywgZGF0YS5TRVRUSU5HUyApO1xyXG5cclxuICAgIHJlZnJlc2goKTtcclxuICB9O1xyXG5cclxuICB2YXJcclxuICByZWZyZXNoID0gKCkgPT4ge1xyXG5cclxuICAgIGlmICgkRUxFTUVOVFMubGlua3MubGVuZ3RoKSB7XHJcbiAgICAgICRFTEVNRU5UUy5saW5rcy5vZmYoXCJjbGlja1wiLCBjaGFuZ2VUYWIpO1xyXG4gICAgfVxyXG5cclxuICAgICRFTEVNRU5UUy5maWVsZHMgPSAkKGAuJHtTRVRUSU5HUy5tYXRjaC5maWVsZH1gKTtcclxuXHJcbiAgICBmaWxsRGF0YWJhc2UoKTtcclxuXHJcbiAgICBpZiAoJEVMRU1FTlRTLmxpbmtzLmxlbmd0aCkge1xyXG4gICAgICAkRUxFTUVOVFMubGlua3Mub24oXCJjbGlja1wiLCBjaGFuZ2VUYWIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgREVCVUcuY29uc29sZS5hZGQoYHRhYnMgOiByZWZyZXNoIHtsZW5ndGggJHskRUxFTUVOVFMuZmllbGRzLmxlbmd0aH19YCk7XHJcbiAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gIH07XHJcblxyXG4gIHZhclxyXG4gIGZpbGxEYXRhYmFzZSA9ICgpID0+IHtcclxuXHJcbiAgICBEQVRBID0ge307XHJcblxyXG4gICAgJEVMRU1FTlRTLmZpZWxkcy5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xyXG4gICAgICBcclxuICAgICAgdmFyXHJcbiAgICAgICR0aGlzID0gJCh0aGlzKSxcclxuICAgICAgZmllbGQgPSAkdGhpcy5hdHRyKFwiZGF0YS10YWJzLWZpZWxkXCIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgREFUQVtmaWVsZF0gPSB7XHJcbiAgICAgICAgc3dpdGNoQWN0aXZlOiBudWxsLFxyXG4gICAgICAgIGNvbnRlbnRBY3RpdmU6IG51bGwsXHJcbiAgICAgIH07XHJcbiAgICAgIFxyXG4gICAgfSk7XHJcblxyXG4gIH07XHJcblxyXG4gIHZhclxyXG4gIGNoYW5nZVRhYiA9ICgpID0+IHtcclxuXHJcblxyXG5cclxuICB9O1xyXG5cclxuICBcclxuICAgIC8vIC8vIEZ1bmN0aW9uIGZvciBjbGlja2VkIGVsZW1lbnRzXHJcbiAgICAvLyBvbkNsaWNrOiBmdW5jdGlvbigpIHtcclxuICAgIC8vICAgdmFyIHNlbGYgPSBNYWluLnRhYnM7XHJcbiAgICAgIFxyXG4gICAgLy8gICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgLy8gICAgICAgZGF0YVRhYnMgPSAkdGhpcy5hdHRyKCdkYXRhLXRhYnMnKSxcclxuICAgIC8vICAgICAgIGRhdGFUYWJzU3RlcCA9ICR0aGlzLmF0dHIoJ2RhdGEtdGFicy1zdGVwJyk7XHJcbiAgXHJcbiAgICAvLyAgIGlmIChzZWxmLmRhdGFbZGF0YVRhYnNdLmFjdGl2ZSAhPT0gZGF0YVRhYnNTdGVwKSB7XHJcbiAgXHJcbiAgICAvLyAgICAgdmFyIGRhdGEgPSBzZWxmLmRhdGFbZGF0YVRhYnNdLFxyXG4gICAgLy8gICAgICAgICBjb250ZW50SGVpZ2h0ID0gZGF0YS4kYWN0aXZlQ29udGVudC5vdXRlckhlaWdodCggdHJ1ZSApO1xyXG4gIFxyXG4gICAgLy8gICAgIGlmICghZGF0YS5ibG9jaykge1xyXG4gICAgLy8gICAgICAgZGF0YS5ibG9jayA9IHRydWU7XHJcbiAgXHJcbiAgICAvLyAgICAgICB2YXIgJGNsaWNrZWRUYWIgPSBkYXRhLiRpdGVtcy5lcShkYXRhVGFic1N0ZXApO1xyXG4gICAgXHJcbiAgICAvLyAgICAgICAkY2xpY2tlZFRhYi5hZGRDbGFzcyhcImpzX3RhYnMtLWFjdGl2ZVwiKTtcclxuICBcclxuICAgIC8vICAgICAgIGRhdGEuJGFjdGl2ZUNvbnRlbnQuY3NzKHtoZWlnaHQ6IGNvbnRlbnRIZWlnaHR9KTtcclxuICAgIC8vICAgICAgIGRhdGEuJGNvbnRlbnQuY3NzKHtoZWlnaHQ6IGNvbnRlbnRIZWlnaHR9KTtcclxuICAgIC8vICAgICAgIGRhdGEuJGFjdGl2ZUNvbnRlbnQucmVtb3ZlQ2xhc3MoXCJqc190YWJzLS1hY3RpdmVcIik7XHJcbiAgICBcclxuICAgIC8vICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgXHJcbiAgICAvLyAgICAgICAgIGRhdGEuJGFjdGl2ZUNvbnRlbnQuY3NzKCdoZWlnaHQnLCAnJyk7XHJcbiAgICAvLyAgICAgICAgIGRhdGEuJGFjdGl2ZVRhYi5yZW1vdmVDbGFzcyhcImpzX3RhYnMtLWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgXHJcbiAgICAvLyAgICAgICAgICAgZGF0YS4kYWN0aXZlQ29udGVudCA9IGRhdGEuJGNvbnRlbnRJdGVtcy5lcShkYXRhVGFic1N0ZXApO1xyXG4gICAgLy8gICAgICAgICAgIGRhdGEuJGFjdGl2ZVRhYiA9ICRjbGlja2VkVGFiO1xyXG4gICAgXHJcbiAgICAvLyAgICAgICAgICAgY29udGVudEhlaWdodCA9IGRhdGEuJGFjdGl2ZUNvbnRlbnQuY2hpbGRyZW4oKS5vdXRlckhlaWdodCggdHJ1ZSApO1xyXG4gICAgLy8gICAgICAgICAgIGRhdGEuJGNvbnRlbnQuY3NzKHtoZWlnaHQ6IGNvbnRlbnRIZWlnaHR9KTtcclxuICAgIC8vICAgICAgICAgICBkYXRhLiRhY3RpdmVDb250ZW50LmNzcyh7aGVpZ2h0OiBjb250ZW50SGVpZ2h0fSk7XHJcbiAgICBcclxuICAgIC8vICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgIFxyXG4gICAgLy8gICAgICAgICAgICAgZGF0YS4kYWN0aXZlQ29udGVudC5hZGRDbGFzcyhcImpzX3RhYnMtLWFjdGl2ZVwiKTtcclxuICAgIC8vICAgICAgICAgICAgIGRhdGEuJGFjdGl2ZUNvbnRlbnQuY3NzKCdoZWlnaHQnLCAnJyk7XHJcbiAgICAvLyAgICAgICAgICAgICBkYXRhLiRjb250ZW50LmNzcygnaGVpZ2h0JywgJycpO1xyXG4gICAgXHJcbiAgICAvLyAgICAgICAgICAgICBkYXRhLmJsb2NrID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAvLyAgICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgXHJcbiAgICAvLyAgICAgICAgIH0sIDIwMCk7XHJcbiAgICBcclxuICAgIC8vICAgICAgIH0sIDEpO1xyXG4gIFxyXG4gICAgLy8gICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAvLyAgICAgICBsZXQgbmFtZSA9ICdUYWJzICcgKyBkYXRhVGFicyArICcgYWN0aXZlJztcclxuICAgIC8vICAgICAgIGxldCBkZWJ1Z09iamVjdCA9IHt9O1xyXG4gICAgLy8gICAgICAgZGVidWdPYmplY3RbbmFtZV0gPSBkYXRhVGFic1N0ZXA7XHJcbiAgICAvLyAgICAgICBNYWluLmRlYnVnVmFyaWFibGVzLmFkZChkZWJ1Z09iamVjdCk7XHJcbiAgICAvLyAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgXHJcbiAgICAvLyAgICAgfSBcclxuICAgIC8vICAgICBkYXRhLmFjdGl2ZSA9IGRhdGFUYWJzU3RlcDtcclxuICAgIC8vICAgfVxyXG4gIFxyXG4gICAgLy8gICByZXR1cm4gZmFsc2U7XHJcbiAgICAvLyB9LFxyXG4gIFxyXG4gICAgLy8gYWRkKGRhdGFUYWJzLCBzZXR0aW5ncyA9IG51bGwpIHtcclxuXHJcbiAgICAvLyAgIHZhciBzZWxmID0gTWFpbi50YWJzO1xyXG4gIFxyXG4gICAgLy8gICB2YXIgJGl0ZW1zID0gJCgnW2RhdGEtdGFicz1cIicrIGRhdGFUYWJzICsnXCJdJyk7XHJcbiAgXHJcbiAgICAvLyAgIGlmICgkaXRlbXMubGVuZ3RoKSB7XHJcbiAgXHJcbiAgICAvLyAgICAgdmFyICRjb250ZW50ID0gJCgnW2RhdGEtdGFicy1jb250ZW50PVwiJysgZGF0YVRhYnMgKydcIl0nKSxcclxuICAgIC8vICAgICAgICAgb3V0cHV0ID0ge307XHJcbiAgXHJcbiAgICAvLyAgICAgb3V0cHV0ID0ge307XHJcbiAgICAvLyAgICAgb3V0cHV0LiRpdGVtcyA9ICRpdGVtcztcclxuICAgIC8vICAgICBvdXRwdXQuJGNvbnRlbnQgPSAkY29udGVudDtcclxuICAgIC8vICAgICBvdXRwdXQuJGNvbnRlbnRJdGVtcyA9ICRjb250ZW50LmZpbmQoXCJbZGF0YS10YWJzLWNvbnRlbnQtc3RlcF1cIik7XHJcbiAgICAvLyAgICAgb3V0cHV0LmJsb2NrID0gZmFsc2U7XHJcbiAgXHJcbiAgICAvLyAgICAgdmFyICRhY3RpdmVDb250ZW50ID0gJGNvbnRlbnQuZmluZChcIi5qc190YWJzLS1hY3RpdmVcIik7XHJcbiAgICAgICAgXHJcbiAgICAvLyAgICAgaWYgKCRhY3RpdmVDb250ZW50Lmxlbmd0aCkge1xyXG4gICAgLy8gICAgICAgb3V0cHV0LiRhY3RpdmVDb250ZW50ID0gJGFjdGl2ZUNvbnRlbnQ7XHJcbiAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgIG91dHB1dC4kYWN0aXZlQ29udGVudCA9IGZhbHNlO1xyXG4gICAgLy8gICAgIH1cclxuICBcclxuICAgIC8vICAgICB2YXIgJGFjdGl2ZVRhYiA9ICRpdGVtcy5wYXJlbnQoKS5maW5kKFwiLmpzX3RhYnMtLWFjdGl2ZVwiKTtcclxuICAgICAgICBcclxuICAgIC8vICAgICBpZiAoJGFjdGl2ZVRhYi5sZW5ndGgpIHtcclxuICAgIC8vICAgICAgIG91dHB1dC4kYWN0aXZlVGFiID0gJGFjdGl2ZVRhYjtcclxuICAgIC8vICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgb3V0cHV0LiRhY3RpdmVUYWIgPSBmYWxzZTtcclxuICAgIC8vICAgICB9XHJcbiAgXHJcbiAgICAvLyAgICAgc2VsZi5kYXRhW2RhdGFUYWJzXSA9IG91dHB1dDtcclxuICBcclxuICAgIC8vICAgICAkaXRlbXMub24oXCJjbGlja1wiLCBzZWxmLm9uQ2xpY2spO1xyXG4gIFxyXG4gICAgLy8gICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgLy8gICAgIGlmICgodHlwZW9mIG91dHB1dC4kYWN0aXZlVGFiID09PSAnb2JqZWN0JykgKyAodHlwZW9mIG91dHB1dC4kYWN0aXZlQ29udGVudCA9PT0gJ29iamVjdCcpID09PSAyKSB7XHJcbiAgICAvLyAgICAgICBsZXQgbmFtZSA9IFwiVGFicyBcIiArIGRhdGFUYWJzICsgXCIgYWN0aXZlXCI7XHJcbiAgICAvLyAgICAgICBsZXQgZGVidWdPYmplY3QgPSB7fTtcclxuICAgIC8vICAgICAgIGRlYnVnT2JqZWN0W25hbWVdID0gb3V0cHV0LiRhY3RpdmVUYWIuYXR0cihcImRhdGEtdGFicy1zdGVwXCIpO1xyXG4gICAgLy8gICAgICAgTWFpbi5kZWJ1Z1ZhcmlhYmxlcy5hZGQoZGVidWdPYmplY3QpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICBNYWluLmRlYnVnQ29uc29sZS5hZGQoXCJBZGQgdGFicyAnXCIgKyBkYXRhVGFicyArIFwiJyB7bGVuZ3RoOiBcIisgJGl0ZW1zLmxlbmd0aCArXCI7fVwiKTtcclxuICAgIC8vICAgICBpZiAoJGl0ZW1zLmxlbmd0aCAhPT0gb3V0cHV0LiRjb250ZW50SXRlbXMubGVuZ3RoKSB7XHJcbiAgICAvLyAgICAgICBNYWluLmRlYnVnQ29uc29sZS5hZGQoXCJUYWJzICdcIiArIGRhdGFUYWJzICsgXCInIC0gbGVuZ3RoIGRvIG5vdCBtYXRjaCB7dGFiczogXCIgKyAkaXRlbXMubGVuZ3RoICsgXCI7IGNvbnRlbnRzOiBcIiArIG91dHB1dC4kY29udGVudEl0ZW1zLmxlbmd0aCArIFwiO31cIiwgXCJ3YXJuaW5nXCIpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICBpZiAoKHR5cGVvZiBvdXRwdXQuJGFjdGl2ZVRhYiA9PT0gJ29iamVjdCcpICsgKHR5cGVvZiBvdXRwdXQuJGFjdGl2ZUNvbnRlbnQgPT09ICdvYmplY3QnKSA9PT0gMSkge1xyXG4gICAgLy8gICAgICAgTWFpbi5kZWJ1Z0NvbnNvbGUuYWRkKFwiVGFicyAnXCIgKyBkYXRhVGFicyArIFwiJyAtIGFjdGl2ZSBjbGFzcyBkbyBub3QgbWF0Y2gge2FjdGl2ZVRhYjogXCIgKyBvdXRwdXQuJGFjdGl2ZVRhYiArIFwiOyAkYWN0aXZlQ29udGVudDogXCIgKyBvdXRwdXQuJGFjdGl2ZUNvbnRlbnQgKyBcIjt9XCIsIFwid2FybmluZ1wiKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG4gIFxyXG4gICAgLy8gICB9XHJcbiAgXHJcbiAgICAvLyB9XHJcblxyXG4gICAgc3RhcnQoKTtcclxuXHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSAoZGF0YSkgPT4ge1xyXG5cclxuICAgIHZhclxyXG4gICAgREFUQSA9IFtdLCAgICAgIC8qIE9wZW5lZCAodHJhbnNpdGlvbmVkIG9uKSBqUXVlcnkgZWxlbWVudHMgKi9cclxuICAgIEJST1dTRVI7ICAgICAgICAvKiBicm93c2VyLmpzIGRhdGEgKi9cclxuXHJcbiAgICB2YXJcclxuICAgIHN0YXJ0ID0gKCkgPT4ge1xyXG4gICAgICAgIEJST1dTRVIgPSBkYXRhLkJST1dTRVI7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG9nZ2xlIHRyYW5zaXRpb24gaGVpZ2h0XHJcbiAgICAgKi9cclxuICAgIHZhclxyXG4gICAgdG9nZ2xlID0gKG9wdGlvbnMpID0+IHtcclxuXHJcbiAgICAgICAgbGV0XHJcbiAgICAgICAgYWN0aXZlID0gbnVsbDtcclxuXHJcbiAgICAgICAgJC5lYWNoKERBVEEsIGZ1bmN0aW9uIChpbmRleEluQXJyYXksIHZhbHVlT2ZFbGVtZW50KSB7IFxyXG4gICAgICAgICAgICAgaWYgKCBvcHRpb25zLiRjbGlja2VkLmlzKHZhbHVlT2ZFbGVtZW50KSApIHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZSA9IHZhbHVlT2ZFbGVtZW50OyAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgICAgICAgICBcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICAgICAgICBEQVRBLnNwbGljZSggb3B0aW9ucy4kY2xpY2tlZCwgMSApOyAgICAgXHJcbiAgICAgICAgICAgIG9mZihvcHRpb25zKTsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBEQVRBLnB1c2goIG9wdGlvbnMuJGNsaWNrZWQgKTsgICBcclxuICAgICAgICAgICAgb24ob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgdHJhbnNpdGlvblxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgXHJcbiAgICAgKiAkdGhpcyB7alF1ZXJ5IG9iamVjdH0gXHJcbiAgICAgKiB0aW1lIHtOdW1iZXJ9XHJcbiAgICAgKiBjYWxsYmFjayB7RnVuY3Rpb259IFxyXG4gICAgICovXHJcbiAgICB2YXJcclxuICAgIG9uID0gKHBhcmFtKSA9PiB7XHJcbiAgICAgICAgdmFyXHJcbiAgICAgICAgJGNoaWxkLCBoZWlnaHQ7XHJcblxyXG4gICAgICAgIGlmIChwYXJhbS4kY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIGhlaWdodCA9IHBhcmFtLiRjb250YWluZXIuY2hpbGRyZW4oKS5vdXRlckhlaWdodCh0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkY2hpbGQgPSBwYXJhbS4kdGhpcy5jaGlsZHJlbigpO1xyXG4gICAgICAgICAgICBoZWlnaHQgPSAkY2hpbGQub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICBERUJVRy5jb25zb2xlLmFkZChgQ2xpY2tlZCBcIlNob3cgbW9yZVwiIG9uIHskY29udGFpbmVyICR7aGVpZ2h0fX1gLCBcImNsaWNrXCIpO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuXHJcbiAgICAgICAgcGFyYW0uJGNsaWNrZWRcclxuICAgICAgICAgICAgLmFkZENsYXNzKFwianNfZXhwYW5kX19saW5rLS1hY3RpdmVcIik7XHJcblxyXG4gICAgICAgIHBhcmFtLiRjb250YWluZXJcclxuICAgICAgICAgICAgLmFkZENsYXNzKFwianNfdHJhbnNpdGlvbkhlaWdodFwiKVxyXG4gICAgICAgICAgICAuY3NzKCdoZWlnaHQnLCBoZWlnaHQpXHJcbiAgICAgICAgICAgIC5vbmUoQlJPV1NFUi50cmFuc2l0aW9uRXZlbnQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcGFyYW0uJGNvbnRhaW5lclxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcImpzX3RyYW5zaXRpb25IZWlnaHRcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoXCJqc19leHBhbmRfX2NvbnRhaW5lci0tYWN0aXZlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcygnaGVpZ2h0JywgJycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbS5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIChwYXJhbS5jYWxsYmFjaygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyXHJcbiAgICBvZmYgPSAocGFyYW0pID0+IHtcclxuXHJcbiAgICAgICAgdmFyXHJcbiAgICAgICAgaGVpZ2h0ID0gcGFyYW0uJGNvbnRhaW5lci5vdXRlckhlaWdodCh0cnVlKTtcclxuICAgICAgICBcclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICBERUJVRy5jb25zb2xlLmFkZChgQ2xpY2tlZCBcIlNob3cgbW9yZVwiIG9mZmAsIFwiY2xpY2tcIik7XHJcbiAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgICAgICBwYXJhbS4kY2xpY2tlZFxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJqc19leHBhbmRfX2xpbmstLWFjdGl2ZVwiKTtcclxuICAgICAgIFxyXG4gICAgICAgIHBhcmFtLiRjb250YWluZXJcclxuICAgICAgICAgICAgLmNzcygnaGVpZ2h0JywgaGVpZ2h0KVxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJqc19leHBhbmRfX2NvbnRhaW5lci0tYWN0aXZlXCIpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcyhcImpzX3RyYW5zaXRpb25IZWlnaHRcIilcclxuICAgICAgICAgICAgLmNzcygnaGVpZ2h0JywgJycpXHJcbiAgICAgICAgICAgIC5vbmUoQlJPV1NFUi50cmFuc2l0aW9uRXZlbnQsICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBwYXJhbS4kY29udGFpbmVyXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwianNfZXhwYW5kX19jb250YWluZXItLWNsb3NlIGpzX3RyYW5zaXRpb25IZWlnaHRcIilcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW0uY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAocGFyYW0uY2FsbGJhY2soKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgc3RhcnQoZGF0YSk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0b2dnbGU6IHRvZ2dsZSxcclxuICAgICAgICBvbjogb24sXHJcbiAgICAgICAgb2ZmOiBvZmYsXHJcbiAgICB9O1xyXG5cclxufTtcclxuIl19
