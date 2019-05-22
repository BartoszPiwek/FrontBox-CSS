/*=========================================================================
|| FILE: frontbox_scroll.js
===========================================================================
|| TODO
=========================================================================*/

$.fn.frontbox_scroll = function(options) {

    var $box = $(this),
        boxHeight = $box.height(),
        content = $box.html(),
        template = '<div class="js_scroll__bar"><span class="js_scroll__position"></span></div><div class="js_scroll__content">' + content + '</div>';

    $box.html(template);

    var $scroll = $box.find(".js_scroll__position"),
        $scrollBar = $box.find(".js_scroll__bar"),
        $content = $box.find(".js_scroll__content"),
        contentHeight = $content.outerHeight(true);

        $scroll.css("height", (contentHeight / boxHeight) * 10 + "%" );
        console.log(contentHeight, boxHeight);
        

    var scroll = function(e) {
      console.log($box.scrollTop());
      var currentScroll = $box.scrollTop();

      if(e.originalEvent.wheelDelta < 0) {
        //scroll down
        $box.scrollTop(currentScroll + 20);
      }else {
        //scroll up
        $box.scrollTop(currentScroll - 20);
      }

      currentScroll = $box.scrollTop();

      $scroll.css("top", (currentScroll) / 10 + "%" );
      $scrollBar.css("top", currentScroll);

      return false;
    };

    $box.on("mousewheel", scroll);
  };
