module.exports = {

  $burger: $("#burger-button"),
  $menu: $("#burger-menu"),
  $menu_container: $("#burger-menu-container"),
  
  active: false,
  moving: false,
  
  SETTINGS: {
    wait: 300,
    style: null,
  },
  
  start(settings = false) {
    var self = this;

    self.$burger.on("click", self.burgerClick);
  
    /* test-code */
    Main.debugVariables.add({
      'Burger active': self.active,
      'Burger moving': self.moving,
    });
    /* end-test-code */
  },
  
  toggleOff() {
    var self = Main.headerBurger;
  
    /* test-code */
    Main.debugConsole.add("Burger toggleOff", "click");
    /* end-test-code */
  
    self.moving = true;
    self.active = false;
  
    Main.ELEMENTS.$html.removeClass('js_menu-active');
  
  
    /* test-code */
    Main.debugVariables.add({
      'Burger moving': self.moving,
      'Burger active': self.active,
    });
    /* end-test-code */
  
    window.setTimeout(function(){
      self.moving = false;
      Main.ELEMENTS.$html.removeClass('js_menu-active--end');
  
      /* test-code */
      Main.debugVariables.add({
        'Burger moving': self.moving,
      });
      /* end-test-code */
  
    }, self.SETTINGS.wait);
  
  },
  
  toggleOverlay() {
    var self = Main.headerBurger;
  
    /* test-code */
    Main.debugConsole.add("Burger overlay toggleOff", "click");
    /* end-test-code */
  
    Main.ELEMENTS.$overlay.off('click', self.toggleOverlay);
  
    self.toggleOff();
  
    return false;
  },
  
  burgerClick() {
    var self = Main.headerBurger;
  
    if (!self.moving) {
  
      /* test-code */
      Main.debugConsole.add("Burger clicked", "click");
      /* end-test-code */
  
      if (self.active) {
        self.toggleOff();
      } else {
  
        /* test-code */
        Main.debugConsole.add("Burger toggleOn", "click");
        /* end-test-code */

        if (self.SETTINGS.style) {
          switch (self.SETTINGS.style) {

            /**
              * For burger animation
              * @import "../plugins/animation/navbar/under-header";
              * 
              */
            case 'under-header':
            $menu.style.height = $menu_container.offsetHeight + 'px';
              break;
          
            default:
              break;
          }
        }
  
        
  
        Main.ELEMENTS.$html.addClass('js_menu-active');
        Main.ELEMENTS.$overlay.on('click', self.toggleOverlay);
  
        self.moving = true;
        self.active = true;
  
        /* test-code */
        Main.debugVariables.add({
          'Burger active': self.active,
          'Burger moving': self.moving,
        });
        /* end-test-code */
  
        window.setTimeout(function() {
  
          Main.ELEMENTS.$html.addClass('js_menu-active--end');
          self.moving = false;
  
          /* test-code */
          Main.debugVariables.add({
            'Burger moving': self.moving,
          });
          /* end-test-code */
  
        }, self.SETTINGS.wait);
      }
  
    } 
    /* test-code */
    else {
      Main.debugConsole.add("Burger click blocked. Burger is moving");
    }
    /* end-test-code */
  
    return false;
  },

};