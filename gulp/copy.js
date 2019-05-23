/* Import libs */
import { src, dest } from "gulp";
import copy from 'gulp-copy';
import { browserSync } from "./../gulpfile.babel";

/* Import config */
import * as config from "./../config";

let DEV = true;

function getModeName() {
   if ( DEV ) {
       return 'dev';
   }
   else {
       return 'prod';
   }
}

export function copy_image() {

    const element = config.path.copy.image;

    return src( `${element.files}`, {
        allowEmpty: true,
        })
        .pipe( dest(`public/${getModeName()}/${element.dest}`) );
}
export function copy_fonts() {

    const element = config.path.copy.fonts;

    return src( `${element.files}`, {
        allowEmpty: true,
        })
        .pipe( dest(`public/${getModeName()}/${element.dest}`) );
}
export function copy_other() {

    const element = config.path.copy.other;

    return src( `${element.files}`, {
        allowEmpty: true,
        })
        .pipe( dest(`public/${getModeName()}/${element.dest}`) );
}
export function copy_video() {

    const element = config.path.copy.video;

    return src( `${element.files}`, {
        allowEmpty: true,
        })
        .pipe( dest(`public/${getModeName()}/${element.dest}`) );
}
export function copy_audio() {

    const element = config.path.copy.audio;

    return src( `${element.files}`, {
        allowEmpty: true,
        })
        .pipe( dest(`public/${getModeName()}/${element.dest}`) );
}