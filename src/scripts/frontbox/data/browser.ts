import { body, html } from "./../data/elements";
import { breakpointsDefault } from "./../data/css";

export function getScrollbarWidth(): number {
	const output = window.innerWidth - document.documentElement.clientWidth;
	html.style.setProperty('--scrollbarWidth', `${String(output)}px`);
	return output;
}

export function getScrollPosition(): number {
	const output = window.pageYOffset || html.scrollTop;
	return output;
}

export function getTransitionEvent(): string {
	const
		element = document.createElement("getTransitionEvent"),
		transitions = {
			"transition": "transitionend",
			"OTransition": "oTransitionEnd",
			"MozTransition": "transitionend",
			"WebkitTransition": "webkitTransitionEnd"
		};

	for (const key in transitions) {
		if (element.style[key] !== undefined) {
			return transitions[key];
		}
	}
	/* test-code */
	console.error(`Browser\n-fired getTransitionEvent() function and return undefined transition`);
	/* end-test-code */
}

/**
 * @class Browser
 */
export class Browser {

	private transitionEvent: string;

	private width: number;
	private height: number;
	private responsive: string;
	private orientation: string;
	private portable: string | boolean;

	constructor() {

		console.log(`Browser`);

		this.transitionEvent = getTransitionEvent();
		this.portable = this.getMobileOperatingSystem();

		this.refresh();

		/* test-code */
		console.table({
			width: this.width,
			height: this.height,
			responsive: this.responsive,
			orientation: this.orientation,
			portable: this.portable,
		})
		/* end-test-code */

	};

	/* Determine the mobile operating system */
	private getMobileOperatingSystem(): string | boolean {

		let userAgent = navigator.userAgent || navigator.vendor;

		// Windows Phone must come first because its UA also contains "Android"
		if (/windows phone/i.test(userAgent)) {
			return 'Windows Phone';
		}

		if (/android/i.test(userAgent)) {
			return 'Android';
		}

		// iOS detection from: http://stackoverflow.com/a/9039885/177710
		if (/iPad|iPhone|iPod/.test(userAgent) && !!navigator.platform) {
			return 'iOS';
		}

		// PHP user agent
		if (body.classList.contains('device-portable')) {
			return true;
		}

		return false;
	};

	private refresh(): void | boolean {

		/* Prepare variables */
		let
			width = window.innerWidth,
			lastWidth = this.width,
			height = window.innerHeight,
			lastHeight = this.height,
			orientation = this.getOrientation(),
			lastOrientation = this.orientation;

		/* Set variables */
		this.width = width;
		this.height = height;
		this.responsive = this.getResponsive();

		/**
		 * Don't refresh page if user change tab 
		 * @browser Opera
		 */
		if (lastWidth === width && lastHeight === height && lastOrientation) {
			return false;
		}

	}

	private getResponsive(): string {
		for (const key in breakpointsDefault) {
			const value = breakpointsDefault[key];

			if (window.matchMedia(`(min-width: ${value}px)`).matches) {
				return key;
			}
		}
		return 'mobile';
	}

	private getOrientation(): string {
		if (window.matchMedia("(orientation: portrait)").matches) {
			return 'portrait';
		}
		else {
			return 'landscape';
		}
	}

};
