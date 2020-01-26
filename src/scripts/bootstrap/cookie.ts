import * as Cookies from 'js-cookie';
import { Component } from './component';
import { getFile } from './frontbox';

/**
 * Inform users that your site uses cookies
 *
 * @class
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
	private templateUrl: string;

	constructor(param: ICookieInformation) {
		super(param);
	}

	public async onInit() {
		if (Cookies.get('cookie-accept')) {
			return;
		}

		const contentHTML = await getFile(this.templateUrl);
		document.body.insertAdjacentHTML('beforeend', contentHTML);

		const cookie = document.getElementById('js_cookies-information');
		const accept = document.querySelectorAll('.js_cookies-close');

		accept.forEach(item => {
			item.addEventListener('click', () => {
				Cookies.set('cookie-accept', 1);
				cookie.classList.add('js_cookies-information--hide');
			});
		});
	}
}
