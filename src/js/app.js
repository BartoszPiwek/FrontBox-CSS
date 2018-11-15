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