/* Libs */
import { dest, src, watch } from "gulp";
import * as newer from 'gulp-newer';
import { Gulpclass, Task } from "gulpclass/Decorators";
import { configCopy } from "../../config";
import { websiteDestinationPath } from "./frontbox";

const argv = require("yargs").argv;

@Gulpclass()
export class FrontboxGulpCopy {
	private tasks = {};

	init() {
		configCopy.map((element) => {
			this.tasks[element.name] = () => {
				return src(`${element.files}`)
					.pipe(newer(`${websiteDestinationPath}/${element.dest}`))
					.pipe(dest(`${websiteDestinationPath}/${element.dest}`))
			};

			this.tasks[element.name]();
		})

		if (argv.watch) {
			this.watch();
		}
	}

	@Task()
	watch() {
		for (const copyTask of configCopy) {
			const copy = () => {
				return this.tasks[copyTask.name]();
			};

			(Object.assign(copy, { displayName: `copy${copyTask.name.charAt(0).toUpperCase() + copyTask.name.slice(1)}` }));

			watch(
				copyTask.watch,
				copy
			)
		}
	}
}
