/**
 * Resize
 */

module.exports = (data) => {

    var
    resizeActive = false,
    resizeTime = 0,
    queue = {};

    var
    ACTIVE = {
        appendTemplateLoading: false,
        loading: false,
    };

    var
    TIME = {
        resize: 400,
    };

    var
    ELEMENTS,
    TEMPLATE = {
        loading: null,
    };

    var
    start = () => {
        ELEMENTS = data.ELEMENTS;
        TEMPLATE.loading = data.template.loading;
        
        bind();
    };

    var
    trigger = () => {
        resizeActive = true;
        resizeTime += 250;
        
        resize();
    };

    var
    resize = () => {

        /* Append loading template */
        if ( !ACTIVE.appendTemplateLoading && TEMPLATE.loading ) {
            ELEMENTS.$body.append( `<div class="js_resizeLoading"><div class="js_resizeLoading__content">${TEMPLATE.loading}</div></div>` );
            ACTIVE.appendTemplateLoading = true;
        }

        window.setTimeout( () => {
            
            if (resizeActive) {
                
                if (resizeTime > TIME.resize) {
                    resizeTime = TIME.resize;
                }
                else {
                    resizeTime -= 50;
                }

                if (resizeTime > 0) {
                    if ( !ACTIVE.loading ) {
                        ACTIVE.loading = true;
                        if ( TEMPLATE.loading ) {
                            ELEMENTS.$body.addClass("js_resize");
                        }
                    }
                    resize();
                } 
                else {
                    if ( ACTIVE.loading ) {
                        ACTIVE.loading = false;
                        if ( TEMPLATE.loading) {
                            ELEMENTS.$body.removeClass("js_resize");
                        }
                    }
                    resizeTime = 0;
                    resizeActive = false;
                    run();
                }

                /* test-code */
                DEBUG.variable.add({
                    "Resize timeout": resizeTime,
                    "Resize active ": resizeActive,
                });
                /* end-test-code */
            }

        }, resizeTime);
    };

    var
    add = (name, item) => {
        queue[name] = [item];

        /* test-code */
        DEBUG.console.add(`resize: add ${name}`);
        /* end-test-code */
    };

    var
    remove = (name) => {
        delete queue[name];

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
    run = () => {
        $.each(queue, function(index, value) {
            (value[0])();
        }); 
    };

    var
    bind = () => {
        ELEMENTS.$window.on('resize orientationchange', trigger);

        /* test-code */
        DEBUG.console.add(`resize: bind`);
        /* end-test-code */
    };

    unbind = () => {
        ELEMENTS.$window.off('resize orientationchange', trigger);

        /* test-code */
        DEBUG.console.add(`resize: unbind`);
        /* end-test-code */
    };

    start();

    return {
        add: add,
        remove: remove,
        clean: clean,
        bind: bind,
        unbind: unbind,
    };
  
};