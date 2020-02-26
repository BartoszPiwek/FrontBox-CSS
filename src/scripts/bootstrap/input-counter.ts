interface InputCounterCSSClass {
	wrap: string,
	input: string,
	button: string,
	disable: string,
}

interface InputCounterData {
	cssClass: InputCounterCSSClass;
}

interface InputCounterDatabaseItem {
	wrap: Element,
	input: HTMLInputElement,
	button: NodeListOf<Element>,
	value: number,
	max: number,
	min: number,
}

export class InputCounter {

	private database: InputCounterDatabaseItem[] = [];

	private cssClass: InputCounterCSSClass;

	private active: boolean = false;

	constructor(data: InputCounterData) {

		this.cssClass = data.cssClass;
		this.refresh();
		this.active = true;

	}

	changeValue() {

	}

	bind() {

	}

	unbind() {

	}

	loopElement() { }

	add(wrap: Element) {

		let
			input: HTMLInputElement,
			button: NodeListOf<Element>,
			value: number,
			max: number,
			min: number;

		input = wrap.querySelector('.input-counter__input');
		button = wrap.querySelectorAll('.input-counter__btn');
		value = Number(input.value);
		min = Number(input.min);
		max = Number(input.max);

		this.database.push({
			wrap: wrap,
			input: input,
			button: button,
			value: value,
			max: max,
			min: min,
		});

		// Bind input change
		input.onfocus = () => {
			input.select();
		}

		input.oninput = () => {
			let valueNew = Number(input.value);

			if (!valueNew) {
				input.value = String(value);
				return false;
			}

			value = valueNew;
			if (valueNew >= max) {
				value = max
				console.log("max");

			}
			else if (valueNew <= min) {
				value = min
				console.log("min");
			}

			input.value = String(value);

			input.select();
		};

	}

	refresh() {

		/* Off previous bind clicks */
		if (this.active) {
			// this.$input.off("click");
			// this.$button.off("input");
			this.active = false;
		};

		/* Get elements wrap */
		let wrap = document.querySelectorAll(`[data-bind="input-counter"]`);

		/* Fill database */
		wrap.forEach((item) => {
			this.add(item);
		});

		console.log(this.database);

		this.active = true;
	}

}
