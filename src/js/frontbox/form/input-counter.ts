interface InputCounterData {
  wrap: string,
  input: string,
  buttons: string,
  disable: string,
}

export class InputCounter {

  private $elements: JQuery<HTMLElement>

  wrap: string
  input: string
  buttons: string
  disable: string

  constructor( data: InputCounterData ) {
    this.wrap = data.wrap;
    this.input = data.input;
    this.buttons = data.buttons;
    this.disable = data.disable;

    this.refresh();
  }

  changeValue() {

  }

  refresh() {

    if (this.$elements) this.$elements.off("click", this.changeValue);

    this.$elements = $(this.wrap);

    this.$elements.on("click", this.changeValue);

  }

}