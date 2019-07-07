import { easeInOutQuad } from './functions';

interface IScrollTo {
	position: number;
	time: number;
	callbackAfter?: () => void;
}

export function scrollTo(param: IScrollTo) {
	const start = document.documentElement.scrollTop,
		change = param.position - start,
		increment = 20;
	let currentTime = 0;

	const animateScroll = () => {
		currentTime += increment;

		const val = easeInOutQuad(currentTime, start, change, param.time);

		document.documentElement.scrollTop = val;

		if (currentTime < param.time) {
			setTimeout(animateScroll, increment);
		} else {
			if (param.callbackAfter) {
				param.callbackAfter();
			}
		}
	};
	animateScroll();
}
