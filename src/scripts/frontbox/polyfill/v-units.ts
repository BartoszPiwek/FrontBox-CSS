
export class vUnits {

  private heightSize: number;

  constructor() {
    this.refresh();

    window.onresize = this.onResize;
  }

  onResize() {
    let active = document.getElementsByClassName('full-height');
    if ( active.length ) {
      this.refresh();
    }
  }

  refresh() {
    this.heightSize = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${this.heightSize}px`);
  }
}