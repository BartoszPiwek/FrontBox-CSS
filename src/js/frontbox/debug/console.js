module.exports = (data) => {

    DATA = {
        $container: null,
        $element: null,
        $button: null,
        $body: null,
        open: false,
    };

    $.extend( DATA, data );
    
    var start = (data) => {

        var debugBoxClass = 'debug-box debug-box--console';
        if (!DATA.open) {
            debugBoxClass += ' debug-box--hide';
        }
    
        var debugBox = $(`<div class='${debugBoxClass}' id='debug-box-console'></div>`);
        var debugBoxButton = $("<div id='debug-box-console-button' class='debug-box__button'>FrontBox console</div>");
        var debugBoxContainer = $("<div id='debug-box-console-container' class='debug-box__container'></div>");
    
        DATA.ELEMENTS.$body.append(debugBox);
        DATA.$element = $("#debug-box-console");
    
        DATA.$element.append(debugBoxButton);
        DATA.$element.append(debugBoxContainer);
    
        DATA.$button = $("#debug-box-console-button");
        DATA.$container = $("#debug-box-console-container");
    
        var toggleDebugBox = () => {
            DATA.$element.toggleClass("debug-box--hide");
        };
        
        DATA.$button.on("click", toggleDebugBox);
    
    };
    
    var add = (addString, addonClass = '') => {
        DATA.$container.append("<p class='" + addonClass + "'>"+addString+"</p>");
    };

    start();

    return {
        add: add,
    };

};