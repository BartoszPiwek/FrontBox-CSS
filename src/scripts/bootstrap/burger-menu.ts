import { html } from "./elements";
import { ScrollLock } from "./scrollLock";

interface IBurgerMenu {
	$burger: HTMLElement
	$overlay: HTMLElement
	cssClassActive: string
	scrollLock: ScrollLock
}

export class BurgerMenu {

	scrollLock: ScrollLock;
	$button: HTMLElement;
	$overlay: HTMLElement;
	active: boolean = false;
	moving: boolean = false;
	expandTime: number = 200;
	cssClassActive: string;

	constructor(param: IBurgerMenu) {
		this.$button = param.$burger;
		this.cssClassActive = param.cssClassActive;
		this.scrollLock = param.scrollLock;
		if (param.$overlay) {
			this.$overlay = param.$overlay;
		}

		this.refresh();
	}

	private refresh() {

		this.$button.onclick = () => {
			this.click();
		};

		if (this.$overlay) {
			this.$overlay.onclick = () => {
				this.click();
			}
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
