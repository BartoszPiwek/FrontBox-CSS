interface IComponent {
	onInit?: Function;
	onScroll?: Function;
	onResize?: Function;
}

export abstract class Component implements IComponent {
	constructor(param?: any) {
		if (param) {
			Object.assign(this, param);
		}

		/* Run function on resize */
		if (this.onResize) {
			window.addEventListener('resize orientationchange', () => {
				this.onResize();
			});
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

	onScroll?(): void;
	onResize?(): void;
	onInit?(): void;
}
