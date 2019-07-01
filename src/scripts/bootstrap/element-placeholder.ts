/**
 * Create element placeholder
 *
 * @class ElementPlaceholder
 * @version 1.0
 * @require
 *
 */

export class ElementPlaceholder {

	public create($element: HTMLElement, callback?: Function) {
		let width: number = $element.clientHeight;
		$element.insertAdjacentHTML('beforeend', `<div class="js_placeholder" style="height:${width}px;"></div>`);
	}

}

/**
 * Changelog
 * 01.07.2019 Init
 */
