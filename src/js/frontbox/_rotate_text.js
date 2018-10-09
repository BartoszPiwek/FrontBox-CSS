/*=========================================================================
|| FILE: rotate_text.js
===========================================================================
|| TODO
=========================================================================*/

$.fn.rotate_text = function(options) {
    var settings = $.extend({
      timer: 2000,
      active: 0,
    }, options);

    var $this = $(this),
        height = $this.first().height(),
        $children = $this.children(),
        active_element = settings.active,
        $active_element = $children.eq(active_element)

    $this.addClass('run').css('height', height);
    console.log($active_element);


    console.log(this);

    var timer_function = function(){
      $this.addClass('next');

      window.setTimeout(function(){
        console.log($this);
        console.log(active_element);
        $active_element.addClass('hide');
        $this.removeClass('next');
        console.log($active_element);
        active_element++
        $active_element = $children.eq(active_element);
        console.log(active_element);
      }, settings.timer / 2);

    };

    window.setInterval(timer_function, settings.timer);

  };
