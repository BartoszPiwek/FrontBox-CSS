import { html } from "./bootstrap/elements";
import { Browser } from "./bootstrap/browser";
import { InformationCookie } from "./bootstrap/cookie";
import { InputCounter } from "./bootstrap/input-counter";
import { Resize } from "./bootstrap/resize";
import { ScrollLock } from "./bootstrap/scrollLock";
import { BurgerMenu } from "./bootstrap/burger-menu";
/* Polyfill */
require('vh-check')(); // Get reliable CSS vh sizes (https://github.com/Hiswe/vh-check)

window.onload = () => {

	const
		browser = new Browser(),
		scrollLock = new ScrollLock(),
		resize = new Resize();

	new BurgerMenu({
		scrollLock: scrollLock,
		$burger: document.getElementById('burger-button'),
		$overlay: document.getElementById('header-overlay'),
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
