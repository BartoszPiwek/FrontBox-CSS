import { transitionSize } from './transition-size';
import { Component } from './component';

/**
 * Add sticky style to element
 *
 * @class
 * @version					1.0
 * @style						tabs.scss
 * @require					transitionSize
 * @markup
.tabs(data-tabs-content="primary")
	.tabs__item.active
		| Tab 1
	.tabs__item
		| Tab 2
.tabs-navigation(data-tabs-buttons="primary")
	button.tabs-navigation__item.active
	button.tabs-navigation__item
 * @changelog
 * 30.08.2019 Cleaning
 * 26.06.2019 Add
 */

interface ITabs {
	name: string;
	active: number;
	callbackAfter?: Function;
}

export class Tabs extends Component {
	private contents: HTMLCollection;
	private buttons: HTMLCollection;
	private containers: HTMLCollection;
	private name: string;
	private running: boolean = false;
	private active: number;
	private callbackAfter?: () => void;

	constructor(param: ITabs) {
		super(param);
	}

	public onInit() {
		this.buttons = document.querySelectorAll(`[data-tabs-buttons="${this.name}"]`)[0].children;

		if (this.buttons.length) {
			this.contents = document.querySelectorAll(`[data-tabs-content="${this.name}"]`)[0].children;
			let containers = document.querySelectorAll(`[data-tabs-${this.name}-active]`);

			if (containers.length) {
				this.containers = containers[0].children;
			}

			const length = this.buttons.length;

			for (let index = 0; index < length; index++) {
				const button = this.buttons[index];

				button.addEventListener('click', () => {
					this.change(index);
					return;
				});
			}
		}
	}

	public change(index: number) {
		if (this.active === index || this.running) {
			return false;
		}
		this.running = true;

		transitionSize({
			element: this.contents[index],
			callbackAfter: () => {
				this.running = false;

				if (this.callbackAfter) {
					this.callbackAfter();
				}
			}
		});

		this.buttons[this.active].classList.remove('active');
		this.contents[this.active].classList.remove('active');

		this.buttons[index].classList.add('active');
		this.contents[index].classList.add('active');

		if (this.containers) {
			this.containers[this.active].classList.remove('active');
			this.containers[index].classList.add('active');
		}

		this.active = index;
	}
}
