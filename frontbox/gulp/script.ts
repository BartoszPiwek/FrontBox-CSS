import * as browserify from 'browserify';
import { dest, watch } from 'gulp';
import * as babel from 'gulp-babel';
import * as gulpif from 'gulp-if';
import * as rename from 'gulp-rename';
import * as sourcemaps from 'gulp-sourcemaps';
import * as stripCode from 'gulp-strip-code';
import { Gulpclass, Task } from 'gulpclass/Decorators';
import * as buffer from 'vinyl-buffer';
import * as source from 'vinyl-source-stream';
import { configScript } from '../../config';
import { browserSync } from '../../gulpfile';
import { getMode, websiteDestinationPath } from './frontbox';

const argv = require('yargs').argv;

@Gulpclass()
export class FrontboxGulpScript {
	private tasks = {};

	init() {
		configScript.map((element) => {
			this.tasks[element.name] = () => {
				return browserify(
					{ entries: `${element.files}` },
					{
						plugin: ['tsify'],
						debug: !argv.prod
					}
				)
					.bundle()
					.pipe(source('app.js'))
					.pipe(buffer())
					.pipe(
						gulpif(
							argv.prod,
							stripCode({
								start_comment: 'test-code',
								end_comment: 'end-test-code'
							})
						)
					)
					.pipe(
						gulpif(
							argv.prod,
							babel({
								presets: ['@babel/preset-env', 'minify'],
								plugins: ['babel-plugin-loop-optimizer', '@babel/plugin-transform-object-assign', ['transform-remove-console']],
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
					.pipe(gulpif(!argv.prod, sourcemaps.write(`./`, { sourceRoot: './js' })))
					.pipe(dest(`${websiteDestinationPath}/${element.dest}`))
					.pipe(browserSync.stream());
			};

			this.tasks[element.name]();
		})

		if (argv.watch) {
			this.watch();
		}
	}

	@Task()
	watch() {
		for (const element of configScript) {
			const copy = () => {
				return this.tasks[element.name]();
			};

			(Object.assign(copy, { displayName: `script${element.name.charAt(0).toUpperCase() + element.name.slice(1)}` }));

			watch(
				element.watch,
				copy
			)
		}
	}
}
