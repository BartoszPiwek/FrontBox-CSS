import { Component } from './component'

/**
 * Hide e-mails from spam bots
 *
 * @class
 * @version					1.0
 * @style						email-address.scss
 * @changelog
 * 29.08.2019 Cleaning
 * 12.07.2019 Add
 */

interface IProtectEmail {
	elements: NodeList
}

export class ProtectEmail extends Component {
	private elements: NodeList

	constructor(param: IProtectEmail) {
		super(param)
	}

	onInit() {
		this.elements.forEach(item => {
			item.addEventListener('click', this.onClick)
		})
	}

	onClick(this: HTMLElement, e: MouseEvent): EventListener {
		const link: HTMLElement = this
		const email = link.children[0].textContent
			.split('')
			.reverse()
			.join('')

		link.setAttribute('href', `mailto:${email}`)
		link.classList.remove('js_email')
		link.textContent = email
		link.parentNode.replaceChild(link.cloneNode(true), link)

		link.click()

		return
	}
}
