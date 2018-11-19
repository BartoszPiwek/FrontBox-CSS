module.exports = (argument) => {
    
    var 
    SCROLL                  = null,
    ELEMENTS                = null,
    DEVICE                  = null,
    RESIZE                  = null;

    var
    DATA = {},
    activeModule = false;

    var
    CLASS = {
        activeItem              : `js-active`,
        activeContainer         : `js-active`,
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

        /* Run */
        refresh();

        if (activeModule) {
            /* Bind */
            RESIZE.add('spyActiveElements', refresh, 'all');
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
                    
                    /* Check ignore breakpoints */
                    if ( !element.ignoreBreakpoints.includes(DEVICE.responsive) ) {
                        if (!element.filled) {
                            element.itemChildren = element.$item.children();
                            element.containerChildren = element.$container.children();
                            element.filled = true;
                            element.length = element.itemChildren.length;
                        }

                        element.DATA = [];

                        
                        for (let index = 0; index < element.length; index++) {
                            const $item = element.itemChildren.eq(index);

                            let
                            height = $item.outerHeight( false ),
                            offset = $item.offset();

                            element.DATA.push({
                                $item: $item,
                                offset: {
                                    top: offset.top + element.offset.top,
                                    bottom: offset.top + height,
                                }
                            });
                            
                        }

                        element.onScroll = true;

                        /* Prepare calculate */

                        if (!element.bind ) {
                            ELEMENTS.$window.scroll( `activeElement${key}`, scroll );            
                            element.bind = true;                
                        }

                        scroll({
                            data: `activeElement${key}`,
                        });
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

        /* Set item */
        var 
        key = e.data.replace("activeElement", ""),
        element = DATA[key];

        if (!element.onScroll) {
            return false;
        }

        for (let index = 0; index <= element.length - 1; index++) {

            let
            offsetBottom = element.DATA[index].offset.bottom,
            offsetTop = element.DATA[index].offset.top,
            activeIndex = null;

            /* First element */
            if (index === 0 && SCROLL.begin <= offsetBottom) {
                activeIndex = index;
            }
            /* Last element */
            else if (index === element.length - 1 && SCROLL.begin >= offsetBottom) {
                activeIndex = index;
            }    
            /* Nth elements */                  
            else if (SCROLL.begin <= offsetBottom && SCROLL.begin >= offsetTop) {
                activeIndex = index;
            }

            /* Update active element */
            if (activeIndex !== null && element.active != activeIndex) {
                element.itemChildren.eq(element.active).removeClass(`${CLASS.activeContainer}`);
                element.containerChildren.eq(element.active).removeClass(`${CLASS.activeContainer}`);
                
                element.active = index;

                element.itemChildren.eq(element.active).addClass(`${CLASS.activeContainer}`);
                element.containerChildren.eq(element.active).addClass(`${CLASS.activeContainer}`);
                
                break;
            }

        }
        
    };

    start();
    return DATA;
};