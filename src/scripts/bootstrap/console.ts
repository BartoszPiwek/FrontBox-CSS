/**
 * Show console logs on webpage front
 *
 * @class FrontboxConsole
 * @version 1.0
 */

import { body } from './elements';

interface IFrontboxConsoleAdd {
	title: string;
	content: string;
	type?: string;
}
interface IFrontboxConsole {
	hide?: boolean;
	open?: boolean;
	autoOpen?: boolean;
}

export class FrontboxConsole {
	element: HTMLElement;
	content: HTMLElement;
	label: HTMLElement;
	counter: number = 0;
	tempActive: boolean = false;
	open: boolean = false;
	autoOpenCounter: number = 0;

	data: IFrontboxConsole = {
		hide: false,
		open: false,
		autoOpen: true
	};

	constructor(param: IFrontboxConsole) {
		Object.assign(this.data, param);

		if (this.data.hide) {
			return;
		}

		const template = `
			<div class="debug-console ${this.data.open ? 'open' : ''}" id="debugConsole">
				<div class="debug-console__label" id="debugConsoleLabel">FrontBox Console</div>
				<div class="debug-console__content" id="debugConsoleContent"></div>
			</div>
		`;
		body.insertAdjacentHTML('beforeend', template);
		this.element = document.getElementById('debugConsole');
		this.content = document.getElementById('debugConsoleContent');
		this.label = document.getElementById('debugConsoleLabel');
		this.label.addEventListener('click', (e: MouseEvent) => {
			this.data.open = !this.data.open;
			this.toggle(e);
		});
	}

	toggle(e?: MouseEvent): EventListener {
		this.element.classList.toggle('open');
		return;
	}

	add(param: IFrontboxConsoleAdd) {
		if (this.data.hide) {
			return;
		}

		const id = this.counter++,
			template = `
        <div class="debug-console-item ${param.type ? param.type : ''}" id="debugConsole${id}">
          	<div class="debug-console-item__title">${param.title}</div>
	          <div class="debug-console-item__content">${param.content}</div>
          </div>
        </div>
      `;
		this.content.insertAdjacentHTML('afterbegin', template);

		if (this.data.autoOpen) {
			this.autoOpenCounter++;
			if (!this.data.open && !this.tempActive) {
				this.tempActive = true;
				this.toggle();
			}
		}

		window.setTimeout(() => {
			this.autoOpenCounter--;
			if (this.tempActive && !this.data.open && this.data.autoOpen && this.autoOpenCounter == 0) {
				this.toggle();
				this.tempActive = false;
			}

			window.setTimeout(() => {
				document.getElementById(`debugConsole${id}`).classList.add('old');
			}, 3000);
		}, 3000);
	}
}

/**
 * Changelog
 * 16.06.2019 Add
 */
