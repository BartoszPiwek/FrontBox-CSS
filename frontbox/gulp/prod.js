import { getModeName } from './index';
import { src, dest } from 'gulp';
import sriHash from 'gulp-sri-hash';

export function hashHtml() {
	return src(`./public/${getModeName()}/*.html`)
		.pipe(sriHash())
		.pipe(dest(`./public/${getModeName()}`));
}
