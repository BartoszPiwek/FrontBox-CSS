export class ProtectEmail {
	$links: HTMLCollectionOf<Element>;

	constructor() {
		this.refresh();
	}

	refresh() {
		this.$links = document.getElementsByClassName('js_email');
		const length = this.$links.length;

		for (let index = 0; index < length; index++) {
			const $element = this.$links[index];
			$element.addEventListener('click', this.onClick);
		}
	}

	onClick(e: MouseEvent): EventListenerOrEventListenerObject {
		// @ts-ignore
		const $link: HTMLElement = this;
		const email = $link.children[0].textContent
			.split('')
			.reverse()
			.join('');

		$link.setAttribute('href', `mailto:${email}`);
		$link.classList.remove('js_email');
		$link.textContent = email;

		const $copy = $link.cloneNode(true);
		$link.parentNode.replaceChild($copy, $link);
		return;
	}
}
