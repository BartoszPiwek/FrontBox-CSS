import { transition } from './transition-size';

interface ITabs {
	name: string;
	callbackChange?: () => void;
}

/*
Markup:
.tabs(data-tabs-content="primary")
	.tabs__item.active
	.tabs__item
.tabs-navigation(data-tabs-buttons="primary")
	button.tabs-navigation__item.active
	button.tabs-navigation__item
*/
export class Tabs {
	$contents: HTMLCollection;
	$buttons: HTMLCollection;
	$containers: HTMLCollection;
	activeTab: number = 0;
	name: string;
	isRun: boolean = false;
	active: boolean = false;
	callbackChange: () => void;

	constructor(param: ITabs) {
		this.name = param.name;
		if (param.callbackChange) {
			this.callbackChange = param.callbackChange;
		}

		this.refresh();
	}

	public refresh() {
		let $contents = document.querySelectorAll(`[data-tabs-content="${this.name}"]`),
			$buttons = document.querySelectorAll(`[data-tabs-buttons="${this.name}"]`),
			$containers = document.querySelectorAll(`[data-tabs-${this.name}-active]`);

		if (this.active) {
			this.unbind();
		}

		if ($contents.length) {
			this.$contents = $contents[0].children;
			this.$buttons = $buttons[0].children;
			if ($containers.length) {
				this.$containers = $containers[0].children;
			}
			this.bind();
		}
	}

	public bind() {
		const length = this.$buttons.length;

		for (let index = 0; index < length; index++) {
			const $element = this.$buttons[index];
			$element.addEventListener('click', () => {
				this.change(index);
			});
		}
	}

	public unbind() { }

	public change(index: number) {
		if (this.activeTab === index || this.isRun) {
			return false;
		}
		this.isRun = true;

		transition({
			$element: this.$contents[index],
			callbackChanged: () => {
				this.isRun = false;
				if (this.callbackChange) {
					this.callbackChange();
				}
			}
		});

		this.$buttons[this.activeTab].classList.remove('active');
		this.$contents[this.activeTab].classList.remove('active');

		this.$buttons[index].classList.add('active');
		this.$contents[index].classList.add('active');

		if (this.$containers) {
			this.$containers[this.activeTab].classList.remove('active');
			this.$containers[index].classList.add('active');
		}

		this.activeTab = index;
	}
}