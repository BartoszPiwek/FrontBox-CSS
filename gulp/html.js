/* Import libs */
import { src, dest } from "gulp";
import pug from 'gulp-pug';
import rename from "gulp-rename";
import { browserSync } from "./../gulpfile.babel";
import changed from 'gulp-changed';
const argv = require('yargs').argv;
/* Import config */
import * as config from "./../config";
import { getModeName } from './index';

export function html_main() {

    const element = config.path.pug.main;

    config.dev = !argv.prod;

    return src( `${element.files}`, {
        allowEmpty: true,
        })
        .pipe( changed( 
            `public/${getModeName()}` 
        ))
        .pipe( pug({
            data: {
                data: config,
                getModeName: getModeName,
            },
            filters: require("./pug-filters")( config ),
        }))
        .pipe( dest(
            `public/${getModeName()}`
        ))
        .pipe( browserSync.stream() );
}
export function html_include() {

    const element = config.path.pug.include;

    return src( `${element.files}`, {
        allowEmpty: true,
        })
        .pipe( pug({
            data: {
                data: config,
                getModeName: getModeName,
            },
            filters: require("./pug-filters")( config ),
        }))
        .pipe( dest(
            `public/${getModeName()}/`
        ))
        .pipe( browserSync.stream() );
}