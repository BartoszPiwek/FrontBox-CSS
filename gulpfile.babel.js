import { src, dest, watch, series, parallel } from "gulp";
// import { less } from "gulp-less";
const browserSync = require('browser-sync').create();
var less = require('gulp-less');
var rename = require("gulp-rename");
var config = require("./config");

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

// function server() {
    browserSync.init({
        open: config.browsersync.open,
        host: config.browsersync.host,
        proxy: config.browsersync.proxy,
        port: config.browsersync.port,
        server: {
            baseDir: `./public/${getModeName()}/`
        }
    });
// }

function style() {
    return src( `src/style/style.less` )
        .pipe( less({
            modifyVars: config,
            plugins: [
                require('less-plugin-glob'),
            ]
        }))
        .pipe( rename({
            basename: 'style',
            suffix: `.${getModeName()}`,
        }))
        .pipe( dest(
            `public/${getModeName()}/`
        ))
        .pipe( browserSync.stream() );
}

function watchFiles() {
    watch( `src/style/*.less`, styles);
}
export { watchFiles as watch };

const dev = series( parallel( style ) );

/* Export */
exports.style = style;

exports.dev = dev;

exports.default = () => {
    dev();
    return watch('src/style/*.less', series('style'));
};