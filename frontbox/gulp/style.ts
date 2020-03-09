import { dest, src } from "gulp";
import * as header from "gulp-header";
import * as gulpif from "gulp-if";
import * as sass from "gulp-sass";
import * as sassGlob from "gulp-sass-glob";
import * as sourcemaps from "gulp-sourcemaps";
import { Gulpclass, Task } from "gulpclass/Decorators";
import { configStyle, configWebsite } from "../../config";
import { browserSync } from "../../gulpfile";
import { AbstractFrontboxGulpTask } from "./frontbox";
import { IFrontboxConfig, IFrontboxTask } from "./interface";

const argv = require("yargs").argv;
const scssOptions = `
	$dev: ${!argv.prod};
	$infoOffJavascript: ${configWebsite.info.javascriptOff};
	$infoOldBrowser: ${configWebsite.info.usingOldBrowser};
`;

@Gulpclass()
export class FrontboxGulpStyle extends AbstractFrontboxGulpTask {
	constructor(params?: IFrontboxTask) {
		super(configStyle, params);
	}

	task(element: IFrontboxConfig) {
		return new Promise(resolve => {
			src(`${element.files}`, {
				allowEmpty: true
			})
				.pipe(gulpif(!argv.prod, sourcemaps.init({ loadMaps: true })))
				.pipe(header(scssOptions))
				.pipe(sassGlob())
				.pipe(sass())
				.pipe(gulpif(!argv.prod, sourcemaps.write(`./`, { sourceRoot: "./" })))
				.pipe(dest(`${this.destinationPath}/${element.dest}`))
				.on("end", () => {
					resolve();
					browserSync.stream();
				});
		});
	}

	@Task()
	async start() {
		this.createTasks(element => {
			return this.task(element);
		});

		await this.loopTasks(async element => {
			await this.tasks[element.name]();
		});

		if (argv.watch && !argv.prod) {
			this.watch("style");
		}
	}
}
