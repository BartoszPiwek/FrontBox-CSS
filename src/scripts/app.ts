/*!************************************************************************
Framework:      FrontBox 1.3.0
Author:         Bartosz Piwek
Repository:     https://github.com/BartoszPiwek/FrontBox
************************************************************************!*/

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
import { ProtectEmail } from './bootstrap/protect-email';
import { scrollTo } from './bootstrap/scroll-to';
import { polyfill } from './app/polyfill';

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
		name: 'primary'
	});

	new ProtectEmail({
		elements: document.getElementsByClassName('js_email')
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

	// const placeholder = new ElementPlaceholder();
	// placeholder.create(document.getElementById('header'));

	/* Polyfill */
	polyfill({
		scrollbarWidth: browser.scrollbarWidth
	});
	/* Inform stylesheed to remove style fallback for JavaScript elements */
	html.classList.remove('js_no');
};
