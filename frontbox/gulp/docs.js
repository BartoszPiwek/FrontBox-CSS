/* Import libs */
import { dest, series, src, watch } from 'gulp';
import header from 'gulp-header';
import gulpif from 'gulp-if';
import sass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import sourcemaps from 'gulp-sourcemaps';
import kss from 'kss';
/* Import config */
import * as config from './../../config';
import { browserSync } from './../../gulpfile.babel';

const argv = require('yargs').argv;

export function docs_run(done) {
	kss(
		{
			source: [`src/style/`, `./../FrontBox-Plugins/`],
			builder: './frontbox/kss/',
			title: 'FrontBox-CSS Debug Style Guide',
			css: ['./kss-assets/style.css'],
			custom: ['emmet', 'mixin', 'mixin_usage', 'Icons', 'Arguments'],
			extend: './frontbox/kss/helpers'
		},
		browserSync.stream(),
		done()
	);
}

export function docs_watch() {
	watch(['src/style/**/*', `$./../FrontBox-Plugins/**/*.scss`, 'frontbox/kss/**/*.(scss|hbs)'], series(docs_style, docs_run));
}

export function docs_style() {
	config.dev = !argv.prod;

	return src(`frontbox/kss/style.scss`, {
		allowEmpty: true
	})
		.pipe(header(`$dev: ${config.dev};\n`))
		.pipe(gulpif(!argv.prod, sourcemaps.init({ loadMaps: true })))
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(gulpif(!argv.prod, sourcemaps.write(`./`, { sourceRoot: './' })))
		.pipe(dest(`frontbox/kss/kss-assets/`));
}

export function docs_server(done) {
	browserSync.init({
		open: config.browsersync.open,
		host: config.browsersync.host,
		proxy: config.browsersync.proxy,
		port: config.browsersync.port,
		server: {
			baseDir: `./styleguide/`
		}
	});

	done();
}
