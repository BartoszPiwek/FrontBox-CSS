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
        DEVICE: DEVICE,
        ELEMENTS: ELEMENTS,
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
        RESIZE: RESIZE,
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
     * Sticky Spy
     */
    var stickySpy = require('./frontbox/sticky-spy')({
        SCROLL: SCROLL,
        ELEMENTS: ELEMENTS,
        DEVICE: DEVICE,
        DATA: {
            'stickySpy': {
                $item: $(`#stickySpy`),
                $container: $(`#stickySpyContainer`),
            }
        }
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

},{"./frontbox/bind/resize":2,"./frontbox/data/browser":3,"./frontbox/data/device":4,"./frontbox/data/scroll":5,"./frontbox/debug/console":6,"./frontbox/debug/variables":7,"./frontbox/functions":8,"./frontbox/jquery/scrollBlock":9,"./frontbox/navbar/burgerMenu":10,"./frontbox/navbar/sticky":11,"./frontbox/scrollTo":12,"./frontbox/showMore":13,"./frontbox/sticky-spy":14,"./frontbox/tabs":15,"./frontbox/transitionHeight":16}],2:[function(require,module,exports){
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
    ELEMENTS = null,
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
    };

    var
    DEVICE = data.DEVICE,
    ELEMENTS = data.ELEMENTS;



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
        DATA.begin = DATA.top;

        if (ELEMENTS.$header.length) {
            DATA.begin += ELEMENTS.$header.outerHeight( true );
        }

        DATA.bottom = DATA.top + DEVICE.height;

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

        /* Remove duplicate */
        remove(dataName);
        
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

    /* Remove data in content */
    const
    remove = (dataName) => {
        if (typeof CONTENT[dataName] != "undefined") {
            delete CONTENT[dataName];
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
        remove: remove,
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
        DEBUG.variable.add(`Burger`, {
            'active': active,
            'moving': moving,
        });
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
module.exports = (argument) => {
    
    var 
    SCROLL              = null;
    ELEMENTS            = null;
    DEVICE              = null;
    RESIZE              = null;

    var
    DATA = {},
    activeModule = false;

    var
    CLASS = {
        fixed           : `js-sticky-spy--fixed`,
        bottom          : `js-sticky-spy--bottom`,
    };

    /* Start module */
    const
    start = () => {

        /* Prepare arguments data */
        SCROLL = argument.SCROLL;
        ELEMENTS = argument.ELEMENTS;
        DATA = argument.DATA;
        DEVICE = argument.DEVICE;
        RESIZE = argument.RESIZE;

        /* Run */
        refresh();

        if (activeModule) {
            /* Bind */
            RESIZE.add('stickySpy', refresh, 'all');
            ELEMENTS.$window.scroll( scroll );
        }
    };

    /* Refresh module */
    const
    refresh = () => {

        for (const key in DATA) {
            if (DATA.hasOwnProperty(key)) {
                const element = DATA[key];
                
                if (element.$item.length) {

                    activeModule = true;

					/* Clean style */
					element.active = false;
					element.$item.removeClass(`${CLASS.bottom} ${CLASS.run}`);

					/* Prepare calculate */
					let
					containerOffset = element.$container.offset(),
					containerHeight = element.$container.outerHeight(true),
					itemOffset = element.$item.offset(),
					itemHeight = element.$item.outerHeight(true);

					/* Calculate container */
					element.container = {
						height: containerHeight,
						width: element.$container.outerWidth(true),
						offset: {
							top             : containerOffset.top,
							bottom          : containerOffset.top + containerHeight,
							left            : containerOffset.left,
						},
					};

                    /* Calculate item */
					element.item = {
						height: itemHeight,
						offset: {
							top             : itemOffset.top,
							bottom          : itemOffset.top + itemHeight,
						},
					};

					/* Set style to item */
                    element.$item.css({
                        width               : element.container.width,
                        left				: element.container.offset.left,
                    });

                    /* test-code */
                    DEBUG.variable.add(`Sticky Spy ${key}`, element.item.offset);
                    /* end-test-code */
                }
            }
        }
        if (activeModule) {
            scroll();
        }
    };

    const
    scroll = () => {

        for (const key in DATA) {
            const element = DATA[key];

			/* Prepare calculate */
            let
            offset = element.$item.offset();

			element.item.offset.top = offset.top;
			element.item.offset.bottom = offset.top + element.item.height;

            // debugger;

            let
            isBottom = element.item.height + SCROLL.top >= element.container.offset.bottom && SCROLL.bottom > element.container.offset.bottom,
            isTop = element.active && !isBottom && element.item.offset.top <= element.container.offset.top && SCROLL.begin <= element.container.offset.top,
            isFixed = element.active != 1 && !isBottom && SCROLL.begin > element.container.offset.top;

            // Check top position
			if (isFixed) {
				element.$item.addClass(`${CLASS.fixed}`).removeClass(`${CLASS.bottom}`);
                element.active = 1;
                
                element.$item.css({
                    top: $('#header').outerHeight( true ),
                });
			}
			if (isTop) {
				element.$item.removeClass(`${CLASS.bottom} ${CLASS.fixed}`);
				element.active = false;
            }

            // Check bottom position
            if (isBottom && element.active != 2) {
                element.$item.addClass(`${CLASS.bottom}`).removeClass(`${CLASS.fixed}`);
                element.active = 2;
            } 

            /* test-code */
            DEBUG.variable.refresh(`Sticky Spy ${key}`);
            /* end-test-code */
        }
    };

    start();

    return DATA;
};
},{}],15:[function(require,module,exports){
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
},{}],16:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL2Zyb250Ym94L2JpbmQvcmVzaXplLmpzIiwic3JjL2pzL2Zyb250Ym94L2RhdGEvYnJvd3Nlci5qcyIsInNyYy9qcy9mcm9udGJveC9kYXRhL2RldmljZS5qcyIsInNyYy9qcy9mcm9udGJveC9kYXRhL3Njcm9sbC5qcyIsInNyYy9qcy9mcm9udGJveC9kZWJ1Zy9jb25zb2xlLmpzIiwic3JjL2pzL2Zyb250Ym94L2RlYnVnL3ZhcmlhYmxlcy5qcyIsInNyYy9qcy9mcm9udGJveC9mdW5jdGlvbnMuanMiLCJzcmMvanMvZnJvbnRib3gvanF1ZXJ5L3Njcm9sbEJsb2NrLmpzIiwic3JjL2pzL2Zyb250Ym94L25hdmJhci9idXJnZXJNZW51LmpzIiwic3JjL2pzL2Zyb250Ym94L25hdmJhci9zdGlja3kuanMiLCJzcmMvanMvZnJvbnRib3gvc2Nyb2xsVG8uanMiLCJzcmMvanMvZnJvbnRib3gvc2hvd01vcmUuanMiLCJzcmMvanMvZnJvbnRib3gvc3RpY2t5LXNweS5qcyIsInNyYy9qcy9mcm9udGJveC90YWJzLmpzIiwic3JjL2pzL2Zyb250Ym94L3RyYW5zaXRpb25IZWlnaHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDNVJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL09BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyoqXHJcbiAqIExpYnNcclxuICovXHJcbi8vIGdsb2JhbC4kID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XHJcbi8vIGdsb2JhbC5qUXVlcnkgPSAkO1xyXG4vLyBnbG9iYWwuQ29va2llcyA9IHJlcXVpcmUoJ2pzLWNvb2tpZScpO1xyXG4vLyByZXF1aXJlKCdzbGljay1jYXJvdXNlbCcpO1xyXG4vLyByZXF1aXJlKCdzZWxlY3QyJykoKTtcclxuLy8gcmVxdWlyZSgnLi9mcm9udGJveC9saWJzL2dldFN0eWxlJyk7XHJcbi8vIHZhciBcclxuLy8gU2hhcmVyID0gcmVxdWlyZSgnc2xpY2stY2Fyb3VzZWwnKTsgLy8gaHR0cDovL2VsbGlzb25sZWFvLmdpdGh1Yi5pby9zaGFyZXIuanMvXHJcblxyXG4vKipcclxuICogalF1ZXJ5IHBsdWdpbnNcclxuICovXHJcbnJlcXVpcmUoJy4vZnJvbnRib3gvanF1ZXJ5L3Njcm9sbEJsb2NrJykoKTtcclxuXHJcbihmdW5jdGlvbigkLCBfKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbGVtZW50c1xyXG4gICAgICovXHJcbiAgICB2YXIgXHJcbiAgICBFTEVNRU5UUyA9IHtcclxuICAgICAgICAkYm9keTogJChcImJvZHlcIiksXHJcbiAgICAgICAgJGhlYWRlcjogJChcIiNoZWFkZXJcIiksXHJcbiAgICAgICAgJGhlYWRlclBsYWNlaG9sZGVyOiAkKFwiI2hlYWRlci1wbGFjZWhvbGRlclwiKSxcclxuICAgICAgICAkd2luZG93OiAkKHdpbmRvdyksXHJcbiAgICAgICAgJG92ZXJsYXk6ICQoXCIjcGFnZS1vdmVybGF5XCIpLFxyXG4gICAgICAgICRodG1sOiAkKCdodG1sJyksXHJcbiAgICAgICAgJHBhZ2U6ICQoJ2h0bWwsIGJvZHknKSxcclxuICAgIH07XHJcblxyXG4gICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAvKipcclxuICAgICAqIERlYnVnXHJcbiAgICAgKi9cclxuICAgIGdsb2JhbC5ERUJVRyA9IHt9O1xyXG5cclxuICAgIGdsb2JhbC5ERUJVRy5jb25zb2xlID0gcmVxdWlyZSgnLi9mcm9udGJveC9kZWJ1Zy9jb25zb2xlJykoe1xyXG4gICAgICAgIC8vIG9wZW46IHRydWUsXHJcbiAgICAgICAgRUxFTUVOVFM6IEVMRU1FTlRTLFxyXG4gICAgfSk7XHJcbiAgICBnbG9iYWwuREVCVUcudmFyaWFibGUgPSByZXF1aXJlKCcuL2Zyb250Ym94L2RlYnVnL3ZhcmlhYmxlcycpKHtcclxuICAgICAgICBPUFRJT05TOiB7XHJcbiAgICAgICAgICAgIG9wZW46IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBFTEVNRU5UUzogRUxFTUVOVFMsXHJcbiAgICB9KTtcclxuICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXF1aXJlZFxyXG4gICAgICovXHJcblxyXG4gICAgLyogQ1NTIFZhcmlhYmxlcyAqL1xyXG4gICAgY29uc3RcclxuICAgIHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCc6cm9vdCcpLFxyXG4gICAgQ1NTID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUocm9vdCksXHJcbiAgICBCUkVBS1BPSU5UUyA9IHtcclxuICAgICAgICBkZXNrdG9wOiBOdW1iZXIoQ1NTLmdldFByb3BlcnR5VmFsdWUoXCItLWRlc2t0b3BcIikpLFxyXG4gICAgICAgIHRhYmxldDogTnVtYmVyKENTUy5nZXRQcm9wZXJ0eVZhbHVlKFwiLS10YWJsZXRcIikpLFxyXG4gICAgICAgIGZhYmxldDogTnVtYmVyKENTUy5nZXRQcm9wZXJ0eVZhbHVlKFwiLS1mYWJsZXRcIikpLFxyXG4gICAgICAgIG1vYmlsZTogTnVtYmVyKENTUy5nZXRQcm9wZXJ0eVZhbHVlKFwiLS1tb2JpbGVcIikpLFxyXG4gICAgfTtcclxuXHJcbiAgICAvKiBSZXNpemUgKi9cclxuICAgIHZhciBSRVNJWkUgPSByZXF1aXJlKCcuL2Zyb250Ym94L2JpbmQvcmVzaXplJykoe1xyXG4gICAgICAgIEVMRU1FTlRTOiBFTEVNRU5UUyxcclxuICAgICAgICB0ZW1wbGF0ZToge1xyXG4gICAgICAgICAgICAvLyBsb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgbG9hZGluZzogYDxkaXYgY2xhc3M9XCJhbmltYXRpb24tZG9udXQtc3Bpbm5lclwiPjwvZGl2PmAsXHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBERVZJQ0UgPSByZXF1aXJlKCcuL2Zyb250Ym94L2RhdGEvZGV2aWNlJykoe1xyXG4gICAgICAgIEVMRU1FTlRTOiBFTEVNRU5UUyxcclxuICAgICAgICBSRVNJWkU6IFJFU0laRSxcclxuICAgICAgICBCUkVBS1BPSU5UUzogQlJFQUtQT0lOVFMsXHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgdmFyIEZVTkNUSU9OUyA9IHJlcXVpcmUoJy4vZnJvbnRib3gvZnVuY3Rpb25zJyk7XHJcblxyXG4gICAgdmFyIEJST1dTRVIgPSByZXF1aXJlKCcuL2Zyb250Ym94L2RhdGEvYnJvd3NlcicpKCk7XHJcbiAgICB2YXIgU0NST0xMID0gcmVxdWlyZSgnLi9mcm9udGJveC9kYXRhL3Njcm9sbCcpKHtcclxuICAgICAgICBERVZJQ0U6IERFVklDRSxcclxuICAgICAgICBFTEVNRU5UUzogRUxFTUVOVFMsXHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBBbmltYXRpb25zXHJcbiAgICAgKi9cclxuICAgIHZhciB0cmFuc2l0aW9uSGVpZ2h0ID0gcmVxdWlyZSgnLi9mcm9udGJveC90cmFuc2l0aW9uSGVpZ2h0Jykoe1xyXG4gICAgICAgIEJST1dTRVIgOiBCUk9XU0VSLFxyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNtb290aCBzY3JvbGwgdG8gdGFyZ2V0XHJcbiAgICAgKiBcclxuICAgICAqIUBwYXJhbSB7RUxFTUVOVFN9IEVMRU1FTlRTXHJcbiAgICAgKiFAcGFyYW0ge1NDUk9MTH0gU0NST0xMXHJcbiAgICAgKiFAcGFyYW0ge0ZVTkNUSU9OU30gRlVOQ1RJT05TXHJcbiAgICAgKi9cclxuICAgIHZhciBzY3JvbGxUbyA9IHJlcXVpcmUoJy4vZnJvbnRib3gvc2Nyb2xsVG8nKSh7XHJcbiAgICAgICAgRUxFTUVOVFM6IEVMRU1FTlRTLFxyXG4gICAgICAgIFNDUk9MTDogU0NST0xMLFxyXG4gICAgICAgIEZVTkNUSU9OUzogRlVOQ1RJT05TLFxyXG4gICAgICAgIFNFVFRJTkdTOiB7XHJcbiAgICAgICAgICAgIC8vIGFjdGl2ZSBhdXRvbWF0aWMgc2Nyb2xsIHBhZ2UgdG8gZWxlbWVudCB2aWEgVVJMIGhhc2hcclxuICAgICAgICAgICAgYXV0b1Njcm9sbDogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vIGRpdmlkZSBkaXN0YW5jZSBieSB0aGlzIHZhbHVlIHRvIGNhbGN1bGF0ZSB0aW1lIHNjcm9sbFxyXG4gICAgICAgICAgICB0aW1lOiAyLFxyXG4gICAgICAgICAgICAvLyBtaW4gdGltZSBzY3JvbGxcclxuICAgICAgICAgICAgbWluVGltZTogNDAwLFxyXG4gICAgICAgICAgICAvLyBtYXggdGltZSBzY3JvbGxcclxuICAgICAgICAgICAgbWF4VGltZTogMTIwMCxcclxuICAgICAgICAgICAgLy8gcnVuIGF1dG9TY3JvbGwgd2hlbiBoYXNoIGluIFVSTCBpcyBiZWdpbiB3aXRoIHRoaXMgc3RyaW5nXHJcbiAgICAgICAgICAgIHByZWZpeEF1dG9TY3JvbGw6ICdzY3JvbGwtJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgZml4ZWQgZWxlbWVudCB3aGVuIHBhZ2UgaXMgc2Nyb2xsXHJcbiAgICAgKiBcclxuICAgICAqIUBwYXJhbSB7RUxFTUVOVFN9IEVMRU1FTlRTXHJcbiAgICAgKiFAcGFyYW0ge0VMRU1FTlRTfSBTQ1JPTExcclxuICAgICAqIEBwYXJhbSB7bnVsbCwgbnVtYmVyfSBTRVRUSU5HUy5vZmZzZXQgd2hlbiBjcmVhdGUgc3RpY2t5IGVsZW1lbnRcclxuICAgICAqIG51bGwgLSBhdXRvbWF0aWMgXHJcbiAgICAgKiBudW1iZXIgLSBob3cgbWFueSBwaXhlbCB1c2VyIG1heSBzY3JvbGwgdG8gdHJpZ2dlciBzdGlja3kgICBcclxuICAgICAqIEBwYXJhbSB7Ym9vbH0gU0VUVElOR1MucGxhY2Vob2xkZXIgYWRkIGhlaWdodCB0byBwbGFjZWhvbGRlciB3aGVuIHRyaWdnZXIgc3RpY2t5XHJcbiAgICAgKiBzZXQgdHJ1ZSBvbmx5IGlmIEBoZWFkZXItYWx3YXlzLXN0aWNreSA9IGZhbHNlXHJcbiAgICAgKiBAcGFyYW0ge2pRdWVyeSBPYmplY3R9ICRlbGVtZW50U3B5IHN0aWNreSBlbGVtZW50IFxyXG4gICAgICovXHJcbiAgICByZXF1aXJlKCcuL2Zyb250Ym94L25hdmJhci9zdGlja3knKSh7XHJcbiAgICAgICAgRUxFTUVOVFM6IEVMRU1FTlRTLFxyXG4gICAgICAgIFNDUk9MTDogU0NST0xMLFxyXG4gICAgICAgIFJFU0laRTogUkVTSVpFLFxyXG4gICAgICAgIFNFVFRJTkdTOiB7XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiB0cnVlLFxyXG4gICAgICAgICAgICBvZmZzZXQ6IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJGVsZW1lbnRTcHk6ICQoXCIjc3RpY2t5LWVsZW1lbnRcIiksXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEJ1cmdlciBtZW51XHJcbiAgICAgKiBcclxuICAgICAqICFAcGFyYW0ge0VMRU1FTlRTfSBFTEVNRU5UU1xyXG4gICAgICogIUBwYXJhbSB7RlVOQ1RJT05TfSBGVU5DVElPTlNcclxuICAgICAqIEBwYXJhbSB7Qm9vbH0gT1BUSU9OUy5kcm9wZG93blxyXG4gICAgICogbWVudSBpdGVtcyBjYW4gYmUgZXhwYW5kXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2wsIE51bWJlcn0gT1BUSU9OUy5kcm9wZG93blJlc3BvbnNpdmVcclxuICAgICAqIGJyZWFrcG9pbnQgdG8gdHJpZ2dlciBpdGVtIGV4cGFuZFxyXG4gICAgICovXHJcbiAgICByZXF1aXJlKCcuL2Zyb250Ym94L25hdmJhci9idXJnZXJNZW51Jykoe1xyXG4gICAgICAgIEVMRU1FTlRTOiBFTEVNRU5UUyxcclxuICAgICAgICBGVU5DVElPTlM6IEZVTkNUSU9OUyxcclxuICAgICAgICBPUFRJT05TOiB7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICBkcm9wZG93blJlc3BvbnNpdmU6IDIsXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb29raWVzXHJcbiAgICAgKiBcclxuICAgICAqICFAcGFyYW0ge0VMRU1FTlRTfSBFTEVNRU5UU1xyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IE9QVElPTlMuaW1nU3JjIHBhdGNoIHRvIGltYWdlXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gT1BUSU9OUy5jb250ZW50IGNvbnRlbnQgdGV4dFxyXG4gICAgICovXHJcbiAgICAvLyByZXF1aXJlKCcuL2Zyb250Ym94L2Nvb2tpZXMnKSh7XHJcbiAgICAvLyAgICAgRUxFTUVOVFM6IEVMRU1FTlRTLFxyXG4gICAgLy8gICAgIE9QVElPTlM6IHtcclxuICAgIC8vICAgICAgICAgaW1nU3JjOiBgL2Fzc2V0cy9pbWFnZXMvY29va2llcy5wbmdgLFxyXG4gICAgLy8gICAgICAgICBjb250ZW50OiBgVyBuYXN6eW0gc2Vyd2lzaWUgd3lrb3J6eXN0dWplbXkgcGxpa2kgQ29va2llcy4gU8SFIG9uZSB6YXBpc3l3YW5lIG5hIGR5c2t1IHVyesSFZHplbmlhIGtvxYRjb3dlZ28gdcW8eXRrb3duaWthIHcgY2VsYWNoIHN0YXR5c3R5Y3pueWNoIG9yYXogdcWCYXR3aWVuaWEga29yenlzdGFuaWEgeiBzZXJ3aXN1LiBVc3Rhd2llbmlhIHRlIHphd3N6ZSBtb8W8bmEgem1pZW5pxIcuIFN6Y3plZ8OzxYJvd2UgaW5mb3JtYWNqZSBvIHBsaWthY2ggQ29va2llcyB6bmFqZHVqxIUgc2nEmSB3IDxhIGhyZWY9XCIjXCIgdGFyZ2V0PVwiX2JsYW5rXCI+UG9saXR5Y2UgUHJ5d2F0bm/Fm2NpPC9hPmAsXHJcbiAgICAvLyAgICAgfSxcclxuICAgIC8vIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGFic1xyXG4gICAgICogXHJcbiAgICAgKiAhQHBhcmFtIHtFTEVNRU5UU30gRUxFTUVOVFNcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBPUFRJT05TLmltZ1NyYyBwYXRjaCB0byBpbWFnZVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IE9QVElPTlMuY29udGVudCBjb250ZW50IHRleHRcclxuICAgICAqL1xyXG4gICAgcmVxdWlyZSgnLi9mcm9udGJveC90YWJzJykoe1xyXG4gICAgICAgIEVMRU1FTlRTOiBFTEVNRU5UUyxcclxuICAgICAgICBPUFRJT05TOiB7XHJcbiAgICAgICAgICAgIGltZ1NyYzogYC9hc3NldHMvaW1hZ2VzL2Nvb2tpZXMucG5nYCxcclxuICAgICAgICAgICAgY29udGVudDogYFcgbmFzenltIHNlcndpc2llIHd5a29yenlzdHVqZW15IHBsaWtpIENvb2tpZXMuIFPEhSBvbmUgemFwaXN5d2FuZSBuYSBkeXNrdSB1cnrEhWR6ZW5pYSBrb8WEY293ZWdvIHXFvHl0a293bmlrYSB3IGNlbGFjaCBzdGF0eXN0eWN6bnljaCBvcmF6IHXFgmF0d2llbmlhIGtvcnp5c3RhbmlhIHogc2Vyd2lzdS4gVXN0YXdpZW5pYSB0ZSB6YXdzemUgbW/FvG5hIHptaWVuacSHLiBTemN6ZWfDs8WCb3dlIGluZm9ybWFjamUgbyBwbGlrYWNoIENvb2tpZXMgem5hamR1asSFIHNpxJkgdyA8YSBocmVmPVwiI1wiIHRhcmdldD1cIl9ibGFua1wiPlBvbGl0eWNlIFByeXdhdG5vxZtjaTwvYT5gLFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3cgbW9yZSBjb250ZW50XHJcbiAgICAgKiBcclxuICAgICAqICFAcGFyYW0ge1RSQU5TSVRJT05IRUlHSFR9IHRyYW5zaXRpb25IZWlnaHRcclxuICAgICAqL1xyXG4gICAgcmVxdWlyZSgnLi9mcm9udGJveC9zaG93TW9yZScpKHtcclxuICAgICAgICBUUkFOU0lUSU9OSEVJR0hUOiB0cmFuc2l0aW9uSGVpZ2h0LFxyXG4gICAgICAgIFJFU0laRTogUkVTSVpFLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGlja3kgU3B5XHJcbiAgICAgKi9cclxuICAgIHZhciBzdGlja3lTcHkgPSByZXF1aXJlKCcuL2Zyb250Ym94L3N0aWNreS1zcHknKSh7XHJcbiAgICAgICAgU0NST0xMOiBTQ1JPTEwsXHJcbiAgICAgICAgRUxFTUVOVFM6IEVMRU1FTlRTLFxyXG4gICAgICAgIERFVklDRTogREVWSUNFLFxyXG4gICAgICAgIERBVEE6IHtcclxuICAgICAgICAgICAgJ3N0aWNreVNweSc6IHtcclxuICAgICAgICAgICAgICAgICRpdGVtOiAkKGAjc3RpY2t5U3B5YCksXHJcbiAgICAgICAgICAgICAgICAkY29udGFpbmVyOiAkKGAjc3RpY2t5U3B5Q29udGFpbmVyYCksXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdvb2dsZSBNYXBzIEFQSVxyXG4gICAgICogXHJcbiAgICAgKiAhQHBhcmFtIHtGVU5DVElPTlN9IEZVTkNUSU9OU1xyXG4gICAgICogIUBwYXJhbSB7U0NST0xMfSBTQ1JPTExcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBPUFRJT05TLmNlbnRlciBwYXRjaCB0byBpbWFnZVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IE9QVElPTlMuY29udGVudCBjb250ZW50IHRleHRcclxuICAgICAqL1xyXG4gICAgLy8gdmFyIGdvb2dsZU1hcHMgPSByZXF1aXJlKCcuL2dvb2dsZU1hcHMnKSh7XHJcbiAgICAvLyAgICAgRlVOQ1RJT05TOiBGVU5DVElPTlMsXHJcbiAgICAvLyAgICAgU0NST0xMOiBTQ1JPTEwsXHJcbiAgICAvLyAgICAgT1BUSU9OUzoge1xyXG4gICAgLy8gICAgICAgICAvLyBGaXJzdCBwb3NpdGlvblxyXG4gICAgLy8gICAgICAgICBjZW50ZXI6IHtcclxuICAgIC8vICAgICAgICAgICAgIGxhdDogNTEuOTE5NDM3LFxyXG4gICAgLy8gICAgICAgICAgICAgbG5nOiAxOS4xNDUxMzYsXHJcbiAgICAvLyAgICAgICAgIH0sXHJcbiAgICAvLyAgICAgICAgIG1hcElEOiBcIm1hcFwiLFxyXG4gICAgLy8gICAgICAgICB6b29tOiA1LjgsXHJcbiAgICAvLyAgICAgICAgIGRpc2FibGVEZWZhdWx0VUk6IHRydWUsXHJcbiAgICAvLyAgICAgICAgIHN0cmVldFZpZXdDb250cm9sOiBmYWxzZSxcclxuICAgIC8vICAgICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcclxuICAgIC8vICAgICAgICAgc2NhbGVDb250cm9sOiBmYWxzZSxcclxuICAgIC8vICAgICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxyXG4gICAgLy8gICAgICAgICBzdHlsZXM6IHJlcXVpcmUoJy4vZ29vZ2xlTWFwc1N0eWxlJyksXHJcbiAgICAvLyAgICAgICAgIG1hcmtlclNpemU6IFsyMSwgMzRdLFxyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbGVjdDJcclxuICAgICAqL1xyXG4gICAgLy8gdmFyICRzZWxlY3QyID0gJChcIi5zZWxlY3QyXCIpO1xyXG4gICAgLy8gaWYgKCRzZWxlY3QyLmxlbmd0aCkge1xyXG4gICAgLy8gICAgJHNlbGVjdDIuc2VsZWN0Mih7XHJcbiAgICAvLyAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xLFxyXG4gICAgLy8gICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLyogdGVzdC1jb2RlICovXHJcbiAgICB2YXJcclxuICAgICRpZnJhbWUgPSAkKFwiW2RhdGEtaWZyYW1lXVwiKTtcclxuICAgICRpZnJhbWUuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgXHJcbiAgICAgICAgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgIGZpbmQgPSAkdGhpcy5hdHRyKFwiZGF0YS1pZnJhbWVcIiksXHJcbiAgICAgICAgJGNvbnRlbnQgPSAkKGBbZGF0YS1pZnJhbWUtY29udGVudD1cIiR7ZmluZH1cIl1gKTtcclxuXHJcbiAgICAgICAgJHRoaXMuY29udGVudHMoKS5maW5kKFwiYm9keVwiKS5hcHBlbmQoICc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIi9jc3Mvc3R5bGUuZGV2LmNzc1wiPicgKTtcclxuICAgICAgICAkdGhpcy5jb250ZW50cygpLmZpbmQoXCJib2R5XCIpLmFwcGVuZCggJzxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MVwiPicgKTtcclxuICAgICAgICAkdGhpcy5jb250ZW50cygpLmZpbmQoXCJib2R5XCIpLmFwcGVuZCggJzxzdHlsZT4gYm9keSxodG1sIHsgcGFkZGluZzogMCFpbXBvcnRhbnQ7IG1hcmdpbjogMCFpbXBvcnRhbnQ7IHBvc2l0aW9uOiBzdGF0aWMhaW1wb3J0YW50OyBoZWlnaHQ6IGF1dG8haW1wb3J0YW50OyBtaW4taGVpZ2h0OiBhdXRvIWltcG9ydGFudDsgfSA8L3N0eWxlPicgKTtcclxuICAgICAgICAkdGhpcy5jb250ZW50cygpLmZpbmQoXCJib2R5XCIpLmFwcGVuZCggJGNvbnRlbnQgKTtcclxuICAgIH0pO1xyXG4gICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgREVCVUcuY29uc29sZS5hZGQoXCJSdW5uaW5nIGNvcnJlY3QuLi5cIik7XHJcbiAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgLy8gSW5mb3JtIHN0eWxlc2hlZWQgdG8gcmVtb3ZlIHN0eWxlIGZhbGxiYWNrIGZvciBKYXZhU2NyaXB0IGVsZW1lbnRzXHJcbiAgICBFTEVNRU5UUy4kaHRtbC5yZW1vdmVDbGFzcyhcIm5vX2pzXCIpO1xyXG5cclxufSkoJCwgd2luZG93KTsiLCIvKipcclxuICogUmVzaXplXHJcbiAqL1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoZGF0YSkgPT4ge1xyXG5cclxuICAgIHZhclxyXG4gICAgUVVFVUUgPSB7XHJcbiAgICAgICAgd2lkdGg6IHt9LFxyXG4gICAgICAgIGhlaWdodDoge30sXHJcbiAgICAgICAgYWxsOiB7fSxcclxuICAgIH07XHJcblxyXG4gICAgdmFyXHJcbiAgICBEQVRBID0ge1xyXG4gICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgdGltZTogMCxcclxuICAgICAgICBsb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICBhcHBlbmRUZW1wbGF0ZTogZmFsc2UsXHJcbiAgICB9O1xyXG5cclxuICAgIHZhclxyXG4gICAgcmVzaXplVGltZSA9IDQwMDtcclxuXHJcbiAgICB2YXJcclxuICAgIEVMRU1FTlRTID0gbnVsbCxcclxuICAgIFRFTVBMQVRFID0ge1xyXG4gICAgICAgIGxvYWRpbmc6IG51bGwsXHJcbiAgICB9O1xyXG5cclxuICAgIHZhclxyXG4gICAgc3RhcnQgPSAoKSA9PiB7XHJcbiAgICAgICAgRUxFTUVOVFMgPSBkYXRhLkVMRU1FTlRTO1xyXG4gICAgICAgIFRFTVBMQVRFLmxvYWRpbmcgPSBkYXRhLnRlbXBsYXRlLmxvYWRpbmc7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhclxyXG4gICAgdHJpZ2dlciA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgREFUQS50aW1lID0gNTAwO1xyXG5cclxuICAgICAgICBpZiAoIURBVEEuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIERBVEEuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmVzaXplKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXJcclxuICAgIGFkZCA9IChuYW1lLCBjYWxsYmFjaywgdHlwZSkgPT4ge1xyXG4gICAgICAgIFFVRVVFW3R5cGVdW25hbWVdID0gW2NhbGxiYWNrXTtcclxuICAgICAgICBcclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICBERUJVRy5jb25zb2xlLmFkZChgcmVzaXplOiBhZGQgJHtuYW1lfWApO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgIH07XHJcblxyXG4gICAgdmFyXHJcbiAgICByZW1vdmUgPSAobmFtZSwgdHlwZSkgPT4ge1xyXG4gICAgICAgIGRlbGV0ZSBxdWV1ZVt0eXBlXVtuYW1lXTtcclxuXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgREVCVUcuY29uc29sZS5hZGQoYHJlc2l6ZTogcmVtb3ZlICR7bmFtZX1gKTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICB9O1xyXG5cclxuICAgIHZhclxyXG4gICAgY2xlYW4gPSAoKSA9PiB7XHJcbiAgICAgICAgcXVldWUgPSB7fTtcclxuXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgREVCVUcuY29uc29sZS5hZGQoYHJlc2l6ZTogY2xlYW4gcXVldWVgKTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICB9O1xyXG5cclxuICAgIHZhclxyXG4gICAgcnVuID0gKHR5cGUpID0+IHtcclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnd2lkdGgnOlxyXG4gICAgICAgICAgICAgICAgcmVzaXplV2lkdGgoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdoZWlnaHQnOlxyXG4gICAgICAgICAgICAgICAgcmVzaXplSGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJlc2l6ZUFsbCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXJcclxuICAgIHJlc2l6ZSA9ICh0eXBlKSA9PiB7XHJcblxyXG4gICAgICAgIC8qIEFwcGVuZCBsb2FkaW5nIHRlbXBsYXRlICovXHJcbiAgICAgICAgaWYgKCAhREFUQS5hcHBlbmRUZW1wbGF0ZSAmJiBURU1QTEFURS5sb2FkaW5nICkge1xyXG4gICAgICAgICAgICBFTEVNRU5UUy4kYm9keS5hcHBlbmQoIGA8ZGl2IGNsYXNzPVwianNfcmVzaXplTG9hZGluZ1wiPjxkaXYgY2xhc3M9XCJqc19yZXNpemVMb2FkaW5nX19jb250ZW50XCI+JHtURU1QTEFURS5sb2FkaW5nfTwvZGl2PjwvZGl2PmAgKTtcclxuICAgICAgICAgICAgREFUQS5hcHBlbmRUZW1wbGF0ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCggKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgREFUQS50aW1lIC09IDUwO1xyXG5cclxuICAgICAgICAgICAgaWYgKERBVEEudGltZSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmICggIURBVEEubG9hZGluZyApIHtcclxuICAgICAgICAgICAgICAgICAgICBEQVRBLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICggVEVNUExBVEUubG9hZGluZyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRUxFTUVOVFMuJGJvZHkuYWRkQ2xhc3MoXCJqc19yZXNpemVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzaXplKHR5cGUpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICggREFUQS5sb2FkaW5nICkge1xyXG4gICAgICAgICAgICAgICAgICAgIERBVEEubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICggVEVNUExBVEUubG9hZGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBFTEVNRU5UUy4kYm9keS5yZW1vdmVDbGFzcyhcImpzX3Jlc2l6ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBEQVRBLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcnVuKHR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgICAgICBERUJVRy52YXJpYWJsZS5yZWZyZXNoKFwiUmVzaXplXCIpO1xyXG4gICAgICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICAgICAgfSwgNTApO1xyXG4gICAgfTtcclxuICAgIHZhciBcclxuICAgIHJlc2l6ZVdpZHRoID0gKCkgPT4ge1xyXG4gICAgICAgICQuZWFjaChRVUVVRS53aWR0aCwgZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICh2YWx1ZVswXSkoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICB2YXJcclxuICAgIHJlc2l6ZUhlaWdodCA9ICgpID0+IHtcclxuICAgICAgICAkLmVhY2goUVVFVUUuaGVpZ2h0LCBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcclxuICAgICAgICAgICAgKHZhbHVlWzBdKSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHZhclxyXG4gICAgcmVzaXplQWxsID0gKCkgPT4ge1xyXG4gICAgICAgIHJlc2l6ZUhlaWdodCgpO1xyXG4gICAgICAgIHJlc2l6ZVdpZHRoKCk7XHJcbiAgICAgICAgJC5lYWNoKFFVRVVFLmFsbCwgZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICh2YWx1ZVswXSkoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgREVCVUcudmFyaWFibGUuYWRkKFwiUmVzaXplXCIsIERBVEEpO1xyXG4gICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgIHN0YXJ0KCk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhZGQ6IGFkZCxcclxuICAgICAgICByZW1vdmU6IHJlbW92ZSxcclxuICAgICAgICByZXNpemU6IHJlc2l6ZSxcclxuICAgICAgICB0cmlnZ2VyOiB0cmlnZ2VyLFxyXG4gICAgfTtcclxuICBcclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcclxuXHJcbiAgICB2YXIgXHJcbiAgICBcclxuICAgIERBVEEgPSB7fSxcclxuXHJcbiAgICB3aGljaFRyYW5zaXRpb25FdmVudCA9ICgpID0+IHtcclxuICAgICAgICB2YXIgdCxcclxuICAgICAgICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmFrZWVsZW1lbnRcIik7XHJcbiAgICAgIFxyXG4gICAgICAgIHZhciB0cmFuc2l0aW9ucyA9IHtcclxuICAgICAgICAgIFwidHJhbnNpdGlvblwiICAgICAgOiBcInRyYW5zaXRpb25lbmRcIixcclxuICAgICAgICAgIFwiT1RyYW5zaXRpb25cIiAgICAgOiBcIm9UcmFuc2l0aW9uRW5kXCIsXHJcbiAgICAgICAgICBcIk1velRyYW5zaXRpb25cIiAgIDogXCJ0cmFuc2l0aW9uZW5kXCIsXHJcbiAgICAgICAgICBcIldlYmtpdFRyYW5zaXRpb25cIjogXCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCJcclxuICAgICAgICB9XHJcbiAgICAgIFxyXG4gICAgICAgIGZvciAodCBpbiB0cmFuc2l0aW9ucyl7XHJcbiAgICAgICAgICBpZiAoZWwuc3R5bGVbdF0gIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cmFuc2l0aW9uc1t0XTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrV2l0Y2hUcmFuc2l0aW9uRXZlbnQgPSAoKSA9PiB7XHJcbiAgICAgICAgREFUQS53aXRjaFRyYW5zaXRpb25FdmVudCA9IHdoaWNoVHJhbnNpdGlvbkV2ZW50KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlZnJlc2ggPSAoKSA9PiB7XHJcbiAgICAgICAgREFUQS50cmFuc2l0aW9uRXZlbnQgPSBjaGVja1dpdGNoVHJhbnNpdGlvbkV2ZW50KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBEQVRBO1xyXG5cclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IChhcmd1bWVudCkgPT4ge1xyXG4gICAgXHJcbiAgICB2YXIgXHJcbiAgICBCUkVBS1BPSU5UUyAgICAgICAgID0gbnVsbCxcclxuICAgIEVMRU1FTlRTICAgICAgICAgICAgPSBudWxsLFxyXG4gICAgUkVTSVpFICAgICAgICAgICAgICA9IG51bGw7XHJcblxyXG4gICAgdmFyXHJcbiAgICBEQVRBID0ge1xyXG4gICAgICAgIHdpZHRoICAgICAgICAgICA6IG51bGwsXHJcbiAgICAgICAgaGVpZ2h0ICAgICAgICAgIDogbnVsbCxcclxuICAgICAgICByZXNwb25zaXZlICAgICAgOiBudWxsLFxyXG4gICAgICAgIG9zICAgICAgICAgICAgICA6IG51bGwsXHJcbiAgICB9O1xyXG5cclxuICAgIC8qIFN0YXJ0IG1vZHVsZSAqL1xyXG4gICAgY29uc3RcclxuICAgIHN0YXJ0ID0gKCkgPT4ge1xyXG5cclxuICAgICAgICAvKiBQcmVwYXJlIGFyZ3VtZW50cyBkYXRhICovXHJcbiAgICAgICAgQlJFQUtQT0lOVFMgPSBhcmd1bWVudC5CUkVBS1BPSU5UUztcclxuICAgICAgICBFTEVNRU5UUyA9IGFyZ3VtZW50LkVMRU1FTlRTO1xyXG4gICAgICAgIFJFU0laRSA9IGFyZ3VtZW50LlJFU0laRTtcclxuXHJcbiAgICAgICAgREFUQS5vcyA9IGdldE1vYmlsZU9wZXJhdGluZ1N5c3RlbSgpO1xyXG4gICAgICAgIHJlZnJlc2goKTtcclxuXHJcbiAgICAgICAgLyogVHJpZ2dlciBmdW5jdGlvbiBpZiB1c2VyIHJlc2l6ZSBwYWdlICovXHJcbiAgICAgICAgRUxFTUVOVFMuJHdpbmRvdy5vbigncmVzaXplIG9yaWVudGF0aW9uY2hhbmdlJywgcmVmcmVzaCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qIFJlZnJlc2ggbW9kdWxlICovXHJcbiAgICBjb25zdFxyXG4gICAgcmVmcmVzaCA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgLyogUHJlcGFyZSBkYXRhICovXHJcbiAgICAgICAgbGV0XHJcbiAgICAgICAgd2lkdGggPSBFTEVNRU5UUy4kd2luZG93LndpZHRoKCksXHJcbiAgICAgICAgbGFzdFdpZHRoID0gREFUQS53aWR0aDtcclxuICAgICAgICBoZWlnaHQgPSBFTEVNRU5UUy4kd2luZG93LmhlaWdodCgpO1xyXG5cclxuICAgICAgICBEQVRBLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgREFUQS5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgREFUQS5yZXNwb25zaXZlID0gbnVsbDtcclxuXHJcbiAgICAgICAgLyogQ2hlY2sgYWN0aXZlIGJyZWFrcG9pbnQgKi8gXHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gQlJFQUtQT0lOVFMpIHtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBCUkVBS1BPSU5UU1trZXldO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHdpZHRoID4gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIERBVEEucmVzcG9uc2l2ZSA9IGtleTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghREFUQS5yZXNwb25zaXZlKSB7XHJcbiAgICAgICAgICAgIERBVEEucmVzcG9uc2l2ZSA9ICdtb2JpbGUnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogVHJpZ2dlciByZXNpemUgcXVldWUgKGlnbm9yZSBmaXJzdCB0aW1lKSAqL1xyXG4gICAgICAgIGlmIChsYXN0V2lkdGggJiYgIURBVEEub3MpIHtcclxuICAgICAgICAgICAgaWYgKERBVEEud2lkdGggPT09IGxhc3RXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgUkVTSVpFLnRyaWdnZXIoJ3dpZHRoJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBSRVNJWkUudHJpZ2dlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICBERUJVRy52YXJpYWJsZS5yZWZyZXNoKCdkZXZpY2UnKTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICB9O1xyXG5cclxuICAgIC8qIERldGVybWluZSB0aGUgbW9iaWxlIG9wZXJhdGluZyBzeXN0ZW0gKi9cclxuICAgIGNvbnN0IFxyXG4gICAgZ2V0TW9iaWxlT3BlcmF0aW5nU3lzdGVtID0gKCkgPT4ge1xyXG4gICAgICAgIHZhciB1c2VyQWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50IHx8IG5hdmlnYXRvci52ZW5kb3IgfHwgd2luZG93Lm9wZXJhO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFdpbmRvd3MgUGhvbmUgbXVzdCBjb21lIGZpcnN0IGJlY2F1c2UgaXRzIFVBIGFsc28gY29udGFpbnMgXCJBbmRyb2lkXCJcclxuICAgICAgICBpZiAoL3dpbmRvd3MgcGhvbmUvaS50ZXN0KHVzZXJBZ2VudCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiV2luZG93cyBQaG9uZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgXHJcbiAgICAgICAgaWYgKC9hbmRyb2lkL2kudGVzdCh1c2VyQWdlbnQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIkFuZHJvaWRcIjtcclxuICAgICAgICB9XHJcbiAgICAgIFxyXG4gICAgICAgIC8vIGlPUyBkZXRlY3Rpb24gZnJvbTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvOTAzOTg4NS8xNzc3MTBcclxuICAgICAgICBpZiAoL2lQYWR8aVBob25lfGlQb2QvLnRlc3QodXNlckFnZW50KSAmJiAhd2luZG93Lk1TU3RyZWFtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcImlPU1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgLyogdGVzdC1jb2RlICovXHJcbiAgICBERUJVRy52YXJpYWJsZS5hZGQoJ2RldmljZScsIERBVEEpO1xyXG4gICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgIHN0YXJ0KCk7XHJcblxyXG4gICAgcmV0dXJuIERBVEE7XHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSAoZGF0YSkgPT4ge1xyXG5cclxuICAgIHZhciBcclxuICAgIERBVEEgPSB7XHJcbiAgICAgICAgbGFzdENlbnRlciAgICAgICAgICA6IG51bGwsXHJcbiAgICAgICAgY2VudGVyICAgICAgICAgICAgICA6IG51bGwsXHJcbiAgICAgICAgdG9wICAgICAgICAgICAgICAgICA6IG51bGwsXHJcbiAgICAgICAgc3BlZWQgICAgICAgICAgICAgICA6IG51bGwsXHJcbiAgICAgICAgZGlyZWN0aW9uICAgICAgICAgICA6IG51bGwsXHJcbiAgICB9O1xyXG5cclxuICAgIHZhclxyXG4gICAgREVWSUNFID0gZGF0YS5ERVZJQ0UsXHJcbiAgICBFTEVNRU5UUyA9IGRhdGEuRUxFTUVOVFM7XHJcblxyXG5cclxuXHJcbiAgICB2YXIgYmluZCA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChyZWZyZXNoKTtcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUgb3JpZW50YXRpb25jaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmVmcmVzaCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZWZyZXNoKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciByZWZyZXNoID0gKCkgPT4ge1xyXG4gICAgICAgIERBVEEubGFzdENlbnRlciA9IERBVEEuY2VudGVyIHx8IDA7XHJcblxyXG4gICAgICAgIERBVEEudG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgMDtcclxuICAgICAgICBEQVRBLmNlbnRlciA9IERBVEEudG9wICsgREVWSUNFLmhlaWdodCAvIDI7XHJcbiAgICAgICAgREFUQS5iZWdpbiA9IERBVEEudG9wO1xyXG5cclxuICAgICAgICBpZiAoRUxFTUVOVFMuJGhlYWRlci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgREFUQS5iZWdpbiArPSBFTEVNRU5UUy4kaGVhZGVyLm91dGVySGVpZ2h0KCB0cnVlICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBEQVRBLmJvdHRvbSA9IERBVEEudG9wICsgREVWSUNFLmhlaWdodDtcclxuXHJcbiAgICAgICAgREFUQS5zcGVlZCA9IE1hdGguYWJzKERBVEEubGFzdENlbnRlciAtIERBVEEuY2VudGVyKTtcclxuXHJcbiAgICAgICAgaWYgKERBVEEuY2VudGVyID4gREFUQS5sYXN0Q2VudGVyKSB7XHJcbiAgICAgICAgICAgIERBVEEuZGlyZWN0aW9uID0gXCJkb3duXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgREFUQS5kaXJlY3Rpb24gPSBcInVwXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICBERUJVRy52YXJpYWJsZS5yZWZyZXNoKCdzY3JvbGwnKTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICB9O1xyXG5cclxuICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgREVCVUcudmFyaWFibGUuYWRkKCdzY3JvbGwnLCBEQVRBKTtcclxuICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuXHJcbiAgICBiaW5kKCk7XHJcblxyXG4gICAgcmV0dXJuIERBVEE7XHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSAoZGF0YSkgPT4ge1xyXG5cclxuICAgIERBVEEgPSB7XHJcbiAgICAgICAgJGNvbnRhaW5lcjogbnVsbCxcclxuICAgICAgICAkZWxlbWVudDogbnVsbCxcclxuICAgICAgICAkYnV0dG9uOiBudWxsLFxyXG4gICAgICAgICRib2R5OiBudWxsLFxyXG4gICAgICAgIG9wZW46IGZhbHNlLFxyXG4gICAgfTtcclxuXHJcbiAgICAkLmV4dGVuZCggREFUQSwgZGF0YSApO1xyXG4gICAgXHJcbiAgICB2YXIgc3RhcnQgPSAoZGF0YSkgPT4ge1xyXG5cclxuICAgICAgICB2YXIgZGVidWdCb3hDbGFzcyA9ICdkZWJ1Zy1ib3ggZGVidWctYm94LS1jb25zb2xlJztcclxuICAgICAgICBpZiAoIURBVEEub3Blbikge1xyXG4gICAgICAgICAgICBkZWJ1Z0JveENsYXNzICs9ICcgZGVidWctYm94LS1oaWRlJztcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICB2YXIgZGVidWdCb3ggPSAkKGA8ZGl2IGNsYXNzPScke2RlYnVnQm94Q2xhc3N9JyBpZD0nZGVidWctYm94LWNvbnNvbGUnPjwvZGl2PmApO1xyXG4gICAgICAgIHZhciBkZWJ1Z0JveEJ1dHRvbiA9ICQoXCI8ZGl2IGlkPSdkZWJ1Zy1ib3gtY29uc29sZS1idXR0b24nIGNsYXNzPSdkZWJ1Zy1ib3hfX2J1dHRvbic+RnJvbnRCb3ggY29uc29sZTwvZGl2PlwiKTtcclxuICAgICAgICB2YXIgZGVidWdCb3hDb250YWluZXIgPSAkKFwiPGRpdiBpZD0nZGVidWctYm94LWNvbnNvbGUtY29udGFpbmVyJyBjbGFzcz0nZGVidWctYm94X19jb250YWluZXInPjwvZGl2PlwiKTtcclxuICAgIFxyXG4gICAgICAgIERBVEEuRUxFTUVOVFMuJGJvZHkuYXBwZW5kKGRlYnVnQm94KTtcclxuICAgICAgICBEQVRBLiRlbGVtZW50ID0gJChcIiNkZWJ1Zy1ib3gtY29uc29sZVwiKTtcclxuICAgIFxyXG4gICAgICAgIERBVEEuJGVsZW1lbnQuYXBwZW5kKGRlYnVnQm94QnV0dG9uKTtcclxuICAgICAgICBEQVRBLiRlbGVtZW50LmFwcGVuZChkZWJ1Z0JveENvbnRhaW5lcik7XHJcbiAgICBcclxuICAgICAgICBEQVRBLiRidXR0b24gPSAkKFwiI2RlYnVnLWJveC1jb25zb2xlLWJ1dHRvblwiKTtcclxuICAgICAgICBEQVRBLiRjb250YWluZXIgPSAkKFwiI2RlYnVnLWJveC1jb25zb2xlLWNvbnRhaW5lclwiKTtcclxuICAgIFxyXG4gICAgICAgIHZhciB0b2dnbGVEZWJ1Z0JveCA9ICgpID0+IHtcclxuICAgICAgICAgICAgREFUQS4kZWxlbWVudC50b2dnbGVDbGFzcyhcImRlYnVnLWJveC0taGlkZVwiKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIERBVEEuJGJ1dHRvbi5vbihcImNsaWNrXCIsIHRvZ2dsZURlYnVnQm94KTtcclxuICAgIFxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgdmFyIGFkZCA9IChhZGRTdHJpbmcsIGFkZG9uQ2xhc3MgPSAnJykgPT4ge1xyXG4gICAgICAgIERBVEEuJGNvbnRhaW5lci5wcmVwZW5kKFwiPHAgY2xhc3M9J1wiICsgYWRkb25DbGFzcyArIFwiJz5cIithZGRTdHJpbmcrXCI8L3A+XCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzdGFydCgpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYWRkOiBhZGQsXHJcbiAgICB9O1xyXG5cclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IChhcmd1bWVudCkgPT4ge1xyXG5cclxuICAgIHZhciBcclxuICAgIEVMRU1FTlRTID0gbnVsbDtcclxuXHJcbiAgICB2YXJcclxuICAgIEJPWCA9IHtcclxuICAgICAgICAkY29udGFpbmVyOiBudWxsLFxyXG4gICAgICAgICRjb250ZW50OiBudWxsLFxyXG4gICAgICAgICRidXR0b246IG51bGwsXHJcbiAgICAgICAgJGJvZHk6IG51bGwsXHJcbiAgICB9LFxyXG4gICAgT1BUSU9OUyA9IHtcclxuICAgICAgICBvcGVuOiBmYWxzZSxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3RcclxuICAgIENMQVNTID0ge1xyXG4gICAgICAgIGNvbnRhaW5lciAgICAgICA6IGBkZWJ1Zy1ib3ggZGVidWctYm94LS12YXJpYWJsZXNgLFxyXG4gICAgICAgIGJ1dHRvbiAgICAgICAgICA6IGBkZWJ1Zy1ib3hfX2J1dHRvbmAsXHJcbiAgICAgICAgY29udGVudCAgICAgICAgIDogYGRlYnVnLWJveF9fY29udGFpbmVyYCxcclxuICAgICAgICBpdGVtICAgICAgICAgICAgOiBgZGVidWctYm94X19pdGVtYCxcclxuICAgIH07XHJcblxyXG4gICAgdmFyXHJcbiAgICBDT05URU5UID0ge307XHJcblxyXG4gICAgLyogU3RhcnQgbW9kdWxlICovXHJcbiAgICB2YXIgXHJcbiAgICBzdGFydCA9IChkYXRhKSA9PiB7XHJcblxyXG4gICAgICAgIC8qIFByZXBhcmUgYXJndW1lbnRzIGRhdGEgKi9cclxuICAgICAgICAkLmV4dGVuZCggT1BUSU9OUywgYXJndW1lbnQuT1BUSU9OUyApO1xyXG4gICAgICAgIEVMRU1FTlRTID0gYXJndW1lbnQuRUxFTUVOVFM7XHJcblxyXG4gICAgICAgIC8qIENoZWNrIGlmIGNvbnRhaW5lciBtdXN0IGJlIGRlZmF1bHQgb3BlbiAqL1xyXG4gICAgICAgIGlmICghT1BUSU9OUy5vcGVuKSB7XHJcbiAgICAgICAgICAgIENMQVNTLmNvbnRhaW5lciArPSAnIGRlYnVnLWJveC0taGlkZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qIENyZWF0ZSB0ZW1wbGF0ZSAqL1xyXG4gICAgICAgIEJPWC4kY29udGFpbmVyICAgICAgPSAkKGA8ZGl2IGNsYXNzPScke0NMQVNTLmNvbnRhaW5lcn0nPjwvZGl2PmApO1xyXG4gICAgICAgIEJPWC4kYnV0dG9uICAgICAgICAgPSAkKGA8ZGl2IGNsYXNzPScke0NMQVNTLmJ1dHRvbn0nPkZyb250Qm94IHZhcmlhYmxlczwvZGl2PmApO1xyXG4gICAgICAgIEJPWC4kY29udGVudCAgICAgICAgPSAkKGA8ZGl2IGNsYXNzPScke0NMQVNTLmNvbnRlbnR9Jz48L2Rpdj5gKTtcclxuICAgICAgICBcclxuICAgICAgICAvKiBEcmF3IHRlbXBsYXRlICovXHJcbiAgICAgICAgRUxFTUVOVFMuJGJvZHkuYXBwZW5kKCBCT1guJGNvbnRhaW5lciApO1xyXG4gICAgICAgIEJPWC4kY29udGFpbmVyLmFwcGVuZCggQk9YLiRidXR0b24gKTtcclxuICAgICAgICBCT1guJGNvbnRhaW5lci5hcHBlbmQoIEJPWC4kY29udGVudCApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8qIEJpbmQgdG9nZ2xlIGNvbnRhaW5lciAqL1xyXG4gICAgICAgIEJPWC4kYnV0dG9uLm9uKFwiY2xpY2tcIiwgdG9nZ2xlQ29udGFpbmVyKTtcclxuICAgIH07XHJcbiAgICBcclxuXHJcbiAgICAvKiBTaG93IGRhdGEgaW4gY29udGVudCAqL1xyXG4gICAgY29uc3RcclxuICAgIGFkZCA9IChkYXRhTmFtZSwgREFUQSkgPT4ge1xyXG5cclxuICAgICAgICAvKiBSZW1vdmUgZHVwbGljYXRlICovXHJcbiAgICAgICAgcmVtb3ZlKGRhdGFOYW1lKTtcclxuICAgICAgICBcclxuICAgICAgICBDT05URU5UW2RhdGFOYW1lXSA9IHtcclxuICAgICAgICAgICAgZGF0YTogREFUQSxcclxuICAgICAgICAgICAgbmFtZTogZGF0YU5hbWUuc3BsaXQoXCIgXCIpLmpvaW4oXCItXCIpLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgQk9YLiRjb250ZW50LmFwcGVuZChgPHAgY2xhc3M9XCIke0NMQVNTLml0ZW19XCI+JHtDT05URU5UW2RhdGFOYW1lXS5uYW1lfTwvcD5gKTtcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBEQVRBKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gREFUQVtrZXldO1xyXG5cclxuICAgICAgICAgICAgbGV0XHJcbiAgICAgICAgICAgIG5hbWUgPSBrZXkuc3BsaXQoXCIgXCIpLmpvaW4oXCItXCIpLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICAgIGlkID0gYGRlYnVnLXZhcmlhYmxlLSR7Q09OVEVOVFtkYXRhTmFtZV0ubmFtZX0tJHtuYW1lfWA7XHJcbiAgICAgICAgICAgICRpdGVtID0gJChgPHA+ICR7a2V5fSA8c3BhbiBpZD0nJHtpZH0nPiR7dmFsdWV9PC9zcGFuPiA8L3A+YCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBCT1guJGNvbnRlbnQuYXBwZW5kKCRpdGVtKTtcclxuXHJcbiAgICAgICAgICAgICRpdGVtLm9uKFwiY2xpY2tcIiwgeyRpdGVtfSwgdG9nZ2xlVmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyogUmVtb3ZlIGRhdGEgaW4gY29udGVudCAqL1xyXG4gICAgY29uc3RcclxuICAgIHJlbW92ZSA9IChkYXRhTmFtZSkgPT4ge1xyXG4gICAgICAgIGlmICh0eXBlb2YgQ09OVEVOVFtkYXRhTmFtZV0gIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBkZWxldGUgQ09OVEVOVFtkYXRhTmFtZV07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKiBSZWZyZXNoIGRhdGEgbmFtZSBpbiBjb250ZW50ICovIFxyXG4gICAgY29uc3RcclxuICAgIHJlZnJlc2ggPSAobmFtZSkgPT4ge1xyXG4gICAgICAgIHZhclxyXG4gICAgICAgIGl0ZW0gPSBDT05URU5UW25hbWVdLFxyXG4gICAgICAgIGRhdGEgPSBpdGVtLmRhdGE7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBkYXRhW2tleV07XHJcblxyXG4gICAgICAgICAgICBsZXRcclxuICAgICAgICAgICAgbmFtZSA9IGtleS5zcGxpdChcIiBcIikuam9pbihcIi1cIikudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICAgICAgZmluZCA9IGBkZWJ1Zy12YXJpYWJsZS0ke2l0ZW0ubmFtZX0tJHtuYW1lfWA7XHJcblxyXG4gICAgICAgICAgICAkKGAjJHtmaW5kfWApLnRleHQodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBcclxuICAgIC8qIFRvb2dsZSBjb250YWluZXIgKi9cclxuICAgIGNvbnN0XHJcbiAgICB0b2dnbGVDb250YWluZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgQk9YLiRjb250YWluZXIudG9nZ2xlQ2xhc3MoXCJkZWJ1Zy1ib3gtLWhpZGVcIik7XHJcbiAgICB9O1xyXG4gICAgLyogVG9vZ2xlIHZhbHVlICovXHJcbiAgICBjb25zdFxyXG4gICAgdG9nZ2xlVmFsdWUgPSAoZSkgPT4geyAgICAgIFxyXG4gICAgICAgIGUuZGF0YS4kaXRlbS50b2dnbGVDbGFzcyhcImpzX2ZvY3VzXCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzdGFydCgpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYWRkOiBhZGQsXHJcbiAgICAgICAgcmVtb3ZlOiByZW1vdmUsXHJcbiAgICAgICAgcmVmcmVzaDogcmVmcmVzaCxcclxuICAgIH07XHJcblxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydCBzdHJpbmcgdG8gYm9vbGVhblxyXG4gICAgICogZmFzdGVzdCBtZXRob2QgaHR0cDovL2pzYmVuLmNoL2NxVlNqXHJcbiAgICAgKi9cclxuICAgIGdldEJvb2xlYW4odmFsdWUpIHtcclxuXHRcdHN3aXRjaCAodmFsdWUpe1xyXG5cdFx0XHRjYXNlIHRydWU6XHJcblx0XHRcdGNhc2UgXCJ0cnVlXCI6XHJcblx0XHRcdGNhc2UgMTpcclxuXHRcdFx0Y2FzZSBcIjFcIjpcclxuXHRcdFx0Y2FzZSBcIm9uXCI6XHJcblx0XHRcdGNhc2UgXCJ5ZXNcIjpcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0ZGVmYXVsdDogXHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgLypcclxuICAgICAqIERldGVybWluZSBPdmVyZmxvd1xyXG4gICAgICovXHJcbiAgICBkZXRlcm1pbmVPdmVyZmxvdzogZnVuY3Rpb24oY29udGVudCwgY29udGFpbmVyKSB7XHJcblxyXG4gICAgICAgIGlmIChjb250ZW50IGluc3RhbmNlb2YgalF1ZXJ5KVxyXG4gICAgICAgIHtcclxuXHRcdFx0Y29udGVudCA9IGNvbnRlbnRbMF07XHJcblx0XHR9XHJcbiAgICAgICAgaWYgKGNvbnRhaW5lciBpbnN0YW5jZW9mIGpRdWVyeSlcclxuICAgICAgICB7XHJcblx0XHRcdGNvbnRhaW5lciA9IGNvbnRhaW5lclswXTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXJcclxuXHRcdGNvbnRhaW5lck1ldHJpY3MgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcblx0XHRjb250YWluZXJNZXRyaWNzUmlnaHQgPSBNYXRoLmZsb29yKGNvbnRhaW5lck1ldHJpY3MucmlnaHQpLFxyXG5cdFx0Y29udGFpbmVyTWV0cmljc0xlZnQgPSBNYXRoLmZsb29yKGNvbnRhaW5lck1ldHJpY3MubGVmdCksXHJcblx0XHRjb250ZW50TWV0cmljcyA9IGNvbnRlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcblx0XHRjb250ZW50TWV0cmljc1JpZ2h0ID0gTWF0aC5mbG9vcihjb250ZW50TWV0cmljcy5yaWdodCksXHJcblx0XHRjb250ZW50TWV0cmljc0xlZnQgPSBNYXRoLmZsb29yKGNvbnRlbnRNZXRyaWNzLmxlZnQpO1xyXG5cclxuICAgICAgICBpZiAoY29udGFpbmVyTWV0cmljc0xlZnQgPiBjb250ZW50TWV0cmljc0xlZnQgJiYgY29udGFpbmVyTWV0cmljc1JpZ2h0IDwgY29udGVudE1ldHJpY3NSaWdodCkgXHJcbiAgICAgICAge1xyXG5cdFx0XHRyZXR1cm4gXCJib3RoXCI7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIGlmIChjb250ZW50TWV0cmljc0xlZnQgPD0gY29udGFpbmVyTWV0cmljc0xlZnQpIFxyXG4gICAgICAgIHtcclxuXHRcdFx0cmV0dXJuIFwibGVmdFwiO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSBpZiAoY29udGVudE1ldHJpY3NSaWdodCA+PSBjb250YWluZXJNZXRyaWNzUmlnaHQpXHJcbiAgICAgICAge1xyXG5cdFx0XHRyZXR1cm4gXCJyaWdodFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIFxyXG4gICAgICAgIHtcclxuXHRcdFx0cmV0dXJuIFwibm9uZVwiO1xyXG5cdFx0fVxyXG4gICAgfSxcclxuICAgICAgICBcclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqICQuZGlzYWJsZXNjcm9sbFxyXG4gICAgICogQXV0aG9yOiBKb3NoIEhhcnJpc29uIC0gYWxvb2YuY29cclxuICAgICAqXHJcbiAgICAgKiBEaXNhYmxlcyBzY3JvbGwgZXZlbnRzIGZyb20gbW91c2V3aGVlbHMsIHRvdWNobW92ZXMgYW5kIGtleXByZXNzZXMuXHJcbiAgICAgKiBVc2Ugd2hpbGUgalF1ZXJ5IGlzIGFuaW1hdGluZyB0aGUgc2Nyb2xsIHBvc2l0aW9uIGZvciBhIGd1YXJhbnRlZWQgc3VwZXItc21vb3RoIHJpZGUhXHJcbiAgICAgKi9cclxuXHJcbiAgICA7KGZ1bmN0aW9uKCQpIHtcclxuXHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgICAgIHZhciBpbnN0YW5jZSwgcHJvdG87XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIFVzZXJTY3JvbGxEaXNhYmxlcigkY29udGFpbmVyLCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIC8vIHNwYWNlYmFyOiAzMiwgcGFnZXVwOiAzMywgcGFnZWRvd246IDM0LCBlbmQ6IDM1LCBob21lOiAzNlxyXG4gICAgICAgICAgICAvLyBsZWZ0OiAzNywgdXA6IDM4LCByaWdodDogMzksIGRvd246IDQwXHJcbiAgICAgICAgICAgIHRoaXMub3B0cyA9ICQuZXh0ZW5kKHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZVdoZWVsIDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGhhbmRsZVNjcm9sbGJhcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGhhbmRsZUtleXMgOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsRXZlbnRLZXlzIDogWzMyLCAzMywgMzQsIDM1LCAzNiwgMzcsIDM4LCAzOSwgNDBdXHJcbiAgICAgICAgICAgIH0sIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy4kY29udGFpbmVyID0gJGNvbnRhaW5lcjtcclxuICAgICAgICAgICAgdGhpcy4kZG9jdW1lbnQgPSAkKGRvY3VtZW50KTtcclxuICAgICAgICAgICAgdGhpcy5sb2NrVG9TY3JvbGxQb3MgPSBbMCwgMF07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRpc2FibGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RvID0gVXNlclNjcm9sbERpc2FibGVyLnByb3RvdHlwZTtcclxuXHJcbiAgICAgICAgcHJvdG8uZGlzYWJsZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBpZih0Lm9wdHMuaGFuZGxlV2hlZWwpIHtcclxuICAgICAgICAgICAgICAgIHQuJGNvbnRhaW5lci5vbihcclxuICAgICAgICAgICAgICAgICAgICBcIm1vdXNld2hlZWwuZGlzYWJsZXNjcm9sbCBET01Nb3VzZVNjcm9sbC5kaXNhYmxlc2Nyb2xsIHRvdWNobW92ZS5kaXNhYmxlc2Nyb2xsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdC5faGFuZGxlV2hlZWxcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHQub3B0cy5oYW5kbGVTY3JvbGxiYXIpIHtcclxuICAgICAgICAgICAgICAgIHQubG9ja1RvU2Nyb2xsUG9zID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIHQuJGNvbnRhaW5lci5zY3JvbGxMZWZ0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgdC4kY29udGFpbmVyLnNjcm9sbFRvcCgpXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgdC4kY29udGFpbmVyLm9uKFwic2Nyb2xsLmRpc2FibGVzY3JvbGxcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdC5faGFuZGxlU2Nyb2xsYmFyLmNhbGwodCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodC5vcHRzLmhhbmRsZUtleXMpIHtcclxuICAgICAgICAgICAgICAgIHQuJGRvY3VtZW50Lm9uKFwia2V5ZG93bi5kaXNhYmxlc2Nyb2xsXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdC5faGFuZGxlS2V5ZG93bi5jYWxsKHQsIGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgcHJvdG8udW5kbyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHQuJGNvbnRhaW5lci5vZmYoXCIuZGlzYWJsZXNjcm9sbFwiKTtcclxuICAgICAgICAgICAgaWYodC5vcHRzLmhhbmRsZUtleXMpIHtcclxuICAgICAgICAgICAgICAgIHQuJGRvY3VtZW50Lm9mZihcIi5kaXNhYmxlc2Nyb2xsXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICBwcm90by5faGFuZGxlV2hlZWwgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJvdG8uX2hhbmRsZVNjcm9sbGJhciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRjb250YWluZXIuc2Nyb2xsTGVmdCh0aGlzLmxvY2tUb1Njcm9sbFBvc1swXSk7XHJcbiAgICAgICAgICAgIHRoaXMuJGNvbnRhaW5lci5zY3JvbGxUb3AodGhpcy5sb2NrVG9TY3JvbGxQb3NbMV0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJvdG8uX2hhbmRsZUtleWRvd24gPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMub3B0cy5zY3JvbGxFdmVudEtleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSB0aGlzLm9wdHMuc2Nyb2xsRXZlbnRLZXlzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgLy8gUGx1Z2luIHdyYXBwZXIgZm9yIG9iamVjdFxyXG4gICAgICAgICQuZm4uc2Nyb2xsRGlzYWJsZSA9IGZ1bmN0aW9uKG1ldGhvZCkge1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgY2FsbGluZyBmb3IgdGhlIGZpcnN0IHRpbWUsIGluc3RhbnRpYXRlIHRoZSBvYmplY3QgYW5kIHNhdmVcclxuICAgICAgICAgICAgLy8gcmVmZXJlbmNlLiBUaGUgcGx1Z2luIGNhbiB0aGVyZWZvcmUgb25seSBiZSBpbnN0YW50aWF0ZWQgb25jZSBwZXJcclxuICAgICAgICAgICAgLy8gcGFnZS4gWW91IGNhbiBwYXNzIG9wdGlvbnMgb2JqZWN0IGluIHRocm91Z2ggdGhlIG1ldGhvZCBwYXJhbWV0ZXIuXHJcbiAgICAgICAgICAgIGlmKCAhIGluc3RhbmNlICYmICh0eXBlb2YgbWV0aG9kID09PSBcIm9iamVjdFwiIHx8ICEgbWV0aG9kKSkge1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBuZXcgVXNlclNjcm9sbERpc2FibGVyKHRoaXMsIG1ldGhvZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEluc3RhbmNlIGNyZWF0ZWQsIG5vIG1ldGhvZCBzcGVjaWZpZWQuIENhbGwgZGlzYWJsZSBhZ2FpblxyXG4gICAgICAgICAgICBpZihpbnN0YW5jZSAmJiB0eXBlb2YgbWV0aG9kID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5kaXNhYmxlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEluc3RhbmNlIGFscmVhZHkgY3JlYXRlZCwgYW5kIGEgbWV0aG9kIGlzIGJlaW5nIGV4cGxpY2l0bHkgY2FsbGVkLFxyXG4gICAgICAgICAgICAvLyBlLmcuIC5zY3JvbGxEaXNhYmxlKCd1bmRvJyk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYoaW5zdGFuY2UgJiYgaW5zdGFuY2VbbWV0aG9kXSkge1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2VbbWV0aG9kXS5jYWxsKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBHbG9iYWwgYWNjZXNzXHJcbiAgICAgICAgd2luZG93LlVzZXJTY3JvbGxEaXNhYmxlciA9IFVzZXJTY3JvbGxEaXNhYmxlcjtcclxuXHJcbiAgICB9KShqUXVlcnkpO1xyXG5cclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IChkYXRhKSA9PiB7XHJcblxyXG4gICAgdmFyXHJcbiAgICAgICAgREFUQSA9IHtcclxuICAgICAgICAgICAgJGJ1cmdlcjogbnVsbCxcclxuICAgICAgICAgICAgJG1lbnU6IG51bGwsXHJcbiAgICAgICAgICAgICRtZW51X2NvbnRhaW5lcjogbnVsbCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIEVMRU1FTlRTID0gZGF0YS5FTEVNRU5UUyxcclxuICAgICAgICBGVU5DVElPTlMgPSBkYXRhLkZVTkNUSU9OUyxcclxuICAgICAgICBTRVRUSU5HUyA9IHtcclxuICAgICAgICAgICAgd2FpdDogMzAwLFxyXG4gICAgICAgICAgICBzdHlsZTogJ3VuZGVyLWhlYWRlcicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhY3RpdmUgPSBmYWxzZSxcclxuICAgICAgICBtb3ZpbmcgPSBmYWxzZTtcclxuXHJcblxyXG4gICAgaWYgKGRhdGEuU0VUVElOR1MpIHtcclxuICAgICAgICAkLmV4dGVuZChEQVRBLCBkYXRhLlNFVFRJTkdTKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc3RhcnQgPSAoc2V0dGluZ3MgPSBmYWxzZSkgPT4ge1xyXG5cclxuICAgICAgICBEQVRBLiRidXJnZXIgPSAkKFwiI2J1cmdlci1idXR0b25cIik7XHJcblxyXG5cclxuICAgICAgICBpZiAoREFUQS4kYnVyZ2VyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBEQVRBLiRtZW51ID0gJChcIiNidXJnZXItbWVudVwiKTtcclxuICAgICAgICAgICAgREFUQS4kbWVudV9jb250YWluZXIgPSAkKFwiI2J1cmdlci1tZW51LWNvbnRhaW5lclwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIERBVEEuJGJ1cmdlci5vbihcImNsaWNrXCIsIGJ1cmdlckNsaWNrKTtcclxuXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgREVCVUcudmFyaWFibGUuYWRkKGBCdXJnZXJgLCB7XHJcbiAgICAgICAgICAgICdhY3RpdmUnOiBhY3RpdmUsXHJcbiAgICAgICAgICAgICdtb3ZpbmcnOiBtb3ZpbmcsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgdG9nZ2xlT2ZmID0gKCkgPT4ge1xyXG5cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICBERUJVRy5jb25zb2xlLmFkZChcIkJ1cmdlciB0b2dnbGVPZmZcIiwgXCJjbGlja1wiKTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgICAgIG1vdmluZyA9IHRydWU7XHJcbiAgICAgICAgYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIEVMRU1FTlRTLiRodG1sLnJlbW92ZUNsYXNzKCdqc19tZW51LWFjdGl2ZScpO1xyXG5cclxuXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgLy8gREVCVUcudmFyaWFibGUuYWRkKHtcclxuICAgICAgICAvLyAgICAgJ0J1cmdlciBtb3ZpbmcnOiBtb3ZpbmcsXHJcbiAgICAgICAgLy8gICAgICdCdXJnZXIgYWN0aXZlJzogYWN0aXZlLFxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuXHJcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIEVMRU1FTlRTLiRib2R5LnNjcm9sbERpc2FibGUoXCJ1bmRvXCIpO1xyXG4gICAgICAgICAgICBtb3ZpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgRUxFTUVOVFMuJGh0bWwucmVtb3ZlQ2xhc3MoJ2pzX21lbnUtYWN0aXZlLS1lbmQnKTtcclxuXHJcbiAgICAgICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgICAgICAvLyBERUJVRy52YXJpYWJsZS5hZGQoe1xyXG4gICAgICAgICAgICAvLyAgICAgJ0J1cmdlciBtb3ZpbmcnOiBtb3ZpbmcsXHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgICAgIH0sIFNFVFRJTkdTLndhaXQpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIHRvZ2dsZU9uID0gKCkgPT4ge1xyXG4gICAgICAgIEVMRU1FTlRTLiRib2R5LnNjcm9sbERpc2FibGUoKTtcclxuXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgREVCVUcuY29uc29sZS5hZGQoXCJCdXJnZXIgdG9nZ2xlT25cIiwgXCJjbGlja1wiKTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgICAgIGlmIChTRVRUSU5HUy5zdHlsZSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKFNFVFRJTkdTLnN0eWxlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBGb3IgYnVyZ2VyIGFuaW1hdGlvblxyXG4gICAgICAgICAgICAgICAgICogQGltcG9ydCBcIi4uL3BsdWdpbnMvYW5pbWF0aW9uL25hdmJhci91bmRlci1oZWFkZXJcIjtcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgY2FzZSAndW5kZXItaGVhZGVyJzpcclxuICAgICAgICAgICAgICAgICAgICBEQVRBLiRtZW51ID0gREFUQS4kbWVudV9jb250YWluZXIub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBFTEVNRU5UUy4kaHRtbC5hZGRDbGFzcygnanNfbWVudS1hY3RpdmUnKTtcclxuICAgICAgICBFTEVNRU5UUy4kb3ZlcmxheS5vbignY2xpY2snLCB0b2dnbGVPdmVybGF5KTtcclxuXHJcbiAgICAgICAgbW92aW5nID0gdHJ1ZTtcclxuICAgICAgICBhY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICAvLyBERUJVRy52YXJpYWJsZS5hZGQoe1xyXG4gICAgICAgIC8vICAgICAnQnVyZ2VyIGFjdGl2ZSc6IGFjdGl2ZSxcclxuICAgICAgICAvLyAgICAgJ0J1cmdlciBtb3ZpbmcnOiBtb3ZpbmcsXHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIEVMRU1FTlRTLiRodG1sLmFkZENsYXNzKCdqc19tZW51LWFjdGl2ZS0tZW5kJyk7XHJcbiAgICAgICAgICAgIG1vdmluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgICAgIC8vIERFQlVHLnZhcmlhYmxlLmFkZCh7XHJcbiAgICAgICAgICAgIC8vICAgICAnQnVyZ2VyIG1vdmluZyc6IG1vdmluZyxcclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuXHJcbiAgICAgICAgfSwgU0VUVElOR1Mud2FpdCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgdG9nZ2xlT3ZlcmxheSA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgREVCVUcuY29uc29sZS5hZGQoXCJCdXJnZXIgb3ZlcmxheSB0b2dnbGVPZmZcIiwgXCJjbGlja1wiKTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgICAgIEVMRU1FTlRTLiRvdmVybGF5Lm9mZignY2xpY2snLCB0b2dnbGVPdmVybGF5KTtcclxuXHJcbiAgICAgICAgdG9nZ2xlT2ZmKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIGJ1cmdlckNsaWNrID0gKCkgPT4ge1xyXG5cclxuICAgICAgICBpZiAoIW1vdmluZykge1xyXG5cclxuICAgICAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKFwiQnVyZ2VyIGNsaWNrZWRcIiwgXCJjbGlja1wiKTtcclxuICAgICAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgICAgICAgICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgdG9nZ2xlT2ZmKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0b2dnbGVPbigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgREVCVUcuY29uc29sZS5hZGQoXCJCdXJnZXIgY2xpY2sgYmxvY2tlZC4gQnVyZ2VyIGlzIG1vdmluZ1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXJ0KCk7XHJcblxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gKGRhdGEpID0+IHtcclxuXHJcbiAgICB2YXIgXHJcbiAgICBTRVRUSU5HUyA9IHtcclxuICAgICAgICBzcHlUb3A6IHRydWUsXHJcbiAgICAgICAgb2Zmc2V0OiAxLFxyXG4gICAgICAgIHNweVRvcENsYXNzOiAnanNfc3RpY2t5LWVsZW1lbnQtLWFjdGl2ZScsXHJcbiAgICB9LFxyXG4gICAgRUxFTUVOVFMgPSBkYXRhLkVMRU1FTlRTLFxyXG4gICAgU0NST0xMID0gZGF0YS5TQ1JPTEwsXHJcbiAgICAkZWxlbWVudFNweSA9IGRhdGEuJGVsZW1lbnRTcHksXHJcbiAgICBEQVRBID0ge1xyXG4gICAgICAgIGhlaWdodDogbnVsbCxcclxuICAgICAgICBvZmZzZXQ6IG51bGwsXHJcbiAgICB9LFxyXG4gICAgYWN0aXZlID0gZmFsc2UsXHJcbiAgICBwb3NpdGlvbiA9IG51bGw7XHJcblxyXG4gICAgaWYgKGRhdGEuU0VUVElOR1MpIHtcclxuICAgICAgICAkLmV4dGVuZChEQVRBLCBkYXRhLlNFVFRJTkdTKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc3RhcnQgPSAoZGF0YSkgPT4ge1xyXG5cclxuICAgICAgICBpZiAoJGVsZW1lbnRTcHkubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZSBvcmllbnRhdGlvbmNoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgICAgICByZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoU0VUVElOR1Muc3B5VG9wKSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3B5VG9wKCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIEVMRU1FTlRTLiR3aW5kb3cub24oXCJzY3JvbGxcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNweVRvcCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7ICAgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgICAgICBERUJVRy5jb25zb2xlLmFkZChgU3RhcnQgc3RpY2t5LmpzIHtvZmZzZXQ6ICR7REFUQS5vZmZzZXR9OyB9YCk7XHJcbiAgICAgICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciByZWZyZXNoID0gKCkgPT4ge1xyXG4gICAgICAgIGNhbGN1bGF0ZUhlYWRlcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICghU0VUVElOR1Mub2Zmc2V0KSB7XHJcbiAgICAgICAgICAgIERBVEEub2Zmc2V0ID0gU0VUVElOR1Mub2Zmc2V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgREFUQS5vZmZzZXQgPSAkZWxlbWVudFNweS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgY2FsY3VsYXRlSGVhZGVyID0gKGRhdGEpID0+IHtcclxuXHJcbiAgICAgICAgcG9zaXRpb24gPSAkZWxlbWVudFNweS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgREFUQS5oZWlnaHQgPSAkZWxlbWVudFNweS5vdXRlckhlaWdodCh0cnVlKTtcclxuXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgLy8gREVCVUcudmFyaWFibGUuYWRkKHtcclxuICAgICAgICAvLyAgICAgXCJIZWFkZXIgaGVpZ2h0XCI6IERBVEEuaGVpZ2h0LFxyXG4gICAgICAgIC8vICAgICBcIkhlYWRlciBwb3NpdGlvblwiOiBwb3NpdGlvbixcclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBzcHlUb3AgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIGlmIChTQ1JPTEwudG9wID4gREFUQS5vZmZzZXQpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFhY3RpdmUpIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gRUxFTUVOVFMuJGhlYWRlclBsYWNlaG9sZGVyLmNzcyh7aGVpZ2h0OiBEQVRBLmhlaWdodH0pO1xyXG4gICAgICAgICAgICAgICAgRUxFTUVOVFMuJGh0bWwuYWRkQ2xhc3MoU0VUVElOR1Muc3B5VG9wQ2xhc3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyBFTEVNRU5UUy4kaGVhZGVyUGxhY2Vob2xkZXIuY3NzKHtoZWlnaHQ6IFwiXCJ9KTtcclxuICAgICAgICAgICAgICAgIEVMRU1FTlRTLiRodG1sLnJlbW92ZUNsYXNzKFNFVFRJTkdTLnNweVRvcENsYXNzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgLy8gREVCVUcudmFyaWFibGUuYWRkKHtcclxuICAgICAgICAvLyAgICdIZWFkZXIgYWN0aXZlJzogYWN0aXZlLFxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXJ0KCk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuXHJcbiAgICB9O1xyXG5cclxufTsiLCIvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxufHwgU21vb3RoIHNjcm9sbCB0byB0YXJnZXRcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbnx8IFJlcXVpcmVkXHJcbnx8ICogU0NST0xMXHJcbnx8ICogRUxFTUVOVFNcclxufHwgKiBGVU5DVElPTlNcclxufHxcclxufHwgKiBkYXRhLWVsZW1lbnQgLSBzZWxlY3QgZWxlbWVudHMgc2VwYXJhdGUgd2l0aCBjb21tYSAoICQoXCJkYXRhLWxlbWVudFwiKSApXHJcbnx8ICogZGF0YS10b2dnbGUgLSBzZWxlY3QgdHlwZSBvZiB0b2dnbGVcclxufHxcclxufHwgRGF0YS10b2dnbGUgdHlwZTpcclxufHwgKiBjb2xsYXBzZSAtIGNvbGxhcHNlIGRhdGEtZWxlbWVudCAoIHVzZSBsZXNzL2phdmFzY3JpcHQvX2NvbGxhcHNlLmxlc3MgY2xhc3MgKVxyXG58fCAqIHNvbWV0aGluZyBlbHNlIC0gdG9nZ2xlIGRhdGEtZWxlbWVudCB1c2luZyBjbGFzcyBvbiBkYXRhLXRvZ2dsZVxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cclxubW9kdWxlLmV4cG9ydHMgPSAoZGF0YSkgPT4ge1xyXG4gICAgXHJcbiAgICB2YXJcclxuICAgIFNDUk9MTCA9IGRhdGEuU0NST0xMLFxyXG4gICAgRUxFTUVOVFMgPSBkYXRhLkVMRU1FTlRTLFxyXG4gICAgRlVOQ1RJT05TID0gZGF0YS5GVU5DVElPTlMsXHJcbiAgICAvLyBhbGwgY2xpY2thYmxlIHNjcm9sbCBlbGVtZW50c1xyXG4gICAgJGVsZW1lbnRzID0gbnVsbCxcclxuICAgIC8vIGJvb2wgcGFnZSBpcyBzY3JvbGxcclxuICAgIGFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgIHZhclxyXG4gICAgU0VUVElOR1MgPSB7XHJcbiAgICAgICAgLy8gYWN0aXZlIGF1dG9tYXRpYyBzY3JvbGwgcGFnZSB0byBlbGVtZW50IHZpYSBVUkwgaGFzaFxyXG4gICAgICAgIGF1dG9TY3JvbGw6IGZhbHNlLFxyXG4gICAgICAgIC8vIGRpdmlkZSBkaXN0YW5jZSBieSB0aGlzIHZhbHVlIHRvIGNhbGN1bGF0ZSB0aW1lIHNjcm9sbFxyXG4gICAgICAgIHRpbWU6IDIsXHJcbiAgICAgICAgLy8gbWluIHRpbWUgc2Nyb2xsXHJcbiAgICAgICAgbWluVGltZTogNDAwLFxyXG4gICAgICAgIC8vIG1heCB0aW1lIHNjcm9sbFxyXG4gICAgICAgIG1heFRpbWU6IDEyMDAsXHJcbiAgICAgICAgLy8gcnVuIGF1dG9TY3JvbGwgd2hlbiBoYXNoIGluIFVSTCBpcyBiZWdpbiB3aXRoIHRoaXMgc3RyaW5nXHJcbiAgICAgICAgcHJlZml4QXV0b1Njcm9sbDogJ3Njcm9sbC0nXHJcbiAgICB9O1xyXG5cclxuICAgICQuZXh0ZW5kKCBTRVRUSU5HUywgZGF0YS5TRVRUSU5HUyApO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnQgZnVuY3Rpb25cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcclxuICAgICAqIHJlcGxhY2UgdmFsdWVzIGluIFNFVFRJTkdTIFxyXG4gICAgICovXHJcbiAgICB2YXJcclxuICAgIHN0YXJ0ID0gKGRhdGEpID0+IHtcclxuXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgREVCVUcuY29uc29sZS5hZGQoXCJTdGFydDogc2Nyb2xsVG9cIik7XHJcbiAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBpZiAoU0VUVElOR1MuYXV0b1Njcm9sbCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhdXRvU2Nyb2xsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZWZyZXNoKCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEF1dG9tYXRpYyBzY3JvbGwgcGFnZSB0byBlbGVtZW50IElEXHJcbiAgICAgKiB3aGVuIHVzZXIgdmlzaXQgcGFnZSB3aXRoIGhhc2hcclxuICAgICAqIGJlZ2luIHdpdGggU0VUVElOR1MucHJlZml4QXV0b1Njcm9sbFxyXG4gICAgICovXHJcbiAgICB2YXJcclxuICAgIGF1dG9TY3JvbGwgPSAoKSA9PiB7XHJcbiAgICAgICAgdmFyIFxyXG4gICAgICAgIGhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcclxuICAgICAgICBcclxuICAgICAgICAvLyBDaGVjayBpZiBwYWdlIG11c3QgdHJpZ2dlciBhdXRvU2Nyb2xsXHJcbiAgICAgICAgaWYoIGhhc2guc3RhcnRzV2l0aCggXCIjXCIgKyBTRVRUSU5HUy5wcmVmaXhBdXRvU2Nyb2xsICkgKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBGaXggYW5ub3lpbmcganVtcGluZyB3aGVuIHVzZXIgZGlzdHVyYiBzY3JvbGxcclxuICAgICAgICAgICAgRUxFTUVOVFMuJGJvZHkuc2Nyb2xsRGlzYWJsZSh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSBoYXNoIGZyb20gdXJsXHJcbiAgICAgICAgICAgIHZhciBcclxuICAgICAgICAgICAgY2xlYW5VcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3QgKyBsb2NhdGlvbi5wYXRobmFtZTtcclxuICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBkb2N1bWVudC50aXRsZSwgY2xlYW5VcmwpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIHRhcmdldCBJRCBmcm9tIGhhc2hcclxuICAgICAgICAgICAgdmFyIFxyXG4gICAgICAgICAgICB0YXJnZXRJRCA9IGhhc2guc3Vic3RyaW5nKGhhc2guaW5kZXhPZignLScpKzEsIGhhc2gubGVuZ2h0KTtcclxuXHJcbiAgICAgICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgICAgICBERUJVRy5jb25zb2xlLmFkZChcInNjcm9sbFRvLmpzIGF1dG8gdHJpZ2dlciBmdW5jdGlvbiBhdXRvU2Nyb2xsKCkuXCIsICdhdXRvJyk7XHJcbiAgICAgICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIEZpeCBhbm5veWluZyBqdW1waW5nIHdoZW4gcGFnZSBpcyBzdGlsbCBub3QgcmVhZHlcclxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgICAgIG9uKHRhcmdldElEKTtcclxuICAgICAgICAgICAgfSwgOTAwKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNjcm9sbCBmdW5jdGlvblxyXG4gICAgICogQHBhcmFtIHtFdmVudCBpbnRlcmZhY2V9IGV2ZW50IFxyXG4gICAgICogQHBhcmFtIHtqUXVlcnkgb2JqZWN0OyBTdHJpbmcgSUR9IHRhcmdldCBcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lIFxyXG4gICAgICovXHJcbiAgICB2YXJcclxuICAgIHNjcm9sbCA9IChldmVudCwgdGFyZ2V0ID0gZmFsc2UsIHRpbWUgPSBmYWxzZSkgPT4ge1xyXG4gICAgICAgIHZhclxyXG4gICAgICAgIHRhcmdldElELCAkdGFyZ2V0LCAkdGhpcztcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgZXZlbnQgYW5kIHJlbW92ZSBkZWZhdWx0IGFjdGlvblxyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICAgICAgREVCVUcuY29uc29sZS5hZGQoYENsaWNrIHNjcm9sbFRvOiBldmVudC5wcmV2ZW50RGVmYXVsdCgpYCwgJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgICAgICAgICAgJHRoaXMgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgdGFyZ2V0IGVsZW1lbnRcclxuICAgICAgICBpZiAoIXRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXRJRCA9IFwiI1wiICsgJHRoaXMuYXR0cihcImRhdGEtc2Nyb2xsXCIpO1xyXG4gICAgICAgICAgICAkdGFyZ2V0ID0gJCh0YXJnZXRJRCk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIGpRdWVyeSkge1xyXG4gICAgICAgICAgICAgICAgJHRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgICAgIHRhcmdldElEID0gXCIjXCIgKyAkdGFyZ2V0LmF0dHIoXCJJRFwiKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRJRCA9IFwiI1wiICsgdGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgJHRhcmdldCA9ICQodGFyZ2V0SUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiBzY3JvbGwgYW5pbWF0aW9uIGlzIGZyZWUgdG8gdXNlXHJcbiAgICAgICAgaWYgKCFhY3RpdmUpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrICR0YXJnZXQgZXhpc3RcclxuICAgICAgICAgICAgaWYgKCR0YXJnZXQubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQmxvY2sgb3RoZXIgc2Nyb2xsIHRyaWdnZXJzXHJcbiAgICAgICAgICAgICAgICBhY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEdyYWIgdGFyZ2V0IHRvcCBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgdmFyXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRQb3NpdGlvblRvcCA9ICR0YXJnZXQub2Zmc2V0KCkudG9wLFxyXG4gICAgICAgICAgICAgICAgLy8gU2Nyb2xsIHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUbyA9IHRhcmdldFBvc2l0aW9uVG9wOyAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHNjcm9sbFRpbWUgXHJcbiAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVGltZSA9IE1hdGgucm91bmQoTWF0aC5hYnModGFyZ2V0UG9zaXRpb25Ub3AgLSBTQ1JPTEwudG9wKSAvIFNFVFRJTkdTLnRpbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbFRpbWUgPCBTRVRUSU5HUy5taW5UaW1lKSBcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUaW1lID0gU0VUVElOR1MubWluVGltZTtcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzY3JvbGxUaW1lID4gU0VUVElOR1MubWF4VGltZSkgXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVGltZSA9IFNFVFRJTkdTLm1heFRpbWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICAgICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKGBDbGljayBzY3JvbGxUbzogc2Nyb2xsIHRvIGVsZW1lbnQge3RhcmdldDogPHN0cm9uZz4ke3RhcmdldElEfTwvc3Ryb25nPjsgc3BlZWQgPHN0cm9uZz4ke3Njcm9sbFRpbWV9bXM8L3N0cm9uZz47IHBvc2l0aW9uOiA8c3Ryb25nPiR7c2Nyb2xsVG99PC9zdHJvbmc+fWAsICdjbGljaycpO1xyXG4gICAgICAgICAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFuaW1hdGUgc2Nyb2xsXHJcbiAgICAgICAgICAgICAgICBFTEVNRU5UUy4kYm9keS5zY3JvbGxEaXNhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICBFTEVNRU5UUy4kcGFnZS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFRvLFxyXG4gICAgICAgICAgICAgICAgfSwgMTIwMCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIEVMRU1FTlRTLiRib2R5LnNjcm9sbERpc2FibGUoJ3VuZG8nKTtcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gRUxFTUVOVFMuJHBhZ2UuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgc2Nyb2xsVG9wOiB0YXJnZXRQb3NpdGlvblRvcCAtIEVMRU1FTlRTLiRoZWFkZXIub3V0ZXJIZWlnaHQodHJ1ZSksXHJcbiAgICAgICAgICAgICAgICAvLyB9LCBzY3JvbGxUaW1lLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgRlVOQ1RJT05TLm9uVXNlclNjcm9sbCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgICAgICAgICBERUJVRy5jb25zb2xlLmFkZChgRXJyb3Igc2Nyb2xsVG86IGVsZW1lbnQgPHN0cm9uZz4ke3RhcmdldElEfTwvc3Ryb25nPiBkb2Vzbid0IGV4aXN0YCwgJ2Vycm9yJyk7XHJcbiAgICAgICAgICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgZWxzZSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKGBXYXJuaW5nIHNjcm9sbFRvOiBzY3JvbGwgYW5pbWF0aW9uIHdvdWxkbid0IGZpbmlzaGAsICd3YXJuaW5nJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTY3JvbGwgdG8gZWxlbWVudFxyXG4gICAgICogQHBhcmFtIHtqUXVlcnkgb2JqZWN0OyBTdHJpbmcgSUR9IGVsZW1lbnQgXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGltZSBcclxuICAgICAqIEByZXR1cm4ge0Jvb2x9XHJcbiAgICAgKi9cclxuICAgIHZhclxyXG4gICAgb24gPSAoZWxlbWVudCwgdGltZSA9IGZhbHNlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNjcm9sbChmYWxzZSwgZWxlbWVudCwgdGltZSk7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFJlZnJlc2ggYmluZGVkICRlbGVtZW50c1xyXG4gICAgICovXHJcbiAgICB2YXJcclxuICAgIHJlZnJlc2ggPSAoKSA9PiBcclxuICAgIHtcclxuXHJcbiAgICAgICAgaWYgKCRlbGVtZW50cykgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAkZWxlbWVudHMub2ZmKFwiY2xpY2tcIiwgc2Nyb2xsKTtcclxuXHJcbiAgICAgICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgICAgICBERUJVRy5jb25zb2xlLmFkZChcIlJlZnJlc2g6IHNjcm9sbFRvIHtsZW5ndGg6IFwiICsgJGVsZW1lbnRzLmxlbmd0aCArIFwiO31cIik7XHJcbiAgICAgICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgICRlbGVtZW50cyA9ICQoXCJbZGF0YS1zY3JvbGxdXCIpO1xyXG4gICAgICAgICRlbGVtZW50cy5vbihcImNsaWNrXCIsIHNjcm9sbCk7XHJcblxyXG4gICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKFwiRGF0YTogc2Nyb2xsVG8ge2xlbmd0aDogXCIgKyAkZWxlbWVudHMubGVuZ3RoICsgXCI7fVwiKTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXJ0KCk7XHJcbiAgXHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSAoZGF0YSkgPT4ge1xyXG5cclxuICB2YXJcclxuICAkaXRlbXMgPSBudWxsO1xyXG5cclxuICB2YXJcclxuICBUUkFOU0lUSU9OSEVJR0hULCBSRVNJWkU7XHJcblxyXG4gIHZhclxyXG4gIHN0YXJ0ID0gKCkgPT4ge1xyXG5cclxuICAgIFRSQU5TSVRJT05IRUlHSFQgPSBkYXRhLlRSQU5TSVRJT05IRUlHSFQ7XHJcbiAgICBSRVNJWkUgPSBkYXRhLlJFU0laRTtcclxuXHJcbiAgICAvLyBSRVNJWkUuYWRkKFwic2hvd01vcmVcIiwgKCkgPT4ge1xyXG4gICAgLy8gICByZWZyZXNoKCk7XHJcbiAgICAvLyB9KTtcclxuXHJcbiAgICByZWZyZXNoKCk7XHJcbiAgfTtcclxuXHJcbiAgdmFyXHJcbiAgcmVmcmVzaCA9ICgpID0+IHtcclxuICAgIGlmICgkaXRlbXMpIHtcclxuICAgICAgJGl0ZW1zLm9mZihcImNsaWNrXCIsIGNsaWNrKTtcclxuICAgIH1cclxuICAgICRpdGVtcyA9ICQoYFtkYXRhPSdzaG93TW9yZSddYCk7XHJcblxyXG4gICAgaWYgKCRpdGVtcy5sZW5ndGgpIHtcclxuICAgICAgJGl0ZW1zLmVhY2goIChpbmRleCwgZWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGNoZWNrVmlzaWJsZVNwYWNlKGVsZW1lbnQpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgfTtcclxuXHJcbiAgdmFyXHJcbiAgY2hlY2tWaXNpYmxlU3BhY2UgPSAoZWxlbWVudCkgPT4ge1xyXG4gICAgdmFyXHJcbiAgICAkdGhpcyA9ICQoZWxlbWVudCksXHJcbiAgICBkYXRhVGFyZ2V0ID0gJHRoaXMuYXR0cignZGF0YS10YXJnZXQnKSxcclxuICAgICR3cmFwLCAkY29udGFpbmVyO1xyXG5cclxuICAgIHN3aXRjaCAoZGF0YVRhcmdldCkge1xyXG4gICAgICBjYXNlIFwicHJldkVsZW1lbnRcIjpcclxuICAgICAgICAkd3JhcCA9ICR0aGlzLnByZXYoKTtcclxuICAgICAgICAkY29udGFpbmVyID0gJHdyYXAuZmluZChcIi5zaG93LW1vcmVfX2NvbnRlbnRcIikuZmlyc3QoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIm5leHRFbGVtZW50XCI6XHJcbiAgICAgICAgJHdyYXAgPSAkdGhpcy5uZXh0KCk7XHJcbiAgICAgICAgJGNvbnRhaW5lciA9ICR3cmFwLmZpbmQoXCIuc2hvdy1tb3JlX19jb250ZW50XCIpLmZpcnN0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBsZXQgXHJcbiAgICAgICAgd3JhcElkID0gJHRoaXMuYXR0cihgZGF0YS10YXJnZXRgKTtcclxuICAgICAgICAkd3JhcCA9ICQoYCMke3dyYXBJZH1gKTtcclxuICAgICAgICAkY29udGFpbmVyID0gJHdyYXAuZmluZChcIi5zaG93LW1vcmVfX2NvbnRlbnRcIikuZmlyc3QoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKCR3cmFwLm91dGVySGVpZ2h0KCB0cnVlICkgPCAkY29udGFpbmVyLm91dGVySGVpZ2h0KCB0cnVlICkpIHtcclxuICAgICAgJHRoaXMucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xyXG4gICAgICAkdGhpcy5vbihcImNsaWNrXCIsIHskdGhpc30sIGNsaWNrKTsgICAgICAgICAgXHJcbiAgICB9IFxyXG4gICAgZWxzZSB7XHJcbiAgICAgICR0aGlzLmFkZENsYXNzKFwiaGlkZVwiKTtcclxuICAgIH1cclxuXHJcbiAgfTtcclxuXHJcbiAgdmFyXHJcbiAgY2xpY2sgPSAocGFyYW1EYXRhKSA9PiB7XHJcbiAgICB2YXIgXHJcbiAgICBwYXJhbSA9IHBhcmFtRGF0YS5kYXRhLFxyXG4gICAgJHRoaXMgPSBwYXJhbS4kdGhpcyxcclxuICAgIGRhdGFUYXJnZXQgPSAkdGhpcy5hdHRyKGBkYXRhLXRhcmdldGApLFxyXG4gICAgJGNvbnRhaW5lcixcclxuICAgICR3cmFwO1xyXG5cclxuICAgIHN3aXRjaCAoZGF0YVRhcmdldCkge1xyXG4gICAgICBjYXNlIFwicHJldkVsZW1lbnRcIjpcclxuICAgICAgICAkd3JhcCA9ICR0aGlzLnByZXYoKTtcclxuICAgICAgICAkY29udGFpbmVyID0gJHdyYXAuZmluZChcIi5zaG93LW1vcmVfX2NvbnRlbnRcIikuZmlyc3QoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIm5leHRFbGVtZW50XCI6XHJcbiAgICAgICAgJHdyYXAgPSAkdGhpcy5uZXh0KCk7XHJcbiAgICAgICAgJGNvbnRhaW5lciA9ICR3cmFwLmZpbmQoXCIuc2hvdy1tb3JlX19jb250ZW50XCIpLmZpcnN0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICAkY29udGFpbmVyID0gJHRoaXM7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCR0aGlzLmhhc0NsYXNzKFwianNfYWN0aXZlXCIpKSB7XHJcbiAgICAgIG9mZigkdGhpcywgJHdyYXAsICRjb250YWluZXIpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZygkY29udGFpbmVyKTtcclxuICAgIG9uKCR0aGlzLCAkd3JhcCwgJGNvbnRhaW5lcik7XHJcbiAgfTtcclxuXHJcbiAgdmFyXHJcbiAgb24gPSAoJGxpbmssICRpdGVtLCAkY29udGFpbmVyKSA9PiB7XHJcblxyXG4gICAgJGxpbmsuYWRkQ2xhc3MoXCJqc19hY3RpdmVcIik7XHJcblxyXG4gICAgVFJBTlNJVElPTkhFSUdIVC5vbih7XHJcbiAgICAgICR0aGlzOiAkaXRlbSwgXHJcbiAgICAgICRjbGlja2VkOiAkbGluayxcclxuICAgICAgJGNvbnRhaW5lcjogJGNvbnRhaW5lciwgICAgICAgICAgICBcclxuICAgICAgY2FsbGJhY2s6ICgpID0+IHtcclxuICAgICAgICAkaXRlbS5hZGRDbGFzcyhcInNob3ctbW9yZS0tYWN0aXZlXCIpO1xyXG4gICAgICB9LCAgXHJcbiAgICB9KTtcclxuICB9O1xyXG4gIFxyXG4gIHZhclxyXG4gIG9mZiA9ICgkbGluaywgJGl0ZW0sICRjb250YWluZXIpID0+IHtcclxuXHJcbiAgICAkbGluay5yZW1vdmVDbGFzcyhcImpzX2FjdGl2ZVwiKTtcclxuXHJcbiAgICBUUkFOU0lUSU9OSEVJR0hULm9mZih7XHJcbiAgICAgICR0aGlzOiAkaXRlbSwgXHJcbiAgICAgICRjb250YWluZXI6ICRjb250YWluZXIsICAgIFxyXG4gICAgICBjYWxsYmFja0JlZm9yZTogKCkgPT4ge1xyXG4gICAgICAgICRpdGVtLnJlbW92ZUNsYXNzKFwic2hvdy1tb3JlLS1hY3RpdmVcIik7XHJcbiAgICAgIH0gXHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBzdGFydCgpO1xyXG5cclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IChhcmd1bWVudCkgPT4ge1xyXG4gICAgXHJcbiAgICB2YXIgXHJcbiAgICBTQ1JPTEwgICAgICAgICAgICAgID0gbnVsbDtcclxuICAgIEVMRU1FTlRTICAgICAgICAgICAgPSBudWxsO1xyXG4gICAgREVWSUNFICAgICAgICAgICAgICA9IG51bGw7XHJcbiAgICBSRVNJWkUgICAgICAgICAgICAgID0gbnVsbDtcclxuXHJcbiAgICB2YXJcclxuICAgIERBVEEgPSB7fSxcclxuICAgIGFjdGl2ZU1vZHVsZSA9IGZhbHNlO1xyXG5cclxuICAgIHZhclxyXG4gICAgQ0xBU1MgPSB7XHJcbiAgICAgICAgZml4ZWQgICAgICAgICAgIDogYGpzLXN0aWNreS1zcHktLWZpeGVkYCxcclxuICAgICAgICBib3R0b20gICAgICAgICAgOiBganMtc3RpY2t5LXNweS0tYm90dG9tYCxcclxuICAgIH07XHJcblxyXG4gICAgLyogU3RhcnQgbW9kdWxlICovXHJcbiAgICBjb25zdFxyXG4gICAgc3RhcnQgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIC8qIFByZXBhcmUgYXJndW1lbnRzIGRhdGEgKi9cclxuICAgICAgICBTQ1JPTEwgPSBhcmd1bWVudC5TQ1JPTEw7XHJcbiAgICAgICAgRUxFTUVOVFMgPSBhcmd1bWVudC5FTEVNRU5UUztcclxuICAgICAgICBEQVRBID0gYXJndW1lbnQuREFUQTtcclxuICAgICAgICBERVZJQ0UgPSBhcmd1bWVudC5ERVZJQ0U7XHJcbiAgICAgICAgUkVTSVpFID0gYXJndW1lbnQuUkVTSVpFO1xyXG5cclxuICAgICAgICAvKiBSdW4gKi9cclxuICAgICAgICByZWZyZXNoKCk7XHJcblxyXG4gICAgICAgIGlmIChhY3RpdmVNb2R1bGUpIHtcclxuICAgICAgICAgICAgLyogQmluZCAqL1xyXG4gICAgICAgICAgICBSRVNJWkUuYWRkKCdzdGlja3lTcHknLCByZWZyZXNoLCAnYWxsJyk7XHJcbiAgICAgICAgICAgIEVMRU1FTlRTLiR3aW5kb3cuc2Nyb2xsKCBzY3JvbGwgKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qIFJlZnJlc2ggbW9kdWxlICovXHJcbiAgICBjb25zdFxyXG4gICAgcmVmcmVzaCA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gREFUQSkge1xyXG4gICAgICAgICAgICBpZiAoREFUQS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gREFUQVtrZXldO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC4kaXRlbS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlTW9kdWxlID0gdHJ1ZTtcclxuXHJcblx0XHRcdFx0XHQvKiBDbGVhbiBzdHlsZSAqL1xyXG5cdFx0XHRcdFx0ZWxlbWVudC5hY3RpdmUgPSBmYWxzZTtcclxuXHRcdFx0XHRcdGVsZW1lbnQuJGl0ZW0ucmVtb3ZlQ2xhc3MoYCR7Q0xBU1MuYm90dG9tfSAke0NMQVNTLnJ1bn1gKTtcclxuXHJcblx0XHRcdFx0XHQvKiBQcmVwYXJlIGNhbGN1bGF0ZSAqL1xyXG5cdFx0XHRcdFx0bGV0XHJcblx0XHRcdFx0XHRjb250YWluZXJPZmZzZXQgPSBlbGVtZW50LiRjb250YWluZXIub2Zmc2V0KCksXHJcblx0XHRcdFx0XHRjb250YWluZXJIZWlnaHQgPSBlbGVtZW50LiRjb250YWluZXIub3V0ZXJIZWlnaHQodHJ1ZSksXHJcblx0XHRcdFx0XHRpdGVtT2Zmc2V0ID0gZWxlbWVudC4kaXRlbS5vZmZzZXQoKSxcclxuXHRcdFx0XHRcdGl0ZW1IZWlnaHQgPSBlbGVtZW50LiRpdGVtLm91dGVySGVpZ2h0KHRydWUpO1xyXG5cclxuXHRcdFx0XHRcdC8qIENhbGN1bGF0ZSBjb250YWluZXIgKi9cclxuXHRcdFx0XHRcdGVsZW1lbnQuY29udGFpbmVyID0ge1xyXG5cdFx0XHRcdFx0XHRoZWlnaHQ6IGNvbnRhaW5lckhlaWdodCxcclxuXHRcdFx0XHRcdFx0d2lkdGg6IGVsZW1lbnQuJGNvbnRhaW5lci5vdXRlcldpZHRoKHRydWUpLFxyXG5cdFx0XHRcdFx0XHRvZmZzZXQ6IHtcclxuXHRcdFx0XHRcdFx0XHR0b3AgICAgICAgICAgICAgOiBjb250YWluZXJPZmZzZXQudG9wLFxyXG5cdFx0XHRcdFx0XHRcdGJvdHRvbSAgICAgICAgICA6IGNvbnRhaW5lck9mZnNldC50b3AgKyBjb250YWluZXJIZWlnaHQsXHJcblx0XHRcdFx0XHRcdFx0bGVmdCAgICAgICAgICAgIDogY29udGFpbmVyT2Zmc2V0LmxlZnQsXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvKiBDYWxjdWxhdGUgaXRlbSAqL1xyXG5cdFx0XHRcdFx0ZWxlbWVudC5pdGVtID0ge1xyXG5cdFx0XHRcdFx0XHRoZWlnaHQ6IGl0ZW1IZWlnaHQsXHJcblx0XHRcdFx0XHRcdG9mZnNldDoge1xyXG5cdFx0XHRcdFx0XHRcdHRvcCAgICAgICAgICAgICA6IGl0ZW1PZmZzZXQudG9wLFxyXG5cdFx0XHRcdFx0XHRcdGJvdHRvbSAgICAgICAgICA6IGl0ZW1PZmZzZXQudG9wICsgaXRlbUhlaWdodCxcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0LyogU2V0IHN0eWxlIHRvIGl0ZW0gKi9cclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LiRpdGVtLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoICAgICAgICAgICAgICAgOiBlbGVtZW50LmNvbnRhaW5lci53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdFx0XHRcdFx0OiBlbGVtZW50LmNvbnRhaW5lci5vZmZzZXQubGVmdCxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgICAgICAgICAgICAgREVCVUcudmFyaWFibGUuYWRkKGBTdGlja3kgU3B5ICR7a2V5fWAsIGVsZW1lbnQuaXRlbS5vZmZzZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWN0aXZlTW9kdWxlKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3RcclxuICAgIHNjcm9sbCA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gREFUQSkge1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gREFUQVtrZXldO1xyXG5cclxuXHRcdFx0LyogUHJlcGFyZSBjYWxjdWxhdGUgKi9cclxuICAgICAgICAgICAgbGV0XHJcbiAgICAgICAgICAgIG9mZnNldCA9IGVsZW1lbnQuJGl0ZW0ub2Zmc2V0KCk7XHJcblxyXG5cdFx0XHRlbGVtZW50Lml0ZW0ub2Zmc2V0LnRvcCA9IG9mZnNldC50b3A7XHJcblx0XHRcdGVsZW1lbnQuaXRlbS5vZmZzZXQuYm90dG9tID0gb2Zmc2V0LnRvcCArIGVsZW1lbnQuaXRlbS5oZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAvLyBkZWJ1Z2dlcjtcclxuXHJcbiAgICAgICAgICAgIGxldFxyXG4gICAgICAgICAgICBpc0JvdHRvbSA9IGVsZW1lbnQuaXRlbS5oZWlnaHQgKyBTQ1JPTEwudG9wID49IGVsZW1lbnQuY29udGFpbmVyLm9mZnNldC5ib3R0b20gJiYgU0NST0xMLmJvdHRvbSA+IGVsZW1lbnQuY29udGFpbmVyLm9mZnNldC5ib3R0b20sXHJcbiAgICAgICAgICAgIGlzVG9wID0gZWxlbWVudC5hY3RpdmUgJiYgIWlzQm90dG9tICYmIGVsZW1lbnQuaXRlbS5vZmZzZXQudG9wIDw9IGVsZW1lbnQuY29udGFpbmVyLm9mZnNldC50b3AgJiYgU0NST0xMLmJlZ2luIDw9IGVsZW1lbnQuY29udGFpbmVyLm9mZnNldC50b3AsXHJcbiAgICAgICAgICAgIGlzRml4ZWQgPSBlbGVtZW50LmFjdGl2ZSAhPSAxICYmICFpc0JvdHRvbSAmJiBTQ1JPTEwuYmVnaW4gPiBlbGVtZW50LmNvbnRhaW5lci5vZmZzZXQudG9wO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgdG9wIHBvc2l0aW9uXHJcblx0XHRcdGlmIChpc0ZpeGVkKSB7XHJcblx0XHRcdFx0ZWxlbWVudC4kaXRlbS5hZGRDbGFzcyhgJHtDTEFTUy5maXhlZH1gKS5yZW1vdmVDbGFzcyhgJHtDTEFTUy5ib3R0b219YCk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFjdGl2ZSA9IDE7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuJGl0ZW0uY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICB0b3A6ICQoJyNoZWFkZXInKS5vdXRlckhlaWdodCggdHJ1ZSApLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGlzVG9wKSB7XHJcblx0XHRcdFx0ZWxlbWVudC4kaXRlbS5yZW1vdmVDbGFzcyhgJHtDTEFTUy5ib3R0b219ICR7Q0xBU1MuZml4ZWR9YCk7XHJcblx0XHRcdFx0ZWxlbWVudC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgYm90dG9tIHBvc2l0aW9uXHJcbiAgICAgICAgICAgIGlmIChpc0JvdHRvbSAmJiBlbGVtZW50LmFjdGl2ZSAhPSAyKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LiRpdGVtLmFkZENsYXNzKGAke0NMQVNTLmJvdHRvbX1gKS5yZW1vdmVDbGFzcyhgJHtDTEFTUy5maXhlZH1gKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuYWN0aXZlID0gMjtcclxuICAgICAgICAgICAgfSBcclxuXHJcbiAgICAgICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgICAgICBERUJVRy52YXJpYWJsZS5yZWZyZXNoKGBTdGlja3kgU3B5ICR7a2V5fWApO1xyXG4gICAgICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBzdGFydCgpO1xyXG5cclxuICAgIHJldHVybiBEQVRBO1xyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gKGRhdGEpID0+IHtcclxuXHJcbiAgdmFyICBcclxuICAkRUxFTUVOVFMgPSB7XHJcbiAgICBsaW5rczogW10sXHJcbiAgfSxcclxuICBEQVRBID0gbnVsbCxcclxuICBTRVRUSU5HUyA9IHtcclxuICAgIG1hdGNoOiB7XHJcbiAgICAgIHN3aXRjaDogXCJ0YWItc3dpdGNoXCIsXHJcbiAgICAgIGZpZWxkOiBcInRhYi1maWVsZFwiLFxyXG4gICAgICBjb250ZW50OiBcInRhYi1jb250ZW50XCIsXHJcbiAgICB9LFxyXG4gIH07XHJcblxyXG4gIHZhclxyXG4gIHN0YXJ0ID0gKCkgPT4ge1xyXG4gICAgXHJcbiAgICAkLmV4dGVuZCggU0VUVElOR1MsIGRhdGEuU0VUVElOR1MgKTtcclxuXHJcbiAgICByZWZyZXNoKCk7XHJcbiAgfTtcclxuXHJcbiAgdmFyXHJcbiAgcmVmcmVzaCA9ICgpID0+IHtcclxuXHJcbiAgICBpZiAoJEVMRU1FTlRTLmxpbmtzLmxlbmd0aCkge1xyXG4gICAgICAkRUxFTUVOVFMubGlua3Mub2ZmKFwiY2xpY2tcIiwgY2hhbmdlVGFiKTtcclxuICAgIH1cclxuXHJcbiAgICAkRUxFTUVOVFMuZmllbGRzID0gJChgLiR7U0VUVElOR1MubWF0Y2guZmllbGR9YCk7XHJcblxyXG4gICAgZmlsbERhdGFiYXNlKCk7XHJcblxyXG4gICAgaWYgKCRFTEVNRU5UUy5saW5rcy5sZW5ndGgpIHtcclxuICAgICAgJEVMRU1FTlRTLmxpbmtzLm9uKFwiY2xpY2tcIiwgY2hhbmdlVGFiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgIERFQlVHLmNvbnNvbGUuYWRkKGB0YWJzIDogcmVmcmVzaCB7bGVuZ3RoICR7JEVMRU1FTlRTLmZpZWxkcy5sZW5ndGh9fWApO1xyXG4gICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICB9O1xyXG5cclxuICB2YXJcclxuICBmaWxsRGF0YWJhc2UgPSAoKSA9PiB7XHJcblxyXG4gICAgREFUQSA9IHt9O1xyXG5cclxuICAgICRFTEVNRU5UUy5maWVsZHMuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcclxuICAgICAgXHJcbiAgICAgIHZhclxyXG4gICAgICAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgIGZpZWxkID0gJHRoaXMuYXR0cihcImRhdGEtdGFicy1maWVsZFwiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgIERBVEFbZmllbGRdID0ge1xyXG4gICAgICAgIHN3aXRjaEFjdGl2ZTogbnVsbCxcclxuICAgICAgICBjb250ZW50QWN0aXZlOiBudWxsLFxyXG4gICAgICB9O1xyXG4gICAgICBcclxuICAgIH0pO1xyXG5cclxuICB9O1xyXG5cclxuICB2YXJcclxuICBjaGFuZ2VUYWIgPSAoKSA9PiB7XHJcblxyXG5cclxuXHJcbiAgfTtcclxuXHJcbiAgXHJcbiAgICAvLyAvLyBGdW5jdGlvbiBmb3IgY2xpY2tlZCBlbGVtZW50c1xyXG4gICAgLy8gb25DbGljazogZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgIHZhciBzZWxmID0gTWFpbi50YWJzO1xyXG4gICAgICBcclxuICAgIC8vICAgdmFyICR0aGlzID0gJCh0aGlzKSxcclxuICAgIC8vICAgICAgIGRhdGFUYWJzID0gJHRoaXMuYXR0cignZGF0YS10YWJzJyksXHJcbiAgICAvLyAgICAgICBkYXRhVGFic1N0ZXAgPSAkdGhpcy5hdHRyKCdkYXRhLXRhYnMtc3RlcCcpO1xyXG4gIFxyXG4gICAgLy8gICBpZiAoc2VsZi5kYXRhW2RhdGFUYWJzXS5hY3RpdmUgIT09IGRhdGFUYWJzU3RlcCkge1xyXG4gIFxyXG4gICAgLy8gICAgIHZhciBkYXRhID0gc2VsZi5kYXRhW2RhdGFUYWJzXSxcclxuICAgIC8vICAgICAgICAgY29udGVudEhlaWdodCA9IGRhdGEuJGFjdGl2ZUNvbnRlbnQub3V0ZXJIZWlnaHQoIHRydWUgKTtcclxuICBcclxuICAgIC8vICAgICBpZiAoIWRhdGEuYmxvY2spIHtcclxuICAgIC8vICAgICAgIGRhdGEuYmxvY2sgPSB0cnVlO1xyXG4gIFxyXG4gICAgLy8gICAgICAgdmFyICRjbGlja2VkVGFiID0gZGF0YS4kaXRlbXMuZXEoZGF0YVRhYnNTdGVwKTtcclxuICAgIFxyXG4gICAgLy8gICAgICAgJGNsaWNrZWRUYWIuYWRkQ2xhc3MoXCJqc190YWJzLS1hY3RpdmVcIik7XHJcbiAgXHJcbiAgICAvLyAgICAgICBkYXRhLiRhY3RpdmVDb250ZW50LmNzcyh7aGVpZ2h0OiBjb250ZW50SGVpZ2h0fSk7XHJcbiAgICAvLyAgICAgICBkYXRhLiRjb250ZW50LmNzcyh7aGVpZ2h0OiBjb250ZW50SGVpZ2h0fSk7XHJcbiAgICAvLyAgICAgICBkYXRhLiRhY3RpdmVDb250ZW50LnJlbW92ZUNsYXNzKFwianNfdGFicy0tYWN0aXZlXCIpO1xyXG4gICAgXHJcbiAgICAvLyAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgIFxyXG4gICAgLy8gICAgICAgICBkYXRhLiRhY3RpdmVDb250ZW50LmNzcygnaGVpZ2h0JywgJycpO1xyXG4gICAgLy8gICAgICAgICBkYXRhLiRhY3RpdmVUYWIucmVtb3ZlQ2xhc3MoXCJqc190YWJzLS1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgLy8gICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgIFxyXG4gICAgLy8gICAgICAgICAgIGRhdGEuJGFjdGl2ZUNvbnRlbnQgPSBkYXRhLiRjb250ZW50SXRlbXMuZXEoZGF0YVRhYnNTdGVwKTtcclxuICAgIC8vICAgICAgICAgICBkYXRhLiRhY3RpdmVUYWIgPSAkY2xpY2tlZFRhYjtcclxuICAgIFxyXG4gICAgLy8gICAgICAgICAgIGNvbnRlbnRIZWlnaHQgPSBkYXRhLiRhY3RpdmVDb250ZW50LmNoaWxkcmVuKCkub3V0ZXJIZWlnaHQoIHRydWUgKTtcclxuICAgIC8vICAgICAgICAgICBkYXRhLiRjb250ZW50LmNzcyh7aGVpZ2h0OiBjb250ZW50SGVpZ2h0fSk7XHJcbiAgICAvLyAgICAgICAgICAgZGF0YS4kYWN0aXZlQ29udGVudC5jc3Moe2hlaWdodDogY29udGVudEhlaWdodH0pO1xyXG4gICAgXHJcbiAgICAvLyAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICBcclxuICAgIC8vICAgICAgICAgICAgIGRhdGEuJGFjdGl2ZUNvbnRlbnQuYWRkQ2xhc3MoXCJqc190YWJzLS1hY3RpdmVcIik7XHJcbiAgICAvLyAgICAgICAgICAgICBkYXRhLiRhY3RpdmVDb250ZW50LmNzcygnaGVpZ2h0JywgJycpO1xyXG4gICAgLy8gICAgICAgICAgICAgZGF0YS4kY29udGVudC5jc3MoJ2hlaWdodCcsICcnKTtcclxuICAgIFxyXG4gICAgLy8gICAgICAgICAgICAgZGF0YS5ibG9jayA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgLy8gICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgIFxyXG4gICAgLy8gICAgICAgICB9LCAyMDApO1xyXG4gICAgXHJcbiAgICAvLyAgICAgICB9LCAxKTtcclxuICBcclxuICAgIC8vICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgLy8gICAgICAgbGV0IG5hbWUgPSAnVGFicyAnICsgZGF0YVRhYnMgKyAnIGFjdGl2ZSc7XHJcbiAgICAvLyAgICAgICBsZXQgZGVidWdPYmplY3QgPSB7fTtcclxuICAgIC8vICAgICAgIGRlYnVnT2JqZWN0W25hbWVdID0gZGF0YVRhYnNTdGVwO1xyXG4gICAgLy8gICAgICAgTWFpbi5kZWJ1Z1ZhcmlhYmxlcy5hZGQoZGVidWdPYmplY3QpO1xyXG4gICAgLy8gICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG4gIFxyXG4gICAgLy8gICAgIH0gXHJcbiAgICAvLyAgICAgZGF0YS5hY3RpdmUgPSBkYXRhVGFic1N0ZXA7XHJcbiAgICAvLyAgIH1cclxuICBcclxuICAgIC8vICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgLy8gfSxcclxuICBcclxuICAgIC8vIGFkZChkYXRhVGFicywgc2V0dGluZ3MgPSBudWxsKSB7XHJcblxyXG4gICAgLy8gICB2YXIgc2VsZiA9IE1haW4udGFicztcclxuICBcclxuICAgIC8vICAgdmFyICRpdGVtcyA9ICQoJ1tkYXRhLXRhYnM9XCInKyBkYXRhVGFicyArJ1wiXScpO1xyXG4gIFxyXG4gICAgLy8gICBpZiAoJGl0ZW1zLmxlbmd0aCkge1xyXG4gIFxyXG4gICAgLy8gICAgIHZhciAkY29udGVudCA9ICQoJ1tkYXRhLXRhYnMtY29udGVudD1cIicrIGRhdGFUYWJzICsnXCJdJyksXHJcbiAgICAvLyAgICAgICAgIG91dHB1dCA9IHt9O1xyXG4gIFxyXG4gICAgLy8gICAgIG91dHB1dCA9IHt9O1xyXG4gICAgLy8gICAgIG91dHB1dC4kaXRlbXMgPSAkaXRlbXM7XHJcbiAgICAvLyAgICAgb3V0cHV0LiRjb250ZW50ID0gJGNvbnRlbnQ7XHJcbiAgICAvLyAgICAgb3V0cHV0LiRjb250ZW50SXRlbXMgPSAkY29udGVudC5maW5kKFwiW2RhdGEtdGFicy1jb250ZW50LXN0ZXBdXCIpO1xyXG4gICAgLy8gICAgIG91dHB1dC5ibG9jayA9IGZhbHNlO1xyXG4gIFxyXG4gICAgLy8gICAgIHZhciAkYWN0aXZlQ29udGVudCA9ICRjb250ZW50LmZpbmQoXCIuanNfdGFicy0tYWN0aXZlXCIpO1xyXG4gICAgICAgIFxyXG4gICAgLy8gICAgIGlmICgkYWN0aXZlQ29udGVudC5sZW5ndGgpIHtcclxuICAgIC8vICAgICAgIG91dHB1dC4kYWN0aXZlQ29udGVudCA9ICRhY3RpdmVDb250ZW50O1xyXG4gICAgLy8gICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICBvdXRwdXQuJGFjdGl2ZUNvbnRlbnQgPSBmYWxzZTtcclxuICAgIC8vICAgICB9XHJcbiAgXHJcbiAgICAvLyAgICAgdmFyICRhY3RpdmVUYWIgPSAkaXRlbXMucGFyZW50KCkuZmluZChcIi5qc190YWJzLS1hY3RpdmVcIik7XHJcbiAgICAgICAgXHJcbiAgICAvLyAgICAgaWYgKCRhY3RpdmVUYWIubGVuZ3RoKSB7XHJcbiAgICAvLyAgICAgICBvdXRwdXQuJGFjdGl2ZVRhYiA9ICRhY3RpdmVUYWI7XHJcbiAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgIG91dHB1dC4kYWN0aXZlVGFiID0gZmFsc2U7XHJcbiAgICAvLyAgICAgfVxyXG4gIFxyXG4gICAgLy8gICAgIHNlbGYuZGF0YVtkYXRhVGFic10gPSBvdXRwdXQ7XHJcbiAgXHJcbiAgICAvLyAgICAgJGl0ZW1zLm9uKFwiY2xpY2tcIiwgc2VsZi5vbkNsaWNrKTtcclxuICBcclxuICAgIC8vICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgIC8vICAgICBpZiAoKHR5cGVvZiBvdXRwdXQuJGFjdGl2ZVRhYiA9PT0gJ29iamVjdCcpICsgKHR5cGVvZiBvdXRwdXQuJGFjdGl2ZUNvbnRlbnQgPT09ICdvYmplY3QnKSA9PT0gMikge1xyXG4gICAgLy8gICAgICAgbGV0IG5hbWUgPSBcIlRhYnMgXCIgKyBkYXRhVGFicyArIFwiIGFjdGl2ZVwiO1xyXG4gICAgLy8gICAgICAgbGV0IGRlYnVnT2JqZWN0ID0ge307XHJcbiAgICAvLyAgICAgICBkZWJ1Z09iamVjdFtuYW1lXSA9IG91dHB1dC4kYWN0aXZlVGFiLmF0dHIoXCJkYXRhLXRhYnMtc3RlcFwiKTtcclxuICAgIC8vICAgICAgIE1haW4uZGVidWdWYXJpYWJsZXMuYWRkKGRlYnVnT2JqZWN0KTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgTWFpbi5kZWJ1Z0NvbnNvbGUuYWRkKFwiQWRkIHRhYnMgJ1wiICsgZGF0YVRhYnMgKyBcIicge2xlbmd0aDogXCIrICRpdGVtcy5sZW5ndGggK1wiO31cIik7XHJcbiAgICAvLyAgICAgaWYgKCRpdGVtcy5sZW5ndGggIT09IG91dHB1dC4kY29udGVudEl0ZW1zLmxlbmd0aCkge1xyXG4gICAgLy8gICAgICAgTWFpbi5kZWJ1Z0NvbnNvbGUuYWRkKFwiVGFicyAnXCIgKyBkYXRhVGFicyArIFwiJyAtIGxlbmd0aCBkbyBub3QgbWF0Y2gge3RhYnM6IFwiICsgJGl0ZW1zLmxlbmd0aCArIFwiOyBjb250ZW50czogXCIgKyBvdXRwdXQuJGNvbnRlbnRJdGVtcy5sZW5ndGggKyBcIjt9XCIsIFwid2FybmluZ1wiKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgaWYgKCh0eXBlb2Ygb3V0cHV0LiRhY3RpdmVUYWIgPT09ICdvYmplY3QnKSArICh0eXBlb2Ygb3V0cHV0LiRhY3RpdmVDb250ZW50ID09PSAnb2JqZWN0JykgPT09IDEpIHtcclxuICAgIC8vICAgICAgIE1haW4uZGVidWdDb25zb2xlLmFkZChcIlRhYnMgJ1wiICsgZGF0YVRhYnMgKyBcIicgLSBhY3RpdmUgY2xhc3MgZG8gbm90IG1hdGNoIHthY3RpdmVUYWI6IFwiICsgb3V0cHV0LiRhY3RpdmVUYWIgKyBcIjsgJGFjdGl2ZUNvbnRlbnQ6IFwiICsgb3V0cHV0LiRhY3RpdmVDb250ZW50ICsgXCI7fVwiLCBcIndhcm5pbmdcIik7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICBcclxuICAgIC8vICAgfVxyXG4gIFxyXG4gICAgLy8gfVxyXG5cclxuICAgIHN0YXJ0KCk7XHJcblxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gKGRhdGEpID0+IHtcclxuXHJcbiAgICB2YXJcclxuICAgIERBVEEgPSBbXSwgICAgICAvKiBPcGVuZWQgKHRyYW5zaXRpb25lZCBvbikgalF1ZXJ5IGVsZW1lbnRzICovXHJcbiAgICBCUk9XU0VSOyAgICAgICAgLyogYnJvd3Nlci5qcyBkYXRhICovXHJcblxyXG4gICAgdmFyXHJcbiAgICBzdGFydCA9ICgpID0+IHtcclxuICAgICAgICBCUk9XU0VSID0gZGF0YS5CUk9XU0VSO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRvZ2dsZSB0cmFuc2l0aW9uIGhlaWdodFxyXG4gICAgICovXHJcbiAgICB2YXJcclxuICAgIHRvZ2dsZSA9IChvcHRpb25zKSA9PiB7XHJcblxyXG4gICAgICAgIGxldFxyXG4gICAgICAgIGFjdGl2ZSA9IG51bGw7XHJcblxyXG4gICAgICAgICQuZWFjaChEQVRBLCBmdW5jdGlvbiAoaW5kZXhJbkFycmF5LCB2YWx1ZU9mRWxlbWVudCkgeyBcclxuICAgICAgICAgICAgIGlmICggb3B0aW9ucy4kY2xpY2tlZC5pcyh2YWx1ZU9mRWxlbWVudCkgKSB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmUgPSB2YWx1ZU9mRWxlbWVudDsgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7ICAgICAgICAgXHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgICAgICAgREFUQS5zcGxpY2UoIG9wdGlvbnMuJGNsaWNrZWQsIDEgKTsgICAgIFxyXG4gICAgICAgICAgICBvZmYob3B0aW9ucyk7ICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgREFUQS5wdXNoKCBvcHRpb25zLiRjbGlja2VkICk7ICAgXHJcbiAgICAgICAgICAgIG9uKG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIHRyYW5zaXRpb25cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFxyXG4gICAgICogJHRoaXMge2pRdWVyeSBvYmplY3R9IFxyXG4gICAgICogdGltZSB7TnVtYmVyfVxyXG4gICAgICogY2FsbGJhY2sge0Z1bmN0aW9ufSBcclxuICAgICAqL1xyXG4gICAgdmFyXHJcbiAgICBvbiA9IChwYXJhbSkgPT4ge1xyXG4gICAgICAgIHZhclxyXG4gICAgICAgICRjaGlsZCwgaGVpZ2h0O1xyXG5cclxuICAgICAgICBpZiAocGFyYW0uJGNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICBoZWlnaHQgPSBwYXJhbS4kY29udGFpbmVyLmNoaWxkcmVuKCkub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJGNoaWxkID0gcGFyYW0uJHRoaXMuY2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgaGVpZ2h0ID0gJGNoaWxkLm91dGVySGVpZ2h0KHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgREVCVUcuY29uc29sZS5hZGQoYENsaWNrZWQgXCJTaG93IG1vcmVcIiBvbiB7JGNvbnRhaW5lciAke2hlaWdodH19YCwgXCJjbGlja1wiKTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgICAgIHBhcmFtLiRjbGlja2VkXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcyhcImpzX2V4cGFuZF9fbGluay0tYWN0aXZlXCIpO1xyXG5cclxuICAgICAgICBwYXJhbS4kY29udGFpbmVyXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcyhcImpzX3RyYW5zaXRpb25IZWlnaHRcIilcclxuICAgICAgICAgICAgLmNzcygnaGVpZ2h0JywgaGVpZ2h0KVxyXG4gICAgICAgICAgICAub25lKEJST1dTRVIudHJhbnNpdGlvbkV2ZW50LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHBhcmFtLiRjb250YWluZXJcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJqc190cmFuc2l0aW9uSGVpZ2h0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKFwianNfZXhwYW5kX19jb250YWluZXItLWFjdGl2ZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsICcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW0uY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAocGFyYW0uY2FsbGJhY2soKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhclxyXG4gICAgb2ZmID0gKHBhcmFtKSA9PiB7XHJcblxyXG4gICAgICAgIHZhclxyXG4gICAgICAgIGhlaWdodCA9IHBhcmFtLiRjb250YWluZXIub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgREVCVUcuY29uc29sZS5hZGQoYENsaWNrZWQgXCJTaG93IG1vcmVcIiBvZmZgLCBcImNsaWNrXCIpO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuXHJcbiAgICAgICAgcGFyYW0uJGNsaWNrZWRcclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwianNfZXhwYW5kX19saW5rLS1hY3RpdmVcIik7XHJcbiAgICAgICBcclxuICAgICAgICBwYXJhbS4kY29udGFpbmVyXHJcbiAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsIGhlaWdodClcclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwianNfZXhwYW5kX19jb250YWluZXItLWFjdGl2ZVwiKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoXCJqc190cmFuc2l0aW9uSGVpZ2h0XCIpXHJcbiAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsICcnKVxyXG4gICAgICAgICAgICAub25lKEJST1dTRVIudHJhbnNpdGlvbkV2ZW50LCAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgcGFyYW0uJGNvbnRhaW5lclxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcImpzX2V4cGFuZF9fY29udGFpbmVyLS1jbG9zZSBqc190cmFuc2l0aW9uSGVpZ2h0XCIpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKHBhcmFtLmNhbGxiYWNrKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXJ0KGRhdGEpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdG9nZ2xlOiB0b2dnbGUsXHJcbiAgICAgICAgb246IG9uLFxyXG4gICAgICAgIG9mZjogb2ZmLFxyXG4gICAgfTtcclxuXHJcbn07XHJcbiJdfQ==
