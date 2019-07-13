/* Import libs */
import { src, dest } from 'gulp';
import favicons from 'gulp-favicons';
import newer from 'gulp-newer';
import svgmin from 'gulp-svgmin';
import rename from 'gulp-rename';
import clean from 'gulp-clean';
/* Import config */
import * as config from './../../config';
import { getModeName } from './frontbox';

/* Generate a multiplatform favicon with RealFaviconGenerator */
export function favicon(done) {
	const element = config.path.assets.favicon;

	return src(`${element.file}`)
		.pipe(newer(`${element.desc}`))
		.pipe(
			favicons({
				appName: 'My App',
				appShortName: 'App',
				appDescription: 'This is my application',
				developerName: 'Hayden Bleasel',
				developerURL: 'http://haydenbleasel.com/',
				background: '#020307',
				path: 'favicons/',
				url: 'http://haydenbleasel.com/',
				display: 'standalone',
				orientation: 'portrait',
				scope: '/',
				start_url: '/?homescreen=1',
				version: 1.0,
				logging: false,
				html: 'index.html',
				pipeHTML: true,
				replace: true,
			})
		)
		.pipe(dest(`${element.desc}`));
}
export function faviconAfter() {
	return src('./src/images/favicon/html_code.html')
		.pipe(
			clean(),
			{ force: true }
		)
		.pipe(
			rename({
				basename: 'favicon'
			})
		)
		.pipe(dest('./src/template/includes/'));
}

export function svg(done) {
	const element = config.path.assets.svg;

	return src(element.files)
		.pipe(changed(`public/${getModeName()}/${element.dest}`))
		.pipe(
			svgmin({
				plugins: [{ removeXMLProcInst: true }, { removeComments: true }, { removeDoctype: true }, { removeViewBox: false }, { removeUselessStrokeAndFill: true }, { removeStyleElement: true }, { removeAttrs: { attrs: ['xmlns', 'fill', 'stroke', 'width', 'height', 'id'] } }]
			})
		)
		.pipe(dest(`${element.dest}`));
}
