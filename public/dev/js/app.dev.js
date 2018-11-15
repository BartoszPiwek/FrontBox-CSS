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

        /* Append loading template */
        if ( !DATA.appendTemplate && TEMPLATE.loading ) {
            ELEMENTS.$body.append( `<div class="js_resizeLoading"><div class="js_resizeLoading__content">${TEMPLATE.loading}</div></div>` );
            DATA.appendTemplate = true;
        }
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
    };

    /* Start module */
    const
    start = () => {

        /* Prepare arguments data */
        BREAKPOINTS = argument.BREAKPOINTS;
        ELEMENTS = argument.ELEMENTS;
        RESIZE = argument.RESIZE;

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
        if (lastWidth) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL2Zyb250Ym94L2JpbmQvcmVzaXplLmpzIiwic3JjL2pzL2Zyb250Ym94L2RhdGEvYnJvd3Nlci5qcyIsInNyYy9qcy9mcm9udGJveC9kYXRhL2RldmljZS5qcyIsInNyYy9qcy9mcm9udGJveC9kYXRhL3Njcm9sbC5qcyIsInNyYy9qcy9mcm9udGJveC9kZWJ1Zy9jb25zb2xlLmpzIiwic3JjL2pzL2Zyb250Ym94L2RlYnVnL3ZhcmlhYmxlcy5qcyIsInNyYy9qcy9mcm9udGJveC9mdW5jdGlvbnMuanMiLCJzcmMvanMvZnJvbnRib3gvanF1ZXJ5L3Njcm9sbEJsb2NrLmpzIiwic3JjL2pzL2Zyb250Ym94L25hdmJhci9idXJnZXJNZW51LmpzIiwic3JjL2pzL2Zyb250Ym94L25hdmJhci9zdGlja3kuanMiLCJzcmMvanMvZnJvbnRib3gvc2Nyb2xsVG8uanMiLCJzcmMvanMvZnJvbnRib3gvc2hvd01vcmUuanMiLCJzcmMvanMvZnJvbnRib3gvdGFicy5qcyIsInNyYy9qcy9mcm9udGJveC90cmFuc2l0aW9uSGVpZ2h0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDM1FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDck1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKipcclxuICogTGlic1xyXG4gKi9cclxuLy8gZ2xvYmFsLiQgPSByZXF1aXJlKCdqcXVlcnknKTtcclxuLy8gZ2xvYmFsLmpRdWVyeSA9ICQ7XHJcbi8vIGdsb2JhbC5Db29raWVzID0gcmVxdWlyZSgnanMtY29va2llJyk7XHJcbi8vIHJlcXVpcmUoJ3NsaWNrLWNhcm91c2VsJyk7XHJcbi8vIHJlcXVpcmUoJ3NlbGVjdDInKSgpO1xyXG4vLyByZXF1aXJlKCcuL2Zyb250Ym94L2xpYnMvZ2V0U3R5bGUnKTtcclxuLy8gdmFyIFxyXG4vLyBTaGFyZXIgPSByZXF1aXJlKCdzbGljay1jYXJvdXNlbCcpOyAvLyBodHRwOi8vZWxsaXNvbmxlYW8uZ2l0aHViLmlvL3NoYXJlci5qcy9cclxuXHJcbi8qKlxyXG4gKiBqUXVlcnkgcGx1Z2luc1xyXG4gKi9cclxucmVxdWlyZSgnLi9mcm9udGJveC9qcXVlcnkvc2Nyb2xsQmxvY2snKSgpO1xyXG5cclxuKGZ1bmN0aW9uKCQsIF8pIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEVsZW1lbnRzXHJcbiAgICAgKi9cclxuICAgIHZhciBcclxuICAgIEVMRU1FTlRTID0ge1xyXG4gICAgICAgICRib2R5OiAkKFwiYm9keVwiKSxcclxuICAgICAgICAkaGVhZGVyOiAkKFwiI2hlYWRlclwiKSxcclxuICAgICAgICAkaGVhZGVyUGxhY2Vob2xkZXI6ICQoXCIjaGVhZGVyLXBsYWNlaG9sZGVyXCIpLFxyXG4gICAgICAgICR3aW5kb3c6ICQod2luZG93KSxcclxuICAgICAgICAkb3ZlcmxheTogJChcIiNwYWdlLW92ZXJsYXlcIiksXHJcbiAgICAgICAgJGh0bWw6ICQoJ2h0bWwnKSxcclxuICAgICAgICAkcGFnZTogJCgnaHRtbCwgYm9keScpLFxyXG4gICAgfTtcclxuXHJcbiAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgIC8qKlxyXG4gICAgICogRGVidWdcclxuICAgICAqL1xyXG4gICAgZ2xvYmFsLkRFQlVHID0ge307XHJcblxyXG4gICAgZ2xvYmFsLkRFQlVHLmNvbnNvbGUgPSByZXF1aXJlKCcuL2Zyb250Ym94L2RlYnVnL2NvbnNvbGUnKSh7XHJcbiAgICAgICAgLy8gb3BlbjogdHJ1ZSxcclxuICAgICAgICBFTEVNRU5UUzogRUxFTUVOVFMsXHJcbiAgICB9KTtcclxuICAgIGdsb2JhbC5ERUJVRy52YXJpYWJsZSA9IHJlcXVpcmUoJy4vZnJvbnRib3gvZGVidWcvdmFyaWFibGVzJykoe1xyXG4gICAgICAgIE9QVElPTlM6IHtcclxuICAgICAgICAgICAgb3BlbjogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIEVMRU1FTlRTOiBFTEVNRU5UUyxcclxuICAgIH0pO1xyXG4gICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJlcXVpcmVkXHJcbiAgICAgKi9cclxuXHJcbiAgICAvKiBDU1MgVmFyaWFibGVzICovXHJcbiAgICBjb25zdFxyXG4gICAgcm9vdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJzpyb290JyksXHJcbiAgICBDU1MgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShyb290KSxcclxuICAgIEJSRUFLUE9JTlRTID0ge1xyXG4gICAgICAgIGRlc2t0b3A6IE51bWJlcihDU1MuZ2V0UHJvcGVydHlWYWx1ZShcIi0tZGVza3RvcFwiKSksXHJcbiAgICAgICAgdGFibGV0OiBOdW1iZXIoQ1NTLmdldFByb3BlcnR5VmFsdWUoXCItLXRhYmxldFwiKSksXHJcbiAgICAgICAgZmFibGV0OiBOdW1iZXIoQ1NTLmdldFByb3BlcnR5VmFsdWUoXCItLWZhYmxldFwiKSksXHJcbiAgICAgICAgbW9iaWxlOiBOdW1iZXIoQ1NTLmdldFByb3BlcnR5VmFsdWUoXCItLW1vYmlsZVwiKSksXHJcbiAgICB9O1xyXG5cclxuICAgIC8qIFJlc2l6ZSAqL1xyXG4gICAgdmFyIFJFU0laRSA9IHJlcXVpcmUoJy4vZnJvbnRib3gvYmluZC9yZXNpemUnKSh7XHJcbiAgICAgICAgRUxFTUVOVFM6IEVMRU1FTlRTLFxyXG4gICAgICAgIHRlbXBsYXRlOiB7XHJcbiAgICAgICAgICAgIC8vIGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICBsb2FkaW5nOiBgPGRpdiBjbGFzcz1cImFuaW1hdGlvbi1kb251dC1zcGlubmVyXCI+PC9kaXY+YCxcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIERFVklDRSA9IHJlcXVpcmUoJy4vZnJvbnRib3gvZGF0YS9kZXZpY2UnKSh7XHJcbiAgICAgICAgRUxFTUVOVFM6IEVMRU1FTlRTLFxyXG4gICAgICAgIFJFU0laRTogUkVTSVpFLFxyXG4gICAgICAgIEJSRUFLUE9JTlRTOiBCUkVBS1BPSU5UUyxcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICB2YXIgRlVOQ1RJT05TID0gcmVxdWlyZSgnLi9mcm9udGJveC9mdW5jdGlvbnMnKTtcclxuXHJcbiAgICB2YXIgQlJPV1NFUiA9IHJlcXVpcmUoJy4vZnJvbnRib3gvZGF0YS9icm93c2VyJykoKTtcclxuICAgIHZhciBTQ1JPTEwgPSByZXF1aXJlKCcuL2Zyb250Ym94L2RhdGEvc2Nyb2xsJykoe1xyXG4gICAgICAgIERFVklDRTogREVWSUNFXHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBBbmltYXRpb25zXHJcbiAgICAgKi9cclxuICAgIHZhciB0cmFuc2l0aW9uSGVpZ2h0ID0gcmVxdWlyZSgnLi9mcm9udGJveC90cmFuc2l0aW9uSGVpZ2h0Jykoe1xyXG4gICAgICAgIEJST1dTRVIgOiBCUk9XU0VSLFxyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNtb290aCBzY3JvbGwgdG8gdGFyZ2V0XHJcbiAgICAgKiBcclxuICAgICAqIUBwYXJhbSB7RUxFTUVOVFN9IEVMRU1FTlRTXHJcbiAgICAgKiFAcGFyYW0ge1NDUk9MTH0gU0NST0xMXHJcbiAgICAgKiFAcGFyYW0ge0ZVTkNUSU9OU30gRlVOQ1RJT05TXHJcbiAgICAgKi9cclxuICAgIHZhciBzY3JvbGxUbyA9IHJlcXVpcmUoJy4vZnJvbnRib3gvc2Nyb2xsVG8nKSh7XHJcbiAgICAgICAgRUxFTUVOVFM6IEVMRU1FTlRTLFxyXG4gICAgICAgIFNDUk9MTDogU0NST0xMLFxyXG4gICAgICAgIEZVTkNUSU9OUzogRlVOQ1RJT05TLFxyXG4gICAgICAgIFNFVFRJTkdTOiB7XHJcbiAgICAgICAgICAgIC8vIGFjdGl2ZSBhdXRvbWF0aWMgc2Nyb2xsIHBhZ2UgdG8gZWxlbWVudCB2aWEgVVJMIGhhc2hcclxuICAgICAgICAgICAgYXV0b1Njcm9sbDogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vIGRpdmlkZSBkaXN0YW5jZSBieSB0aGlzIHZhbHVlIHRvIGNhbGN1bGF0ZSB0aW1lIHNjcm9sbFxyXG4gICAgICAgICAgICB0aW1lOiAyLFxyXG4gICAgICAgICAgICAvLyBtaW4gdGltZSBzY3JvbGxcclxuICAgICAgICAgICAgbWluVGltZTogNDAwLFxyXG4gICAgICAgICAgICAvLyBtYXggdGltZSBzY3JvbGxcclxuICAgICAgICAgICAgbWF4VGltZTogMTIwMCxcclxuICAgICAgICAgICAgLy8gcnVuIGF1dG9TY3JvbGwgd2hlbiBoYXNoIGluIFVSTCBpcyBiZWdpbiB3aXRoIHRoaXMgc3RyaW5nXHJcbiAgICAgICAgICAgIHByZWZpeEF1dG9TY3JvbGw6ICdzY3JvbGwtJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgZml4ZWQgZWxlbWVudCB3aGVuIHBhZ2UgaXMgc2Nyb2xsXHJcbiAgICAgKiBcclxuICAgICAqIUBwYXJhbSB7RUxFTUVOVFN9IEVMRU1FTlRTXHJcbiAgICAgKiFAcGFyYW0ge0VMRU1FTlRTfSBTQ1JPTExcclxuICAgICAqIEBwYXJhbSB7bnVsbCwgbnVtYmVyfSBTRVRUSU5HUy5vZmZzZXQgd2hlbiBjcmVhdGUgc3RpY2t5IGVsZW1lbnRcclxuICAgICAqIG51bGwgLSBhdXRvbWF0aWMgXHJcbiAgICAgKiBudW1iZXIgLSBob3cgbWFueSBwaXhlbCB1c2VyIG1heSBzY3JvbGwgdG8gdHJpZ2dlciBzdGlja3kgICBcclxuICAgICAqIEBwYXJhbSB7Ym9vbH0gU0VUVElOR1MucGxhY2Vob2xkZXIgYWRkIGhlaWdodCB0byBwbGFjZWhvbGRlciB3aGVuIHRyaWdnZXIgc3RpY2t5XHJcbiAgICAgKiBzZXQgdHJ1ZSBvbmx5IGlmIEBoZWFkZXItYWx3YXlzLXN0aWNreSA9IGZhbHNlXHJcbiAgICAgKiBAcGFyYW0ge2pRdWVyeSBPYmplY3R9ICRlbGVtZW50U3B5IHN0aWNreSBlbGVtZW50IFxyXG4gICAgICovXHJcbiAgICByZXF1aXJlKCcuL2Zyb250Ym94L25hdmJhci9zdGlja3knKSh7XHJcbiAgICAgICAgRUxFTUVOVFM6IEVMRU1FTlRTLFxyXG4gICAgICAgIFNDUk9MTDogU0NST0xMLFxyXG4gICAgICAgIFNFVFRJTkdTOiB7XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiB0cnVlLFxyXG4gICAgICAgICAgICBvZmZzZXQ6IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJGVsZW1lbnRTcHk6ICQoXCIjc3RpY2t5LWVsZW1lbnRcIiksXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEJ1cmdlciBtZW51XHJcbiAgICAgKiBcclxuICAgICAqICFAcGFyYW0ge0VMRU1FTlRTfSBFTEVNRU5UU1xyXG4gICAgICogIUBwYXJhbSB7RlVOQ1RJT05TfSBGVU5DVElPTlNcclxuICAgICAqIEBwYXJhbSB7Qm9vbH0gT1BUSU9OUy5kcm9wZG93blxyXG4gICAgICogbWVudSBpdGVtcyBjYW4gYmUgZXhwYW5kXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2wsIE51bWJlcn0gT1BUSU9OUy5kcm9wZG93blJlc3BvbnNpdmVcclxuICAgICAqIGJyZWFrcG9pbnQgdG8gdHJpZ2dlciBpdGVtIGV4cGFuZFxyXG4gICAgICovXHJcbiAgICByZXF1aXJlKCcuL2Zyb250Ym94L25hdmJhci9idXJnZXJNZW51Jykoe1xyXG4gICAgICAgIEVMRU1FTlRTOiBFTEVNRU5UUyxcclxuICAgICAgICBGVU5DVElPTlM6IEZVTkNUSU9OUyxcclxuICAgICAgICBPUFRJT05TOiB7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICBkcm9wZG93blJlc3BvbnNpdmU6IDIsXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb29raWVzXHJcbiAgICAgKiBcclxuICAgICAqICFAcGFyYW0ge0VMRU1FTlRTfSBFTEVNRU5UU1xyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IE9QVElPTlMuaW1nU3JjIHBhdGNoIHRvIGltYWdlXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gT1BUSU9OUy5jb250ZW50IGNvbnRlbnQgdGV4dFxyXG4gICAgICovXHJcbiAgICAvLyByZXF1aXJlKCcuL2Zyb250Ym94L2Nvb2tpZXMnKSh7XHJcbiAgICAvLyAgICAgRUxFTUVOVFM6IEVMRU1FTlRTLFxyXG4gICAgLy8gICAgIE9QVElPTlM6IHtcclxuICAgIC8vICAgICAgICAgaW1nU3JjOiBgL2Fzc2V0cy9pbWFnZXMvY29va2llcy5wbmdgLFxyXG4gICAgLy8gICAgICAgICBjb250ZW50OiBgVyBuYXN6eW0gc2Vyd2lzaWUgd3lrb3J6eXN0dWplbXkgcGxpa2kgQ29va2llcy4gU8SFIG9uZSB6YXBpc3l3YW5lIG5hIGR5c2t1IHVyesSFZHplbmlhIGtvxYRjb3dlZ28gdcW8eXRrb3duaWthIHcgY2VsYWNoIHN0YXR5c3R5Y3pueWNoIG9yYXogdcWCYXR3aWVuaWEga29yenlzdGFuaWEgeiBzZXJ3aXN1LiBVc3Rhd2llbmlhIHRlIHphd3N6ZSBtb8W8bmEgem1pZW5pxIcuIFN6Y3plZ8OzxYJvd2UgaW5mb3JtYWNqZSBvIHBsaWthY2ggQ29va2llcyB6bmFqZHVqxIUgc2nEmSB3IDxhIGhyZWY9XCIjXCIgdGFyZ2V0PVwiX2JsYW5rXCI+UG9saXR5Y2UgUHJ5d2F0bm/Fm2NpPC9hPmAsXHJcbiAgICAvLyAgICAgfSxcclxuICAgIC8vIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGFic1xyXG4gICAgICogXHJcbiAgICAgKiAhQHBhcmFtIHtFTEVNRU5UU30gRUxFTUVOVFNcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBPUFRJT05TLmltZ1NyYyBwYXRjaCB0byBpbWFnZVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IE9QVElPTlMuY29udGVudCBjb250ZW50IHRleHRcclxuICAgICAqL1xyXG4gICAgcmVxdWlyZSgnLi9mcm9udGJveC90YWJzJykoe1xyXG4gICAgICAgIEVMRU1FTlRTOiBFTEVNRU5UUyxcclxuICAgICAgICBPUFRJT05TOiB7XHJcbiAgICAgICAgICAgIGltZ1NyYzogYC9hc3NldHMvaW1hZ2VzL2Nvb2tpZXMucG5nYCxcclxuICAgICAgICAgICAgY29udGVudDogYFcgbmFzenltIHNlcndpc2llIHd5a29yenlzdHVqZW15IHBsaWtpIENvb2tpZXMuIFPEhSBvbmUgemFwaXN5d2FuZSBuYSBkeXNrdSB1cnrEhWR6ZW5pYSBrb8WEY293ZWdvIHXFvHl0a293bmlrYSB3IGNlbGFjaCBzdGF0eXN0eWN6bnljaCBvcmF6IHXFgmF0d2llbmlhIGtvcnp5c3RhbmlhIHogc2Vyd2lzdS4gVXN0YXdpZW5pYSB0ZSB6YXdzemUgbW/FvG5hIHptaWVuacSHLiBTemN6ZWfDs8WCb3dlIGluZm9ybWFjamUgbyBwbGlrYWNoIENvb2tpZXMgem5hamR1asSFIHNpxJkgdyA8YSBocmVmPVwiI1wiIHRhcmdldD1cIl9ibGFua1wiPlBvbGl0eWNlIFByeXdhdG5vxZtjaTwvYT5gLFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3cgbW9yZSBjb250ZW50XHJcbiAgICAgKiBcclxuICAgICAqICFAcGFyYW0ge1RSQU5TSVRJT05IRUlHSFR9IHRyYW5zaXRpb25IZWlnaHRcclxuICAgICAqL1xyXG4gICAgcmVxdWlyZSgnLi9mcm9udGJveC9zaG93TW9yZScpKHtcclxuICAgICAgICBUUkFOU0lUSU9OSEVJR0hUOiB0cmFuc2l0aW9uSGVpZ2h0LFxyXG4gICAgICAgIFJFU0laRTogUkVTSVpFLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHb29nbGUgTWFwcyBBUElcclxuICAgICAqIFxyXG4gICAgICogIUBwYXJhbSB7RlVOQ1RJT05TfSBGVU5DVElPTlNcclxuICAgICAqICFAcGFyYW0ge1NDUk9MTH0gU0NST0xMXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gT1BUSU9OUy5jZW50ZXIgcGF0Y2ggdG8gaW1hZ2VcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBPUFRJT05TLmNvbnRlbnQgY29udGVudCB0ZXh0XHJcbiAgICAgKi9cclxuICAgIC8vIHZhciBnb29nbGVNYXBzID0gcmVxdWlyZSgnLi9nb29nbGVNYXBzJykoe1xyXG4gICAgLy8gICAgIEZVTkNUSU9OUzogRlVOQ1RJT05TLFxyXG4gICAgLy8gICAgIFNDUk9MTDogU0NST0xMLFxyXG4gICAgLy8gICAgIE9QVElPTlM6IHtcclxuICAgIC8vICAgICAgICAgLy8gRmlyc3QgcG9zaXRpb25cclxuICAgIC8vICAgICAgICAgY2VudGVyOiB7XHJcbiAgICAvLyAgICAgICAgICAgICBsYXQ6IDUxLjkxOTQzNyxcclxuICAgIC8vICAgICAgICAgICAgIGxuZzogMTkuMTQ1MTM2LFxyXG4gICAgLy8gICAgICAgICB9LFxyXG4gICAgLy8gICAgICAgICBtYXBJRDogXCJtYXBcIixcclxuICAgIC8vICAgICAgICAgem9vbTogNS44LFxyXG4gICAgLy8gICAgICAgICBkaXNhYmxlRGVmYXVsdFVJOiB0cnVlLFxyXG4gICAgLy8gICAgICAgICBzdHJlZXRWaWV3Q29udHJvbDogZmFsc2UsXHJcbiAgICAvLyAgICAgICAgIGRyYWdnYWJsZTogZmFsc2UsXHJcbiAgICAvLyAgICAgICAgIHNjYWxlQ29udHJvbDogZmFsc2UsXHJcbiAgICAvLyAgICAgICAgIHNjcm9sbHdoZWVsOiBmYWxzZSxcclxuICAgIC8vICAgICAgICAgc3R5bGVzOiByZXF1aXJlKCcuL2dvb2dsZU1hcHNTdHlsZScpLFxyXG4gICAgLy8gICAgICAgICBtYXJrZXJTaXplOiBbMjEsIDM0XSxcclxuICAgIC8vICAgICB9LFxyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWxlY3QyXHJcbiAgICAgKi9cclxuICAgIC8vIHZhciAkc2VsZWN0MiA9ICQoXCIuc2VsZWN0MlwiKTtcclxuICAgIC8vIGlmICgkc2VsZWN0Mi5sZW5ndGgpIHtcclxuICAgIC8vICAgICRzZWxlY3QyLnNlbGVjdDIoe1xyXG4gICAgLy8gICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMSxcclxuICAgIC8vICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgdmFyXHJcbiAgICAkaWZyYW1lID0gJChcIltkYXRhLWlmcmFtZV1cIik7XHJcbiAgICAkaWZyYW1lLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XHJcbiAgICAgICAgdmFyIFxyXG4gICAgICAgICR0aGlzID0gJCh0aGlzKSxcclxuICAgICAgICBmaW5kID0gJHRoaXMuYXR0cihcImRhdGEtaWZyYW1lXCIpLFxyXG4gICAgICAgICRjb250ZW50ID0gJChgW2RhdGEtaWZyYW1lLWNvbnRlbnQ9XCIke2ZpbmR9XCJdYCk7XHJcblxyXG4gICAgICAgICR0aGlzLmNvbnRlbnRzKCkuZmluZChcImJvZHlcIikuYXBwZW5kKCAnPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCIvY3NzL3N0eWxlLmRldi5jc3NcIj4nICk7XHJcbiAgICAgICAgJHRoaXMuY29udGVudHMoKS5maW5kKFwiYm9keVwiKS5hcHBlbmQoICc8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTFcIj4nICk7XHJcbiAgICAgICAgJHRoaXMuY29udGVudHMoKS5maW5kKFwiYm9keVwiKS5hcHBlbmQoICc8c3R5bGU+IGJvZHksaHRtbCB7IHBhZGRpbmc6IDAhaW1wb3J0YW50OyBtYXJnaW46IDAhaW1wb3J0YW50OyBwb3NpdGlvbjogc3RhdGljIWltcG9ydGFudDsgaGVpZ2h0OiBhdXRvIWltcG9ydGFudDsgbWluLWhlaWdodDogYXV0byFpbXBvcnRhbnQ7IH0gPC9zdHlsZT4nICk7XHJcbiAgICAgICAgJHRoaXMuY29udGVudHMoKS5maW5kKFwiYm9keVwiKS5hcHBlbmQoICRjb250ZW50ICk7XHJcbiAgICB9KTtcclxuICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuXHJcbiAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgIERFQlVHLmNvbnNvbGUuYWRkKFwiUnVubmluZyBjb3JyZWN0Li4uXCIpO1xyXG4gICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgIC8vIEluZm9ybSBzdHlsZXNoZWVkIHRvIHJlbW92ZSBzdHlsZSBmYWxsYmFjayBmb3IgSmF2YVNjcmlwdCBlbGVtZW50c1xyXG4gICAgRUxFTUVOVFMuJGh0bWwucmVtb3ZlQ2xhc3MoXCJub19qc1wiKTtcclxuXHJcbn0pKCQsIHdpbmRvdyk7IiwiLyoqXHJcbiAqIFJlc2l6ZVxyXG4gKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gKGRhdGEpID0+IHtcclxuXHJcbiAgICB2YXJcclxuICAgIFFVRVVFID0ge1xyXG4gICAgICAgIHdpZHRoOiB7fSxcclxuICAgICAgICBoZWlnaHQ6IHt9LFxyXG4gICAgICAgIGFsbDoge30sXHJcbiAgICB9O1xyXG5cclxuICAgIHZhclxyXG4gICAgREFUQSA9IHtcclxuICAgICAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgICAgIHRpbWU6IDAsXHJcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICAgICAgYXBwZW5kVGVtcGxhdGU6IGZhbHNlLFxyXG4gICAgfTtcclxuXHJcbiAgICB2YXJcclxuICAgIHJlc2l6ZVRpbWUgPSA0MDA7XHJcblxyXG4gICAgdmFyXHJcbiAgICBFTEVNRU5UUyxcclxuICAgIFRFTVBMQVRFID0ge1xyXG4gICAgICAgIGxvYWRpbmc6IG51bGwsXHJcbiAgICB9O1xyXG5cclxuICAgIHZhclxyXG4gICAgc3RhcnQgPSAoKSA9PiB7XHJcbiAgICAgICAgRUxFTUVOVFMgPSBkYXRhLkVMRU1FTlRTO1xyXG4gICAgICAgIFRFTVBMQVRFLmxvYWRpbmcgPSBkYXRhLnRlbXBsYXRlLmxvYWRpbmc7XHJcblxyXG4gICAgICAgIC8qIEFwcGVuZCBsb2FkaW5nIHRlbXBsYXRlICovXHJcbiAgICAgICAgaWYgKCAhREFUQS5hcHBlbmRUZW1wbGF0ZSAmJiBURU1QTEFURS5sb2FkaW5nICkge1xyXG4gICAgICAgICAgICBFTEVNRU5UUy4kYm9keS5hcHBlbmQoIGA8ZGl2IGNsYXNzPVwianNfcmVzaXplTG9hZGluZ1wiPjxkaXYgY2xhc3M9XCJqc19yZXNpemVMb2FkaW5nX19jb250ZW50XCI+JHtURU1QTEFURS5sb2FkaW5nfTwvZGl2PjwvZGl2PmAgKTtcclxuICAgICAgICAgICAgREFUQS5hcHBlbmRUZW1wbGF0ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXJcclxuICAgIHRyaWdnZXIgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIERBVEEudGltZSA9IDUwMDtcclxuXHJcbiAgICAgICAgaWYgKCFEQVRBLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICBEQVRBLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJlc2l6ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdmFyXHJcbiAgICBhZGQgPSAobmFtZSwgY2FsbGJhY2ssIHR5cGUpID0+IHtcclxuICAgICAgICBRVUVVRVt0eXBlXVtuYW1lXSA9IFtjYWxsYmFja107XHJcbiAgICAgICAgXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgREVCVUcuY29uc29sZS5hZGQoYHJlc2l6ZTogYWRkICR7bmFtZX1gKTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICB9O1xyXG5cclxuICAgIHZhclxyXG4gICAgcmVtb3ZlID0gKG5hbWUsIHR5cGUpID0+IHtcclxuICAgICAgICBkZWxldGUgcXVldWVbdHlwZV1bbmFtZV07XHJcblxyXG4gICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKGByZXNpemU6IHJlbW92ZSAke25hbWV9YCk7XHJcbiAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXJcclxuICAgIGNsZWFuID0gKCkgPT4ge1xyXG4gICAgICAgIHF1ZXVlID0ge307XHJcblxyXG4gICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKGByZXNpemU6IGNsZWFuIHF1ZXVlYCk7XHJcbiAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXJcclxuICAgIHJ1biA9ICh0eXBlKSA9PiB7XHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3dpZHRoJzpcclxuICAgICAgICAgICAgICAgIHJlc2l6ZVdpZHRoKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnaGVpZ2h0JzpcclxuICAgICAgICAgICAgICAgIHJlc2l6ZUhlaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXNpemVBbGwoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdmFyXHJcbiAgICByZXNpemUgPSAodHlwZSkgPT4ge1xyXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBEQVRBLnRpbWUgLT0gNTA7XHJcblxyXG4gICAgICAgICAgICBpZiAoREFUQS50aW1lID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCAhREFUQS5sb2FkaW5nICkge1xyXG4gICAgICAgICAgICAgICAgICAgIERBVEEubG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBURU1QTEFURS5sb2FkaW5nICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBFTEVNRU5UUy4kYm9keS5hZGRDbGFzcyhcImpzX3Jlc2l6ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXNpemUodHlwZSk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBEQVRBLmxvYWRpbmcgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgREFUQS5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBURU1QTEFURS5sb2FkaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVMRU1FTlRTLiRib2R5LnJlbW92ZUNsYXNzKFwianNfcmVzaXplXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIERBVEEuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBydW4odHlwZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgICAgIERFQlVHLnZhcmlhYmxlLnJlZnJlc2goXCJSZXNpemVcIik7XHJcbiAgICAgICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgICAgICB9LCA1MCk7XHJcbiAgICB9O1xyXG4gICAgdmFyIFxyXG4gICAgcmVzaXplV2lkdGggPSAoKSA9PiB7XHJcbiAgICAgICAgJC5lYWNoKFFVRVVFLndpZHRoLCBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcclxuICAgICAgICAgICAgKHZhbHVlWzBdKSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHZhclxyXG4gICAgcmVzaXplSGVpZ2h0ID0gKCkgPT4ge1xyXG4gICAgICAgICQuZWFjaChRVUVVRS5oZWlnaHQsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAodmFsdWVbMF0pKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgdmFyXHJcbiAgICByZXNpemVBbGwgPSAoKSA9PiB7XHJcbiAgICAgICAgcmVzaXplSGVpZ2h0KCk7XHJcbiAgICAgICAgcmVzaXplV2lkdGgoKTtcclxuICAgICAgICAkLmVhY2goUVVFVUUuYWxsLCBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcclxuICAgICAgICAgICAgKHZhbHVlWzBdKSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyogdGVzdC1jb2RlICovXHJcbiAgICBERUJVRy52YXJpYWJsZS5hZGQoXCJSZXNpemVcIiwgREFUQSk7XHJcbiAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgc3RhcnQoKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGFkZDogYWRkLFxyXG4gICAgICAgIHJlbW92ZTogcmVtb3ZlLFxyXG4gICAgICAgIHJlc2l6ZTogcmVzaXplLFxyXG4gICAgICAgIHRyaWdnZXI6IHRyaWdnZXIsXHJcbiAgICB9O1xyXG4gIFxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xyXG5cclxuICAgIHZhciBcclxuICAgIFxyXG4gICAgREFUQSA9IHt9LFxyXG5cclxuICAgIHdoaWNoVHJhbnNpdGlvbkV2ZW50ID0gKCkgPT4ge1xyXG4gICAgICAgIHZhciB0LFxyXG4gICAgICAgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmYWtlZWxlbWVudFwiKTtcclxuICAgICAgXHJcbiAgICAgICAgdmFyIHRyYW5zaXRpb25zID0ge1xyXG4gICAgICAgICAgXCJ0cmFuc2l0aW9uXCIgICAgICA6IFwidHJhbnNpdGlvbmVuZFwiLFxyXG4gICAgICAgICAgXCJPVHJhbnNpdGlvblwiICAgICA6IFwib1RyYW5zaXRpb25FbmRcIixcclxuICAgICAgICAgIFwiTW96VHJhbnNpdGlvblwiICAgOiBcInRyYW5zaXRpb25lbmRcIixcclxuICAgICAgICAgIFwiV2Via2l0VHJhbnNpdGlvblwiOiBcIndlYmtpdFRyYW5zaXRpb25FbmRcIlxyXG4gICAgICAgIH1cclxuICAgICAgXHJcbiAgICAgICAgZm9yICh0IGluIHRyYW5zaXRpb25zKXtcclxuICAgICAgICAgIGlmIChlbC5zdHlsZVt0XSAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRyYW5zaXRpb25zW3RdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY2hlY2tXaXRjaFRyYW5zaXRpb25FdmVudCA9ICgpID0+IHtcclxuICAgICAgICBEQVRBLndpdGNoVHJhbnNpdGlvbkV2ZW50ID0gd2hpY2hUcmFuc2l0aW9uRXZlbnQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVmcmVzaCA9ICgpID0+IHtcclxuICAgICAgICBEQVRBLnRyYW5zaXRpb25FdmVudCA9IGNoZWNrV2l0Y2hUcmFuc2l0aW9uRXZlbnQoKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIERBVEE7XHJcblxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gKGFyZ3VtZW50KSA9PiB7XHJcbiAgICBcclxuICAgIHZhciBcclxuICAgIEJSRUFLUE9JTlRTICAgICAgICAgPSBudWxsLFxyXG4gICAgRUxFTUVOVFMgICAgICAgICAgICA9IG51bGwsXHJcbiAgICBSRVNJWkUgICAgICAgICAgICAgID0gbnVsbDtcclxuXHJcbiAgICB2YXJcclxuICAgIERBVEEgPSB7XHJcbiAgICAgICAgd2lkdGggICAgICAgICAgIDogbnVsbCxcclxuICAgICAgICBoZWlnaHQgICAgICAgICAgOiBudWxsLFxyXG4gICAgICAgIHJlc3BvbnNpdmUgICAgICA6IG51bGwsXHJcbiAgICB9O1xyXG5cclxuICAgIC8qIFN0YXJ0IG1vZHVsZSAqL1xyXG4gICAgY29uc3RcclxuICAgIHN0YXJ0ID0gKCkgPT4ge1xyXG5cclxuICAgICAgICAvKiBQcmVwYXJlIGFyZ3VtZW50cyBkYXRhICovXHJcbiAgICAgICAgQlJFQUtQT0lOVFMgPSBhcmd1bWVudC5CUkVBS1BPSU5UUztcclxuICAgICAgICBFTEVNRU5UUyA9IGFyZ3VtZW50LkVMRU1FTlRTO1xyXG4gICAgICAgIFJFU0laRSA9IGFyZ3VtZW50LlJFU0laRTtcclxuXHJcbiAgICAgICAgcmVmcmVzaCgpO1xyXG5cclxuICAgICAgICAvKiBUcmlnZ2VyIGZ1bmN0aW9uIGlmIHVzZXIgcmVzaXplIHBhZ2UgKi9cclxuICAgICAgICBFTEVNRU5UUy4kd2luZG93Lm9uKCdyZXNpemUgb3JpZW50YXRpb25jaGFuZ2UnLCByZWZyZXNoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyogUmVmcmVzaCBtb2R1bGUgKi9cclxuICAgIGNvbnN0XHJcbiAgICByZWZyZXNoID0gKCkgPT4ge1xyXG5cclxuICAgICAgICAvKiBQcmVwYXJlIGRhdGEgKi9cclxuICAgICAgICBsZXRcclxuICAgICAgICB3aWR0aCA9IEVMRU1FTlRTLiR3aW5kb3cud2lkdGgoKSxcclxuICAgICAgICBsYXN0V2lkdGggPSBEQVRBLndpZHRoO1xyXG4gICAgICAgIGhlaWdodCA9IEVMRU1FTlRTLiR3aW5kb3cuaGVpZ2h0KCk7XHJcblxyXG4gICAgICAgIERBVEEud2lkdGggPSB3aWR0aDtcclxuICAgICAgICBEQVRBLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICBEQVRBLnJlc3BvbnNpdmUgPSBudWxsO1xyXG5cclxuICAgICAgICAvKiBDaGVjayBhY3RpdmUgYnJlYWtwb2ludCAqLyBcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBCUkVBS1BPSU5UUykge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IEJSRUFLUE9JTlRTW2tleV07XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgaWYgKHdpZHRoID4gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIERBVEEucmVzcG9uc2l2ZSA9IGtleTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghREFUQS5yZXNwb25zaXZlKSB7XHJcbiAgICAgICAgICAgIERBVEEucmVzcG9uc2l2ZSA9ICdtb2JpbGUnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogVHJpZ2dlciByZXNpemUgcXVldWUgKGlnbm9yZSBmaXJzdCB0aW1lKSAqL1xyXG4gICAgICAgIGlmIChsYXN0V2lkdGgpIHtcclxuICAgICAgICAgICAgaWYgKERBVEEud2lkdGggPT09IGxhc3RXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgUkVTSVpFLnRyaWdnZXIoJ3dpZHRoJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBSRVNJWkUudHJpZ2dlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICBERUJVRy52YXJpYWJsZS5yZWZyZXNoKCdkZXZpY2UnKTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgIERFQlVHLnZhcmlhYmxlLmFkZCgnZGV2aWNlJywgREFUQSk7XHJcbiAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgc3RhcnQoKTtcclxuXHJcbiAgICByZXR1cm4gREFUQTtcclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IChkYXRhKSA9PiB7XHJcblxyXG4gICAgdmFyIFxyXG4gICAgREFUQSA9IHtcclxuICAgICAgICBsYXN0Q2VudGVyICAgICAgICAgIDogbnVsbCxcclxuICAgICAgICBjZW50ZXIgICAgICAgICAgICAgIDogbnVsbCxcclxuICAgICAgICB0b3AgICAgICAgICAgICAgICAgIDogbnVsbCxcclxuICAgICAgICBzcGVlZCAgICAgICAgICAgICAgIDogbnVsbCxcclxuICAgICAgICBkaXJlY3Rpb24gICAgICAgICAgIDogbnVsbCxcclxuICAgIH0sXHJcbiAgICBERVZJQ0UgPSBkYXRhLkRFVklDRTtcclxuXHJcblxyXG4gICAgdmFyIGJpbmQgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgICQod2luZG93KS5zY3JvbGwocmVmcmVzaCk7XHJcblxyXG4gICAgICAgICQod2luZG93KS5vbigncmVzaXplIG9yaWVudGF0aW9uY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJlZnJlc2goKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmVmcmVzaCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgcmVmcmVzaCA9ICgpID0+IHtcclxuICAgICAgICBEQVRBLmxhc3RDZW50ZXIgPSBEQVRBLmNlbnRlciB8fCAwO1xyXG5cclxuICAgICAgICBEQVRBLnRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IDA7XHJcbiAgICAgICAgREFUQS5jZW50ZXIgPSBEQVRBLnRvcCArIERFVklDRS5oZWlnaHQgLyAyO1xyXG5cclxuICAgICAgICBEQVRBLnNwZWVkID0gTWF0aC5hYnMoREFUQS5sYXN0Q2VudGVyIC0gREFUQS5jZW50ZXIpO1xyXG5cclxuICAgICAgICBpZiAoREFUQS5jZW50ZXIgPiBEQVRBLmxhc3RDZW50ZXIpIHtcclxuICAgICAgICAgICAgREFUQS5kaXJlY3Rpb24gPSBcImRvd25cIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBEQVRBLmRpcmVjdGlvbiA9IFwidXBcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgIERFQlVHLnZhcmlhYmxlLnJlZnJlc2goJ3Njcm9sbCcpO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgIH07XHJcblxyXG4gICAgLyogdGVzdC1jb2RlICovXHJcbiAgICBERUJVRy52YXJpYWJsZS5hZGQoJ3Njcm9sbCcsIERBVEEpO1xyXG4gICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgIGJpbmQoKTtcclxuXHJcbiAgICByZXR1cm4gREFUQTtcclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IChkYXRhKSA9PiB7XHJcblxyXG4gICAgREFUQSA9IHtcclxuICAgICAgICAkY29udGFpbmVyOiBudWxsLFxyXG4gICAgICAgICRlbGVtZW50OiBudWxsLFxyXG4gICAgICAgICRidXR0b246IG51bGwsXHJcbiAgICAgICAgJGJvZHk6IG51bGwsXHJcbiAgICAgICAgb3BlbjogZmFsc2UsXHJcbiAgICB9O1xyXG5cclxuICAgICQuZXh0ZW5kKCBEQVRBLCBkYXRhICk7XHJcbiAgICBcclxuICAgIHZhciBzdGFydCA9IChkYXRhKSA9PiB7XHJcblxyXG4gICAgICAgIHZhciBkZWJ1Z0JveENsYXNzID0gJ2RlYnVnLWJveCBkZWJ1Zy1ib3gtLWNvbnNvbGUnO1xyXG4gICAgICAgIGlmICghREFUQS5vcGVuKSB7XHJcbiAgICAgICAgICAgIGRlYnVnQm94Q2xhc3MgKz0gJyBkZWJ1Zy1ib3gtLWhpZGUnO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHZhciBkZWJ1Z0JveCA9ICQoYDxkaXYgY2xhc3M9JyR7ZGVidWdCb3hDbGFzc30nIGlkPSdkZWJ1Zy1ib3gtY29uc29sZSc+PC9kaXY+YCk7XHJcbiAgICAgICAgdmFyIGRlYnVnQm94QnV0dG9uID0gJChcIjxkaXYgaWQ9J2RlYnVnLWJveC1jb25zb2xlLWJ1dHRvbicgY2xhc3M9J2RlYnVnLWJveF9fYnV0dG9uJz5Gcm9udEJveCBjb25zb2xlPC9kaXY+XCIpO1xyXG4gICAgICAgIHZhciBkZWJ1Z0JveENvbnRhaW5lciA9ICQoXCI8ZGl2IGlkPSdkZWJ1Zy1ib3gtY29uc29sZS1jb250YWluZXInIGNsYXNzPSdkZWJ1Zy1ib3hfX2NvbnRhaW5lcic+PC9kaXY+XCIpO1xyXG4gICAgXHJcbiAgICAgICAgREFUQS5FTEVNRU5UUy4kYm9keS5hcHBlbmQoZGVidWdCb3gpO1xyXG4gICAgICAgIERBVEEuJGVsZW1lbnQgPSAkKFwiI2RlYnVnLWJveC1jb25zb2xlXCIpO1xyXG4gICAgXHJcbiAgICAgICAgREFUQS4kZWxlbWVudC5hcHBlbmQoZGVidWdCb3hCdXR0b24pO1xyXG4gICAgICAgIERBVEEuJGVsZW1lbnQuYXBwZW5kKGRlYnVnQm94Q29udGFpbmVyKTtcclxuICAgIFxyXG4gICAgICAgIERBVEEuJGJ1dHRvbiA9ICQoXCIjZGVidWctYm94LWNvbnNvbGUtYnV0dG9uXCIpO1xyXG4gICAgICAgIERBVEEuJGNvbnRhaW5lciA9ICQoXCIjZGVidWctYm94LWNvbnNvbGUtY29udGFpbmVyXCIpO1xyXG4gICAgXHJcbiAgICAgICAgdmFyIHRvZ2dsZURlYnVnQm94ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBEQVRBLiRlbGVtZW50LnRvZ2dsZUNsYXNzKFwiZGVidWctYm94LS1oaWRlXCIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgREFUQS4kYnV0dG9uLm9uKFwiY2xpY2tcIiwgdG9nZ2xlRGVidWdCb3gpO1xyXG4gICAgXHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICB2YXIgYWRkID0gKGFkZFN0cmluZywgYWRkb25DbGFzcyA9ICcnKSA9PiB7XHJcbiAgICAgICAgREFUQS4kY29udGFpbmVyLnByZXBlbmQoXCI8cCBjbGFzcz0nXCIgKyBhZGRvbkNsYXNzICsgXCInPlwiK2FkZFN0cmluZytcIjwvcD5cIik7XHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXJ0KCk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhZGQ6IGFkZCxcclxuICAgIH07XHJcblxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gKGFyZ3VtZW50KSA9PiB7XHJcblxyXG4gICAgdmFyIFxyXG4gICAgRUxFTUVOVFMgPSBudWxsO1xyXG5cclxuICAgIHZhclxyXG4gICAgQk9YID0ge1xyXG4gICAgICAgICRjb250YWluZXI6IG51bGwsXHJcbiAgICAgICAgJGNvbnRlbnQ6IG51bGwsXHJcbiAgICAgICAgJGJ1dHRvbjogbnVsbCxcclxuICAgICAgICAkYm9keTogbnVsbCxcclxuICAgIH0sXHJcbiAgICBPUFRJT05TID0ge1xyXG4gICAgICAgIG9wZW46IGZhbHNlLFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdFxyXG4gICAgQ0xBU1MgPSB7XHJcbiAgICAgICAgY29udGFpbmVyICAgICAgIDogYGRlYnVnLWJveCBkZWJ1Zy1ib3gtLXZhcmlhYmxlc2AsXHJcbiAgICAgICAgYnV0dG9uICAgICAgICAgIDogYGRlYnVnLWJveF9fYnV0dG9uYCxcclxuICAgICAgICBjb250ZW50ICAgICAgICAgOiBgZGVidWctYm94X19jb250YWluZXJgLFxyXG4gICAgICAgIGl0ZW0gICAgICAgICAgICA6IGBkZWJ1Zy1ib3hfX2l0ZW1gLFxyXG4gICAgfTtcclxuXHJcbiAgICB2YXJcclxuICAgIENPTlRFTlQgPSB7fTtcclxuXHJcbiAgICAvKiBTdGFydCBtb2R1bGUgKi9cclxuICAgIHZhciBcclxuICAgIHN0YXJ0ID0gKGRhdGEpID0+IHtcclxuXHJcbiAgICAgICAgLyogUHJlcGFyZSBhcmd1bWVudHMgZGF0YSAqL1xyXG4gICAgICAgICQuZXh0ZW5kKCBPUFRJT05TLCBhcmd1bWVudC5PUFRJT05TICk7XHJcbiAgICAgICAgRUxFTUVOVFMgPSBhcmd1bWVudC5FTEVNRU5UUztcclxuXHJcbiAgICAgICAgLyogQ2hlY2sgaWYgY29udGFpbmVyIG11c3QgYmUgZGVmYXVsdCBvcGVuICovXHJcbiAgICAgICAgaWYgKCFPUFRJT05TLm9wZW4pIHtcclxuICAgICAgICAgICAgQ0xBU1MuY29udGFpbmVyICs9ICcgZGVidWctYm94LS1oaWRlJztcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLyogQ3JlYXRlIHRlbXBsYXRlICovXHJcbiAgICAgICAgQk9YLiRjb250YWluZXIgICAgICA9ICQoYDxkaXYgY2xhc3M9JyR7Q0xBU1MuY29udGFpbmVyfSc+PC9kaXY+YCk7XHJcbiAgICAgICAgQk9YLiRidXR0b24gICAgICAgICA9ICQoYDxkaXYgY2xhc3M9JyR7Q0xBU1MuYnV0dG9ufSc+RnJvbnRCb3ggdmFyaWFibGVzPC9kaXY+YCk7XHJcbiAgICAgICAgQk9YLiRjb250ZW50ICAgICAgICA9ICQoYDxkaXYgY2xhc3M9JyR7Q0xBU1MuY29udGVudH0nPjwvZGl2PmApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8qIERyYXcgdGVtcGxhdGUgKi9cclxuICAgICAgICBFTEVNRU5UUy4kYm9keS5hcHBlbmQoIEJPWC4kY29udGFpbmVyICk7XHJcbiAgICAgICAgQk9YLiRjb250YWluZXIuYXBwZW5kKCBCT1guJGJ1dHRvbiApO1xyXG4gICAgICAgIEJPWC4kY29udGFpbmVyLmFwcGVuZCggQk9YLiRjb250ZW50ICk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLyogQmluZCB0b2dnbGUgY29udGFpbmVyICovXHJcbiAgICAgICAgQk9YLiRidXR0b24ub24oXCJjbGlja1wiLCB0b2dnbGVDb250YWluZXIpO1xyXG4gICAgfTtcclxuICAgIFxyXG5cclxuICAgIC8qIFNob3cgZGF0YSBpbiBjb250ZW50ICovXHJcbiAgICBjb25zdFxyXG4gICAgYWRkID0gKGRhdGFOYW1lLCBEQVRBKSA9PiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgQ09OVEVOVFtkYXRhTmFtZV0gPSB7XHJcbiAgICAgICAgICAgIGRhdGE6IERBVEEsXHJcbiAgICAgICAgICAgIG5hbWU6IGRhdGFOYW1lLnNwbGl0KFwiIFwiKS5qb2luKFwiLVwiKS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIEJPWC4kY29udGVudC5hcHBlbmQoYDxwIGNsYXNzPVwiJHtDTEFTUy5pdGVtfVwiPiR7Q09OVEVOVFtkYXRhTmFtZV0ubmFtZX08L3A+YCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gREFUQSkge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IERBVEFba2V5XTtcclxuXHJcbiAgICAgICAgICAgIGxldFxyXG4gICAgICAgICAgICBuYW1lID0ga2V5LnNwbGl0KFwiIFwiKS5qb2luKFwiLVwiKS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgICAgICBpZCA9IGBkZWJ1Zy12YXJpYWJsZS0ke0NPTlRFTlRbZGF0YU5hbWVdLm5hbWV9LSR7bmFtZX1gO1xyXG4gICAgICAgICAgICAkaXRlbSA9ICQoYDxwPiAke2tleX0gPHNwYW4gaWQ9JyR7aWR9Jz4ke3ZhbHVlfTwvc3Bhbj4gPC9wPmApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgQk9YLiRjb250ZW50LmFwcGVuZCgkaXRlbSk7XHJcblxyXG4gICAgICAgICAgICAkaXRlbS5vbihcImNsaWNrXCIsIHskaXRlbX0sIHRvZ2dsZVZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qIFJlZnJlc2ggZGF0YSBuYW1lIGluIGNvbnRlbnQgKi8gXHJcbiAgICBjb25zdFxyXG4gICAgcmVmcmVzaCA9IChuYW1lKSA9PiB7XHJcbiAgICAgICAgdmFyXHJcbiAgICAgICAgaXRlbSA9IENPTlRFTlRbbmFtZV0sXHJcbiAgICAgICAgZGF0YSA9IGl0ZW0uZGF0YTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGRhdGFba2V5XTtcclxuXHJcbiAgICAgICAgICAgIGxldFxyXG4gICAgICAgICAgICBuYW1lID0ga2V5LnNwbGl0KFwiIFwiKS5qb2luKFwiLVwiKS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgICAgICBmaW5kID0gYGRlYnVnLXZhcmlhYmxlLSR7aXRlbS5uYW1lfS0ke25hbWV9YDtcclxuXHJcbiAgICAgICAgICAgICQoYCMke2ZpbmR9YCkudGV4dCh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgLyogVG9vZ2xlIGNvbnRhaW5lciAqL1xyXG4gICAgY29uc3RcclxuICAgIHRvZ2dsZUNvbnRhaW5lciA9ICgpID0+IHtcclxuICAgICAgICBCT1guJGNvbnRhaW5lci50b2dnbGVDbGFzcyhcImRlYnVnLWJveC0taGlkZVwiKTtcclxuICAgIH07XHJcbiAgICAvKiBUb29nbGUgdmFsdWUgKi9cclxuICAgIGNvbnN0XHJcbiAgICB0b2dnbGVWYWx1ZSA9IChlKSA9PiB7ICAgICAgXHJcbiAgICAgICAgZS5kYXRhLiRpdGVtLnRvZ2dsZUNsYXNzKFwianNfZm9jdXNcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXJ0KCk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhZGQ6IGFkZCxcclxuICAgICAgICByZWZyZXNoOiByZWZyZXNoLFxyXG4gICAgfTtcclxuXHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0IHN0cmluZyB0byBib29sZWFuXHJcbiAgICAgKiBmYXN0ZXN0IG1ldGhvZCBodHRwOi8vanNiZW4uY2gvY3FWU2pcclxuICAgICAqL1xyXG4gICAgZ2V0Qm9vbGVhbih2YWx1ZSkge1xyXG5cdFx0c3dpdGNoICh2YWx1ZSl7XHJcblx0XHRcdGNhc2UgdHJ1ZTpcclxuXHRcdFx0Y2FzZSBcInRydWVcIjpcclxuXHRcdFx0Y2FzZSAxOlxyXG5cdFx0XHRjYXNlIFwiMVwiOlxyXG5cdFx0XHRjYXNlIFwib25cIjpcclxuXHRcdFx0Y2FzZSBcInllc1wiOlxyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRkZWZhdWx0OiBcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICAvKlxyXG4gICAgICogRGV0ZXJtaW5lIE92ZXJmbG93XHJcbiAgICAgKi9cclxuICAgIGRldGVybWluZU92ZXJmbG93OiBmdW5jdGlvbihjb250ZW50LCBjb250YWluZXIpIHtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRlbnQgaW5zdGFuY2VvZiBqUXVlcnkpXHJcbiAgICAgICAge1xyXG5cdFx0XHRjb250ZW50ID0gY29udGVudFswXTtcclxuXHRcdH1cclxuICAgICAgICBpZiAoY29udGFpbmVyIGluc3RhbmNlb2YgalF1ZXJ5KVxyXG4gICAgICAgIHtcclxuXHRcdFx0Y29udGFpbmVyID0gY29udGFpbmVyWzBdO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhclxyXG5cdFx0Y29udGFpbmVyTWV0cmljcyA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuXHRcdGNvbnRhaW5lck1ldHJpY3NSaWdodCA9IE1hdGguZmxvb3IoY29udGFpbmVyTWV0cmljcy5yaWdodCksXHJcblx0XHRjb250YWluZXJNZXRyaWNzTGVmdCA9IE1hdGguZmxvb3IoY29udGFpbmVyTWV0cmljcy5sZWZ0KSxcclxuXHRcdGNvbnRlbnRNZXRyaWNzID0gY29udGVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuXHRcdGNvbnRlbnRNZXRyaWNzUmlnaHQgPSBNYXRoLmZsb29yKGNvbnRlbnRNZXRyaWNzLnJpZ2h0KSxcclxuXHRcdGNvbnRlbnRNZXRyaWNzTGVmdCA9IE1hdGguZmxvb3IoY29udGVudE1ldHJpY3MubGVmdCk7XHJcblxyXG4gICAgICAgIGlmIChjb250YWluZXJNZXRyaWNzTGVmdCA+IGNvbnRlbnRNZXRyaWNzTGVmdCAmJiBjb250YWluZXJNZXRyaWNzUmlnaHQgPCBjb250ZW50TWV0cmljc1JpZ2h0KSBcclxuICAgICAgICB7XHJcblx0XHRcdHJldHVybiBcImJvdGhcIjtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2UgaWYgKGNvbnRlbnRNZXRyaWNzTGVmdCA8PSBjb250YWluZXJNZXRyaWNzTGVmdCkgXHJcbiAgICAgICAge1xyXG5cdFx0XHRyZXR1cm4gXCJsZWZ0XCI7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIGlmIChjb250ZW50TWV0cmljc1JpZ2h0ID49IGNvbnRhaW5lck1ldHJpY3NSaWdodClcclxuICAgICAgICB7XHJcblx0XHRcdHJldHVybiBcInJpZ2h0XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgXHJcbiAgICAgICAge1xyXG5cdFx0XHRyZXR1cm4gXCJub25lXCI7XHJcblx0XHR9XHJcbiAgICB9LFxyXG4gICAgICAgIFxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogJC5kaXNhYmxlc2Nyb2xsXHJcbiAgICAgKiBBdXRob3I6IEpvc2ggSGFycmlzb24gLSBhbG9vZi5jb1xyXG4gICAgICpcclxuICAgICAqIERpc2FibGVzIHNjcm9sbCBldmVudHMgZnJvbSBtb3VzZXdoZWVscywgdG91Y2htb3ZlcyBhbmQga2V5cHJlc3Nlcy5cclxuICAgICAqIFVzZSB3aGlsZSBqUXVlcnkgaXMgYW5pbWF0aW5nIHRoZSBzY3JvbGwgcG9zaXRpb24gZm9yIGEgZ3VhcmFudGVlZCBzdXBlci1zbW9vdGggcmlkZSFcclxuICAgICAqL1xyXG5cclxuICAgIDsoZnVuY3Rpb24oJCkge1xyXG5cclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAgICAgdmFyIGluc3RhbmNlLCBwcm90bztcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gVXNlclNjcm9sbERpc2FibGVyKCRjb250YWluZXIsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgLy8gc3BhY2ViYXI6IDMyLCBwYWdldXA6IDMzLCBwYWdlZG93bjogMzQsIGVuZDogMzUsIGhvbWU6IDM2XHJcbiAgICAgICAgICAgIC8vIGxlZnQ6IDM3LCB1cDogMzgsIHJpZ2h0OiAzOSwgZG93bjogNDBcclxuICAgICAgICAgICAgdGhpcy5vcHRzID0gJC5leHRlbmQoe1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlV2hlZWwgOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlU2Nyb2xsYmFyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlS2V5cyA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzY3JvbGxFdmVudEtleXMgOiBbMzIsIDMzLCAzNCwgMzUsIDM2LCAzNywgMzgsIDM5LCA0MF1cclxuICAgICAgICAgICAgfSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLiRjb250YWluZXIgPSAkY29udGFpbmVyO1xyXG4gICAgICAgICAgICB0aGlzLiRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xyXG4gICAgICAgICAgICB0aGlzLmxvY2tUb1Njcm9sbFBvcyA9IFswLCAwXTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdG8gPSBVc2VyU2Nyb2xsRGlzYWJsZXIucHJvdG90eXBlO1xyXG5cclxuICAgICAgICBwcm90by5kaXNhYmxlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciB0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmKHQub3B0cy5oYW5kbGVXaGVlbCkge1xyXG4gICAgICAgICAgICAgICAgdC4kY29udGFpbmVyLm9uKFxyXG4gICAgICAgICAgICAgICAgICAgIFwibW91c2V3aGVlbC5kaXNhYmxlc2Nyb2xsIERPTU1vdXNlU2Nyb2xsLmRpc2FibGVzY3JvbGwgdG91Y2htb3ZlLmRpc2FibGVzY3JvbGxcIixcclxuICAgICAgICAgICAgICAgICAgICB0Ll9oYW5kbGVXaGVlbFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodC5vcHRzLmhhbmRsZVNjcm9sbGJhcikge1xyXG4gICAgICAgICAgICAgICAgdC5sb2NrVG9TY3JvbGxQb3MgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgdC4kY29udGFpbmVyLnNjcm9sbExlZnQoKSxcclxuICAgICAgICAgICAgICAgICAgICB0LiRjb250YWluZXIuc2Nyb2xsVG9wKClcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICB0LiRjb250YWluZXIub24oXCJzY3JvbGwuZGlzYWJsZXNjcm9sbFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB0Ll9oYW5kbGVTY3JvbGxiYXIuY2FsbCh0KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZih0Lm9wdHMuaGFuZGxlS2V5cykge1xyXG4gICAgICAgICAgICAgICAgdC4kZG9jdW1lbnQub24oXCJrZXlkb3duLmRpc2FibGVzY3JvbGxcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0Ll9oYW5kbGVLZXlkb3duLmNhbGwodCwgZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICBwcm90by51bmRvID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciB0ID0gdGhpcztcclxuICAgICAgICAgICAgdC4kY29udGFpbmVyLm9mZihcIi5kaXNhYmxlc2Nyb2xsXCIpO1xyXG4gICAgICAgICAgICBpZih0Lm9wdHMuaGFuZGxlS2V5cykge1xyXG4gICAgICAgICAgICAgICAgdC4kZG9jdW1lbnQub2ZmKFwiLmRpc2FibGVzY3JvbGxcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHByb3RvLl9oYW5kbGVXaGVlbCA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICBwcm90by5faGFuZGxlU2Nyb2xsYmFyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGNvbnRhaW5lci5zY3JvbGxMZWZ0KHRoaXMubG9ja1RvU2Nyb2xsUG9zWzBdKTtcclxuICAgICAgICAgICAgdGhpcy4kY29udGFpbmVyLnNjcm9sbFRvcCh0aGlzLmxvY2tUb1Njcm9sbFBvc1sxXSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICBwcm90by5faGFuZGxlS2V5ZG93biA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5vcHRzLnNjcm9sbEV2ZW50S2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IHRoaXMub3B0cy5zY3JvbGxFdmVudEtleXNbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAvLyBQbHVnaW4gd3JhcHBlciBmb3Igb2JqZWN0XHJcbiAgICAgICAgJC5mbi5zY3JvbGxEaXNhYmxlID0gZnVuY3Rpb24obWV0aG9kKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiBjYWxsaW5nIGZvciB0aGUgZmlyc3QgdGltZSwgaW5zdGFudGlhdGUgdGhlIG9iamVjdCBhbmQgc2F2ZVxyXG4gICAgICAgICAgICAvLyByZWZlcmVuY2UuIFRoZSBwbHVnaW4gY2FuIHRoZXJlZm9yZSBvbmx5IGJlIGluc3RhbnRpYXRlZCBvbmNlIHBlclxyXG4gICAgICAgICAgICAvLyBwYWdlLiBZb3UgY2FuIHBhc3Mgb3B0aW9ucyBvYmplY3QgaW4gdGhyb3VnaCB0aGUgbWV0aG9kIHBhcmFtZXRlci5cclxuICAgICAgICAgICAgaWYoICEgaW5zdGFuY2UgJiYgKHR5cGVvZiBtZXRob2QgPT09IFwib2JqZWN0XCIgfHwgISBtZXRob2QpKSB7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IG5ldyBVc2VyU2Nyb2xsRGlzYWJsZXIodGhpcywgbWV0aG9kKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSW5zdGFuY2UgY3JlYXRlZCwgbm8gbWV0aG9kIHNwZWNpZmllZC4gQ2FsbCBkaXNhYmxlIGFnYWluXHJcbiAgICAgICAgICAgIGlmKGluc3RhbmNlICYmIHR5cGVvZiBtZXRob2QgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlLmRpc2FibGUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSW5zdGFuY2UgYWxyZWFkeSBjcmVhdGVkLCBhbmQgYSBtZXRob2QgaXMgYmVpbmcgZXhwbGljaXRseSBjYWxsZWQsXHJcbiAgICAgICAgICAgIC8vIGUuZy4gLnNjcm9sbERpc2FibGUoJ3VuZG8nKTtcclxuICAgICAgICAgICAgZWxzZSBpZihpbnN0YW5jZSAmJiBpbnN0YW5jZVttZXRob2RdKSB7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVttZXRob2RdLmNhbGwoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIEdsb2JhbCBhY2Nlc3NcclxuICAgICAgICB3aW5kb3cuVXNlclNjcm9sbERpc2FibGVyID0gVXNlclNjcm9sbERpc2FibGVyO1xyXG5cclxuICAgIH0pKGpRdWVyeSk7XHJcblxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gKGRhdGEpID0+IHtcclxuXHJcbiAgICB2YXJcclxuICAgICAgICBEQVRBID0ge1xyXG4gICAgICAgICAgICAkYnVyZ2VyOiBudWxsLFxyXG4gICAgICAgICAgICAkbWVudTogbnVsbCxcclxuICAgICAgICAgICAgJG1lbnVfY29udGFpbmVyOiBudWxsLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgRUxFTUVOVFMgPSBkYXRhLkVMRU1FTlRTLFxyXG4gICAgICAgIEZVTkNUSU9OUyA9IGRhdGEuRlVOQ1RJT05TLFxyXG4gICAgICAgIFNFVFRJTkdTID0ge1xyXG4gICAgICAgICAgICB3YWl0OiAzMDAsXHJcbiAgICAgICAgICAgIHN0eWxlOiAndW5kZXItaGVhZGVyJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFjdGl2ZSA9IGZhbHNlLFxyXG4gICAgICAgIG1vdmluZyA9IGZhbHNlO1xyXG5cclxuXHJcbiAgICBpZiAoZGF0YS5TRVRUSU5HUykge1xyXG4gICAgICAgICQuZXh0ZW5kKERBVEEsIGRhdGEuU0VUVElOR1MpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzdGFydCA9IChzZXR0aW5ncyA9IGZhbHNlKSA9PiB7XHJcblxyXG4gICAgICAgIERBVEEuJGJ1cmdlciA9ICQoXCIjYnVyZ2VyLWJ1dHRvblwiKTtcclxuXHJcblxyXG4gICAgICAgIGlmIChEQVRBLiRidXJnZXIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIERBVEEuJG1lbnUgPSAkKFwiI2J1cmdlci1tZW51XCIpO1xyXG4gICAgICAgICAgICBEQVRBLiRtZW51X2NvbnRhaW5lciA9ICQoXCIjYnVyZ2VyLW1lbnUtY29udGFpbmVyXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgREFUQS4kYnVyZ2VyLm9uKFwiY2xpY2tcIiwgYnVyZ2VyQ2xpY2spO1xyXG5cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICAvLyBERUJVRy52YXJpYWJsZS5hZGQoe1xyXG4gICAgICAgIC8vICAgICAnQnVyZ2VyIGFjdGl2ZSc6IGFjdGl2ZSxcclxuICAgICAgICAvLyAgICAgJ0J1cmdlciBtb3ZpbmcnOiBtb3ZpbmcsXHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgdG9nZ2xlT2ZmID0gKCkgPT4ge1xyXG5cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICBERUJVRy5jb25zb2xlLmFkZChcIkJ1cmdlciB0b2dnbGVPZmZcIiwgXCJjbGlja1wiKTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgICAgIG1vdmluZyA9IHRydWU7XHJcbiAgICAgICAgYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIEVMRU1FTlRTLiRodG1sLnJlbW92ZUNsYXNzKCdqc19tZW51LWFjdGl2ZScpO1xyXG5cclxuXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgLy8gREVCVUcudmFyaWFibGUuYWRkKHtcclxuICAgICAgICAvLyAgICAgJ0J1cmdlciBtb3ZpbmcnOiBtb3ZpbmcsXHJcbiAgICAgICAgLy8gICAgICdCdXJnZXIgYWN0aXZlJzogYWN0aXZlLFxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuXHJcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIEVMRU1FTlRTLiRib2R5LnNjcm9sbERpc2FibGUoXCJ1bmRvXCIpO1xyXG4gICAgICAgICAgICBtb3ZpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgRUxFTUVOVFMuJGh0bWwucmVtb3ZlQ2xhc3MoJ2pzX21lbnUtYWN0aXZlLS1lbmQnKTtcclxuXHJcbiAgICAgICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgICAgICAvLyBERUJVRy52YXJpYWJsZS5hZGQoe1xyXG4gICAgICAgICAgICAvLyAgICAgJ0J1cmdlciBtb3ZpbmcnOiBtb3ZpbmcsXHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgICAgIH0sIFNFVFRJTkdTLndhaXQpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIHRvZ2dsZU9uID0gKCkgPT4ge1xyXG4gICAgICAgIEVMRU1FTlRTLiRib2R5LnNjcm9sbERpc2FibGUoKTtcclxuXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgREVCVUcuY29uc29sZS5hZGQoXCJCdXJnZXIgdG9nZ2xlT25cIiwgXCJjbGlja1wiKTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgICAgIGlmIChTRVRUSU5HUy5zdHlsZSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKFNFVFRJTkdTLnN0eWxlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBGb3IgYnVyZ2VyIGFuaW1hdGlvblxyXG4gICAgICAgICAgICAgICAgICogQGltcG9ydCBcIi4uL3BsdWdpbnMvYW5pbWF0aW9uL25hdmJhci91bmRlci1oZWFkZXJcIjtcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgY2FzZSAndW5kZXItaGVhZGVyJzpcclxuICAgICAgICAgICAgICAgICAgICBEQVRBLiRtZW51ID0gREFUQS4kbWVudV9jb250YWluZXIub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBFTEVNRU5UUy4kaHRtbC5hZGRDbGFzcygnanNfbWVudS1hY3RpdmUnKTtcclxuICAgICAgICBFTEVNRU5UUy4kb3ZlcmxheS5vbignY2xpY2snLCB0b2dnbGVPdmVybGF5KTtcclxuXHJcbiAgICAgICAgbW92aW5nID0gdHJ1ZTtcclxuICAgICAgICBhY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICAvLyBERUJVRy52YXJpYWJsZS5hZGQoe1xyXG4gICAgICAgIC8vICAgICAnQnVyZ2VyIGFjdGl2ZSc6IGFjdGl2ZSxcclxuICAgICAgICAvLyAgICAgJ0J1cmdlciBtb3ZpbmcnOiBtb3ZpbmcsXHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIEVMRU1FTlRTLiRodG1sLmFkZENsYXNzKCdqc19tZW51LWFjdGl2ZS0tZW5kJyk7XHJcbiAgICAgICAgICAgIG1vdmluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgICAgIC8vIERFQlVHLnZhcmlhYmxlLmFkZCh7XHJcbiAgICAgICAgICAgIC8vICAgICAnQnVyZ2VyIG1vdmluZyc6IG1vdmluZyxcclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuXHJcbiAgICAgICAgfSwgU0VUVElOR1Mud2FpdCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgdG9nZ2xlT3ZlcmxheSA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgREVCVUcuY29uc29sZS5hZGQoXCJCdXJnZXIgb3ZlcmxheSB0b2dnbGVPZmZcIiwgXCJjbGlja1wiKTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgICAgIEVMRU1FTlRTLiRvdmVybGF5Lm9mZignY2xpY2snLCB0b2dnbGVPdmVybGF5KTtcclxuXHJcbiAgICAgICAgdG9nZ2xlT2ZmKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIGJ1cmdlckNsaWNrID0gKCkgPT4ge1xyXG5cclxuICAgICAgICBpZiAoIW1vdmluZykge1xyXG5cclxuICAgICAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKFwiQnVyZ2VyIGNsaWNrZWRcIiwgXCJjbGlja1wiKTtcclxuICAgICAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgICAgICAgICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgdG9nZ2xlT2ZmKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0b2dnbGVPbigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgREVCVUcuY29uc29sZS5hZGQoXCJCdXJnZXIgY2xpY2sgYmxvY2tlZC4gQnVyZ2VyIGlzIG1vdmluZ1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXJ0KCk7XHJcblxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gKGRhdGEpID0+IHtcclxuXHJcbiAgICB2YXIgXHJcbiAgICBTRVRUSU5HUyA9IHtcclxuICAgICAgICBzcHlUb3A6IHRydWUsXHJcbiAgICAgICAgb2Zmc2V0OiAxLFxyXG4gICAgICAgIHNweVRvcENsYXNzOiAnanNfc3RpY2t5LWVsZW1lbnQtLWFjdGl2ZScsXHJcbiAgICB9LFxyXG4gICAgRUxFTUVOVFMgPSBkYXRhLkVMRU1FTlRTLFxyXG4gICAgU0NST0xMID0gZGF0YS5TQ1JPTEwsXHJcbiAgICAkZWxlbWVudFNweSA9IGRhdGEuJGVsZW1lbnRTcHksXHJcbiAgICBEQVRBID0ge1xyXG4gICAgICAgIGhlaWdodDogbnVsbCxcclxuICAgICAgICBvZmZzZXQ6IG51bGwsXHJcbiAgICB9LFxyXG4gICAgYWN0aXZlID0gZmFsc2UsXHJcbiAgICBwb3NpdGlvbiA9IG51bGw7XHJcblxyXG4gICAgaWYgKGRhdGEuU0VUVElOR1MpIHtcclxuICAgICAgICAkLmV4dGVuZChEQVRBLCBkYXRhLlNFVFRJTkdTKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc3RhcnQgPSAoZGF0YSkgPT4ge1xyXG5cclxuICAgICAgICBpZiAoJGVsZW1lbnRTcHkubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZSBvcmllbnRhdGlvbmNoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgICAgICByZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoU0VUVElOR1Muc3B5VG9wKSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3B5VG9wKCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIEVMRU1FTlRTLiR3aW5kb3cub24oXCJzY3JvbGxcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNweVRvcCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7ICAgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgICAgICBERUJVRy5jb25zb2xlLmFkZChgU3RhcnQgc3RpY2t5LmpzIHtvZmZzZXQ6ICR7REFUQS5vZmZzZXR9OyB9YCk7XHJcbiAgICAgICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciByZWZyZXNoID0gKCkgPT4ge1xyXG4gICAgICAgIGNhbGN1bGF0ZUhlYWRlcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICghU0VUVElOR1Mub2Zmc2V0KSB7XHJcbiAgICAgICAgICAgIERBVEEub2Zmc2V0ID0gU0VUVElOR1Mub2Zmc2V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgREFUQS5vZmZzZXQgPSAkZWxlbWVudFNweS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgY2FsY3VsYXRlSGVhZGVyID0gKGRhdGEpID0+IHtcclxuXHJcbiAgICAgICAgcG9zaXRpb24gPSAkZWxlbWVudFNweS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgREFUQS5oZWlnaHQgPSAkZWxlbWVudFNweS5vdXRlckhlaWdodCh0cnVlKTtcclxuXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgLy8gREVCVUcudmFyaWFibGUuYWRkKHtcclxuICAgICAgICAvLyAgICAgXCJIZWFkZXIgaGVpZ2h0XCI6IERBVEEuaGVpZ2h0LFxyXG4gICAgICAgIC8vICAgICBcIkhlYWRlciBwb3NpdGlvblwiOiBwb3NpdGlvbixcclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBzcHlUb3AgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIGlmIChTQ1JPTEwudG9wID4gREFUQS5vZmZzZXQpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFhY3RpdmUpIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gRUxFTUVOVFMuJGhlYWRlclBsYWNlaG9sZGVyLmNzcyh7aGVpZ2h0OiBEQVRBLmhlaWdodH0pO1xyXG4gICAgICAgICAgICAgICAgRUxFTUVOVFMuJGh0bWwuYWRkQ2xhc3MoU0VUVElOR1Muc3B5VG9wQ2xhc3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyBFTEVNRU5UUy4kaGVhZGVyUGxhY2Vob2xkZXIuY3NzKHtoZWlnaHQ6IFwiXCJ9KTtcclxuICAgICAgICAgICAgICAgIEVMRU1FTlRTLiRodG1sLnJlbW92ZUNsYXNzKFNFVFRJTkdTLnNweVRvcENsYXNzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgLy8gREVCVUcudmFyaWFibGUuYWRkKHtcclxuICAgICAgICAvLyAgICdIZWFkZXIgYWN0aXZlJzogYWN0aXZlLFxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXJ0KCk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuXHJcbiAgICB9O1xyXG5cclxufTsiLCIvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxufHwgU21vb3RoIHNjcm9sbCB0byB0YXJnZXRcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbnx8IFJlcXVpcmVkXHJcbnx8ICogU0NST0xMXHJcbnx8ICogRUxFTUVOVFNcclxufHwgKiBGVU5DVElPTlNcclxufHxcclxufHwgKiBkYXRhLWVsZW1lbnQgLSBzZWxlY3QgZWxlbWVudHMgc2VwYXJhdGUgd2l0aCBjb21tYSAoICQoXCJkYXRhLWxlbWVudFwiKSApXHJcbnx8ICogZGF0YS10b2dnbGUgLSBzZWxlY3QgdHlwZSBvZiB0b2dnbGVcclxufHxcclxufHwgRGF0YS10b2dnbGUgdHlwZTpcclxufHwgKiBjb2xsYXBzZSAtIGNvbGxhcHNlIGRhdGEtZWxlbWVudCAoIHVzZSBsZXNzL2phdmFzY3JpcHQvX2NvbGxhcHNlLmxlc3MgY2xhc3MgKVxyXG58fCAqIHNvbWV0aGluZyBlbHNlIC0gdG9nZ2xlIGRhdGEtZWxlbWVudCB1c2luZyBjbGFzcyBvbiBkYXRhLXRvZ2dsZVxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cclxubW9kdWxlLmV4cG9ydHMgPSAoZGF0YSkgPT4ge1xyXG4gICAgXHJcbiAgICB2YXJcclxuICAgIFNDUk9MTCA9IGRhdGEuU0NST0xMLFxyXG4gICAgRUxFTUVOVFMgPSBkYXRhLkVMRU1FTlRTLFxyXG4gICAgRlVOQ1RJT05TID0gZGF0YS5GVU5DVElPTlMsXHJcbiAgICAvLyBhbGwgY2xpY2thYmxlIHNjcm9sbCBlbGVtZW50c1xyXG4gICAgJGVsZW1lbnRzID0gbnVsbCxcclxuICAgIC8vIGJvb2wgcGFnZSBpcyBzY3JvbGxcclxuICAgIGFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgIHZhclxyXG4gICAgU0VUVElOR1MgPSB7XHJcbiAgICAgICAgLy8gYWN0aXZlIGF1dG9tYXRpYyBzY3JvbGwgcGFnZSB0byBlbGVtZW50IHZpYSBVUkwgaGFzaFxyXG4gICAgICAgIGF1dG9TY3JvbGw6IGZhbHNlLFxyXG4gICAgICAgIC8vIGRpdmlkZSBkaXN0YW5jZSBieSB0aGlzIHZhbHVlIHRvIGNhbGN1bGF0ZSB0aW1lIHNjcm9sbFxyXG4gICAgICAgIHRpbWU6IDIsXHJcbiAgICAgICAgLy8gbWluIHRpbWUgc2Nyb2xsXHJcbiAgICAgICAgbWluVGltZTogNDAwLFxyXG4gICAgICAgIC8vIG1heCB0aW1lIHNjcm9sbFxyXG4gICAgICAgIG1heFRpbWU6IDEyMDAsXHJcbiAgICAgICAgLy8gcnVuIGF1dG9TY3JvbGwgd2hlbiBoYXNoIGluIFVSTCBpcyBiZWdpbiB3aXRoIHRoaXMgc3RyaW5nXHJcbiAgICAgICAgcHJlZml4QXV0b1Njcm9sbDogJ3Njcm9sbC0nXHJcbiAgICB9O1xyXG5cclxuICAgICQuZXh0ZW5kKCBTRVRUSU5HUywgZGF0YS5TRVRUSU5HUyApO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnQgZnVuY3Rpb25cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcclxuICAgICAqIHJlcGxhY2UgdmFsdWVzIGluIFNFVFRJTkdTIFxyXG4gICAgICovXHJcbiAgICB2YXJcclxuICAgIHN0YXJ0ID0gKGRhdGEpID0+IHtcclxuXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgREVCVUcuY29uc29sZS5hZGQoXCJTdGFydDogc2Nyb2xsVG9cIik7XHJcbiAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBpZiAoU0VUVElOR1MuYXV0b1Njcm9sbCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhdXRvU2Nyb2xsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZWZyZXNoKCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEF1dG9tYXRpYyBzY3JvbGwgcGFnZSB0byBlbGVtZW50IElEXHJcbiAgICAgKiB3aGVuIHVzZXIgdmlzaXQgcGFnZSB3aXRoIGhhc2hcclxuICAgICAqIGJlZ2luIHdpdGggU0VUVElOR1MucHJlZml4QXV0b1Njcm9sbFxyXG4gICAgICovXHJcbiAgICB2YXJcclxuICAgIGF1dG9TY3JvbGwgPSAoKSA9PiB7XHJcbiAgICAgICAgdmFyIFxyXG4gICAgICAgIGhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcclxuICAgICAgICBcclxuICAgICAgICAvLyBDaGVjayBpZiBwYWdlIG11c3QgdHJpZ2dlciBhdXRvU2Nyb2xsXHJcbiAgICAgICAgaWYoIGhhc2guc3RhcnRzV2l0aCggXCIjXCIgKyBTRVRUSU5HUy5wcmVmaXhBdXRvU2Nyb2xsICkgKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBGaXggYW5ub3lpbmcganVtcGluZyB3aGVuIHVzZXIgZGlzdHVyYiBzY3JvbGxcclxuICAgICAgICAgICAgRUxFTUVOVFMuJGJvZHkuc2Nyb2xsRGlzYWJsZSh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSBoYXNoIGZyb20gdXJsXHJcbiAgICAgICAgICAgIHZhciBcclxuICAgICAgICAgICAgY2xlYW5VcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3QgKyBsb2NhdGlvbi5wYXRobmFtZTtcclxuICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBkb2N1bWVudC50aXRsZSwgY2xlYW5VcmwpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIHRhcmdldCBJRCBmcm9tIGhhc2hcclxuICAgICAgICAgICAgdmFyIFxyXG4gICAgICAgICAgICB0YXJnZXRJRCA9IGhhc2guc3Vic3RyaW5nKGhhc2guaW5kZXhPZignLScpKzEsIGhhc2gubGVuZ2h0KTtcclxuXHJcbiAgICAgICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgICAgICBERUJVRy5jb25zb2xlLmFkZChcInNjcm9sbFRvLmpzIGF1dG8gdHJpZ2dlciBmdW5jdGlvbiBhdXRvU2Nyb2xsKCkuXCIsICdhdXRvJyk7XHJcbiAgICAgICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIEZpeCBhbm5veWluZyBqdW1waW5nIHdoZW4gcGFnZSBpcyBzdGlsbCBub3QgcmVhZHlcclxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgICAgIG9uKHRhcmdldElEKTtcclxuICAgICAgICAgICAgfSwgOTAwKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNjcm9sbCBmdW5jdGlvblxyXG4gICAgICogQHBhcmFtIHtFdmVudCBpbnRlcmZhY2V9IGV2ZW50IFxyXG4gICAgICogQHBhcmFtIHtqUXVlcnkgb2JqZWN0OyBTdHJpbmcgSUR9IHRhcmdldCBcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lIFxyXG4gICAgICovXHJcbiAgICB2YXJcclxuICAgIHNjcm9sbCA9IChldmVudCwgdGFyZ2V0ID0gZmFsc2UsIHRpbWUgPSBmYWxzZSkgPT4ge1xyXG4gICAgICAgIHZhclxyXG4gICAgICAgIHRhcmdldElELCAkdGFyZ2V0LCAkdGhpcztcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgZXZlbnQgYW5kIHJlbW92ZSBkZWZhdWx0IGFjdGlvblxyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICAgICAgREVCVUcuY29uc29sZS5hZGQoYENsaWNrIHNjcm9sbFRvOiBldmVudC5wcmV2ZW50RGVmYXVsdCgpYCwgJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgICAgICAgICAgJHRoaXMgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgdGFyZ2V0IGVsZW1lbnRcclxuICAgICAgICBpZiAoIXRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXRJRCA9IFwiI1wiICsgJHRoaXMuYXR0cihcImRhdGEtc2Nyb2xsXCIpO1xyXG4gICAgICAgICAgICAkdGFyZ2V0ID0gJCh0YXJnZXRJRCk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIGpRdWVyeSkge1xyXG4gICAgICAgICAgICAgICAgJHRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgICAgIHRhcmdldElEID0gXCIjXCIgKyAkdGFyZ2V0LmF0dHIoXCJJRFwiKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRJRCA9IFwiI1wiICsgdGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgJHRhcmdldCA9ICQodGFyZ2V0SUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiBzY3JvbGwgYW5pbWF0aW9uIGlzIGZyZWUgdG8gdXNlXHJcbiAgICAgICAgaWYgKCFhY3RpdmUpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrICR0YXJnZXQgZXhpc3RcclxuICAgICAgICAgICAgaWYgKCR0YXJnZXQubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQmxvY2sgb3RoZXIgc2Nyb2xsIHRyaWdnZXJzXHJcbiAgICAgICAgICAgICAgICBhY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEdyYWIgdGFyZ2V0IHRvcCBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgdmFyXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRQb3NpdGlvblRvcCA9ICR0YXJnZXQub2Zmc2V0KCkudG9wLFxyXG4gICAgICAgICAgICAgICAgLy8gU2Nyb2xsIHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUbyA9IHRhcmdldFBvc2l0aW9uVG9wOyAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHNjcm9sbFRpbWUgXHJcbiAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVGltZSA9IE1hdGgucm91bmQoTWF0aC5hYnModGFyZ2V0UG9zaXRpb25Ub3AgLSBTQ1JPTEwudG9wKSAvIFNFVFRJTkdTLnRpbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbFRpbWUgPCBTRVRUSU5HUy5taW5UaW1lKSBcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUaW1lID0gU0VUVElOR1MubWluVGltZTtcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzY3JvbGxUaW1lID4gU0VUVElOR1MubWF4VGltZSkgXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVGltZSA9IFNFVFRJTkdTLm1heFRpbWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICAgICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKGBDbGljayBzY3JvbGxUbzogc2Nyb2xsIHRvIGVsZW1lbnQge3RhcmdldDogPHN0cm9uZz4ke3RhcmdldElEfTwvc3Ryb25nPjsgc3BlZWQgPHN0cm9uZz4ke3Njcm9sbFRpbWV9bXM8L3N0cm9uZz47IHBvc2l0aW9uOiA8c3Ryb25nPiR7c2Nyb2xsVG99PC9zdHJvbmc+fWAsICdjbGljaycpO1xyXG4gICAgICAgICAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFuaW1hdGUgc2Nyb2xsXHJcbiAgICAgICAgICAgICAgICBFTEVNRU5UUy4kYm9keS5zY3JvbGxEaXNhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICBFTEVNRU5UUy4kcGFnZS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFRvLFxyXG4gICAgICAgICAgICAgICAgfSwgMTIwMCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIEVMRU1FTlRTLiRib2R5LnNjcm9sbERpc2FibGUoJ3VuZG8nKTtcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gRUxFTUVOVFMuJHBhZ2UuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgc2Nyb2xsVG9wOiB0YXJnZXRQb3NpdGlvblRvcCAtIEVMRU1FTlRTLiRoZWFkZXIub3V0ZXJIZWlnaHQodHJ1ZSksXHJcbiAgICAgICAgICAgICAgICAvLyB9LCBzY3JvbGxUaW1lLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgRlVOQ1RJT05TLm9uVXNlclNjcm9sbCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgICAgICAgICBERUJVRy5jb25zb2xlLmFkZChgRXJyb3Igc2Nyb2xsVG86IGVsZW1lbnQgPHN0cm9uZz4ke3RhcmdldElEfTwvc3Ryb25nPiBkb2Vzbid0IGV4aXN0YCwgJ2Vycm9yJyk7XHJcbiAgICAgICAgICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgZWxzZSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKGBXYXJuaW5nIHNjcm9sbFRvOiBzY3JvbGwgYW5pbWF0aW9uIHdvdWxkbid0IGZpbmlzaGAsICd3YXJuaW5nJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTY3JvbGwgdG8gZWxlbWVudFxyXG4gICAgICogQHBhcmFtIHtqUXVlcnkgb2JqZWN0OyBTdHJpbmcgSUR9IGVsZW1lbnQgXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGltZSBcclxuICAgICAqIEByZXR1cm4ge0Jvb2x9XHJcbiAgICAgKi9cclxuICAgIHZhclxyXG4gICAgb24gPSAoZWxlbWVudCwgdGltZSA9IGZhbHNlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNjcm9sbChmYWxzZSwgZWxlbWVudCwgdGltZSk7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJlZnJlc2ggYmluZGVkICRlbGVtZW50c1xyXG4gICAgICovXHJcbiAgICB2YXJcclxuICAgIHJlZnJlc2ggPSAoKSA9PiBcclxuICAgIHtcclxuXHJcbiAgICAgICAgaWYgKCRlbGVtZW50cykgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAkZWxlbWVudHMub2ZmKFwiY2xpY2tcIiwgc2Nyb2xsKTtcclxuXHJcbiAgICAgICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgICAgICBERUJVRy5jb25zb2xlLmFkZChcIlJlZnJlc2g6IHNjcm9sbFRvIHtsZW5ndGg6IFwiICsgJGVsZW1lbnRzLmxlbmd0aCArIFwiO31cIik7XHJcbiAgICAgICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgICRlbGVtZW50cyA9ICQoXCJbZGF0YS1zY3JvbGxdXCIpO1xyXG4gICAgICAgICRlbGVtZW50cy5vbihcImNsaWNrXCIsIHNjcm9sbCk7XHJcblxyXG4gICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKFwiRGF0YTogc2Nyb2xsVG8ge2xlbmd0aDogXCIgKyAkZWxlbWVudHMubGVuZ3RoICsgXCI7fVwiKTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXJ0KCk7XHJcbiAgXHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSAoZGF0YSkgPT4ge1xyXG5cclxuICB2YXJcclxuICAkaXRlbXMgPSBudWxsO1xyXG5cclxuICB2YXJcclxuICBUUkFOU0lUSU9OSEVJR0hULCBSRVNJWkU7XHJcblxyXG4gIHZhclxyXG4gIHN0YXJ0ID0gKCkgPT4ge1xyXG5cclxuICAgIFRSQU5TSVRJT05IRUlHSFQgPSBkYXRhLlRSQU5TSVRJT05IRUlHSFQ7XHJcbiAgICBSRVNJWkUgPSBkYXRhLlJFU0laRTtcclxuXHJcbiAgICAvLyBSRVNJWkUuYWRkKFwic2hvd01vcmVcIiwgKCkgPT4ge1xyXG4gICAgLy8gICByZWZyZXNoKCk7XHJcbiAgICAvLyB9KTtcclxuXHJcbiAgICByZWZyZXNoKCk7XHJcbiAgfTtcclxuXHJcbiAgdmFyXHJcbiAgcmVmcmVzaCA9ICgpID0+IHtcclxuICAgIGlmICgkaXRlbXMpIHtcclxuICAgICAgJGl0ZW1zLm9mZihcImNsaWNrXCIsIGNsaWNrKTtcclxuICAgIH1cclxuICAgICRpdGVtcyA9ICQoYFtkYXRhPSdzaG93TW9yZSddYCk7XHJcblxyXG4gICAgaWYgKCRpdGVtcy5sZW5ndGgpIHtcclxuICAgICAgJGl0ZW1zLmVhY2goIChpbmRleCwgZWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGNoZWNrVmlzaWJsZVNwYWNlKGVsZW1lbnQpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgfTtcclxuXHJcbiAgdmFyXHJcbiAgY2hlY2tWaXNpYmxlU3BhY2UgPSAoZWxlbWVudCkgPT4ge1xyXG4gICAgdmFyXHJcbiAgICAkdGhpcyA9ICQoZWxlbWVudCksXHJcbiAgICBkYXRhVGFyZ2V0ID0gJHRoaXMuYXR0cignZGF0YS10YXJnZXQnKSxcclxuICAgICR3cmFwLCAkY29udGFpbmVyO1xyXG5cclxuICAgIHN3aXRjaCAoZGF0YVRhcmdldCkge1xyXG4gICAgICBjYXNlIFwicHJldkVsZW1lbnRcIjpcclxuICAgICAgICAkd3JhcCA9ICR0aGlzLnByZXYoKTtcclxuICAgICAgICAkY29udGFpbmVyID0gJHdyYXAuZmluZChcIi5zaG93LW1vcmVfX2NvbnRlbnRcIikuZmlyc3QoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIm5leHRFbGVtZW50XCI6XHJcbiAgICAgICAgJHdyYXAgPSAkdGhpcy5uZXh0KCk7XHJcbiAgICAgICAgJGNvbnRhaW5lciA9ICR3cmFwLmZpbmQoXCIuc2hvdy1tb3JlX19jb250ZW50XCIpLmZpcnN0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBsZXQgXHJcbiAgICAgICAgd3JhcElkID0gJHRoaXMuYXR0cihgZGF0YS10YXJnZXRgKTtcclxuICAgICAgICAkd3JhcCA9ICQoYCMke3dyYXBJZH1gKTtcclxuICAgICAgICAkY29udGFpbmVyID0gJHdyYXAuZmluZChcIi5zaG93LW1vcmVfX2NvbnRlbnRcIikuZmlyc3QoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKCR3cmFwLm91dGVySGVpZ2h0KCB0cnVlICkgPCAkY29udGFpbmVyLm91dGVySGVpZ2h0KCB0cnVlICkpIHtcclxuICAgICAgJHRoaXMucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xyXG4gICAgICAkdGhpcy5vbihcImNsaWNrXCIsIHskdGhpc30sIGNsaWNrKTsgICAgICAgICAgXHJcbiAgICB9IFxyXG4gICAgZWxzZSB7XHJcbiAgICAgICR0aGlzLmFkZENsYXNzKFwiaGlkZVwiKTtcclxuICAgIH1cclxuXHJcbiAgfTtcclxuXHJcbiAgdmFyXHJcbiAgY2xpY2sgPSAocGFyYW1EYXRhKSA9PiB7XHJcbiAgICB2YXIgXHJcbiAgICBwYXJhbSA9IHBhcmFtRGF0YS5kYXRhLFxyXG4gICAgJHRoaXMgPSBwYXJhbS4kdGhpcyxcclxuICAgIGRhdGFUYXJnZXQgPSAkdGhpcy5hdHRyKGBkYXRhLXRhcmdldGApLFxyXG4gICAgJGNvbnRhaW5lcixcclxuICAgICR3cmFwO1xyXG5cclxuICAgIHN3aXRjaCAoZGF0YVRhcmdldCkge1xyXG4gICAgICBjYXNlIFwicHJldkVsZW1lbnRcIjpcclxuICAgICAgICAkd3JhcCA9ICR0aGlzLnByZXYoKTtcclxuICAgICAgICAkY29udGFpbmVyID0gJHdyYXAuZmluZChcIi5zaG93LW1vcmVfX2NvbnRlbnRcIikuZmlyc3QoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIm5leHRFbGVtZW50XCI6XHJcbiAgICAgICAgJHdyYXAgPSAkdGhpcy5uZXh0KCk7XHJcbiAgICAgICAgJGNvbnRhaW5lciA9ICR3cmFwLmZpbmQoXCIuc2hvdy1tb3JlX19jb250ZW50XCIpLmZpcnN0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICAkY29udGFpbmVyID0gJHRoaXM7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCR0aGlzLmhhc0NsYXNzKFwianNfYWN0aXZlXCIpKSB7XHJcbiAgICAgIG9mZigkdGhpcywgJHdyYXAsICRjb250YWluZXIpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZygkY29udGFpbmVyKTtcclxuICAgIG9uKCR0aGlzLCAkd3JhcCwgJGNvbnRhaW5lcik7XHJcbiAgfTtcclxuXHJcbiAgdmFyXHJcbiAgb24gPSAoJGxpbmssICRpdGVtLCAkY29udGFpbmVyKSA9PiB7XHJcblxyXG4gICAgJGxpbmsuYWRkQ2xhc3MoXCJqc19hY3RpdmVcIik7XHJcblxyXG4gICAgVFJBTlNJVElPTkhFSUdIVC5vbih7XHJcbiAgICAgICR0aGlzOiAkaXRlbSwgXHJcbiAgICAgICRjbGlja2VkOiAkbGluayxcclxuICAgICAgJGNvbnRhaW5lcjogJGNvbnRhaW5lciwgICAgICAgICAgICBcclxuICAgICAgY2FsbGJhY2s6ICgpID0+IHtcclxuICAgICAgICAkaXRlbS5hZGRDbGFzcyhcInNob3ctbW9yZS0tYWN0aXZlXCIpO1xyXG4gICAgICB9LCAgXHJcbiAgICB9KTtcclxuICB9O1xyXG4gIFxyXG4gIHZhclxyXG4gIG9mZiA9ICgkbGluaywgJGl0ZW0sICRjb250YWluZXIpID0+IHtcclxuXHJcbiAgICAkbGluay5yZW1vdmVDbGFzcyhcImpzX2FjdGl2ZVwiKTtcclxuXHJcbiAgICBUUkFOU0lUSU9OSEVJR0hULm9mZih7XHJcbiAgICAgICR0aGlzOiAkaXRlbSwgXHJcbiAgICAgICRjb250YWluZXI6ICRjb250YWluZXIsICAgIFxyXG4gICAgICBjYWxsYmFja0JlZm9yZTogKCkgPT4ge1xyXG4gICAgICAgICRpdGVtLnJlbW92ZUNsYXNzKFwic2hvdy1tb3JlLS1hY3RpdmVcIik7XHJcbiAgICAgIH0gXHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBzdGFydCgpO1xyXG5cclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IChkYXRhKSA9PiB7XHJcblxyXG4gIHZhciAgXHJcbiAgJEVMRU1FTlRTID0ge1xyXG4gICAgbGlua3M6IFtdLFxyXG4gIH0sXHJcbiAgREFUQSA9IG51bGwsXHJcbiAgU0VUVElOR1MgPSB7XHJcbiAgICBtYXRjaDoge1xyXG4gICAgICBzd2l0Y2g6IFwidGFiLXN3aXRjaFwiLFxyXG4gICAgICBmaWVsZDogXCJ0YWItZmllbGRcIixcclxuICAgICAgY29udGVudDogXCJ0YWItY29udGVudFwiLFxyXG4gICAgfSxcclxuICB9O1xyXG5cclxuICB2YXJcclxuICBzdGFydCA9ICgpID0+IHtcclxuICAgIFxyXG4gICAgJC5leHRlbmQoIFNFVFRJTkdTLCBkYXRhLlNFVFRJTkdTICk7XHJcblxyXG4gICAgcmVmcmVzaCgpO1xyXG4gIH07XHJcblxyXG4gIHZhclxyXG4gIHJlZnJlc2ggPSAoKSA9PiB7XHJcblxyXG4gICAgaWYgKCRFTEVNRU5UUy5saW5rcy5sZW5ndGgpIHtcclxuICAgICAgJEVMRU1FTlRTLmxpbmtzLm9mZihcImNsaWNrXCIsIGNoYW5nZVRhYik7XHJcbiAgICB9XHJcblxyXG4gICAgJEVMRU1FTlRTLmZpZWxkcyA9ICQoYC4ke1NFVFRJTkdTLm1hdGNoLmZpZWxkfWApO1xyXG5cclxuICAgIGZpbGxEYXRhYmFzZSgpO1xyXG5cclxuICAgIGlmICgkRUxFTUVOVFMubGlua3MubGVuZ3RoKSB7XHJcbiAgICAgICRFTEVNRU5UUy5saW5rcy5vbihcImNsaWNrXCIsIGNoYW5nZVRhYik7XHJcbiAgICB9XHJcblxyXG4gICAgLyogdGVzdC1jb2RlICovXHJcbiAgICBERUJVRy5jb25zb2xlLmFkZChgdGFicyA6IHJlZnJlc2gge2xlbmd0aCAkeyRFTEVNRU5UUy5maWVsZHMubGVuZ3RofX1gKTtcclxuICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuXHJcbiAgfTtcclxuXHJcbiAgdmFyXHJcbiAgZmlsbERhdGFiYXNlID0gKCkgPT4ge1xyXG5cclxuICAgIERBVEEgPSB7fTtcclxuXHJcbiAgICAkRUxFTUVOVFMuZmllbGRzLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XHJcbiAgICAgIFxyXG4gICAgICB2YXJcclxuICAgICAgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICBmaWVsZCA9ICR0aGlzLmF0dHIoXCJkYXRhLXRhYnMtZmllbGRcIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICBEQVRBW2ZpZWxkXSA9IHtcclxuICAgICAgICBzd2l0Y2hBY3RpdmU6IG51bGwsXHJcbiAgICAgICAgY29udGVudEFjdGl2ZTogbnVsbCxcclxuICAgICAgfTtcclxuICAgICAgXHJcbiAgICB9KTtcclxuXHJcbiAgfTtcclxuXHJcbiAgdmFyXHJcbiAgY2hhbmdlVGFiID0gKCkgPT4ge1xyXG5cclxuXHJcblxyXG4gIH07XHJcblxyXG4gIFxyXG4gICAgLy8gLy8gRnVuY3Rpb24gZm9yIGNsaWNrZWQgZWxlbWVudHNcclxuICAgIC8vIG9uQ2xpY2s6IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gICB2YXIgc2VsZiA9IE1haW4udGFicztcclxuICAgICAgXHJcbiAgICAvLyAgIHZhciAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAvLyAgICAgICBkYXRhVGFicyA9ICR0aGlzLmF0dHIoJ2RhdGEtdGFicycpLFxyXG4gICAgLy8gICAgICAgZGF0YVRhYnNTdGVwID0gJHRoaXMuYXR0cignZGF0YS10YWJzLXN0ZXAnKTtcclxuICBcclxuICAgIC8vICAgaWYgKHNlbGYuZGF0YVtkYXRhVGFic10uYWN0aXZlICE9PSBkYXRhVGFic1N0ZXApIHtcclxuICBcclxuICAgIC8vICAgICB2YXIgZGF0YSA9IHNlbGYuZGF0YVtkYXRhVGFic10sXHJcbiAgICAvLyAgICAgICAgIGNvbnRlbnRIZWlnaHQgPSBkYXRhLiRhY3RpdmVDb250ZW50Lm91dGVySGVpZ2h0KCB0cnVlICk7XHJcbiAgXHJcbiAgICAvLyAgICAgaWYgKCFkYXRhLmJsb2NrKSB7XHJcbiAgICAvLyAgICAgICBkYXRhLmJsb2NrID0gdHJ1ZTtcclxuICBcclxuICAgIC8vICAgICAgIHZhciAkY2xpY2tlZFRhYiA9IGRhdGEuJGl0ZW1zLmVxKGRhdGFUYWJzU3RlcCk7XHJcbiAgICBcclxuICAgIC8vICAgICAgICRjbGlja2VkVGFiLmFkZENsYXNzKFwianNfdGFicy0tYWN0aXZlXCIpO1xyXG4gIFxyXG4gICAgLy8gICAgICAgZGF0YS4kYWN0aXZlQ29udGVudC5jc3Moe2hlaWdodDogY29udGVudEhlaWdodH0pO1xyXG4gICAgLy8gICAgICAgZGF0YS4kY29udGVudC5jc3Moe2hlaWdodDogY29udGVudEhlaWdodH0pO1xyXG4gICAgLy8gICAgICAgZGF0YS4kYWN0aXZlQ29udGVudC5yZW1vdmVDbGFzcyhcImpzX3RhYnMtLWFjdGl2ZVwiKTtcclxuICAgIFxyXG4gICAgLy8gICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICBcclxuICAgIC8vICAgICAgICAgZGF0YS4kYWN0aXZlQ29udGVudC5jc3MoJ2hlaWdodCcsICcnKTtcclxuICAgIC8vICAgICAgICAgZGF0YS4kYWN0aXZlVGFiLnJlbW92ZUNsYXNzKFwianNfdGFicy0tYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICBcclxuICAgIC8vICAgICAgICAgICBkYXRhLiRhY3RpdmVDb250ZW50ID0gZGF0YS4kY29udGVudEl0ZW1zLmVxKGRhdGFUYWJzU3RlcCk7XHJcbiAgICAvLyAgICAgICAgICAgZGF0YS4kYWN0aXZlVGFiID0gJGNsaWNrZWRUYWI7XHJcbiAgICBcclxuICAgIC8vICAgICAgICAgICBjb250ZW50SGVpZ2h0ID0gZGF0YS4kYWN0aXZlQ29udGVudC5jaGlsZHJlbigpLm91dGVySGVpZ2h0KCB0cnVlICk7XHJcbiAgICAvLyAgICAgICAgICAgZGF0YS4kY29udGVudC5jc3Moe2hlaWdodDogY29udGVudEhlaWdodH0pO1xyXG4gICAgLy8gICAgICAgICAgIGRhdGEuJGFjdGl2ZUNvbnRlbnQuY3NzKHtoZWlnaHQ6IGNvbnRlbnRIZWlnaHR9KTtcclxuICAgIFxyXG4gICAgLy8gICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgXHJcbiAgICAvLyAgICAgICAgICAgICBkYXRhLiRhY3RpdmVDb250ZW50LmFkZENsYXNzKFwianNfdGFicy0tYWN0aXZlXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgZGF0YS4kYWN0aXZlQ29udGVudC5jc3MoJ2hlaWdodCcsICcnKTtcclxuICAgIC8vICAgICAgICAgICAgIGRhdGEuJGNvbnRlbnQuY3NzKCdoZWlnaHQnLCAnJyk7XHJcbiAgICBcclxuICAgIC8vICAgICAgICAgICAgIGRhdGEuYmxvY2sgPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgIC8vICAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICBcclxuICAgIC8vICAgICAgICAgfSwgMjAwKTtcclxuICAgIFxyXG4gICAgLy8gICAgICAgfSwgMSk7XHJcbiAgXHJcbiAgICAvLyAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgIC8vICAgICAgIGxldCBuYW1lID0gJ1RhYnMgJyArIGRhdGFUYWJzICsgJyBhY3RpdmUnO1xyXG4gICAgLy8gICAgICAgbGV0IGRlYnVnT2JqZWN0ID0ge307XHJcbiAgICAvLyAgICAgICBkZWJ1Z09iamVjdFtuYW1lXSA9IGRhdGFUYWJzU3RlcDtcclxuICAgIC8vICAgICAgIE1haW4uZGVidWdWYXJpYWJsZXMuYWRkKGRlYnVnT2JqZWN0KTtcclxuICAgIC8vICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICBcclxuICAgIC8vICAgICB9IFxyXG4gICAgLy8gICAgIGRhdGEuYWN0aXZlID0gZGF0YVRhYnNTdGVwO1xyXG4gICAgLy8gICB9XHJcbiAgXHJcbiAgICAvLyAgIHJldHVybiBmYWxzZTtcclxuICAgIC8vIH0sXHJcbiAgXHJcbiAgICAvLyBhZGQoZGF0YVRhYnMsIHNldHRpbmdzID0gbnVsbCkge1xyXG5cclxuICAgIC8vICAgdmFyIHNlbGYgPSBNYWluLnRhYnM7XHJcbiAgXHJcbiAgICAvLyAgIHZhciAkaXRlbXMgPSAkKCdbZGF0YS10YWJzPVwiJysgZGF0YVRhYnMgKydcIl0nKTtcclxuICBcclxuICAgIC8vICAgaWYgKCRpdGVtcy5sZW5ndGgpIHtcclxuICBcclxuICAgIC8vICAgICB2YXIgJGNvbnRlbnQgPSAkKCdbZGF0YS10YWJzLWNvbnRlbnQ9XCInKyBkYXRhVGFicyArJ1wiXScpLFxyXG4gICAgLy8gICAgICAgICBvdXRwdXQgPSB7fTtcclxuICBcclxuICAgIC8vICAgICBvdXRwdXQgPSB7fTtcclxuICAgIC8vICAgICBvdXRwdXQuJGl0ZW1zID0gJGl0ZW1zO1xyXG4gICAgLy8gICAgIG91dHB1dC4kY29udGVudCA9ICRjb250ZW50O1xyXG4gICAgLy8gICAgIG91dHB1dC4kY29udGVudEl0ZW1zID0gJGNvbnRlbnQuZmluZChcIltkYXRhLXRhYnMtY29udGVudC1zdGVwXVwiKTtcclxuICAgIC8vICAgICBvdXRwdXQuYmxvY2sgPSBmYWxzZTtcclxuICBcclxuICAgIC8vICAgICB2YXIgJGFjdGl2ZUNvbnRlbnQgPSAkY29udGVudC5maW5kKFwiLmpzX3RhYnMtLWFjdGl2ZVwiKTtcclxuICAgICAgICBcclxuICAgIC8vICAgICBpZiAoJGFjdGl2ZUNvbnRlbnQubGVuZ3RoKSB7XHJcbiAgICAvLyAgICAgICBvdXRwdXQuJGFjdGl2ZUNvbnRlbnQgPSAkYWN0aXZlQ29udGVudDtcclxuICAgIC8vICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgb3V0cHV0LiRhY3RpdmVDb250ZW50ID0gZmFsc2U7XHJcbiAgICAvLyAgICAgfVxyXG4gIFxyXG4gICAgLy8gICAgIHZhciAkYWN0aXZlVGFiID0gJGl0ZW1zLnBhcmVudCgpLmZpbmQoXCIuanNfdGFicy0tYWN0aXZlXCIpO1xyXG4gICAgICAgIFxyXG4gICAgLy8gICAgIGlmICgkYWN0aXZlVGFiLmxlbmd0aCkge1xyXG4gICAgLy8gICAgICAgb3V0cHV0LiRhY3RpdmVUYWIgPSAkYWN0aXZlVGFiO1xyXG4gICAgLy8gICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICBvdXRwdXQuJGFjdGl2ZVRhYiA9IGZhbHNlO1xyXG4gICAgLy8gICAgIH1cclxuICBcclxuICAgIC8vICAgICBzZWxmLmRhdGFbZGF0YVRhYnNdID0gb3V0cHV0O1xyXG4gIFxyXG4gICAgLy8gICAgICRpdGVtcy5vbihcImNsaWNrXCIsIHNlbGYub25DbGljayk7XHJcbiAgXHJcbiAgICAvLyAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAvLyAgICAgaWYgKCh0eXBlb2Ygb3V0cHV0LiRhY3RpdmVUYWIgPT09ICdvYmplY3QnKSArICh0eXBlb2Ygb3V0cHV0LiRhY3RpdmVDb250ZW50ID09PSAnb2JqZWN0JykgPT09IDIpIHtcclxuICAgIC8vICAgICAgIGxldCBuYW1lID0gXCJUYWJzIFwiICsgZGF0YVRhYnMgKyBcIiBhY3RpdmVcIjtcclxuICAgIC8vICAgICAgIGxldCBkZWJ1Z09iamVjdCA9IHt9O1xyXG4gICAgLy8gICAgICAgZGVidWdPYmplY3RbbmFtZV0gPSBvdXRwdXQuJGFjdGl2ZVRhYi5hdHRyKFwiZGF0YS10YWJzLXN0ZXBcIik7XHJcbiAgICAvLyAgICAgICBNYWluLmRlYnVnVmFyaWFibGVzLmFkZChkZWJ1Z09iamVjdCk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIE1haW4uZGVidWdDb25zb2xlLmFkZChcIkFkZCB0YWJzICdcIiArIGRhdGFUYWJzICsgXCInIHtsZW5ndGg6IFwiKyAkaXRlbXMubGVuZ3RoICtcIjt9XCIpO1xyXG4gICAgLy8gICAgIGlmICgkaXRlbXMubGVuZ3RoICE9PSBvdXRwdXQuJGNvbnRlbnRJdGVtcy5sZW5ndGgpIHtcclxuICAgIC8vICAgICAgIE1haW4uZGVidWdDb25zb2xlLmFkZChcIlRhYnMgJ1wiICsgZGF0YVRhYnMgKyBcIicgLSBsZW5ndGggZG8gbm90IG1hdGNoIHt0YWJzOiBcIiArICRpdGVtcy5sZW5ndGggKyBcIjsgY29udGVudHM6IFwiICsgb3V0cHV0LiRjb250ZW50SXRlbXMubGVuZ3RoICsgXCI7fVwiLCBcIndhcm5pbmdcIik7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIGlmICgodHlwZW9mIG91dHB1dC4kYWN0aXZlVGFiID09PSAnb2JqZWN0JykgKyAodHlwZW9mIG91dHB1dC4kYWN0aXZlQ29udGVudCA9PT0gJ29iamVjdCcpID09PSAxKSB7XHJcbiAgICAvLyAgICAgICBNYWluLmRlYnVnQ29uc29sZS5hZGQoXCJUYWJzICdcIiArIGRhdGFUYWJzICsgXCInIC0gYWN0aXZlIGNsYXNzIGRvIG5vdCBtYXRjaCB7YWN0aXZlVGFiOiBcIiArIG91dHB1dC4kYWN0aXZlVGFiICsgXCI7ICRhY3RpdmVDb250ZW50OiBcIiArIG91dHB1dC4kYWN0aXZlQ29udGVudCArIFwiO31cIiwgXCJ3YXJuaW5nXCIpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgXHJcbiAgICAvLyAgIH1cclxuICBcclxuICAgIC8vIH1cclxuXHJcbiAgICBzdGFydCgpO1xyXG5cclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IChkYXRhKSA9PiB7XHJcblxyXG4gICAgdmFyXHJcbiAgICBEQVRBID0gW10sICAgICAgLyogT3BlbmVkICh0cmFuc2l0aW9uZWQgb24pIGpRdWVyeSBlbGVtZW50cyAqL1xyXG4gICAgQlJPV1NFUjsgICAgICAgIC8qIGJyb3dzZXIuanMgZGF0YSAqL1xyXG5cclxuICAgIHZhclxyXG4gICAgc3RhcnQgPSAoKSA9PiB7XHJcbiAgICAgICAgQlJPV1NFUiA9IGRhdGEuQlJPV1NFUjtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUb2dnbGUgdHJhbnNpdGlvbiBoZWlnaHRcclxuICAgICAqL1xyXG4gICAgdmFyXHJcbiAgICB0b2dnbGUgPSAob3B0aW9ucykgPT4ge1xyXG5cclxuICAgICAgICBsZXRcclxuICAgICAgICBhY3RpdmUgPSBudWxsO1xyXG5cclxuICAgICAgICAkLmVhY2goREFUQSwgZnVuY3Rpb24gKGluZGV4SW5BcnJheSwgdmFsdWVPZkVsZW1lbnQpIHsgXHJcbiAgICAgICAgICAgICBpZiAoIG9wdGlvbnMuJGNsaWNrZWQuaXModmFsdWVPZkVsZW1lbnQpICkge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlID0gdmFsdWVPZkVsZW1lbnQ7ICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAgICAgICAgIFxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIERBVEEuc3BsaWNlKCBvcHRpb25zLiRjbGlja2VkLCAxICk7ICAgICBcclxuICAgICAgICAgICAgb2ZmKG9wdGlvbnMpOyAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIERBVEEucHVzaCggb3B0aW9ucy4kY2xpY2tlZCApOyAgIFxyXG4gICAgICAgICAgICBvbihvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSB0cmFuc2l0aW9uXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBcclxuICAgICAqICR0aGlzIHtqUXVlcnkgb2JqZWN0fSBcclxuICAgICAqIHRpbWUge051bWJlcn1cclxuICAgICAqIGNhbGxiYWNrIHtGdW5jdGlvbn0gXHJcbiAgICAgKi9cclxuICAgIHZhclxyXG4gICAgb24gPSAocGFyYW0pID0+IHtcclxuICAgICAgICB2YXJcclxuICAgICAgICAkY2hpbGQsIGhlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKHBhcmFtLiRjb250YWluZXIpIHtcclxuICAgICAgICAgICAgaGVpZ2h0ID0gcGFyYW0uJGNvbnRhaW5lci5jaGlsZHJlbigpLm91dGVySGVpZ2h0KHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRjaGlsZCA9IHBhcmFtLiR0aGlzLmNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIGhlaWdodCA9ICRjaGlsZC5vdXRlckhlaWdodCh0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKGBDbGlja2VkIFwiU2hvdyBtb3JlXCIgb24geyRjb250YWluZXIgJHtoZWlnaHR9fWAsIFwiY2xpY2tcIik7XHJcbiAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgICAgICBwYXJhbS4kY2xpY2tlZFxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoXCJqc19leHBhbmRfX2xpbmstLWFjdGl2ZVwiKTtcclxuXHJcbiAgICAgICAgcGFyYW0uJGNvbnRhaW5lclxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoXCJqc190cmFuc2l0aW9uSGVpZ2h0XCIpXHJcbiAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsIGhlaWdodClcclxuICAgICAgICAgICAgLm9uZShCUk9XU0VSLnRyYW5zaXRpb25FdmVudCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBwYXJhbS4kY29udGFpbmVyXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwianNfdHJhbnNpdGlvbkhlaWdodFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhcImpzX2V4cGFuZF9fY29udGFpbmVyLS1hY3RpdmVcIilcclxuICAgICAgICAgICAgICAgICAgICAuY3NzKCdoZWlnaHQnLCAnJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKHBhcmFtLmNhbGxiYWNrKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXJcclxuICAgIG9mZiA9IChwYXJhbSkgPT4ge1xyXG5cclxuICAgICAgICB2YXJcclxuICAgICAgICBoZWlnaHQgPSBwYXJhbS4kY29udGFpbmVyLm91dGVySGVpZ2h0KHRydWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKGBDbGlja2VkIFwiU2hvdyBtb3JlXCIgb2ZmYCwgXCJjbGlja1wiKTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgICAgIHBhcmFtLiRjbGlja2VkXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcImpzX2V4cGFuZF9fbGluay0tYWN0aXZlXCIpO1xyXG4gICAgICAgXHJcbiAgICAgICAgcGFyYW0uJGNvbnRhaW5lclxyXG4gICAgICAgICAgICAuY3NzKCdoZWlnaHQnLCBoZWlnaHQpXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcImpzX2V4cGFuZF9fY29udGFpbmVyLS1hY3RpdmVcIilcclxuICAgICAgICAgICAgLmFkZENsYXNzKFwianNfdHJhbnNpdGlvbkhlaWdodFwiKVxyXG4gICAgICAgICAgICAuY3NzKCdoZWlnaHQnLCAnJylcclxuICAgICAgICAgICAgLm9uZShCUk9XU0VSLnRyYW5zaXRpb25FdmVudCwgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIHBhcmFtLiRjb250YWluZXJcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJqc19leHBhbmRfX2NvbnRhaW5lci0tY2xvc2UganNfdHJhbnNpdGlvbkhlaWdodFwiKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbS5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIChwYXJhbS5jYWxsYmFjaygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBzdGFydChkYXRhKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHRvZ2dsZTogdG9nZ2xlLFxyXG4gICAgICAgIG9uOiBvbixcclxuICAgICAgICBvZmY6IG9mZixcclxuICAgIH07XHJcblxyXG59O1xyXG4iXX0=
