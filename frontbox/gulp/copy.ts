import { dest, src } from "gulp";
import * as newer from "gulp-newer";
import { Gulpclass } from "gulpclass/Decorators";
import { configCopy } from "../../config";
import { browserSync } from "../../gulpfile";
import { AbstractFrontboxGulpTask } from "./frontbox";
import { IFrontboxConfig, IFrontboxTask } from "./interface";

const argv = require("yargs").argv;

@Gulpclass()
export class FrontboxGulpCopy extends AbstractFrontboxGulpTask {
	constructor(params?: IFrontboxTask) {
		super(configCopy, params);
	}

	task(element: IFrontboxConfig) {
		return new Promise(resolve => {
			src(element.files)
				.pipe(newer(`${this.destinationPath}/${element.dest}`))
				.pipe(dest(`${this.destinationPath}/${element.dest}`))
				.on("end", () => {
					resolve();
					browserSync.stream();
				});
		});
	}

	async start() {
		this.createTasks(element => {
			return this.task(element);
		});

		await this.loopTasks(async element => {
			await this.tasks[element.name]();
		});

		if (argv.watch && !argv.prod) {
			this.watch("copy");
		}
	}
}
