export class Wcag {
	constructor() {
		document.documentElement.addEventListener('keydown', (e: KeyboardEvent) => {
			document.body.classList.add('js_wcag');
		});
		document.documentElement.addEventListener('mousedown', (e: KeyboardEvent) => {
			document.body.classList.remove('js_wcag');
		});
	}
}
