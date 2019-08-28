export class Wcag {
	active: boolean = false;

	_keydown: EventListener;
	_mousedown: EventListener;

	constructor() {
		document.documentElement.addEventListener(
			'keydown',
			(this._keydown = (e: KeyboardEvent) => {
				document.body.classList.add('js_wcag');
			})
		);

		document.documentElement.addEventListener('mousedown', (e: KeyboardEvent) => {
			document.body.classList.remove('js_wcag');
		});
	}
}
