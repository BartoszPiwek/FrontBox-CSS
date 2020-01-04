// import { destPath } from './frontbox';
// import { src, dest } from 'gulp';
// import image from 'gulp-image';
// import hash from 'gulp-static-hash';
// import rcs from 'gulp-rcs';
// import newer from 'gulp-newer';

// export function hashHtml() {
// 	return src(`${destPath()}/*.html`)
// 		.pipe(
// 			hash({
// 				asset: `${destPath()}`
// 			})
// 		)
// 		.pipe(dest(`${destPath()}`));
// }

// export function renameSelectors() {
// 	return src([`${destPath()}/**/*.css`, `${destPath()}/**/*.html`, `${destPath()}/**/*.js`])
// 		.pipe(rcs())
// 		.pipe(dest(`${destPath()}`));
// }

// export function imageOptymalization() {
// 	return src(`${destPath()}/images/**/*.{png,jpg,gif}`)
// 		.pipe(newer(`${destPath()}`))
// 		.pipe(
// 			image({
// 				pngquant: true,
// 				svgo: false,
// 				zopflipng: ['-y'],
// 				cache: false
// 			})
// 		)
// 		.pipe(dest(`${destPath()}`));
// }
