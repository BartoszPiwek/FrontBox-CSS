window.fullslider = function() {

  var fullslider = {

    // Const search elements
    container: '#js_slider_container',
    items: '.js_slide',

    // Options
    dots: true,
    arrows: true,

    // jQuery element
    $container: null,
    $body: $("body"),
    $page: $("hmtl, body"),
    $slides: $(".js_slide"),
    $slides_content: $("#js_slider_container"),
    $dots_container: $("#slide__dots"),

    // Template
    dot_template: function(index) {
      return '<div class="slide__dot" data-slide="' + index + '"></div>';
    },

    // Variables
    slide_active: 0,
    allow_scroll: true,
    slides_length: null,
    mousewheel: false,
    slide_object: {},
    dots_object: {},
    page: {
      width: null,
      height: null,
      responsive: null,
      offset: null,
    },

    // Initial function - build fullslider
    init: function() {

      // Add first slide class
      this.$body.addClass("js-slide-0");

      this.initWindowResize();
      this.scroll_axis();
      this.build_slides();
      this.slide_active_button();
    },

    scroll_axis: function() {
      var self = this,
        value = 0,
        last_scroll = 0;

      $(window).on('mousewheel', function(event, delta) {

        if (self.page.responsive <= 1) {

          last_scroll = delta * 30;

          self.page.offset = $(window).scrollLeft();
          event.preventDefault();
        } else {
          self.page.offset = $(window).scrollTop();
        }

        console.log("Last scroll " + last_scroll);

        self.scroll_slide_trigger(last_scroll);

      });

      $(".js_slide").swipe({
        swipe: function(event, direction, distance, duration, fingerCount) {
          if (self.page.responsive > 1) {
            if (direction === "up" && self.slide_active + 1 <= self.slides_length) {
              console.log("down");
              self.change_slider_active(self.slide_active + 1);
            } else if (direction === "down" && self.slide_active - 1 >= 0) {
              console.log("top");
              self.change_slider_active(self.slide_active - 1);
            }
          }
        },
        allowPageScroll: "none",
        threshold: 0,
      });

    },

    // Rebuild slide objects
    rebuild_slide_object: function() {
      var self = this,
        offset;

      self.$slides.each(function(index) {
        var $this = $(this);

        self.slide_object[index] = {
          element: $this[0],
          offset: null,
          index: index
        };

        if (self.page.responsive <= 1) {
          offset = $this.offset().left;
        } else {
          offset = $this.offset().top;
        }

        self.slide_object[index].offset = offset;

      });

      self.slides_length = self.$slides.length;
      self.$slides_content.css({
        width: 100 * self.slides_length + "vw"
      });

      self.slides_length--;

      console.log(self.slide_object);
    },

    // Main build
    // rebuild_slide_object, build slider dots
    build_slides: function() {
      var self = this,
        temp = "";

      self.rebuild_slide_object();

      for (var i = -1; i < self.slides_length; i++) {
        temp += self.dot_template(i + 1);
      }

      self.$dots_container.append(temp);

      $("[data-slide]").each(function(index) {
        var $this = $(this);
        self.dots_object[index] = {
          element: $this,
          index: index
        };
      });

      self.dots_object[0].element.addClass("active");
    },

    scroll_slide_trigger: function(last_scroll) {

      var self = this,
        window_scroll_value,
        check_element,
        check_element_offset,
        element_axis,
        window_axis,
        change_slider = false;


      if (self.page.responsive <= 1) {
        window_axis = self.page.width;
      } else {
        window_axis = self.page.height;
      }

      console.log(self.page.offset, last_scroll);
      window_scroll_value = self.page.offset - last_scroll;
      console.log(window_scroll_value);
      for (var i = self.slides_length; i >= 0; i--) {

        check_element = self.slide_object[i];
        check_element_offset = Math.abs(check_element.offset - window_scroll_value);
        console.log(check_element_offset, window_axis / 1.5);
        if (self.slide_active !== check_element.index && check_element_offset <= window_axis / 1.5) {
          console.log("Active: " + i);
          self.change_slider_active(i);
          change_slider = true;
        }

      }

      if (self.allow_scroll && self.page.responsive <= 1) {
        console.log("Scroll");
        $("html, body").animate({
          scrollLeft: '-=' + last_scroll
        }, 0);
      }
    },

    change_slider_active: function(i) {

      console.log("Index active: " + i);

      var self = this;

      if (self.allow_scroll) {
        self.allow_scroll = false;

        if (self.page.responsive <= 1) {
          $("html, body").animate({
            scrollLeft: self.slide_object[i].offset,
          }, 600, function() {
            self.allow_scroll = true;
          });
        } else {
          $("html, body").animate({
            scrollTop: self.slide_object[i].offset,
          }, 600, function() {
            self.allow_scroll = true;
          });
        }
      }

      self.$body.addClass("js-slide-" + i);
      self.dots_object[i].element.addClass("active");

      self.$body.removeClass("js-slide-" + self.slide_active);
      self.dots_object[self.slide_active].element.removeClass("active");

      self.slide_active = i;

      $("#data-log-1").html(self.slide_active);
    },

    slide_active_button: function() {
      var self = this;
      var scrollTo = function() {
        var $this = $(this),
          slide_to_index = $this.attr("data-slide");

        if (isNaN(+slide_to_index)) {
          if (slide_to_index === 'prev') {
            slide_to_index = self.slide_active - 1;
          } else {
            slide_to_index = self.slide_active + 1;
          }
        }

        if (slide_to_index < 0 || slide_to_index > self.slides_length) {
          console.log("Slide id don't exist (" + slide_to_index + ")");
          return false;
        }

        console.log(slide_to_index);

        if (self.allow_scroll) {
          self.change_slider_active(slide_to_index);
        }
      };

      self.$body.on("click", "[data-slide]", scrollTo);
    },

    // Resize
    initWindowResize: function() {

      var self = this;

      var window_resize = function() {

        setTimeout(function() {

          if (window.matchMedia('(min-width: 1024px)').matches) {
            self.page.responsive = 0;
          } else if (window.matchMedia('(min-width: 768px)').matches) {
            self.page.responsive = 1;
          } else {
            self.page.responsive = 2;
          }

          if (self.page.responsive <= 1) {
            self.$body.scrollTop(0);
          } else {
            self.$body.scrollLeft(0);
          }

          self.page.width = $(window).width();
          self.page.height = $(window).height();

          self.rebuild_slide_object();

        }, 600);
      };

      window_resize();
      $(window).on("resize", window_resize);
    },


  };

  console.log("Init fullslider");
  return fullslider.init();

};
