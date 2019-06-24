import { html, body } from "./data/elements";
import { getScrollbarWidth, getScrollPosition } from "./data/browser";

/**
 * Toggle scroll lock for body element
 * Export "%scrollbar-placeholder" to include scrollbar space
 *
 * @class ScrollLock
 * @version 1.0
 * @css
 * scroll-lock.scss
 * @require
 * getScrollbarWidth, getScrollPosition
 *
 * 20.06.2019 Add
 */

export class ScrollLock {

	state: boolean;
	positionTop: number;

	private on() {
		this.positionTop = getScrollPosition();
		body.style.top = `-${this.positionTop}px`;
		html.classList.add('js_scroll-lock');
		this.state = true;
	}

	private off() {
		html.classList.remove('js_scroll-lock');
		window.scrollTo(0, this.positionTop);
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

		getScrollbarWidth();

		if (state === true || this.state) {
			this.off();
		}
		else {
			this.on();
		}

		/* test-code */
		console.info(`ScrollLock\n- fired scrollLock() function with parameter '${state}', state is '${this.state}'`);
		/* end-test-code */
	}
}

