import * as Cookies from 'js-cookie';
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
	templateUrl: string;
}

export class CookieInformation extends Component {
	private cookie: HTMLElement;
	private accept: NodeList;
	private templateUrl: string;

	constructor(param: ICookieInformation) {
		super(param);
	}

	public async onInit() {
		if (Cookies.get('using-cookies')) {
			return;
		}

		const contentHTML = await this.getContent(this.templateUrl);
		document.body.insertAdjacentHTML('beforeend', contentHTML);

		const cookie = document.getElementById('js_cookies-information'),
			accept = document.querySelectorAll('.js_cookies-close');

		accept.forEach(item => {
			item.addEventListener('click', () => {
				Cookies.set('using-cookies', 1);
				cookie.classList.add('js_cookies-information--hide');
			});
		});
	}

	private async getContent(url): Promise<string> {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.onload = () => {
				if (xhr.status >= 200 && xhr.status < 300) {
					resolve(xhr.response);
				} else {
					reject(xhr.statusText);
				}
			};
			xhr.onerror = () => reject(xhr.statusText);
			xhr.send();
		});
	}
}
