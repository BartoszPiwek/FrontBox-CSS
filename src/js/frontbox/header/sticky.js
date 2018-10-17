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
            this.activeClass = SETTINGS.activeClass || "js_placeholder--active";
            this.active = false;
            this.height = null;
            this.$holder = null;

            this.refresh();
        }

        refresh() {

            // Check if $this exist
            if (!this.$this) {
                /* test-code */
                DEBUG.debugConsole.add("@param {jQuery object} $this - is required!");
                /* end-test-code */
                return false;
            } 

            // Remove holder element
            if (this.$holder) {
                this.$holder.remove();
            }

            this.$holder = $(`<div class="js_placeholder--holder" style="background; red;"></div>`);
            this.$body.append(this.$holder);

            this.recalculate();
        }

        recalculate() {
            this.height = this.$this.outerHeight( false );
        }

        disable() {
            this.$this.removeClass( this.activeClass );
            this.$holder.remove();
        }

        on() {
            // Copy style
            var style = this.$this.getStyleObject();

            this.$this.before(this.$holder);
            this.$holder.css(style);
            this.$holder.css("height", `10px !important`);
            this.$holder[0].style.setProperty('height', `${this.height}px`, 'important');
            this.$this.addClass( this.activeClass );
        }

        changeSettings(SETTINGS) {
            this.$this.removeClass( this.activeClass );
            this.$this = SETTINGS.$this;
            this.refresh();
        }

    }

    // var createPlaceholder = new CreatePlaceholder({
    //     $body: ELEMENTS.$body,
    //     $this: ELEMENTS.$headerPlaceholder,
    //     activeClass: "js_placeholder--active",
    // });
    var createPlaceholder3 = new CreatePlaceholder({
        $body: ELEMENTS.$body,
        $this: $("#js_testPlaceholder2"),
        activeClass: "js_placeholder--active",
    });
    $("*", document.body).click(function(e) {
        e.stopPropagation();
        var domEl = $(this).get(0);
        console.log($(domEl));
        
        new CreatePlaceholder({
            $this : $(domEl),
        }).on();
    });
    // window.setTimeout(function() {
    //     // createPlaceholder.on();
    //     createPlaceholder2.on();
    //     createPlaceholder3.on();
    // }, 2000);

    // createPlaceholder.test();

    var start = (data) => {

        if ($elementSpy.length) {

            $(window).on('resize orientationchange', function() {
                refresh();
            });
    
            refresh();
            
            if (SETTINGS.spyTop) 
            {
                spyTop();
    
                ELEMENTS.$window.on("scroll", () => {
                    spyTop();
                });   
            }

            /* test-code */
            DEBUG.debugConsole.add(`Start sticky.js {offset: ${DATA.offset}; }`);
            /* end-test-code */
        }
    };

    var refresh = () => {
        calculateHeader();
        
        if (!SETTINGS.offset) {
            DATA.offset = SETTINGS.offset;
        }
    };

    var calculateHeader = (data) => {

        position = $elementSpy.offset().top;
        DATA.height = $elementSpy.outerHeight(true);

        /* test-code */
        DEBUG.debugVariables.add({
            "Header height": DATA.height,
            "Header position": position,
        });
        /* end-test-code */
    };

    var spyTop = () => {

        if (SCROLL.top > DATA.offset) 
        {
            if (!active) 
            {
                active = true;

                createPlaceholder3.changeSettings({
                    $this : $elementSpy,
                });
                createPlaceholder3.on();

                // ELEMENTS.$headerPlaceholder.css({height: DATA.height});
                ELEMENTS.$html.addClass(SETTINGS.spyTopClass);
                
            }
        } 
        else 
        {
            if (active) {
                active = false;

                createPlaceholder3.disable();

                // ELEMENTS.$headerPlaceholder.css({height: ""});
                ELEMENTS.$html.removeClass(SETTINGS.spyTopClass);
            }
        }

        /* test-code */
        DEBUG.debugVariables.add({
          'Header active': active,
        });
        /* end-test-code */

    };

    start();

    return {

    };

};