import { src, dest, watch, series, parallel, task } from "gulp";
// import { less } from "gulp-less";
const browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
var rename = require("gulp-rename");
var config = require("./config");
var typescript = require('gulp-typescript');
var browserify = require("browserify");
var source = require('vinyl-source-stream');

var tsify = require('tsify');

// var babel = require('gulp-babel');
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var cleanCSS = require('gulp-clean-css');
// var del = require('del');

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

import { styleMain, styleBase, styleGrid, styleUtilities } from "./gulp/style";
export const buildStyle = parallel( styleMain, styleBase, styleGrid, styleUtilities );
// export { styleMain, styleBase };

export function watchFiles() {

    const styleObject = config.path.style;
    
    watch( styleObject.main.watch, styleMain );
    watch( styleObject.base.watch, styleBase );
    watch( styleObject.grid.watch, styleGrid );
    watch( styleObject.utilities.watch, styleUtilities );

    // /* HTML */
    const htmlObject = config.path.pug;
    watch( htmlObject.base.watch, html );
}


const build = series( parallel( javascript, buildStyle, html ), server, watchFiles );

export { browserSync };

/* Export */
exports.default = () => {
    build();
};