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
        container       : `debug-box debug-box--variables`,
        button          : `debug-box__button`,
        content         : `debug-box__container`,
        item            : `debug-box__item`,
    };

    var
    CONTENT = {};

    /* Start module */
    var 
    start = (data) => {

        /* Prepare arguments data */
        $.extend( OPTIONS, argument.OPTIONS );
        ELEMENTS = argument.ELEMENTS;

        /* Check if container must be default open */
        if (!OPTIONS.open) {
            CLASS.container += ' debug-box--hide';
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
    

    /* Show data in content */
    const
    add = (dataName, DATA) => {
        
        CONTENT[dataName] = {
            data: DATA,
            name: dataName.split(" ").join("-").toLowerCase(),
        };

        BOX.$content.append(`<p class="${CLASS.item}">${CONTENT[dataName].name}</p>`);
        
        for (const key in DATA) {
            const value = DATA[key];

            let
            name = key.split(" ").join("-").toLowerCase(),
            id = `debug-variable-${CONTENT[dataName].name}-${name}`;
            $item = $(`<p> ${key} <span id='${id}'>${value}</span> </p>`);
            
            BOX.$content.append($item);

            $item.on("click", {$item}, toggleValue);
        }
    };

    /* Refresh data name in content */ 
    const
    refresh = (name) => {
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
    
    /* Toogle container */
    const
    toggleContainer = () => {
        BOX.$container.toggleClass("debug-box--hide");
    };
    /* Toogle value */
    const
    toggleValue = (e) => {      
        e.data.$item.toggleClass("js_focus");
    };

    start();

    return {
        add: add,
        refresh: refresh,
    };

};