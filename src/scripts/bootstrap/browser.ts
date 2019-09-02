import { html } from './elements';
import { breakpoints } from '../../../consts';
import { Component } from './component';

interface IScroll {
	top: number;
	bottom: number;
	center: number;
	speed: number;
	direction: string;
}

/**
 * @class Browser
 */
export class Browser extends Component {
	public scroll: IScroll;
	public width: number;
	public height: number;
	public portable: string | boolean;
	private _scrollbarWidth: number;

	private _transitionEvent: string;

	constructor() {
		super();
	}

	public onInit() {
		this.calculatePage();
	}

	public onResize() {
		this.calculatePage();
	}

	public onScroll() {
		/* Check last center */
		let lastCenter = 0;
		if (this.scroll) {
			lastCenter = this.scroll.center;
		}

		/* Prepare variables */
		let direction: string;
		let top = this.scrollPosition;
		let bottom = top + this.height;
		let center = bottom - this.height / 2;
		let speed = Math.abs(lastCenter - center);

		/* Check scroll direction */
		if (center < lastCenter) {
			direction = 'up';
		} else {
			direction = 'down';
		}

		this.scroll = {
			top: top,
			bottom: bottom,
			center: center,
			speed: speed,
			direction: direction
		};
	}

	public get scrollbarWidth(): number {
		if (!this._scrollbarWidth) {
			const scrollbar: HTMLElement = document.getElementById('js_check-scrollbar');
			const content: Element = scrollbar.children.item(0);

			this._scrollbarWidth = scrollbar.offsetWidth - content.clientWidth;
			scrollbar.parentNode.removeChild(scrollbar);
		}

		return this._scrollbarWidth;
	}

	public get transitionEvent(): string {
		if (!this._transitionEvent) {
			const element = document.createElement('getTransitionEvent');
			const transitions = {
				transition: 'transitionend',
				OTransition: 'oTransitionEnd',
				MozTransition: 'transitionend',
				WebkitTransition: 'webkitTransitionEnd'
			};

			for (const key in transitions) {
				if (element.style[key] !== undefined) {
					this._transitionEvent = transitions[key];
					break;
				}
			}
		}

		return this._transitionEvent;
	}

	public get orientation(): 'portrait' | 'landscape' {
		if (window.matchMedia('(orientation: portrait)').matches) {
			return 'portrait';
		} else {
			return 'landscape';
		}
	}

	public get responsive(): string {
		for (const key in breakpoints) {
			const value = breakpoints[key].value;

			if (window.matchMedia(`(min-width: ${value}px)`).matches) {
				return key;
			}
		}
		return 'mobile';
	}

	public get scrollPosition(): number {
		return window.pageYOffset || html.scrollTop;
	}

	public get isScrollbar(): boolean {
		return window.innerWidth != document.documentElement.clientWidth;
	}

	private calculatePage(): void {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
	}
}
