import { ScrollLock } from "./scroll-lock";

interface IBurgerMenu {
	$burger: HTMLElement
	$overlay: HTMLElement
	$container: HTMLElement
	cssClassActive?: string
	scrollLock: ScrollLock
}

/**
 * Toggle burger menu with overlay
 *
 * @class						BurgerMenu
 * @version					1.0
 * @css							burger-menu.scss
 * @require					ScrollLock object
 */

export class BurgerMenu {

	scrollLock: ScrollLock;
	$button: HTMLElement
	$overlay: HTMLElement
	$container: HTMLElement
	active: boolean = false
	moving: boolean = false
	expandTime: number = 200
	cssClassActive: string = 'js_burger-active';

	constructor(param: IBurgerMenu) {
		this.$button = param.$burger;
		this.$container = param.$container;
		this.cssClassActive = param.cssClassActive;
		this.scrollLock = param.scrollLock;
		if (param.cssClassActive) {
			this.cssClassActive = param.cssClassActive;
		}
		if (param.$overlay) {
			this.$overlay = param.$overlay;
		}

		this.bind();
	}

	private bind() {
		/* test-code */
		console.info(`BurgerMenu\n- fired bind() function`);
		/* end-test-code */

		this.$button.onclick = () => {
			this.click();
		};

		if (this.$overlay) {
			this.$overlay.onclick = () => {
				this.click();
			}
		}
	}

	public unbind() {
		/* test-code */
		console.info(`BurgerMenu\n- fired unbind() function`);
		/* end-test-code */

		this.$button.onclick = null;
		this.$overlay.onclick = null;
	}

	private click() {
		/* test-code */
		console.info(`BurgerMenu\n- fired click() function`);
		/* end-test-code */

		if (this.moving) {
			return false;
		}
		this.moving = true;
		this.scrollLock.change();
		this.$container.classList.toggle(this.cssClassActive);

		window.setTimeout(() => {
			this.moving = false;
		}, this.expandTime);
	}
}

/**
 * Changelog
 * 26.06.2019 Add
 */
