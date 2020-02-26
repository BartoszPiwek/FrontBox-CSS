import { dest, src } from "gulp";
import * as header from "gulp-header";
import * as gulpif from "gulp-if";
import * as rename from "gulp-rename";
import * as sass from "gulp-sass";
import * as sassGlob from "gulp-sass-glob";
import * as sourcemaps from "gulp-sourcemaps";
import { Gulpclass, Task } from "gulpclass/Decorators";
import { configStyle, configWebsite } from "../../config";
import { browserSync } from "../../gulpfile";
import { AbstractFrontboxGulpTask, getMode } from "./frontbox";
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

	@Task()
	task(element: IFrontboxConfig) {
		return src(`${element.files}`, {
			allowEmpty: true
		})
			.pipe(gulpif(!argv.prod, sourcemaps.init({ loadMaps: true })))
			.pipe(header(scssOptions))
			.pipe(sassGlob())
			.pipe(sass())
			.pipe(
				gulpif(
					this.includePrefix,
					rename({
						suffix: `.${getMode}`
					})
				)
			)
			.pipe(
				gulpif(!argv.prod, sourcemaps.write(`./`, { sourceRoot: "./" }))
			)
			.pipe(
				dest(
					`${this.destinationPath}/${element.dest}`
				)
			)
			.pipe(browserSync.stream());
	}

	start() {
		this.createTasks(element => {
			this.task(element);
		})

		this.loopTasks(element => {
			this.tasks[element.name]();
		})

		if (argv.watch && !argv.prod) {
			this.watch('style');
		}
	}
}
