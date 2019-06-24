/*=========================================================================
|| fullPage.js | One Page Scroll sections Site Plugin
|| https://github.com/alvarotrigo/fullPage.js/
=========================================================================*/
module.exports = (argument) => {
    'use strict';

    /* Check if start module */
    const $items = $("#fullpage");
    if ( !$items.length ) {
        return false;
    }

    /* Prepare arguments module */
    var 
    RESIZE                  = null;

    /* Prepare main variables */

    const
    licenceKey = 'OPEN-SOURCE-GPLV3-LICENSE';
    var
    isRun = false,
    lockSlider = false;
    lastOrientation = 'down';

    const start = () => {
        RESIZE          = argument.RESIZE;
    };

    const refresh = () => {

        if (isRun) {
            isRun = false;
            fullpage_api.destroy('all');
        }

        /* Run only for desktop view */
        if (DEVICE.responsiveNumber === 0) {

            ELEMENTS.$body.addClass("fullpage--loaded");
            ELEMENTS.$body.attr('fullpage-orientation', lastOrientation);
            isRun = true;
        }
    };

    start();

};