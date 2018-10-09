module.exports = {

    bind() {
        var self = this;
        $(window).on('resize orientationchange', function() {
            self.refresh();
        });
        self.refresh();
    },

    refresh() {
        var $window = $(window);

        // Fill width and height value
        DEVICE.prevWidth = DEVICE.width;
        DEVICE.width = $window.width();
        DEVICE.height = $window.height();
        DEVICE.heightHalf = DEVICE.height / 2;

        // Set responsive size
        if (window.matchMedia('(min-width: 1024px)').matches) {
            DEVICE.responsive = 0;
        } else if (window.matchMedia('(min-width: 768px)').matches) {
            DEVICE.responsive = 1;
        } else {
            DEVICE.responsive = 2;
        }

        /* test-code */
        var debugBox = {
            "Page width ": DEVICE.width,
            "Page height ": DEVICE.height,
            "Page responsive ": DEVICE.responsive,
        };
        DEBUG.debugVariables.add(debugBox);
        /* end-test-code */
    },

};