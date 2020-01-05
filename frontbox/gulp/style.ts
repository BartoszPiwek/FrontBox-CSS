import * as autoprefixer from 'autoprefixer';
import * as cssnano from 'cssnano';
import { dest, src, watch } from 'gulp';
import * as header from 'gulp-header';
import * as gulpif from 'gulp-if';
import * as postcss from 'gulp-postcss';
import * as rename from 'gulp-rename';
import * as sass from 'gulp-sass';
import * as sassGlob from 'gulp-sass-glob';
import * as sourcemaps from 'gulp-sourcemaps';
import { Gulpclass, Task } from 'gulpclass/Decorators';
import * as uncss from 'uncss';
import { configStyle, configWebsite } from '../../config';
import { browserSync } from '../../gulpfile';
import { FrontboxTaskAbstract, getMode, IFrontboxInitTaks, websiteDestinationPath } from './frontbox';

const argv = require('yargs').argv;
const scssOptions = `
	$dev: ${!argv.prod};
	$infoOffJavascript: ${configWebsite.info.javascriptOff};
	$infoOldBrowser: ${configWebsite.info.usingOldBrowser};
`;

@Gulpclass()
export class FrontboxGulpStyle extends FrontboxTaskAbstract {
  private tasks = {};

  init(param?: IFrontboxInitTaks) {
    if (param) {
      Object.assign(this, param);
    }

    configStyle.map((element) => {
      this.tasks[element.name] = () => {
        return src(`${element.files}`, {
          allowEmpty: true
        })
          .pipe(gulpif(!argv.prod, sourcemaps.init({ loadMaps: true })))
          .pipe(header(scssOptions))
          .pipe(sassGlob())
          .pipe(sass())
          .pipe(
            gulpif(
              argv.prod,
              postcss([
                autoprefixer(),
                cssnano(),
                uncss.postcssPlugin({
                  html: [`${websiteDestinationPath}/*.html`],
                  ignoreSheets: [/fonts.googleapis/],
                  ignore: [/js_*/, /data-tabs-slider-active/, /\.active/]
                })
              ])
            )
          )
          .pipe(gulpif(this.includePrefix, rename({
            suffix: `.${getMode}`
          })))
          .pipe(gulpif(!argv.prod, sourcemaps.write(`./`, { sourceRoot: './' })))
          .pipe(dest(this.destinationPath ? this.destinationPath : `${websiteDestinationPath}/${element.dest}`))
          .pipe(browserSync.stream());
      };

      this.tasks[element.name]();
    })

    if (argv.watch) {
      this.watch();
    }
  }

  @Task()
  watch() {
    for (const element of configStyle) {
      const copy = () => {
        return this.tasks[element.name]();
      };

      (Object.assign(copy, { displayName: `style${element.name.charAt(0).toUpperCase() + element.name.slice(1)}` }));

      watch(
        element.watch,
        copy
      )
    }
  }
}