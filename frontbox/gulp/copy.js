/* Libs */
import { src, dest } from "gulp";
import newer from 'gulp-newer';
/* Config */
import * as config from "./../../config";
import { destPath } from './frontbox';

export function copyImage() {
	const element = config.path.copy.image;
	return src(`${element.files}`)
		.pipe(newer(`${destPath()}/${element.dest}`))
		.pipe(dest(`${destPath()}/${element.dest}`));
}
export function copyFonts() {
	const element = config.path.copy.fonts;
	return src(`${element.files}`)
		.pipe(newer(`${destPath()}/${element.dest}`))
		.pipe(dest(`${destPath()}/${element.dest}`));
}
export function copyOther() {
	const element = config.path.copy.other;
	return src(`${element.files}`)
		.pipe(newer(`${destPath()}/${element.dest}`))
		.pipe(dest(`${destPath()}/${element.dest}`));
}
export function copyVideo() {
	const element = config.path.copy.video;
	return src(`${element.files}`)
		.pipe(newer(`${destPath()}/${element.dest}`))
		.pipe(dest(`${destPath()}/${element.dest}`));
}
export function copyAudio() {
	const element = config.path.copy.audio;
	return src(`${element.files}`)
		.pipe(newer(`${destPath()}/${element.dest}`))
		.pipe(dest(`${destPath()}/${element.dest}`));
}
