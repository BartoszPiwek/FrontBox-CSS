/**
 * Resize
 */

module.exports = (argument) => {

    var
    QUEUE = {
        width: {},
        height: {},
        all: {},
    };

    var
    DATA = {
        active: false,
        time: 0,
        loading: false,
        appendTemplate: false,
    };

    var
    resizeTime = 400;

    var
    ELEMENTS = null,
    TEMPLATE = {
        loading: null,
    };

    var
    start = () => {
        ELEMENTS                = argument.ELEMENTS;
        TEMPLATE.loading        = argument.template.loading;
    };

    var
    trigger = () => {

        DATA.time = 500;

        if (!DATA.active) {
            DATA.active = true;
            resize();
        }
    };

    var
    add = (name, callback, type) => {
        QUEUE[type][name] = [callback];
        
        /* test-code */
        DEBUG.console.add(`resize: add ${name}`);
        /* end-test-code */
    };

    var
    remove = (name, type) => {
        delete queue[type][name];

        /* test-code */
        DEBUG.console.add(`resize: remove ${name}`);
        /* end-test-code */
    };

    var
    clean = () => {
        queue = {};

        /* test-code */
        DEBUG.console.add(`resize: clean queue`);
        /* end-test-code */
    };

    var
    run = (type) => {
        switch (type) {
            case 'width':
                resizeWidth();
                break;
            case 'height':
                resizeHeight();
                break;
            default:
                resizeAll();
                break;
        }
    };

    var
    resize = (type) => {

        /* Append loading template */
        if ( !DATA.appendTemplate && TEMPLATE.loading ) {
            ELEMENTS.$body.append( `<div class="js_resizeLoading"><div class="js_resizeLoading__content">${TEMPLATE.loading}</div></div>` );
            DATA.appendTemplate = true;
        }

        window.setTimeout( () => {

            DATA.time -= 50;

            if (DATA.time > 0) {
                if ( !DATA.loading ) {
                    DATA.loading = true;
                    if ( TEMPLATE.loading ) {
                        ELEMENTS.$body.addClass("js_resize");
                    }
                }
                resize(type);
            } 
            else {
                if ( DATA.loading ) {
                    DATA.loading = false;
                    if ( TEMPLATE.loading) {
                        ELEMENTS.$body.removeClass("js_resize");
                    }
                }
                DATA.active = false;
                run(type);
            }
            /* test-code */
            DEBUG.variable.refresh("resize");
            /* end-test-code */
        }, 50);
    };
    var 
    resizeWidth = () => {
        $.each(QUEUE.width, function(index, value) {
            (value[0])();
        });
    };
    var
    resizeHeight = () => {
        $.each(QUEUE.height, function(index, value) {
            (value[0])();
        });
    };
    var
    resizeAll = () => {
        resizeHeight();
        resizeWidth();
        $.each(QUEUE.all, function(index, value) {
            (value[0])();
        });
    };


    /* test-code */
    DEBUG.variable.add("resize", DATA);
    /* end-test-code */

    start();

    return {
        add: add,
        remove: remove,
        resize: resize,
        trigger: trigger,
    };
  
};