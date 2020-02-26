import { dest, src } from 'gulp';
import * as changed from 'gulp-changed';
import * as newer from 'gulp-newer';
import * as pug from 'gulp-pug';
import { Gulpclass } from 'gulpclass/Decorators';
import { configHtml, configWebsite } from '../../config';
import { browserSync } from '../../gulpfile';
import { AbstractFrontboxGulpTask, getMode } from './frontbox';
import { IFrontboxConfig, IFrontboxTask } from './interface';

const argv = require('yargs').argv;
const pugOptions = {
	data: {
		getMode: getMode,
		dev: getMode === 'dev',
		website: {
			...configWebsite
		}
	},
	verbose: true,
	filters: require('./pug-filters')({
		version: getMode
	})
};

@Gulpclass()
export class FrontboxGulpHTML extends AbstractFrontboxGulpTask {
	constructor(params?: IFrontboxTask) {
		super(configHtml, params)
	}

	task(element: IFrontboxConfig) {
		return src(`${element.files}`, {
			allowEmpty: true
		})
			.pipe(newer(element.files))
			.pipe(changed(this.destinationPath))
			.pipe(pug(pugOptions))
			.pipe(dest(`${this.destinationPath}/${element.dest}`))
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
			this.watch('html');
		}
	}

	// @Task('main')
	// main() {
	// 	return src(`${configHtml.main.files}`)
	// 		.pipe(newer(`${websiteDestinationPath}/${configHtml.main.dest}`))
	// 		.pipe(changed(`${websiteDestinationPath}`))
	// 		.pipe(pug(pugOptions))
	// 		.pipe(dest(`${websiteDestinationPath}/${configHtml.main.dest}`))
	// 		.pipe(browserSync.stream());
	// }

	// @Task('include')
	// include() {
	// 	return src(`${configHtml.include.files}`)
	// 		.pipe(pug(pugOptions))
	// 		.pipe(dest(`${websiteDestinationPath}`))
	// 		.pipe(browserSync.stream());
	// }

	// @Task('partials')
	// partials() {
	// 	return src(`${configHtml.partials.files}`)
	// 		.pipe(newer(`${websiteDestinationPath}/${configHtml.partials.dest}`))
	// 		.pipe(pug(pugOptions))
	// 		.pipe(dest(`${websiteDestinationPath}/${configHtml.partials.dest}`))
	// 		.pipe(browserSync.stream());
	// }

	// @Task('hash')
	// hash() {
	// 	return src(`${websiteDestinationPath}/*.html`)
	// 		.pipe(
	// 			hash({
	// 				asset: `${websiteDestinationPath}`
	// 			})
	// 		)
	// 		.pipe(dest(`${websiteDestinationPath}`));
	// }
}