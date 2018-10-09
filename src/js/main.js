/**
  * Main
 */
var Main = {};
global.$ = require('jquery');

global.ELEMENTS = {
    $body: $("body"),
    $header: $("#header"),
    $headerPlaceholder: $("#header-placeholder"),
    $window: $(window),
    $overlay: $("#page-overlay"),
    $html: $('html'),
    $page: $('html, body'),
};
global.DEVICE = {
    height: 0,
    width: 0,
    prevWidth: 0,
    heightHalf: 0,
    responsive: 0,
};
global.SCROLL = {
    top: 0,
    center: 0,
    centerLast: 0,
    direction: 0,
    speed: 0,
};

/**
 * Modules
 */

// Debug
/* test-code */ 
global.DEBUG = {};
global.DEBUG.debugConsole = require('./frontbox/debug/console');
global.DEBUG.debugConsole.start({
    open: false,
});
global.DEBUG.debugVariables = require('./frontbox/debug/variables');
global.DEBUG.debugVariables.start({
    open: false,
});
/* end-test-code */

// Helpful
global.FUNCTION = require('./frontbox/functions');
Main.dataScroll = require('./frontbox/data/scroll');
Main.dataScroll.bind();
Main.dataPage = require('./frontbox/data/page');
Main.dataPage.bind();

Main.headerBurger = require('./frontbox/header/burger');
if (ELEMENTS.$header.length) {
    Main.navbar = require('./frontbox/header/navbar');
    Main.navbar.start({
        offset: 200,
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
Main.bindResize = require('./frontbox/bind/resize');
Main.bindResize.onResizeBind();

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
    // Main.scrollTo = require('frontbox/scrollTo');
    // Main.scrollTo.start();

    // Main.listVerticalScroll = require('frontbox/listVerticalScroll');
    // Main.listVerticalScroll.start();

    /**
     * Elements
     */
    Main.showMore = require('./frontbox/showMore');
    Main.showMore.start();

    /**
     * Wordpress
     */
    // Main.wpLoadMorePosts = require('frontbox/wordpress/load-more-posts');
    // Main.wpLoadMorePosts.start();
    // /**
    //  * Wordpress
    //  */
    // // Main.wpLoadMorePosts = require('frontbox/wordpress/load-more-posts');
    // // Main.wpLoadMorePosts.start();

/* test-code */
DEBUG.debugConsole.add("Running correct...");
/* end-test-code */

// Inform stylesheed to remove style fallback for JavaScript elements
ELEMENTS.$html.removeClass("no_js");