module.exports = (data) => {

    var 
    DATA = {
        $container: null,
        $element: null,
        $button: null,
        $body: null,
        open: false,
    },
    elements = {};

    $.extend( DATA, data );
        
    var start = (data) => {

        var debugBoxClass = 'debug-box debug-box--variables';
        if (!DATA.open) {
            debugBoxClass += ' debug-box--hide';
        }
        
        var debugBox = $(`<div class='${debugBoxClass}' id='debug-box'></div>`);
        var debugBoxButton = $("<div id='debug-box-button' class='debug-box__button'>FrontBox variables</div>");
        var debugBoxContainer = $("<div id='debug-box-container' class='debug-box__container'></div>");
        
        DATA.ELEMENTS.$body.append(debugBox);
        DATA.$element = $("#debug-box");
        
        DATA.$element.append(debugBoxButton);
        DATA.$element.append(debugBoxContainer);
        
        DATA.$button = $("#debug-box-button");
        DATA.$container = $("#debug-box-container");
        
        var toggleDebugBox = function() {
            DATA.$element.toggleClass("debug-box--hide");
        };

        DATA.$button.on("click", toggleDebugBox);
                
    };
            
    var fill = () => {
        var self = this;

        $(".debug-box__container > p").off("click", self.click);
        
        DATA.$container.empty();
        
        Object.keys(elements).forEach(function(key) {
            var idElement = key.split(" ").join("-").toLowerCase();
            DATA.$container.append("<p>" + key + "<span id='debug-box-" + idElement + "'></p>");
        });

        $(".debug-box__container > p").on("click", self.click);
        
        update();
    };
            
    var update = () => {        
        Object.keys(elements).forEach(function(key) {
            var value = elements[key],
                idElement = key.split(" ").join("-").toLowerCase(),
                $item = $("#debug-box-" + idElement);
            $item.text(value);
        });
    };
            
    var add = (addObject) => {
        
        $.extend(elements, addObject);
        
        fill();
    };

    start();

    return {
        add: add,
    };
};