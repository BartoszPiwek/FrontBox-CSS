import { Component } from './component';
import { scroll, browser } from '../app';

/**
 * Add sticky style to element
 *
 * @class
 * @version					1.0
 * @style						burger-menu.scss
 * @require					Scroll
 * @changelog
 * 26.06.2019 Add
 */

interface ISticky {
	element: HTMLElement;
}

export class Sticky extends Component {
	element: HTMLElement;

	active: boolean;
	offset: number;

	constructor(param: ISticky) {
		super(param);
	}

	public onResize() {
		this.offset = this.element.parentElement.offsetTop;
	}

	public onScroll() {
		/* Don't run detection when scroll is on */
		if (!scroll.state) {
			if (browser.scroll.top > this.offset) {
				if (!this.active) {
					this.active = true;
					this.element.parentElement.classList.add(`js_sticky`);
				}
			} else if (this.active) {
				this.active = false;
				this.element.parentElement.classList.remove(`js_sticky`);
			}
		}
	}
}
