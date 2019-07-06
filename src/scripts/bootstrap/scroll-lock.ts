import { html, body } from './elements';
import { getScrollPosition, isScrollbar } from './browser';

/**
 * Toggle scroll lock for body element
 * Export "%scrollbar-placeholder" for CSS Selectorn to include scrollbar space
 *
 * @class						ScrollLock
 * @version					1.0
 * @css							scroll-lock.scss
 * @require					getScrollPosition
 */

export class ScrollLock {
	state: boolean;
	positionTop: number;
	cssActiveClass: string = 'js_scroll-lock';
	cssActiveScrollbar: string = 'js_scrollbar-active';

	private on() {
		this.positionTop = getScrollPosition();
		body.style.top = `-${this.positionTop}px`;
		if (isScrollbar()) {
			html.classList.add(this.cssActiveScrollbar);
		}
		html.classList.add(this.cssActiveClass);
		this.state = true;
	}

	private off() {
		html.classList.remove(this.cssActiveClass, this.cssActiveScrollbar);
		window.scrollTo(0, this.positionTop);
		body.style.top = '';
		this.positionTop = 0;
		this.state = false;
	}

	public change(state?: boolean) {
		if (state && this.state === state) {
			/* test-code */
			console.info(`ScrollLock\n- fired scrollLock() function with parameter '${state}', but state is already '${this.state}'`);
			/* end-test-code */
			return false;
		}

		if (state === true || this.state) {
			this.off();
		} else {
			this.on();
		}

		/* test-code */
		console.info(`ScrollLock\n- fired scrollLock() function with parameter '${state}', state is '${this.state}'`);
		/* end-test-code */
	}
}

/**
 * Changelog
 * 26.06.2019 Support custom properties polyfill
 * 20.06.2019 Add
 */
