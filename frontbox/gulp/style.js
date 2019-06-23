/* Import libs */
import { src, dest } from "gulp";
import sass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import header from 'gulp-header';
import footer from 'gulp-footer';
import rename from "gulp-rename";
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import { browserSync } from "./../../gulpfile.babel";
const argv = require('yargs').argv;

/* Import config */
import * as config from "./../../config";
import { getModeName } from './index';

export function style_main() {

	const element = config.path.style.main;

	config.dev = !argv.prod;

	return src(`${element.files}`, {
		allowEmpty: true,
	})
		.pipe(header(
			`$dev: ${config.dev};`
		))
		.pipe(gulpif(!argv.prod,
			footer(
				`@import '../../../FrontBox-Plugins/**/*.scss';`
			)
		))
		.pipe(gulpif(argv.prod,
			footer(`
				@import 'bootstrap';
				@import 'utilities';
				@import 'settings';
			`)
		))
		.pipe(gulpif(!argv.prod,
			sourcemaps.init({ loadMaps: true })
		))
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(rename({
			suffix: `.${getModeName()}`,
		}))
		.pipe(gulpif(!argv.prod,
			sourcemaps.write(`./`, { sourceRoot: './' })
		))
		.pipe(dest(
			`public/${getModeName()}/${element.dest}`
		))
		.pipe(browserSync.stream());
}
export function style_bootstrap() {

	const element = config.path.style.bootstrap;

	return src(`${element.files}`, {
		allowEmpty: true,
	})
		.pipe(header(
			`$dev: ${config.dev};\n`
		))
		.pipe(gulpif(!argv.prod,
			sourcemaps.init({ loadMaps: true })
		))
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(rename({
			suffix: `.${getModeName()}`,
		}))
		.pipe(dest(
			`public/${getModeName()}/${element.dest}`
		))
		.pipe(browserSync.stream());
}
export function style_utilities() {

	const element = config.path.style.utilities;


	return src(`${element.files}`, {
		allowEmpty: true,
	})
		.pipe(gulpif(!argv.prod,
			sourcemaps.init({ loadMaps: true })
		))
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(rename({
			suffix: `.${getModeName()}`,
		}))
		.pipe(dest(
			`public/${getModeName()}/${element.dest}`
		))
		.pipe(browserSync.stream());
}
