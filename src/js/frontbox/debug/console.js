module.exports = {

    $container: null,
    $element: null,
    $button: null,

    SETTINGS: {
        open: false,
    },
    
    start: function(data) {
        var self = this;

        $.extend( self.SETTINGS, data );

        var debugBoxClass = 'debug-box debug-box--console';
        if (!self.SETTINGS.open) {
            debugBoxClass += ' debug-box--hide';
        }
    
        var debugBox = $(`<div class='${debugBoxClass}' id='debug-box-console'></div>`);
        var debugBoxButton = $("<div id='debug-box-console-button' class='debug-box__button'>FrontBox console</div>");
        var debugBoxContainer = $("<div id='debug-box-console-container' class='debug-box__container'></div>");
    
        ELEMENTS.$body.append(debugBox);
        self.$element = $("#debug-box-console");
    
        self.$element.append(debugBoxButton);
        self.$element.append(debugBoxContainer);
    
        self.$button = $("#debug-box-console-button");
        self.$container = $("#debug-box-console-container");
    
        var toggleDebugBox = () => {
            console.log("a");
            self.$element.toggleClass("debug-box--hide");
        };
        
        self.$button.on("click", toggleDebugBox);
    
    },
    
    add: function(addString, addonClass = '') {
        var self = this;
    
        self.$container.prepend("<p class='" + addonClass + "'>"+addString+"</p>");
    },

};