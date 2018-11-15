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

        /* Run */
        refresh();

        if (activeModule) {
            /* Bind */
            ELEMENTS.$window.on('resize orientationchange', refresh);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL2Zyb250Ym94L2JpbmQvcmVzaXplLmpzIiwic3JjL2pzL2Zyb250Ym94L2RhdGEvYnJvd3Nlci5qcyIsInNyYy9qcy9mcm9udGJveC9kYXRhL2RldmljZS5qcyIsInNyYy9qcy9mcm9udGJveC9kYXRhL3Njcm9sbC5qcyIsInNyYy9qcy9mcm9udGJveC9kZWJ1Zy9jb25zb2xlLmpzIiwic3JjL2pzL2Zyb250Ym94L2RlYnVnL3ZhcmlhYmxlcy5qcyIsInNyYy9qcy9mcm9udGJveC9mdW5jdGlvbnMuanMiLCJzcmMvanMvZnJvbnRib3gvanF1ZXJ5L3Njcm9sbEJsb2NrLmpzIiwic3JjL2pzL2Zyb250Ym94L25hdmJhci9idXJnZXJNZW51LmpzIiwic3JjL2pzL2Zyb250Ym94L25hdmJhci9zdGlja3kuanMiLCJzcmMvanMvZnJvbnRib3gvc2Nyb2xsVG8uanMiLCJzcmMvanMvZnJvbnRib3gvc2hvd01vcmUuanMiLCJzcmMvanMvZnJvbnRib3gvc3RpY2t5LXNweS5qcyIsInNyYy9qcy9mcm9udGJveC90YWJzLmpzIiwic3JjL2pzL2Zyb250Ym94L3RyYW5zaXRpb25IZWlnaHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9PQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyoqXHJcbiAqIExpYnNcclxuICovXHJcbi8vIGdsb2JhbC4kID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XHJcbi8vIGdsb2JhbC5qUXVlcnkgPSAkO1xyXG4vLyBnbG9iYWwuQ29va2llcyA9IHJlcXVpcmUoJ2pzLWNvb2tpZScpO1xyXG4vLyByZXF1aXJlKCdzbGljay1jYXJvdXNlbCcpO1xyXG4vLyByZXF1aXJlKCdzZWxlY3QyJykoKTtcclxuLy8gcmVxdWlyZSgnLi9mcm9udGJveC9saWJzL2dldFN0eWxlJyk7XHJcbi8vIHZhciBcclxuLy8gU2hhcmVyID0gcmVxdWlyZSgnc2xpY2stY2Fyb3VzZWwnKTsgLy8gaHR0cDovL2VsbGlzb25sZWFvLmdpdGh1Yi5pby9zaGFyZXIuanMvXHJcblxyXG4vKipcclxuICogalF1ZXJ5IHBsdWdpbnNcclxuICovXHJcbnJlcXVpcmUoJy4vZnJvbnRib3gvanF1ZXJ5L3Njcm9sbEJsb2NrJykoKTtcclxuXHJcbihmdW5jdGlvbigkLCBfKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbGVtZW50c1xyXG4gICAgICovXHJcbiAgICB2YXIgXHJcbiAgICBFTEVNRU5UUyA9IHtcclxuICAgICAgICAkYm9keTogJChcImJvZHlcIiksXHJcbiAgICAgICAgJGhlYWRlcjogJChcIiNoZWFkZXJcIiksXHJcbiAgICAgICAgJGhlYWRlclBsYWNlaG9sZGVyOiAkKFwiI2hlYWRlci1wbGFjZWhvbGRlclwiKSxcclxuICAgICAgICAkd2luZG93OiAkKHdpbmRvdyksXHJcbiAgICAgICAgJG92ZXJsYXk6ICQoXCIjcGFnZS1vdmVybGF5XCIpLFxyXG4gICAgICAgICRodG1sOiAkKCdodG1sJyksXHJcbiAgICAgICAgJHBhZ2U6ICQoJ2h0bWwsIGJvZHknKSxcclxuICAgIH07XHJcblxyXG4gICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAvKipcclxuICAgICAqIERlYnVnXHJcbiAgICAgKi9cclxuICAgIGdsb2JhbC5ERUJVRyA9IHt9O1xyXG5cclxuICAgIGdsb2JhbC5ERUJVRy5jb25zb2xlID0gcmVxdWlyZSgnLi9mcm9udGJveC9kZWJ1Zy9jb25zb2xlJykoe1xyXG4gICAgICAgIC8vIG9wZW46IHRydWUsXHJcbiAgICAgICAgRUxFTUVOVFM6IEVMRU1FTlRTLFxyXG4gICAgfSk7XHJcbiAgICBnbG9iYWwuREVCVUcudmFyaWFibGUgPSByZXF1aXJlKCcuL2Zyb250Ym94L2RlYnVnL3ZhcmlhYmxlcycpKHtcclxuICAgICAgICBPUFRJT05TOiB7XHJcbiAgICAgICAgICAgIG9wZW46IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBFTEVNRU5UUzogRUxFTUVOVFMsXHJcbiAgICB9KTtcclxuICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXF1aXJlZFxyXG4gICAgICovXHJcblxyXG4gICAgLyogQ1NTIFZhcmlhYmxlcyAqL1xyXG4gICAgY29uc3RcclxuICAgIHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCc6cm9vdCcpLFxyXG4gICAgQ1NTID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUocm9vdCksXHJcbiAgICBCUkVBS1BPSU5UUyA9IHtcclxuICAgICAgICBkZXNrdG9wOiBOdW1iZXIoQ1NTLmdldFByb3BlcnR5VmFsdWUoXCItLWRlc2t0b3BcIikpLFxyXG4gICAgICAgIHRhYmxldDogTnVtYmVyKENTUy5nZXRQcm9wZXJ0eVZhbHVlKFwiLS10YWJsZXRcIikpLFxyXG4gICAgICAgIGZhYmxldDogTnVtYmVyKENTUy5nZXRQcm9wZXJ0eVZhbHVlKFwiLS1mYWJsZXRcIikpLFxyXG4gICAgICAgIG1vYmlsZTogTnVtYmVyKENTUy5nZXRQcm9wZXJ0eVZhbHVlKFwiLS1tb2JpbGVcIikpLFxyXG4gICAgfTtcclxuXHJcbiAgICAvKiBSZXNpemUgKi9cclxuICAgIHZhciBSRVNJWkUgPSByZXF1aXJlKCcuL2Zyb250Ym94L2JpbmQvcmVzaXplJykoe1xyXG4gICAgICAgIEVMRU1FTlRTOiBFTEVNRU5UUyxcclxuICAgICAgICB0ZW1wbGF0ZToge1xyXG4gICAgICAgICAgICAvLyBsb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgbG9hZGluZzogYDxkaXYgY2xhc3M9XCJhbmltYXRpb24tZG9udXQtc3Bpbm5lclwiPjwvZGl2PmAsXHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBERVZJQ0UgPSByZXF1aXJlKCcuL2Zyb250Ym94L2RhdGEvZGV2aWNlJykoe1xyXG4gICAgICAgIEVMRU1FTlRTOiBFTEVNRU5UUyxcclxuICAgICAgICBSRVNJWkU6IFJFU0laRSxcclxuICAgICAgICBCUkVBS1BPSU5UUzogQlJFQUtQT0lOVFMsXHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgdmFyIEZVTkNUSU9OUyA9IHJlcXVpcmUoJy4vZnJvbnRib3gvZnVuY3Rpb25zJyk7XHJcblxyXG4gICAgdmFyIEJST1dTRVIgPSByZXF1aXJlKCcuL2Zyb250Ym94L2RhdGEvYnJvd3NlcicpKCk7XHJcbiAgICB2YXIgU0NST0xMID0gcmVxdWlyZSgnLi9mcm9udGJveC9kYXRhL3Njcm9sbCcpKHtcclxuICAgICAgICBERVZJQ0U6IERFVklDRSxcclxuICAgICAgICBFTEVNRU5UUzogRUxFTUVOVFMsXHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBBbmltYXRpb25zXHJcbiAgICAgKi9cclxuICAgIHZhciB0cmFuc2l0aW9uSGVpZ2h0ID0gcmVxdWlyZSgnLi9mcm9udGJveC90cmFuc2l0aW9uSGVpZ2h0Jykoe1xyXG4gICAgICAgIEJST1dTRVIgOiBCUk9XU0VSLFxyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNtb290aCBzY3JvbGwgdG8gdGFyZ2V0XHJcbiAgICAgKiBcclxuICAgICAqIUBwYXJhbSB7RUxFTUVOVFN9IEVMRU1FTlRTXHJcbiAgICAgKiFAcGFyYW0ge1NDUk9MTH0gU0NST0xMXHJcbiAgICAgKiFAcGFyYW0ge0ZVTkNUSU9OU30gRlVOQ1RJT05TXHJcbiAgICAgKi9cclxuICAgIHZhciBzY3JvbGxUbyA9IHJlcXVpcmUoJy4vZnJvbnRib3gvc2Nyb2xsVG8nKSh7XHJcbiAgICAgICAgRUxFTUVOVFM6IEVMRU1FTlRTLFxyXG4gICAgICAgIFNDUk9MTDogU0NST0xMLFxyXG4gICAgICAgIEZVTkNUSU9OUzogRlVOQ1RJT05TLFxyXG4gICAgICAgIFNFVFRJTkdTOiB7XHJcbiAgICAgICAgICAgIC8vIGFjdGl2ZSBhdXRvbWF0aWMgc2Nyb2xsIHBhZ2UgdG8gZWxlbWVudCB2aWEgVVJMIGhhc2hcclxuICAgICAgICAgICAgYXV0b1Njcm9sbDogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vIGRpdmlkZSBkaXN0YW5jZSBieSB0aGlzIHZhbHVlIHRvIGNhbGN1bGF0ZSB0aW1lIHNjcm9sbFxyXG4gICAgICAgICAgICB0aW1lOiAyLFxyXG4gICAgICAgICAgICAvLyBtaW4gdGltZSBzY3JvbGxcclxuICAgICAgICAgICAgbWluVGltZTogNDAwLFxyXG4gICAgICAgICAgICAvLyBtYXggdGltZSBzY3JvbGxcclxuICAgICAgICAgICAgbWF4VGltZTogMTIwMCxcclxuICAgICAgICAgICAgLy8gcnVuIGF1dG9TY3JvbGwgd2hlbiBoYXNoIGluIFVSTCBpcyBiZWdpbiB3aXRoIHRoaXMgc3RyaW5nXHJcbiAgICAgICAgICAgIHByZWZpeEF1dG9TY3JvbGw6ICdzY3JvbGwtJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgZml4ZWQgZWxlbWVudCB3aGVuIHBhZ2UgaXMgc2Nyb2xsXHJcbiAgICAgKiBcclxuICAgICAqIUBwYXJhbSB7RUxFTUVOVFN9IEVMRU1FTlRTXHJcbiAgICAgKiFAcGFyYW0ge0VMRU1FTlRTfSBTQ1JPTExcclxuICAgICAqIEBwYXJhbSB7bnVsbCwgbnVtYmVyfSBTRVRUSU5HUy5vZmZzZXQgd2hlbiBjcmVhdGUgc3RpY2t5IGVsZW1lbnRcclxuICAgICAqIG51bGwgLSBhdXRvbWF0aWMgXHJcbiAgICAgKiBudW1iZXIgLSBob3cgbWFueSBwaXhlbCB1c2VyIG1heSBzY3JvbGwgdG8gdHJpZ2dlciBzdGlja3kgICBcclxuICAgICAqIEBwYXJhbSB7Ym9vbH0gU0VUVElOR1MucGxhY2Vob2xkZXIgYWRkIGhlaWdodCB0byBwbGFjZWhvbGRlciB3aGVuIHRyaWdnZXIgc3RpY2t5XHJcbiAgICAgKiBzZXQgdHJ1ZSBvbmx5IGlmIEBoZWFkZXItYWx3YXlzLXN0aWNreSA9IGZhbHNlXHJcbiAgICAgKiBAcGFyYW0ge2pRdWVyeSBPYmplY3R9ICRlbGVtZW50U3B5IHN0aWNreSBlbGVtZW50IFxyXG4gICAgICovXHJcbiAgICByZXF1aXJlKCcuL2Zyb250Ym94L25hdmJhci9zdGlja3knKSh7XHJcbiAgICAgICAgRUxFTUVOVFM6IEVMRU1FTlRTLFxyXG4gICAgICAgIFNDUk9MTDogU0NST0xMLFxyXG4gICAgICAgIFNFVFRJTkdTOiB7XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiB0cnVlLFxyXG4gICAgICAgICAgICBvZmZzZXQ6IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJGVsZW1lbnRTcHk6ICQoXCIjc3RpY2t5LWVsZW1lbnRcIiksXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEJ1cmdlciBtZW51XHJcbiAgICAgKiBcclxuICAgICAqICFAcGFyYW0ge0VMRU1FTlRTfSBFTEVNRU5UU1xyXG4gICAgICogIUBwYXJhbSB7RlVOQ1RJT05TfSBGVU5DVElPTlNcclxuICAgICAqIEBwYXJhbSB7Qm9vbH0gT1BUSU9OUy5kcm9wZG93blxyXG4gICAgICogbWVudSBpdGVtcyBjYW4gYmUgZXhwYW5kXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2wsIE51bWJlcn0gT1BUSU9OUy5kcm9wZG93blJlc3BvbnNpdmVcclxuICAgICAqIGJyZWFrcG9pbnQgdG8gdHJpZ2dlciBpdGVtIGV4cGFuZFxyXG4gICAgICovXHJcbiAgICByZXF1aXJlKCcuL2Zyb250Ym94L25hdmJhci9idXJnZXJNZW51Jykoe1xyXG4gICAgICAgIEVMRU1FTlRTOiBFTEVNRU5UUyxcclxuICAgICAgICBGVU5DVElPTlM6IEZVTkNUSU9OUyxcclxuICAgICAgICBPUFRJT05TOiB7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICBkcm9wZG93blJlc3BvbnNpdmU6IDIsXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb29raWVzXHJcbiAgICAgKiBcclxuICAgICAqICFAcGFyYW0ge0VMRU1FTlRTfSBFTEVNRU5UU1xyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IE9QVElPTlMuaW1nU3JjIHBhdGNoIHRvIGltYWdlXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gT1BUSU9OUy5jb250ZW50IGNvbnRlbnQgdGV4dFxyXG4gICAgICovXHJcbiAgICAvLyByZXF1aXJlKCcuL2Zyb250Ym94L2Nvb2tpZXMnKSh7XHJcbiAgICAvLyAgICAgRUxFTUVOVFM6IEVMRU1FTlRTLFxyXG4gICAgLy8gICAgIE9QVElPTlM6IHtcclxuICAgIC8vICAgICAgICAgaW1nU3JjOiBgL2Fzc2V0cy9pbWFnZXMvY29va2llcy5wbmdgLFxyXG4gICAgLy8gICAgICAgICBjb250ZW50OiBgVyBuYXN6eW0gc2Vyd2lzaWUgd3lrb3J6eXN0dWplbXkgcGxpa2kgQ29va2llcy4gU8SFIG9uZSB6YXBpc3l3YW5lIG5hIGR5c2t1IHVyesSFZHplbmlhIGtvxYRjb3dlZ28gdcW8eXRrb3duaWthIHcgY2VsYWNoIHN0YXR5c3R5Y3pueWNoIG9yYXogdcWCYXR3aWVuaWEga29yenlzdGFuaWEgeiBzZXJ3aXN1LiBVc3Rhd2llbmlhIHRlIHphd3N6ZSBtb8W8bmEgem1pZW5pxIcuIFN6Y3plZ8OzxYJvd2UgaW5mb3JtYWNqZSBvIHBsaWthY2ggQ29va2llcyB6bmFqZHVqxIUgc2nEmSB3IDxhIGhyZWY9XCIjXCIgdGFyZ2V0PVwiX2JsYW5rXCI+UG9saXR5Y2UgUHJ5d2F0bm/Fm2NpPC9hPmAsXHJcbiAgICAvLyAgICAgfSxcclxuICAgIC8vIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGFic1xyXG4gICAgICogXHJcbiAgICAgKiAhQHBhcmFtIHtFTEVNRU5UU30gRUxFTUVOVFNcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBPUFRJT05TLmltZ1NyYyBwYXRjaCB0byBpbWFnZVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IE9QVElPTlMuY29udGVudCBjb250ZW50IHRleHRcclxuICAgICAqL1xyXG4gICAgcmVxdWlyZSgnLi9mcm9udGJveC90YWJzJykoe1xyXG4gICAgICAgIEVMRU1FTlRTOiBFTEVNRU5UUyxcclxuICAgICAgICBPUFRJT05TOiB7XHJcbiAgICAgICAgICAgIGltZ1NyYzogYC9hc3NldHMvaW1hZ2VzL2Nvb2tpZXMucG5nYCxcclxuICAgICAgICAgICAgY29udGVudDogYFcgbmFzenltIHNlcndpc2llIHd5a29yenlzdHVqZW15IHBsaWtpIENvb2tpZXMuIFPEhSBvbmUgemFwaXN5d2FuZSBuYSBkeXNrdSB1cnrEhWR6ZW5pYSBrb8WEY293ZWdvIHXFvHl0a293bmlrYSB3IGNlbGFjaCBzdGF0eXN0eWN6bnljaCBvcmF6IHXFgmF0d2llbmlhIGtvcnp5c3RhbmlhIHogc2Vyd2lzdS4gVXN0YXdpZW5pYSB0ZSB6YXdzemUgbW/FvG5hIHptaWVuacSHLiBTemN6ZWfDs8WCb3dlIGluZm9ybWFjamUgbyBwbGlrYWNoIENvb2tpZXMgem5hamR1asSFIHNpxJkgdyA8YSBocmVmPVwiI1wiIHRhcmdldD1cIl9ibGFua1wiPlBvbGl0eWNlIFByeXdhdG5vxZtjaTwvYT5gLFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3cgbW9yZSBjb250ZW50XHJcbiAgICAgKiBcclxuICAgICAqICFAcGFyYW0ge1RSQU5TSVRJT05IRUlHSFR9IHRyYW5zaXRpb25IZWlnaHRcclxuICAgICAqL1xyXG4gICAgcmVxdWlyZSgnLi9mcm9udGJveC9zaG93TW9yZScpKHtcclxuICAgICAgICBUUkFOU0lUSU9OSEVJR0hUOiB0cmFuc2l0aW9uSGVpZ2h0LFxyXG4gICAgICAgIFJFU0laRTogUkVTSVpFLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGlja3kgU3B5XHJcbiAgICAgKi9cclxuICAgIHZhciBzdGlja3lTcHkgPSByZXF1aXJlKCcuL2Zyb250Ym94L3N0aWNreS1zcHknKSh7XHJcbiAgICAgICAgU0NST0xMOiBTQ1JPTEwsXHJcbiAgICAgICAgRUxFTUVOVFM6IEVMRU1FTlRTLFxyXG4gICAgICAgIERFVklDRTogREVWSUNFLFxyXG4gICAgICAgIERBVEE6IHtcclxuICAgICAgICAgICAgJ3N0aWNreVNweSc6IHtcclxuICAgICAgICAgICAgICAgICRpdGVtOiAkKGAjc3RpY2t5U3B5YCksXHJcbiAgICAgICAgICAgICAgICAkY29udGFpbmVyOiAkKGAjc3RpY2t5U3B5Q29udGFpbmVyYCksXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdvb2dsZSBNYXBzIEFQSVxyXG4gICAgICogXHJcbiAgICAgKiAhQHBhcmFtIHtGVU5DVElPTlN9IEZVTkNUSU9OU1xyXG4gICAgICogIUBwYXJhbSB7U0NST0xMfSBTQ1JPTExcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBPUFRJT05TLmNlbnRlciBwYXRjaCB0byBpbWFnZVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IE9QVElPTlMuY29udGVudCBjb250ZW50IHRleHRcclxuICAgICAqL1xyXG4gICAgLy8gdmFyIGdvb2dsZU1hcHMgPSByZXF1aXJlKCcuL2dvb2dsZU1hcHMnKSh7XHJcbiAgICAvLyAgICAgRlVOQ1RJT05TOiBGVU5DVElPTlMsXHJcbiAgICAvLyAgICAgU0NST0xMOiBTQ1JPTEwsXHJcbiAgICAvLyAgICAgT1BUSU9OUzoge1xyXG4gICAgLy8gICAgICAgICAvLyBGaXJzdCBwb3NpdGlvblxyXG4gICAgLy8gICAgICAgICBjZW50ZXI6IHtcclxuICAgIC8vICAgICAgICAgICAgIGxhdDogNTEuOTE5NDM3LFxyXG4gICAgLy8gICAgICAgICAgICAgbG5nOiAxOS4xNDUxMzYsXHJcbiAgICAvLyAgICAgICAgIH0sXHJcbiAgICAvLyAgICAgICAgIG1hcElEOiBcIm1hcFwiLFxyXG4gICAgLy8gICAgICAgICB6b29tOiA1LjgsXHJcbiAgICAvLyAgICAgICAgIGRpc2FibGVEZWZhdWx0VUk6IHRydWUsXHJcbiAgICAvLyAgICAgICAgIHN0cmVldFZpZXdDb250cm9sOiBmYWxzZSxcclxuICAgIC8vICAgICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcclxuICAgIC8vICAgICAgICAgc2NhbGVDb250cm9sOiBmYWxzZSxcclxuICAgIC8vICAgICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxyXG4gICAgLy8gICAgICAgICBzdHlsZXM6IHJlcXVpcmUoJy4vZ29vZ2xlTWFwc1N0eWxlJyksXHJcbiAgICAvLyAgICAgICAgIG1hcmtlclNpemU6IFsyMSwgMzRdLFxyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbGVjdDJcclxuICAgICAqL1xyXG4gICAgLy8gdmFyICRzZWxlY3QyID0gJChcIi5zZWxlY3QyXCIpO1xyXG4gICAgLy8gaWYgKCRzZWxlY3QyLmxlbmd0aCkge1xyXG4gICAgLy8gICAgJHNlbGVjdDIuc2VsZWN0Mih7XHJcbiAgICAvLyAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xLFxyXG4gICAgLy8gICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLyogdGVzdC1jb2RlICovXHJcbiAgICB2YXJcclxuICAgICRpZnJhbWUgPSAkKFwiW2RhdGEtaWZyYW1lXVwiKTtcclxuICAgICRpZnJhbWUuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgXHJcbiAgICAgICAgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgIGZpbmQgPSAkdGhpcy5hdHRyKFwiZGF0YS1pZnJhbWVcIiksXHJcbiAgICAgICAgJGNvbnRlbnQgPSAkKGBbZGF0YS1pZnJhbWUtY29udGVudD1cIiR7ZmluZH1cIl1gKTtcclxuXHJcbiAgICAgICAgJHRoaXMuY29udGVudHMoKS5maW5kKFwiYm9keVwiKS5hcHBlbmQoICc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIi9jc3Mvc3R5bGUuZGV2LmNzc1wiPicgKTtcclxuICAgICAgICAkdGhpcy5jb250ZW50cygpLmZpbmQoXCJib2R5XCIpLmFwcGVuZCggJzxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MVwiPicgKTtcclxuICAgICAgICAkdGhpcy5jb250ZW50cygpLmZpbmQoXCJib2R5XCIpLmFwcGVuZCggJzxzdHlsZT4gYm9keSxodG1sIHsgcGFkZGluZzogMCFpbXBvcnRhbnQ7IG1hcmdpbjogMCFpbXBvcnRhbnQ7IHBvc2l0aW9uOiBzdGF0aWMhaW1wb3J0YW50OyBoZWlnaHQ6IGF1dG8haW1wb3J0YW50OyBtaW4taGVpZ2h0OiBhdXRvIWltcG9ydGFudDsgfSA8L3N0eWxlPicgKTtcclxuICAgICAgICAkdGhpcy5jb250ZW50cygpLmZpbmQoXCJib2R5XCIpLmFwcGVuZCggJGNvbnRlbnQgKTtcclxuICAgIH0pO1xyXG4gICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgREVCVUcuY29uc29sZS5hZGQoXCJSdW5uaW5nIGNvcnJlY3QuLi5cIik7XHJcbiAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgLy8gSW5mb3JtIHN0eWxlc2hlZWQgdG8gcmVtb3ZlIHN0eWxlIGZhbGxiYWNrIGZvciBKYXZhU2NyaXB0IGVsZW1lbnRzXHJcbiAgICBFTEVNRU5UUy4kaHRtbC5yZW1vdmVDbGFzcyhcIm5vX2pzXCIpO1xyXG5cclxufSkoJCwgd2luZG93KTsiLCIvKipcclxuICogUmVzaXplXHJcbiAqL1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoZGF0YSkgPT4ge1xyXG5cclxuICAgIHZhclxyXG4gICAgUVVFVUUgPSB7XHJcbiAgICAgICAgd2lkdGg6IHt9LFxyXG4gICAgICAgIGhlaWdodDoge30sXHJcbiAgICAgICAgYWxsOiB7fSxcclxuICAgIH07XHJcblxyXG4gICAgdmFyXHJcbiAgICBEQVRBID0ge1xyXG4gICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgdGltZTogMCxcclxuICAgICAgICBsb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICBhcHBlbmRUZW1wbGF0ZTogZmFsc2UsXHJcbiAgICB9O1xyXG5cclxuICAgIHZhclxyXG4gICAgcmVzaXplVGltZSA9IDQwMDtcclxuXHJcbiAgICB2YXJcclxuICAgIEVMRU1FTlRTLFxyXG4gICAgVEVNUExBVEUgPSB7XHJcbiAgICAgICAgbG9hZGluZzogbnVsbCxcclxuICAgIH07XHJcblxyXG4gICAgdmFyXHJcbiAgICBzdGFydCA9ICgpID0+IHtcclxuICAgICAgICBFTEVNRU5UUyA9IGRhdGEuRUxFTUVOVFM7XHJcbiAgICAgICAgVEVNUExBVEUubG9hZGluZyA9IGRhdGEudGVtcGxhdGUubG9hZGluZztcclxuICAgIH07XHJcblxyXG4gICAgdmFyXHJcbiAgICB0cmlnZ2VyID0gKCkgPT4ge1xyXG5cclxuICAgICAgICBEQVRBLnRpbWUgPSA1MDA7XHJcblxyXG4gICAgICAgIGlmICghREFUQS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgREFUQS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXNpemUoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZhclxyXG4gICAgYWRkID0gKG5hbWUsIGNhbGxiYWNrLCB0eXBlKSA9PiB7XHJcbiAgICAgICAgUVVFVUVbdHlwZV1bbmFtZV0gPSBbY2FsbGJhY2tdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKGByZXNpemU6IGFkZCAke25hbWV9YCk7XHJcbiAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXJcclxuICAgIHJlbW92ZSA9IChuYW1lLCB0eXBlKSA9PiB7XHJcbiAgICAgICAgZGVsZXRlIHF1ZXVlW3R5cGVdW25hbWVdO1xyXG5cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICBERUJVRy5jb25zb2xlLmFkZChgcmVzaXplOiByZW1vdmUgJHtuYW1lfWApO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgIH07XHJcblxyXG4gICAgdmFyXHJcbiAgICBjbGVhbiA9ICgpID0+IHtcclxuICAgICAgICBxdWV1ZSA9IHt9O1xyXG5cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICBERUJVRy5jb25zb2xlLmFkZChgcmVzaXplOiBjbGVhbiBxdWV1ZWApO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgIH07XHJcblxyXG4gICAgdmFyXHJcbiAgICBydW4gPSAodHlwZSkgPT4ge1xyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICd3aWR0aCc6XHJcbiAgICAgICAgICAgICAgICByZXNpemVXaWR0aCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2hlaWdodCc6XHJcbiAgICAgICAgICAgICAgICByZXNpemVIZWlnaHQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmVzaXplQWxsKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZhclxyXG4gICAgcmVzaXplID0gKHR5cGUpID0+IHtcclxuXHJcbiAgICAgICAgLyogQXBwZW5kIGxvYWRpbmcgdGVtcGxhdGUgKi9cclxuICAgICAgICBpZiAoICFEQVRBLmFwcGVuZFRlbXBsYXRlICYmIFRFTVBMQVRFLmxvYWRpbmcgKSB7XHJcbiAgICAgICAgICAgIEVMRU1FTlRTLiRib2R5LmFwcGVuZCggYDxkaXYgY2xhc3M9XCJqc19yZXNpemVMb2FkaW5nXCI+PGRpdiBjbGFzcz1cImpzX3Jlc2l6ZUxvYWRpbmdfX2NvbnRlbnRcIj4ke1RFTVBMQVRFLmxvYWRpbmd9PC9kaXY+PC9kaXY+YCApO1xyXG4gICAgICAgICAgICBEQVRBLmFwcGVuZFRlbXBsYXRlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBEQVRBLnRpbWUgLT0gNTA7XHJcblxyXG4gICAgICAgICAgICBpZiAoREFUQS50aW1lID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCAhREFUQS5sb2FkaW5nICkge1xyXG4gICAgICAgICAgICAgICAgICAgIERBVEEubG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBURU1QTEFURS5sb2FkaW5nICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBFTEVNRU5UUy4kYm9keS5hZGRDbGFzcyhcImpzX3Jlc2l6ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXNpemUodHlwZSk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBEQVRBLmxvYWRpbmcgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgREFUQS5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBURU1QTEFURS5sb2FkaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVMRU1FTlRTLiRib2R5LnJlbW92ZUNsYXNzKFwianNfcmVzaXplXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIERBVEEuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBydW4odHlwZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgICAgIERFQlVHLnZhcmlhYmxlLnJlZnJlc2goXCJSZXNpemVcIik7XHJcbiAgICAgICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgICAgICB9LCA1MCk7XHJcbiAgICB9O1xyXG4gICAgdmFyIFxyXG4gICAgcmVzaXplV2lkdGggPSAoKSA9PiB7XHJcbiAgICAgICAgJC5lYWNoKFFVRVVFLndpZHRoLCBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcclxuICAgICAgICAgICAgKHZhbHVlWzBdKSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHZhclxyXG4gICAgcmVzaXplSGVpZ2h0ID0gKCkgPT4ge1xyXG4gICAgICAgICQuZWFjaChRVUVVRS5oZWlnaHQsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAodmFsdWVbMF0pKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgdmFyXHJcbiAgICByZXNpemVBbGwgPSAoKSA9PiB7XHJcbiAgICAgICAgcmVzaXplSGVpZ2h0KCk7XHJcbiAgICAgICAgcmVzaXplV2lkdGgoKTtcclxuICAgICAgICAkLmVhY2goUVVFVUUuYWxsLCBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcclxuICAgICAgICAgICAgKHZhbHVlWzBdKSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyogdGVzdC1jb2RlICovXHJcbiAgICBERUJVRy52YXJpYWJsZS5hZGQoXCJSZXNpemVcIiwgREFUQSk7XHJcbiAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgc3RhcnQoKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGFkZDogYWRkLFxyXG4gICAgICAgIHJlbW92ZTogcmVtb3ZlLFxyXG4gICAgICAgIHJlc2l6ZTogcmVzaXplLFxyXG4gICAgICAgIHRyaWdnZXI6IHRyaWdnZXIsXHJcbiAgICB9O1xyXG4gIFxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xyXG5cclxuICAgIHZhciBcclxuICAgIFxyXG4gICAgREFUQSA9IHt9LFxyXG5cclxuICAgIHdoaWNoVHJhbnNpdGlvbkV2ZW50ID0gKCkgPT4ge1xyXG4gICAgICAgIHZhciB0LFxyXG4gICAgICAgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmYWtlZWxlbWVudFwiKTtcclxuICAgICAgXHJcbiAgICAgICAgdmFyIHRyYW5zaXRpb25zID0ge1xyXG4gICAgICAgICAgXCJ0cmFuc2l0aW9uXCIgICAgICA6IFwidHJhbnNpdGlvbmVuZFwiLFxyXG4gICAgICAgICAgXCJPVHJhbnNpdGlvblwiICAgICA6IFwib1RyYW5zaXRpb25FbmRcIixcclxuICAgICAgICAgIFwiTW96VHJhbnNpdGlvblwiICAgOiBcInRyYW5zaXRpb25lbmRcIixcclxuICAgICAgICAgIFwiV2Via2l0VHJhbnNpdGlvblwiOiBcIndlYmtpdFRyYW5zaXRpb25FbmRcIlxyXG4gICAgICAgIH1cclxuICAgICAgXHJcbiAgICAgICAgZm9yICh0IGluIHRyYW5zaXRpb25zKXtcclxuICAgICAgICAgIGlmIChlbC5zdHlsZVt0XSAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRyYW5zaXRpb25zW3RdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY2hlY2tXaXRjaFRyYW5zaXRpb25FdmVudCA9ICgpID0+IHtcclxuICAgICAgICBEQVRBLndpdGNoVHJhbnNpdGlvbkV2ZW50ID0gd2hpY2hUcmFuc2l0aW9uRXZlbnQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVmcmVzaCA9ICgpID0+IHtcclxuICAgICAgICBEQVRBLnRyYW5zaXRpb25FdmVudCA9IGNoZWNrV2l0Y2hUcmFuc2l0aW9uRXZlbnQoKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIERBVEE7XHJcblxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gKGFyZ3VtZW50KSA9PiB7XHJcbiAgICBcclxuICAgIHZhciBcclxuICAgIEJSRUFLUE9JTlRTICAgICAgICAgPSBudWxsLFxyXG4gICAgRUxFTUVOVFMgICAgICAgICAgICA9IG51bGwsXHJcbiAgICBSRVNJWkUgICAgICAgICAgICAgID0gbnVsbDtcclxuXHJcbiAgICB2YXJcclxuICAgIERBVEEgPSB7XHJcbiAgICAgICAgd2lkdGggICAgICAgICAgIDogbnVsbCxcclxuICAgICAgICBoZWlnaHQgICAgICAgICAgOiBudWxsLFxyXG4gICAgICAgIHJlc3BvbnNpdmUgICAgICA6IG51bGwsXHJcbiAgICAgICAgb3MgICAgICAgICAgICAgIDogbnVsbCxcclxuICAgIH07XHJcblxyXG4gICAgLyogU3RhcnQgbW9kdWxlICovXHJcbiAgICBjb25zdFxyXG4gICAgc3RhcnQgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIC8qIFByZXBhcmUgYXJndW1lbnRzIGRhdGEgKi9cclxuICAgICAgICBCUkVBS1BPSU5UUyA9IGFyZ3VtZW50LkJSRUFLUE9JTlRTO1xyXG4gICAgICAgIEVMRU1FTlRTID0gYXJndW1lbnQuRUxFTUVOVFM7XHJcbiAgICAgICAgUkVTSVpFID0gYXJndW1lbnQuUkVTSVpFO1xyXG5cclxuICAgICAgICBEQVRBLm9zID0gZ2V0TW9iaWxlT3BlcmF0aW5nU3lzdGVtKCk7XHJcbiAgICAgICAgcmVmcmVzaCgpO1xyXG5cclxuICAgICAgICAvKiBUcmlnZ2VyIGZ1bmN0aW9uIGlmIHVzZXIgcmVzaXplIHBhZ2UgKi9cclxuICAgICAgICBFTEVNRU5UUy4kd2luZG93Lm9uKCdyZXNpemUgb3JpZW50YXRpb25jaGFuZ2UnLCByZWZyZXNoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyogUmVmcmVzaCBtb2R1bGUgKi9cclxuICAgIGNvbnN0XHJcbiAgICByZWZyZXNoID0gKCkgPT4ge1xyXG5cclxuICAgICAgICAvKiBQcmVwYXJlIGRhdGEgKi9cclxuICAgICAgICBsZXRcclxuICAgICAgICB3aWR0aCA9IEVMRU1FTlRTLiR3aW5kb3cud2lkdGgoKSxcclxuICAgICAgICBsYXN0V2lkdGggPSBEQVRBLndpZHRoO1xyXG4gICAgICAgIGhlaWdodCA9IEVMRU1FTlRTLiR3aW5kb3cuaGVpZ2h0KCk7XHJcblxyXG4gICAgICAgIERBVEEud2lkdGggPSB3aWR0aDtcclxuICAgICAgICBEQVRBLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICBEQVRBLnJlc3BvbnNpdmUgPSBudWxsO1xyXG5cclxuICAgICAgICAvKiBDaGVjayBhY3RpdmUgYnJlYWtwb2ludCAqLyBcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBCUkVBS1BPSU5UUykge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IEJSRUFLUE9JTlRTW2tleV07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAod2lkdGggPiB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgREFUQS5yZXNwb25zaXZlID0ga2V5O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFEQVRBLnJlc3BvbnNpdmUpIHtcclxuICAgICAgICAgICAgREFUQS5yZXNwb25zaXZlID0gJ21vYmlsZSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiBUcmlnZ2VyIHJlc2l6ZSBxdWV1ZSAoaWdub3JlIGZpcnN0IHRpbWUpICovXHJcbiAgICAgICAgaWYgKGxhc3RXaWR0aCAmJiAhREFUQS5vcykge1xyXG4gICAgICAgICAgICBpZiAoREFUQS53aWR0aCA9PT0gbGFzdFdpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBSRVNJWkUudHJpZ2dlcignd2lkdGgnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIFJFU0laRS50cmlnZ2VyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgIERFQlVHLnZhcmlhYmxlLnJlZnJlc2goJ2RldmljZScpO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgIH07XHJcblxyXG4gICAgLyogRGV0ZXJtaW5lIHRoZSBtb2JpbGUgb3BlcmF0aW5nIHN5c3RlbSAqL1xyXG4gICAgY29uc3QgXHJcbiAgICBnZXRNb2JpbGVPcGVyYXRpbmdTeXN0ZW0gPSAoKSA9PiB7XHJcbiAgICAgICAgdmFyIHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQgfHwgbmF2aWdhdG9yLnZlbmRvciB8fCB3aW5kb3cub3BlcmE7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gV2luZG93cyBQaG9uZSBtdXN0IGNvbWUgZmlyc3QgYmVjYXVzZSBpdHMgVUEgYWxzbyBjb250YWlucyBcIkFuZHJvaWRcIlxyXG4gICAgICAgIGlmICgvd2luZG93cyBwaG9uZS9pLnRlc3QodXNlckFnZW50KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJXaW5kb3dzIFBob25lXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICBcclxuICAgICAgICBpZiAoL2FuZHJvaWQvaS50ZXN0KHVzZXJBZ2VudCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiQW5kcm9pZFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgXHJcbiAgICAgICAgLy8gaU9TIGRldGVjdGlvbiBmcm9tOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS85MDM5ODg1LzE3NzcxMFxyXG4gICAgICAgIGlmICgvaVBhZHxpUGhvbmV8aVBvZC8udGVzdCh1c2VyQWdlbnQpICYmICF3aW5kb3cuTVNTdHJlYW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiaU9TXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICBcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgIERFQlVHLnZhcmlhYmxlLmFkZCgnZGV2aWNlJywgREFUQSk7XHJcbiAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgc3RhcnQoKTtcclxuXHJcbiAgICByZXR1cm4gREFUQTtcclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IChkYXRhKSA9PiB7XHJcblxyXG4gICAgdmFyIFxyXG4gICAgREFUQSA9IHtcclxuICAgICAgICBsYXN0Q2VudGVyICAgICAgICAgIDogbnVsbCxcclxuICAgICAgICBjZW50ZXIgICAgICAgICAgICAgIDogbnVsbCxcclxuICAgICAgICB0b3AgICAgICAgICAgICAgICAgIDogbnVsbCxcclxuICAgICAgICBzcGVlZCAgICAgICAgICAgICAgIDogbnVsbCxcclxuICAgICAgICBkaXJlY3Rpb24gICAgICAgICAgIDogbnVsbCxcclxuICAgIH07XHJcblxyXG4gICAgdmFyXHJcbiAgICBERVZJQ0UgPSBkYXRhLkRFVklDRSxcclxuICAgIEVMRU1FTlRTID0gZGF0YS5FTEVNRU5UUztcclxuXHJcblxyXG5cclxuICAgIHZhciBiaW5kID0gKCkgPT4ge1xyXG5cclxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKHJlZnJlc2gpO1xyXG5cclxuICAgICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZSBvcmllbnRhdGlvbmNoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZWZyZXNoKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJlZnJlc2goKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIHJlZnJlc2ggPSAoKSA9PiB7XHJcbiAgICAgICAgREFUQS5sYXN0Q2VudGVyID0gREFUQS5jZW50ZXIgfHwgMDtcclxuXHJcbiAgICAgICAgREFUQS50b3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCAwO1xyXG4gICAgICAgIERBVEEuY2VudGVyID0gREFUQS50b3AgKyBERVZJQ0UuaGVpZ2h0IC8gMjtcclxuICAgICAgICBEQVRBLmJlZ2luID0gREFUQS50b3A7XHJcblxyXG4gICAgICAgIGlmIChFTEVNRU5UUy4kaGVhZGVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBEQVRBLmJlZ2luICs9IEVMRU1FTlRTLiRoZWFkZXIub3V0ZXJIZWlnaHQoIHRydWUgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIERBVEEuYm90dG9tID0gREFUQS50b3AgKyBERVZJQ0UuaGVpZ2h0O1xyXG5cclxuICAgICAgICBEQVRBLnNwZWVkID0gTWF0aC5hYnMoREFUQS5sYXN0Q2VudGVyIC0gREFUQS5jZW50ZXIpO1xyXG5cclxuICAgICAgICBpZiAoREFUQS5jZW50ZXIgPiBEQVRBLmxhc3RDZW50ZXIpIHtcclxuICAgICAgICAgICAgREFUQS5kaXJlY3Rpb24gPSBcImRvd25cIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBEQVRBLmRpcmVjdGlvbiA9IFwidXBcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgIERFQlVHLnZhcmlhYmxlLnJlZnJlc2goJ3Njcm9sbCcpO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgIH07XHJcblxyXG4gICAgLyogdGVzdC1jb2RlICovXHJcbiAgICBERUJVRy52YXJpYWJsZS5hZGQoJ3Njcm9sbCcsIERBVEEpO1xyXG4gICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgIGJpbmQoKTtcclxuXHJcbiAgICByZXR1cm4gREFUQTtcclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IChkYXRhKSA9PiB7XHJcblxyXG4gICAgREFUQSA9IHtcclxuICAgICAgICAkY29udGFpbmVyOiBudWxsLFxyXG4gICAgICAgICRlbGVtZW50OiBudWxsLFxyXG4gICAgICAgICRidXR0b246IG51bGwsXHJcbiAgICAgICAgJGJvZHk6IG51bGwsXHJcbiAgICAgICAgb3BlbjogZmFsc2UsXHJcbiAgICB9O1xyXG5cclxuICAgICQuZXh0ZW5kKCBEQVRBLCBkYXRhICk7XHJcbiAgICBcclxuICAgIHZhciBzdGFydCA9IChkYXRhKSA9PiB7XHJcblxyXG4gICAgICAgIHZhciBkZWJ1Z0JveENsYXNzID0gJ2RlYnVnLWJveCBkZWJ1Zy1ib3gtLWNvbnNvbGUnO1xyXG4gICAgICAgIGlmICghREFUQS5vcGVuKSB7XHJcbiAgICAgICAgICAgIGRlYnVnQm94Q2xhc3MgKz0gJyBkZWJ1Zy1ib3gtLWhpZGUnO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHZhciBkZWJ1Z0JveCA9ICQoYDxkaXYgY2xhc3M9JyR7ZGVidWdCb3hDbGFzc30nIGlkPSdkZWJ1Zy1ib3gtY29uc29sZSc+PC9kaXY+YCk7XHJcbiAgICAgICAgdmFyIGRlYnVnQm94QnV0dG9uID0gJChcIjxkaXYgaWQ9J2RlYnVnLWJveC1jb25zb2xlLWJ1dHRvbicgY2xhc3M9J2RlYnVnLWJveF9fYnV0dG9uJz5Gcm9udEJveCBjb25zb2xlPC9kaXY+XCIpO1xyXG4gICAgICAgIHZhciBkZWJ1Z0JveENvbnRhaW5lciA9ICQoXCI8ZGl2IGlkPSdkZWJ1Zy1ib3gtY29uc29sZS1jb250YWluZXInIGNsYXNzPSdkZWJ1Zy1ib3hfX2NvbnRhaW5lcic+PC9kaXY+XCIpO1xyXG4gICAgXHJcbiAgICAgICAgREFUQS5FTEVNRU5UUy4kYm9keS5hcHBlbmQoZGVidWdCb3gpO1xyXG4gICAgICAgIERBVEEuJGVsZW1lbnQgPSAkKFwiI2RlYnVnLWJveC1jb25zb2xlXCIpO1xyXG4gICAgXHJcbiAgICAgICAgREFUQS4kZWxlbWVudC5hcHBlbmQoZGVidWdCb3hCdXR0b24pO1xyXG4gICAgICAgIERBVEEuJGVsZW1lbnQuYXBwZW5kKGRlYnVnQm94Q29udGFpbmVyKTtcclxuICAgIFxyXG4gICAgICAgIERBVEEuJGJ1dHRvbiA9ICQoXCIjZGVidWctYm94LWNvbnNvbGUtYnV0dG9uXCIpO1xyXG4gICAgICAgIERBVEEuJGNvbnRhaW5lciA9ICQoXCIjZGVidWctYm94LWNvbnNvbGUtY29udGFpbmVyXCIpO1xyXG4gICAgXHJcbiAgICAgICAgdmFyIHRvZ2dsZURlYnVnQm94ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBEQVRBLiRlbGVtZW50LnRvZ2dsZUNsYXNzKFwiZGVidWctYm94LS1oaWRlXCIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgREFUQS4kYnV0dG9uLm9uKFwiY2xpY2tcIiwgdG9nZ2xlRGVidWdCb3gpO1xyXG4gICAgXHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICB2YXIgYWRkID0gKGFkZFN0cmluZywgYWRkb25DbGFzcyA9ICcnKSA9PiB7XHJcbiAgICAgICAgREFUQS4kY29udGFpbmVyLnByZXBlbmQoXCI8cCBjbGFzcz0nXCIgKyBhZGRvbkNsYXNzICsgXCInPlwiK2FkZFN0cmluZytcIjwvcD5cIik7XHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXJ0KCk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhZGQ6IGFkZCxcclxuICAgIH07XHJcblxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gKGFyZ3VtZW50KSA9PiB7XHJcblxyXG4gICAgdmFyIFxyXG4gICAgRUxFTUVOVFMgPSBudWxsO1xyXG5cclxuICAgIHZhclxyXG4gICAgQk9YID0ge1xyXG4gICAgICAgICRjb250YWluZXI6IG51bGwsXHJcbiAgICAgICAgJGNvbnRlbnQ6IG51bGwsXHJcbiAgICAgICAgJGJ1dHRvbjogbnVsbCxcclxuICAgICAgICAkYm9keTogbnVsbCxcclxuICAgIH0sXHJcbiAgICBPUFRJT05TID0ge1xyXG4gICAgICAgIG9wZW46IGZhbHNlLFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdFxyXG4gICAgQ0xBU1MgPSB7XHJcbiAgICAgICAgY29udGFpbmVyICAgICAgIDogYGRlYnVnLWJveCBkZWJ1Zy1ib3gtLXZhcmlhYmxlc2AsXHJcbiAgICAgICAgYnV0dG9uICAgICAgICAgIDogYGRlYnVnLWJveF9fYnV0dG9uYCxcclxuICAgICAgICBjb250ZW50ICAgICAgICAgOiBgZGVidWctYm94X19jb250YWluZXJgLFxyXG4gICAgICAgIGl0ZW0gICAgICAgICAgICA6IGBkZWJ1Zy1ib3hfX2l0ZW1gLFxyXG4gICAgfTtcclxuXHJcbiAgICB2YXJcclxuICAgIENPTlRFTlQgPSB7fTtcclxuXHJcbiAgICAvKiBTdGFydCBtb2R1bGUgKi9cclxuICAgIHZhciBcclxuICAgIHN0YXJ0ID0gKGRhdGEpID0+IHtcclxuXHJcbiAgICAgICAgLyogUHJlcGFyZSBhcmd1bWVudHMgZGF0YSAqL1xyXG4gICAgICAgICQuZXh0ZW5kKCBPUFRJT05TLCBhcmd1bWVudC5PUFRJT05TICk7XHJcbiAgICAgICAgRUxFTUVOVFMgPSBhcmd1bWVudC5FTEVNRU5UUztcclxuXHJcbiAgICAgICAgLyogQ2hlY2sgaWYgY29udGFpbmVyIG11c3QgYmUgZGVmYXVsdCBvcGVuICovXHJcbiAgICAgICAgaWYgKCFPUFRJT05TLm9wZW4pIHtcclxuICAgICAgICAgICAgQ0xBU1MuY29udGFpbmVyICs9ICcgZGVidWctYm94LS1oaWRlJztcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLyogQ3JlYXRlIHRlbXBsYXRlICovXHJcbiAgICAgICAgQk9YLiRjb250YWluZXIgICAgICA9ICQoYDxkaXYgY2xhc3M9JyR7Q0xBU1MuY29udGFpbmVyfSc+PC9kaXY+YCk7XHJcbiAgICAgICAgQk9YLiRidXR0b24gICAgICAgICA9ICQoYDxkaXYgY2xhc3M9JyR7Q0xBU1MuYnV0dG9ufSc+RnJvbnRCb3ggdmFyaWFibGVzPC9kaXY+YCk7XHJcbiAgICAgICAgQk9YLiRjb250ZW50ICAgICAgICA9ICQoYDxkaXYgY2xhc3M9JyR7Q0xBU1MuY29udGVudH0nPjwvZGl2PmApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8qIERyYXcgdGVtcGxhdGUgKi9cclxuICAgICAgICBFTEVNRU5UUy4kYm9keS5hcHBlbmQoIEJPWC4kY29udGFpbmVyICk7XHJcbiAgICAgICAgQk9YLiRjb250YWluZXIuYXBwZW5kKCBCT1guJGJ1dHRvbiApO1xyXG4gICAgICAgIEJPWC4kY29udGFpbmVyLmFwcGVuZCggQk9YLiRjb250ZW50ICk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLyogQmluZCB0b2dnbGUgY29udGFpbmVyICovXHJcbiAgICAgICAgQk9YLiRidXR0b24ub24oXCJjbGlja1wiLCB0b2dnbGVDb250YWluZXIpO1xyXG4gICAgfTtcclxuICAgIFxyXG5cclxuICAgIC8qIFNob3cgZGF0YSBpbiBjb250ZW50ICovXHJcbiAgICBjb25zdFxyXG4gICAgYWRkID0gKGRhdGFOYW1lLCBEQVRBKSA9PiB7XHJcblxyXG4gICAgICAgIC8qIFJlbW92ZSBkdXBsaWNhdGUgKi9cclxuICAgICAgICByZW1vdmUoZGF0YU5hbWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIENPTlRFTlRbZGF0YU5hbWVdID0ge1xyXG4gICAgICAgICAgICBkYXRhOiBEQVRBLFxyXG4gICAgICAgICAgICBuYW1lOiBkYXRhTmFtZS5zcGxpdChcIiBcIikuam9pbihcIi1cIikudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBCT1guJGNvbnRlbnQuYXBwZW5kKGA8cCBjbGFzcz1cIiR7Q0xBU1MuaXRlbX1cIj4ke0NPTlRFTlRbZGF0YU5hbWVdLm5hbWV9PC9wPmApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIERBVEEpIHtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBEQVRBW2tleV07XHJcblxyXG4gICAgICAgICAgICBsZXRcclxuICAgICAgICAgICAgbmFtZSA9IGtleS5zcGxpdChcIiBcIikuam9pbihcIi1cIikudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICAgICAgaWQgPSBgZGVidWctdmFyaWFibGUtJHtDT05URU5UW2RhdGFOYW1lXS5uYW1lfS0ke25hbWV9YDtcclxuICAgICAgICAgICAgJGl0ZW0gPSAkKGA8cD4gJHtrZXl9IDxzcGFuIGlkPScke2lkfSc+JHt2YWx1ZX08L3NwYW4+IDwvcD5gKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIEJPWC4kY29udGVudC5hcHBlbmQoJGl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgJGl0ZW0ub24oXCJjbGlja1wiLCB7JGl0ZW19LCB0b2dnbGVWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKiBSZW1vdmUgZGF0YSBpbiBjb250ZW50ICovXHJcbiAgICBjb25zdFxyXG4gICAgcmVtb3ZlID0gKGRhdGFOYW1lKSA9PiB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBDT05URU5UW2RhdGFOYW1lXSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBDT05URU5UW2RhdGFOYW1lXTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qIFJlZnJlc2ggZGF0YSBuYW1lIGluIGNvbnRlbnQgKi8gXHJcbiAgICBjb25zdFxyXG4gICAgcmVmcmVzaCA9IChuYW1lKSA9PiB7XHJcbiAgICAgICAgdmFyXHJcbiAgICAgICAgaXRlbSA9IENPTlRFTlRbbmFtZV0sXHJcbiAgICAgICAgZGF0YSA9IGl0ZW0uZGF0YTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGRhdGFba2V5XTtcclxuXHJcbiAgICAgICAgICAgIGxldFxyXG4gICAgICAgICAgICBuYW1lID0ga2V5LnNwbGl0KFwiIFwiKS5qb2luKFwiLVwiKS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgICAgICBmaW5kID0gYGRlYnVnLXZhcmlhYmxlLSR7aXRlbS5uYW1lfS0ke25hbWV9YDtcclxuXHJcbiAgICAgICAgICAgICQoYCMke2ZpbmR9YCkudGV4dCh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgLyogVG9vZ2xlIGNvbnRhaW5lciAqL1xyXG4gICAgY29uc3RcclxuICAgIHRvZ2dsZUNvbnRhaW5lciA9ICgpID0+IHtcclxuICAgICAgICBCT1guJGNvbnRhaW5lci50b2dnbGVDbGFzcyhcImRlYnVnLWJveC0taGlkZVwiKTtcclxuICAgIH07XHJcbiAgICAvKiBUb29nbGUgdmFsdWUgKi9cclxuICAgIGNvbnN0XHJcbiAgICB0b2dnbGVWYWx1ZSA9IChlKSA9PiB7ICAgICAgXHJcbiAgICAgICAgZS5kYXRhLiRpdGVtLnRvZ2dsZUNsYXNzKFwianNfZm9jdXNcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXJ0KCk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhZGQ6IGFkZCxcclxuICAgICAgICByZW1vdmU6IHJlbW92ZSxcclxuICAgICAgICByZWZyZXNoOiByZWZyZXNoLFxyXG4gICAgfTtcclxuXHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0IHN0cmluZyB0byBib29sZWFuXHJcbiAgICAgKiBmYXN0ZXN0IG1ldGhvZCBodHRwOi8vanNiZW4uY2gvY3FWU2pcclxuICAgICAqL1xyXG4gICAgZ2V0Qm9vbGVhbih2YWx1ZSkge1xyXG5cdFx0c3dpdGNoICh2YWx1ZSl7XHJcblx0XHRcdGNhc2UgdHJ1ZTpcclxuXHRcdFx0Y2FzZSBcInRydWVcIjpcclxuXHRcdFx0Y2FzZSAxOlxyXG5cdFx0XHRjYXNlIFwiMVwiOlxyXG5cdFx0XHRjYXNlIFwib25cIjpcclxuXHRcdFx0Y2FzZSBcInllc1wiOlxyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRkZWZhdWx0OiBcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICAvKlxyXG4gICAgICogRGV0ZXJtaW5lIE92ZXJmbG93XHJcbiAgICAgKi9cclxuICAgIGRldGVybWluZU92ZXJmbG93OiBmdW5jdGlvbihjb250ZW50LCBjb250YWluZXIpIHtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRlbnQgaW5zdGFuY2VvZiBqUXVlcnkpXHJcbiAgICAgICAge1xyXG5cdFx0XHRjb250ZW50ID0gY29udGVudFswXTtcclxuXHRcdH1cclxuICAgICAgICBpZiAoY29udGFpbmVyIGluc3RhbmNlb2YgalF1ZXJ5KVxyXG4gICAgICAgIHtcclxuXHRcdFx0Y29udGFpbmVyID0gY29udGFpbmVyWzBdO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhclxyXG5cdFx0Y29udGFpbmVyTWV0cmljcyA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuXHRcdGNvbnRhaW5lck1ldHJpY3NSaWdodCA9IE1hdGguZmxvb3IoY29udGFpbmVyTWV0cmljcy5yaWdodCksXHJcblx0XHRjb250YWluZXJNZXRyaWNzTGVmdCA9IE1hdGguZmxvb3IoY29udGFpbmVyTWV0cmljcy5sZWZ0KSxcclxuXHRcdGNvbnRlbnRNZXRyaWNzID0gY29udGVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuXHRcdGNvbnRlbnRNZXRyaWNzUmlnaHQgPSBNYXRoLmZsb29yKGNvbnRlbnRNZXRyaWNzLnJpZ2h0KSxcclxuXHRcdGNvbnRlbnRNZXRyaWNzTGVmdCA9IE1hdGguZmxvb3IoY29udGVudE1ldHJpY3MubGVmdCk7XHJcblxyXG4gICAgICAgIGlmIChjb250YWluZXJNZXRyaWNzTGVmdCA+IGNvbnRlbnRNZXRyaWNzTGVmdCAmJiBjb250YWluZXJNZXRyaWNzUmlnaHQgPCBjb250ZW50TWV0cmljc1JpZ2h0KSBcclxuICAgICAgICB7XHJcblx0XHRcdHJldHVybiBcImJvdGhcIjtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2UgaWYgKGNvbnRlbnRNZXRyaWNzTGVmdCA8PSBjb250YWluZXJNZXRyaWNzTGVmdCkgXHJcbiAgICAgICAge1xyXG5cdFx0XHRyZXR1cm4gXCJsZWZ0XCI7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIGlmIChjb250ZW50TWV0cmljc1JpZ2h0ID49IGNvbnRhaW5lck1ldHJpY3NSaWdodClcclxuICAgICAgICB7XHJcblx0XHRcdHJldHVybiBcInJpZ2h0XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgXHJcbiAgICAgICAge1xyXG5cdFx0XHRyZXR1cm4gXCJub25lXCI7XHJcblx0XHR9XHJcbiAgICB9LFxyXG4gICAgICAgIFxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogJC5kaXNhYmxlc2Nyb2xsXHJcbiAgICAgKiBBdXRob3I6IEpvc2ggSGFycmlzb24gLSBhbG9vZi5jb1xyXG4gICAgICpcclxuICAgICAqIERpc2FibGVzIHNjcm9sbCBldmVudHMgZnJvbSBtb3VzZXdoZWVscywgdG91Y2htb3ZlcyBhbmQga2V5cHJlc3Nlcy5cclxuICAgICAqIFVzZSB3aGlsZSBqUXVlcnkgaXMgYW5pbWF0aW5nIHRoZSBzY3JvbGwgcG9zaXRpb24gZm9yIGEgZ3VhcmFudGVlZCBzdXBlci1zbW9vdGggcmlkZSFcclxuICAgICAqL1xyXG5cclxuICAgIDsoZnVuY3Rpb24oJCkge1xyXG5cclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAgICAgdmFyIGluc3RhbmNlLCBwcm90bztcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gVXNlclNjcm9sbERpc2FibGVyKCRjb250YWluZXIsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgLy8gc3BhY2ViYXI6IDMyLCBwYWdldXA6IDMzLCBwYWdlZG93bjogMzQsIGVuZDogMzUsIGhvbWU6IDM2XHJcbiAgICAgICAgICAgIC8vIGxlZnQ6IDM3LCB1cDogMzgsIHJpZ2h0OiAzOSwgZG93bjogNDBcclxuICAgICAgICAgICAgdGhpcy5vcHRzID0gJC5leHRlbmQoe1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlV2hlZWwgOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlU2Nyb2xsYmFyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlS2V5cyA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzY3JvbGxFdmVudEtleXMgOiBbMzIsIDMzLCAzNCwgMzUsIDM2LCAzNywgMzgsIDM5LCA0MF1cclxuICAgICAgICAgICAgfSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLiRjb250YWluZXIgPSAkY29udGFpbmVyO1xyXG4gICAgICAgICAgICB0aGlzLiRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xyXG4gICAgICAgICAgICB0aGlzLmxvY2tUb1Njcm9sbFBvcyA9IFswLCAwXTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdG8gPSBVc2VyU2Nyb2xsRGlzYWJsZXIucHJvdG90eXBlO1xyXG5cclxuICAgICAgICBwcm90by5kaXNhYmxlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciB0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmKHQub3B0cy5oYW5kbGVXaGVlbCkge1xyXG4gICAgICAgICAgICAgICAgdC4kY29udGFpbmVyLm9uKFxyXG4gICAgICAgICAgICAgICAgICAgIFwibW91c2V3aGVlbC5kaXNhYmxlc2Nyb2xsIERPTU1vdXNlU2Nyb2xsLmRpc2FibGVzY3JvbGwgdG91Y2htb3ZlLmRpc2FibGVzY3JvbGxcIixcclxuICAgICAgICAgICAgICAgICAgICB0Ll9oYW5kbGVXaGVlbFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodC5vcHRzLmhhbmRsZVNjcm9sbGJhcikge1xyXG4gICAgICAgICAgICAgICAgdC5sb2NrVG9TY3JvbGxQb3MgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgdC4kY29udGFpbmVyLnNjcm9sbExlZnQoKSxcclxuICAgICAgICAgICAgICAgICAgICB0LiRjb250YWluZXIuc2Nyb2xsVG9wKClcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICB0LiRjb250YWluZXIub24oXCJzY3JvbGwuZGlzYWJsZXNjcm9sbFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB0Ll9oYW5kbGVTY3JvbGxiYXIuY2FsbCh0KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZih0Lm9wdHMuaGFuZGxlS2V5cykge1xyXG4gICAgICAgICAgICAgICAgdC4kZG9jdW1lbnQub24oXCJrZXlkb3duLmRpc2FibGVzY3JvbGxcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0Ll9oYW5kbGVLZXlkb3duLmNhbGwodCwgZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICBwcm90by51bmRvID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciB0ID0gdGhpcztcclxuICAgICAgICAgICAgdC4kY29udGFpbmVyLm9mZihcIi5kaXNhYmxlc2Nyb2xsXCIpO1xyXG4gICAgICAgICAgICBpZih0Lm9wdHMuaGFuZGxlS2V5cykge1xyXG4gICAgICAgICAgICAgICAgdC4kZG9jdW1lbnQub2ZmKFwiLmRpc2FibGVzY3JvbGxcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHByb3RvLl9oYW5kbGVXaGVlbCA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICBwcm90by5faGFuZGxlU2Nyb2xsYmFyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGNvbnRhaW5lci5zY3JvbGxMZWZ0KHRoaXMubG9ja1RvU2Nyb2xsUG9zWzBdKTtcclxuICAgICAgICAgICAgdGhpcy4kY29udGFpbmVyLnNjcm9sbFRvcCh0aGlzLmxvY2tUb1Njcm9sbFBvc1sxXSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICBwcm90by5faGFuZGxlS2V5ZG93biA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5vcHRzLnNjcm9sbEV2ZW50S2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IHRoaXMub3B0cy5zY3JvbGxFdmVudEtleXNbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAvLyBQbHVnaW4gd3JhcHBlciBmb3Igb2JqZWN0XHJcbiAgICAgICAgJC5mbi5zY3JvbGxEaXNhYmxlID0gZnVuY3Rpb24obWV0aG9kKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiBjYWxsaW5nIGZvciB0aGUgZmlyc3QgdGltZSwgaW5zdGFudGlhdGUgdGhlIG9iamVjdCBhbmQgc2F2ZVxyXG4gICAgICAgICAgICAvLyByZWZlcmVuY2UuIFRoZSBwbHVnaW4gY2FuIHRoZXJlZm9yZSBvbmx5IGJlIGluc3RhbnRpYXRlZCBvbmNlIHBlclxyXG4gICAgICAgICAgICAvLyBwYWdlLiBZb3UgY2FuIHBhc3Mgb3B0aW9ucyBvYmplY3QgaW4gdGhyb3VnaCB0aGUgbWV0aG9kIHBhcmFtZXRlci5cclxuICAgICAgICAgICAgaWYoICEgaW5zdGFuY2UgJiYgKHR5cGVvZiBtZXRob2QgPT09IFwib2JqZWN0XCIgfHwgISBtZXRob2QpKSB7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IG5ldyBVc2VyU2Nyb2xsRGlzYWJsZXIodGhpcywgbWV0aG9kKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSW5zdGFuY2UgY3JlYXRlZCwgbm8gbWV0aG9kIHNwZWNpZmllZC4gQ2FsbCBkaXNhYmxlIGFnYWluXHJcbiAgICAgICAgICAgIGlmKGluc3RhbmNlICYmIHR5cGVvZiBtZXRob2QgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlLmRpc2FibGUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSW5zdGFuY2UgYWxyZWFkeSBjcmVhdGVkLCBhbmQgYSBtZXRob2QgaXMgYmVpbmcgZXhwbGljaXRseSBjYWxsZWQsXHJcbiAgICAgICAgICAgIC8vIGUuZy4gLnNjcm9sbERpc2FibGUoJ3VuZG8nKTtcclxuICAgICAgICAgICAgZWxzZSBpZihpbnN0YW5jZSAmJiBpbnN0YW5jZVttZXRob2RdKSB7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVttZXRob2RdLmNhbGwoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIEdsb2JhbCBhY2Nlc3NcclxuICAgICAgICB3aW5kb3cuVXNlclNjcm9sbERpc2FibGVyID0gVXNlclNjcm9sbERpc2FibGVyO1xyXG5cclxuICAgIH0pKGpRdWVyeSk7XHJcblxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gKGRhdGEpID0+IHtcclxuXHJcbiAgICB2YXJcclxuICAgICAgICBEQVRBID0ge1xyXG4gICAgICAgICAgICAkYnVyZ2VyOiBudWxsLFxyXG4gICAgICAgICAgICAkbWVudTogbnVsbCxcclxuICAgICAgICAgICAgJG1lbnVfY29udGFpbmVyOiBudWxsLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgRUxFTUVOVFMgPSBkYXRhLkVMRU1FTlRTLFxyXG4gICAgICAgIEZVTkNUSU9OUyA9IGRhdGEuRlVOQ1RJT05TLFxyXG4gICAgICAgIFNFVFRJTkdTID0ge1xyXG4gICAgICAgICAgICB3YWl0OiAzMDAsXHJcbiAgICAgICAgICAgIHN0eWxlOiAndW5kZXItaGVhZGVyJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFjdGl2ZSA9IGZhbHNlLFxyXG4gICAgICAgIG1vdmluZyA9IGZhbHNlO1xyXG5cclxuXHJcbiAgICBpZiAoZGF0YS5TRVRUSU5HUykge1xyXG4gICAgICAgICQuZXh0ZW5kKERBVEEsIGRhdGEuU0VUVElOR1MpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzdGFydCA9IChzZXR0aW5ncyA9IGZhbHNlKSA9PiB7XHJcblxyXG4gICAgICAgIERBVEEuJGJ1cmdlciA9ICQoXCIjYnVyZ2VyLWJ1dHRvblwiKTtcclxuXHJcblxyXG4gICAgICAgIGlmIChEQVRBLiRidXJnZXIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIERBVEEuJG1lbnUgPSAkKFwiI2J1cmdlci1tZW51XCIpO1xyXG4gICAgICAgICAgICBEQVRBLiRtZW51X2NvbnRhaW5lciA9ICQoXCIjYnVyZ2VyLW1lbnUtY29udGFpbmVyXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgREFUQS4kYnVyZ2VyLm9uKFwiY2xpY2tcIiwgYnVyZ2VyQ2xpY2spO1xyXG5cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICBERUJVRy52YXJpYWJsZS5hZGQoYEJ1cmdlcmAsIHtcclxuICAgICAgICAgICAgJ2FjdGl2ZSc6IGFjdGl2ZSxcclxuICAgICAgICAgICAgJ21vdmluZyc6IG1vdmluZyxcclxuICAgICAgICB9KTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciB0b2dnbGVPZmYgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKFwiQnVyZ2VyIHRvZ2dsZU9mZlwiLCBcImNsaWNrXCIpO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuXHJcbiAgICAgICAgbW92aW5nID0gdHJ1ZTtcclxuICAgICAgICBhY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgRUxFTUVOVFMuJGh0bWwucmVtb3ZlQ2xhc3MoJ2pzX21lbnUtYWN0aXZlJyk7XHJcblxyXG5cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICAvLyBERUJVRy52YXJpYWJsZS5hZGQoe1xyXG4gICAgICAgIC8vICAgICAnQnVyZ2VyIG1vdmluZyc6IG1vdmluZyxcclxuICAgICAgICAvLyAgICAgJ0J1cmdlciBhY3RpdmUnOiBhY3RpdmUsXHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgRUxFTUVOVFMuJGJvZHkuc2Nyb2xsRGlzYWJsZShcInVuZG9cIik7XHJcbiAgICAgICAgICAgIG1vdmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBFTEVNRU5UUy4kaHRtbC5yZW1vdmVDbGFzcygnanNfbWVudS1hY3RpdmUtLWVuZCcpO1xyXG5cclxuICAgICAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgICAgIC8vIERFQlVHLnZhcmlhYmxlLmFkZCh7XHJcbiAgICAgICAgICAgIC8vICAgICAnQnVyZ2VyIG1vdmluZyc6IG1vdmluZyxcclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuXHJcbiAgICAgICAgfSwgU0VUVElOR1Mud2FpdCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgdG9nZ2xlT24gPSAoKSA9PiB7XHJcbiAgICAgICAgRUxFTUVOVFMuJGJvZHkuc2Nyb2xsRGlzYWJsZSgpO1xyXG5cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICBERUJVRy5jb25zb2xlLmFkZChcIkJ1cmdlciB0b2dnbGVPblwiLCBcImNsaWNrXCIpO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuXHJcbiAgICAgICAgaWYgKFNFVFRJTkdTLnN0eWxlKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoU0VUVElOR1Muc3R5bGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAqIEZvciBidXJnZXIgYW5pbWF0aW9uXHJcbiAgICAgICAgICAgICAgICAgKiBAaW1wb3J0IFwiLi4vcGx1Z2lucy9hbmltYXRpb24vbmF2YmFyL3VuZGVyLWhlYWRlclwiO1xyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBjYXNlICd1bmRlci1oZWFkZXInOlxyXG4gICAgICAgICAgICAgICAgICAgIERBVEEuJG1lbnUgPSBEQVRBLiRtZW51X2NvbnRhaW5lci5vZmZzZXRIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEVMRU1FTlRTLiRodG1sLmFkZENsYXNzKCdqc19tZW51LWFjdGl2ZScpO1xyXG4gICAgICAgIEVMRU1FTlRTLiRvdmVybGF5Lm9uKCdjbGljaycsIHRvZ2dsZU92ZXJsYXkpO1xyXG5cclxuICAgICAgICBtb3ZpbmcgPSB0cnVlO1xyXG4gICAgICAgIGFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgIC8vIERFQlVHLnZhcmlhYmxlLmFkZCh7XHJcbiAgICAgICAgLy8gICAgICdCdXJnZXIgYWN0aXZlJzogYWN0aXZlLFxyXG4gICAgICAgIC8vICAgICAnQnVyZ2VyIG1vdmluZyc6IG1vdmluZyxcclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgRUxFTUVOVFMuJGh0bWwuYWRkQ2xhc3MoJ2pzX21lbnUtYWN0aXZlLS1lbmQnKTtcclxuICAgICAgICAgICAgbW92aW5nID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICAgICAgLy8gREVCVUcudmFyaWFibGUuYWRkKHtcclxuICAgICAgICAgICAgLy8gICAgICdCdXJnZXIgbW92aW5nJzogbW92aW5nLFxyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgICAgICB9LCBTRVRUSU5HUy53YWl0KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciB0b2dnbGVPdmVybGF5ID0gKCkgPT4ge1xyXG5cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICBERUJVRy5jb25zb2xlLmFkZChcIkJ1cmdlciBvdmVybGF5IHRvZ2dsZU9mZlwiLCBcImNsaWNrXCIpO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuXHJcbiAgICAgICAgRUxFTUVOVFMuJG92ZXJsYXkub2ZmKCdjbGljaycsIHRvZ2dsZU92ZXJsYXkpO1xyXG5cclxuICAgICAgICB0b2dnbGVPZmYoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgYnVyZ2VyQ2xpY2sgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIGlmICghbW92aW5nKSB7XHJcblxyXG4gICAgICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICAgICAgREVCVUcuY29uc29sZS5hZGQoXCJCdXJnZXIgY2xpY2tlZFwiLCBcImNsaWNrXCIpO1xyXG4gICAgICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgICAgICAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0b2dnbGVPZmYoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRvZ2dsZU9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBERUJVRy5jb25zb2xlLmFkZChcIkJ1cmdlciBjbGljayBibG9ja2VkLiBCdXJnZXIgaXMgbW92aW5nXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgc3RhcnQoKTtcclxuXHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSAoZGF0YSkgPT4ge1xyXG5cclxuICAgIHZhciBcclxuICAgIFNFVFRJTkdTID0ge1xyXG4gICAgICAgIHNweVRvcDogdHJ1ZSxcclxuICAgICAgICBvZmZzZXQ6IDEsXHJcbiAgICAgICAgc3B5VG9wQ2xhc3M6ICdqc19zdGlja3ktZWxlbWVudC0tYWN0aXZlJyxcclxuICAgIH0sXHJcbiAgICBFTEVNRU5UUyA9IGRhdGEuRUxFTUVOVFMsXHJcbiAgICBTQ1JPTEwgPSBkYXRhLlNDUk9MTCxcclxuICAgICRlbGVtZW50U3B5ID0gZGF0YS4kZWxlbWVudFNweSxcclxuICAgIERBVEEgPSB7XHJcbiAgICAgICAgaGVpZ2h0OiBudWxsLFxyXG4gICAgICAgIG9mZnNldDogbnVsbCxcclxuICAgIH0sXHJcbiAgICBhY3RpdmUgPSBmYWxzZSxcclxuICAgIHBvc2l0aW9uID0gbnVsbDtcclxuXHJcbiAgICBpZiAoZGF0YS5TRVRUSU5HUykge1xyXG4gICAgICAgICQuZXh0ZW5kKERBVEEsIGRhdGEuU0VUVElOR1MpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzdGFydCA9IChkYXRhKSA9PiB7XHJcblxyXG4gICAgICAgIGlmICgkZWxlbWVudFNweS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICQod2luZG93KS5vbigncmVzaXplIG9yaWVudGF0aW9uY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHJlZnJlc2goKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChTRVRUSU5HUy5zcHlUb3ApIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzcHlUb3AoKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgRUxFTUVOVFMuJHdpbmRvdy5vbihcInNjcm9sbFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3B5VG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9KTsgICBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKGBTdGFydCBzdGlja3kuanMge29mZnNldDogJHtEQVRBLm9mZnNldH07IH1gKTtcclxuICAgICAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdmFyIHJlZnJlc2ggPSAoKSA9PiB7XHJcbiAgICAgICAgY2FsY3VsYXRlSGVhZGVyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCFTRVRUSU5HUy5vZmZzZXQpIHtcclxuICAgICAgICAgICAgREFUQS5vZmZzZXQgPSBTRVRUSU5HUy5vZmZzZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBEQVRBLm9mZnNldCA9ICRlbGVtZW50U3B5Lm9mZnNldCgpLnRvcDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBjYWxjdWxhdGVIZWFkZXIgPSAoZGF0YSkgPT4ge1xyXG5cclxuICAgICAgICBwb3NpdGlvbiA9ICRlbGVtZW50U3B5Lm9mZnNldCgpLnRvcDtcclxuICAgICAgICBEQVRBLmhlaWdodCA9ICRlbGVtZW50U3B5Lm91dGVySGVpZ2h0KHRydWUpO1xyXG5cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICAvLyBERUJVRy52YXJpYWJsZS5hZGQoe1xyXG4gICAgICAgIC8vICAgICBcIkhlYWRlciBoZWlnaHRcIjogREFUQS5oZWlnaHQsXHJcbiAgICAgICAgLy8gICAgIFwiSGVhZGVyIHBvc2l0aW9uXCI6IHBvc2l0aW9uLFxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgIH07XHJcblxyXG4gICAgdmFyIHNweVRvcCA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgaWYgKFNDUk9MTC50b3AgPiBEQVRBLm9mZnNldCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIWFjdGl2ZSkgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvLyBFTEVNRU5UUy4kaGVhZGVyUGxhY2Vob2xkZXIuY3NzKHtoZWlnaHQ6IERBVEEuaGVpZ2h0fSk7XHJcbiAgICAgICAgICAgICAgICBFTEVNRU5UUy4kaHRtbC5hZGRDbGFzcyhTRVRUSU5HUy5zcHlUb3BDbGFzcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2UgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vIEVMRU1FTlRTLiRoZWFkZXJQbGFjZWhvbGRlci5jc3Moe2hlaWdodDogXCJcIn0pO1xyXG4gICAgICAgICAgICAgICAgRUxFTUVOVFMuJGh0bWwucmVtb3ZlQ2xhc3MoU0VUVElOR1Muc3B5VG9wQ2xhc3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICAvLyBERUJVRy52YXJpYWJsZS5hZGQoe1xyXG4gICAgICAgIC8vICAgJ0hlYWRlciBhY3RpdmUnOiBhY3RpdmUsXHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgc3RhcnQoKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG5cclxuICAgIH07XHJcblxyXG59OyIsIi8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG58fCBTbW9vdGggc2Nyb2xsIHRvIHRhcmdldFxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxufHwgUmVxdWlyZWRcclxufHwgKiBTQ1JPTExcclxufHwgKiBFTEVNRU5UU1xyXG58fCAqIEZVTkNUSU9OU1xyXG58fFxyXG58fCAqIGRhdGEtZWxlbWVudCAtIHNlbGVjdCBlbGVtZW50cyBzZXBhcmF0ZSB3aXRoIGNvbW1hICggJChcImRhdGEtbGVtZW50XCIpIClcclxufHwgKiBkYXRhLXRvZ2dsZSAtIHNlbGVjdCB0eXBlIG9mIHRvZ2dsZVxyXG58fFxyXG58fCBEYXRhLXRvZ2dsZSB0eXBlOlxyXG58fCAqIGNvbGxhcHNlIC0gY29sbGFwc2UgZGF0YS1lbGVtZW50ICggdXNlIGxlc3MvamF2YXNjcmlwdC9fY29sbGFwc2UubGVzcyBjbGFzcyApXHJcbnx8ICogc29tZXRoaW5nIGVsc2UgLSB0b2dnbGUgZGF0YS1lbGVtZW50IHVzaW5nIGNsYXNzIG9uIGRhdGEtdG9nZ2xlXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xyXG5tb2R1bGUuZXhwb3J0cyA9IChkYXRhKSA9PiB7XHJcbiAgICBcclxuICAgIHZhclxyXG4gICAgU0NST0xMID0gZGF0YS5TQ1JPTEwsXHJcbiAgICBFTEVNRU5UUyA9IGRhdGEuRUxFTUVOVFMsXHJcbiAgICBGVU5DVElPTlMgPSBkYXRhLkZVTkNUSU9OUyxcclxuICAgIC8vIGFsbCBjbGlja2FibGUgc2Nyb2xsIGVsZW1lbnRzXHJcbiAgICAkZWxlbWVudHMgPSBudWxsLFxyXG4gICAgLy8gYm9vbCBwYWdlIGlzIHNjcm9sbFxyXG4gICAgYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgdmFyXHJcbiAgICBTRVRUSU5HUyA9IHtcclxuICAgICAgICAvLyBhY3RpdmUgYXV0b21hdGljIHNjcm9sbCBwYWdlIHRvIGVsZW1lbnQgdmlhIFVSTCBoYXNoXHJcbiAgICAgICAgYXV0b1Njcm9sbDogZmFsc2UsXHJcbiAgICAgICAgLy8gZGl2aWRlIGRpc3RhbmNlIGJ5IHRoaXMgdmFsdWUgdG8gY2FsY3VsYXRlIHRpbWUgc2Nyb2xsXHJcbiAgICAgICAgdGltZTogMixcclxuICAgICAgICAvLyBtaW4gdGltZSBzY3JvbGxcclxuICAgICAgICBtaW5UaW1lOiA0MDAsXHJcbiAgICAgICAgLy8gbWF4IHRpbWUgc2Nyb2xsXHJcbiAgICAgICAgbWF4VGltZTogMTIwMCxcclxuICAgICAgICAvLyBydW4gYXV0b1Njcm9sbCB3aGVuIGhhc2ggaW4gVVJMIGlzIGJlZ2luIHdpdGggdGhpcyBzdHJpbmdcclxuICAgICAgICBwcmVmaXhBdXRvU2Nyb2xsOiAnc2Nyb2xsLSdcclxuICAgIH07XHJcblxyXG4gICAgJC5leHRlbmQoIFNFVFRJTkdTLCBkYXRhLlNFVFRJTkdTICk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydCBmdW5jdGlvblxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxyXG4gICAgICogcmVwbGFjZSB2YWx1ZXMgaW4gU0VUVElOR1MgXHJcbiAgICAgKi9cclxuICAgIHZhclxyXG4gICAgc3RhcnQgPSAoZGF0YSkgPT4ge1xyXG5cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICBERUJVRy5jb25zb2xlLmFkZChcIlN0YXJ0OiBzY3JvbGxUb1wiKTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIGlmIChTRVRUSU5HUy5hdXRvU2Nyb2xsKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGF1dG9TY3JvbGwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlZnJlc2goKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXV0b21hdGljIHNjcm9sbCBwYWdlIHRvIGVsZW1lbnQgSURcclxuICAgICAqIHdoZW4gdXNlciB2aXNpdCBwYWdlIHdpdGggaGFzaFxyXG4gICAgICogYmVnaW4gd2l0aCBTRVRUSU5HUy5wcmVmaXhBdXRvU2Nyb2xsXHJcbiAgICAgKi9cclxuICAgIHZhclxyXG4gICAgYXV0b1Njcm9sbCA9ICgpID0+IHtcclxuICAgICAgICB2YXIgXHJcbiAgICAgICAgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIENoZWNrIGlmIHBhZ2UgbXVzdCB0cmlnZ2VyIGF1dG9TY3JvbGxcclxuICAgICAgICBpZiggaGFzaC5zdGFydHNXaXRoKCBcIiNcIiArIFNFVFRJTkdTLnByZWZpeEF1dG9TY3JvbGwgKSApIHtcclxuXHJcbiAgICAgICAgICAgIC8vIEZpeCBhbm5veWluZyBqdW1waW5nIHdoZW4gdXNlciBkaXN0dXJiIHNjcm9sbFxyXG4gICAgICAgICAgICBFTEVNRU5UUy4kYm9keS5zY3JvbGxEaXNhYmxlKHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVtb3ZlIGhhc2ggZnJvbSB1cmxcclxuICAgICAgICAgICAgdmFyIFxyXG4gICAgICAgICAgICBjbGVhblVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdCArIGxvY2F0aW9uLnBhdGhuYW1lO1xyXG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sIGRvY3VtZW50LnRpdGxlLCBjbGVhblVybCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgdGFyZ2V0IElEIGZyb20gaGFzaFxyXG4gICAgICAgICAgICB2YXIgXHJcbiAgICAgICAgICAgIHRhcmdldElEID0gaGFzaC5zdWJzdHJpbmcoaGFzaC5pbmRleE9mKCctJykrMSwgaGFzaC5sZW5naHQpO1xyXG5cclxuICAgICAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKFwic2Nyb2xsVG8uanMgYXV0byB0cmlnZ2VyIGZ1bmN0aW9uIGF1dG9TY3JvbGwoKS5cIiwgJ2F1dG8nKTtcclxuICAgICAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gRml4IGFubm95aW5nIGp1bXBpbmcgd2hlbiBwYWdlIGlzIHN0aWxsIG5vdCByZWFkeVxyXG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgb24odGFyZ2V0SUQpO1xyXG4gICAgICAgICAgICB9LCA5MDApO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2Nyb2xsIGZ1bmN0aW9uXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50IGludGVyZmFjZX0gZXZlbnQgXHJcbiAgICAgKiBAcGFyYW0ge2pRdWVyeSBvYmplY3Q7IFN0cmluZyBJRH0gdGFyZ2V0IFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWUgXHJcbiAgICAgKi9cclxuICAgIHZhclxyXG4gICAgc2Nyb2xsID0gKGV2ZW50LCB0YXJnZXQgPSBmYWxzZSwgdGltZSA9IGZhbHNlKSA9PiB7XHJcbiAgICAgICAgdmFyXHJcbiAgICAgICAgdGFyZ2V0SUQsICR0YXJnZXQsICR0aGlzO1xyXG5cclxuICAgICAgICAvLyBDaGVjayBldmVudCBhbmQgcmVtb3ZlIGRlZmF1bHQgYWN0aW9uXHJcbiAgICAgICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgICAgICBERUJVRy5jb25zb2xlLmFkZChgQ2xpY2sgc2Nyb2xsVG86IGV2ZW50LnByZXZlbnREZWZhdWx0KClgLCAnY2xpY2snKTtcclxuICAgICAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG4gICAgICAgICAgICAkdGhpcyA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayB0YXJnZXQgZWxlbWVudFxyXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldElEID0gXCIjXCIgKyAkdGhpcy5hdHRyKFwiZGF0YS1zY3JvbGxcIik7XHJcbiAgICAgICAgICAgICR0YXJnZXQgPSAkKHRhcmdldElEKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgalF1ZXJ5KSB7XHJcbiAgICAgICAgICAgICAgICAkdGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0SUQgPSBcIiNcIiArICR0YXJnZXQuYXR0cihcIklEXCIpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldElEID0gXCIjXCIgKyB0YXJnZXQ7XHJcbiAgICAgICAgICAgICAgICAkdGFyZ2V0ID0gJCh0YXJnZXRJRCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHNjcm9sbCBhbmltYXRpb24gaXMgZnJlZSB0byB1c2VcclxuICAgICAgICBpZiAoIWFjdGl2ZSkge1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgJHRhcmdldCBleGlzdFxyXG4gICAgICAgICAgICBpZiAoJHRhcmdldC5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBCbG9jayBvdGhlciBzY3JvbGwgdHJpZ2dlcnNcclxuICAgICAgICAgICAgICAgIGFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gR3JhYiB0YXJnZXQgdG9wIHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICB2YXJcclxuICAgICAgICAgICAgICAgIHRhcmdldFBvc2l0aW9uVG9wID0gJHRhcmdldC5vZmZzZXQoKS50b3AsXHJcbiAgICAgICAgICAgICAgICAvLyBTY3JvbGwgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgIHNjcm9sbFRvID0gdGFyZ2V0UG9zaXRpb25Ub3A7ICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBDYWxjdWxhdGUgc2Nyb2xsVGltZSBcclxuICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUaW1lID0gTWF0aC5yb3VuZChNYXRoLmFicyh0YXJnZXRQb3NpdGlvblRvcCAtIFNDUk9MTC50b3ApIC8gU0VUVElOR1MudGltZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsVGltZSA8IFNFVFRJTkdTLm1pblRpbWUpIFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRpbWUgPSBTRVRUSU5HUy5taW5UaW1lO1xyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNjcm9sbFRpbWUgPiBTRVRUSU5HUy5tYXhUaW1lKSBcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUaW1lID0gU0VUVElOR1MubWF4VGltZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgICAgICAgICAgREVCVUcuY29uc29sZS5hZGQoYENsaWNrIHNjcm9sbFRvOiBzY3JvbGwgdG8gZWxlbWVudCB7dGFyZ2V0OiA8c3Ryb25nPiR7dGFyZ2V0SUR9PC9zdHJvbmc+OyBzcGVlZCA8c3Ryb25nPiR7c2Nyb2xsVGltZX1tczwvc3Ryb25nPjsgcG9zaXRpb246IDxzdHJvbmc+JHtzY3JvbGxUb308L3N0cm9uZz59YCwgJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQW5pbWF0ZSBzY3JvbGxcclxuICAgICAgICAgICAgICAgIEVMRU1FTlRTLiRib2R5LnNjcm9sbERpc2FibGUoKTtcclxuICAgICAgICAgICAgICAgIEVMRU1FTlRTLiRwYWdlLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG8sXHJcbiAgICAgICAgICAgICAgICB9LCAxMjAwLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgRUxFTUVOVFMuJGJvZHkuc2Nyb2xsRGlzYWJsZSgndW5kbycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBFTEVNRU5UUy4kcGFnZS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBzY3JvbGxUb3A6IHRhcmdldFBvc2l0aW9uVG9wIC0gRUxFTUVOVFMuJGhlYWRlci5vdXRlckhlaWdodCh0cnVlKSxcclxuICAgICAgICAgICAgICAgIC8vIH0sIHNjcm9sbFRpbWUsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBGVU5DVElPTlMub25Vc2VyU2Nyb2xsKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICAgICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKGBFcnJvciBzY3JvbGxUbzogZWxlbWVudCA8c3Ryb25nPiR7dGFyZ2V0SUR9PC9zdHJvbmc+IGRvZXNuJ3QgZXhpc3RgLCAnZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICBlbHNlIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgREVCVUcuY29uc29sZS5hZGQoYFdhcm5pbmcgc2Nyb2xsVG86IHNjcm9sbCBhbmltYXRpb24gd291bGRuJ3QgZmluaXNoYCwgJ3dhcm5pbmcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNjcm9sbCB0byBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0ge2pRdWVyeSBvYmplY3Q7IFN0cmluZyBJRH0gZWxlbWVudCBcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lIFxyXG4gICAgICogQHJldHVybiB7Qm9vbH1cclxuICAgICAqL1xyXG4gICAgdmFyXHJcbiAgICBvbiA9IChlbGVtZW50LCB0aW1lID0gZmFsc2UpID0+IHtcclxuICAgICAgICByZXR1cm4gc2Nyb2xsKGZhbHNlLCBlbGVtZW50LCB0aW1lKTtcclxuICAgIH07XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmVmcmVzaCBiaW5kZWQgJGVsZW1lbnRzXHJcbiAgICAgKi9cclxuICAgIHZhclxyXG4gICAgcmVmcmVzaCA9ICgpID0+IFxyXG4gICAge1xyXG5cclxuICAgICAgICBpZiAoJGVsZW1lbnRzKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICRlbGVtZW50cy5vZmYoXCJjbGlja1wiLCBzY3JvbGwpO1xyXG5cclxuICAgICAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKFwiUmVmcmVzaDogc2Nyb2xsVG8ge2xlbmd0aDogXCIgKyAkZWxlbWVudHMubGVuZ3RoICsgXCI7fVwiKTtcclxuICAgICAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgJGVsZW1lbnRzID0gJChcIltkYXRhLXNjcm9sbF1cIik7XHJcbiAgICAgICAgJGVsZW1lbnRzLm9uKFwiY2xpY2tcIiwgc2Nyb2xsKTtcclxuXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgREVCVUcuY29uc29sZS5hZGQoXCJEYXRhOiBzY3JvbGxUbyB7bGVuZ3RoOiBcIiArICRlbGVtZW50cy5sZW5ndGggKyBcIjt9XCIpO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgIH07XHJcblxyXG4gICAgc3RhcnQoKTtcclxuICBcclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IChkYXRhKSA9PiB7XHJcblxyXG4gIHZhclxyXG4gICRpdGVtcyA9IG51bGw7XHJcblxyXG4gIHZhclxyXG4gIFRSQU5TSVRJT05IRUlHSFQsIFJFU0laRTtcclxuXHJcbiAgdmFyXHJcbiAgc3RhcnQgPSAoKSA9PiB7XHJcblxyXG4gICAgVFJBTlNJVElPTkhFSUdIVCA9IGRhdGEuVFJBTlNJVElPTkhFSUdIVDtcclxuICAgIFJFU0laRSA9IGRhdGEuUkVTSVpFO1xyXG5cclxuICAgIC8vIFJFU0laRS5hZGQoXCJzaG93TW9yZVwiLCAoKSA9PiB7XHJcbiAgICAvLyAgIHJlZnJlc2goKTtcclxuICAgIC8vIH0pO1xyXG5cclxuICAgIHJlZnJlc2goKTtcclxuICB9O1xyXG5cclxuICB2YXJcclxuICByZWZyZXNoID0gKCkgPT4ge1xyXG4gICAgaWYgKCRpdGVtcykge1xyXG4gICAgICAkaXRlbXMub2ZmKFwiY2xpY2tcIiwgY2xpY2spO1xyXG4gICAgfVxyXG4gICAgJGl0ZW1zID0gJChgW2RhdGE9J3Nob3dNb3JlJ11gKTtcclxuXHJcbiAgICBpZiAoJGl0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAkaXRlbXMuZWFjaCggKGluZGV4LCBlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgY2hlY2tWaXNpYmxlU3BhY2UoZWxlbWVudCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICB9O1xyXG5cclxuICB2YXJcclxuICBjaGVja1Zpc2libGVTcGFjZSA9IChlbGVtZW50KSA9PiB7XHJcbiAgICB2YXJcclxuICAgICR0aGlzID0gJChlbGVtZW50KSxcclxuICAgIGRhdGFUYXJnZXQgPSAkdGhpcy5hdHRyKCdkYXRhLXRhcmdldCcpLFxyXG4gICAgJHdyYXAsICRjb250YWluZXI7XHJcblxyXG4gICAgc3dpdGNoIChkYXRhVGFyZ2V0KSB7XHJcbiAgICAgIGNhc2UgXCJwcmV2RWxlbWVudFwiOlxyXG4gICAgICAgICR3cmFwID0gJHRoaXMucHJldigpO1xyXG4gICAgICAgICRjb250YWluZXIgPSAkd3JhcC5maW5kKFwiLnNob3ctbW9yZV9fY29udGVudFwiKS5maXJzdCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwibmV4dEVsZW1lbnRcIjpcclxuICAgICAgICAkd3JhcCA9ICR0aGlzLm5leHQoKTtcclxuICAgICAgICAkY29udGFpbmVyID0gJHdyYXAuZmluZChcIi5zaG93LW1vcmVfX2NvbnRlbnRcIikuZmlyc3QoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIFxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGxldCBcclxuICAgICAgICB3cmFwSWQgPSAkdGhpcy5hdHRyKGBkYXRhLXRhcmdldGApO1xyXG4gICAgICAgICR3cmFwID0gJChgIyR7d3JhcElkfWApO1xyXG4gICAgICAgICRjb250YWluZXIgPSAkd3JhcC5maW5kKFwiLnNob3ctbW9yZV9fY29udGVudFwiKS5maXJzdCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiAoJHdyYXAub3V0ZXJIZWlnaHQoIHRydWUgKSA8ICRjb250YWluZXIub3V0ZXJIZWlnaHQoIHRydWUgKSkge1xyXG4gICAgICAkdGhpcy5yZW1vdmVDbGFzcyhcImhpZGVcIik7XHJcbiAgICAgICR0aGlzLm9uKFwiY2xpY2tcIiwgeyR0aGlzfSwgY2xpY2spOyAgICAgICAgICBcclxuICAgIH0gXHJcbiAgICBlbHNlIHtcclxuICAgICAgJHRoaXMuYWRkQ2xhc3MoXCJoaWRlXCIpO1xyXG4gICAgfVxyXG5cclxuICB9O1xyXG5cclxuICB2YXJcclxuICBjbGljayA9IChwYXJhbURhdGEpID0+IHtcclxuICAgIHZhciBcclxuICAgIHBhcmFtID0gcGFyYW1EYXRhLmRhdGEsXHJcbiAgICAkdGhpcyA9IHBhcmFtLiR0aGlzLFxyXG4gICAgZGF0YVRhcmdldCA9ICR0aGlzLmF0dHIoYGRhdGEtdGFyZ2V0YCksXHJcbiAgICAkY29udGFpbmVyLFxyXG4gICAgJHdyYXA7XHJcblxyXG4gICAgc3dpdGNoIChkYXRhVGFyZ2V0KSB7XHJcbiAgICAgIGNhc2UgXCJwcmV2RWxlbWVudFwiOlxyXG4gICAgICAgICR3cmFwID0gJHRoaXMucHJldigpO1xyXG4gICAgICAgICRjb250YWluZXIgPSAkd3JhcC5maW5kKFwiLnNob3ctbW9yZV9fY29udGVudFwiKS5maXJzdCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwibmV4dEVsZW1lbnRcIjpcclxuICAgICAgICAkd3JhcCA9ICR0aGlzLm5leHQoKTtcclxuICAgICAgICAkY29udGFpbmVyID0gJHdyYXAuZmluZChcIi5zaG93LW1vcmVfX2NvbnRlbnRcIikuZmlyc3QoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIFxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgICRjb250YWluZXIgPSAkdGhpcztcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoJHRoaXMuaGFzQ2xhc3MoXCJqc19hY3RpdmVcIikpIHtcclxuICAgICAgb2ZmKCR0aGlzLCAkd3JhcCwgJGNvbnRhaW5lcik7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKCRjb250YWluZXIpO1xyXG4gICAgb24oJHRoaXMsICR3cmFwLCAkY29udGFpbmVyKTtcclxuICB9O1xyXG5cclxuICB2YXJcclxuICBvbiA9ICgkbGluaywgJGl0ZW0sICRjb250YWluZXIpID0+IHtcclxuXHJcbiAgICAkbGluay5hZGRDbGFzcyhcImpzX2FjdGl2ZVwiKTtcclxuXHJcbiAgICBUUkFOU0lUSU9OSEVJR0hULm9uKHtcclxuICAgICAgJHRoaXM6ICRpdGVtLCBcclxuICAgICAgJGNsaWNrZWQ6ICRsaW5rLFxyXG4gICAgICAkY29udGFpbmVyOiAkY29udGFpbmVyLCAgICAgICAgICAgIFxyXG4gICAgICBjYWxsYmFjazogKCkgPT4ge1xyXG4gICAgICAgICRpdGVtLmFkZENsYXNzKFwic2hvdy1tb3JlLS1hY3RpdmVcIik7XHJcbiAgICAgIH0sICBcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgXHJcbiAgdmFyXHJcbiAgb2ZmID0gKCRsaW5rLCAkaXRlbSwgJGNvbnRhaW5lcikgPT4ge1xyXG5cclxuICAgICRsaW5rLnJlbW92ZUNsYXNzKFwianNfYWN0aXZlXCIpO1xyXG5cclxuICAgIFRSQU5TSVRJT05IRUlHSFQub2ZmKHtcclxuICAgICAgJHRoaXM6ICRpdGVtLCBcclxuICAgICAgJGNvbnRhaW5lcjogJGNvbnRhaW5lciwgICAgXHJcbiAgICAgIGNhbGxiYWNrQmVmb3JlOiAoKSA9PiB7XHJcbiAgICAgICAgJGl0ZW0ucmVtb3ZlQ2xhc3MoXCJzaG93LW1vcmUtLWFjdGl2ZVwiKTtcclxuICAgICAgfSBcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIHN0YXJ0KCk7XHJcblxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gKGFyZ3VtZW50KSA9PiB7XHJcbiAgICBcclxuICAgIHZhciBcclxuICAgIFNDUk9MTCAgICAgICAgICAgICAgPSBudWxsO1xyXG4gICAgRUxFTUVOVFMgICAgICAgICAgICA9IG51bGw7XHJcbiAgICBERVZJQ0UgICAgICAgICAgICAgID0gbnVsbDtcclxuXHJcbiAgICB2YXJcclxuICAgIERBVEEgPSB7fSxcclxuICAgIGFjdGl2ZU1vZHVsZSA9IGZhbHNlO1xyXG5cclxuICAgIHZhclxyXG4gICAgQ0xBU1MgPSB7XHJcbiAgICAgICAgZml4ZWQgICAgICAgICAgIDogYGpzLXN0aWNreS1zcHktLWZpeGVkYCxcclxuICAgICAgICBib3R0b20gICAgICAgICAgOiBganMtc3RpY2t5LXNweS0tYm90dG9tYCxcclxuICAgIH07XHJcblxyXG4gICAgLyogU3RhcnQgbW9kdWxlICovXHJcbiAgICBjb25zdFxyXG4gICAgc3RhcnQgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIC8qIFByZXBhcmUgYXJndW1lbnRzIGRhdGEgKi9cclxuICAgICAgICBTQ1JPTEwgPSBhcmd1bWVudC5TQ1JPTEw7XHJcbiAgICAgICAgRUxFTUVOVFMgPSBhcmd1bWVudC5FTEVNRU5UUztcclxuICAgICAgICBEQVRBID0gYXJndW1lbnQuREFUQTtcclxuICAgICAgICBERVZJQ0UgPSBhcmd1bWVudC5ERVZJQ0U7XHJcblxyXG4gICAgICAgIC8qIFJ1biAqL1xyXG4gICAgICAgIHJlZnJlc2goKTtcclxuXHJcbiAgICAgICAgaWYgKGFjdGl2ZU1vZHVsZSkge1xyXG4gICAgICAgICAgICAvKiBCaW5kICovXHJcbiAgICAgICAgICAgIEVMRU1FTlRTLiR3aW5kb3cub24oJ3Jlc2l6ZSBvcmllbnRhdGlvbmNoYW5nZScsIHJlZnJlc2gpO1xyXG4gICAgICAgICAgICBFTEVNRU5UUy4kd2luZG93LnNjcm9sbCggc2Nyb2xsICk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKiBSZWZyZXNoIG1vZHVsZSAqL1xyXG4gICAgY29uc3RcclxuICAgIHJlZnJlc2ggPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIERBVEEpIHtcclxuICAgICAgICAgICAgaWYgKERBVEEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IERBVEFba2V5XTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuJGl0ZW0ubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1vZHVsZSA9IHRydWU7XHJcblxyXG5cdFx0XHRcdFx0LyogQ2xlYW4gc3R5bGUgKi9cclxuXHRcdFx0XHRcdGVsZW1lbnQuYWN0aXZlID0gZmFsc2U7XHJcblx0XHRcdFx0XHRlbGVtZW50LiRpdGVtLnJlbW92ZUNsYXNzKGAke0NMQVNTLmJvdHRvbX0gJHtDTEFTUy5ydW59YCk7XHJcblxyXG5cdFx0XHRcdFx0LyogUHJlcGFyZSBjYWxjdWxhdGUgKi9cclxuXHRcdFx0XHRcdGxldFxyXG5cdFx0XHRcdFx0Y29udGFpbmVyT2Zmc2V0ID0gZWxlbWVudC4kY29udGFpbmVyLm9mZnNldCgpLFxyXG5cdFx0XHRcdFx0Y29udGFpbmVySGVpZ2h0ID0gZWxlbWVudC4kY29udGFpbmVyLm91dGVySGVpZ2h0KHRydWUpLFxyXG5cdFx0XHRcdFx0aXRlbU9mZnNldCA9IGVsZW1lbnQuJGl0ZW0ub2Zmc2V0KCksXHJcblx0XHRcdFx0XHRpdGVtSGVpZ2h0ID0gZWxlbWVudC4kaXRlbS5vdXRlckhlaWdodCh0cnVlKTtcclxuXHJcblx0XHRcdFx0XHQvKiBDYWxjdWxhdGUgY29udGFpbmVyICovXHJcblx0XHRcdFx0XHRlbGVtZW50LmNvbnRhaW5lciA9IHtcclxuXHRcdFx0XHRcdFx0aGVpZ2h0OiBjb250YWluZXJIZWlnaHQsXHJcblx0XHRcdFx0XHRcdHdpZHRoOiBlbGVtZW50LiRjb250YWluZXIub3V0ZXJXaWR0aCh0cnVlKSxcclxuXHRcdFx0XHRcdFx0b2Zmc2V0OiB7XHJcblx0XHRcdFx0XHRcdFx0dG9wICAgICAgICAgICAgIDogY29udGFpbmVyT2Zmc2V0LnRvcCxcclxuXHRcdFx0XHRcdFx0XHRib3R0b20gICAgICAgICAgOiBjb250YWluZXJPZmZzZXQudG9wICsgY29udGFpbmVySGVpZ2h0LFxyXG5cdFx0XHRcdFx0XHRcdGxlZnQgICAgICAgICAgICA6IGNvbnRhaW5lck9mZnNldC5sZWZ0LFxyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0fTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLyogQ2FsY3VsYXRlIGl0ZW0gKi9cclxuXHRcdFx0XHRcdGVsZW1lbnQuaXRlbSA9IHtcclxuXHRcdFx0XHRcdFx0aGVpZ2h0OiBpdGVtSGVpZ2h0LFxyXG5cdFx0XHRcdFx0XHRvZmZzZXQ6IHtcclxuXHRcdFx0XHRcdFx0XHR0b3AgICAgICAgICAgICAgOiBpdGVtT2Zmc2V0LnRvcCxcclxuXHRcdFx0XHRcdFx0XHRib3R0b20gICAgICAgICAgOiBpdGVtT2Zmc2V0LnRvcCArIGl0ZW1IZWlnaHQsXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdC8qIFNldCBzdHlsZSB0byBpdGVtICovXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC4kaXRlbS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aCAgICAgICAgICAgICAgIDogZWxlbWVudC5jb250YWluZXIud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRcdFx0XHRcdDogZWxlbWVudC5jb250YWluZXIub2Zmc2V0LmxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgICAgICAgICAgICAgIERFQlVHLnZhcmlhYmxlLmFkZChgU3RpY2t5IFNweSAke2tleX1gLCBlbGVtZW50Lml0ZW0ub2Zmc2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFjdGl2ZU1vZHVsZSkge1xyXG4gICAgICAgICAgICBzY3JvbGwoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0XHJcbiAgICBzY3JvbGwgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIERBVEEpIHtcclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IERBVEFba2V5XTtcclxuXHJcblx0XHRcdC8qIFByZXBhcmUgY2FsY3VsYXRlICovXHJcbiAgICAgICAgICAgIGxldFxyXG4gICAgICAgICAgICBvZmZzZXQgPSBlbGVtZW50LiRpdGVtLm9mZnNldCgpO1xyXG5cclxuXHRcdFx0ZWxlbWVudC5pdGVtLm9mZnNldC50b3AgPSBvZmZzZXQudG9wO1xyXG5cdFx0XHRlbGVtZW50Lml0ZW0ub2Zmc2V0LmJvdHRvbSA9IG9mZnNldC50b3AgKyBlbGVtZW50Lml0ZW0uaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgLy8gZGVidWdnZXI7XHJcblxyXG4gICAgICAgICAgICBsZXRcclxuICAgICAgICAgICAgaXNCb3R0b20gPSBlbGVtZW50Lml0ZW0uaGVpZ2h0ICsgU0NST0xMLnRvcCA+PSBlbGVtZW50LmNvbnRhaW5lci5vZmZzZXQuYm90dG9tICYmIFNDUk9MTC5ib3R0b20gPiBlbGVtZW50LmNvbnRhaW5lci5vZmZzZXQuYm90dG9tLFxyXG4gICAgICAgICAgICBpc1RvcCA9IGVsZW1lbnQuYWN0aXZlICYmICFpc0JvdHRvbSAmJiBlbGVtZW50Lml0ZW0ub2Zmc2V0LnRvcCA8PSBlbGVtZW50LmNvbnRhaW5lci5vZmZzZXQudG9wICYmIFNDUk9MTC5iZWdpbiA8PSBlbGVtZW50LmNvbnRhaW5lci5vZmZzZXQudG9wLFxyXG4gICAgICAgICAgICBpc0ZpeGVkID0gZWxlbWVudC5hY3RpdmUgIT0gMSAmJiAhaXNCb3R0b20gJiYgU0NST0xMLmJlZ2luID4gZWxlbWVudC5jb250YWluZXIub2Zmc2V0LnRvcDtcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIHRvcCBwb3NpdGlvblxyXG5cdFx0XHRpZiAoaXNGaXhlZCkge1xyXG5cdFx0XHRcdGVsZW1lbnQuJGl0ZW0uYWRkQ2xhc3MoYCR7Q0xBU1MuZml4ZWR9YCkucmVtb3ZlQ2xhc3MoYCR7Q0xBU1MuYm90dG9tfWApO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5hY3RpdmUgPSAxO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LiRpdGVtLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAkKCcjaGVhZGVyJykub3V0ZXJIZWlnaHQoIHRydWUgKSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChpc1RvcCkge1xyXG5cdFx0XHRcdGVsZW1lbnQuJGl0ZW0ucmVtb3ZlQ2xhc3MoYCR7Q0xBU1MuYm90dG9tfSAke0NMQVNTLmZpeGVkfWApO1xyXG5cdFx0XHRcdGVsZW1lbnQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGJvdHRvbSBwb3NpdGlvblxyXG4gICAgICAgICAgICBpZiAoaXNCb3R0b20gJiYgZWxlbWVudC5hY3RpdmUgIT0gMikge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC4kaXRlbS5hZGRDbGFzcyhgJHtDTEFTUy5ib3R0b219YCkucmVtb3ZlQ2xhc3MoYCR7Q0xBU1MuZml4ZWR9YCk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFjdGl2ZSA9IDI7XHJcbiAgICAgICAgICAgIH0gXHJcblxyXG4gICAgICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICAgICAgREVCVUcudmFyaWFibGUucmVmcmVzaChgU3RpY2t5IFNweSAke2tleX1gKTtcclxuICAgICAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgc3RhcnQoKTtcclxuXHJcbiAgICByZXR1cm4gREFUQTtcclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IChkYXRhKSA9PiB7XHJcblxyXG4gIHZhciAgXHJcbiAgJEVMRU1FTlRTID0ge1xyXG4gICAgbGlua3M6IFtdLFxyXG4gIH0sXHJcbiAgREFUQSA9IG51bGwsXHJcbiAgU0VUVElOR1MgPSB7XHJcbiAgICBtYXRjaDoge1xyXG4gICAgICBzd2l0Y2g6IFwidGFiLXN3aXRjaFwiLFxyXG4gICAgICBmaWVsZDogXCJ0YWItZmllbGRcIixcclxuICAgICAgY29udGVudDogXCJ0YWItY29udGVudFwiLFxyXG4gICAgfSxcclxuICB9O1xyXG5cclxuICB2YXJcclxuICBzdGFydCA9ICgpID0+IHtcclxuICAgIFxyXG4gICAgJC5leHRlbmQoIFNFVFRJTkdTLCBkYXRhLlNFVFRJTkdTICk7XHJcblxyXG4gICAgcmVmcmVzaCgpO1xyXG4gIH07XHJcblxyXG4gIHZhclxyXG4gIHJlZnJlc2ggPSAoKSA9PiB7XHJcblxyXG4gICAgaWYgKCRFTEVNRU5UUy5saW5rcy5sZW5ndGgpIHtcclxuICAgICAgJEVMRU1FTlRTLmxpbmtzLm9mZihcImNsaWNrXCIsIGNoYW5nZVRhYik7XHJcbiAgICB9XHJcblxyXG4gICAgJEVMRU1FTlRTLmZpZWxkcyA9ICQoYC4ke1NFVFRJTkdTLm1hdGNoLmZpZWxkfWApO1xyXG5cclxuICAgIGZpbGxEYXRhYmFzZSgpO1xyXG5cclxuICAgIGlmICgkRUxFTUVOVFMubGlua3MubGVuZ3RoKSB7XHJcbiAgICAgICRFTEVNRU5UUy5saW5rcy5vbihcImNsaWNrXCIsIGNoYW5nZVRhYik7XHJcbiAgICB9XHJcblxyXG4gICAgLyogdGVzdC1jb2RlICovXHJcbiAgICBERUJVRy5jb25zb2xlLmFkZChgdGFicyA6IHJlZnJlc2gge2xlbmd0aCAkeyRFTEVNRU5UUy5maWVsZHMubGVuZ3RofX1gKTtcclxuICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuXHJcbiAgfTtcclxuXHJcbiAgdmFyXHJcbiAgZmlsbERhdGFiYXNlID0gKCkgPT4ge1xyXG5cclxuICAgIERBVEEgPSB7fTtcclxuXHJcbiAgICAkRUxFTUVOVFMuZmllbGRzLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XHJcbiAgICAgIFxyXG4gICAgICB2YXJcclxuICAgICAgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICBmaWVsZCA9ICR0aGlzLmF0dHIoXCJkYXRhLXRhYnMtZmllbGRcIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICBEQVRBW2ZpZWxkXSA9IHtcclxuICAgICAgICBzd2l0Y2hBY3RpdmU6IG51bGwsXHJcbiAgICAgICAgY29udGVudEFjdGl2ZTogbnVsbCxcclxuICAgICAgfTtcclxuICAgICAgXHJcbiAgICB9KTtcclxuXHJcbiAgfTtcclxuXHJcbiAgdmFyXHJcbiAgY2hhbmdlVGFiID0gKCkgPT4ge1xyXG5cclxuXHJcblxyXG4gIH07XHJcblxyXG4gIFxyXG4gICAgLy8gLy8gRnVuY3Rpb24gZm9yIGNsaWNrZWQgZWxlbWVudHNcclxuICAgIC8vIG9uQ2xpY2s6IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gICB2YXIgc2VsZiA9IE1haW4udGFicztcclxuICAgICAgXHJcbiAgICAvLyAgIHZhciAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAvLyAgICAgICBkYXRhVGFicyA9ICR0aGlzLmF0dHIoJ2RhdGEtdGFicycpLFxyXG4gICAgLy8gICAgICAgZGF0YVRhYnNTdGVwID0gJHRoaXMuYXR0cignZGF0YS10YWJzLXN0ZXAnKTtcclxuICBcclxuICAgIC8vICAgaWYgKHNlbGYuZGF0YVtkYXRhVGFic10uYWN0aXZlICE9PSBkYXRhVGFic1N0ZXApIHtcclxuICBcclxuICAgIC8vICAgICB2YXIgZGF0YSA9IHNlbGYuZGF0YVtkYXRhVGFic10sXHJcbiAgICAvLyAgICAgICAgIGNvbnRlbnRIZWlnaHQgPSBkYXRhLiRhY3RpdmVDb250ZW50Lm91dGVySGVpZ2h0KCB0cnVlICk7XHJcbiAgXHJcbiAgICAvLyAgICAgaWYgKCFkYXRhLmJsb2NrKSB7XHJcbiAgICAvLyAgICAgICBkYXRhLmJsb2NrID0gdHJ1ZTtcclxuICBcclxuICAgIC8vICAgICAgIHZhciAkY2xpY2tlZFRhYiA9IGRhdGEuJGl0ZW1zLmVxKGRhdGFUYWJzU3RlcCk7XHJcbiAgICBcclxuICAgIC8vICAgICAgICRjbGlja2VkVGFiLmFkZENsYXNzKFwianNfdGFicy0tYWN0aXZlXCIpO1xyXG4gIFxyXG4gICAgLy8gICAgICAgZGF0YS4kYWN0aXZlQ29udGVudC5jc3Moe2hlaWdodDogY29udGVudEhlaWdodH0pO1xyXG4gICAgLy8gICAgICAgZGF0YS4kY29udGVudC5jc3Moe2hlaWdodDogY29udGVudEhlaWdodH0pO1xyXG4gICAgLy8gICAgICAgZGF0YS4kYWN0aXZlQ29udGVudC5yZW1vdmVDbGFzcyhcImpzX3RhYnMtLWFjdGl2ZVwiKTtcclxuICAgIFxyXG4gICAgLy8gICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICBcclxuICAgIC8vICAgICAgICAgZGF0YS4kYWN0aXZlQ29udGVudC5jc3MoJ2hlaWdodCcsICcnKTtcclxuICAgIC8vICAgICAgICAgZGF0YS4kYWN0aXZlVGFiLnJlbW92ZUNsYXNzKFwianNfdGFicy0tYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICBcclxuICAgIC8vICAgICAgICAgICBkYXRhLiRhY3RpdmVDb250ZW50ID0gZGF0YS4kY29udGVudEl0ZW1zLmVxKGRhdGFUYWJzU3RlcCk7XHJcbiAgICAvLyAgICAgICAgICAgZGF0YS4kYWN0aXZlVGFiID0gJGNsaWNrZWRUYWI7XHJcbiAgICBcclxuICAgIC8vICAgICAgICAgICBjb250ZW50SGVpZ2h0ID0gZGF0YS4kYWN0aXZlQ29udGVudC5jaGlsZHJlbigpLm91dGVySGVpZ2h0KCB0cnVlICk7XHJcbiAgICAvLyAgICAgICAgICAgZGF0YS4kY29udGVudC5jc3Moe2hlaWdodDogY29udGVudEhlaWdodH0pO1xyXG4gICAgLy8gICAgICAgICAgIGRhdGEuJGFjdGl2ZUNvbnRlbnQuY3NzKHtoZWlnaHQ6IGNvbnRlbnRIZWlnaHR9KTtcclxuICAgIFxyXG4gICAgLy8gICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgXHJcbiAgICAvLyAgICAgICAgICAgICBkYXRhLiRhY3RpdmVDb250ZW50LmFkZENsYXNzKFwianNfdGFicy0tYWN0aXZlXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgZGF0YS4kYWN0aXZlQ29udGVudC5jc3MoJ2hlaWdodCcsICcnKTtcclxuICAgIC8vICAgICAgICAgICAgIGRhdGEuJGNvbnRlbnQuY3NzKCdoZWlnaHQnLCAnJyk7XHJcbiAgICBcclxuICAgIC8vICAgICAgICAgICAgIGRhdGEuYmxvY2sgPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgIC8vICAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICBcclxuICAgIC8vICAgICAgICAgfSwgMjAwKTtcclxuICAgIFxyXG4gICAgLy8gICAgICAgfSwgMSk7XHJcbiAgXHJcbiAgICAvLyAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgIC8vICAgICAgIGxldCBuYW1lID0gJ1RhYnMgJyArIGRhdGFUYWJzICsgJyBhY3RpdmUnO1xyXG4gICAgLy8gICAgICAgbGV0IGRlYnVnT2JqZWN0ID0ge307XHJcbiAgICAvLyAgICAgICBkZWJ1Z09iamVjdFtuYW1lXSA9IGRhdGFUYWJzU3RlcDtcclxuICAgIC8vICAgICAgIE1haW4uZGVidWdWYXJpYWJsZXMuYWRkKGRlYnVnT2JqZWN0KTtcclxuICAgIC8vICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICBcclxuICAgIC8vICAgICB9IFxyXG4gICAgLy8gICAgIGRhdGEuYWN0aXZlID0gZGF0YVRhYnNTdGVwO1xyXG4gICAgLy8gICB9XHJcbiAgXHJcbiAgICAvLyAgIHJldHVybiBmYWxzZTtcclxuICAgIC8vIH0sXHJcbiAgXHJcbiAgICAvLyBhZGQoZGF0YVRhYnMsIHNldHRpbmdzID0gbnVsbCkge1xyXG5cclxuICAgIC8vICAgdmFyIHNlbGYgPSBNYWluLnRhYnM7XHJcbiAgXHJcbiAgICAvLyAgIHZhciAkaXRlbXMgPSAkKCdbZGF0YS10YWJzPVwiJysgZGF0YVRhYnMgKydcIl0nKTtcclxuICBcclxuICAgIC8vICAgaWYgKCRpdGVtcy5sZW5ndGgpIHtcclxuICBcclxuICAgIC8vICAgICB2YXIgJGNvbnRlbnQgPSAkKCdbZGF0YS10YWJzLWNvbnRlbnQ9XCInKyBkYXRhVGFicyArJ1wiXScpLFxyXG4gICAgLy8gICAgICAgICBvdXRwdXQgPSB7fTtcclxuICBcclxuICAgIC8vICAgICBvdXRwdXQgPSB7fTtcclxuICAgIC8vICAgICBvdXRwdXQuJGl0ZW1zID0gJGl0ZW1zO1xyXG4gICAgLy8gICAgIG91dHB1dC4kY29udGVudCA9ICRjb250ZW50O1xyXG4gICAgLy8gICAgIG91dHB1dC4kY29udGVudEl0ZW1zID0gJGNvbnRlbnQuZmluZChcIltkYXRhLXRhYnMtY29udGVudC1zdGVwXVwiKTtcclxuICAgIC8vICAgICBvdXRwdXQuYmxvY2sgPSBmYWxzZTtcclxuICBcclxuICAgIC8vICAgICB2YXIgJGFjdGl2ZUNvbnRlbnQgPSAkY29udGVudC5maW5kKFwiLmpzX3RhYnMtLWFjdGl2ZVwiKTtcclxuICAgICAgICBcclxuICAgIC8vICAgICBpZiAoJGFjdGl2ZUNvbnRlbnQubGVuZ3RoKSB7XHJcbiAgICAvLyAgICAgICBvdXRwdXQuJGFjdGl2ZUNvbnRlbnQgPSAkYWN0aXZlQ29udGVudDtcclxuICAgIC8vICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgb3V0cHV0LiRhY3RpdmVDb250ZW50ID0gZmFsc2U7XHJcbiAgICAvLyAgICAgfVxyXG4gIFxyXG4gICAgLy8gICAgIHZhciAkYWN0aXZlVGFiID0gJGl0ZW1zLnBhcmVudCgpLmZpbmQoXCIuanNfdGFicy0tYWN0aXZlXCIpO1xyXG4gICAgICAgIFxyXG4gICAgLy8gICAgIGlmICgkYWN0aXZlVGFiLmxlbmd0aCkge1xyXG4gICAgLy8gICAgICAgb3V0cHV0LiRhY3RpdmVUYWIgPSAkYWN0aXZlVGFiO1xyXG4gICAgLy8gICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICBvdXRwdXQuJGFjdGl2ZVRhYiA9IGZhbHNlO1xyXG4gICAgLy8gICAgIH1cclxuICBcclxuICAgIC8vICAgICBzZWxmLmRhdGFbZGF0YVRhYnNdID0gb3V0cHV0O1xyXG4gIFxyXG4gICAgLy8gICAgICRpdGVtcy5vbihcImNsaWNrXCIsIHNlbGYub25DbGljayk7XHJcbiAgXHJcbiAgICAvLyAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAvLyAgICAgaWYgKCh0eXBlb2Ygb3V0cHV0LiRhY3RpdmVUYWIgPT09ICdvYmplY3QnKSArICh0eXBlb2Ygb3V0cHV0LiRhY3RpdmVDb250ZW50ID09PSAnb2JqZWN0JykgPT09IDIpIHtcclxuICAgIC8vICAgICAgIGxldCBuYW1lID0gXCJUYWJzIFwiICsgZGF0YVRhYnMgKyBcIiBhY3RpdmVcIjtcclxuICAgIC8vICAgICAgIGxldCBkZWJ1Z09iamVjdCA9IHt9O1xyXG4gICAgLy8gICAgICAgZGVidWdPYmplY3RbbmFtZV0gPSBvdXRwdXQuJGFjdGl2ZVRhYi5hdHRyKFwiZGF0YS10YWJzLXN0ZXBcIik7XHJcbiAgICAvLyAgICAgICBNYWluLmRlYnVnVmFyaWFibGVzLmFkZChkZWJ1Z09iamVjdCk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIE1haW4uZGVidWdDb25zb2xlLmFkZChcIkFkZCB0YWJzICdcIiArIGRhdGFUYWJzICsgXCInIHtsZW5ndGg6IFwiKyAkaXRlbXMubGVuZ3RoICtcIjt9XCIpO1xyXG4gICAgLy8gICAgIGlmICgkaXRlbXMubGVuZ3RoICE9PSBvdXRwdXQuJGNvbnRlbnRJdGVtcy5sZW5ndGgpIHtcclxuICAgIC8vICAgICAgIE1haW4uZGVidWdDb25zb2xlLmFkZChcIlRhYnMgJ1wiICsgZGF0YVRhYnMgKyBcIicgLSBsZW5ndGggZG8gbm90IG1hdGNoIHt0YWJzOiBcIiArICRpdGVtcy5sZW5ndGggKyBcIjsgY29udGVudHM6IFwiICsgb3V0cHV0LiRjb250ZW50SXRlbXMubGVuZ3RoICsgXCI7fVwiLCBcIndhcm5pbmdcIik7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIGlmICgodHlwZW9mIG91dHB1dC4kYWN0aXZlVGFiID09PSAnb2JqZWN0JykgKyAodHlwZW9mIG91dHB1dC4kYWN0aXZlQ29udGVudCA9PT0gJ29iamVjdCcpID09PSAxKSB7XHJcbiAgICAvLyAgICAgICBNYWluLmRlYnVnQ29uc29sZS5hZGQoXCJUYWJzICdcIiArIGRhdGFUYWJzICsgXCInIC0gYWN0aXZlIGNsYXNzIGRvIG5vdCBtYXRjaCB7YWN0aXZlVGFiOiBcIiArIG91dHB1dC4kYWN0aXZlVGFiICsgXCI7ICRhY3RpdmVDb250ZW50OiBcIiArIG91dHB1dC4kYWN0aXZlQ29udGVudCArIFwiO31cIiwgXCJ3YXJuaW5nXCIpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgXHJcbiAgICAvLyAgIH1cclxuICBcclxuICAgIC8vIH1cclxuXHJcbiAgICBzdGFydCgpO1xyXG5cclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IChkYXRhKSA9PiB7XHJcblxyXG4gICAgdmFyXHJcbiAgICBEQVRBID0gW10sICAgICAgLyogT3BlbmVkICh0cmFuc2l0aW9uZWQgb24pIGpRdWVyeSBlbGVtZW50cyAqL1xyXG4gICAgQlJPV1NFUjsgICAgICAgIC8qIGJyb3dzZXIuanMgZGF0YSAqL1xyXG5cclxuICAgIHZhclxyXG4gICAgc3RhcnQgPSAoKSA9PiB7XHJcbiAgICAgICAgQlJPV1NFUiA9IGRhdGEuQlJPV1NFUjtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUb2dnbGUgdHJhbnNpdGlvbiBoZWlnaHRcclxuICAgICAqL1xyXG4gICAgdmFyXHJcbiAgICB0b2dnbGUgPSAob3B0aW9ucykgPT4ge1xyXG5cclxuICAgICAgICBsZXRcclxuICAgICAgICBhY3RpdmUgPSBudWxsO1xyXG5cclxuICAgICAgICAkLmVhY2goREFUQSwgZnVuY3Rpb24gKGluZGV4SW5BcnJheSwgdmFsdWVPZkVsZW1lbnQpIHsgXHJcbiAgICAgICAgICAgICBpZiAoIG9wdGlvbnMuJGNsaWNrZWQuaXModmFsdWVPZkVsZW1lbnQpICkge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlID0gdmFsdWVPZkVsZW1lbnQ7ICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAgICAgICAgIFxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIERBVEEuc3BsaWNlKCBvcHRpb25zLiRjbGlja2VkLCAxICk7ICAgICBcclxuICAgICAgICAgICAgb2ZmKG9wdGlvbnMpOyAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIERBVEEucHVzaCggb3B0aW9ucy4kY2xpY2tlZCApOyAgIFxyXG4gICAgICAgICAgICBvbihvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSB0cmFuc2l0aW9uXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBcclxuICAgICAqICR0aGlzIHtqUXVlcnkgb2JqZWN0fSBcclxuICAgICAqIHRpbWUge051bWJlcn1cclxuICAgICAqIGNhbGxiYWNrIHtGdW5jdGlvbn0gXHJcbiAgICAgKi9cclxuICAgIHZhclxyXG4gICAgb24gPSAocGFyYW0pID0+IHtcclxuICAgICAgICB2YXJcclxuICAgICAgICAkY2hpbGQsIGhlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKHBhcmFtLiRjb250YWluZXIpIHtcclxuICAgICAgICAgICAgaGVpZ2h0ID0gcGFyYW0uJGNvbnRhaW5lci5jaGlsZHJlbigpLm91dGVySGVpZ2h0KHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRjaGlsZCA9IHBhcmFtLiR0aGlzLmNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIGhlaWdodCA9ICRjaGlsZC5vdXRlckhlaWdodCh0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKGBDbGlja2VkIFwiU2hvdyBtb3JlXCIgb24geyRjb250YWluZXIgJHtoZWlnaHR9fWAsIFwiY2xpY2tcIik7XHJcbiAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgICAgICBwYXJhbS4kY2xpY2tlZFxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoXCJqc19leHBhbmRfX2xpbmstLWFjdGl2ZVwiKTtcclxuXHJcbiAgICAgICAgcGFyYW0uJGNvbnRhaW5lclxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoXCJqc190cmFuc2l0aW9uSGVpZ2h0XCIpXHJcbiAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsIGhlaWdodClcclxuICAgICAgICAgICAgLm9uZShCUk9XU0VSLnRyYW5zaXRpb25FdmVudCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBwYXJhbS4kY29udGFpbmVyXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwianNfdHJhbnNpdGlvbkhlaWdodFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhcImpzX2V4cGFuZF9fY29udGFpbmVyLS1hY3RpdmVcIilcclxuICAgICAgICAgICAgICAgICAgICAuY3NzKCdoZWlnaHQnLCAnJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKHBhcmFtLmNhbGxiYWNrKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXJcclxuICAgIG9mZiA9IChwYXJhbSkgPT4ge1xyXG5cclxuICAgICAgICB2YXJcclxuICAgICAgICBoZWlnaHQgPSBwYXJhbS4kY29udGFpbmVyLm91dGVySGVpZ2h0KHRydWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKGBDbGlja2VkIFwiU2hvdyBtb3JlXCIgb2ZmYCwgXCJjbGlja1wiKTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgICAgIHBhcmFtLiRjbGlja2VkXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcImpzX2V4cGFuZF9fbGluay0tYWN0aXZlXCIpO1xyXG4gICAgICAgXHJcbiAgICAgICAgcGFyYW0uJGNvbnRhaW5lclxyXG4gICAgICAgICAgICAuY3NzKCdoZWlnaHQnLCBoZWlnaHQpXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcImpzX2V4cGFuZF9fY29udGFpbmVyLS1hY3RpdmVcIilcclxuICAgICAgICAgICAgLmFkZENsYXNzKFwianNfdHJhbnNpdGlvbkhlaWdodFwiKVxyXG4gICAgICAgICAgICAuY3NzKCdoZWlnaHQnLCAnJylcclxuICAgICAgICAgICAgLm9uZShCUk9XU0VSLnRyYW5zaXRpb25FdmVudCwgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIHBhcmFtLiRjb250YWluZXJcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJqc19leHBhbmRfX2NvbnRhaW5lci0tY2xvc2UganNfdHJhbnNpdGlvbkhlaWdodFwiKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbS5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIChwYXJhbS5jYWxsYmFjaygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBzdGFydChkYXRhKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHRvZ2dsZTogdG9nZ2xlLFxyXG4gICAgICAgIG9uOiBvbixcclxuICAgICAgICBvZmY6IG9mZixcclxuICAgIH07XHJcblxyXG59O1xyXG4iXX0=
