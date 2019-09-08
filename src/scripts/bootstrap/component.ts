interface IComponent {
	onInit?: Function;
	afterInit?: Function;
	onScroll?: Function;
	onResize?: Function;
}

export abstract class Component implements IComponent {
	constructor(param?: any) {
		if (param) {
			Object.assign(this, param);
		}

		/* Run function after initialization */
		if (this.afterInit) {
			this.afterInit();
		}

		/* Run function on resize */
		if (this.onResize) {
			window.addEventListener(
				'resize',
				() => {
					this.onResize();
				},
				false
			);
			this.onResize();
		}

		/* Run function on scroll */
		if (this.onScroll) {
			window.addEventListener('scroll', () => {
				this.onScroll();
			});
			this.onScroll();
		}

		if (this.onInit) {
			this.onInit();
		}
	}

	afterInit?(): void;
	onScroll?(): void;
	onResize?(): void;
	onInit?(): void;
}
