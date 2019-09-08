/**
 * Show console logs on webpage front
 *
 * @class FrontboxConsole
 * @version 1.1
 */

interface IFrontboxConsoleAdd {
	title: string;
	content: string;
	type?: 'error' | 'warning';
}
interface IFrontboxConsole {
	hide?: boolean;
	open?: boolean;
	autoOpen?: boolean;
}

export class FrontboxConsole implements IFrontboxConsole {
	element: HTMLElement;
	content: HTMLElement;
	label: HTMLElement;
	unread: HTMLElement;

	counter: number = 0;
	tempActive: boolean = false;
	autoOpenCounter: number = 0;
	unreadCount: number = 0;

	hide = false;
	open = false;
	autoOpen = false;

	constructor(param: IFrontboxConsole) {
		Object.assign(this, param);

		if (this.hide) {
			return;
		}

		document.body.insertAdjacentHTML(
			'beforeend',
			`<div class="debugger debugger--console ${this.open ? 'open' : ''}" id="debuggerConsole">
				<div class="debugger__label" id="debuggerConsoleLabel">
					FrontBox Console
				</div>
				<div class="debugger__content" id="debuggerConsoleContent"></div>
			</div>`
		);

		this.element = document.getElementById('debuggerConsole');
		this.content = document.getElementById('debuggerConsoleContent');
		this.label = document.getElementById('debuggerConsoleLabel');

		if (!this.autoOpen) {
			this.label.insertAdjacentHTML('beforeend', `<span class="debugger__unread" id="debuggerConsoleUnread">0</span>`);
			this.unread = document.getElementById('debuggerConsoleUnread');
		}

		this.label.addEventListener('click', (e: MouseEvent) => {
			if (!this.autoOpen) {
				this.unreadCount = 0;
				this.updateUnreadCounter('');
			}

			this.open = !this.open;
			this.toggle(e);
		});
	}

	toggle(e?: MouseEvent): EventListener {
		this.element.classList.toggle('open');
		return;
	}

	updateUnreadCounter(value: number | string) {
		this.unread.innerText = String(value);
	}

	add(param: IFrontboxConsoleAdd) {
		if (this.hide) {
			return;
		}

		const id = this.counter++;
		this.content.insertAdjacentHTML(
			'afterbegin',
			`<div class="debugger-item ${param.type ? param.type : ''}" id="debuggerConsole${id}">
          	<div class="debugger-item__title">${param.title}</div>
	          <div class="debugger-item__content">${param.content}</div>
          </div>
        </div>`
		);

		if (this.autoOpen) {
			this.autoOpenCounter++;
			if (!this.open && !this.tempActive) {
				this.tempActive = true;
				this.toggle();
			}
		} else {
			this.updateUnreadCounter(++this.unreadCount);
		}

		window.setTimeout(() => {
			this.autoOpenCounter--;
			if (this.tempActive && !this.open && this.autoOpen && this.autoOpenCounter == 0) {
				this.toggle();
				this.tempActive = false;
			}

			window.setTimeout(() => {
				document.getElementById(`debuggerConsole${id}`).classList.add('old');
			}, 3000);
		}, 3000);
	}
}
