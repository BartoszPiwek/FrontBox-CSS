define(function () {
    return {

        $elements: null,
        
        start() {
            var self = this;
            
            self.rebindElements();
            
            if (self.$elements.length) {
                if (self.testBrowser()) {
                    self.refresh();
                    window.addEventListener("resize", self.refresh);
        
                    /* test-code */
                    Main.debugConsole.add("Run fallback: initVerticalUnit {length: " + self.$elements.length + ";}");
                    /* end-test-code */
                }
                /* test-code */
                else {
                    Main.debugConsole.add("Don't run fallback: initVerticalUnit.<br>Browser support vertical units {vh}");
                }
                /* end-test-code */
            }
            
        },

        testBrowser() {
            /**
             * Tested element
             */
            Main.ELEMENTS.$body.append("<p id='test-v-units' style='width: 50vw; opacity: 0;'></p>"); 
            var testVUnits = document.querySelector("#test-v-units");

            elemWidth = parseInt(getComputedStyle(testVUnits, null).width, 10);
            halfWidth = parseInt(window.innerWidth / 2, 10);

            testVUnits.parentNode.removeChild(testVUnits);
            return elemWidth !== halfWidth;
        },

        rebindElements() {
            var self = this;
            self.$elements = $(".js_vunit");
        },

        refresh() {
            if (Main.DEVICE.width !== Main.DEVICE.prevWidth) {
                var self = Main.vUnits;
                self.$elements.css({
                    minHeight: Main.DEVICE.height + "px"
                });
            }
        },

    };
});