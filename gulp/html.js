/* Import libs */
import { src, dest } from "gulp";
import pug from 'gulp-pug';
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

export function html_main() {

    const element = config.path.pug.main;

    return src( `${element.files}`, {
        allowEmpty: true,
        })
        .pipe( pug({
            data: config,
            filters: require("./pug-filters")( config ),
        }))
        .pipe( dest(
            `public/${getModeName()}/`
        ))
        .pipe( browserSync.stream() );
}