/* Libs */
import { src, dest } from 'gulp';
import pug from 'gulp-pug';
import { browserSync } from './../../gulpfile.babel';
import changed from 'gulp-changed';
import newer from 'gulp-newer';
/* Config */
import * as config from './../../config';
import { destPath, getMode } from './frontbox';
const argv = require('yargs').argv;

const passVariables = {
	data: {
		data: config,
		getMode: getMode,
		dev: !argv.prod,
	},
	filters: require('./pug-filters')(config)
};

export function htmlMain() {
	const element = config.path.pug.main;
	return src(`${element.files}`)
		.pipe(newer(`${destPath()}/${element.dest}`))
		.pipe(changed(`${destPath()}`))
		.pipe(pug(passVariables))
		.pipe(dest(`${destPath()}`))
		.pipe(browserSync.stream());
}
export function htmlInclude() {
	const element = config.path.pug.include;
	return src(`${element.files}`)
		.pipe(pug(passVariables))
		.pipe(dest(`${destPath()}`))
		.pipe(browserSync.stream());
}
export function htmlPartials() {
	const element = config.path.pug.partials;
	return src(`${element.files}`)
		.pipe(newer(`${destPath()}/${element.dest}`))
		.pipe(pug(passVariables))
		.pipe(dest(`${destPath()}/${element.dest}`))
		.pipe(browserSync.stream());
}
