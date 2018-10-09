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

        var debugBoxClass = 'debug-box debug-box--variables';
        if (!self.SETTINGS.open) {
            debugBoxClass += ' debug-box--hide';
        }
        
        var debugBox = $(`<div class='${debugBoxClass}' id='debug-box'></div>`);
        var debugBoxButton = $("<div id='debug-box-button' class='debug-box__button'>FrontBox variables</div>");
        var debugBoxContainer = $("<div id='debug-box-container' class='debug-box__container'></div>");
        
        ELEMENTS.$body.append(debugBox);
        self.$element = $("#debug-box");
        
        self.$element.append(debugBoxButton);
        self.$element.append(debugBoxContainer);
        
        self.$button = $("#debug-box-button");
        self.$container = $("#debug-box-container");
        
        var toggleDebugBox = function() {
            self.$element.toggleClass("debug-box--hide");
        };
        
        self.$button.on("click", toggleDebugBox);
        
    },

    click() {
        var $this = $(this);

        $this.toggleClass("js_focus");
    },
            
    fill: function() {
        var self = this;

        $(".debug-box__container > p").off("click", self.click);
        
        self.$container.empty();
        
        Object.keys(self.elements).forEach(function(key) {
            var idElement = key.split(" ").join("-").toLowerCase();
            self.$container.append("<p>" + key + "<span id='debug-box-" + idElement + "'></p>");
        });

        $(".debug-box__container > p").on("click", self.click);
        
        self.update();
    },
            
    update: function() {
        var self = this;
        
        Object.keys(self.elements).forEach(function(key) {
            var value = self.elements[key],
                idElement = key.split(" ").join("-").toLowerCase(),
                $item = $("#debug-box-" + idElement);
            $item.text(value);
        });
    },
            
    add: function(addObject) {
        var self = this;
        
        $.extend(self.elements, addObject);
        
        self.fill();
    },
            
    elements: {}
};