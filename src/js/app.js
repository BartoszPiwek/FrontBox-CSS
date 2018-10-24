/**
 * Libs
 */
global.$ = require('jquery');
global.jQuery = $;
// global.Cookies = require('js-cookie');
// require('slick-carousel');
// require('select2')();
// require('./frontbox/libs/getStyle');

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

    global.DEBUG.debugConsole = require('./frontbox/debug/console')({
        open: false,
        ELEMENTS: ELEMENTS,
    });
    global.DEBUG.debugVariables = require('./frontbox/debug/variables')({
        open: false,
        ELEMENTS: ELEMENTS,
    });
    /* end-test-code */

    /**
     * Required
     */
    var FUNCTIONS = require('./frontbox/functions');
    var DEVICE = require('./frontbox/data/device')();
    var BROWSER = require('./frontbox/data/browser')();
    var SCROLL = require('./frontbox/data/scroll')({
        DEVICE: DEVICE
    });

    /**
     * CSS Variables
     * 
     * Usage CSS.getPropertyValue("--mobile")
     */
    const
    CSS = getComputedStyle(document.body);
    
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
    DEBUG.debugConsole.add("Running correct...");
    /* end-test-code */

    // Inform stylesheed to remove style fallback for JavaScript elements
    ELEMENTS.$html.removeClass("no_js");

})($, window);
