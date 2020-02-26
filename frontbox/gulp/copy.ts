import { dest, src } from "gulp";
import * as newer from 'gulp-newer';
import { Gulpclass, Task } from "gulpclass/Decorators";
import { configCopy } from "../../config";
import { AbstractFrontboxGulpTask } from "./frontbox";
import { IFrontboxConfig, IFrontboxTask } from "./interface";

const argv = require("yargs").argv;

@Gulpclass()
export class FrontboxGulpCopy extends AbstractFrontboxGulpTask {
	constructor(params?: IFrontboxTask) {
		super(configCopy, params);
	}

	@Task()
	task(element: IFrontboxConfig) {
		return src(`${element.files}`)
			.pipe(newer(`${this.destinationPath}/${element.dest}`))
			.pipe(dest(`${this.destinationPath}/${element.dest}`));
	}

	start() {
		this.createTasks(element => {
			this.task(element);
		})

		this.loopTasks(element => {
			this.tasks[element.name]();
		})

		if (argv.watch && !argv.prod) {
			this.watch('copy');
		}
	}
}
