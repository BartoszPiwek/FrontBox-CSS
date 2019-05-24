/* Import libs */
import { src, dest } from "gulp";
import copy from 'gulp-copy';
import { browserSync } from "./../gulpfile.babel";
import changed from 'gulp-changed';
/* Import config */
import * as config from "./../config";
import { getModeName } from './index';

export function copy_image() {

    const element = config.path.copy.image;

    return src( `${element.files}` )
        .pipe( changed( `public/${getModeName()}/${element.dest}` ) )
        .pipe( dest(`public/${getModeName()}/${element.dest}`) );
}
export function copy_fonts() {

    const element = config.path.copy.fonts;

    return src( `${element.files}`, {
        allowEmpty: true,
        })
        .pipe( changed( `public/${getModeName()}/${element.dest}`) )
        .pipe( dest( `public/${getModeName()}/${element.dest}`) );
}
export function copy_other() {

    const element = config.path.copy.other;

    return src( `${element.files}`, {
        allowEmpty: true,
        })
        .pipe( changed( `public/${getModeName()}/${element.dest}`) )
        .pipe( dest(`public/${getModeName()}/${element.dest}`) );
}
export function copy_video() {

    const element = config.path.copy.video;

    return src( `${element.files}`, {
        allowEmpty: true,
        })
        .pipe( changed( `public/${getModeName()}/${element.dest}`) )
        .pipe( dest(`public/${getModeName()}/${element.dest}`) );
}
export function copy_audio() {

    const element = config.path.copy.audio;

    return src( `${element.files}`, {
        allowEmpty: true,
        })
        .pipe( changed( `public/${getModeName()}/${element.dest}`) )
        .pipe( dest(`public/${getModeName()}/${element.dest}`) );
}