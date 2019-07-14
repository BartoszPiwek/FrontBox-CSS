/**
 * Inform users that your site uses cookies
 *
 * @class Cookie
 * @version 1.0
 * @require
 * JavaScript Cookie - https://github.com/js-cookie/js-cookie
 *
 */

import * as Cookies from 'js-cookie';
import { body } from './elements';
import { frontboxConsole } from '../app';

interface InformationCookieData {
	template?: string;
}

export class InformationCookie {
	private cookie: HTMLElement;
	private accept: NodeList;
	private data: InformationCookieData = {
		template: null
	};

	constructor(data?: InformationCookieData) {
		if (Cookies.get('using-cookies')) {
			/* test-code */
			frontboxConsole.add({
				title: 'Cookie',
				content: 'information already showed'
			});
			/* end-test-code */
			return;
		}
		this.data = Object.assign(this.data, data);
		this.show();
		/* test-code */
		frontboxConsole.add({
			title: 'Cookie',
			content: 'show information about using cookies'
		});
		/* end-test-code */
	}

	private getContent = (callback: Function) => {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', 'partials/cookies.html');
		xhr.send();
		xhr.onreadystatechange = function() {
			if (xhr.readyState !== 4) return;
			if (xhr.status >= 200 && xhr.status < 300) {
				callback.apply(this, [xhr.responseText]);
			}
		};
	};

	/**
	 * Show information
	 */
	private mount = (cookiesContentHTML: string) => {
		body.insertAdjacentHTML('beforeend', cookiesContentHTML);
		this.cookie = document.getElementById('js_cookies-information');
		this.accept = document.querySelectorAll('.js_cookies-close');
		this.bindClick();
	};

	private show = () => {
		if (this.data.template) {
			this.mount(this.data.template);
		} else {
			this.getContent(cookiesContentHTML => {
				this.mount(cookiesContentHTML);
			});
		}
	};

	private bindClick() {
		this.accept.forEach(item => {
			item.addEventListener('click', () => {
				this.onClick();
			});
		});
	}

	private onClick() {
		Cookies.set('using-cookies', 1);
		this.cookie.classList.add('js_cookies-information--hide');
		/* test-code */
		frontboxConsole.add({
			title: 'Cookie',
			content: 'accepted cookies'
		});
		/* end-test-code */
		return false;
	}
}

/**
 * Changelog
 * 21.05.2019 Convert jQuery code to vanilla JS
 */
