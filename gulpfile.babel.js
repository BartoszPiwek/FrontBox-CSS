/*!************************************************************************
Framework:      FrontBox 1.2.0
Author:         Bartosz Piwek
Repository:     https://github.com/BartoszPiwek/FrontBox
************************************************************************!*/

/* Import libs */
import { src, dest, watch, series, parallel } from "gulp";
import { pug } from 'gulp-pug';
import { rename } from 'gulp-rename';
import { browserify } from 'browserify';
import { source } from 'vinyl-source-stream';
const browserSync = require('browser-sync').create();
/* Import config */
import * as config from './config';

let DEV = true;

function getModeName() {
    if ( DEV ) {
        return 'dev';
    }
    else {
        return 'prod';
    }
}


export function server( done ) {
    browserSync.init({
        open: config.browsersync.open,
        host: config.browsersync.host,
        proxy: config.browsersync.proxy,
        port: config.browsersync.port,
        server: {
            baseDir: `./public/${getModeName()}/`
        }
    });

    done();
}


/* JavaScript */
export function javascript() {

    return browserify({ entries: `src/scripts/app.ts` }, {
            plugin: [
                'tsify'
            ],
            browserifyOptions: {
                debug: DEV
            }
        })
        .bundle()
        .pipe(source('app.js'))
        .pipe( rename({
            suffix: `.${getModeName()}`,
        }))
        .pipe( dest(
            `public/${getModeName()}/scripts/`
        ))
        .pipe( browserSync.stream() );

}

/* HTML */
export function html() {
    return src('src/template/*.pug')
        .pipe( pug({
            data: config,
            filters: require("./settings/tasks/html/pug-filters")( config ),
        }))
        .pipe( dest(
            `public/${getModeName()}/`
        ))
        .pipe( browserSync.stream() );
}

/* Style */
import * as styleTasks from "./gulp/style";
export const buildStyle = parallel( styleTasks.main, styleTasks.base, styleTasks.grid, styleTasks.utilities );

/* Main watch function */
export function watchFiles() {

    /* Style */
    const styleObject = config.path.style;
    watch( styleObject.main.watch, styleTasks.main );
    watch( styleObject.base.watch, styleTasks.base );
    watch( styleObject.grid.watch, styleTasks.grid );
    watch( styleObject.utilities.watch, styleTasks.utilities );

    /* HTML */
    const htmlObject = config.path.pug;
    watch( htmlObject.base.watch, html );

    /* Scripts */
}


const build = series( parallel( javascript, buildStyle, html ), server, watchFiles );

/* Export */
export { browserSync };
exports.default = () => {
    build();
};
exports.style = series( buildStyle, server, watchFiles );