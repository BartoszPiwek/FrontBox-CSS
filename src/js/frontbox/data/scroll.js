module.exports = (data) => {

    var 
    DATA = {},
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
        DEBUG.variable.add({
            "Scroll top ": DATA.top,
            "Scroll center ": DATA.center,
            "Scroll center last ": DATA.centerLast,
            "Scroll direction ": DATA.direction,
            "Scroll speed ": DATA.speed,
        });
        /* end-test-code */
    };

    bind();

    return DATA;
};