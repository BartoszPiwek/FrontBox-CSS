
import { root, body } from "../data/elements";

export class vUnits {

	private heightSize: number;
	private CSS: CSSStyleDeclaration;
	private template: string = `<p id='test-v-units' style='width: 50vw; opacity: 0;'></p>`;

	constructor() {
		if ( this.test() ) {
			this.CSS = root.style;
			this.refresh();
			window.onresize = this.onResize;
		}
	}

	test() {

		body.insertAdjacentHTML('beforeend', this.template);

		let vUnitTest = document.getElementById(`test-v-units`);

		let elemWidth = Number( getComputedStyle(vUnitTest, null).width );
		let halfWidth = Number( window.innerWidth / 2 );

		vUnitTest.parentNode.removeChild(vUnitTest);
		return elemWidth !== halfWidth;
	}

	onResize() {
		let active = document.getElementsByClassName('full-height');
		if (active.length) {
			this.refresh();
		}
	}

	refresh() {
		this.heightSize = window.innerHeight * 0.01;
		this.CSS.setProperty('--vh', `${this.heightSize}px`);
	}
}