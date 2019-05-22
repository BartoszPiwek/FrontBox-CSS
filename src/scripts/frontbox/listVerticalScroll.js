define(function () {
    return {
        
        SETTINGS: {
            match: '.list-vertical-scroll',
            distance: 150,
        },
        $items: null,

        start: function(){
            var self = this;

            self.refresh();
        },

        refresh: function() {
            var self = this;
            self.$items = $(self.SETTINGS.match);

            if (self.$items.length) {
                self.$items.each(function (index, element) {
                    self.functionEachItems(index, element);
                });
            }

        },

        onButtonClick: function(event) {
            
            var
            SETTINGS = event.data.SETTINGS,
            ELEMENTS = event.data.ELEMENTS;
            $item = event.data.$item;

            if (SETTINGS.active) {
                return;
            }

            SETTINGS.active = true;

            var
            $this = $(this),
            position = Main.function.functionDetermineOverflow(ELEMENTS.$nav, ELEMENTS.$content);

            SETTINGS.direction = $this.attr("data-direction");

            var
            scrollCurrent = ELEMENTS.$nav.scrollLeft(),
            scrollTo = scrollCurrent;

            var availableScrollLeft = ELEMENTS.$content.outerWidth(true);

            console.log(scrollCurrent);

            var distanceDirection = Main.listVerticalScroll.SETTINGS.distance;
            if (SETTINGS.direction === "left") {
                distanceDirection = -1 * distanceDirection;
            }

            /**
             * Scroll by step
             */
            if (scrollCurrent < distanceDirection * 2 || 0 > distanceDirection) {
                scrollTo += distanceDirection;
            } 
            /**
             * Scroll to end
             */
            else 
            {
                if (SETTINGS.direction === "right") 
                {
                    scrollTo = ELEMENTS.$content.outerWidth(true) - ELEMENTS.$nav.outerWidth(true);
                } 
                else 
                {
                    scrollTo = 0;
                }
            }

            ELEMENTS.$nav.animate({
                scrollLeft: scrollTo,
            }, 500, () => {
                SETTINGS.active = false;

                $item.attr("data-overflowing", Main.function.functionDetermineOverflow($item, ELEMENTS.$content));
            });

        },

        onNavTransition: function() {

        },

        functionEachItems: function(_index, _element) {
            
            var
            self = Main.listVerticalScroll,
            $item = $(_element), 
            SETTINGS = {
                active: false,
                direction: "right",
            },
            ELEMENTS = {
                $buttons: $item.find(".list-vertical-scroll__button"),
                $nav: $item.find(".list-vertical-scroll__nav"),
                $content: $item.find(".list-vertical-scroll__nav-content"),
            };

            ELEMENTS.$buttons.on(
                "click",
                {
                    SETTINGS,
                    ELEMENTS,
                    $item,
                },
                self.onButtonClick
            );
            ELEMENTS.$nav.on(
                "transitionend",
                {
                    SETTINGS,
                    ELEMENTS,
                    $item,
                },
                self.onNavTransition
            );

            $item.attr("data-overflowing", Main.function.functionDetermineOverflow($item, ELEMENTS.$content));

            ELEMENTS.$nav.on("scroll", function() {
                $item.attr("data-overflowing", Main.function.functionDetermineOverflow($item, ELEMENTS.$content));
            });
        },

    };
  });