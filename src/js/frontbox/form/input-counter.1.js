initInputCounter: function() {

  var $items = $(".input-counter");

  if ($items.length) {
    $.each($items, function (indexInArray, valueOfElement) { 

      var 
      $this = $(valueOfElement),
      $input = $this.find(".input-counter__input"),
      value = Number($input.val()),
      data = {
        $minus: $this.find(".input-counter__btn--minus"),
        $plus: $this.find(".input-counter__btn--plus"),
        $buttons: $this.find(".input-counter__btn"),
        max: Number($input.attr("max")),
        min: Number($input.attr("min")),
      },
      active = {
        minus: (value > data.min),
        plus: (value < data.max),
      };

      var changeValue = function(){
        
        var $this = $(this);

        if ($this.hasClass("input-counter__btn--disable")) {
          return false;
        }

        var buttonValue = Number($this.attr("data-value"));

        value = value + buttonValue;

        if (value <= data.min && buttonValue < 0) 
        {
          value = data.min;
          if (active.minus) {
            active.minus = false;
            data.$minus.addClass("input-counter__btn--disable");
          }
        }
        else if (value >= data.max && buttonValue > 0) 
        {
          value = data.max;
          if (active.plus) {
            active.plus = false;
            data.$plus.addClass("input-counter__btn--disable");
          }
        } 

        else 
        {
          if (active.minus === false) {
            active.minus = true;
            data.$minus.removeClass("input-counter__btn--disable");
          }
          if (active.plus === false) {
            active.plus = true;
            data.$plus.removeClass("input-counter__btn--disable");
          }
        }

        $input.val(value);
      };

      data.$buttons.on("click", changeValue);

    });
  }

},