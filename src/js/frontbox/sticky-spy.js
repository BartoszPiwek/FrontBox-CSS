module.exports = (argument) => {
    
    var 
    SCROLL                  = null;
    ELEMENTS                = null;
    DEVICE                  = null;
    RESIZE                  = null;
    BREAKPOINTS_HEADER      = null;

    var
    DATA = {},
    activeModule = false;

    var
    CLASS = {
        fixed           : `js-sticky-spy--fixed`,
        bottom          : `js-sticky-spy--bottom`,
    };

    /* Start module */
    const
    start = () => {

        /* Prepare arguments data */
        SCROLL = argument.SCROLL;
        ELEMENTS = argument.ELEMENTS;
        DATA = argument.DATA;
        DEVICE = argument.DEVICE;
        RESIZE = argument.RESIZE;
        BREAKPOINTS_HEADER = argument.BREAKPOINTS_HEADER;

        /* Run */
        refresh();

        if (activeModule) {
            /* Bind */
            RESIZE.add('stickySpy', refresh, 'all');
        }
    };

    /* Refresh module */
    const
    refresh = () => {

        for (const key in DATA) {
            if (DATA.hasOwnProperty(key)) {
                const element = DATA[key];
                
                if (element.$item.length) {
                    activeModule = true;
                    
                    /* Clean style */
                    element.active = false;
                    element.$item.removeClass(`${CLASS.bottom} ${CLASS.fixed}`);
                    
                    /* Check ignore breakpoints */
                    if ( !element.ignoreBreakpoints.includes(DEVICE.responsive) ) {

                        element.onScroll = true;

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
                        };

                        /* Calculate item */
                        element.item = {
                            height: itemHeight,
                            offset: {
                                top             : itemOffset.top,
                                bottom          : itemOffset.top + itemHeight - BREAKPOINTS_HEADER[DEVICE.responsive],
                            },
                        };

                        /* Set style to item */
                        element.$item.css({
                            width               : element.container.width,
                            left				: element.container.offset.left,
                            top                 : BREAKPOINTS_HEADER[DEVICE.responsive]
                        });

                        if (!element.bind ) {
                            ELEMENTS.$window.scroll( key, scroll );            
                            element.bind = true;                
                        }

                        scroll({
                            data: key,
                        })
                    }
                    else {
                        element.onScroll = false;
                    }
                }
            }
        }
    };

    const
    scroll = (e) => {

        var 
        element = DATA[e.data]

        if (!element.onScroll) {
            return false;
        }
        
		/* Prepare calculate */
        let
        offset = element.$item.offset();

		element.item.offset.top = offset.top;
		element.item.offset.bottom = offset.top + element.item.height;

        let
        isBottom = element.item.height + SCROLL.top + BREAKPOINTS_HEADER[DEVICE.responsive] >= element.container.offset.bottom && SCROLL.bottom > element.container.offset.bottom,
        isTop = element.active && !isBottom && element.item.offset.top <= element.container.offset.top && SCROLL.begin <= element.container.offset.top,
        isFixed = element.active != 1 && !isBottom && SCROLL.begin > element.container.offset.top;

        // Check top position
		if (isFixed) {
			element.$item.addClass(`${CLASS.fixed}`).removeClass(`${CLASS.bottom}`);
            element.active = 1;
		}
		if (isTop) {
			element.$item.removeClass(`${CLASS.bottom} ${CLASS.fixed}`);
			element.active = false;
        }

        // Check bottom position
        if (isBottom && element.active != 2) {
            element.$item.addClass(`${CLASS.bottom}`).removeClass(`${CLASS.fixed}`);
            element.active = 2;
        } 
    };

    start();
    return DATA;
};