import * as config from "./../config";
import { src, dest } from "gulp";
import { browserSync } from "./../gulpfile.babel";
var less = require('gulp-less');
var rename = require("gulp-rename");

let DEV = true;

function getModeName() {
   if ( DEV ) {
       return 'dev';
   }
   else {
       return 'prod';
   }
}

export function styleMain() {

      const element = config.path.style.main;

      return src( `${element.files}`, {
            allowEmpty: true,
         })
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
               `public/${getModeName()}/${element.dest}`
         ))
         .pipe( browserSync.stream() );
}

export function styleBase() {

      const element = config.path.style.base;
      

      return src( `${element.files}`, {
            allowEmpty: true,
         })
         .pipe( less({
               modifyVars: config,
               plugins: [
                  require('less-plugin-glob'),
               ]
         }))
         .pipe( rename({
               basename: 'base',
               suffix: `.${getModeName()}`,
         }))
         .pipe( dest(
               `public/${getModeName()}/${element.dest}`
         ))
         .pipe( browserSync.stream() );
}

export function styleGrid() {

      const element = config.path.style.grid;
      

      return src( `${element.files}`, {
            allowEmpty: true,
         })
         .pipe( less({
               modifyVars: config,
               plugins: [
                  require('less-plugin-glob'),
               ]
         }))
         .pipe( rename({
               basename: 'grid',
               suffix: `.${getModeName()}`,
         }))
         .pipe( dest(
               `public/${getModeName()}/${element.dest}`
         ))
         .pipe( browserSync.stream() );
}

export function styleUtilities() {

      const element = config.path.style.utilities;
      

      return src( `${element.files}`, {
            allowEmpty: true,
         })
         .pipe( less({
               modifyVars: config,
               plugins: [
                  require('less-plugin-glob'),
               ]
         }))
         .pipe( rename({
               basename: 'utilities',
               suffix: `.${getModeName()}`,
         }))
         .pipe( dest(
               `public/${getModeName()}/${element.dest}`
         ))
         .pipe( browserSync.stream() );
}