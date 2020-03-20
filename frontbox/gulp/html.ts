import { dest, src } from 'gulp'
import * as changed from 'gulp-changed'
import * as pug from 'gulp-pug'
import { Gulpclass, Task } from 'gulpclass/Decorators'
import { configHtml, configWebsite } from '../../config'
import { browserSync } from '../../gulpfile'
import { AbstractFrontboxGulpTask, getMode } from './frontbox'
import { IFrontboxConfig, IFrontboxTask } from './interface'

const argv = require('yargs').argv
const pugOptions = {
	data: {
		getMode: getMode,
		dev: getMode === 'dev',
		website: {
			...configWebsite,
		},
	},
	pretty: true,
	verbose: true,
	filters: require('./pug-filters')({
		version: getMode,
	}),
}

@Gulpclass()
export class FrontboxGulpHTML extends AbstractFrontboxGulpTask {
	constructor(params?: IFrontboxTask) {
		super(configHtml, params)
	}

	@Task()
	task(element: IFrontboxConfig) {
		return new Promise(resolve => {
			src(`${element.files}`)
				.pipe(
					changed(`${this.destinationPath}/${element.dest}`, {
						extension: '.html',
					})
				)
				.pipe(pug(pugOptions))
				.pipe(dest(`${this.destinationPath}/${element.dest}`))
				.on('end', () => {
					resolve()
					browserSync.reload()
				})
		})
	}

	@Task()
	taskImpact(element: IFrontboxConfig) {
		return new Promise(resolve => {
			src(`${element.files}`)
				.pipe(pug(pugOptions))
				.pipe(dest(`${this.destinationPath}/${element.dest}`))
				.on('end', () => {
					resolve()
					browserSync.reload()
				})
		})
	}

	@Task()
	async start() {
		this.createTasks((element: IFrontboxConfig) => {
			if (element.otherTasksImpact) {
				return this.taskImpact(element)
			} else {
				return this.task(element)
			}
		})

		await this.loopTasks(async element => {
			await this.tasks[element.name]()
		})

		if (argv.watch && !argv.prod) {
			this.watch('html')
		}
	}

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
