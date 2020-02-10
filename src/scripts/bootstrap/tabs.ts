import { transitionSize } from "../tools/transition-size";
import { Component } from "./component";

/**
 * A single content area with multiple panels, each associated with a header in a list
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
.tabs-navigation(data-tabs-navigation="primary")
	button.tabs-navigation__item.active
	button.tabs-navigation__item
 * @changelog
 * 30.08.2019 Cleaning
 * 26.06.2019 Add
 */

interface ITabs {
	name: string;
	active?: number;
	callbackAfter?: Function;
}

export class Tabs extends Component {
	private content: HTMLCollection;
	private navigation: HTMLCollection;
	private name: string;
	private running: boolean = false;
	private active: number = 0;
	private _length: number;
	private callbackAfter?: () => void;

	public get length() {
		return this._length;
	}

	constructor(param: ITabs) {
		super(param);
	}

	public onInit() {
		let navigation: NodeListOf<Element> = document.querySelectorAll(
			`[data-tabs-navigation="${this.name}"]`
		);
		let content: NodeListOf<Element> = document.querySelectorAll(
			`[data-tabs-content="${this.name}"]`
		);

		if (!navigation.length && !content.length) {
			return;
		}

		this.navigation = navigation[0].children;
		this.content = content[0].children;
		this._length = this.navigation.length;

		for (let index = 0; index < this.length; index++) {
			this.navigation[index].addEventListener("click", () => {
				this.change(index);
				return;
			});
		}
	}

	public change(index: number) {
		if (this.active === index || this.running) {
			return false;
		}

		this.running = true;

		transitionSize({
			element: this.content[index],
			callbackAfter: () => {
				this.running = false;

				if (this.callbackAfter) {
					this.callbackAfter();
				}
			}
		});

		this.navigation[this.active].classList.remove("active");
		this.content[this.active].classList.remove("active");

		this.navigation[index].classList.add("active");
		this.content[index].classList.add("active");

		this.active = index;
	}
}
