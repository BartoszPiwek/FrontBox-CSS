import { vh } from '../app/polyfill';
import { browser, frontboxConsole } from '../app';

interface IComponent {
	onInit?: Function;
	afterInit?: Function;
	onScroll?: Function;
	onResize?: Function;
}

export abstract class Component implements IComponent {
	private lastWidth: number;

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
			this.lastWidth = window.innerWidth;

			window.addEventListener(
				'resize',
				() => {
					if ((vh.isNeed && vh.vh !== vh.windowHeight) || !vh.isNeed) {
						this.lastWidth = window.innerWidth;

						this.onResize();

						/* test-code */
						frontboxConsole.add({
							title: 'App',
							content: `${vh.isNeed} ${vh.vh} ${vh.windowHeight}`
						});
						/* end-test-code */
					}
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
