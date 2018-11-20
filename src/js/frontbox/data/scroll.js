module.exports = (argument) => {

    /* Output data */
    var 
    _ = {
        lastCenter          : null,
        center              : null,
        top                 : null,
        speed               : null,
        direction           : null,
    };

    /* Prepare arguments module */
    var
    DEVICE                  = null,
    ELEMENTS                = null;

    /* Start module */
    var start = () => {

        /* Set arguments module */
        ELEMENTS = argument.ELEMENTS;
        DEVICE = argument.DEVICE;

        /* Run */
        refresh();
        
        /* Bind */
        ELEMENTS.$window.scroll(refresh);
        ELEMENTS.$window.on('resize orientationchange', function() {
            refresh();
        });

    };

    /* Refresh module */
    var refresh = () => {

        /* Calculate container */
        _.lastCenter         = _.center || 0;
        _.top                = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        _.center             = _.top + DEVICE.height / 2;
        _.begin              = _.top;
        _.bottom             = _.top + DEVICE.height;
        _.speed              = Math.abs(_.lastCenter - _.center);

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