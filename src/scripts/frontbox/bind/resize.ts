import { $body } from "./../data/elements";

/**
 * Resize
 */
interface ResizeTemplate {
    loading: string
}

interface QueueItem {
    name: string
    callback: Function
}

interface Queue {
    width: Array<QueueItem>
    height: Array<QueueItem>
}

export class Resize {

    /* HTML template */
    template: {ResizeTemplate}
    /* Queue with all binds */
    queue: Queue;
    /* Time to fire resize */
    resizeTime: number = 400;

    /* Constructor */
    constructor() {
        
    }

}