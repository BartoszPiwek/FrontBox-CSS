define(function () {
  return {

    data: {
      container: `[data-bind="input-counter"]`,
      input: `.input-counter__input`,
      button: `.input-counter__btn`,
    },
    $items: null,

    start(data = false) {
      var self = this;

      var item1 = new self.item("Dupa");
      item1.printInfo();
      // self.refresh(data);
    },

    funtion : {
      constructor(name) {
        this.name = name;
      },
      printInfo() {
        console.log(this.name);
      }
    },

    buttonUnbind($element) {
      var self = Main.formInputCounter;
      $element.off("click", self.buttonClick);
    },

    buttonBind() {
      var self = Main.formInputCounter;
      $.each(self.$items, function(indexInArray, valueOfElement){

        var 
        $this = $(this),
        $buttons = $(self.data.button),
        $input = $(self.data.input),
        value = Number($input.val()),
        data = {
          max: Number($input.attr("max")),
          min: Number($input.attr("min")),
        },
        active = {
          minus: (value > data.min),
          plus: (value < data.max),
        };

        var buttonClick = () => {
          


          /* test-code */
          Main.debugConsole.add("Trigger formInputCounter.buttonClick()<br> Value change " + this, 'click');
          /* end-test-code */
        };
        $buttons.on("click", buttonClick);

        var inputValue = () => {
          return value;
        };
        console.log(inputValue());
        $input.on("getValue", inputValue);

      });
    },    
    
    refresh(data) {
      var self = this;

      if (data) {
        self.changeData(data);
      }
      
      self.$items = $(self.data.container);
      self.buttonBind();
    },

    changeData(data) {
      var self = this;
      $.extend( self.data, data );
    },

    readValue($input) {
      var self = Main.formInputCounter;

      $.each(self.$items, function(key, value) { 
        var $value = $(value);
        if ($value.is($input)) {
          return $input.trigger("getValue");
        }
      });
    }

  };
});