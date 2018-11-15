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

    var DEVICE = require('./frontbox/data/device')({
        ELEMENTS: ELEMENTS,
        RESIZE: RESIZE,
        BREAKPOINTS: BREAKPOINTS,
    });

    /* Resize */
    var RESIZE = require('./frontbox/bind/resize')({
        ELEMENTS: ELEMENTS,
        DEVICE: DEVICE,
        template: {
            loading: false,
            // loading: `<div class="animation-donut-spinner"></div>`,
        },
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
    resizeActive = false,
    resizeTime = 0,
    queue = {};

    var
    ACTIVE = {
        appendTemplateLoading: false,
        loading: false,
    };

    var
    TIME = {
        resize: 400,
    };

    var
    ELEMENTS,
    TEMPLATE = {
        loading: null,
    };

    var
    start = () => {
        ELEMENTS = data.ELEMENTS;
        TEMPLATE.loading = data.template.loading;
        
        bind();
    };

    var
    trigger = () => {
        resizeActive = true;
        resizeTime += 250;
        
        resize();
    };

    var
    resize = () => {

        /* Append loading template */
        if ( !ACTIVE.appendTemplateLoading && TEMPLATE.loading ) {
            ELEMENTS.$body.append( `<div class="js_resizeLoading"><div class="js_resizeLoading__content">${TEMPLATE.loading}</div></div>` );
            ACTIVE.appendTemplateLoading = true;
        }

        window.setTimeout( () => {
            
            if (resizeActive) {
                
                if (resizeTime > TIME.resize) {
                    resizeTime = TIME.resize;
                }
                else {
                    resizeTime -= 50;
                }

                if (resizeTime > 0) {
                    if ( !ACTIVE.loading ) {
                        ACTIVE.loading = true;
                        if ( TEMPLATE.loading ) {
                            ELEMENTS.$body.addClass("js_resize");
                        }
                    }
                    resize();
                } 
                else {
                    if ( ACTIVE.loading ) {
                        ACTIVE.loading = false;
                        if ( TEMPLATE.loading) {
                            ELEMENTS.$body.removeClass("js_resize");
                        }
                    }
                    resizeTime = 0;
                    resizeActive = false;
                    run();
                }

                /* test-code */
                // DEBUG.variable.add({
                //     "Resize timeout": resizeTime,
                //     "Resize active ": resizeActive,
                // });
                /* end-test-code */
            }

        }, resizeTime);
    };

    var
    add = (name, item) => {
        queue[name] = [item];

        /* test-code */
        DEBUG.console.add(`resize: add ${name}`);
        /* end-test-code */
    };

    var
    remove = (name) => {
        delete queue[name];

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
    run = () => {
        $.each(queue, function(index, value) {
            (value[0])();
        }); 
    };

    var
    bind = () => {
        ELEMENTS.$window.on('resize orientationchange', trigger);

        /* test-code */
        DEBUG.console.add(`resize: bind`);
        /* end-test-code */
    };

    unbind = () => {
        ELEMENTS.$window.off('resize orientationchange', trigger);

        /* test-code */
        DEBUG.console.add(`resize: unbind`);
        /* end-test-code */
    };

    start();

    return {
        add: add,
        remove: remove,
        clean: clean,
        bind: bind,
        unbind: unbind,
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

        /* Check if user resize page */
        // RESIZE.add('device', () => {
        //     refresh();
        // }, 'width');
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
                // RESIZE.resize('width');
            }
            else {
                // RESIZE.resize();
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
        top                 : null,
        center              : null,
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
        DATA.centerLast = DATA.center;

        DATA.top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        DATA.center = DATA.top + DEVICE.heightHalf;

        DATA.speed = Math.abs(DATA.centerLast - DATA.center);

        if (DATA.center > DATA.centerLast) {
            DATA.direction = 0;
        } else {
            DATA.direction = 1;
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

    RESIZE.add("showMore", () => {
      refresh();
    });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL2Zyb250Ym94L2JpbmQvcmVzaXplLmpzIiwic3JjL2pzL2Zyb250Ym94L2RhdGEvYnJvd3Nlci5qcyIsInNyYy9qcy9mcm9udGJveC9kYXRhL2RldmljZS5qcyIsInNyYy9qcy9mcm9udGJveC9kYXRhL3Njcm9sbC5qcyIsInNyYy9qcy9mcm9udGJveC9kZWJ1Zy9jb25zb2xlLmpzIiwic3JjL2pzL2Zyb250Ym94L2RlYnVnL3ZhcmlhYmxlcy5qcyIsInNyYy9qcy9mcm9udGJveC9mdW5jdGlvbnMuanMiLCJzcmMvanMvZnJvbnRib3gvanF1ZXJ5L3Njcm9sbEJsb2NrLmpzIiwic3JjL2pzL2Zyb250Ym94L25hdmJhci9idXJnZXJNZW51LmpzIiwic3JjL2pzL2Zyb250Ym94L25hdmJhci9zdGlja3kuanMiLCJzcmMvanMvZnJvbnRib3gvc2Nyb2xsVG8uanMiLCJzcmMvanMvZnJvbnRib3gvc2hvd01vcmUuanMiLCJzcmMvanMvZnJvbnRib3gvdGFicy5qcyIsInNyYy9qcy9mcm9udGJveC90cmFuc2l0aW9uSGVpZ2h0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDM1FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL09BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyoqXHJcbiAqIExpYnNcclxuICovXHJcbi8vIGdsb2JhbC4kID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XHJcbi8vIGdsb2JhbC5qUXVlcnkgPSAkO1xyXG4vLyBnbG9iYWwuQ29va2llcyA9IHJlcXVpcmUoJ2pzLWNvb2tpZScpO1xyXG4vLyByZXF1aXJlKCdzbGljay1jYXJvdXNlbCcpO1xyXG4vLyByZXF1aXJlKCdzZWxlY3QyJykoKTtcclxuLy8gcmVxdWlyZSgnLi9mcm9udGJveC9saWJzL2dldFN0eWxlJyk7XHJcbi8vIHZhciBcclxuLy8gU2hhcmVyID0gcmVxdWlyZSgnc2xpY2stY2Fyb3VzZWwnKTsgLy8gaHR0cDovL2VsbGlzb25sZWFvLmdpdGh1Yi5pby9zaGFyZXIuanMvXHJcblxyXG4vKipcclxuICogalF1ZXJ5IHBsdWdpbnNcclxuICovXHJcbnJlcXVpcmUoJy4vZnJvbnRib3gvanF1ZXJ5L3Njcm9sbEJsb2NrJykoKTtcclxuXHJcbihmdW5jdGlvbigkLCBfKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbGVtZW50c1xyXG4gICAgICovXHJcbiAgICB2YXIgXHJcbiAgICBFTEVNRU5UUyA9IHtcclxuICAgICAgICAkYm9keTogJChcImJvZHlcIiksXHJcbiAgICAgICAgJGhlYWRlcjogJChcIiNoZWFkZXJcIiksXHJcbiAgICAgICAgJGhlYWRlclBsYWNlaG9sZGVyOiAkKFwiI2hlYWRlci1wbGFjZWhvbGRlclwiKSxcclxuICAgICAgICAkd2luZG93OiAkKHdpbmRvdyksXHJcbiAgICAgICAgJG92ZXJsYXk6ICQoXCIjcGFnZS1vdmVybGF5XCIpLFxyXG4gICAgICAgICRodG1sOiAkKCdodG1sJyksXHJcbiAgICAgICAgJHBhZ2U6ICQoJ2h0bWwsIGJvZHknKSxcclxuICAgIH07XHJcblxyXG4gICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAvKipcclxuICAgICAqIERlYnVnXHJcbiAgICAgKi9cclxuICAgIGdsb2JhbC5ERUJVRyA9IHt9O1xyXG5cclxuICAgIGdsb2JhbC5ERUJVRy5jb25zb2xlID0gcmVxdWlyZSgnLi9mcm9udGJveC9kZWJ1Zy9jb25zb2xlJykoe1xyXG4gICAgICAgIC8vIG9wZW46IHRydWUsXHJcbiAgICAgICAgRUxFTUVOVFM6IEVMRU1FTlRTLFxyXG4gICAgfSk7XHJcbiAgICBnbG9iYWwuREVCVUcudmFyaWFibGUgPSByZXF1aXJlKCcuL2Zyb250Ym94L2RlYnVnL3ZhcmlhYmxlcycpKHtcclxuICAgICAgICBPUFRJT05TOiB7XHJcbiAgICAgICAgICAgIG9wZW46IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBFTEVNRU5UUzogRUxFTUVOVFMsXHJcbiAgICB9KTtcclxuICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXF1aXJlZFxyXG4gICAgICovXHJcblxyXG4gICAgLyogQ1NTIFZhcmlhYmxlcyAqL1xyXG4gICAgY29uc3RcclxuICAgIHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCc6cm9vdCcpLFxyXG4gICAgQ1NTID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUocm9vdCksXHJcbiAgICBCUkVBS1BPSU5UUyA9IHtcclxuICAgICAgICBkZXNrdG9wOiBOdW1iZXIoQ1NTLmdldFByb3BlcnR5VmFsdWUoXCItLWRlc2t0b3BcIikpLFxyXG4gICAgICAgIHRhYmxldDogTnVtYmVyKENTUy5nZXRQcm9wZXJ0eVZhbHVlKFwiLS10YWJsZXRcIikpLFxyXG4gICAgICAgIGZhYmxldDogTnVtYmVyKENTUy5nZXRQcm9wZXJ0eVZhbHVlKFwiLS1mYWJsZXRcIikpLFxyXG4gICAgICAgIG1vYmlsZTogTnVtYmVyKENTUy5nZXRQcm9wZXJ0eVZhbHVlKFwiLS1tb2JpbGVcIikpLFxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgREVWSUNFID0gcmVxdWlyZSgnLi9mcm9udGJveC9kYXRhL2RldmljZScpKHtcclxuICAgICAgICBFTEVNRU5UUzogRUxFTUVOVFMsXHJcbiAgICAgICAgUkVTSVpFOiBSRVNJWkUsXHJcbiAgICAgICAgQlJFQUtQT0lOVFM6IEJSRUFLUE9JTlRTLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLyogUmVzaXplICovXHJcbiAgICB2YXIgUkVTSVpFID0gcmVxdWlyZSgnLi9mcm9udGJveC9iaW5kL3Jlc2l6ZScpKHtcclxuICAgICAgICBFTEVNRU5UUzogRUxFTUVOVFMsXHJcbiAgICAgICAgREVWSUNFOiBERVZJQ0UsXHJcbiAgICAgICAgdGVtcGxhdGU6IHtcclxuICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vIGxvYWRpbmc6IGA8ZGl2IGNsYXNzPVwiYW5pbWF0aW9uLWRvbnV0LXNwaW5uZXJcIj48L2Rpdj5gLFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgRlVOQ1RJT05TID0gcmVxdWlyZSgnLi9mcm9udGJveC9mdW5jdGlvbnMnKTtcclxuXHJcbiAgICB2YXIgQlJPV1NFUiA9IHJlcXVpcmUoJy4vZnJvbnRib3gvZGF0YS9icm93c2VyJykoKTtcclxuICAgIHZhciBTQ1JPTEwgPSByZXF1aXJlKCcuL2Zyb250Ym94L2RhdGEvc2Nyb2xsJykoe1xyXG4gICAgICAgIERFVklDRTogREVWSUNFXHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBBbmltYXRpb25zXHJcbiAgICAgKi9cclxuICAgIHZhciB0cmFuc2l0aW9uSGVpZ2h0ID0gcmVxdWlyZSgnLi9mcm9udGJveC90cmFuc2l0aW9uSGVpZ2h0Jykoe1xyXG4gICAgICAgIEJST1dTRVIgOiBCUk9XU0VSLFxyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNtb290aCBzY3JvbGwgdG8gdGFyZ2V0XHJcbiAgICAgKiBcclxuICAgICAqIUBwYXJhbSB7RUxFTUVOVFN9IEVMRU1FTlRTXHJcbiAgICAgKiFAcGFyYW0ge1NDUk9MTH0gU0NST0xMXHJcbiAgICAgKiFAcGFyYW0ge0ZVTkNUSU9OU30gRlVOQ1RJT05TXHJcbiAgICAgKi9cclxuICAgIHZhciBzY3JvbGxUbyA9IHJlcXVpcmUoJy4vZnJvbnRib3gvc2Nyb2xsVG8nKSh7XHJcbiAgICAgICAgRUxFTUVOVFM6IEVMRU1FTlRTLFxyXG4gICAgICAgIFNDUk9MTDogU0NST0xMLFxyXG4gICAgICAgIEZVTkNUSU9OUzogRlVOQ1RJT05TLFxyXG4gICAgICAgIFNFVFRJTkdTOiB7XHJcbiAgICAgICAgICAgIC8vIGFjdGl2ZSBhdXRvbWF0aWMgc2Nyb2xsIHBhZ2UgdG8gZWxlbWVudCB2aWEgVVJMIGhhc2hcclxuICAgICAgICAgICAgYXV0b1Njcm9sbDogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vIGRpdmlkZSBkaXN0YW5jZSBieSB0aGlzIHZhbHVlIHRvIGNhbGN1bGF0ZSB0aW1lIHNjcm9sbFxyXG4gICAgICAgICAgICB0aW1lOiAyLFxyXG4gICAgICAgICAgICAvLyBtaW4gdGltZSBzY3JvbGxcclxuICAgICAgICAgICAgbWluVGltZTogNDAwLFxyXG4gICAgICAgICAgICAvLyBtYXggdGltZSBzY3JvbGxcclxuICAgICAgICAgICAgbWF4VGltZTogMTIwMCxcclxuICAgICAgICAgICAgLy8gcnVuIGF1dG9TY3JvbGwgd2hlbiBoYXNoIGluIFVSTCBpcyBiZWdpbiB3aXRoIHRoaXMgc3RyaW5nXHJcbiAgICAgICAgICAgIHByZWZpeEF1dG9TY3JvbGw6ICdzY3JvbGwtJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgZml4ZWQgZWxlbWVudCB3aGVuIHBhZ2UgaXMgc2Nyb2xsXHJcbiAgICAgKiBcclxuICAgICAqIUBwYXJhbSB7RUxFTUVOVFN9IEVMRU1FTlRTXHJcbiAgICAgKiFAcGFyYW0ge0VMRU1FTlRTfSBTQ1JPTExcclxuICAgICAqIEBwYXJhbSB7bnVsbCwgbnVtYmVyfSBTRVRUSU5HUy5vZmZzZXQgd2hlbiBjcmVhdGUgc3RpY2t5IGVsZW1lbnRcclxuICAgICAqIG51bGwgLSBhdXRvbWF0aWMgXHJcbiAgICAgKiBudW1iZXIgLSBob3cgbWFueSBwaXhlbCB1c2VyIG1heSBzY3JvbGwgdG8gdHJpZ2dlciBzdGlja3kgICBcclxuICAgICAqIEBwYXJhbSB7Ym9vbH0gU0VUVElOR1MucGxhY2Vob2xkZXIgYWRkIGhlaWdodCB0byBwbGFjZWhvbGRlciB3aGVuIHRyaWdnZXIgc3RpY2t5XHJcbiAgICAgKiBzZXQgdHJ1ZSBvbmx5IGlmIEBoZWFkZXItYWx3YXlzLXN0aWNreSA9IGZhbHNlXHJcbiAgICAgKiBAcGFyYW0ge2pRdWVyeSBPYmplY3R9ICRlbGVtZW50U3B5IHN0aWNreSBlbGVtZW50IFxyXG4gICAgICovXHJcbiAgICByZXF1aXJlKCcuL2Zyb250Ym94L25hdmJhci9zdGlja3knKSh7XHJcbiAgICAgICAgRUxFTUVOVFM6IEVMRU1FTlRTLFxyXG4gICAgICAgIFNDUk9MTDogU0NST0xMLFxyXG4gICAgICAgIFNFVFRJTkdTOiB7XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiB0cnVlLFxyXG4gICAgICAgICAgICBvZmZzZXQ6IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJGVsZW1lbnRTcHk6ICQoXCIjc3RpY2t5LWVsZW1lbnRcIiksXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEJ1cmdlciBtZW51XHJcbiAgICAgKiBcclxuICAgICAqICFAcGFyYW0ge0VMRU1FTlRTfSBFTEVNRU5UU1xyXG4gICAgICogIUBwYXJhbSB7RlVOQ1RJT05TfSBGVU5DVElPTlNcclxuICAgICAqIEBwYXJhbSB7Qm9vbH0gT1BUSU9OUy5kcm9wZG93blxyXG4gICAgICogbWVudSBpdGVtcyBjYW4gYmUgZXhwYW5kXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2wsIE51bWJlcn0gT1BUSU9OUy5kcm9wZG93blJlc3BvbnNpdmVcclxuICAgICAqIGJyZWFrcG9pbnQgdG8gdHJpZ2dlciBpdGVtIGV4cGFuZFxyXG4gICAgICovXHJcbiAgICByZXF1aXJlKCcuL2Zyb250Ym94L25hdmJhci9idXJnZXJNZW51Jykoe1xyXG4gICAgICAgIEVMRU1FTlRTOiBFTEVNRU5UUyxcclxuICAgICAgICBGVU5DVElPTlM6IEZVTkNUSU9OUyxcclxuICAgICAgICBPUFRJT05TOiB7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICBkcm9wZG93blJlc3BvbnNpdmU6IDIsXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb29raWVzXHJcbiAgICAgKiBcclxuICAgICAqICFAcGFyYW0ge0VMRU1FTlRTfSBFTEVNRU5UU1xyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IE9QVElPTlMuaW1nU3JjIHBhdGNoIHRvIGltYWdlXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gT1BUSU9OUy5jb250ZW50IGNvbnRlbnQgdGV4dFxyXG4gICAgICovXHJcbiAgICAvLyByZXF1aXJlKCcuL2Zyb250Ym94L2Nvb2tpZXMnKSh7XHJcbiAgICAvLyAgICAgRUxFTUVOVFM6IEVMRU1FTlRTLFxyXG4gICAgLy8gICAgIE9QVElPTlM6IHtcclxuICAgIC8vICAgICAgICAgaW1nU3JjOiBgL2Fzc2V0cy9pbWFnZXMvY29va2llcy5wbmdgLFxyXG4gICAgLy8gICAgICAgICBjb250ZW50OiBgVyBuYXN6eW0gc2Vyd2lzaWUgd3lrb3J6eXN0dWplbXkgcGxpa2kgQ29va2llcy4gU8SFIG9uZSB6YXBpc3l3YW5lIG5hIGR5c2t1IHVyesSFZHplbmlhIGtvxYRjb3dlZ28gdcW8eXRrb3duaWthIHcgY2VsYWNoIHN0YXR5c3R5Y3pueWNoIG9yYXogdcWCYXR3aWVuaWEga29yenlzdGFuaWEgeiBzZXJ3aXN1LiBVc3Rhd2llbmlhIHRlIHphd3N6ZSBtb8W8bmEgem1pZW5pxIcuIFN6Y3plZ8OzxYJvd2UgaW5mb3JtYWNqZSBvIHBsaWthY2ggQ29va2llcyB6bmFqZHVqxIUgc2nEmSB3IDxhIGhyZWY9XCIjXCIgdGFyZ2V0PVwiX2JsYW5rXCI+UG9saXR5Y2UgUHJ5d2F0bm/Fm2NpPC9hPmAsXHJcbiAgICAvLyAgICAgfSxcclxuICAgIC8vIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGFic1xyXG4gICAgICogXHJcbiAgICAgKiAhQHBhcmFtIHtFTEVNRU5UU30gRUxFTUVOVFNcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBPUFRJT05TLmltZ1NyYyBwYXRjaCB0byBpbWFnZVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IE9QVElPTlMuY29udGVudCBjb250ZW50IHRleHRcclxuICAgICAqL1xyXG4gICAgcmVxdWlyZSgnLi9mcm9udGJveC90YWJzJykoe1xyXG4gICAgICAgIEVMRU1FTlRTOiBFTEVNRU5UUyxcclxuICAgICAgICBPUFRJT05TOiB7XHJcbiAgICAgICAgICAgIGltZ1NyYzogYC9hc3NldHMvaW1hZ2VzL2Nvb2tpZXMucG5nYCxcclxuICAgICAgICAgICAgY29udGVudDogYFcgbmFzenltIHNlcndpc2llIHd5a29yenlzdHVqZW15IHBsaWtpIENvb2tpZXMuIFPEhSBvbmUgemFwaXN5d2FuZSBuYSBkeXNrdSB1cnrEhWR6ZW5pYSBrb8WEY293ZWdvIHXFvHl0a293bmlrYSB3IGNlbGFjaCBzdGF0eXN0eWN6bnljaCBvcmF6IHXFgmF0d2llbmlhIGtvcnp5c3RhbmlhIHogc2Vyd2lzdS4gVXN0YXdpZW5pYSB0ZSB6YXdzemUgbW/FvG5hIHptaWVuacSHLiBTemN6ZWfDs8WCb3dlIGluZm9ybWFjamUgbyBwbGlrYWNoIENvb2tpZXMgem5hamR1asSFIHNpxJkgdyA8YSBocmVmPVwiI1wiIHRhcmdldD1cIl9ibGFua1wiPlBvbGl0eWNlIFByeXdhdG5vxZtjaTwvYT5gLFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3cgbW9yZSBjb250ZW50XHJcbiAgICAgKiBcclxuICAgICAqICFAcGFyYW0ge1RSQU5TSVRJT05IRUlHSFR9IHRyYW5zaXRpb25IZWlnaHRcclxuICAgICAqL1xyXG4gICAgcmVxdWlyZSgnLi9mcm9udGJveC9zaG93TW9yZScpKHtcclxuICAgICAgICBUUkFOU0lUSU9OSEVJR0hUOiB0cmFuc2l0aW9uSGVpZ2h0LFxyXG4gICAgICAgIFJFU0laRTogUkVTSVpFLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHb29nbGUgTWFwcyBBUElcclxuICAgICAqIFxyXG4gICAgICogIUBwYXJhbSB7RlVOQ1RJT05TfSBGVU5DVElPTlNcclxuICAgICAqICFAcGFyYW0ge1NDUk9MTH0gU0NST0xMXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gT1BUSU9OUy5jZW50ZXIgcGF0Y2ggdG8gaW1hZ2VcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBPUFRJT05TLmNvbnRlbnQgY29udGVudCB0ZXh0XHJcbiAgICAgKi9cclxuICAgIC8vIHZhciBnb29nbGVNYXBzID0gcmVxdWlyZSgnLi9nb29nbGVNYXBzJykoe1xyXG4gICAgLy8gICAgIEZVTkNUSU9OUzogRlVOQ1RJT05TLFxyXG4gICAgLy8gICAgIFNDUk9MTDogU0NST0xMLFxyXG4gICAgLy8gICAgIE9QVElPTlM6IHtcclxuICAgIC8vICAgICAgICAgLy8gRmlyc3QgcG9zaXRpb25cclxuICAgIC8vICAgICAgICAgY2VudGVyOiB7XHJcbiAgICAvLyAgICAgICAgICAgICBsYXQ6IDUxLjkxOTQzNyxcclxuICAgIC8vICAgICAgICAgICAgIGxuZzogMTkuMTQ1MTM2LFxyXG4gICAgLy8gICAgICAgICB9LFxyXG4gICAgLy8gICAgICAgICBtYXBJRDogXCJtYXBcIixcclxuICAgIC8vICAgICAgICAgem9vbTogNS44LFxyXG4gICAgLy8gICAgICAgICBkaXNhYmxlRGVmYXVsdFVJOiB0cnVlLFxyXG4gICAgLy8gICAgICAgICBzdHJlZXRWaWV3Q29udHJvbDogZmFsc2UsXHJcbiAgICAvLyAgICAgICAgIGRyYWdnYWJsZTogZmFsc2UsXHJcbiAgICAvLyAgICAgICAgIHNjYWxlQ29udHJvbDogZmFsc2UsXHJcbiAgICAvLyAgICAgICAgIHNjcm9sbHdoZWVsOiBmYWxzZSxcclxuICAgIC8vICAgICAgICAgc3R5bGVzOiByZXF1aXJlKCcuL2dvb2dsZU1hcHNTdHlsZScpLFxyXG4gICAgLy8gICAgICAgICBtYXJrZXJTaXplOiBbMjEsIDM0XSxcclxuICAgIC8vICAgICB9LFxyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWxlY3QyXHJcbiAgICAgKi9cclxuICAgIC8vIHZhciAkc2VsZWN0MiA9ICQoXCIuc2VsZWN0MlwiKTtcclxuICAgIC8vIGlmICgkc2VsZWN0Mi5sZW5ndGgpIHtcclxuICAgIC8vICAgICRzZWxlY3QyLnNlbGVjdDIoe1xyXG4gICAgLy8gICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMSxcclxuICAgIC8vICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgdmFyXHJcbiAgICAkaWZyYW1lID0gJChcIltkYXRhLWlmcmFtZV1cIik7XHJcbiAgICAkaWZyYW1lLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XHJcbiAgICAgICAgdmFyIFxyXG4gICAgICAgICR0aGlzID0gJCh0aGlzKSxcclxuICAgICAgICBmaW5kID0gJHRoaXMuYXR0cihcImRhdGEtaWZyYW1lXCIpLFxyXG4gICAgICAgICRjb250ZW50ID0gJChgW2RhdGEtaWZyYW1lLWNvbnRlbnQ9XCIke2ZpbmR9XCJdYCk7XHJcblxyXG4gICAgICAgICR0aGlzLmNvbnRlbnRzKCkuZmluZChcImJvZHlcIikuYXBwZW5kKCAnPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCIvY3NzL3N0eWxlLmRldi5jc3NcIj4nICk7XHJcbiAgICAgICAgJHRoaXMuY29udGVudHMoKS5maW5kKFwiYm9keVwiKS5hcHBlbmQoICc8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTFcIj4nICk7XHJcbiAgICAgICAgJHRoaXMuY29udGVudHMoKS5maW5kKFwiYm9keVwiKS5hcHBlbmQoICc8c3R5bGU+IGJvZHksaHRtbCB7IHBhZGRpbmc6IDAhaW1wb3J0YW50OyBtYXJnaW46IDAhaW1wb3J0YW50OyBwb3NpdGlvbjogc3RhdGljIWltcG9ydGFudDsgaGVpZ2h0OiBhdXRvIWltcG9ydGFudDsgbWluLWhlaWdodDogYXV0byFpbXBvcnRhbnQ7IH0gPC9zdHlsZT4nICk7XHJcbiAgICAgICAgJHRoaXMuY29udGVudHMoKS5maW5kKFwiYm9keVwiKS5hcHBlbmQoICRjb250ZW50ICk7XHJcbiAgICB9KTtcclxuICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuXHJcbiAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgIERFQlVHLmNvbnNvbGUuYWRkKFwiUnVubmluZyBjb3JyZWN0Li4uXCIpO1xyXG4gICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgIC8vIEluZm9ybSBzdHlsZXNoZWVkIHRvIHJlbW92ZSBzdHlsZSBmYWxsYmFjayBmb3IgSmF2YVNjcmlwdCBlbGVtZW50c1xyXG4gICAgRUxFTUVOVFMuJGh0bWwucmVtb3ZlQ2xhc3MoXCJub19qc1wiKTtcclxuXHJcbn0pKCQsIHdpbmRvdyk7IiwiLyoqXHJcbiAqIFJlc2l6ZVxyXG4gKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gKGRhdGEpID0+IHtcclxuXHJcbiAgICB2YXJcclxuICAgIHJlc2l6ZUFjdGl2ZSA9IGZhbHNlLFxyXG4gICAgcmVzaXplVGltZSA9IDAsXHJcbiAgICBxdWV1ZSA9IHt9O1xyXG5cclxuICAgIHZhclxyXG4gICAgQUNUSVZFID0ge1xyXG4gICAgICAgIGFwcGVuZFRlbXBsYXRlTG9hZGluZzogZmFsc2UsXHJcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICB9O1xyXG5cclxuICAgIHZhclxyXG4gICAgVElNRSA9IHtcclxuICAgICAgICByZXNpemU6IDQwMCxcclxuICAgIH07XHJcblxyXG4gICAgdmFyXHJcbiAgICBFTEVNRU5UUyxcclxuICAgIFRFTVBMQVRFID0ge1xyXG4gICAgICAgIGxvYWRpbmc6IG51bGwsXHJcbiAgICB9O1xyXG5cclxuICAgIHZhclxyXG4gICAgc3RhcnQgPSAoKSA9PiB7XHJcbiAgICAgICAgRUxFTUVOVFMgPSBkYXRhLkVMRU1FTlRTO1xyXG4gICAgICAgIFRFTVBMQVRFLmxvYWRpbmcgPSBkYXRhLnRlbXBsYXRlLmxvYWRpbmc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgYmluZCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXJcclxuICAgIHRyaWdnZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgcmVzaXplQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICByZXNpemVUaW1lICs9IDI1MDtcclxuICAgICAgICBcclxuICAgICAgICByZXNpemUoKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyXHJcbiAgICByZXNpemUgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIC8qIEFwcGVuZCBsb2FkaW5nIHRlbXBsYXRlICovXHJcbiAgICAgICAgaWYgKCAhQUNUSVZFLmFwcGVuZFRlbXBsYXRlTG9hZGluZyAmJiBURU1QTEFURS5sb2FkaW5nICkge1xyXG4gICAgICAgICAgICBFTEVNRU5UUy4kYm9keS5hcHBlbmQoIGA8ZGl2IGNsYXNzPVwianNfcmVzaXplTG9hZGluZ1wiPjxkaXYgY2xhc3M9XCJqc19yZXNpemVMb2FkaW5nX19jb250ZW50XCI+JHtURU1QTEFURS5sb2FkaW5nfTwvZGl2PjwvZGl2PmAgKTtcclxuICAgICAgICAgICAgQUNUSVZFLmFwcGVuZFRlbXBsYXRlTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCggKCkgPT4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHJlc2l6ZUFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzaXplVGltZSA+IFRJTUUucmVzaXplKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzaXplVGltZSA9IFRJTUUucmVzaXplO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzaXplVGltZSAtPSA1MDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzaXplVGltZSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoICFBQ1RJVkUubG9hZGluZyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQUNUSVZFLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIFRFTVBMQVRFLmxvYWRpbmcgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFTEVNRU5UUy4kYm9keS5hZGRDbGFzcyhcImpzX3Jlc2l6ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXNpemUoKTtcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIEFDVElWRS5sb2FkaW5nICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBQ1RJVkUubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIFRFTVBMQVRFLmxvYWRpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVMRU1FTlRTLiRib2R5LnJlbW92ZUNsYXNzKFwianNfcmVzaXplXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZVRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZUFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgICAgICAgICAgLy8gREVCVUcudmFyaWFibGUuYWRkKHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBcIlJlc2l6ZSB0aW1lb3V0XCI6IHJlc2l6ZVRpbWUsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgXCJSZXNpemUgYWN0aXZlIFwiOiByZXNpemVBY3RpdmUsXHJcbiAgICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LCByZXNpemVUaW1lKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyXHJcbiAgICBhZGQgPSAobmFtZSwgaXRlbSkgPT4ge1xyXG4gICAgICAgIHF1ZXVlW25hbWVdID0gW2l0ZW1dO1xyXG5cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICBERUJVRy5jb25zb2xlLmFkZChgcmVzaXplOiBhZGQgJHtuYW1lfWApO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgIH07XHJcblxyXG4gICAgdmFyXHJcbiAgICByZW1vdmUgPSAobmFtZSkgPT4ge1xyXG4gICAgICAgIGRlbGV0ZSBxdWV1ZVtuYW1lXTtcclxuXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgREVCVUcuY29uc29sZS5hZGQoYHJlc2l6ZTogcmVtb3ZlICR7bmFtZX1gKTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICB9O1xyXG5cclxuICAgIHZhclxyXG4gICAgY2xlYW4gPSAoKSA9PiB7XHJcbiAgICAgICAgcXVldWUgPSB7fTtcclxuXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgREVCVUcuY29uc29sZS5hZGQoYHJlc2l6ZTogY2xlYW4gcXVldWVgKTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICB9O1xyXG5cclxuICAgIHZhclxyXG4gICAgcnVuID0gKCkgPT4ge1xyXG4gICAgICAgICQuZWFjaChxdWV1ZSwgZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICh2YWx1ZVswXSkoKTtcclxuICAgICAgICB9KTsgXHJcbiAgICB9O1xyXG5cclxuICAgIHZhclxyXG4gICAgYmluZCA9ICgpID0+IHtcclxuICAgICAgICBFTEVNRU5UUy4kd2luZG93Lm9uKCdyZXNpemUgb3JpZW50YXRpb25jaGFuZ2UnLCB0cmlnZ2VyKTtcclxuXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgREVCVUcuY29uc29sZS5hZGQoYHJlc2l6ZTogYmluZGApO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgIH07XHJcblxyXG4gICAgdW5iaW5kID0gKCkgPT4ge1xyXG4gICAgICAgIEVMRU1FTlRTLiR3aW5kb3cub2ZmKCdyZXNpemUgb3JpZW50YXRpb25jaGFuZ2UnLCB0cmlnZ2VyKTtcclxuXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgREVCVUcuY29uc29sZS5hZGQoYHJlc2l6ZTogdW5iaW5kYCk7XHJcbiAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG4gICAgfTtcclxuXHJcbiAgICBzdGFydCgpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYWRkOiBhZGQsXHJcbiAgICAgICAgcmVtb3ZlOiByZW1vdmUsXHJcbiAgICAgICAgY2xlYW46IGNsZWFuLFxyXG4gICAgICAgIGJpbmQ6IGJpbmQsXHJcbiAgICAgICAgdW5iaW5kOiB1bmJpbmQsXHJcbiAgICB9O1xyXG4gIFxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xyXG5cclxuICAgIHZhciBcclxuICAgIFxyXG4gICAgREFUQSA9IHt9LFxyXG5cclxuICAgIHdoaWNoVHJhbnNpdGlvbkV2ZW50ID0gKCkgPT4ge1xyXG4gICAgICAgIHZhciB0LFxyXG4gICAgICAgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmYWtlZWxlbWVudFwiKTtcclxuICAgICAgXHJcbiAgICAgICAgdmFyIHRyYW5zaXRpb25zID0ge1xyXG4gICAgICAgICAgXCJ0cmFuc2l0aW9uXCIgICAgICA6IFwidHJhbnNpdGlvbmVuZFwiLFxyXG4gICAgICAgICAgXCJPVHJhbnNpdGlvblwiICAgICA6IFwib1RyYW5zaXRpb25FbmRcIixcclxuICAgICAgICAgIFwiTW96VHJhbnNpdGlvblwiICAgOiBcInRyYW5zaXRpb25lbmRcIixcclxuICAgICAgICAgIFwiV2Via2l0VHJhbnNpdGlvblwiOiBcIndlYmtpdFRyYW5zaXRpb25FbmRcIlxyXG4gICAgICAgIH1cclxuICAgICAgXHJcbiAgICAgICAgZm9yICh0IGluIHRyYW5zaXRpb25zKXtcclxuICAgICAgICAgIGlmIChlbC5zdHlsZVt0XSAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRyYW5zaXRpb25zW3RdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY2hlY2tXaXRjaFRyYW5zaXRpb25FdmVudCA9ICgpID0+IHtcclxuICAgICAgICBEQVRBLndpdGNoVHJhbnNpdGlvbkV2ZW50ID0gd2hpY2hUcmFuc2l0aW9uRXZlbnQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVmcmVzaCA9ICgpID0+IHtcclxuICAgICAgICBEQVRBLnRyYW5zaXRpb25FdmVudCA9IGNoZWNrV2l0Y2hUcmFuc2l0aW9uRXZlbnQoKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIERBVEE7XHJcblxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gKGFyZ3VtZW50KSA9PiB7XHJcbiAgICBcclxuICAgIHZhciBcclxuICAgIEJSRUFLUE9JTlRTICAgICAgICAgPSBudWxsLFxyXG4gICAgRUxFTUVOVFMgICAgICAgICAgICA9IG51bGwsXHJcbiAgICBSRVNJWkUgICAgICAgICAgICAgID0gbnVsbDtcclxuXHJcbiAgICB2YXJcclxuICAgIERBVEEgPSB7XHJcbiAgICAgICAgd2lkdGggICAgICAgICAgIDogbnVsbCxcclxuICAgICAgICBoZWlnaHQgICAgICAgICAgOiBudWxsLFxyXG4gICAgICAgIHJlc3BvbnNpdmUgICAgICA6IG51bGwsXHJcbiAgICB9O1xyXG5cclxuICAgIC8qIFN0YXJ0IG1vZHVsZSAqL1xyXG4gICAgY29uc3RcclxuICAgIHN0YXJ0ID0gKCkgPT4ge1xyXG5cclxuICAgICAgICAvKiBQcmVwYXJlIGFyZ3VtZW50cyBkYXRhICovXHJcbiAgICAgICAgQlJFQUtQT0lOVFMgPSBhcmd1bWVudC5CUkVBS1BPSU5UUztcclxuICAgICAgICBFTEVNRU5UUyA9IGFyZ3VtZW50LkVMRU1FTlRTO1xyXG4gICAgICAgIFJFU0laRSA9IGFyZ3VtZW50LlJFU0laRTtcclxuXHJcbiAgICAgICAgcmVmcmVzaCgpO1xyXG5cclxuICAgICAgICAvKiBDaGVjayBpZiB1c2VyIHJlc2l6ZSBwYWdlICovXHJcbiAgICAgICAgLy8gUkVTSVpFLmFkZCgnZGV2aWNlJywgKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICByZWZyZXNoKCk7XHJcbiAgICAgICAgLy8gfSwgJ3dpZHRoJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qIFJlZnJlc2ggbW9kdWxlICovXHJcbiAgICBjb25zdFxyXG4gICAgcmVmcmVzaCA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgLyogUHJlcGFyZSBkYXRhICovXHJcbiAgICAgICAgbGV0XHJcbiAgICAgICAgd2lkdGggPSBFTEVNRU5UUy4kd2luZG93LndpZHRoKCksXHJcbiAgICAgICAgbGFzdFdpZHRoID0gREFUQS53aWR0aDtcclxuICAgICAgICBoZWlnaHQgPSBFTEVNRU5UUy4kd2luZG93LmhlaWdodCgpO1xyXG5cclxuICAgICAgICBEQVRBLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgREFUQS5oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgICAgIC8qIENoZWNrIGFjdGl2ZSBicmVha3BvaW50ICovIFxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIEJSRUFLUE9JTlRTKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gQlJFQUtQT0lOVFNba2V5XTtcclxuXHJcbiAgICAgICAgICAgIGlmICh3aWR0aCA+IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBEQVRBLnJlc3BvbnNpdmUgPSBrZXk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIURBVEEucmVzcG9uc2l2ZSkge1xyXG4gICAgICAgICAgICBEQVRBLnJlc3BvbnNpdmUgPSAnbW9iaWxlJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIFRyaWdnZXIgcmVzaXplIHF1ZXVlIChpZ25vcmUgZmlyc3QgdGltZSkgKi9cclxuICAgICAgICBpZiAobGFzdFdpZHRoKSB7XHJcbiAgICAgICAgICAgIGlmIChEQVRBLndpZHRoID09PSBsYXN0V2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIC8vIFJFU0laRS5yZXNpemUoJ3dpZHRoJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBSRVNJWkUucmVzaXplKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgIERFQlVHLnZhcmlhYmxlLnJlZnJlc2goJ2RldmljZScpO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgIH07XHJcbiAgICBcclxuICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgREVCVUcudmFyaWFibGUuYWRkKCdkZXZpY2UnLCBEQVRBKTtcclxuICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuXHJcbiAgICBzdGFydCgpO1xyXG5cclxuICAgIHJldHVybiBEQVRBO1xyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gKGRhdGEpID0+IHtcclxuXHJcbiAgICB2YXIgXHJcbiAgICBEQVRBID0ge1xyXG4gICAgICAgIGxhc3RDZW50ZXIgICAgICAgICAgOiBudWxsLFxyXG4gICAgICAgIHRvcCAgICAgICAgICAgICAgICAgOiBudWxsLFxyXG4gICAgICAgIGNlbnRlciAgICAgICAgICAgICAgOiBudWxsLFxyXG4gICAgICAgIHNwZWVkICAgICAgICAgICAgICAgOiBudWxsLFxyXG4gICAgICAgIGRpcmVjdGlvbiAgICAgICAgICAgOiBudWxsLFxyXG4gICAgfSxcclxuICAgIERFVklDRSA9IGRhdGEuREVWSUNFO1xyXG5cclxuICAgIHZhciBiaW5kID0gKCkgPT4ge1xyXG5cclxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKHJlZnJlc2gpO1xyXG5cclxuICAgICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZSBvcmllbnRhdGlvbmNoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZWZyZXNoKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJlZnJlc2goKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIHJlZnJlc2ggPSAoKSA9PiB7XHJcbiAgICAgICAgREFUQS5jZW50ZXJMYXN0ID0gREFUQS5jZW50ZXI7XHJcblxyXG4gICAgICAgIERBVEEudG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgMDtcclxuICAgICAgICBEQVRBLmNlbnRlciA9IERBVEEudG9wICsgREVWSUNFLmhlaWdodEhhbGY7XHJcblxyXG4gICAgICAgIERBVEEuc3BlZWQgPSBNYXRoLmFicyhEQVRBLmNlbnRlckxhc3QgLSBEQVRBLmNlbnRlcik7XHJcblxyXG4gICAgICAgIGlmIChEQVRBLmNlbnRlciA+IERBVEEuY2VudGVyTGFzdCkge1xyXG4gICAgICAgICAgICBEQVRBLmRpcmVjdGlvbiA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgREFUQS5kaXJlY3Rpb24gPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgREVCVUcudmFyaWFibGUucmVmcmVzaCgnc2Nyb2xsJyk7XHJcbiAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG4gICAgfTtcclxuXHJcbiAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgIERFQlVHLnZhcmlhYmxlLmFkZCgnc2Nyb2xsJywgREFUQSk7XHJcbiAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgYmluZCgpO1xyXG5cclxuICAgIHJldHVybiBEQVRBO1xyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gKGRhdGEpID0+IHtcclxuXHJcbiAgICBEQVRBID0ge1xyXG4gICAgICAgICRjb250YWluZXI6IG51bGwsXHJcbiAgICAgICAgJGVsZW1lbnQ6IG51bGwsXHJcbiAgICAgICAgJGJ1dHRvbjogbnVsbCxcclxuICAgICAgICAkYm9keTogbnVsbCxcclxuICAgICAgICBvcGVuOiBmYWxzZSxcclxuICAgIH07XHJcblxyXG4gICAgJC5leHRlbmQoIERBVEEsIGRhdGEgKTtcclxuICAgIFxyXG4gICAgdmFyIHN0YXJ0ID0gKGRhdGEpID0+IHtcclxuXHJcbiAgICAgICAgdmFyIGRlYnVnQm94Q2xhc3MgPSAnZGVidWctYm94IGRlYnVnLWJveC0tY29uc29sZSc7XHJcbiAgICAgICAgaWYgKCFEQVRBLm9wZW4pIHtcclxuICAgICAgICAgICAgZGVidWdCb3hDbGFzcyArPSAnIGRlYnVnLWJveC0taGlkZSc7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgdmFyIGRlYnVnQm94ID0gJChgPGRpdiBjbGFzcz0nJHtkZWJ1Z0JveENsYXNzfScgaWQ9J2RlYnVnLWJveC1jb25zb2xlJz48L2Rpdj5gKTtcclxuICAgICAgICB2YXIgZGVidWdCb3hCdXR0b24gPSAkKFwiPGRpdiBpZD0nZGVidWctYm94LWNvbnNvbGUtYnV0dG9uJyBjbGFzcz0nZGVidWctYm94X19idXR0b24nPkZyb250Qm94IGNvbnNvbGU8L2Rpdj5cIik7XHJcbiAgICAgICAgdmFyIGRlYnVnQm94Q29udGFpbmVyID0gJChcIjxkaXYgaWQ9J2RlYnVnLWJveC1jb25zb2xlLWNvbnRhaW5lcicgY2xhc3M9J2RlYnVnLWJveF9fY29udGFpbmVyJz48L2Rpdj5cIik7XHJcbiAgICBcclxuICAgICAgICBEQVRBLkVMRU1FTlRTLiRib2R5LmFwcGVuZChkZWJ1Z0JveCk7XHJcbiAgICAgICAgREFUQS4kZWxlbWVudCA9ICQoXCIjZGVidWctYm94LWNvbnNvbGVcIik7XHJcbiAgICBcclxuICAgICAgICBEQVRBLiRlbGVtZW50LmFwcGVuZChkZWJ1Z0JveEJ1dHRvbik7XHJcbiAgICAgICAgREFUQS4kZWxlbWVudC5hcHBlbmQoZGVidWdCb3hDb250YWluZXIpO1xyXG4gICAgXHJcbiAgICAgICAgREFUQS4kYnV0dG9uID0gJChcIiNkZWJ1Zy1ib3gtY29uc29sZS1idXR0b25cIik7XHJcbiAgICAgICAgREFUQS4kY29udGFpbmVyID0gJChcIiNkZWJ1Zy1ib3gtY29uc29sZS1jb250YWluZXJcIik7XHJcbiAgICBcclxuICAgICAgICB2YXIgdG9nZ2xlRGVidWdCb3ggPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIERBVEEuJGVsZW1lbnQudG9nZ2xlQ2xhc3MoXCJkZWJ1Zy1ib3gtLWhpZGVcIik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICBEQVRBLiRidXR0b24ub24oXCJjbGlja1wiLCB0b2dnbGVEZWJ1Z0JveCk7XHJcbiAgICBcclxuICAgIH07XHJcbiAgICBcclxuICAgIHZhciBhZGQgPSAoYWRkU3RyaW5nLCBhZGRvbkNsYXNzID0gJycpID0+IHtcclxuICAgICAgICBEQVRBLiRjb250YWluZXIucHJlcGVuZChcIjxwIGNsYXNzPSdcIiArIGFkZG9uQ2xhc3MgKyBcIic+XCIrYWRkU3RyaW5nK1wiPC9wPlwiKTtcclxuICAgIH07XHJcblxyXG4gICAgc3RhcnQoKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGFkZDogYWRkLFxyXG4gICAgfTtcclxuXHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSAoYXJndW1lbnQpID0+IHtcclxuXHJcbiAgICB2YXIgXHJcbiAgICBFTEVNRU5UUyA9IG51bGw7XHJcblxyXG4gICAgdmFyXHJcbiAgICBCT1ggPSB7XHJcbiAgICAgICAgJGNvbnRhaW5lcjogbnVsbCxcclxuICAgICAgICAkY29udGVudDogbnVsbCxcclxuICAgICAgICAkYnV0dG9uOiBudWxsLFxyXG4gICAgICAgICRib2R5OiBudWxsLFxyXG4gICAgfSxcclxuICAgIE9QVElPTlMgPSB7XHJcbiAgICAgICAgb3BlbjogZmFsc2UsXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0XHJcbiAgICBDTEFTUyA9IHtcclxuICAgICAgICBjb250YWluZXIgICAgICAgOiBgZGVidWctYm94IGRlYnVnLWJveC0tdmFyaWFibGVzYCxcclxuICAgICAgICBidXR0b24gICAgICAgICAgOiBgZGVidWctYm94X19idXR0b25gLFxyXG4gICAgICAgIGNvbnRlbnQgICAgICAgICA6IGBkZWJ1Zy1ib3hfX2NvbnRhaW5lcmAsXHJcbiAgICAgICAgaXRlbSAgICAgICAgICAgIDogYGRlYnVnLWJveF9faXRlbWAsXHJcbiAgICB9O1xyXG5cclxuICAgIHZhclxyXG4gICAgQ09OVEVOVCA9IHt9O1xyXG5cclxuICAgIC8qIFN0YXJ0IG1vZHVsZSAqL1xyXG4gICAgdmFyIFxyXG4gICAgc3RhcnQgPSAoZGF0YSkgPT4ge1xyXG5cclxuICAgICAgICAvKiBQcmVwYXJlIGFyZ3VtZW50cyBkYXRhICovXHJcbiAgICAgICAgJC5leHRlbmQoIE9QVElPTlMsIGFyZ3VtZW50Lk9QVElPTlMgKTtcclxuICAgICAgICBFTEVNRU5UUyA9IGFyZ3VtZW50LkVMRU1FTlRTO1xyXG5cclxuICAgICAgICAvKiBDaGVjayBpZiBjb250YWluZXIgbXVzdCBiZSBkZWZhdWx0IG9wZW4gKi9cclxuICAgICAgICBpZiAoIU9QVElPTlMub3Blbikge1xyXG4gICAgICAgICAgICBDTEFTUy5jb250YWluZXIgKz0gJyBkZWJ1Zy1ib3gtLWhpZGUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvKiBDcmVhdGUgdGVtcGxhdGUgKi9cclxuICAgICAgICBCT1guJGNvbnRhaW5lciAgICAgID0gJChgPGRpdiBjbGFzcz0nJHtDTEFTUy5jb250YWluZXJ9Jz48L2Rpdj5gKTtcclxuICAgICAgICBCT1guJGJ1dHRvbiAgICAgICAgID0gJChgPGRpdiBjbGFzcz0nJHtDTEFTUy5idXR0b259Jz5Gcm9udEJveCB2YXJpYWJsZXM8L2Rpdj5gKTtcclxuICAgICAgICBCT1guJGNvbnRlbnQgICAgICAgID0gJChgPGRpdiBjbGFzcz0nJHtDTEFTUy5jb250ZW50fSc+PC9kaXY+YCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLyogRHJhdyB0ZW1wbGF0ZSAqL1xyXG4gICAgICAgIEVMRU1FTlRTLiRib2R5LmFwcGVuZCggQk9YLiRjb250YWluZXIgKTtcclxuICAgICAgICBCT1guJGNvbnRhaW5lci5hcHBlbmQoIEJPWC4kYnV0dG9uICk7XHJcbiAgICAgICAgQk9YLiRjb250YWluZXIuYXBwZW5kKCBCT1guJGNvbnRlbnQgKTtcclxuICAgICAgICBcclxuICAgICAgICAvKiBCaW5kIHRvZ2dsZSBjb250YWluZXIgKi9cclxuICAgICAgICBCT1guJGJ1dHRvbi5vbihcImNsaWNrXCIsIHRvZ2dsZUNvbnRhaW5lcik7XHJcbiAgICB9O1xyXG4gICAgXHJcblxyXG4gICAgLyogU2hvdyBkYXRhIGluIGNvbnRlbnQgKi9cclxuICAgIGNvbnN0XHJcbiAgICBhZGQgPSAoZGF0YU5hbWUsIERBVEEpID0+IHtcclxuICAgICAgICBcclxuICAgICAgICBDT05URU5UW2RhdGFOYW1lXSA9IHtcclxuICAgICAgICAgICAgZGF0YTogREFUQSxcclxuICAgICAgICAgICAgbmFtZTogZGF0YU5hbWUuc3BsaXQoXCIgXCIpLmpvaW4oXCItXCIpLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgQk9YLiRjb250ZW50LmFwcGVuZChgPHAgY2xhc3M9XCIke0NMQVNTLml0ZW19XCI+JHtDT05URU5UW2RhdGFOYW1lXS5uYW1lfTwvcD5gKTtcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBEQVRBKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gREFUQVtrZXldO1xyXG5cclxuICAgICAgICAgICAgbGV0XHJcbiAgICAgICAgICAgIG5hbWUgPSBrZXkuc3BsaXQoXCIgXCIpLmpvaW4oXCItXCIpLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICAgIGlkID0gYGRlYnVnLXZhcmlhYmxlLSR7Q09OVEVOVFtkYXRhTmFtZV0ubmFtZX0tJHtuYW1lfWA7XHJcbiAgICAgICAgICAgICRpdGVtID0gJChgPHA+ICR7a2V5fSA8c3BhbiBpZD0nJHtpZH0nPiR7dmFsdWV9PC9zcGFuPiA8L3A+YCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBCT1guJGNvbnRlbnQuYXBwZW5kKCRpdGVtKTtcclxuXHJcbiAgICAgICAgICAgICRpdGVtLm9uKFwiY2xpY2tcIiwgeyRpdGVtfSwgdG9nZ2xlVmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyogUmVmcmVzaCBkYXRhIG5hbWUgaW4gY29udGVudCAqLyBcclxuICAgIGNvbnN0XHJcbiAgICByZWZyZXNoID0gKG5hbWUpID0+IHtcclxuICAgICAgICB2YXJcclxuICAgICAgICBpdGVtID0gQ09OVEVOVFtuYW1lXSxcclxuICAgICAgICBkYXRhID0gaXRlbS5kYXRhO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZGF0YVtrZXldO1xyXG5cclxuICAgICAgICAgICAgbGV0XHJcbiAgICAgICAgICAgIG5hbWUgPSBrZXkuc3BsaXQoXCIgXCIpLmpvaW4oXCItXCIpLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICAgIGZpbmQgPSBgZGVidWctdmFyaWFibGUtJHtpdGVtLm5hbWV9LSR7bmFtZX1gO1xyXG5cclxuICAgICAgICAgICAgJChgIyR7ZmluZH1gKS50ZXh0KHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICAvKiBUb29nbGUgY29udGFpbmVyICovXHJcbiAgICBjb25zdFxyXG4gICAgdG9nZ2xlQ29udGFpbmVyID0gKCkgPT4ge1xyXG4gICAgICAgIEJPWC4kY29udGFpbmVyLnRvZ2dsZUNsYXNzKFwiZGVidWctYm94LS1oaWRlXCIpO1xyXG4gICAgfTtcclxuICAgIC8qIFRvb2dsZSB2YWx1ZSAqL1xyXG4gICAgY29uc3RcclxuICAgIHRvZ2dsZVZhbHVlID0gKGUpID0+IHsgICAgICBcclxuICAgICAgICBlLmRhdGEuJGl0ZW0udG9nZ2xlQ2xhc3MoXCJqc19mb2N1c1wiKTtcclxuICAgIH07XHJcblxyXG4gICAgc3RhcnQoKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGFkZDogYWRkLFxyXG4gICAgICAgIHJlZnJlc2g6IHJlZnJlc2gsXHJcbiAgICB9O1xyXG5cclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnQgc3RyaW5nIHRvIGJvb2xlYW5cclxuICAgICAqIGZhc3Rlc3QgbWV0aG9kIGh0dHA6Ly9qc2Jlbi5jaC9jcVZTalxyXG4gICAgICovXHJcbiAgICBnZXRCb29sZWFuKHZhbHVlKSB7XHJcblx0XHRzd2l0Y2ggKHZhbHVlKXtcclxuXHRcdFx0Y2FzZSB0cnVlOlxyXG5cdFx0XHRjYXNlIFwidHJ1ZVwiOlxyXG5cdFx0XHRjYXNlIDE6XHJcblx0XHRcdGNhc2UgXCIxXCI6XHJcblx0XHRcdGNhc2UgXCJvblwiOlxyXG5cdFx0XHRjYXNlIFwieWVzXCI6XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdGRlZmF1bHQ6IFxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuICAgIH0sXHJcbiAgICBcclxuICAgIC8qXHJcbiAgICAgKiBEZXRlcm1pbmUgT3ZlcmZsb3dcclxuICAgICAqL1xyXG4gICAgZGV0ZXJtaW5lT3ZlcmZsb3c6IGZ1bmN0aW9uKGNvbnRlbnQsIGNvbnRhaW5lcikge1xyXG5cclxuICAgICAgICBpZiAoY29udGVudCBpbnN0YW5jZW9mIGpRdWVyeSlcclxuICAgICAgICB7XHJcblx0XHRcdGNvbnRlbnQgPSBjb250ZW50WzBdO1xyXG5cdFx0fVxyXG4gICAgICAgIGlmIChjb250YWluZXIgaW5zdGFuY2VvZiBqUXVlcnkpXHJcbiAgICAgICAge1xyXG5cdFx0XHRjb250YWluZXIgPSBjb250YWluZXJbMF07XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyXHJcblx0XHRjb250YWluZXJNZXRyaWNzID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG5cdFx0Y29udGFpbmVyTWV0cmljc1JpZ2h0ID0gTWF0aC5mbG9vcihjb250YWluZXJNZXRyaWNzLnJpZ2h0KSxcclxuXHRcdGNvbnRhaW5lck1ldHJpY3NMZWZ0ID0gTWF0aC5mbG9vcihjb250YWluZXJNZXRyaWNzLmxlZnQpLFxyXG5cdFx0Y29udGVudE1ldHJpY3MgPSBjb250ZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG5cdFx0Y29udGVudE1ldHJpY3NSaWdodCA9IE1hdGguZmxvb3IoY29udGVudE1ldHJpY3MucmlnaHQpLFxyXG5cdFx0Y29udGVudE1ldHJpY3NMZWZ0ID0gTWF0aC5mbG9vcihjb250ZW50TWV0cmljcy5sZWZ0KTtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRhaW5lck1ldHJpY3NMZWZ0ID4gY29udGVudE1ldHJpY3NMZWZ0ICYmIGNvbnRhaW5lck1ldHJpY3NSaWdodCA8IGNvbnRlbnRNZXRyaWNzUmlnaHQpIFxyXG4gICAgICAgIHtcclxuXHRcdFx0cmV0dXJuIFwiYm90aFwiO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSBpZiAoY29udGVudE1ldHJpY3NMZWZ0IDw9IGNvbnRhaW5lck1ldHJpY3NMZWZ0KSBcclxuICAgICAgICB7XHJcblx0XHRcdHJldHVybiBcImxlZnRcIjtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2UgaWYgKGNvbnRlbnRNZXRyaWNzUmlnaHQgPj0gY29udGFpbmVyTWV0cmljc1JpZ2h0KVxyXG4gICAgICAgIHtcclxuXHRcdFx0cmV0dXJuIFwicmlnaHRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBcclxuICAgICAgICB7XHJcblx0XHRcdHJldHVybiBcIm5vbmVcIjtcclxuXHRcdH1cclxuICAgIH0sXHJcbiAgICAgICAgXHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSAoKSA9PiB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAkLmRpc2FibGVzY3JvbGxcclxuICAgICAqIEF1dGhvcjogSm9zaCBIYXJyaXNvbiAtIGFsb29mLmNvXHJcbiAgICAgKlxyXG4gICAgICogRGlzYWJsZXMgc2Nyb2xsIGV2ZW50cyBmcm9tIG1vdXNld2hlZWxzLCB0b3VjaG1vdmVzIGFuZCBrZXlwcmVzc2VzLlxyXG4gICAgICogVXNlIHdoaWxlIGpRdWVyeSBpcyBhbmltYXRpbmcgdGhlIHNjcm9sbCBwb3NpdGlvbiBmb3IgYSBndWFyYW50ZWVkIHN1cGVyLXNtb290aCByaWRlIVxyXG4gICAgICovXHJcblxyXG4gICAgOyhmdW5jdGlvbigkKSB7XHJcblxyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgICAgICB2YXIgaW5zdGFuY2UsIHByb3RvO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBVc2VyU2Nyb2xsRGlzYWJsZXIoJGNvbnRhaW5lciwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICAvLyBzcGFjZWJhcjogMzIsIHBhZ2V1cDogMzMsIHBhZ2Vkb3duOiAzNCwgZW5kOiAzNSwgaG9tZTogMzZcclxuICAgICAgICAgICAgLy8gbGVmdDogMzcsIHVwOiAzOCwgcmlnaHQ6IDM5LCBkb3duOiA0MFxyXG4gICAgICAgICAgICB0aGlzLm9wdHMgPSAkLmV4dGVuZCh7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVXaGVlbCA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVTY3JvbGxiYXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVLZXlzIDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNjcm9sbEV2ZW50S2V5cyA6IFszMiwgMzMsIDM0LCAzNSwgMzYsIDM3LCAzOCwgMzksIDQwXVxyXG4gICAgICAgICAgICB9LCBvcHRpb25zKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuJGNvbnRhaW5lciA9ICRjb250YWluZXI7XHJcbiAgICAgICAgICAgIHRoaXMuJGRvY3VtZW50ID0gJChkb2N1bWVudCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9ja1RvU2Nyb2xsUG9zID0gWzAsIDBdO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kaXNhYmxlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90byA9IFVzZXJTY3JvbGxEaXNhYmxlci5wcm90b3R5cGU7XHJcblxyXG4gICAgICAgIHByb3RvLmRpc2FibGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYodC5vcHRzLmhhbmRsZVdoZWVsKSB7XHJcbiAgICAgICAgICAgICAgICB0LiRjb250YWluZXIub24oXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtb3VzZXdoZWVsLmRpc2FibGVzY3JvbGwgRE9NTW91c2VTY3JvbGwuZGlzYWJsZXNjcm9sbCB0b3VjaG1vdmUuZGlzYWJsZXNjcm9sbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHQuX2hhbmRsZVdoZWVsXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZih0Lm9wdHMuaGFuZGxlU2Nyb2xsYmFyKSB7XHJcbiAgICAgICAgICAgICAgICB0LmxvY2tUb1Njcm9sbFBvcyA9IFtcclxuICAgICAgICAgICAgICAgICAgICB0LiRjb250YWluZXIuc2Nyb2xsTGVmdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHQuJGNvbnRhaW5lci5zY3JvbGxUb3AoKVxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIHQuJGNvbnRhaW5lci5vbihcInNjcm9sbC5kaXNhYmxlc2Nyb2xsXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHQuX2hhbmRsZVNjcm9sbGJhci5jYWxsKHQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHQub3B0cy5oYW5kbGVLZXlzKSB7XHJcbiAgICAgICAgICAgICAgICB0LiRkb2N1bWVudC5vbihcImtleWRvd24uZGlzYWJsZXNjcm9sbFwiLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHQuX2hhbmRsZUtleWRvd24uY2FsbCh0LCBldmVudCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIHByb3RvLnVuZG8gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0LiRjb250YWluZXIub2ZmKFwiLmRpc2FibGVzY3JvbGxcIik7XHJcbiAgICAgICAgICAgIGlmKHQub3B0cy5oYW5kbGVLZXlzKSB7XHJcbiAgICAgICAgICAgICAgICB0LiRkb2N1bWVudC5vZmYoXCIuZGlzYWJsZXNjcm9sbFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJvdG8uX2hhbmRsZVdoZWVsID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHByb3RvLl9oYW5kbGVTY3JvbGxiYXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy4kY29udGFpbmVyLnNjcm9sbExlZnQodGhpcy5sb2NrVG9TY3JvbGxQb3NbMF0pO1xyXG4gICAgICAgICAgICB0aGlzLiRjb250YWluZXIuc2Nyb2xsVG9wKHRoaXMubG9ja1RvU2Nyb2xsUG9zWzFdKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHByb3RvLl9oYW5kbGVLZXlkb3duID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm9wdHMuc2Nyb2xsRXZlbnRLZXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gdGhpcy5vcHRzLnNjcm9sbEV2ZW50S2V5c1tpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgIC8vIFBsdWdpbiB3cmFwcGVyIGZvciBvYmplY3RcclxuICAgICAgICAkLmZuLnNjcm9sbERpc2FibGUgPSBmdW5jdGlvbihtZXRob2QpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIGNhbGxpbmcgZm9yIHRoZSBmaXJzdCB0aW1lLCBpbnN0YW50aWF0ZSB0aGUgb2JqZWN0IGFuZCBzYXZlXHJcbiAgICAgICAgICAgIC8vIHJlZmVyZW5jZS4gVGhlIHBsdWdpbiBjYW4gdGhlcmVmb3JlIG9ubHkgYmUgaW5zdGFudGlhdGVkIG9uY2UgcGVyXHJcbiAgICAgICAgICAgIC8vIHBhZ2UuIFlvdSBjYW4gcGFzcyBvcHRpb25zIG9iamVjdCBpbiB0aHJvdWdoIHRoZSBtZXRob2QgcGFyYW1ldGVyLlxyXG4gICAgICAgICAgICBpZiggISBpbnN0YW5jZSAmJiAodHlwZW9mIG1ldGhvZCA9PT0gXCJvYmplY3RcIiB8fCAhIG1ldGhvZCkpIHtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gbmV3IFVzZXJTY3JvbGxEaXNhYmxlcih0aGlzLCBtZXRob2QpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJbnN0YW5jZSBjcmVhdGVkLCBubyBtZXRob2Qgc3BlY2lmaWVkLiBDYWxsIGRpc2FibGUgYWdhaW5cclxuICAgICAgICAgICAgaWYoaW5zdGFuY2UgJiYgdHlwZW9mIG1ldGhvZCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuZGlzYWJsZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJbnN0YW5jZSBhbHJlYWR5IGNyZWF0ZWQsIGFuZCBhIG1ldGhvZCBpcyBiZWluZyBleHBsaWNpdGx5IGNhbGxlZCxcclxuICAgICAgICAgICAgLy8gZS5nLiAuc2Nyb2xsRGlzYWJsZSgndW5kbycpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKGluc3RhbmNlICYmIGluc3RhbmNlW21ldGhvZF0pIHtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlW21ldGhvZF0uY2FsbChpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gR2xvYmFsIGFjY2Vzc1xyXG4gICAgICAgIHdpbmRvdy5Vc2VyU2Nyb2xsRGlzYWJsZXIgPSBVc2VyU2Nyb2xsRGlzYWJsZXI7XHJcblxyXG4gICAgfSkoalF1ZXJ5KTtcclxuXHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSAoZGF0YSkgPT4ge1xyXG5cclxuICAgIHZhclxyXG4gICAgICAgIERBVEEgPSB7XHJcbiAgICAgICAgICAgICRidXJnZXI6IG51bGwsXHJcbiAgICAgICAgICAgICRtZW51OiBudWxsLFxyXG4gICAgICAgICAgICAkbWVudV9jb250YWluZXI6IG51bGwsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBFTEVNRU5UUyA9IGRhdGEuRUxFTUVOVFMsXHJcbiAgICAgICAgRlVOQ1RJT05TID0gZGF0YS5GVU5DVElPTlMsXHJcbiAgICAgICAgU0VUVElOR1MgPSB7XHJcbiAgICAgICAgICAgIHdhaXQ6IDMwMCxcclxuICAgICAgICAgICAgc3R5bGU6ICd1bmRlci1oZWFkZXInLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWN0aXZlID0gZmFsc2UsXHJcbiAgICAgICAgbW92aW5nID0gZmFsc2U7XHJcblxyXG5cclxuICAgIGlmIChkYXRhLlNFVFRJTkdTKSB7XHJcbiAgICAgICAgJC5leHRlbmQoREFUQSwgZGF0YS5TRVRUSU5HUyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHN0YXJ0ID0gKHNldHRpbmdzID0gZmFsc2UpID0+IHtcclxuXHJcbiAgICAgICAgREFUQS4kYnVyZ2VyID0gJChcIiNidXJnZXItYnV0dG9uXCIpO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKERBVEEuJGJ1cmdlci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgREFUQS4kbWVudSA9ICQoXCIjYnVyZ2VyLW1lbnVcIik7XHJcbiAgICAgICAgICAgIERBVEEuJG1lbnVfY29udGFpbmVyID0gJChcIiNidXJnZXItbWVudS1jb250YWluZXJcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBEQVRBLiRidXJnZXIub24oXCJjbGlja1wiLCBidXJnZXJDbGljayk7XHJcblxyXG4gICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgIC8vIERFQlVHLnZhcmlhYmxlLmFkZCh7XHJcbiAgICAgICAgLy8gICAgICdCdXJnZXIgYWN0aXZlJzogYWN0aXZlLFxyXG4gICAgICAgIC8vICAgICAnQnVyZ2VyIG1vdmluZyc6IG1vdmluZyxcclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciB0b2dnbGVPZmYgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKFwiQnVyZ2VyIHRvZ2dsZU9mZlwiLCBcImNsaWNrXCIpO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuXHJcbiAgICAgICAgbW92aW5nID0gdHJ1ZTtcclxuICAgICAgICBhY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgRUxFTUVOVFMuJGh0bWwucmVtb3ZlQ2xhc3MoJ2pzX21lbnUtYWN0aXZlJyk7XHJcblxyXG5cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICAvLyBERUJVRy52YXJpYWJsZS5hZGQoe1xyXG4gICAgICAgIC8vICAgICAnQnVyZ2VyIG1vdmluZyc6IG1vdmluZyxcclxuICAgICAgICAvLyAgICAgJ0J1cmdlciBhY3RpdmUnOiBhY3RpdmUsXHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgRUxFTUVOVFMuJGJvZHkuc2Nyb2xsRGlzYWJsZShcInVuZG9cIik7XHJcbiAgICAgICAgICAgIG1vdmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBFTEVNRU5UUy4kaHRtbC5yZW1vdmVDbGFzcygnanNfbWVudS1hY3RpdmUtLWVuZCcpO1xyXG5cclxuICAgICAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgICAgIC8vIERFQlVHLnZhcmlhYmxlLmFkZCh7XHJcbiAgICAgICAgICAgIC8vICAgICAnQnVyZ2VyIG1vdmluZyc6IG1vdmluZyxcclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuXHJcbiAgICAgICAgfSwgU0VUVElOR1Mud2FpdCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgdG9nZ2xlT24gPSAoKSA9PiB7XHJcbiAgICAgICAgRUxFTUVOVFMuJGJvZHkuc2Nyb2xsRGlzYWJsZSgpO1xyXG5cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICBERUJVRy5jb25zb2xlLmFkZChcIkJ1cmdlciB0b2dnbGVPblwiLCBcImNsaWNrXCIpO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuXHJcbiAgICAgICAgaWYgKFNFVFRJTkdTLnN0eWxlKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoU0VUVElOR1Muc3R5bGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAqIEZvciBidXJnZXIgYW5pbWF0aW9uXHJcbiAgICAgICAgICAgICAgICAgKiBAaW1wb3J0IFwiLi4vcGx1Z2lucy9hbmltYXRpb24vbmF2YmFyL3VuZGVyLWhlYWRlclwiO1xyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBjYXNlICd1bmRlci1oZWFkZXInOlxyXG4gICAgICAgICAgICAgICAgICAgIERBVEEuJG1lbnUgPSBEQVRBLiRtZW51X2NvbnRhaW5lci5vZmZzZXRIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEVMRU1FTlRTLiRodG1sLmFkZENsYXNzKCdqc19tZW51LWFjdGl2ZScpO1xyXG4gICAgICAgIEVMRU1FTlRTLiRvdmVybGF5Lm9uKCdjbGljaycsIHRvZ2dsZU92ZXJsYXkpO1xyXG5cclxuICAgICAgICBtb3ZpbmcgPSB0cnVlO1xyXG4gICAgICAgIGFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgIC8vIERFQlVHLnZhcmlhYmxlLmFkZCh7XHJcbiAgICAgICAgLy8gICAgICdCdXJnZXIgYWN0aXZlJzogYWN0aXZlLFxyXG4gICAgICAgIC8vICAgICAnQnVyZ2VyIG1vdmluZyc6IG1vdmluZyxcclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgRUxFTUVOVFMuJGh0bWwuYWRkQ2xhc3MoJ2pzX21lbnUtYWN0aXZlLS1lbmQnKTtcclxuICAgICAgICAgICAgbW92aW5nID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICAgICAgLy8gREVCVUcudmFyaWFibGUuYWRkKHtcclxuICAgICAgICAgICAgLy8gICAgICdCdXJnZXIgbW92aW5nJzogbW92aW5nLFxyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgICAgICB9LCBTRVRUSU5HUy53YWl0KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciB0b2dnbGVPdmVybGF5ID0gKCkgPT4ge1xyXG5cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICBERUJVRy5jb25zb2xlLmFkZChcIkJ1cmdlciBvdmVybGF5IHRvZ2dsZU9mZlwiLCBcImNsaWNrXCIpO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuXHJcbiAgICAgICAgRUxFTUVOVFMuJG92ZXJsYXkub2ZmKCdjbGljaycsIHRvZ2dsZU92ZXJsYXkpO1xyXG5cclxuICAgICAgICB0b2dnbGVPZmYoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgYnVyZ2VyQ2xpY2sgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIGlmICghbW92aW5nKSB7XHJcblxyXG4gICAgICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICAgICAgREVCVUcuY29uc29sZS5hZGQoXCJCdXJnZXIgY2xpY2tlZFwiLCBcImNsaWNrXCIpO1xyXG4gICAgICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgICAgICAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0b2dnbGVPZmYoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRvZ2dsZU9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBERUJVRy5jb25zb2xlLmFkZChcIkJ1cmdlciBjbGljayBibG9ja2VkLiBCdXJnZXIgaXMgbW92aW5nXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgc3RhcnQoKTtcclxuXHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSAoZGF0YSkgPT4ge1xyXG5cclxuICAgIHZhciBcclxuICAgIFNFVFRJTkdTID0ge1xyXG4gICAgICAgIHNweVRvcDogdHJ1ZSxcclxuICAgICAgICBvZmZzZXQ6IDEsXHJcbiAgICAgICAgc3B5VG9wQ2xhc3M6ICdqc19zdGlja3ktZWxlbWVudC0tYWN0aXZlJyxcclxuICAgIH0sXHJcbiAgICBFTEVNRU5UUyA9IGRhdGEuRUxFTUVOVFMsXHJcbiAgICBTQ1JPTEwgPSBkYXRhLlNDUk9MTCxcclxuICAgICRlbGVtZW50U3B5ID0gZGF0YS4kZWxlbWVudFNweSxcclxuICAgIERBVEEgPSB7XHJcbiAgICAgICAgaGVpZ2h0OiBudWxsLFxyXG4gICAgICAgIG9mZnNldDogbnVsbCxcclxuICAgIH0sXHJcbiAgICBhY3RpdmUgPSBmYWxzZSxcclxuICAgIHBvc2l0aW9uID0gbnVsbDtcclxuXHJcbiAgICBpZiAoZGF0YS5TRVRUSU5HUykge1xyXG4gICAgICAgICQuZXh0ZW5kKERBVEEsIGRhdGEuU0VUVElOR1MpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzdGFydCA9IChkYXRhKSA9PiB7XHJcblxyXG4gICAgICAgIGlmICgkZWxlbWVudFNweS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICQod2luZG93KS5vbigncmVzaXplIG9yaWVudGF0aW9uY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHJlZnJlc2goKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChTRVRUSU5HUy5zcHlUb3ApIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzcHlUb3AoKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgRUxFTUVOVFMuJHdpbmRvdy5vbihcInNjcm9sbFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3B5VG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9KTsgICBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKGBTdGFydCBzdGlja3kuanMge29mZnNldDogJHtEQVRBLm9mZnNldH07IH1gKTtcclxuICAgICAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdmFyIHJlZnJlc2ggPSAoKSA9PiB7XHJcbiAgICAgICAgY2FsY3VsYXRlSGVhZGVyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCFTRVRUSU5HUy5vZmZzZXQpIHtcclxuICAgICAgICAgICAgREFUQS5vZmZzZXQgPSBTRVRUSU5HUy5vZmZzZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBEQVRBLm9mZnNldCA9ICRlbGVtZW50U3B5Lm9mZnNldCgpLnRvcDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBjYWxjdWxhdGVIZWFkZXIgPSAoZGF0YSkgPT4ge1xyXG5cclxuICAgICAgICBwb3NpdGlvbiA9ICRlbGVtZW50U3B5Lm9mZnNldCgpLnRvcDtcclxuICAgICAgICBEQVRBLmhlaWdodCA9ICRlbGVtZW50U3B5Lm91dGVySGVpZ2h0KHRydWUpO1xyXG5cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICAvLyBERUJVRy52YXJpYWJsZS5hZGQoe1xyXG4gICAgICAgIC8vICAgICBcIkhlYWRlciBoZWlnaHRcIjogREFUQS5oZWlnaHQsXHJcbiAgICAgICAgLy8gICAgIFwiSGVhZGVyIHBvc2l0aW9uXCI6IHBvc2l0aW9uLFxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgIH07XHJcblxyXG4gICAgdmFyIHNweVRvcCA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgaWYgKFNDUk9MTC50b3AgPiBEQVRBLm9mZnNldCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIWFjdGl2ZSkgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvLyBFTEVNRU5UUy4kaGVhZGVyUGxhY2Vob2xkZXIuY3NzKHtoZWlnaHQ6IERBVEEuaGVpZ2h0fSk7XHJcbiAgICAgICAgICAgICAgICBFTEVNRU5UUy4kaHRtbC5hZGRDbGFzcyhTRVRUSU5HUy5zcHlUb3BDbGFzcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2UgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vIEVMRU1FTlRTLiRoZWFkZXJQbGFjZWhvbGRlci5jc3Moe2hlaWdodDogXCJcIn0pO1xyXG4gICAgICAgICAgICAgICAgRUxFTUVOVFMuJGh0bWwucmVtb3ZlQ2xhc3MoU0VUVElOR1Muc3B5VG9wQ2xhc3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICAvLyBERUJVRy52YXJpYWJsZS5hZGQoe1xyXG4gICAgICAgIC8vICAgJ0hlYWRlciBhY3RpdmUnOiBhY3RpdmUsXHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgc3RhcnQoKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG5cclxuICAgIH07XHJcblxyXG59OyIsIi8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG58fCBTbW9vdGggc2Nyb2xsIHRvIHRhcmdldFxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxufHwgUmVxdWlyZWRcclxufHwgKiBTQ1JPTExcclxufHwgKiBFTEVNRU5UU1xyXG58fCAqIEZVTkNUSU9OU1xyXG58fFxyXG58fCAqIGRhdGEtZWxlbWVudCAtIHNlbGVjdCBlbGVtZW50cyBzZXBhcmF0ZSB3aXRoIGNvbW1hICggJChcImRhdGEtbGVtZW50XCIpIClcclxufHwgKiBkYXRhLXRvZ2dsZSAtIHNlbGVjdCB0eXBlIG9mIHRvZ2dsZVxyXG58fFxyXG58fCBEYXRhLXRvZ2dsZSB0eXBlOlxyXG58fCAqIGNvbGxhcHNlIC0gY29sbGFwc2UgZGF0YS1lbGVtZW50ICggdXNlIGxlc3MvamF2YXNjcmlwdC9fY29sbGFwc2UubGVzcyBjbGFzcyApXHJcbnx8ICogc29tZXRoaW5nIGVsc2UgLSB0b2dnbGUgZGF0YS1lbGVtZW50IHVzaW5nIGNsYXNzIG9uIGRhdGEtdG9nZ2xlXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xyXG5tb2R1bGUuZXhwb3J0cyA9IChkYXRhKSA9PiB7XHJcbiAgICBcclxuICAgIHZhclxyXG4gICAgU0NST0xMID0gZGF0YS5TQ1JPTEwsXHJcbiAgICBFTEVNRU5UUyA9IGRhdGEuRUxFTUVOVFMsXHJcbiAgICBGVU5DVElPTlMgPSBkYXRhLkZVTkNUSU9OUyxcclxuICAgIC8vIGFsbCBjbGlja2FibGUgc2Nyb2xsIGVsZW1lbnRzXHJcbiAgICAkZWxlbWVudHMgPSBudWxsLFxyXG4gICAgLy8gYm9vbCBwYWdlIGlzIHNjcm9sbFxyXG4gICAgYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgdmFyXHJcbiAgICBTRVRUSU5HUyA9IHtcclxuICAgICAgICAvLyBhY3RpdmUgYXV0b21hdGljIHNjcm9sbCBwYWdlIHRvIGVsZW1lbnQgdmlhIFVSTCBoYXNoXHJcbiAgICAgICAgYXV0b1Njcm9sbDogZmFsc2UsXHJcbiAgICAgICAgLy8gZGl2aWRlIGRpc3RhbmNlIGJ5IHRoaXMgdmFsdWUgdG8gY2FsY3VsYXRlIHRpbWUgc2Nyb2xsXHJcbiAgICAgICAgdGltZTogMixcclxuICAgICAgICAvLyBtaW4gdGltZSBzY3JvbGxcclxuICAgICAgICBtaW5UaW1lOiA0MDAsXHJcbiAgICAgICAgLy8gbWF4IHRpbWUgc2Nyb2xsXHJcbiAgICAgICAgbWF4VGltZTogMTIwMCxcclxuICAgICAgICAvLyBydW4gYXV0b1Njcm9sbCB3aGVuIGhhc2ggaW4gVVJMIGlzIGJlZ2luIHdpdGggdGhpcyBzdHJpbmdcclxuICAgICAgICBwcmVmaXhBdXRvU2Nyb2xsOiAnc2Nyb2xsLSdcclxuICAgIH07XHJcblxyXG4gICAgJC5leHRlbmQoIFNFVFRJTkdTLCBkYXRhLlNFVFRJTkdTICk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydCBmdW5jdGlvblxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxyXG4gICAgICogcmVwbGFjZSB2YWx1ZXMgaW4gU0VUVElOR1MgXHJcbiAgICAgKi9cclxuICAgIHZhclxyXG4gICAgc3RhcnQgPSAoZGF0YSkgPT4ge1xyXG5cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICBERUJVRy5jb25zb2xlLmFkZChcIlN0YXJ0OiBzY3JvbGxUb1wiKTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIGlmIChTRVRUSU5HUy5hdXRvU2Nyb2xsKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGF1dG9TY3JvbGwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlZnJlc2goKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXV0b21hdGljIHNjcm9sbCBwYWdlIHRvIGVsZW1lbnQgSURcclxuICAgICAqIHdoZW4gdXNlciB2aXNpdCBwYWdlIHdpdGggaGFzaFxyXG4gICAgICogYmVnaW4gd2l0aCBTRVRUSU5HUy5wcmVmaXhBdXRvU2Nyb2xsXHJcbiAgICAgKi9cclxuICAgIHZhclxyXG4gICAgYXV0b1Njcm9sbCA9ICgpID0+IHtcclxuICAgICAgICB2YXIgXHJcbiAgICAgICAgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIENoZWNrIGlmIHBhZ2UgbXVzdCB0cmlnZ2VyIGF1dG9TY3JvbGxcclxuICAgICAgICBpZiggaGFzaC5zdGFydHNXaXRoKCBcIiNcIiArIFNFVFRJTkdTLnByZWZpeEF1dG9TY3JvbGwgKSApIHtcclxuXHJcbiAgICAgICAgICAgIC8vIEZpeCBhbm5veWluZyBqdW1waW5nIHdoZW4gdXNlciBkaXN0dXJiIHNjcm9sbFxyXG4gICAgICAgICAgICBFTEVNRU5UUy4kYm9keS5zY3JvbGxEaXNhYmxlKHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVtb3ZlIGhhc2ggZnJvbSB1cmxcclxuICAgICAgICAgICAgdmFyIFxyXG4gICAgICAgICAgICBjbGVhblVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdCArIGxvY2F0aW9uLnBhdGhuYW1lO1xyXG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sIGRvY3VtZW50LnRpdGxlLCBjbGVhblVybCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgdGFyZ2V0IElEIGZyb20gaGFzaFxyXG4gICAgICAgICAgICB2YXIgXHJcbiAgICAgICAgICAgIHRhcmdldElEID0gaGFzaC5zdWJzdHJpbmcoaGFzaC5pbmRleE9mKCctJykrMSwgaGFzaC5sZW5naHQpO1xyXG5cclxuICAgICAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKFwic2Nyb2xsVG8uanMgYXV0byB0cmlnZ2VyIGZ1bmN0aW9uIGF1dG9TY3JvbGwoKS5cIiwgJ2F1dG8nKTtcclxuICAgICAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gRml4IGFubm95aW5nIGp1bXBpbmcgd2hlbiBwYWdlIGlzIHN0aWxsIG5vdCByZWFkeVxyXG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgb24odGFyZ2V0SUQpO1xyXG4gICAgICAgICAgICB9LCA5MDApO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2Nyb2xsIGZ1bmN0aW9uXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50IGludGVyZmFjZX0gZXZlbnQgXHJcbiAgICAgKiBAcGFyYW0ge2pRdWVyeSBvYmplY3Q7IFN0cmluZyBJRH0gdGFyZ2V0IFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWUgXHJcbiAgICAgKi9cclxuICAgIHZhclxyXG4gICAgc2Nyb2xsID0gKGV2ZW50LCB0YXJnZXQgPSBmYWxzZSwgdGltZSA9IGZhbHNlKSA9PiB7XHJcbiAgICAgICAgdmFyXHJcbiAgICAgICAgdGFyZ2V0SUQsICR0YXJnZXQsICR0aGlzO1xyXG5cclxuICAgICAgICAvLyBDaGVjayBldmVudCBhbmQgcmVtb3ZlIGRlZmF1bHQgYWN0aW9uXHJcbiAgICAgICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgICAgICBERUJVRy5jb25zb2xlLmFkZChgQ2xpY2sgc2Nyb2xsVG86IGV2ZW50LnByZXZlbnREZWZhdWx0KClgLCAnY2xpY2snKTtcclxuICAgICAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG4gICAgICAgICAgICAkdGhpcyA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayB0YXJnZXQgZWxlbWVudFxyXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldElEID0gXCIjXCIgKyAkdGhpcy5hdHRyKFwiZGF0YS1zY3JvbGxcIik7XHJcbiAgICAgICAgICAgICR0YXJnZXQgPSAkKHRhcmdldElEKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgalF1ZXJ5KSB7XHJcbiAgICAgICAgICAgICAgICAkdGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0SUQgPSBcIiNcIiArICR0YXJnZXQuYXR0cihcIklEXCIpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldElEID0gXCIjXCIgKyB0YXJnZXQ7XHJcbiAgICAgICAgICAgICAgICAkdGFyZ2V0ID0gJCh0YXJnZXRJRCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHNjcm9sbCBhbmltYXRpb24gaXMgZnJlZSB0byB1c2VcclxuICAgICAgICBpZiAoIWFjdGl2ZSkge1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgJHRhcmdldCBleGlzdFxyXG4gICAgICAgICAgICBpZiAoJHRhcmdldC5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBCbG9jayBvdGhlciBzY3JvbGwgdHJpZ2dlcnNcclxuICAgICAgICAgICAgICAgIGFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gR3JhYiB0YXJnZXQgdG9wIHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICB2YXJcclxuICAgICAgICAgICAgICAgIHRhcmdldFBvc2l0aW9uVG9wID0gJHRhcmdldC5vZmZzZXQoKS50b3AsXHJcbiAgICAgICAgICAgICAgICAvLyBTY3JvbGwgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgIHNjcm9sbFRvID0gdGFyZ2V0UG9zaXRpb25Ub3A7ICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBDYWxjdWxhdGUgc2Nyb2xsVGltZSBcclxuICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUaW1lID0gTWF0aC5yb3VuZChNYXRoLmFicyh0YXJnZXRQb3NpdGlvblRvcCAtIFNDUk9MTC50b3ApIC8gU0VUVElOR1MudGltZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsVGltZSA8IFNFVFRJTkdTLm1pblRpbWUpIFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRpbWUgPSBTRVRUSU5HUy5taW5UaW1lO1xyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNjcm9sbFRpbWUgPiBTRVRUSU5HUy5tYXhUaW1lKSBcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUaW1lID0gU0VUVElOR1MubWF4VGltZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgICAgICAgICAgICAgREVCVUcuY29uc29sZS5hZGQoYENsaWNrIHNjcm9sbFRvOiBzY3JvbGwgdG8gZWxlbWVudCB7dGFyZ2V0OiA8c3Ryb25nPiR7dGFyZ2V0SUR9PC9zdHJvbmc+OyBzcGVlZCA8c3Ryb25nPiR7c2Nyb2xsVGltZX1tczwvc3Ryb25nPjsgcG9zaXRpb246IDxzdHJvbmc+JHtzY3JvbGxUb308L3N0cm9uZz59YCwgJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQW5pbWF0ZSBzY3JvbGxcclxuICAgICAgICAgICAgICAgIEVMRU1FTlRTLiRib2R5LnNjcm9sbERpc2FibGUoKTtcclxuICAgICAgICAgICAgICAgIEVMRU1FTlRTLiRwYWdlLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG8sXHJcbiAgICAgICAgICAgICAgICB9LCAxMjAwLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgRUxFTUVOVFMuJGJvZHkuc2Nyb2xsRGlzYWJsZSgndW5kbycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBFTEVNRU5UUy4kcGFnZS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBzY3JvbGxUb3A6IHRhcmdldFBvc2l0aW9uVG9wIC0gRUxFTUVOVFMuJGhlYWRlci5vdXRlckhlaWdodCh0cnVlKSxcclxuICAgICAgICAgICAgICAgIC8vIH0sIHNjcm9sbFRpbWUsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBGVU5DVElPTlMub25Vc2VyU2Nyb2xsKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICAgICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKGBFcnJvciBzY3JvbGxUbzogZWxlbWVudCA8c3Ryb25nPiR7dGFyZ2V0SUR9PC9zdHJvbmc+IGRvZXNuJ3QgZXhpc3RgLCAnZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgICAgICBlbHNlIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgREVCVUcuY29uc29sZS5hZGQoYFdhcm5pbmcgc2Nyb2xsVG86IHNjcm9sbCBhbmltYXRpb24gd291bGRuJ3QgZmluaXNoYCwgJ3dhcm5pbmcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNjcm9sbCB0byBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0ge2pRdWVyeSBvYmplY3Q7IFN0cmluZyBJRH0gZWxlbWVudCBcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lIFxyXG4gICAgICogQHJldHVybiB7Qm9vbH1cclxuICAgICAqL1xyXG4gICAgdmFyXHJcbiAgICBvbiA9IChlbGVtZW50LCB0aW1lID0gZmFsc2UpID0+IHtcclxuICAgICAgICByZXR1cm4gc2Nyb2xsKGZhbHNlLCBlbGVtZW50LCB0aW1lKTtcclxuICAgIH07XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogUmVmcmVzaCBiaW5kZWQgJGVsZW1lbnRzXHJcbiAgICAgKi9cclxuICAgIHZhclxyXG4gICAgcmVmcmVzaCA9ICgpID0+IFxyXG4gICAge1xyXG5cclxuICAgICAgICBpZiAoJGVsZW1lbnRzKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICRlbGVtZW50cy5vZmYoXCJjbGlja1wiLCBzY3JvbGwpO1xyXG5cclxuICAgICAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgICAgIERFQlVHLmNvbnNvbGUuYWRkKFwiUmVmcmVzaDogc2Nyb2xsVG8ge2xlbmd0aDogXCIgKyAkZWxlbWVudHMubGVuZ3RoICsgXCI7fVwiKTtcclxuICAgICAgICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgJGVsZW1lbnRzID0gJChcIltkYXRhLXNjcm9sbF1cIik7XHJcbiAgICAgICAgJGVsZW1lbnRzLm9uKFwiY2xpY2tcIiwgc2Nyb2xsKTtcclxuXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgREVCVUcuY29uc29sZS5hZGQoXCJEYXRhOiBzY3JvbGxUbyB7bGVuZ3RoOiBcIiArICRlbGVtZW50cy5sZW5ndGggKyBcIjt9XCIpO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICAgIH07XHJcblxyXG4gICAgc3RhcnQoKTtcclxuICBcclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IChkYXRhKSA9PiB7XHJcblxyXG4gIHZhclxyXG4gICRpdGVtcyA9IG51bGw7XHJcblxyXG4gIHZhclxyXG4gIFRSQU5TSVRJT05IRUlHSFQsIFJFU0laRTtcclxuXHJcbiAgdmFyXHJcbiAgc3RhcnQgPSAoKSA9PiB7XHJcblxyXG4gICAgVFJBTlNJVElPTkhFSUdIVCA9IGRhdGEuVFJBTlNJVElPTkhFSUdIVDtcclxuICAgIFJFU0laRSA9IGRhdGEuUkVTSVpFO1xyXG5cclxuICAgIFJFU0laRS5hZGQoXCJzaG93TW9yZVwiLCAoKSA9PiB7XHJcbiAgICAgIHJlZnJlc2goKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJlZnJlc2goKTtcclxuICB9O1xyXG5cclxuICB2YXJcclxuICByZWZyZXNoID0gKCkgPT4ge1xyXG4gICAgaWYgKCRpdGVtcykge1xyXG4gICAgICAkaXRlbXMub2ZmKFwiY2xpY2tcIiwgY2xpY2spO1xyXG4gICAgfVxyXG4gICAgJGl0ZW1zID0gJChgW2RhdGE9J3Nob3dNb3JlJ11gKTtcclxuXHJcbiAgICBpZiAoJGl0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAkaXRlbXMuZWFjaCggKGluZGV4LCBlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgY2hlY2tWaXNpYmxlU3BhY2UoZWxlbWVudCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICB9O1xyXG5cclxuICB2YXJcclxuICBjaGVja1Zpc2libGVTcGFjZSA9IChlbGVtZW50KSA9PiB7XHJcbiAgICB2YXJcclxuICAgICR0aGlzID0gJChlbGVtZW50KSxcclxuICAgIGRhdGFUYXJnZXQgPSAkdGhpcy5hdHRyKCdkYXRhLXRhcmdldCcpLFxyXG4gICAgJHdyYXAsICRjb250YWluZXI7XHJcblxyXG4gICAgc3dpdGNoIChkYXRhVGFyZ2V0KSB7XHJcbiAgICAgIGNhc2UgXCJwcmV2RWxlbWVudFwiOlxyXG4gICAgICAgICR3cmFwID0gJHRoaXMucHJldigpO1xyXG4gICAgICAgICRjb250YWluZXIgPSAkd3JhcC5maW5kKFwiLnNob3ctbW9yZV9fY29udGVudFwiKS5maXJzdCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwibmV4dEVsZW1lbnRcIjpcclxuICAgICAgICAkd3JhcCA9ICR0aGlzLm5leHQoKTtcclxuICAgICAgICAkY29udGFpbmVyID0gJHdyYXAuZmluZChcIi5zaG93LW1vcmVfX2NvbnRlbnRcIikuZmlyc3QoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIFxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGxldCBcclxuICAgICAgICB3cmFwSWQgPSAkdGhpcy5hdHRyKGBkYXRhLXRhcmdldGApO1xyXG4gICAgICAgICR3cmFwID0gJChgIyR7d3JhcElkfWApO1xyXG4gICAgICAgICRjb250YWluZXIgPSAkd3JhcC5maW5kKFwiLnNob3ctbW9yZV9fY29udGVudFwiKS5maXJzdCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiAoJHdyYXAub3V0ZXJIZWlnaHQoIHRydWUgKSA8ICRjb250YWluZXIub3V0ZXJIZWlnaHQoIHRydWUgKSkge1xyXG4gICAgICAkdGhpcy5yZW1vdmVDbGFzcyhcImhpZGVcIik7XHJcbiAgICAgICR0aGlzLm9uKFwiY2xpY2tcIiwgeyR0aGlzfSwgY2xpY2spOyAgICAgICAgICBcclxuICAgIH0gXHJcbiAgICBlbHNlIHtcclxuICAgICAgJHRoaXMuYWRkQ2xhc3MoXCJoaWRlXCIpO1xyXG4gICAgfVxyXG5cclxuICB9O1xyXG5cclxuICB2YXJcclxuICBjbGljayA9IChwYXJhbURhdGEpID0+IHtcclxuICAgIHZhciBcclxuICAgIHBhcmFtID0gcGFyYW1EYXRhLmRhdGEsXHJcbiAgICAkdGhpcyA9IHBhcmFtLiR0aGlzLFxyXG4gICAgZGF0YVRhcmdldCA9ICR0aGlzLmF0dHIoYGRhdGEtdGFyZ2V0YCksXHJcbiAgICAkY29udGFpbmVyLFxyXG4gICAgJHdyYXA7XHJcblxyXG4gICAgc3dpdGNoIChkYXRhVGFyZ2V0KSB7XHJcbiAgICAgIGNhc2UgXCJwcmV2RWxlbWVudFwiOlxyXG4gICAgICAgICR3cmFwID0gJHRoaXMucHJldigpO1xyXG4gICAgICAgICRjb250YWluZXIgPSAkd3JhcC5maW5kKFwiLnNob3ctbW9yZV9fY29udGVudFwiKS5maXJzdCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwibmV4dEVsZW1lbnRcIjpcclxuICAgICAgICAkd3JhcCA9ICR0aGlzLm5leHQoKTtcclxuICAgICAgICAkY29udGFpbmVyID0gJHdyYXAuZmluZChcIi5zaG93LW1vcmVfX2NvbnRlbnRcIikuZmlyc3QoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIFxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgICRjb250YWluZXIgPSAkdGhpcztcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoJHRoaXMuaGFzQ2xhc3MoXCJqc19hY3RpdmVcIikpIHtcclxuICAgICAgb2ZmKCR0aGlzLCAkd3JhcCwgJGNvbnRhaW5lcik7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKCRjb250YWluZXIpO1xyXG4gICAgb24oJHRoaXMsICR3cmFwLCAkY29udGFpbmVyKTtcclxuICB9O1xyXG5cclxuICB2YXJcclxuICBvbiA9ICgkbGluaywgJGl0ZW0sICRjb250YWluZXIpID0+IHtcclxuXHJcbiAgICAkbGluay5hZGRDbGFzcyhcImpzX2FjdGl2ZVwiKTtcclxuXHJcbiAgICBUUkFOU0lUSU9OSEVJR0hULm9uKHtcclxuICAgICAgJHRoaXM6ICRpdGVtLCBcclxuICAgICAgJGNsaWNrZWQ6ICRsaW5rLFxyXG4gICAgICAkY29udGFpbmVyOiAkY29udGFpbmVyLCAgICAgICAgICAgIFxyXG4gICAgICBjYWxsYmFjazogKCkgPT4ge1xyXG4gICAgICAgICRpdGVtLmFkZENsYXNzKFwic2hvdy1tb3JlLS1hY3RpdmVcIik7XHJcbiAgICAgIH0sICBcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgXHJcbiAgdmFyXHJcbiAgb2ZmID0gKCRsaW5rLCAkaXRlbSwgJGNvbnRhaW5lcikgPT4ge1xyXG5cclxuICAgICRsaW5rLnJlbW92ZUNsYXNzKFwianNfYWN0aXZlXCIpO1xyXG5cclxuICAgIFRSQU5TSVRJT05IRUlHSFQub2ZmKHtcclxuICAgICAgJHRoaXM6ICRpdGVtLCBcclxuICAgICAgJGNvbnRhaW5lcjogJGNvbnRhaW5lciwgICAgXHJcbiAgICAgIGNhbGxiYWNrQmVmb3JlOiAoKSA9PiB7XHJcbiAgICAgICAgJGl0ZW0ucmVtb3ZlQ2xhc3MoXCJzaG93LW1vcmUtLWFjdGl2ZVwiKTtcclxuICAgICAgfSBcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIHN0YXJ0KCk7XHJcblxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gKGRhdGEpID0+IHtcclxuXHJcbiAgdmFyICBcclxuICAkRUxFTUVOVFMgPSB7XHJcbiAgICBsaW5rczogW10sXHJcbiAgfSxcclxuICBEQVRBID0gbnVsbCxcclxuICBTRVRUSU5HUyA9IHtcclxuICAgIG1hdGNoOiB7XHJcbiAgICAgIHN3aXRjaDogXCJ0YWItc3dpdGNoXCIsXHJcbiAgICAgIGZpZWxkOiBcInRhYi1maWVsZFwiLFxyXG4gICAgICBjb250ZW50OiBcInRhYi1jb250ZW50XCIsXHJcbiAgICB9LFxyXG4gIH07XHJcblxyXG4gIHZhclxyXG4gIHN0YXJ0ID0gKCkgPT4ge1xyXG4gICAgXHJcbiAgICAkLmV4dGVuZCggU0VUVElOR1MsIGRhdGEuU0VUVElOR1MgKTtcclxuXHJcbiAgICByZWZyZXNoKCk7XHJcbiAgfTtcclxuXHJcbiAgdmFyXHJcbiAgcmVmcmVzaCA9ICgpID0+IHtcclxuXHJcbiAgICBpZiAoJEVMRU1FTlRTLmxpbmtzLmxlbmd0aCkge1xyXG4gICAgICAkRUxFTUVOVFMubGlua3Mub2ZmKFwiY2xpY2tcIiwgY2hhbmdlVGFiKTtcclxuICAgIH1cclxuXHJcbiAgICAkRUxFTUVOVFMuZmllbGRzID0gJChgLiR7U0VUVElOR1MubWF0Y2guZmllbGR9YCk7XHJcblxyXG4gICAgZmlsbERhdGFiYXNlKCk7XHJcblxyXG4gICAgaWYgKCRFTEVNRU5UUy5saW5rcy5sZW5ndGgpIHtcclxuICAgICAgJEVMRU1FTlRTLmxpbmtzLm9uKFwiY2xpY2tcIiwgY2hhbmdlVGFiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgIERFQlVHLmNvbnNvbGUuYWRkKGB0YWJzIDogcmVmcmVzaCB7bGVuZ3RoICR7JEVMRU1FTlRTLmZpZWxkcy5sZW5ndGh9fWApO1xyXG4gICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG5cclxuICB9O1xyXG5cclxuICB2YXJcclxuICBmaWxsRGF0YWJhc2UgPSAoKSA9PiB7XHJcblxyXG4gICAgREFUQSA9IHt9O1xyXG5cclxuICAgICRFTEVNRU5UUy5maWVsZHMuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcclxuICAgICAgXHJcbiAgICAgIHZhclxyXG4gICAgICAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgIGZpZWxkID0gJHRoaXMuYXR0cihcImRhdGEtdGFicy1maWVsZFwiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgIERBVEFbZmllbGRdID0ge1xyXG4gICAgICAgIHN3aXRjaEFjdGl2ZTogbnVsbCxcclxuICAgICAgICBjb250ZW50QWN0aXZlOiBudWxsLFxyXG4gICAgICB9O1xyXG4gICAgICBcclxuICAgIH0pO1xyXG5cclxuICB9O1xyXG5cclxuICB2YXJcclxuICBjaGFuZ2VUYWIgPSAoKSA9PiB7XHJcblxyXG5cclxuXHJcbiAgfTtcclxuXHJcbiAgXHJcbiAgICAvLyAvLyBGdW5jdGlvbiBmb3IgY2xpY2tlZCBlbGVtZW50c1xyXG4gICAgLy8gb25DbGljazogZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgIHZhciBzZWxmID0gTWFpbi50YWJzO1xyXG4gICAgICBcclxuICAgIC8vICAgdmFyICR0aGlzID0gJCh0aGlzKSxcclxuICAgIC8vICAgICAgIGRhdGFUYWJzID0gJHRoaXMuYXR0cignZGF0YS10YWJzJyksXHJcbiAgICAvLyAgICAgICBkYXRhVGFic1N0ZXAgPSAkdGhpcy5hdHRyKCdkYXRhLXRhYnMtc3RlcCcpO1xyXG4gIFxyXG4gICAgLy8gICBpZiAoc2VsZi5kYXRhW2RhdGFUYWJzXS5hY3RpdmUgIT09IGRhdGFUYWJzU3RlcCkge1xyXG4gIFxyXG4gICAgLy8gICAgIHZhciBkYXRhID0gc2VsZi5kYXRhW2RhdGFUYWJzXSxcclxuICAgIC8vICAgICAgICAgY29udGVudEhlaWdodCA9IGRhdGEuJGFjdGl2ZUNvbnRlbnQub3V0ZXJIZWlnaHQoIHRydWUgKTtcclxuICBcclxuICAgIC8vICAgICBpZiAoIWRhdGEuYmxvY2spIHtcclxuICAgIC8vICAgICAgIGRhdGEuYmxvY2sgPSB0cnVlO1xyXG4gIFxyXG4gICAgLy8gICAgICAgdmFyICRjbGlja2VkVGFiID0gZGF0YS4kaXRlbXMuZXEoZGF0YVRhYnNTdGVwKTtcclxuICAgIFxyXG4gICAgLy8gICAgICAgJGNsaWNrZWRUYWIuYWRkQ2xhc3MoXCJqc190YWJzLS1hY3RpdmVcIik7XHJcbiAgXHJcbiAgICAvLyAgICAgICBkYXRhLiRhY3RpdmVDb250ZW50LmNzcyh7aGVpZ2h0OiBjb250ZW50SGVpZ2h0fSk7XHJcbiAgICAvLyAgICAgICBkYXRhLiRjb250ZW50LmNzcyh7aGVpZ2h0OiBjb250ZW50SGVpZ2h0fSk7XHJcbiAgICAvLyAgICAgICBkYXRhLiRhY3RpdmVDb250ZW50LnJlbW92ZUNsYXNzKFwianNfdGFicy0tYWN0aXZlXCIpO1xyXG4gICAgXHJcbiAgICAvLyAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgIFxyXG4gICAgLy8gICAgICAgICBkYXRhLiRhY3RpdmVDb250ZW50LmNzcygnaGVpZ2h0JywgJycpO1xyXG4gICAgLy8gICAgICAgICBkYXRhLiRhY3RpdmVUYWIucmVtb3ZlQ2xhc3MoXCJqc190YWJzLS1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgLy8gICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgIFxyXG4gICAgLy8gICAgICAgICAgIGRhdGEuJGFjdGl2ZUNvbnRlbnQgPSBkYXRhLiRjb250ZW50SXRlbXMuZXEoZGF0YVRhYnNTdGVwKTtcclxuICAgIC8vICAgICAgICAgICBkYXRhLiRhY3RpdmVUYWIgPSAkY2xpY2tlZFRhYjtcclxuICAgIFxyXG4gICAgLy8gICAgICAgICAgIGNvbnRlbnRIZWlnaHQgPSBkYXRhLiRhY3RpdmVDb250ZW50LmNoaWxkcmVuKCkub3V0ZXJIZWlnaHQoIHRydWUgKTtcclxuICAgIC8vICAgICAgICAgICBkYXRhLiRjb250ZW50LmNzcyh7aGVpZ2h0OiBjb250ZW50SGVpZ2h0fSk7XHJcbiAgICAvLyAgICAgICAgICAgZGF0YS4kYWN0aXZlQ29udGVudC5jc3Moe2hlaWdodDogY29udGVudEhlaWdodH0pO1xyXG4gICAgXHJcbiAgICAvLyAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICBcclxuICAgIC8vICAgICAgICAgICAgIGRhdGEuJGFjdGl2ZUNvbnRlbnQuYWRkQ2xhc3MoXCJqc190YWJzLS1hY3RpdmVcIik7XHJcbiAgICAvLyAgICAgICAgICAgICBkYXRhLiRhY3RpdmVDb250ZW50LmNzcygnaGVpZ2h0JywgJycpO1xyXG4gICAgLy8gICAgICAgICAgICAgZGF0YS4kY29udGVudC5jc3MoJ2hlaWdodCcsICcnKTtcclxuICAgIFxyXG4gICAgLy8gICAgICAgICAgICAgZGF0YS5ibG9jayA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgLy8gICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgIFxyXG4gICAgLy8gICAgICAgICB9LCAyMDApO1xyXG4gICAgXHJcbiAgICAvLyAgICAgICB9LCAxKTtcclxuICBcclxuICAgIC8vICAgICAgIC8qIHRlc3QtY29kZSAqL1xyXG4gICAgLy8gICAgICAgbGV0IG5hbWUgPSAnVGFicyAnICsgZGF0YVRhYnMgKyAnIGFjdGl2ZSc7XHJcbiAgICAvLyAgICAgICBsZXQgZGVidWdPYmplY3QgPSB7fTtcclxuICAgIC8vICAgICAgIGRlYnVnT2JqZWN0W25hbWVdID0gZGF0YVRhYnNTdGVwO1xyXG4gICAgLy8gICAgICAgTWFpbi5kZWJ1Z1ZhcmlhYmxlcy5hZGQoZGVidWdPYmplY3QpO1xyXG4gICAgLy8gICAgICAgLyogZW5kLXRlc3QtY29kZSAqL1xyXG4gIFxyXG4gICAgLy8gICAgIH0gXHJcbiAgICAvLyAgICAgZGF0YS5hY3RpdmUgPSBkYXRhVGFic1N0ZXA7XHJcbiAgICAvLyAgIH1cclxuICBcclxuICAgIC8vICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgLy8gfSxcclxuICBcclxuICAgIC8vIGFkZChkYXRhVGFicywgc2V0dGluZ3MgPSBudWxsKSB7XHJcblxyXG4gICAgLy8gICB2YXIgc2VsZiA9IE1haW4udGFicztcclxuICBcclxuICAgIC8vICAgdmFyICRpdGVtcyA9ICQoJ1tkYXRhLXRhYnM9XCInKyBkYXRhVGFicyArJ1wiXScpO1xyXG4gIFxyXG4gICAgLy8gICBpZiAoJGl0ZW1zLmxlbmd0aCkge1xyXG4gIFxyXG4gICAgLy8gICAgIHZhciAkY29udGVudCA9ICQoJ1tkYXRhLXRhYnMtY29udGVudD1cIicrIGRhdGFUYWJzICsnXCJdJyksXHJcbiAgICAvLyAgICAgICAgIG91dHB1dCA9IHt9O1xyXG4gIFxyXG4gICAgLy8gICAgIG91dHB1dCA9IHt9O1xyXG4gICAgLy8gICAgIG91dHB1dC4kaXRlbXMgPSAkaXRlbXM7XHJcbiAgICAvLyAgICAgb3V0cHV0LiRjb250ZW50ID0gJGNvbnRlbnQ7XHJcbiAgICAvLyAgICAgb3V0cHV0LiRjb250ZW50SXRlbXMgPSAkY29udGVudC5maW5kKFwiW2RhdGEtdGFicy1jb250ZW50LXN0ZXBdXCIpO1xyXG4gICAgLy8gICAgIG91dHB1dC5ibG9jayA9IGZhbHNlO1xyXG4gIFxyXG4gICAgLy8gICAgIHZhciAkYWN0aXZlQ29udGVudCA9ICRjb250ZW50LmZpbmQoXCIuanNfdGFicy0tYWN0aXZlXCIpO1xyXG4gICAgICAgIFxyXG4gICAgLy8gICAgIGlmICgkYWN0aXZlQ29udGVudC5sZW5ndGgpIHtcclxuICAgIC8vICAgICAgIG91dHB1dC4kYWN0aXZlQ29udGVudCA9ICRhY3RpdmVDb250ZW50O1xyXG4gICAgLy8gICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICBvdXRwdXQuJGFjdGl2ZUNvbnRlbnQgPSBmYWxzZTtcclxuICAgIC8vICAgICB9XHJcbiAgXHJcbiAgICAvLyAgICAgdmFyICRhY3RpdmVUYWIgPSAkaXRlbXMucGFyZW50KCkuZmluZChcIi5qc190YWJzLS1hY3RpdmVcIik7XHJcbiAgICAgICAgXHJcbiAgICAvLyAgICAgaWYgKCRhY3RpdmVUYWIubGVuZ3RoKSB7XHJcbiAgICAvLyAgICAgICBvdXRwdXQuJGFjdGl2ZVRhYiA9ICRhY3RpdmVUYWI7XHJcbiAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgIG91dHB1dC4kYWN0aXZlVGFiID0gZmFsc2U7XHJcbiAgICAvLyAgICAgfVxyXG4gIFxyXG4gICAgLy8gICAgIHNlbGYuZGF0YVtkYXRhVGFic10gPSBvdXRwdXQ7XHJcbiAgXHJcbiAgICAvLyAgICAgJGl0ZW1zLm9uKFwiY2xpY2tcIiwgc2VsZi5vbkNsaWNrKTtcclxuICBcclxuICAgIC8vICAgICAvKiB0ZXN0LWNvZGUgKi9cclxuICAgIC8vICAgICBpZiAoKHR5cGVvZiBvdXRwdXQuJGFjdGl2ZVRhYiA9PT0gJ29iamVjdCcpICsgKHR5cGVvZiBvdXRwdXQuJGFjdGl2ZUNvbnRlbnQgPT09ICdvYmplY3QnKSA9PT0gMikge1xyXG4gICAgLy8gICAgICAgbGV0IG5hbWUgPSBcIlRhYnMgXCIgKyBkYXRhVGFicyArIFwiIGFjdGl2ZVwiO1xyXG4gICAgLy8gICAgICAgbGV0IGRlYnVnT2JqZWN0ID0ge307XHJcbiAgICAvLyAgICAgICBkZWJ1Z09iamVjdFtuYW1lXSA9IG91dHB1dC4kYWN0aXZlVGFiLmF0dHIoXCJkYXRhLXRhYnMtc3RlcFwiKTtcclxuICAgIC8vICAgICAgIE1haW4uZGVidWdWYXJpYWJsZXMuYWRkKGRlYnVnT2JqZWN0KTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgTWFpbi5kZWJ1Z0NvbnNvbGUuYWRkKFwiQWRkIHRhYnMgJ1wiICsgZGF0YVRhYnMgKyBcIicge2xlbmd0aDogXCIrICRpdGVtcy5sZW5ndGggK1wiO31cIik7XHJcbiAgICAvLyAgICAgaWYgKCRpdGVtcy5sZW5ndGggIT09IG91dHB1dC4kY29udGVudEl0ZW1zLmxlbmd0aCkge1xyXG4gICAgLy8gICAgICAgTWFpbi5kZWJ1Z0NvbnNvbGUuYWRkKFwiVGFicyAnXCIgKyBkYXRhVGFicyArIFwiJyAtIGxlbmd0aCBkbyBub3QgbWF0Y2gge3RhYnM6IFwiICsgJGl0ZW1zLmxlbmd0aCArIFwiOyBjb250ZW50czogXCIgKyBvdXRwdXQuJGNvbnRlbnRJdGVtcy5sZW5ndGggKyBcIjt9XCIsIFwid2FybmluZ1wiKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgaWYgKCh0eXBlb2Ygb3V0cHV0LiRhY3RpdmVUYWIgPT09ICdvYmplY3QnKSArICh0eXBlb2Ygb3V0cHV0LiRhY3RpdmVDb250ZW50ID09PSAnb2JqZWN0JykgPT09IDEpIHtcclxuICAgIC8vICAgICAgIE1haW4uZGVidWdDb25zb2xlLmFkZChcIlRhYnMgJ1wiICsgZGF0YVRhYnMgKyBcIicgLSBhY3RpdmUgY2xhc3MgZG8gbm90IG1hdGNoIHthY3RpdmVUYWI6IFwiICsgb3V0cHV0LiRhY3RpdmVUYWIgKyBcIjsgJGFjdGl2ZUNvbnRlbnQ6IFwiICsgb3V0cHV0LiRhY3RpdmVDb250ZW50ICsgXCI7fVwiLCBcIndhcm5pbmdcIik7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuICBcclxuICAgIC8vICAgfVxyXG4gIFxyXG4gICAgLy8gfVxyXG5cclxuICAgIHN0YXJ0KCk7XHJcblxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gKGRhdGEpID0+IHtcclxuXHJcbiAgICB2YXJcclxuICAgIERBVEEgPSBbXSwgICAgICAvKiBPcGVuZWQgKHRyYW5zaXRpb25lZCBvbikgalF1ZXJ5IGVsZW1lbnRzICovXHJcbiAgICBCUk9XU0VSOyAgICAgICAgLyogYnJvd3Nlci5qcyBkYXRhICovXHJcblxyXG4gICAgdmFyXHJcbiAgICBzdGFydCA9ICgpID0+IHtcclxuICAgICAgICBCUk9XU0VSID0gZGF0YS5CUk9XU0VSO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRvZ2dsZSB0cmFuc2l0aW9uIGhlaWdodFxyXG4gICAgICovXHJcbiAgICB2YXJcclxuICAgIHRvZ2dsZSA9IChvcHRpb25zKSA9PiB7XHJcblxyXG4gICAgICAgIGxldFxyXG4gICAgICAgIGFjdGl2ZSA9IG51bGw7XHJcblxyXG4gICAgICAgICQuZWFjaChEQVRBLCBmdW5jdGlvbiAoaW5kZXhJbkFycmF5LCB2YWx1ZU9mRWxlbWVudCkgeyBcclxuICAgICAgICAgICAgIGlmICggb3B0aW9ucy4kY2xpY2tlZC5pcyh2YWx1ZU9mRWxlbWVudCkgKSB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmUgPSB2YWx1ZU9mRWxlbWVudDsgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7ICAgICAgICAgXHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgICAgICAgREFUQS5zcGxpY2UoIG9wdGlvbnMuJGNsaWNrZWQsIDEgKTsgICAgIFxyXG4gICAgICAgICAgICBvZmYob3B0aW9ucyk7ICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgREFUQS5wdXNoKCBvcHRpb25zLiRjbGlja2VkICk7ICAgXHJcbiAgICAgICAgICAgIG9uKG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIHRyYW5zaXRpb25cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFxyXG4gICAgICogJHRoaXMge2pRdWVyeSBvYmplY3R9IFxyXG4gICAgICogdGltZSB7TnVtYmVyfVxyXG4gICAgICogY2FsbGJhY2sge0Z1bmN0aW9ufSBcclxuICAgICAqL1xyXG4gICAgdmFyXHJcbiAgICBvbiA9IChwYXJhbSkgPT4ge1xyXG4gICAgICAgIHZhclxyXG4gICAgICAgICRjaGlsZCwgaGVpZ2h0O1xyXG5cclxuICAgICAgICBpZiAocGFyYW0uJGNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICBoZWlnaHQgPSBwYXJhbS4kY29udGFpbmVyLmNoaWxkcmVuKCkub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJGNoaWxkID0gcGFyYW0uJHRoaXMuY2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgaGVpZ2h0ID0gJGNoaWxkLm91dGVySGVpZ2h0KHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgREVCVUcuY29uc29sZS5hZGQoYENsaWNrZWQgXCJTaG93IG1vcmVcIiBvbiB7JGNvbnRhaW5lciAke2hlaWdodH19YCwgXCJjbGlja1wiKTtcclxuICAgICAgICAvKiBlbmQtdGVzdC1jb2RlICovXHJcblxyXG4gICAgICAgIHBhcmFtLiRjbGlja2VkXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcyhcImpzX2V4cGFuZF9fbGluay0tYWN0aXZlXCIpO1xyXG5cclxuICAgICAgICBwYXJhbS4kY29udGFpbmVyXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcyhcImpzX3RyYW5zaXRpb25IZWlnaHRcIilcclxuICAgICAgICAgICAgLmNzcygnaGVpZ2h0JywgaGVpZ2h0KVxyXG4gICAgICAgICAgICAub25lKEJST1dTRVIudHJhbnNpdGlvbkV2ZW50LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHBhcmFtLiRjb250YWluZXJcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJqc190cmFuc2l0aW9uSGVpZ2h0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKFwianNfZXhwYW5kX19jb250YWluZXItLWFjdGl2ZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsICcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW0uY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAocGFyYW0uY2FsbGJhY2soKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhclxyXG4gICAgb2ZmID0gKHBhcmFtKSA9PiB7XHJcblxyXG4gICAgICAgIHZhclxyXG4gICAgICAgIGhlaWdodCA9IHBhcmFtLiRjb250YWluZXIub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLyogdGVzdC1jb2RlICovXHJcbiAgICAgICAgREVCVUcuY29uc29sZS5hZGQoYENsaWNrZWQgXCJTaG93IG1vcmVcIiBvZmZgLCBcImNsaWNrXCIpO1xyXG4gICAgICAgIC8qIGVuZC10ZXN0LWNvZGUgKi9cclxuXHJcbiAgICAgICAgcGFyYW0uJGNsaWNrZWRcclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwianNfZXhwYW5kX19saW5rLS1hY3RpdmVcIik7XHJcbiAgICAgICBcclxuICAgICAgICBwYXJhbS4kY29udGFpbmVyXHJcbiAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsIGhlaWdodClcclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwianNfZXhwYW5kX19jb250YWluZXItLWFjdGl2ZVwiKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoXCJqc190cmFuc2l0aW9uSGVpZ2h0XCIpXHJcbiAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsICcnKVxyXG4gICAgICAgICAgICAub25lKEJST1dTRVIudHJhbnNpdGlvbkV2ZW50LCAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgcGFyYW0uJGNvbnRhaW5lclxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcImpzX2V4cGFuZF9fY29udGFpbmVyLS1jbG9zZSBqc190cmFuc2l0aW9uSGVpZ2h0XCIpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKHBhcmFtLmNhbGxiYWNrKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXJ0KGRhdGEpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdG9nZ2xlOiB0b2dnbGUsXHJcbiAgICAgICAgb246IG9uLFxyXG4gICAgICAgIG9mZjogb2ZmLFxyXG4gICAgfTtcclxuXHJcbn07XHJcbiJdfQ==
