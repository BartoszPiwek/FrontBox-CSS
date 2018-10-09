module.exports = {

    bind() {
        var self = this;
        $(window).scroll(self.refresh);
        $(window).on('resize orientationchange', function() {
            self.refresh();
        });
        this.refresh();
    },

    refresh() {
        SCROLL.centerLast = SCROLL.center;

        SCROLL.top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        SCROLL.center = SCROLL.top + DEVICE.heightHalf;

        SCROLL.speed = Math.abs(SCROLL.centerLast - SCROLL.center);

        if (SCROLL.center > SCROLL.centerLast) {
            SCROLL.direction = 0;
        } else {
            SCROLL.direction = 1;
        }

        /* test-code */
        var debugBox = {
            "Scroll top ": SCROLL.top,
            "Scroll center ": SCROLL.center,
            "Scroll center last ": SCROLL.centerLast,
            "Scroll direction ": SCROLL.direction,
            "Scroll speed ": SCROLL.speed,
        };
        DEBUG.debugVariables.add(debugBox);
        /* end-test-code */
    },

};