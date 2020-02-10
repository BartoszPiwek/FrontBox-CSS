/**
 * Get values from finder attributes and fire callback
 *
 * @function
 * @version					1.0
 * @example
loopAttributes({
	attribute: 'data-tabs-content',
	callback: value => {
		new Tabs({
			name: value
		});
	}
});
 * @changelog
 * 04.08.2019 Add
 */

interface ILoopAttributes {
	attribute: string;
	callback: Function;
}

export function loopAttributes(param: ILoopAttributes): void {
	const elements = document.querySelectorAll(`[${param.attribute}]`);
	const length = elements.length;

	for (let index = 0; index < length; index++) {
		param.callback(elements[index].getAttribute(param.attribute));
	}
}
