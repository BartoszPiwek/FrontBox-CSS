/**
 * Inform users that your site uses cookies
 *
 * @class Cookie
 * @version 1.0
 * @require
 * JavaScript Cookie - https://github.com/js-cookie/js-cookie
 *
 * 21.05.2019 Convert jQuery code to vanilla JS
 */
import * as Cookies from 'js-cookie';

import { body } from './elements';

interface InformationCookieData {
	template?: string;
}

export class InformationCookie {

	private cookie: HTMLElement;
	private accept: NodeList;
	private data: InformationCookieData = {
		template: null,
	}

	constructor(data?: InformationCookieData) {

		if (!Cookies.get('using_cookies')) {

			this.data = Object.assign(this.data, data);

			this.show();

			/* test-code */
			console.log(`Cookie\n - show information about using cookies`);
			/* end-test-code */
		}
		/* test-code */
		else {
			console.log(`Cookie\n - information already showed`);
		}
		/* end-test-code */

	}

	private getContent = (callback: Function) => {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', 'partials/cookies.html');
		xhr.send();
		xhr.onreadystatechange = function () {
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

	}

	private show = () => {

		if (this.data.template) {
			this.mount(this.data.template);
		}
		else {
			this.getContent((cookiesContentHTML) => {
				this.mount(cookiesContentHTML);
			});
		}
	}

	private bindClick() {
		this.accept.forEach((item) => {
			item.addEventListener('click', () => {
				this.onClick();
			});
		});
	}

	private onClick() {

		Cookies.set('using_cookies', 1);

		this.cookie.classList.add("js_cookies-information--hide");

		/* test-code */
		console.log(`Cookie\n - accepted cookies`);
		/* end-test-code */

		return false;
	}
}
