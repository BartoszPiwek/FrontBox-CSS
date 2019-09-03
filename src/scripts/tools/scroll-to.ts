import { easeInOutQuad } from './transition';
import { browser } from '../app';
import { headerHeight } from '../../../consts';

/**
 * Scroll browser to element
 *
 * @function
 * @version					1.0
 * @example
scrollTo({
	element: document.getElementById('scrollTo'),
	time: 1000,
	offset: 20
});
 * @require					Browser, easeInOutQuad, headerHeight
 * @changelog
 * 04.08.2019 Add
 */

interface IScrollTo {
	element: HTMLElement;
	time: number;
	offset?: number;
	callbackAfter?: Function;
}

export function scrollTo(param: IScrollTo) {
	const offset = param.offset ? param.offset : 0;
	const start = browser.scroll.top;
	const change = param.element.offsetTop - start - headerHeight[browser.responsive] - offset,
		increment = 20;
	let currentTime = 0;

	(function animateScroll() {
		currentTime += increment;

		const val = easeInOutQuad(currentTime, start, change, param.time);

		document.documentElement.scrollTop = val;

		if (currentTime < param.time) {
			setTimeout(animateScroll, increment);
		} else {
			if (param.callbackAfter) {
				param.callbackAfter();
			}
		}
	})();
}
