import { html } from "./frontbox/data/elements";
import { Browser } from "./frontbox/data/browser";
import { InformationCookie } from "./frontbox/information/cookie";
import { InputCounter } from "./frontbox/form/input-counter";
import { Resize } from "./frontbox/bind/resize";
import { ScrollLock } from "./frontbox/scrollLock";
import { BurgerMenu } from "./frontbox/navbar/burger-menu";
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



	/* Polyfill */

	/* Inform stylesheed to remove style fallback for JavaScript elements */
	html.classList.remove('js_no');
};
