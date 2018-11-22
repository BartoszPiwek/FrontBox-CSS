/**
 * Device module
 * @return {object} width, height, responsive, portable
 */

module.exports = (argument) => {
    
    /* Output data */
    var _ = {
        width               : null,
        height              : null,
        responsive          : null,
        portable            : null,
    };

    /* Prepare arguments module */
    var 
    BREAKPOINTS             = null,
    ELEMENTS                = null,
    RESIZE                  = null;

    /* Start module */
    const start = () => {

        /* Set arguments module */
        BREAKPOINTS     = argument.BREAKPOINTS;
        ELEMENTS        = argument.ELEMENTS;
        RESIZE          = argument.RESIZE;

        /* Fill once variables */
        _.portable = getMobileOperatingSystem();
        
        /* Run */
        refresh();

        /* Bind */
        ELEMENTS.$window.on('resize orientationchange', refresh);
    };

    /* Refresh module */
    const refresh = () => {

        /* Prepare variables */
        let
        width               = ELEMENTS.$window.outerWidth(),
        lastWidth           = _.width,
        height              = ELEMENTS.$window.outerHeight(),
        lastHeight          = _.height,
        lastOrientation     = _.orientation;

        /* Set variables */
        _.width             = width;
        _.height            = height;
        _.responsive        = null;

        /* Check orientation */
        if (window.matchMedia("(orientation: portrait)").matches) {
            _.orientation = 'portrait';
        }
        else {
            _.orientation = 'landscape';
        }
        /**
         * Don't refresh page if user change tab 
         * @browser Opera
         */ 
        if (lastWidth === width && lastHeight === height && lastOrientation) {
            return false;
        }

        /* Check breakpoint */ 
        for (const key in BREAKPOINTS) {
            const value = BREAKPOINTS[key];
            
            if (window.matchMedia(`(min-width: ${value}px)`).matches) {
                _.responsive = key;
                break;
            }
        }
        if (!_.responsive) {
            _.responsive = 'mobile';
        }

        /* Trigger resize queue (ignore first time) */
        if (lastWidth) {
            if ( _.portable ) {
                if ( lastOrientation != _.orientation ) {
                    RESIZE.trigger('width');
                }
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
    const getMobileOperatingSystem = () => {

        let userAgent = navigator.userAgent || navigator.vendor || window.opera;

        /* test-code */
        DEBUG.console.add(`userAgent: ${userAgent}`);
        /* end-test-code */
        
        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return 'Windows Phone';
        }
      
        if (/android/i.test(userAgent)) {
            return 'Android';
        }
      
        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return 'iOS';
        }

        // PHP user agent
        if (ELEMENTS.$body.hasClass('device-portable')) {
            return true;
        }
      
        return false;
    };
    
    /* test-code */
    DEBUG.variable.add('device', _);
    /* end-test-code */

    start();

    return _;
};