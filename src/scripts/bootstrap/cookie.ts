import * as Cookies from 'js-cookie';
import { body } from './elements';
import { Component } from './component';

/**
 * Inform users that your site uses cookies
 *
 * @version					1.0
 * @require					JavaScript Cookie - https://github.com/js-cookie/js-cookie
 * @changelog
 * Changelog
 * 21.05.2019 Convert jQuery code to vanilla JS
 */

interface ICookieInformation {
	template?: string;
}

export class CookieInformation extends Component {
	private cookie: HTMLElement;
	private accept: NodeList;
	private template?: string;

	constructor(param?: ICookieInformation) {
		super(param);
	}

	public onInit() {
		if (Cookies.get('using-cookies')) {
			return;
		}
		this.show();
	}

	private show() {
		if (this.template) {
			this.mount(this.template);
		} else {
			this.getContent(cookiesContentHTML => {
				this.mount(cookiesContentHTML);
			});
		}
	}

	private getContent(callback: Function) {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', 'partials/cookies.html');
		xhr.send();
		xhr.onreadystatechange = function() {
			if (xhr.readyState !== 4) return;
			if (xhr.status >= 200 && xhr.status < 300) {
				callback.apply(this, [xhr.responseText]);
			}
		};
	}

	private mount = (cookiesContentHTML: string) => {
		body.insertAdjacentHTML('beforeend', cookiesContentHTML);
		this.cookie = document.getElementById('js_cookies-information');
		this.accept = document.querySelectorAll('.js_cookies-close');

		this.accept.forEach(item => {
			item.addEventListener('click', () => {
				Cookies.set('using-cookies', 1);
				this.cookie.classList.add('js_cookies-information--hide');
			});
		});
	};
}
