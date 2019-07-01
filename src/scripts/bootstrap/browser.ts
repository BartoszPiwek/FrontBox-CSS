import { body, html } from "./elements";
import { breakpointsDefault } from "./css";

export function isScrollbar(): boolean {
	return window.innerWidth != document.documentElement.clientWidth;
}

// TODO remove
export function getScrollPosition(): number {
	return window.pageYOffset || html.scrollTop;
}

interface IScroll {
	top: number
	bottom: number
	center: number
	speed: number
	direction: string
}

/**
 * @class Browser
 */
export class Browser {

	public scroll: IScroll
	private transitionEvent: string
	public width: number
	public height: number
	private responsive: string
	private orientation: string
	private portable: string | boolean
	public scrollbarWidth: number

	constructor() {

		console.log(`Browser`);

		this.transitionEvent = this.getTransitionEvent();
		this.portable = this.getMobileOperatingSystem();

		this.refresh();
		window.addEventListener('scroll', () => {
			this.onScroll();
		});
		window.addEventListener('resize orientationchange', () => {
			this.onScroll();
		});
	};

	private getScrollbarWidth(): number {
		const
			$scrollbar: HTMLElement = document.getElementById('js_check-scrollbar'),
			$content: Element = $scrollbar.children.item(0),
			output = $scrollbar.offsetWidth - $content.clientWidth

		$scrollbar.parentNode.removeChild($scrollbar);
		return output;
	}

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

	private refresh() {
		this.responsive = this.getResponsive();
		this.scrollbarWidth = this.getScrollbarWidth();
		this.calculatePage();
		this.onScroll();
	}

	private onScroll(): void {

		/* Check last center */
		let lastCenter = 0;
		if (this.scroll) {
			lastCenter = this.scroll.center
		}

		/* Prepare variables */
		let
			top = getScrollPosition(),
			center = top + this.height / 2,
			bottom = top + this.height,
			speed = Math.abs(lastCenter - center),
			direction = 'down';

		/* Check scroll direction */
		if (center < lastCenter) {
			direction = "up";
		}

		this.scroll = {
			top: top,
			bottom: bottom,
			center: center,
			speed: speed,
			direction: direction,
		}
	}

	private calculatePage(): void | boolean {

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

	// Get transition vendor prefix
	private getTransitionEvent(): string {
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
		console.error(`Browser\n- fired getTransitionEvent() function and return undefined transition`);
		/* end-test-code */
	}

};
