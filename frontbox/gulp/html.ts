import { dest, series, src, watch } from 'gulp';
import * as changed from 'gulp-changed';
import * as newer from 'gulp-newer';
import * as pug from 'gulp-pug';
import { Gulpclass, Task } from 'gulpclass/Decorators';
import { configHtml, configWebsite } from '../../config';
import { browserSync } from '../../gulpfile';
import { getMode, websiteDestinationPath } from './frontbox';

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
export class Html {

	init() {
		if (argv.watch) {
			this.watch();
		}
	}

	@Task('main')
	main() {
		return src(`${configHtml.main.files}`)
			.pipe(newer(`${websiteDestinationPath}/${configHtml.main.dest}`))
			.pipe(changed(`${websiteDestinationPath}`))
			.pipe(pug(pugOptions))
			.pipe(dest(`${websiteDestinationPath}/${configHtml.main.dest}`))
			.pipe(browserSync.stream());
	}

	@Task('include')
	include() {
		return src(`${configHtml.include.files}`)
			.pipe(pug(pugOptions))
			.pipe(dest(`${websiteDestinationPath}`))
			.pipe(browserSync.stream());
	}

	@Task('partials')
	partials() {
		return src(`${configHtml.partials.files}`)
			.pipe(newer(`${websiteDestinationPath}/${configHtml.partials.dest}`))
			.pipe(pug(pugOptions))
			.pipe(dest(`${websiteDestinationPath}/${configHtml.partials.dest}`))
			.pipe(browserSync.stream());
	}

	@Task()
	watch() {
		for (const key in configHtml) {
			if (configHtml.hasOwnProperty(key)) {
				const element = configHtml[key];

				watch(
					element.watch,
					series(key)
				);
			}
		}
	}
}