/**
 * Create element placeholder
 *
 * @class
 * @version					1.0
 * @require
 * Changelog
 * 01.07.2019 Init
 */

export class ElementPlaceholder {
	public create($element: HTMLElement, callback?: Function) {
		let height: number = $element.clientHeight;
		$element.insertAdjacentHTML('beforeend', `<div class="js_placeholder" style="height:${height}px;"></div>`);
	}
}
