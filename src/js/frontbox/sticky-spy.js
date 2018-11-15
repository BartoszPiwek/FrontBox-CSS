module.exports = (argument) => {
    
    var 
    SCROLL              = null;
    ELEMENTS            = null;
    DEVICE              = null;

    var
    DATA = {};

    var
    CLASS = {
        active          : `js_spy`,
    };

    /* Start module */
    const
    start = () => {

        /* Prepare arguments data */
        SCROLL = argument.SCROLL;
        ELEMENTS = argument.ELEMENTS;
        DATA = argument.DATA;
        DEVICE = argument.DEVICE;

        refresh();
        ELEMENTS.$window.on('resize orientationchange', refresh);
        ELEMENTS.$window.scroll( scroll );
    };

    /* Refresh module */
    const
    refresh = () => {

        for (const key in DATA) {
            if (DATA.hasOwnProperty(key)) {
                const element = DATA[key];
                
                if (element.$item.length) {

					/* Clean style */
					element.active = false;
					element.$item.removeClass(`bottom run`);

					/* Prepare calculate */
					let
					containerOffset = element.$container.offset(),
					containerHeight = element.$container.outerHeight(true),
					itemOffset = element.$item.offset(),
					itemHeight = element.$item.outerHeight(true);

					/* Calculate container */
					element.container = {
						height: containerHeight,
						width: element.$container.outerWidth(true),
						offset: {
							top             : containerOffset.top,
							bottom          : containerOffset.top + containerHeight,
							left            : containerOffset.left,
						},
					}

					/* Calculate item */
					element.item = {
						height: itemHeight,
						offset: {
							top             : itemOffset.top,
							bottom          : itemOffset.top + itemHeight,
						},
					}

					/* Set style to item */
                    element.$item.css({
                        width               : element.container.width,
                        left				: element.container.offset.left,
                    });
                }

            }
        }

        scroll();
        console.log(DATA);
        
    };

    const
    scroll = () => {

        for (const key in DATA) {
            if (DATA.hasOwnProperty(key)) {
                const element = DATA[key];

				/* Prepare calculate */
                let
				offset = element.$item.offset();
				offset = {
					top: offset.top,
                    bottom: offset.top + element.height,
                }
                let
                foo = element.item.offset.bottom + SCROLL.top + element.item.height;
                isBottom = element.item.height + SCROLL.top >= element.container.offset.bottom && SCROLL.bottom > element.container.offset.bottom,
                isTop = element.active && !isBottom && element.item.offset.top <= element.container.offset.top && SCROLL.begin <= element.container.offset.top,
                isFixed = element.active != 1 && !isBottom && SCROLL.begin > element.container.offset.top;

                // Check top position
				if (isFixed) {
					element.$item.addClass('run').removeClass('bottom');
                    element.active = 1;
                    
                    element.$item.css({
                        top: $('#header').outerHeight( true ),
                    });
				}
				if (isTop) {
					element.$item.removeClass('run bottom');
					element.active = false;
                }

                // Check bottom position
                if (isBottom && element.active != 2) {
                    element.$item.addClass('bottom').removeClass('run');
                    element.active = 2;
                } 

            }
        }

    };


    start();

    return DATA;
};