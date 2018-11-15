module.exports = (data) => {

    var 
    DATA = {
        lastCenter          : null,
        center              : null,
        top                 : null,
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
        DATA.lastCenter = DATA.center || 0;

        DATA.top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        DATA.center = DATA.top + DEVICE.height / 2;

        DATA.speed = Math.abs(DATA.lastCenter - DATA.center);

        if (DATA.center > DATA.lastCenter) {
            DATA.direction = "down";
        } else {
            DATA.direction = "up";
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