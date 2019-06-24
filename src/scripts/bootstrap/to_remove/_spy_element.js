/*=========================================================================
|| FILE: spy_element.js
===========================================================================
|| Create float element (ASIX Y) in container
=========================================================================*/

$.fn.spyElement = function(options) {

  // Settings
  //  $("#js-spy__element-1").spyElement({
  //   top: $("#spy-container"),
  //   bottom: $("#spy-container"),
  // });
  
  
  var settings = $.extend({
    top: null,
    bottom: null,
    class: "js_spy",
  }, options);

  // Main variables
  var $this = $(this),
    // Status
    // 0 - stop, 1 - active, 2 - bottom
    status = 0;

  // Borders object
  var spy_border = {
    $top: $(settings.top),
    $bottom: $(settings.bottom),
  };

  // Page object
  var page = {
    height: null,
    scroll: null,
    end: null,
  };

  var element = {
    now_top: null,
    now_bottom: null,
    top: null,
    left: null,
    height: null,
  };


  var spy_element = function() {

    // Calculate element new position
    var offset = $this.offset();
    $.extend(true, element, {
      now_top: offset.top,
      now_bottom: offset.top + element.height,
    });

    $.extend(true, page, {
      scroll: document.body.scrollTop || document.documentElement.scrollTop,
      end: (document.body.scrollTop || document.documentElement.scrollTop) + window.innerHeight,
    });

    // TOP
    if (page.scroll >= element.now_top && page.scroll < spy_border.bottom) {
      $this.addClass('run');
      status = 1;
    }
    if (page.scroll < element.top) {
      $this.removeClass('run');
      status = 0;
    }

    // BOTTOM
    if (status === 1 && spy_border.bottom <= page.scroll + element.height) {
      $this.addClass('bottom').removeClass('run');
      status = 2;
    } else if (status === 2 && spy_border.bottom > page.scroll + element.height + 1) {
      $this.removeClass('bottom')
      $this.addClass('run');
      status = 1;
    }
  };

  $(window).on("scroll", spy_element);

  // Recalculate
  var page_resize = function() {

    $this.removeClass("bottom run");

    // Borders values
    $.extend(true, spy_border, {
      top: spy_border.$top.offset().top,
      bottom: spy_border.$bottom.offset().top + spy_border.$bottom.outerHeight(true),
    });

    // Page values
    $.extend(true, page, {
      height: (document.body.scrollTop || document.documentElement.scrollTop) + document.body.offsetHeight,
    });


    // Element values
    var offset = $this.offset();
    $.extend(true, element, {
      top: offset.top,
      height: $this.outerHeight(true),
      left: offset.left,
    });


    // Element CSS
    $this.css({
      "left": element.left
    });

    // End run spy function to check object position
    spy_element();
  };

  page_resize();

  $(window).on("resize", page_resize);

  // End plugin
}

if ($(".js-spy__element").length) {
  $("#js-spy__element-1").spyElement({
    top: $("#spy-container"),
    bottom: $("#spy-container"),
  });
}
