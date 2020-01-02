import { scroll, browser } from '../app';
import { Component } from './component';
import { breakpointsSpecial } from '../../../consts';

/**
 * Toggle burger container
 *
 * @class
 * @version					1.0
 * @style						burger.scss
 * @require					Scroll
 * @changelog
 * 28.08.2019 Cleaning
 * 26.06.2019 Add
 */

interface IBurger {
	button: HTMLElement;
	container: HTMLElement;
	overlay?: HTMLElement;
	cssClassActive?: string;
	expandTime?: number;
}

export class Burger extends Component {
	private button: HTMLElement;
	private container: HTMLElement;
	private overlay?: HTMLElement;

	private active: boolean = false;
	private running: boolean = false;

	private expandTime: number = 200;

	private cssClassActive: string = 'js_burger-active';

	constructor(param: IBurger) {
		super(param);
	}

	public onInit() {
		this.button.onclick = () => {
			this.toggle();
		};

		if (this.overlay) {
			this.overlay.onclick = () => {
				this.toggle();
			};
		}
	}

	public onResize() {
		if (this.active && browser.width > breakpointsSpecial.burgerShow.value) {
			this.toggle();
		}
	}

	private toggle() {
		if (this.running) {
			return false;
		}
		this.running = true;
		this.active = !this.active;

		scroll.change(this.active);
		this.container.classList.toggle(this.cssClassActive);

		window.setTimeout(() => {
			this.running = false;
		}, this.expandTime);
	}
}
