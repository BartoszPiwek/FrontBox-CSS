import { dest, src, watch } from "gulp";
import * as concat from "gulp-concat";
import { Gulpclass, Task } from "gulpclass/Decorators";
import { IFrontboxConfig, IFrontboxTask } from "./interface";

const argv = require("yargs").argv;

export const getMode: string = argv.prod ? "prod" : "dev";
export const websiteDestinationPath: string = `public/${getMode}`;

@Gulpclass()
export abstract class AbstractFrontboxGulpTask {
	public tasks = {};
	public concatTasks = {};
	public configTask: IFrontboxConfig[];

	public destinationPath: string;
	public canConcatFiles: boolean;

	constructor(configTask: IFrontboxConfig[], params?: IFrontboxTask) {
		this.configTask = configTask;

		this.destinationPath = websiteDestinationPath;

		if (params) {
			Object.assign(this, params);
		}
	}

	public async asyncForEach(array, callback) {
		for (let index = 0; index < array.length; index++) {
			await callback(array[index], index, array);
		}
	}

	public async loopTasks(fun: Function) {
		await this.asyncForEach(this.configTask, async v => {
			await fun(v);
		});
	}

	public createTasks(fun: Function) {
		this.configTask.forEach(v => {
			this.tasks[v.name] = async () => {
				return await fun(v);
			};
		});
	}

	public concatFiles() {
		this.configTask
			.filter(v => !v.concatWith)
			.map(async mainConfigStyle => {
				this.concatTasks[mainConfigStyle.name] = () => {
					const filesToConcat = this.configTask.filter(
						v =>
							v.concatWith === mainConfigStyle.name ||
							v.name === mainConfigStyle.name
					);
					let pathFilesToConcat = filesToConcat.map(concatConfigStyle => {
						return (
							[
								this.destinationPath
									? this.destinationPath
									: websiteDestinationPath,
								concatConfigStyle.dest,
								concatConfigStyle.name
							]
								.filter(concatConfigStyle => concatConfigStyle != "")
								.join("/") + ".css"
						);
					});

					return src(pathFilesToConcat)
						.pipe(concat(`${mainConfigStyle.name}.css`))
						.pipe(
							dest(
								this.destinationPath
									? this.destinationPath
									: `${websiteDestinationPath}/${mainConfigStyle.dest}`
							)
						);
				};
				await this.concatTasks[mainConfigStyle.name]();
			});
	}

	@Task()
	public watch(prefix: string) {
		this.configTask.forEach(element => {
			const copy = async done => {
				await this.tasks[element.name]();
				done();
			};

			Object.assign(copy, {
				displayName: `${prefix}${element.name.charAt(0).toUpperCase() +
					element.name.slice(1)}`
			});

			watch(element.watch, copy);
		});
	}

	public abstract task?(element: IFrontboxConfig);

	// public abstract start();
}
