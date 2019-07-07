interface IScrollTo {
	position: number;
	time: number;
	callbackAfter: () => void;
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
			if (param.callbackAfter) param.callbackAfter();
		}
	};

	animateScroll();
}

export function easeInOutQuad(t, b, c, d) {
	t /= d / 2;
	if (t < 1) return (c / 2) * t * t + b;
	t--;
	return (-c / 2) * (t * (t - 2) - 1) + b;
}
