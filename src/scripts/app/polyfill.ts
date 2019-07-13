// Get reliable CSS vh sizes (https://github.com/Hiswe/vh-check)
require('vh-check')();
// CSS custom properties support
const cssVars = require('css-vars-ponyfill');

interface IPolyfill {
	scrollbarWidth: number;
}
export function polyfill(param: IPolyfill) {
	cssVars({
		variables: {
			scrollbarWidth: `${param.scrollbarWidth}px`
		}
	});
}
