/**
 * Hide emails from spam bots
 *
 * @export
 * @class ProtectEmail
 */

interface IProtectEmail {
	elements: HTMLCollectionOf<Element>;
}
export class ProtectEmail implements IProtectEmail {
	elements: HTMLCollectionOf<Element>;

	constructor(param: IProtectEmail) {
		this.elements = param.elements;

		[].slice.call(this.elements).forEach(item => {
			item.addEventListener('click', this.onClick);
		});
	}

	onClick(this: HTMLElement, e: MouseEvent): EventListener {
		const $link: HTMLElement = this;
		const email = $link.children[0].textContent
			.split('')
			.reverse()
			.join('');

		$link.setAttribute('href', `mailto:${email}`);
		$link.classList.remove('js_email');
		$link.textContent = email;

		$link.parentNode.replaceChild($link.cloneNode(true), $link);
		return;
	}
}

/**
 * Changelog
 * 12.07.2019 Add
 */
