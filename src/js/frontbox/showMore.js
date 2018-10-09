module.exports = {

  $items: null,

  refresh() {
    var self = this;

    if (self.$items) {
      self.$items.off("click", self.click);
    }
    self.$items = $("[data='showMore']");

    if (self.$items.length) {
      self.$items.each( self.checkVisibleSpace );
    }

  },

  start() {
    var self = this;

    Main.bindResize.add("showMore", ()=>{
      self.refresh();
    });

  },

  checkVisibleSpace() {

    var 
    self = Main.showMore,
    $this = $(this),
    dataTarget = $this.attr('data-target'),
    $wrap, $container;

    switch (dataTarget) {
      case "prevElement":
        $wrap = $this.prev();
        $container = $wrap.find(".show-more__content").first();
        break;
      case "nextElement":
        $wrap = $this.next();
        $container = $wrap.find(".show-more__content").first();
        break;
    
      default:
        $container = $this;
        break;
    }

    if ($wrap.outerHeight( true ) < $container.outerHeight( true )) 
    {
      $this.removeClass("hide");
      $this.on("click", self.click);          
    } 
    else 
    {
      $this.addClass("hide");
    }

  },

  click(e) {

    e.preventDefault();

    var 
    self = Main.showMore,
    $this = $(this),
    dataTarget = $this.attr('data-target'),
    $container,
    $wrap;

    switch (dataTarget) {
      case "prevElement":
        $wrap = $this.prev();
        $container = $wrap.find(".show-more__content").first();
        break;
      case "nextElement":
        $wrap = $this.next();
        $container = $wrap.find(".show-more__content").first();
        break;
    
      default:
        $container = $this;
        break;
    }

    if ($this.hasClass("js_active")) {
      self.off($this, $wrap, $container);
      return false;
    }

    self.on($this, $wrap, $container);
  },

  on($link, $item, $container) {

    var self = Main.showMore;

    $link.addClass("js_active");

    Main.transitionHeight.on({
      $this: $item, 
      $container: $container,            
      callback: () => {
        $item.addClass("show-more--active");
      },  
    });
  },
  
  off($link, $item, $container) {

    var self = Main.showMore;

    $link.removeClass("js_active");

    Main.transitionHeight.off({
      $this: $item, 
      $container: $container,    
      callbackBefore: () => {
        $item.removeClass("show-more--active");
      } 
    });
  }

};