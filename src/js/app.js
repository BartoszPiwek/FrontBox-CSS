/**
 * Libs
 */
global.$ = require('jquery');
global.jQuery = $;
// slick = require('slick-carousel');

(function($, _) {
    'use strict';

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
     * Helpful
     */
    var FUNCTIONS = require('./frontbox/functions');
    var DEVICE = require('./frontbox/data/device')();
    var SCROLL = require('./frontbox/data/scroll')({
        DEVICE: DEVICE
    });

    var burger = require('./frontbox/header/burgerButton')({
        ELEMENTS: ELEMENTS,
    });
    var headerSticky = require('./frontbox/header/sticky')({
        ELEMENTS: ELEMENTS,
        SCROLL: SCROLL,
        SETTINGS: {
            placeholder: false,
            offset: false,
        },
        $elementSpy: $("#sticky-element"),
    });

    // Slick
    var $slick = $(".slider");
    if ($slick.length) {
        $slick.slick({
            dots: true,
            infinite: true,
            slidesToShow: 1,
            arrows: false,
        });
    }

    
     /**
      * Main
      */


     // /**
     //  * Header
     //  */
     //
     // Main.headerBurger.start();

     // if (Main.ELEMENTS.$header.length) {
     //     Main.navbar = require('frontbox/header/navbar');
     //     Main.navbar.start();
     // }

     /**
      * Form
      */
     // Main.formInputCounter = require('frontbox/form/input-counter');
     // Main.formInputCounter.start();

     /**
      * Fallback
      */

     // // Calculate vertical units
     // Main.vUnits = require('frontbox/fallback/v-units');
     // Main.vUnits.start();

     // /**
     //  * Binds
     //  */

    // Delay functions trigger for page resize
    // Main.bindResize = require('./frontbox/bind/resize');
    // Main.bindResize.onResizeBind();

     // var log = () => {
     //     console.log("log!");
     // };
     // Main.bindResize.add("name", log );

     // /**
     //  * Other
     //  */
     // // Main.tabs = require('frontbox/tabs');
     // // Main.tabs.add("main");

     // // ! Required 'frontbox/functions'
     var scrollTo = require('./frontbox/scrollTo')({
        ELEMENTS: ELEMENTS,
        SCROLL: SCROLL,
        FUNCTIONS: FUNCTIONS,
     });

     // Main.listVerticalScroll = require('frontbox/listVerticalScroll');
     // Main.listVerticalScroll.start();

     /**
      * Elements
      */
     // Main.showMore = require('./frontbox/showMore');
     // Main.showMore.start();

    /* test-code */
    DEBUG.debugConsole.add("Running correct...");
    /* end-test-code */

    // Inform stylesheed to remove style fallback for JavaScript elements
    ELEMENTS.$html.removeClass("no_js");

})($, window);
