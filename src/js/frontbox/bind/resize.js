/**
 * Resize
 */

module.exports = {

    resizeActive: false,
    resizeTime: 0,

    functionResizeTrigger() {
        var self = Main.bindResize;
        
        self.resizeActive = true;
        self.resizeTime += 250;
        
        self.functionResizePage();
    },

    functionResizePage() {
        var self = Main.bindResize;

        window.setTimeout( () => {
            
            if (self.resizeActive)
            {
                
                if (self.resizeTime > 800)
                {
                    self.resizeTime = 800;
                }
                else
                {
                    self.resizeTime -= 50;
                }

                if (self.resizeTime > 0) 
                {
                    Main.ELEMENTS.$body.addClass("js_resize");
                    self.functionResizePage();
                } 
                else
                {
                    self.resizeTime = 0;
                    self.resizeActive = false;
                    self.run();
                    Main.ELEMENTS.$body.removeClass("js_resize");
                }

                /* test-code */
                var debugBox = {
                    "Resized time ": self.resizeTime,
                    "Resized block ": self.resizeActive,
                };
                Main.debugVariables.add(debugBox);
                /* end-test-code */
            }

        }, self.resizeTime);
    },


    add(name, item) {
        var self = Main.bindResize;

        self.queue[name] = [item];
    },

    remove(name, item) {
        var self = Main.bindResize;

        delete self.queue[name];
    },

    clean() {
        var self = Main.bindResize;

        self.queue = {};
    },

    run() {
        var self = Main.bindResize;

        $.each(self.queue, function(index, value) {
            (value[0])();
        }); 
 
    },

    queue: {},


    onResizeBind() {
        var self = this;

        Main.ELEMENTS.$window.on('resize orientationchange', self.functionResizeTrigger);
    },

    offResizeBind() {
        var self = this;

        Main.ELEMENTS.$window.off('resize orientationchange', self.functionResizeTrigger);
    },
  
};