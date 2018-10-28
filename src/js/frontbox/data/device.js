module.exports = () => {

    var DATA = {};

    var bind = () => {

        $(window).on('resize orientationchange', function() {
            refresh();
        });

        refresh();
    };

    var refresh = () => {
        var $window = $(window);

        // Fill width and height value
        DATA.prevWidth = DATA.width;
        DATA.width = $window.width();
        DATA.height = $window.height();
        DATA.heightHalf = DATA.height / 2;

        // Set responsive size
        if (DATA.width > 1024) {
            DATA.responsive = 0;
        } else if (DATA.width > 768) {
            DATA.responsive = 1;
        } else {
            DATA.responsive = 2;
        }

        /* test-code */
        var debugBox = {
            "Page width ": DATA.width,
            "Page height ": DATA.height,
            "Page responsive ": DATA.responsive,
        };
        DEBUG.debugVariables.add(debugBox);
        /* end-test-code */
    };

    bind();

    return DATA;

};