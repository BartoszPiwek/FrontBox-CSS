/*!
 * FrontBox 1.3.0
 * Copyright Bartosz Piwek
 * https://github.com/BartoszPiwek/FrontBox
 */

import { Browser } from './bootstrap/browser';
import { Burger } from './bootstrap/burger';
/* test-code */
import { FrontboxConsole } from './bootstrap/console';
/* end-test-code */
import { CookieInformation } from './bootstrap/cookie';
import { html } from './bootstrap/elements';
import { InputCounter } from './bootstrap/input-counter';
import { ProtectEmail } from './bootstrap/protect-email';
import { Scroll } from './bootstrap/scroll';
import { Sticky } from './bootstrap/sticky';
/* test-code */
import { FrontboxWatch } from './bootstrap/watch';
/* end-test-code */
import { Wcag } from './bootstrap/wcag';

export const scroll = new Scroll();
export const browser = new Browser();

/* test-code */
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

window.onload = () => {
	new Burger({
		button: document.getElementById('burger-button'),
		container: document.getElementById('header'),
		overlay: document.getElementById('burger-overlay')
	});

	new Sticky({
		element: document.getElementById('header-content')
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
