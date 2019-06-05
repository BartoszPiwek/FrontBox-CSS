/* Import libs */
import { watch, src, dest, series } from "gulp";
import sass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import header from 'gulp-header';
import rename from "gulp-rename";
import kss from "kss";
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import { browserSync } from "./../gulpfile.babel";
const argv = require('yargs').argv;

/* Import config */
import * as config from "./../config";
import { getModeName } from './index';

export function docs_run(done) {
	kss({
		source: [
			`src/style/`
		],
		builder: './kss/',
		title: 'FrontBox-CSS Debug Style Guide',
		css: [
			'kss-assets/style.css',
		],
		custom: [
			'Emmet',
			'Mixin'
		]
	}, done());
}

export function docs_watch() {
	watch(['src/style/**/*', `${config.path.plugins}/**/*.scss`, 'kss/*.scss'], series(docs_style, docs_run));
}

export function docs_style() {

	config.dev = !argv.prod;

	return src(`kss/style.scss`, {
		allowEmpty: true,
	})
		.pipe(header(
			`$dev: ${config.dev};`
		))
		.pipe(gulpif(!argv.prod,
			sourcemaps.init({ loadMaps: true })
		))
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(rename({
			sufix: `.debug`,
		}))
		.pipe(gulpif(!argv.prod,
			sourcemaps.write(`./`, { sourceRoot: './' })
		))
		.pipe(dest(
			`kss/kss-assets/`
		));
}
