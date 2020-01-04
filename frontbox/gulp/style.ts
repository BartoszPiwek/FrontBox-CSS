/* Libs */
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { dest, src } from 'gulp';
import footer from 'gulp-footer';
import header from 'gulp-header';
import gulpif from 'gulp-if';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import sourcemaps from 'gulp-sourcemaps';
import uncss from 'uncss';
/* Config */
import * as config from '../../config.back';
import { browserSync } from '../../gulpfile.babel';
import { destPath, getMode } from './frontbox';
const argv = require('yargs').argv;

const concatStyle = argv.prod ? `@import 'bootstrap'; @import 'utilities';` : '';
const passVariables = `
	$dev: ${!argv.prod};
	$infoOffJavascript: ${config.info.offJavascript};
	$infoOldBrowser: ${config.info.oldBrowser};
`;

export function styleMain() {
	const element = config.path.style.main;
	return src(`${element.files}`)
		.pipe(gulpif(!argv.prod, sourcemaps.init({ loadMaps: true })))
		.pipe(header(passVariables + concatStyle))
		.pipe(gulpif(config.working, footer(`@import '${config.path.plugins}/**/*.scss';`)))
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(
			gulpif(
				argv.prod,
				postcss([
					autoprefixer(),
					cssnano(),
					uncss.postcssPlugin({
						html: [`${destPath()}/*.html`],
						ignoreSheets: [/fonts.googleapis/],
						ignore: [/js_*/, /data-tabs-slider-active/, /\.active/]
					})
				])
			)
		)
		.pipe(rename({
			suffix: `.${getMode()}`
		}))
		.pipe(gulpif(!argv.prod, sourcemaps.write(`./`, { sourceRoot: './' })))
		.pipe(dest(`${destPath()}/${element.dest}`))
		.pipe(browserSync.stream());
}

export function styleBootstrap(cb) {
	const element = config.path.style.bootstrap;

	if (!argv.prod) {
		return src(`${element.files}`)
			.pipe(header(passVariables))
			.pipe(gulpif(!argv.prod, sourcemaps.init({ loadMaps: true })))
			.pipe(sassGlob())
			.pipe(sass({ outputStyle: 'compressed' }))
			.pipe(rename({
				suffix: `.${getMode()}`
			}))
			.pipe(gulpif(!argv.prod, sourcemaps.write(`./`, { sourceRoot: './' })))
			.pipe(dest(`${destPath()}/${element.dest}`))
			.pipe(browserSync.stream());
	} else {
		cb();
	}
}

export function styleUtilities(cb) {
	const element = config.path.style.utilities;

	if (!argv.prod) {
		return src(`${element.files}`)
			.pipe(gulpif(!argv.prod, sourcemaps.init({ loadMaps: true })))
			.pipe(sassGlob())
			.pipe(sass())
			.pipe(rename({
				suffix: `.${getMode()}`
			}))
			.pipe(gulpif(!argv.prod, sourcemaps.write(`./`, { sourceRoot: './' })))
			.pipe(dest(`${destPath()}/${element.dest}`))
			.pipe(browserSync.stream());
	} else {
		cb();
	}
}

export function styleConcat() {

}