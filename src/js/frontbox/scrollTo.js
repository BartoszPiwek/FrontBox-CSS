define(function () {
    return {
        
        // all clickable scroll elements
        $elements: null,
        // bool page is stroll
        active: false,

        SETTINGS: {
            // divide distance by this value to calculate time scroll
            time: 2,
            // min time scroll
            minTime: 400,
            // max time scroll
            maxTime: 1200,
            // run autoScroll when hash in URL is begin with this string
            prefixAutoScroll: 'scroll-'
        },

        /**
         * Start function
         * 
         * @param {Object} data
         * replace values in SETTINGS 
         */
        start(data) {
            $.extend( self.SETTINGS, data );
            this.autoScroll();
            this.refresh();
        },

        /**
         * Automatic scroll page to element ID
         * when user visit page with hash
         * begin with SETTINGS.prefixAutoScroll
         */
        autoScroll() {
            var 
            self = Main.scrollTo,
            hash = window.location.hash;
            
            // Check if page must trigger autoScroll
            if( hash.startsWith( "#" + self.SETTINGS.prefixAutoScroll ) ) {

                // Fix annoying jumping when user disturb scroll
                Main.function.offUserScroll();

                // Remove hash from url
                var 
                cleanUrl = location.protocol + "//" + location.host + location.pathname;
                window.history.replaceState({}, document.title, cleanUrl);
                
                // Create target ID from hash
                var 
                targetID = hash.substring(hash.indexOf('-')+1, hash.lenght);

                /* test-code */
                Main.debugConsole.add("scrollTo.js auto trigger function autoScroll().", 'auto');
                /* end-test-code */
                
                // Fix annoying jumping when page is still not ready
                window.setTimeout(()=>{
                    self.on(targetID);
                }, 900);

            }
        },

        /**
         * Scroll function
         * @param {Event interface} event 
         * @param {jQuery object; String ID} target 
         * @param {Number} time 
         */
        scroll(event, target = false, time = false) {
            var
            self = Main.scrollTo,
            targetID, $target;

            // Check event and remove default action
            if (event) {
                event.preventDefault();
            }

            // Check target element
            if (!target) 
            {
                targetID = "#" + $(this).attr("data-scroll");
                $target = $(targetID);
            } 
            else 
            {
                if (target instanceof jQuery) 
                {
                    $target = target;
                    targetID = "#" + $target.attr("ID");
                } 
                else
                {
                    targetID = "#" + target;
                    $target = $(targetID);
                }
            }

            // Check if scroll animation is free to use
            if (!self.active) {

                // Check $target exist
                if ($target.length) {

                    // Block other scroll triggers
                    self.active = true;

                    // Grab target top position
                    var
                    targetPositionTop = $target.offset().top;              

                    // Calculate scrollTime 
                    var scrollTime = Math.round(Math.abs(targetPositionTop - Main.SCROLL.top) / self.SETTINGS.time);
                    if (scrollTime < self.SETTINGS.minTime) 
                    {
                        scrollTime = self.SETTINGS.minTime;
                    } 
                    else if (scrollTime > self.SETTINGS.maxTime) 
                    {
                        scrollTime = self.SETTINGS.maxTime;
                    }

                    /* test-code */
                    Main.debugConsole.add(`Scroll to element <strong>${targetID}</strong> with speed <strong>${scrollTime}ms</strong>`);
                    /* end-test-code */

                    // Animate scroll
                    Main.function.offUserScroll();
                    Main.ELEMENTS.$page.animate({
                        scrollTop: targetPositionTop,
                    }, scrollTime, () => {
                        Main.function.onUserScroll();
                        self.active = false;
                    });

                    return true;
                }
                else {
                    /* test-code */
                    Main.debugConsole.add(`scrollTo.js function scroll(). Element <strong>${targetID}</strong> don't exist`, 'error');
                    /* end-test-code */
                    return false;
                }
            }
            /* test-code */
            else 
            {
                Main.debugConsole.add(`scrollTo.js function scroll(). Other scroll animation isn't end.`, 'warning');
            }
            /* end-test-code */
        },

        /**
         * Scroll to element
         * @param {jQuery object; String ID} element 
         * @param {Number} time 
         * @return {Bool}
         */
        on(element, time = false) {
            return this.scroll(false, element, time);
        },
        
        /**
         * Refresh binded $elements
         */
        refresh() {
            var self = Main.scrollTo;
            if (self.$elements) {
                self.$elements.off("click", self.scroll);
            }

            self.$elements = $("[data-scroll]");
            self.$elements.on("click", self.scroll);
        },
  
    };
  });