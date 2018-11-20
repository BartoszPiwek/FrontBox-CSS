module.exports = (argument) => {

    var 
    ELEMENTS = null;

    var
    BOX = {
        $container: null,
        $content: null,
        $button: null,
        $body: null,
    },
    OPTIONS = {
        open: false,
    };

    const
    CLASS = {
        container           : `debug-box debug-box--variables`,
        containerHide       : `debug-box--hide`,
        button              : `debug-box__button`,
        content             : `debug-box__container`,
        item                : `debug-box__item`,
    };

    var
    CONTENT = {};

    /* Start module */
    const start = (data) => {

        /* Prepare arguments data */
        $.extend( OPTIONS, argument.OPTIONS );
        ELEMENTS = argument.ELEMENTS;

        /* Check if container must be default open */
        if (!OPTIONS.open) {
            CLASS.container += ` ${CLASS.containerHide}`;
        }
        
        /* Create template */
        BOX.$container      = $(`<div class='${CLASS.container}'></div>`);
        BOX.$button         = $(`<div class='${CLASS.button}'>FrontBox variables</div>`);
        BOX.$content        = $(`<div class='${CLASS.content}'></div>`);
        
        /* Draw template */
        ELEMENTS.$body.append( BOX.$container );
        BOX.$container.append( BOX.$button );
        BOX.$container.append( BOX.$content );
        
        /* Bind toggle container */
        BOX.$button.on("click", toggleContainer);
    };

    /* Add data to debug variable content */
    const _add = (dataName, DATA) => {

        /* Remove duplicate */
        _remove(dataName);

        /* Prepare variables */
        let
        name            = createName(dataName);

        CONTENT[name] = {
            data: DATA,
            name: name,
        };

        BOX.$content.append(`<h2>${name}</h2>`);
        
        for (const key in DATA) {
            const value = DATA[key];

            let
            itemId          = createName(key),
            id              = `debug-variable-${name}-${itemId}`,
            itemTemplate    = `<p>${key}<span id='${id}'>${value}</span> </p>`,
            $item           = $(itemTemplate);
            
            BOX.$content.append($item);
            $item.on("click", {$item}, toggleValue);
        }
    };

    /* Remove data in debug variable content */
    const _remove = (dataName) => {
        if (typeof CONTENT[dataName] != "undefined") {
            delete CONTENT[dataName];
        }
    };

    /* Refresh data in debug variable content */
    const _refresh = (name) => {
        var
        item = CONTENT[name],
        data = item.data;

        for (const key in data) {
            const value = data[key];

            let
            name = key.split(" ").join("-").toLowerCase(),
            find = `debug-variable-${item.name}-${name}`;

            $(`#${find}`).text(value);
        }
    };

    /* Create name */
    const createName = (name) => {
        return name.toLowerCase().replace(/-|\+|:|\/|\?|\.|\@|\#|\!|\_| |\,|\$|/g, "");
    };
    
    /**
     * Toggle
     */

    /* container */
    const
    toggleContainer = () => {
        BOX.$container.toggleClass("debug-box--hide");
    };

    /* value */
    const
    toggleValue = (e) => {      
        e.data.$item.toggleClass("js_focus");
    };

    start();

    return {
        add: _add,
        remove: _remove,
        refresh: _refresh,
    };

};