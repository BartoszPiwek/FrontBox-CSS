import { html } from "./elements";
import { ScrollLock } from "./scrollLock";

interface IBurgerMenu {
	$burger: HTMLElement
	cssClassActive: string
	scrollLock: ScrollLock
}

interface IBurgerMenuToggle {
	begin?: Function
	end?: Function
}

export class BurgerMenu {

	active: boolean = false;
	moving: boolean = false;
	expandTime: number = 300;
	expandStyle: string = 'from-right';
	$button: HTMLElement;
	cssClassActive: string;
	scrollLock: ScrollLock
	constructor(param: IBurgerMenu) {
		this.$button = param.$burger;
		this.cssClassActive = param.cssClassActive;
		this.scrollLock = param.scrollLock;

		this.refresh();
	}

	private refresh() {

		this.$button.onclick = () => {

			if (this.moving) {
				return false;
			}
			this.moving = true;

			this.toggle({
				end: () => {
					this.scrollLock.change();
					this.moving = false;
				}
			});

		};
	}

	private toggle(callback?: IBurgerMenuToggle) {

		if (callback.begin) {
			callback.begin();
		}

		html.classList.toggle(this.cssClassActive);

		if (callback.end) {
			callback.end();
		}
	}

}
