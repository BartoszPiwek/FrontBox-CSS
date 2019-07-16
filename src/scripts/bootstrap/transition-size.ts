import { getTransitionEvent } from './browser';

interface iTransition {
	$element: Element;
	callbackChanged?: () => void;
}

export function transition(args: iTransition) {
	const $container = args.$element.parentElement,
		containerHeight = $container.clientHeight,
		elementHeight = args.$element.clientHeight;

	$container.classList.add('js_transition');
	$container.style.height = `${containerHeight}px`;

	window.setTimeout(() => {
		$container.style.height = `${elementHeight}px`;
		$container.addEventListener(
			getTransitionEvent(),
			() => {
				$container.classList.remove('js_transition');
				$container.style.height = null;

				if (args.callbackChanged) {
					args.callbackChanged();
				}
			},
			false
		);
	}, 50);
}