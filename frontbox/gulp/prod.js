import { getModeName } from './frontbox';
import { src, dest } from 'gulp';
import image from 'gulp-image';
import sriHash from 'gulp-sri-hash';
import rcs from 'gulp-rcs';
import newer from 'gulp-newer';

export function hashHtml() {
	return src(`./public/${getModeName()}/*.html`)
		.pipe(sriHash())
		.pipe(dest(`./public/${getModeName()}`));
}

export function renameSelectors() {
	return src([`./public/${getModeName()}/**/*.css`, `./public/${getModeName()}/**/*.html`, `./public/${getModeName()}/**/*.js`])
		.pipe(rcs())
		.pipe(dest(`./public/${getModeName()}`));
}

export function imageOptymalization() {
	return src(`./public/${getModeName()}/images/**/*.{png,jpg,gif}`)
		.pipe(newer(`./public/${getModeName()}`))
		.pipe(
			image({
				pngquant: true,
				svgo: false,
				zopflipng: ['-y'],
				cache: false
			})
		)
		.pipe(dest(`./public/${getModeName()}`));
}