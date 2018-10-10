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
    active = false;
    position = null;

    $.extend( SETTINGS, data.SETTINGS );

    var start = (data) => {

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
    };

    var refresh = () => {
        calculateHeader();

        if (!SETTINGS.offset) {
            DATA.offset = position;
        }
    };

    var calculateHeader = (data) => {
        var self = this;

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
                ELEMENTS.$headerPlaceholder.css({height: DATA.height});
                ELEMENTS.$html.addClass(SETTINGS.spyTopClass);
            }
        } 
        else 
        {
            if (active) {
                active = false;
                ELEMENTS.$headerPlaceholder.css({height: ""});
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