import { body } from './elements';

interface IFrontboxConsoleAdd {
	title: string;
	content: string;
	type?: string;
}
interface IFrontboxConsole {
	hide?: boolean;
}

export class FrontboxConsole {
	content: HTMLElement;
	counter: number = 0;

	data: IFrontboxConsole = {
		hide: false
	};

	constructor(param: IFrontboxConsole) {
		Object.assign(this.data, param);
		body.insertAdjacentHTML('beforeend', `<div class="debug-console ${this.data.hide ? 'hide' : ''}" id="debugConsole"></div>`);
		this.content = document.getElementById('debugConsole');
	}

	add(param: IFrontboxConsoleAdd) {
		const id = this.counter++,
			html = `
        <div class="debug-console-item ${param.type ? param.type : ''}" id="debugConsole${id}">
          <div class="debug-console-item__title">${param.title}</div>
          <div class="debug-console-item__content">${param.content}</div>
        </div>
      `;
		this.content.insertAdjacentHTML('beforeend', html);
		const element = document.getElementById(`debugConsole${id}`);

		window.setTimeout(() => {
			element.classList.add('debug-console-item--remove');
			window.setTimeout(() => {
				element.parentNode.removeChild(element);
			}, 500);
		}, 8000);
	}
}
