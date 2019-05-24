/* Import libs */
import { src, dest } from "gulp";
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from "vinyl-buffer";
import gulpif from 'gulp-if';
import stripCode from 'gulp-strip-code';
import rename from "gulp-rename";
import { browserSync } from "./../gulpfile.babel";
const argv = require('yargs').argv;

/* Import config */
import * as config from "./../config";
import { getModeName } from './index';

export function script_main() {

    const element = config.path.script.main;

    return browserify({ entries: `${element.files}` }, {
        plugin: ['tsify'],
        browserifyOptions: {
            debug: config.dev
        }})
        .bundle()
        .pipe( source('app.js') )
        .pipe( buffer() )
        .pipe( rename({
            suffix: `.${getModeName()}`,
        }))
        .pipe( gulpif( argv.prod, stripCode ({
            start_comment: "test-code",
            end_comment: "end-test-code"
        })))
        .pipe( dest(
            `public/${getModeName()}/scripts/`
        ))
        .pipe( browserSync.stream() );
}