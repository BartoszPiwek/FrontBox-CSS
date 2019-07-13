/*!************************************************************************
Framework:      FrontBox 1.3.0
Author:         Bartosz Piwek
Repository:     https://github.com/BartoszPiwek/FrontBox
************************************************************************!*/

/* Libs */
import { series, parallel, watch } from 'gulp';
export const browserSync = require('browser-sync').create();
/* Config */
import * as config from './config';
import { destPath } from './frontbox/gulp/frontbox';
const argv = require('yargs').argv;
/* Import tasks */
import { cleanBegin, cleanEnd } from './frontbox/gulp/clean';
import { copyImage, copyFonts, copyOther, copyVideo, copyAudio } from './frontbox/gulp/copy';
import { generateFavicon, minifySvg } from './frontbox/gulp/assets';
import { scriptApp } from './frontbox/gulp/script';
import { styleMain, styleBootstrap, styleUtilities } from './frontbox/gulp/style';
import { htmlMain, htmlInclude, htmlPartials } from './frontbox/gulp/html';

function server(cb) {
	browserSync.init({
		open: config.browsersync.open,
		host: config.browsersync.host,
		proxy: config.browsersync.proxy,
		port: config.browsersync.port,
		server: {
			baseDir: `${destPath()}/`
		}
	});
	cb();
}

function watchFiles(cb) {
	if (argv.watch) {
		let watchFiles;

		watchFiles = config.path.style;
		watch(watchFiles.main.watch, styleMain);
		watch(watchFiles.bootstrap.watch, styleBootstrap);
		watch(watchFiles.utilities.watch, styleUtilities);

		watchFiles = config.path.pug;
		watch(watchFiles.main.watch, htmlMain);
		watch(watchFiles.include.watch, htmlInclude);
		watch(watchFiles.partials.watch, htmlPartials);

		watchFiles = config.path.script;
		watch(watchFiles.app.watch, scriptApp);

		watchFiles = config.path.copy;
		watch(watchFiles.image.watch, copyImage);
		watch(watchFiles.fonts.watch, copyFonts);
		watch(watchFiles.other.watch, copyOther);
		watch(watchFiles.video.watch, copyVideo);
		watch(watchFiles.audio.watch, copyAudio);

		cb();
	} else {
		cb();
	}
}

/* Tasks */
exports.default = series(
	cleanBegin,
	minifySvg,
	parallel(copyImage, copyFonts, copyOther, copyVideo, copyAudio),
	scriptApp,
	parallel(styleMain, styleBootstrap, styleUtilities),
	parallel(htmlMain, htmlPartials),
	cleanEnd,
	server,
	watchFiles
);
exports.favicon = series(generateFavicon);
exports.test = series(styleMain);
// // exports.docs = series(docs_style, docs_run, docs_server, docs_watch);
