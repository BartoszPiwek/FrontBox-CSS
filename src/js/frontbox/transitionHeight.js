define(function() {
    return {

        /**
         * Create height transition for elemen
         * @param $element { jQuery Element }
         */

        data: [],

        toggle(options) {
            var self = this;

            if (self.data.includes(options)) {
                self.on(options);
            } else {
                self.off(options);
            }

        },

        /**
         * Create transition
         * @param {Object} options 
         * $this {jQuery object} 
         * time {Number}
         * callback {Function} 
         */
        on(param) {

            var
                self = this,
                $child, height;

            if (param.$container) {
                height = param.$container.outerHeight(true);
            } else {
                $child = param.$this.children();
                height = $child.outerHeight(true);
            }

            /* test-code */
            Main.debugConsole.add(`Clicked "Show more" on {$container ${height}}`, "click");
            /* end-test-code */

            param.$this
                .addClass("js_transitionHeight")
                .css('height', height)
                .one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', () => {
                    
                    param.$this
                        .removeClass("js_transitionHeight")
                        .css('height', '');

                    self.data.push(param.$this);                            

                    if (param.callback) {
                        (param.callback)();
                    }

                });

        },

        off(param) {

            var
                self = this,
                height = param.$this.outerHeight(true);
            
            /* test-code */
            Main.debugConsole.add(`Clicked "Show more" off`, "click");
            /* end-test-code */
           
            param.$this
                .addClass("js_transitionHeight")
                .css('height', height);

            if (param.callbackBefore) {
                (param.callbackBefore)();
            }

            param.$this
                .css('height', '')
                .one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', () => {
                    
                    param.$this
                        .removeClass("js_transitionHeight")
                
                    self.data.push(param.$this);                            
                
                    if (param.callback) {
                        (param.callback)();
                    }
                
                });

        },

    };
});
