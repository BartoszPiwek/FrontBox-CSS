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