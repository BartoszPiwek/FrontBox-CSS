/**
 * Show console logs on webpage front
 *
 * @class FrontboxWarch
 * @version 1.0
 */

interface IFrontboxWatch {
	hide?: boolean;
	open?: boolean;
}

interface IFrontboxWatchAdd {
	key: string;
	data: string[];
}

interface IFrontboxWatchRefresh {
	key: string;
	data: {
		[key: string]: any;
	};
}

export class FrontboxWatch implements IFrontboxWatch {
	element: HTMLElement;
	content: HTMLElement;
	label: HTMLElement;

	hide = false;
	open = false;

	data: any;

	constructor(param: IFrontboxWatch) {
		Object.assign(this, param);

		if (this.hide) {
			return;
		}

		document.body.insertAdjacentHTML(
			'beforeend',
			`<div class="debugger debugger--watch ${this.open ? 'open' : ''}" id="debuggerWatch">
				<div class="debugger__label" id="debuggerWatchLabel">
					FrontBox Watch
				</div>
				<div class="debugger__content" id="debuggerWatchContent"></div>
			</div>`
		);

		this.element = document.getElementById('debuggerWatch');
		this.content = document.getElementById('debuggerWatchContent');
		this.label = document.getElementById('debuggerWatchLabel');

		this.label.addEventListener('click', (e: MouseEvent) => {
			this.open = !this.open;
			this.toggle(e);
		});
	}

	toggle(e?: MouseEvent): EventListener {
		this.element.classList.toggle('open');
		return;
	}

	add(param: IFrontboxWatchAdd) {
		if (this.hide) {
			return;
		}

		param.data.forEach(value => {
			this.content.insertAdjacentHTML(
				'afterbegin',
				`<div class="debugger-item">
          	<div class="debugger-item__title">${value}</div>
	          <div class="debugger-item__content" id="${param.key}-${value}"></div>
          </div>
        </div>`
			);
		});
	}

	refresh(param: IFrontboxWatchRefresh) {
		for (const key in param.data) {
			if (param.data.hasOwnProperty(key)) {
				const element = param.data[key] ? param.data[key] : '...';
				document.getElementById(`${param.key}-${key}`).innerHTML = element;
			}
		}
	}
}
