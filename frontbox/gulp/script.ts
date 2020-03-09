import * as browserify from "browserify";
import { dest } from "gulp";
import * as babel from "gulp-babel";
import * as gulpif from "gulp-if";
import * as rename from "gulp-rename";
import * as sourcemaps from "gulp-sourcemaps";
import * as stripCode from "gulp-strip-code";
import { Gulpclass, Task } from "gulpclass/Decorators";
import * as buffer from "vinyl-buffer";
import * as source from "vinyl-source-stream";
import { configScript } from "../../config";
import { browserSync } from "../../gulpfile";
import { AbstractFrontboxGulpTask, getMode } from "./frontbox";
import { IFrontboxConfig, IFrontboxTask } from "./interface";

const argv = require("yargs").argv;

@Gulpclass()
export class FrontboxGulpScript extends AbstractFrontboxGulpTask {
	constructor(params?: IFrontboxTask) {
		super(configScript, params);
	}

	@Task()
	task(element: IFrontboxConfig) {
		return new Promise(resolve => {
			browserify(
				{ entries: `${element.files}` },
				{
					plugin: ["tsify"],
					debug: !argv.prod
				}
			)
				.bundle()
				.pipe(source("app.js"))
				.pipe(buffer())
				.pipe(
					gulpif(
						argv.prod,
						stripCode({
							start_comment: "test-code",
							end_comment: "end-test-code"
						})
					)
				)
				.pipe(
					gulpif(
						argv.prod,
						babel({
							presets: ["@babel/preset-env", "minify"],
							plugins: [
								"babel-plugin-loop-optimizer",
								"@babel/plugin-transform-object-assign",
								["transform-remove-console"]
							],
							comments: false
						})
					)
				)
				.pipe(gulpif(!argv.prod, sourcemaps.init({ loadMaps: true })))
				.pipe(
					rename({
						suffix: `.${getMode}`
					})
				)
				.pipe(
					gulpif(!argv.prod, sourcemaps.write(`./`, { sourceRoot: "./js" }))
				)
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
			this.watch("script");
		}
	}
}
