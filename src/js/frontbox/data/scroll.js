module.exports = (argument) => {

    /* Output data */
    var _ = {
        top                 : null,
        begin               : null,
        center              : null,
        speed               : null,
        direction           : null,
    };

    /* Prepare arguments module */
    var
    DEVICE                  = null,
    ELEMENTS                = null;

    /* Start module */
    const start = () => {

        /* Set arguments module */
        ELEMENTS        = argument.ELEMENTS;
        DEVICE          = argument.DEVICE;

        /* Run */
        refresh();
        
        /* Bind */
        ELEMENTS.$window.scroll( refresh );
        ELEMENTS.$window.on('resize orientationchange', () => {
            refresh();
        });

    };

    /* Refresh module */
    const refresh = () => {

        /* Prepare variables */
        let 
        lastCenter           = _.center || 0;
        
        /* Set variables */
        _.top                = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        _.center             = _.top + DEVICE.height / 2;
        _.begin              = _.top;
        _.bottom             = _.top + DEVICE.height;
        _.speed              = Math.abs(lastCenter - _.center);

        // TODO get sticky top height from module PAGE
        if (ELEMENTS.$header.length) {
            _.begin += ELEMENTS.$header.outerHeight( true );
        }

        /* Check scroll direction */
        if (_.center > _.lastCenter) {
            _.direction = "down";
        }
        else {
            _.direction = "up";
        }

        /* test-code */
        DEBUG.variable.refresh('scroll');
        /* end-test-code */
    };

    /* test-code */
    DEBUG.variable.add('scroll', _);
    /* end-test-code */

    start();

    return _;
};