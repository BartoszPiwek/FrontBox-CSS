/* Import libs */
import { src, dest } from "gulp";
import realFavicon from 'gulp-real-favicon';
import svgmin from 'gulp-svgmin';
import changed from 'gulp-changed';
/* Import config */
import * as config from "./../config";
import { getModeName } from './index';

export function favicon( done ) {

  return realFavicon.generateFavicon({
      masterPicture: 'src/images/favicon.png', //optimal size 300px
      dest: 'src/images/favicon',
      iconsPath: 'assets/favicons',
      markupFile: 'faviconData.json'
    }, function() {
      done();
    });

}
export function svg( done ) {

  const element = config.path.assets.svg;

  return src( element.files )
    .pipe( changed( `public/${getModeName()}/${element.dest}`) )
    .pipe( svgmin({
      plugins: [
        { removeViewBox: false },
        { removeUselessStrokeAndFill: true },
        { removeStyleElement: true },
        { removeAttrs: { attrs: ['xmlns', 'fill', 'stroke', 'width', 'height'] } },
      ]
    }))
    .pipe( dest( `${element.dest}` ) );

}
