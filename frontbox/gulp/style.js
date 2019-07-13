/* Libs */
import { src, dest } from 'gulp';
import sass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import header from 'gulp-header';
import footer from 'gulp-footer';
import rename from 'gulp-rename';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import uncss from 'uncss';
import postcss from 'gulp-postcss';
import { browserSync } from './../../gulpfile.babel';
/* Config */
import * as config from './../../config';
import { getMode, destPath } from './frontbox';
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
export function styleBootstrap() {
	const element = config.path.style.bootstrap;
	return src(`${element.files}`)
		.pipe(header(passVariables))
		.pipe(gulpif(!argv.prod, sourcemaps.init({ loadMaps: true })))
		.pipe(sassGlob())
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(rename({
			suffix: `.${getMode()}`
		}))
		.pipe(dest(`${destPath()}/${element.dest}`))
		.pipe(browserSync.stream());
}
export function styleUtilities() {
	const element = config.path.style.utilities;
	return src(`${element.files}`)
		.pipe(gulpif(!argv.prod, sourcemaps.init({ loadMaps: true })))
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(rename({
			suffix: `.${getMode()}`
		}))
		.pipe(dest(`${destPath()}/${element.dest}`))
		.pipe(browserSync.stream());
}
