module.exports = (data) => {

    /**
      * Opened (transitioned on) jQuery elements
      * @param { Array(jQuery Element) } DATA 
      */
    var
    DATA = [],
    BROWSER = data.BROWSER;

    // start = (data) => {

    // },


    /**
     * Trigger toggle transition height
     */
    var
    toggle = (options) => {

        let
        active = null;

        $.each(DATA, function (indexInArray, valueOfElement) { 
             if ( options.$clicked.is(valueOfElement) ) {
                active = valueOfElement;    
                return false;         
             }
        });

        if (active) {
            DATA.splice( options.$clicked , 1 );     
            off(options);    
        }
        else {
            DATA.push( options.$clicked );   
            on(options);
        }

    };

    /**
     * Create transition
     * @param {Object} options 
     * $this {jQuery object} 
     * time {Number}
     * callback {Function} 
     */
    var
    on = (param) => {
        var
        $child, height;

        if (param.$container) {
            height = param.$container.children().outerHeight(true);
        } else {
            $child = param.$this.children();
            height = $child.outerHeight(true);
        }

        /* test-code */
        DEBUG.debugConsole.add(`Clicked "Show more" on {$container ${height}}`, "click");
        /* end-test-code */

        param.$clicked
            .addClass("js_expand__link--active");

        param.$container
            .addClass("js_transitionHeight")
            .css('height', height)
            .one(BROWSER.transitionEvent, () => {
                
                param.$container
                    .removeClass("js_transitionHeight")
                    .addClass("js_expand__container--active")
                    .css('height', '');

                if (param.callback) {
                    (param.callback());
                }

            });

    };

    var
    off = (param) => {

        var
        height = param.$container.outerHeight(true);
        
        /* test-code */
        DEBUG.debugConsole.add(`Clicked "Show more" off`, "click");
        /* end-test-code */

        param.$clicked
            .removeClass("js_expand__link--active");
       
        param.$container
            .css('height', height)
            .removeClass("js_expand__container--active")
            .addClass("js_transitionHeight")
            .css('height', '')
            .one(BROWSER.transitionEvent, () => {

                param.$container
                    .removeClass("js_expand__container--close js_transitionHeight")
            
                if (param.callback) {
                    (param.callback());
                }
            });

    };

    return {
        toggle: toggle,
        on: on,
        off: off,
    };

};
