/* Import libs */
import { src, dest } from "gulp";
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import rename from "gulp-rename";
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

export function script_main() {

    const element = config.path.script.main;

    return browserify({ entries: `${element.files}` }, {
        plugin: ['tsify'],
        browserifyOptions: {
            debug: DEV
        }})
        .bundle()
        .pipe( source('app.js') )
        .pipe( rename({
            suffix: `.${getModeName()}`,
        }))
        .pipe( dest(
            `public/${getModeName()}/scripts/`
        ))
        .pipe( browserSync.stream() );
}