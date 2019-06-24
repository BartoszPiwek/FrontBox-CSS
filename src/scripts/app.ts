import { html } from "./modules/elements";
import { Browser } from "./modules/browser";
import { InformationCookie } from "./modules/cookie";
import { InputCounter } from "./modules/input-counter";
import { Resize } from "./modules/resize";
import { ScrollLock } from "./modules/scrollLock";
import { BurgerMenu } from "./modules/burger-menu";
/* Polyfill */
require('vh-check')(); // Get reliable CSS vh sizes (https://github.com/Hiswe/vh-check)

window.onload = () => {

	const
		browser = new Browser(),
		scrollLock = new ScrollLock(),
		resize = new Resize(),
		burger = new BurgerMenu({
			scrollLock: scrollLock,
			$burger: document.getElementById('burger-button'),
			cssClassActive: 'js_menu-active',
		});

	/* Forms */
	new InputCounter({
		cssClass: {
			wrap: `[data-bind="input-counter"]`,
			input: `.input-counter__input`,
			button: `.input-counter__btn`,
			disable: `--disable`,
		}
	});

	/* Informations */
	new InformationCookie();

	const scrollLockToggle = document.getElementById('scrollLock');

	scrollLockToggle.onclick = (e: Event) => {
		scrollLock.change();
		e.preventDefault();
		return false;
	};

	/* Inform stylesheed to remove style fallback for JavaScript elements */
	html.classList.remove('js_no');
};
