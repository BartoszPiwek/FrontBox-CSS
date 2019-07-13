/*!************************************************************************
Framework:      FrontBox 1.2.0
Author:         Bartosz Piwek
Repository:     https://github.com/BartoszPiwek/FrontBox
************************************************************************!*/

/* Import libs */
import { watch, series, parallel } from 'gulp';
import { src, dest } from 'gulp';
import gulpif from 'gulp-if';
import through from 'through2';
const argv = require('yargs').argv;
export const browserSync = require('browser-sync').create();
/* Import config */
import * as config from './config';
import { getModeName } from './frontbox/gulp/frontbox';
export function server(done) {
	browserSync.init({
		open: config.browsersync.open,
		host: config.browsersync.host,
		proxy: config.browsersync.proxy,
		port: config.browsersync.port,
		server: {
			baseDir: `./public/${getModeName()}/`
		}
	});

	done();
}

/* Style */
import { style_main, style_bootstrap, style_utilities } from './frontbox/gulp/style';
export const buildStyle = parallel(style_main, style_bootstrap, style_utilities);
/* HTML */
import { html_main, html_include, html_partials } from './frontbox/gulp/html';
export const buildHTML = parallel(html_main, html_partials);
/* Script */
import { script_main } from './frontbox/gulp/script';
export const buildScript = parallel(script_main);
/* Copy */
import { copy_image, copy_fonts, copy_other, copy_video, copy_audio } from './frontbox/gulp/copy';
export const buildCopy = parallel(copy_image, copy_fonts, copy_other, copy_video, copy_audio);
/* Other */
import { svg, favicon, faviconAfter } from './frontbox/gulp/assets';
export const buildAssets = parallel(svg, series(favicon, faviconAfter));
/* Docs */
import { docs_style, docs_watch, docs_run, docs_server } from './frontbox/gulp/docs';
/* Prod */
import { hashHtml, renameSelectors, imageOptymalization } from './frontbox/gulp/prod';
import { pipe } from 'rxjs';
export const buildProd = series(renameSelectors, imageOptymalization, hashHtml);

/* Main watch function */
export function watchFiles() {
	/* Style */
	const styleObject = config.path.style;
	watch(styleObject.main.watch, style_main);
	watch(styleObject.bootstrap.watch, style_bootstrap);
	watch(styleObject.utilities.watch, style_utilities);

	/* HTML */
	const htmlObject = config.path.pug;
	watch(htmlObject.main.watch, html_main);
	watch(htmlObject.include.watch, html_include);
	watch(htmlObject.partials.watch, html_partials);

	/* Script */
	const scriptObject = config.path.script;
	watch(scriptObject.main.watch, script_main);

	// Favicon
	watch(config.path.assets.favicon.file)
		.on('change', () => {
			series(favicon, faviconAfter);
		});

	/* Copy */
	const copyObject = config.path.copy;
	watch(copyObject.image.watch, copy_image);
	watch(copyObject.fonts.watch, copy_fonts);
	watch(copyObject.other.watch, copy_other);
	watch(copyObject.video.watch, copy_video);
	watch(copyObject.audio.watch, copy_audio);
}

const build = series(buildCopy, buildAssets, parallel(buildScript, buildStyle, buildHTML), server, watchFiles);
const build_prod = series(buildCopy, buildAssets, parallel(buildScript, buildStyle, buildHTML), buildProd, server, watchFiles);
// const cleanBuild = series(clean, build_prod);

/* Tasks */
const del = require('del');
exports.default = series(

	((cb) => {
		if (argv.new) {
			del(config.projectDevFiles);
			cb();
		} else if (argv.clean) {
			del(`${destPath()}/`);
			cb();
		} else {
			cb();
		}
	})


	// return pipe(gulpif(argv.prod,
	// 	// console.log('aaa')
	// 	del(config.projectDevFiles)
	// ))
	// 	.pipe(null);

);

exports.style = series(buildStyle, server, watchFiles);
exports.script = series(buildScript, server, watchFiles);
exports.html = series(buildHTML, server, watchFiles);
exports.buildFavicon = series(favicon);
exports.docs = series(docs_style, docs_run, docs_server, docs_watch);
exports.test = series(imageOptymalization);
