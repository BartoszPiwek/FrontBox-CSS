import { html, body } from './elements';
import { getScrollPosition, isScrollbar } from './browser';

/**
 * Toggle scroll lock for body element
 * Export "%scrollbar-placeholder" for CSS Selectorn to include scrollbar space
 *
 * @class
 * @version					1.0
 * @css							scroll-lock.scss
 * @require					getScrollPosition
 * @changelog
 * 26.06.2019 Support custom properties polyfill
 * 20.06.2019 Add
 */

export class ScrollLock {
	private _state: boolean = false;
	private positionTop: number;
	private cssActiveClass: string = 'js_scroll-lock';
	private cssActiveScrollbar: string = 'js_scrollbar-active';

	public get state(): boolean {
		return this._state;
	}

	private on() {
		this.positionTop = getScrollPosition();
		body.style.top = `-${this.positionTop}px`;
		if (isScrollbar()) {
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
		/* Ignore change to same state */
		if (this._state === state) {
			return;
		}

		if (state === true) {
			this.on();
		} else {
			this.off();
		}
	}
}
