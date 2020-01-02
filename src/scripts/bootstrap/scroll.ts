import { html, body } from './elements';
import { browser } from '../app';
import { easeInOutQuad } from '../tools/transition';
import { headerHeight } from '../../../consts';

/**
 * Toggle scroll lock for body element
 * Export "%scrollbar-placeholder" for CSS Selectors to include scrollbar space
 *
 * @class
 * @version					1.0
 * @css							scroll-lock.scss
 * @require					getScrollPosition
 * @changelog
 * 26.06.2019 Support custom properties polyfill
 * 20.06.2019 Add
 */

interface IScrollTo {
	element: HTMLElement;
	time: number;
	offset?: number;
	callbackAfter?: Function;
}

export class Scroll {
	private _state: boolean = false;
	private positionTop: number;
	private cssActiveClass: string = 'js_scroll-lock';
	private cssActiveScrollbar: string = 'js_scrollbar-active';

	public get state(): boolean {
		return this._state;
	}

	private on() {
		this.positionTop = browser.scrollPosition;
		body.style.top = `-${this.positionTop}px`;

		if (browser.isScrollbar) {
			html.classList.add(this.cssActiveScrollbar);
		}

		html.classList.add(this.cssActiveClass);
		this._state = true;
	}

	private off() {
		html.classList.remove(this.cssActiveClass, this.cssActiveScrollbar);
		window.scrollTo(0, this.positionTop);
		body.style.top = '';
		this.positionTop = 0;
		this._state = false;
	}

	public change(state?: boolean) {
		if (this._state === state) {
			return;
		}

		if (state === true) {
			this.on();
		} else {
			this.off();
		}
	}

	public to(param: IScrollTo) {
		this.change(true);

		const offset = param.offset ? param.offset : 0;
		const start = this.positionTop;
		let change = param.element.offsetTop - start - headerHeight[browser.responsive] - offset;
		let increment = 20;
		let currentTime = 0;

		if (change - start > browser.documentHeight - browser.height) {
			change = browser.documentHeight - browser.height;
		}

		const animateScroll = () => {
			currentTime += increment;

			const val = easeInOutQuad(currentTime, start, change, param.time);

			body.style.top = `-${val}px`;

			if (currentTime < param.time) {
				setTimeout(animateScroll, increment);
			} else {
				this.positionTop = change;
				this.change(false);

				if (param.callbackAfter) {
					param.callbackAfter();
				}
			}
		};
		animateScroll();
	}
}
