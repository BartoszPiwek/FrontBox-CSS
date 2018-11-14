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