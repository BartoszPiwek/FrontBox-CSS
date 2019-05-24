/*!************************************************************************
Framework:      FrontBox 1.2.0
Author:         Bartosz Piwek
Repository:     https://github.com/BartoszPiwek/FrontBox
************************************************************************!*/

/* Import libs */
import { watch, series, parallel, task } from "gulp";
const argv = require('yargs').argv;
export const browserSync = require('browser-sync').create();

/* Import config */
import * as config from './config';
import { getModeName } from "./gulp/index";

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

export function clean() {
  const del = require('del');
  return del(`public/${getModeName()}`);
}
export function begin() {
  const del = require('del');
  return del([
    `public`,
    `*.md`,
    `LICENSE`,
    `gitfiles`,
  ]);
}

/* Style */
import { style_main, style_base, style_grid, style_utilities } from "./gulp/style";
export const buildStyle = parallel( style_main, style_base, style_grid, style_utilities );
/* HTML */
import { html_main, html_include } from "./gulp/html";
export const buildHTML = parallel( html_main );
/* Script */
import { script_main } from "./gulp/script";
export const buildScript = parallel( script_main );
/* Copy */
import { copy_image, copy_fonts, copy_other, copy_video, copy_audio } from "./gulp/copy";
export const buildCopy = parallel( copy_image, copy_fonts, copy_other, copy_video, copy_audio );
/* Other */
import { svg } from "./gulp/assets";
export const buildAssets = parallel( svg );

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
    watch( htmlObject.include.watch, html_include );

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
const cleanBuild = series( clean, build );

/* Export */
exports.default = () => {
    if (argv.prod || argv.clean) {
        cleanBuild();
    }
    else {
        build();
    }
};

exports.style = series( buildStyle, server, watchFiles );
exports.script = series( buildScript, server, watchFiles );
exports.html = series( buildHTML, server, watchFiles );

/* Test task */
exports.test = () => {
    parallel( script_main );
};
