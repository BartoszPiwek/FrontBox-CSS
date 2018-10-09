module.exports = {

    SETTINGS: {
        spyTop: true,
        offset: 1,
        spyTopClass: 'header--shadow',
    },

    active: false,
    height: null,
    position: null,

    start(data) {
        var self = this;

        $.extend( self.SETTINGS, data );

        if (self.SETTINGS.spyTop) 
        {
            self.spyTop(self);
            ELEMENTS.$window.on("scroll", () => {
                self.spyTop(self);
            });   
        }
        console.log(`${self.SETTINGS.offset}`);
        self.calculateHeader();
    },

    calculateHeader() {
        var self = this;

        self.position = ELEMENTS.$headerPlaceholder.offset().top;
        self.height = ELEMENTS.$header.outerHeight(true);

        /* test-code */
        DEBUG.debugVariables.add({
            "Header height": self.height,
            "Header position": self.position,
        });
        /* end-test-code */
    },

    spyTop(self) {
        
        if (SCROLL.top > self.SETTINGS.offset) 
        {
            if (!self.active) 
            {
                self.active = true;
                ELEMENTS.$header.addClass(self.SETTINGS.spyTopClass);
            }
        } 
        else 
        {
            if (self.active) {
                self.active = false;
                ELEMENTS.$header.removeClass(self.SETTINGS.spyTopClass);
            }
        }

        /* test-code */
        DEBUG.debugVariables.add({
          'Header active': self.active,
        });
        /* end-test-code */

    },

};