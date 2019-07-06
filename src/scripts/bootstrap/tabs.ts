interface ITabs {
	name: string
	callbackChange?: () => void
}

export class Tabs {

	$contents: HTMLCollection
	$buttons: HTMLCollection
	$containers: HTMLCollection
	activeTab: number = 0
	name: string
	active: boolean = false
	callbackChange: () => void

	constructor(param: ITabs) {
		this.name = param.name;
		if (param.callbackChange) {
			this.callbackChange = param.callbackChange;
		}

		this.refresh();
	}

	refresh() {
		this.$contents = document.querySelectorAll(`[data-tabs-content="${this.name}"]`)[0].children;
		this.$buttons = document.querySelectorAll(`[data-tabs-buttons="${this.name}"]`)[0].children;
		this.$containers = document.querySelectorAll(`[data-tabs-${this.name}-active]`)[0].children;
		if (this.active) {
			this.unbind();

		}
		this.bind();
	}

	bind() {
		const length = this.$buttons.length;

		for (let index = 0; index < length; index++) {
			const $element = this.$buttons[index];
			$element.addEventListener('click', () => {
				this.change(index);
			});
		}
	}

	unbind() {

	}

	change(index: number) {
		if (this.activeTab === index) {
			return false;
		}

		this.$buttons[this.activeTab].classList.remove('active');
		this.$contents[this.activeTab].classList.remove('active');
		this.$containers[this.activeTab].classList.remove('active');

		this.$buttons[index].classList.add('active');
		this.$contents[index].classList.add('active');
		this.$containers[index].classList.add('active');

		if (this.callbackChange) {
			this.callbackChange();
		}

		this.activeTab = index;
	}
}
