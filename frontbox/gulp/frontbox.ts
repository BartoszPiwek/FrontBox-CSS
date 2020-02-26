import { watch } from "gulp";
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
	public includePrefix: boolean;
	public canConcatFiles: boolean;

	constructor(configTask: IFrontboxConfig[], params?: IFrontboxTask) {
		this.includePrefix = true;
		this.configTask = configTask;

		this.destinationPath = websiteDestinationPath;

		if (params) {
			Object.assign(this, params);
		}
	}

	public loopTasks(fun: Function) {
		this.configTask.forEach(v => {
			return fun(v);
		})
	}

	public createTasks(fun: Function) {
		this.configTask.forEach(v => {
			this.tasks[v.name] = () => {
				return fun(v);
			};
		})
	}

	public concatFiles() {
		// this.configStyle.filter(v => !v.concatWith).map(async mainConfigStyle => {

		// 	this.concatTasks[mainConfigStyle.name] = () => {

		// 		const filesToConcat = configStyle.filter(v => v.concatWith === mainConfigStyle.name || v.name === mainConfigStyle.name);

		// 		let pathFilesToConcat = filesToConcat.map((concatConfigStyle) => {
		// 			return [
		// 				this.destinationPath ? this.destinationPath : websiteDestinationPath,
		// 				concatConfigStyle.dest,
		// 				concatConfigStyle.name + '.' + getMode
		// 			].filter(concatConfigStyle => concatConfigStyle != '').join('/') + '.css';
		// 		});

		// 		console.log(pathFilesToConcat);


		// 		return src(pathFilesToConcat)
		// 			.pipe(concat(`${mainConfigStyle.name}.${getMode}.css`))
		// 			.pipe(dest(this.destinationPath
		// 				? this.destinationPath
		// 				: `${websiteDestinationPath}/${mainConfigStyle.dest}`));
		// 	}

		// 	await this.concatTasks[mainConfigStyle.name]();
		// });
	}

	@Task()
	public watch(prefix: string) {
		this.configTask.forEach(element => {

			const copy = async (done) => {
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
	public abstract start();
}
