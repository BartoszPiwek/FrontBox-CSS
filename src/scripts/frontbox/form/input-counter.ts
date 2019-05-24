import * as $ from "jquery";

interface InputCounterCSSClass {
  wrap: string,
  input: string,
  button: string,
  disable: string,
}

interface InputCounterData {
  cssClass: InputCounterCSSClass;
}

export class InputCounter {

  private $wrap: JQuery<HTMLElement> = null;
  private $input: JQuery<HTMLElement> = $();
  private $button: JQuery<HTMLElement> = $();

  private cssClass: InputCounterCSSClass;

  private active: boolean = false;

  constructor( data: InputCounterData ) {

    this.cssClass = data.cssClass;
    this.refresh();
    this.active = true;

  }

  changeValue() {

  }

  bind() {

  }

  unbind() {

  }

  loopElement() {}

  refresh() {

    /* Off previous bind clicks */
    if (this.active) {
        this.$input.off("click");
        this.$button.off("input");
        this.active = false;
    };

    /* Select elements */
    this.$wrap      = $( this.cssClass.wrap );

    /* Loop elements */
    this.$wrap.each( (i, element)=> {

        const
        $wrap = $(element),
        $input = $wrap.find( this.cssClass.input ),
        $button = $wrap.find( this.cssClass.button );

        this.$input.append( $input );
        this.$button.append( $button );
    });

    this.active = true;
  }

}