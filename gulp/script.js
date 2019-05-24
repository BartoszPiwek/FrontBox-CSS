/* Import libs */
import { src, dest } from "gulp";
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from "vinyl-buffer";
import gulpif from 'gulp-if';
import stripCode from 'gulp-strip-code';
const sourcemaps = require('gulp-sourcemaps');
import babel from 'gulp-babel';
import rename from "gulp-rename";
// import { sourcemaps } from "gulp-sourcemaps";
import { browserSync } from "./../gulpfile.babel";
const argv = require('yargs').argv;

/* Import config */
import * as config from "./../config";
import { getModeName } from './index';

export function script_main() {

    const element = config.path.script.main;

    return browserify({ entries: `${element.files}` }, {
            plugin: ['tsify'],
            debug: !argv.prod,
        })
        .bundle()
        .pipe( source('app.js') )
        .pipe( buffer() )
        .pipe( gulpif( argv.prod, 
            stripCode ({
                start_comment: "test-code",
                end_comment: "end-test-code"
            })
        ))
        .pipe( gulpif( argv.prod, 
            babel({
                presets: ['@babel/preset-env'],
                plugins: ['babel-plugin-loop-optimizer']
            })
        ))
        .pipe( gulpif( argv.prod, 
            sourcemaps.init({loadMaps: true})
        ))
        .pipe( rename({
            suffix: `.${getModeName()}`,
        }))
        .pipe( gulpif( argv.prod, 
            sourcemaps.write(`./`, {sourceRoot: './js'})
        ))
        .pipe( dest(
            `public/${getModeName()}/scripts/`
        ))
        .pipe( browserSync.stream() );
}