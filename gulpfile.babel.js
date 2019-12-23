/*!************************************************************************
Framework:      FrontBox 1.3.0
Author:         Bartosz Piwek
Repository:     https://github.com/BartoszPiwek/FrontBox
************************************************************************!*/

/* Libs */
import { parallel, series, watch } from 'gulp';
/* Config */
import * as config from './config';
import { generateFavicon, minifySvg } from './frontbox/gulp/assets';
/* Import tasks */
import { cleanBegin, cleanEnd } from './frontbox/gulp/clean';
import { copyAudio, copyFonts, copyImage, copyOther, copyVideo } from './frontbox/gulp/copy';
import { docs_run, docs_server, docs_style, docs_watch } from './frontbox/gulp/docs';
import { destPath } from './frontbox/gulp/frontbox';
import { htmlInclude, htmlMain, htmlPartials } from './frontbox/gulp/html';
import { hashHtml } from './frontbox/gulp/prod';
import { scriptApp } from './frontbox/gulp/script';
import { styleBootstrap, styleMain, styleUtilities } from './frontbox/gulp/style';
export const browserSync = require('browser-sync').create();
const argv = require('yargs').argv;

function server(cb) {
	if (argv.server) {
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
	} else {
		cb();
	}
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

function prodTasks(...args) {
	if (argv.prod) {
		return series(hashHtml)(...args);
	} else {
		args[0]();
	}
}

/* Tasks */
exports.default = series(cleanBegin, minifySvg, parallel(copyImage, copyFonts, copyOther, copyVideo, copyAudio, scriptApp, htmlMain, htmlPartials, styleMain, styleBootstrap, styleUtilities), cleanEnd, prodTasks, server, watchFiles);
exports.favicon = series(generateFavicon);
exports.test = series(prodTasks);
exports.docs = series(docs_style, docs_run, docs_server, docs_watch);
