import { html } from "./elements";
import { ScrollLock } from "./scrollLock";

interface IBurgerMenu {
	$burger: HTMLElement
	$overlay: HTMLElement
	cssClassActive: string
	scrollLock: ScrollLock
}

export class BurgerMenu {

	active: boolean = false;
	moving: boolean = false;
	expandTime: number = 200;
	expandStyle: string = 'from-right';
	$button: HTMLElement;
	$overlay: HTMLElement;
	cssClassActive: string;
	scrollLock: ScrollLock;

	constructor(param: IBurgerMenu) {
		this.$button = param.$burger;
		this.$overlay = param.$overlay;
		this.cssClassActive = param.cssClassActive;
		this.scrollLock = param.scrollLock;

		this.refresh();
	}

	private refresh() {

		this.$button.onclick = () => {
			this.click();
		};

		this.$overlay.onclick = () => {
			this.click();
		}
	}

	private click() {
		if (this.moving) {
			return false;
		}
		this.moving = true;
		this.scrollLock.change();
		html.classList.toggle(this.cssClassActive);

		window.setTimeout(() => {
			this.moving = false;
		}, this.expandTime);
	}
}
