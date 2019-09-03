import { browser } from '../app';

/**
 * Add sticky style to element
 *
 * @function
 * @version					1.0
 * @style						javascript.scss
 * @require					Browser
 * @changelog
 * 30.08.2019 Cleaning
 * 26.06.2019 Add
 */

interface ITransitionSide {
	element: Element;
	callbackAfter?: Function;
}

export function transitionSize(param: ITransitionSide) {
	const container = param.element.parentElement;
	let eventListener: EventListener = () => {
		container.classList.remove('js_transition');
		container.style.height = null;

		if (param.callbackAfter) {
			param.callbackAfter();
		}

		container.removeEventListener(browser.transitionEvent, eventListener);
		return false;
	};

	container.classList.add('js_transition');
	container.style.height = `${container.clientHeight}px`;

	window.setTimeout(() => {
		container.style.height = `${param.element.clientHeight}px`;
		container.addEventListener(browser.transitionEvent, eventListener);
	});
}
