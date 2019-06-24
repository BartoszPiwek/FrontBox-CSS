import { body } from "./elements";

/**
 * Resize
 */
interface ResizeData {
	template: string | boolean
}

interface QueueItem {
	name: string
	callback: Function
}

interface Queue {
	width: Array<QueueItem>
	height: Array<QueueItem>
	all: Array<QueueItem>
}

export class Resize {

	/* Arguments */
	data: ResizeData = {
		template: false,
	}
	/* Queue with all binds */
	queue: Queue;
	/* Time to fire resize */
	resizeTime: number = 400;

	/* Constructor */
	constructor(data?: ResizeData) {

	}

	trigger() {

	}

	add() {

	}

	clean() {

	}

	run() {

	}

	resize() {

	}

}
