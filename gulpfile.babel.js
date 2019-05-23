/*!************************************************************************
Framework:      FrontBox 1.2.0
Author:         Bartosz Piwek
Repository:     https://github.com/BartoszPiwek/FrontBox
************************************************************************!*/

/* Import libs */
import { src, dest, watch, series, parallel } from "gulp";
import rename from 'gulp-rename';
export const browserSync = require('browser-sync').create();
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

/* Style */
import { style_main, style_base, style_grid, style_utilities } from "./gulp/style";
export const buildStyle = parallel( style_main, style_base, style_grid, style_utilities );
/* HTML */
import { html_main } from "./gulp/html";
export const buildHTML = parallel( html_main );
/* Script */
import { script_main } from "./gulp/script";
export const buildScript = parallel( script_main );
/* Copy */
import { copy_image, copy_fonts, copy_other, copy_video, copy_audio } from "./gulp/copy";
export const buildCopy = parallel( copy_image, copy_fonts, copy_other, copy_video, copy_audio );

/* Main watch function */
export function watchFiles() {

    /* Style */
    const styleObject = config.path.style;
    watch( styleObject.main.watch, style_main );
    watch( styleObject.base.watch, style_base );
    watch( styleObject.grid.watch, style_grid );
    watch( styleObject.utilities.watch, style_utilities );

    /* HTML */
    const htmlObject = config.path.pug;
    watch( htmlObject.main.watch, html_main );

    /* Script */
    const scriptObject = config.path.script;
    watch( scriptObject.main.watch, script_main );

    /* Copy */
    const copyObject = config.path.copy;
    watch( copyObject.image.watch, copy_image );
    watch( copyObject.fonts.watch, copy_fonts );
    watch( copyObject.other.watch, copy_other );
    watch( copyObject.video.watch, copy_video );
    watch( copyObject.audio.watch, copy_audio );
}

const build = series( parallel( buildCopy, buildScript, buildStyle, buildHTML ), server, watchFiles );

/* Export */
exports.default = () => {
    build();
};
exports.style = series( buildStyle, server, watchFiles );
exports.script = series( buildScript, server, watchFiles );
exports.html = series( buildHTML, server, watchFiles );