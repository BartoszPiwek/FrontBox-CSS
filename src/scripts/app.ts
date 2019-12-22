/*!************************************************************************
Framework:      FrontBox 1.3.0
Author:         Bartosz Piwek
Repository:     https://github.com/BartoszPiwek/FrontBox
************************************************************************!*/

/* test-code */
import { FrontboxConsole } from './bootstrap/console';
import { FrontboxWatch } from './bootstrap/watch';
export const frontboxWatch = new FrontboxWatch({
	hide: false,
	open: false
});
export const frontboxConsole = new FrontboxConsole({
	hide: false,
	open: false,
	autoOpen: false
});
/* end-test-code */

import { html } from './bootstrap/elements';
import { Browser } from './bootstrap/browser';
import { CookieInformation } from './bootstrap/cookie';
import { InputCounter } from './bootstrap/input-counter';
import { Scroll } from './bootstrap/scroll';
import { Burger } from './bootstrap/burger';
import { Sticky } from './bootstrap/sticky';
import { Tabs } from './bootstrap/tabs';
import { ProtectEmail } from './bootstrap/protect-email';
import { Wcag } from './bootstrap/wcag';

export const scroll = new Scroll();
export const browser = new Browser();

window.onload = () => {
	new Burger({
		button: document.getElementById('burger-button'),
		container: document.getElementById('header'),
		overlay: document.getElementById('burger-overlay')
	});

	new Sticky({
		element: document.getElementById('header-content')
	});

	new Tabs({
		name: 'primary'
	});

	document.getElementById('scrollTo').addEventListener('click', () => {
		scroll.to({
			element: document.getElementById('fee'),
			time: 1000
		});
	});

	new ProtectEmail({
		elements: document.querySelectorAll('.js_email')
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

	/* Information's */
	new CookieInformation({
		templateUrl: 'partials/cookies.html'
	});

	new Wcag();

	// const placeholder = new ElementPlaceholder();
	// placeholder.create(document.getElementById('header'));

	/* Inform stylesheet to remove style fallback for JavaScript elements */
	html.classList.remove('js_disabled');

	/* test-code */
	frontboxConsole.add({
		title: 'App',
		content: 'Running...'
	});
	/* end-test-code */
};
