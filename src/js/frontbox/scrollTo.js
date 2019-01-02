/*=========================================================================
|| Smooth scroll to target
===========================================================================
|| Required
|| * SCROLL
|| * ELEMENTS
|| * FUNCTIONS
||
|| * data-element - select elements separate with comma ( $("data-lement") )
|| * data-toggle - select type of toggle
||
|| Data-toggle type:
|| * collapse - collapse data-element ( use less/javascript/_collapse.less class )
|| * something else - toggle data-element using class on data-toggle
=========================================================================*/
module.exports = (data) => {
    
    var
    SCROLL = data.SCROLL,
    ELEMENTS = data.ELEMENTS,
    FUNCTIONS = data.FUNCTIONS,
    DEVICE = data.DEVICE,
    BREAKPOINTS_HEADER = data.BREAKPOINTS_HEADER,
    // all clickable scroll elements
    $elements = null,
    // bool page is scroll
    active = false;

    var
    SETTINGS = {
        // active automatic scroll page to element via URL hash
        autoScroll: false,
        // divide distance by this value to calculate time scroll
        time: 2,
        // min time scroll
        minTime: 400,
        // max time scroll
        maxTime: 1200,
        // run autoScroll when hash in URL is begin with this string
        prefixAutoScroll: 'scroll-'
    };

    $.extend( SETTINGS, data.SETTINGS );

    /**
     * Start function
     * 
     * @param {Object} data
     * replace values in SETTINGS 
     */
    var
    start = (data) => {

        /* test-code */
        DEBUG.console.add("Start: scrollTo");
        /* end-test-code */
        

        if (SETTINGS.autoScroll) 
        {
            autoScroll();
        }

        refresh();

    };

    /**
     * Automatic scroll page to element ID
     * when user visit page with hash
     * begin with SETTINGS.prefixAutoScroll
     */
    var
    autoScroll = () => {
        var 
        hash = window.location.hash;
        
        // Check if page must trigger autoScroll
        if( hash.startsWith( "#" + SETTINGS.prefixAutoScroll ) ) {

            // Fix annoying jumping when user disturb scroll
            ELEMENTS.$body.scrollDisable(true);

            // Remove hash from url
            var 
            cleanUrl = location.protocol + "//" + location.host + location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
            
            // Create target ID from hash
            var 
            targetID = hash.substring(hash.indexOf('-')+1, hash.lenght);

            /* test-code */
            DEBUG.console.add("scrollTo.js auto trigger function autoScroll().", 'auto');
            /* end-test-code */
            
            // Fix annoying jumping when page is still not ready
            window.setTimeout(()=>{
                on(targetID);
            }, 900);

        }
    };

    /**
     * Scroll function
     * @param {Event interface} event 
     * @param {jQuery object; String ID} target 
     * @param {Number} time 
     */
    var
    scroll = (event, target = false, time = false) => {
        var
        targetID, $target, $this;

        // Check event and remove default action
        if (event) {
            /* test-code */
            DEBUG.console.add(`Click scrollTo: event.preventDefault()`, 'click');
            /* end-test-code */
            $this = $(event.currentTarget);
            event.preventDefault();
        }

        // Check target element
        if (!target) {
            targetID = "#" + $this.attr("data-scroll");
            $target = $(targetID);
        } 
        else {
            if (target instanceof jQuery) {
                $target = target;
                targetID = "#" + $target.attr("ID");
            } 
            else {
                targetID = "#" + target;
                $target = $(targetID);
            }
        }

        // Check if scroll animation is free to use
        if (!active) {

            // Check $target exist
            if ($target.length) {

                // Block other scroll triggers
                active = true;

                // Grab target top position
                var
                targetPositionTop = $target.offset().top,
                // Scroll position
                scrollTo = targetPositionTop - BREAKPOINTS_HEADER[DEVICE.responsive];    
                
                // Calculate scrollTime 
                var scrollTime = Math.round(Math.abs(targetPositionTop - SCROLL.begin) / SETTINGS.time);
                if (scrollTime < SETTINGS.minTime) 
                {
                    scrollTime = SETTINGS.minTime;
                } 
                else if (scrollTime > SETTINGS.maxTime) 
                {
                    scrollTime = SETTINGS.maxTime;
                }
                

                /* test-code */
                DEBUG.console.add(`Click scrollTo: scroll to element {target: <strong>${targetID}</strong>; speed <strong>${scrollTime}ms</strong>; position: <strong>${scrollTo}</strong>}`, 'click');
                /* end-test-code */

                // Animate scroll
                ELEMENTS.$body.scrollDisable();
                ELEMENTS.$page.animate({
                    scrollTop: scrollTo,
                }, 1200, () => {
                    ELEMENTS.$body.scrollDisable('undo');
                    active = false;
                });

                return false;
            }
            else {
                /* test-code */
                DEBUG.console.add(`Error scrollTo: element <strong>${targetID}</strong> doesn't exist`, 'error');
                /* end-test-code */
                return false;
            }
        }
        /* test-code */
        else 
        {
            DEBUG.console.add(`Warning scrollTo: scroll animation wouldn't finish`, 'warning');
        }
        /* end-test-code */
    };

    /**
     * Scroll to element
     * @param {jQuery object; String ID} element 
     * @param {Number} time 
     * @return {Bool}
     */
    var
    on = (element, time = false) => {
        return scroll(false, element, time);
    };
    
    /**
     * Refresh binded $elements
     */
    var
    refresh = () => 
    {

        if ($elements) 
        {
            $elements.off("click", scroll);

            /* test-code */
            DEBUG.console.add("Refresh: scrollTo {length: " + $elements.length + ";}");
            /* end-test-code */
        }
        

        $elements = $("[data-scroll]");
        $elements.on("click", scroll);

        /* test-code */
        DEBUG.console.add("Data: scrollTo {length: " + $elements.length + ";}");
        /* end-test-code */
    };

    start();
  
};