/* Libs */
import browserify from 'browserify';
import { dest } from 'gulp';
import babel from 'gulp-babel';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import stripCode from 'gulp-strip-code';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import sourcemaps from "gulp-sourcemaps";
/* Config */
import { destPath, getMode } from './frontbox';
import * as config from './../../config';
import { browserSync } from './../../gulpfile.babel';
const argv = require('yargs').argv;

/* Import config */
export function scriptApp() {
	const element = config.path.script.app;
	return browserify({ entries: `${element.files}` },
		{
			plugin: ['tsify'],
			debug: !argv.prod,
		})
		.bundle()
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(gulpif(argv.prod,
			stripCode({
				start_comment: "test-code",
				end_comment: "end-test-code"
			})
		))
		.pipe(gulpif(argv.prod,
			babel({
				presets: ['@babel/preset-env', "minify"],
				plugins: [
					'babel-plugin-loop-optimizer',
					'@babel/plugin-transform-object-assign',
					['transform-remove-console']
				],
				comments: false
			})
		))
		.pipe(gulpif(!argv.prod,
			sourcemaps.init({ loadMaps: true })
		))
		.pipe(rename({
			suffix: `.${getMode()}`,
		}))
		.pipe(gulpif(!argv.prod,
			sourcemaps.write(`./`, { sourceRoot: './js' })
		))
		.pipe(dest(
			`${destPath()}/${element.dest}`
		))
		.pipe(browserSync.stream());
}
