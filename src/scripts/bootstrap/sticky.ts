import { ScrollLock } from './scroll-lock';
import { Browser } from './browser';

interface ISticky {
	browser: Browser;
	$element: HTMLElement;
	scrollLock: ScrollLock;
}

/**
 * Toggle burger menu with overlay
 *
 * @class						BurgerMenu
 * @version					1.0
 * @css							burger-menu.scss
 * @require					ScrollLock object
 */

export class Sticky {
	browser: Browser;
	scrollLock: ScrollLock;
	active: boolean;
	$element: HTMLElement;
	offset: number;

	constructor(param: ISticky) {
		this.browser = param.browser;
		this.scrollLock = param.scrollLock;
		this.$element = param.$element;

		window.addEventListener('resize orientationchange', () => {
			this.refresh();
		});
		this.refresh();

		window.addEventListener('scroll', () => {
			this.onScroll();
		});
		this.onScroll();
	}

	private refresh() {
		this.offset = this.$element.parentElement.offsetTop;
		console.log(this.offset);
	}

	private onScroll() {
		if (!this.scrollLock.state) {
			if (this.browser.scroll.top > this.offset) {
				if (!this.active) {
					this.active = true;
					this.$element.parentElement.classList.add(`js_sticky`);
				}
			} else {
				if (this.active) {
					this.active = false;
					this.$element.parentElement.classList.remove(`js_sticky`);
				}
			}
		}
	}
}

/**
 * Changelog
 * 26.06.2019 Add
 */
