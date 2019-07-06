import { html } from './bootstrap/elements';
import { Browser } from './bootstrap/browser';
import { InformationCookie } from './bootstrap/cookie';
import { InputCounter } from './bootstrap/input-counter';
import { Resize } from './bootstrap/resize';
import { ScrollLock } from './bootstrap/scroll-lock';
import { BurgerMenu } from './bootstrap/burger-menu';
import { ElementPlaceholder } from './bootstrap/element-placeholder';
import { Sticky } from './bootstrap/sticky';
import { Tabs } from './bootstrap/tabs';
/* Polyfill */
require('vh-check')(); // Get reliable CSS vh sizes (https://github.com/Hiswe/vh-check)
const cssVars = require('css-vars-ponyfill'); // CSS custom properties support

window.onload = () => {
	const browser = new Browser(),
		scrollLock = new ScrollLock(),
		resize = new Resize();

	new BurgerMenu({
		scrollLock: scrollLock,
		$burger: document.getElementById('burger-button'),
		$container: document.getElementById('header'),
		$overlay: document.getElementById('header-overlay'),
		cssClassActive: 'js_burger-active'
	});

	new Sticky({
		browser: browser,
		scrollLock: scrollLock,
		$element: document.getElementById('header-content')
	});

	new Tabs({
		name: 'slider'
	});

	/* Forms */
	new InputCounter({
		cssClass: {
			wrap: `[data-bind="input-counter"]`,
			input: `.input-counter__input`,
			button: `.input-counter__btn`,
			disable: `--disable`
		}
	});

	/* Informations */
	new InformationCookie();

	/* Polyfill */

	// CSS Custom Properties
	cssVars({
		variables: {
			scrollbarWidth: `${browser.scrollbarWidth}px`
		}
	});

	// const placeholder = new ElementPlaceholder();
	// placeholder.create(document.getElementById('header'));

	/* Inform stylesheed to remove style fallback for JavaScript elements */
	html.classList.remove('js_no');
};
