import { scrollLock } from '../app';

interface IBurgerMenu {
	button: HTMLElement;
	overlay?: HTMLElement;
	classInject: HTMLElement;
	cssClassActive?: string;
}

/**
 * Toggle burger menu with overlay
 *
 * @version					1.0
 * @css							burger.scss
 * @require					ScrollLock object
 */

export class BurgerMenu implements IBurgerMenu {
	scrollLock = scrollLock;

	button: HTMLElement;
	overlay?: HTMLElement;
	classInject: HTMLElement;

	active: boolean = false;
	moving: boolean = false;

	expandTime: number = 200;

	cssClassActive: string = 'js_burger-active';

	constructor(param: IBurgerMenu) {
		Object.assign(this, param);

		this.button.onclick = () => {
			this.toggle();
		};

		if (this.overlay) {
			this.overlay.onclick = () => {
				this.toggle();
			};
		}
	}

	private toggle() {
		if (this.moving) {
			return false;
		}

		this.moving = true;
		this.scrollLock.change();
		this.classInject.classList.toggle(this.cssClassActive);

		window.setTimeout(() => {
			this.moving = false;
		}, this.expandTime);
	}
}

/**
 * Changelog
 * 28.08.2019 Cleaning
 * 26.06.2019 Add
 */
