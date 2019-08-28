import { Component } from './component';
import { scrollLock, browser } from '../app';

/**
 * Add sticky style to element
 *
 * @version					1.0
 * @style						burger-menu.scss
 * @require					ScrollLock
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
		/* Don't run detection when scrollLock is on */
		if (!scrollLock.state) {
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
