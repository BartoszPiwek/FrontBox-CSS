module.exports = (data) => {

    var 
    SETTINGS = {
        spyTop: true,
        offset: 1,
        spyTopClass: 'js_sticky-element--active',
    },
    ELEMENTS = data.ELEMENTS,
    SCROLL = data.SCROLL,
    $elementSpy = data.$elementSpy,
    DATA = {
        height: null,
        offset: null,
    },
    active = false,
    position = null;

    if (data.SETTINGS) {
        $.extend(DATA, data.SETTINGS);
    }

    // class GlobalPlaceholder {

    //     constructor($body) {
    //         this.$body = $body;
    //         this.id = 0;
    //         this.$all = {};
    //     }

    //     generateNumber() {
    //         return id++;
    //     }

    //     create(ElementTemplate) {
    //         let
    //         fillElementTemplate = `${ElementTemplate[0]} ${generateNumber()} ${ElementTemplate[0]}` ;
    //     }

    // }

    

    class CreatePlaceholder {

        /**
         * Create
         * @param {jQuery object} $body 
         * @param {jQuery object} $this 
         * @param {String} activeClass 
         */
        constructor(SETTINGS) {
            this.$body = SETTINGS.$body || $("body");
            this.$this = SETTINGS.$this;
            this.activeClass = SETTINGS.activeClass;
            this.active = false;
            this.height = null;
            this.$holder = null;
            

            this.refresh();
        }

        refresh() {

            if (!this.$this) {
                /* test-code */
                DEBUG.debugConsole.add("@param {jQuery object} $this - is required!");
                /* end-test-code */

                return false;
            }

            // Create holder element
            if (!this.$holder) {
                this.$holder = $(`<div class="js_placeholder--holder" style="background; red;"></div>`);
                this.$body.append(this.$holder);
            }

            this.recalculate();
        }

        recalculate() {
            this.height = this.$this.outerHeight( true );
        }



        on() {
            // Copy style
            var style = this.$this.getStyleObject();

            this.$this.after(this.$holder);
            this.$holder.css(style);
            this.$this.addClass( this.activeClass );
        }

    }

    // var createPlaceholder = new CreatePlaceholder({
    //     $body: ELEMENTS.$body,
    //     $this: ELEMENTS.$headerPlaceholder,
    //     activeClass: "js_placeholder--active",
    // });
    var createPlaceholder2 = new CreatePlaceholder({
        $body: ELEMENTS.$body,
        $this: $("#js_testPlaceholder"),
        activeClass: "js_placeholder--active",
    });
    var createPlaceholder3 = new CreatePlaceholder({
        $body: ELEMENTS.$body,
        $this: $("#js_testPlaceholder2"),
        activeClass: "js_placeholder--active",
    });
    window.setTimeout(function() {
        // createPlaceholder.on();
        createPlaceholder2.on();
        createPlaceholder3.on();
    }, 2000);

    // createPlaceholder.test();

    // var start = (data) => {

    //     if ($elementSpy.length) {

    //         $(window).on('resize orientationchange', function() {
    //             refresh();
    //         });
    
    //         refresh();
            
    //         if (SETTINGS.spyTop) 
    //         {
    //             spyTop();
    
    //             ELEMENTS.$window.on("scroll", () => {
    //                 spyTop();
    //             });   
    //         }

    //         /* test-code */
    //         DEBUG.debugConsole.add(`Start sticky.js {offset: ${DATA.offset}; }`);
    //         /* end-test-code */
    //     }
    // };

    // var refresh = () => {
    //     calculateHeader();
        
    //     if (!SETTINGS.offset) {
    //         DATA.offset = SETTINGS.offset;
    //     }
    // };

    // var calculateHeader = (data) => {

    //     position = $elementSpy.offset().top;
    //     DATA.height = $elementSpy.outerHeight(true);

    //     /* test-code */
    //     DEBUG.debugVariables.add({
    //         "Header height": DATA.height,
    //         "Header position": position,
    //     });
    //     /* end-test-code */
    // };

    // var spyTop = () => {

    //     if (SCROLL.top > DATA.offset) 
    //     {
    //         if (!active) 
    //         {
    //             active = true;
    //             // ELEMENTS.$headerPlaceholder.css({height: DATA.height});
    //             ELEMENTS.$html.addClass(SETTINGS.spyTopClass);
    //         }
    //     } 
    //     else 
    //     {
    //         if (active) {
    //             active = false;
    //             // ELEMENTS.$headerPlaceholder.css({height: ""});
    //             ELEMENTS.$html.removeClass(SETTINGS.spyTopClass);
    //         }
    //     }

    //     /* test-code */
    //     DEBUG.debugVariables.add({
    //       'Header active': active,
    //     });
    //     /* end-test-code */

    // };

    // start();

    // return {

    // };

};