/*!******************************************************************
Framework:      FrontBox 1.0.4 (github.com/BartoszPiwek/FrontBox)
Author:         Bartosz Piwek
For:            static website
********************************************************************/
'use strict';

//=========================================================================
// Settings

// Variables
var SETTINGS = require('./grunt-settings/settings');

// Modules
var MODULES = {};

// HTML
MODULES.autosvg = require('./grunt-settings/tasks/html/autosvg');
MODULES.pug = require('./grunt-settings/tasks/html/pug')(SETTINGS);
// JavaScript
MODULES.uglify = require('./grunt-settings/tasks/js/uglify')(SETTINGS);
MODULES.babel = require('./grunt-settings/tasks/js/babel')(SETTINGS);
MODULES.requirejs = require('./grunt-settings/tasks/js/requirejs');
MODULES.strip_code = require('./grunt-settings/tasks/js/strip_code')(SETTINGS);
MODULES.browserify = require('./grunt-settings/tasks/js/browserify')(SETTINGS);
// Graphic assets
MODULES.image = require('./grunt-settings/tasks/assets/image');
MODULES.sprite = require('./grunt-settings/tasks/assets/sprite');
MODULES.realFavicon = require('./grunt-settings/tasks/assets/realFavicon')(SETTINGS);
MODULES.svgmin = require('./grunt-settings/tasks/assets/svgmin');
// CSS
MODULES.less = require('./grunt-settings/tasks/css/less')(SETTINGS);
MODULES.postcss = require('./grunt-settings/tasks/css/postcss')(SETTINGS);
MODULES.uncss = require('./grunt-settings/tasks/css/uncss')(SETTINGS);
MODULES.autocolor = require('./grunt-settings/tasks/css/autocolor');
MODULES.cmq = require('./grunt-settings/tasks/css/cmq')(SETTINGS);
MODULES.cssstats = require('./grunt-settings/tasks/css/cssstats');
// Other
MODULES.copy = require('./grunt-settings/tasks/other/copy')(SETTINGS);
MODULES.clean = require('./grunt-settings/tasks/other/clean')(SETTINGS);
MODULES.connect = require('./grunt-settings/tasks/other/connect');
MODULES.watch = require('./grunt-settings/tasks/other/watch');
MODULES.exec = require('./grunt-settings/tasks/other/exec')(SETTINGS);

// END Settings
//=========================================================================

module.exports = function(grunt) {

    require('jit-grunt')(grunt, {
        sprite: 'grunt-spritesmith',
        autocolor: 'node_modules/frontbox-grunt/tasks/autocolor.js',
        autoclass: 'node_modules/frontbox-grunt/tasks/autoclass.js',
        autosvg: 'node_modules/frontbox-grunt/tasks/autosvg.js',
        autometa: 'node_modules/frontbox-grunt/tasks/autometa.js',
    });
    require('connect-livereload')();
    require('time-grunt')(grunt);

    grunt.loadNpmTasks('grunt-css-statistics');
    grunt.loadNpmTasks('grunt-html');
    grunt.loadNpmTasks('grunt-combine-media-queries');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        /**
         * HTML
         */
        htmlmin: MODULES.htmlmin, // Minify HTML files
        processhtml: MODULES.processhtml, // Process HTML
        pug: MODULES.pug, // Compile Pug templates
        prettify: MODULES.prettify, // Prettify HTML files
        autosvg: MODULES.autosvg, // Insert inline SVG
        hash_res: MODULES.hash_res, // Hash files

        /**
         * JavaScript
         */
        uglify: MODULES.uglify, // Uglify
        babel: MODULES.babel, // The compiler for next generation JavaScript
        requirejs: MODULES.requirejs, // JavaScript file and module loader
        strip_code: MODULES.strip_code, // Remove dev scripts
        browserify: MODULES.browserify,

        /**
         * Graphic assets 
         */
        image: MODULES.image, // Compress png,jpg,gif
        sprite: MODULES.sprite, // Converting a set of images into a spritesheet
        realFavicon: MODULES.realFavicon, // Generate favicons
        svgmin: MODULES.svgmin, // Compress SVG

        /**
         * CSS tasks
         */
        less: MODULES.less, // LESS Compile
        postcss: MODULES.postcss, // Add vendor prefixes to CSS rules using values from Can I Use
        uncss: MODULES.uncss, // Delete unused css class, id
        critical: MODULES.critical, // Create critical css
        autocolor: MODULES.autocolor, // Colors to variables
        cmq: MODULES.cmq, // Combine matching media queries into one media query definition
        cssstats: MODULES.cssstats, // Create CSS statistics 

        /**
         * Other
         */
        connect: MODULES.connect, // VirtualHost
        copy: MODULES.copy, // Copy
        clean: MODULES.clean, // Remove files
        exec: MODULES.exec,

        /**
         * Watch
         */
        watch: MODULES.watch,

    });

    /**
     * Register tasks
     */

    grunt.registerTask('default', ['dev']);

    // Create virtual host
    grunt.registerTask('up', ['connect:prod:keepalive']);

    // Generate DEV version
    grunt.registerTask('dev', [
        // Copy
        'newer:copy:img',
        'newer:copy:html',
        'newer:copy:static_CSS',
        'newer:copy:fonts',
        'newer:copy:other', 
        // CSS
        'less:dev_style_grid',
        'less:dev_style_base',
        'less:dev_style_utilities',
        'less:dev_style_main',
        // HTML
        'pug:dev',
        'pug:debug',
        // Assets
        'svgmin',
        'autosvg:dev',
        'autosvg:debug',
        // JS
        'browserify:dev',
        // Other
        'connect:dev',
        'watch'
    ]);

    // Generate PROD version
    grunt.registerTask('prod', [

        // Begin
        'clean:begin',

        // Images
        'favicon',
        // 'sprite',

        'copy:prod',

        'image',
        'svgmin',

        // HTML
        'pug:prod',

        // JavaScript
        'prod:js',

        // CSS
        'prod:style',
        // Critical CSS
        //'critical',
        //'processhtml:critical',



        // General
        // 'hash_res',

        // HTML end
        'autosvg:prod',
        // 'htmlmin',

        // END
        'clean:end',
    ]);

    grunt.registerTask('prod:js', [
        'browserify:prod',
        'strip_code:prod',
        'babel',
        'uglify',
    ]);
    grunt.registerTask('prod:style', [
        'less:prod_style_grid',
        'less:prod_style_base',
        'less:prod_style_utilities',
        'less:prod',
        'load_sitemap_json',
        'uncss',
        'cmq',
        'postcss:prod',
        'postcss:min',
    ]);

    // Style tasks
    grunt.registerTask('colors', ['autocolor']);

    // Addon tasks
    grunt.registerTask('libs', ['copy:libs']);
    grunt.registerTask('favicon', ['realFavicon']);
    grunt.registerTask('doc', ['dss']);
    grunt.registerTask('start', ['clean:begin']);
    grunt.registerTask('test', 'dev');
    
    // Wordpress
    grunt.registerTask('load_sitemap_json', () => {
        if (SETTINGS.isWordpress) {
            grunt.config.set(
                'uncss.prod.options.urls',
                grunt.file.readJSON('./sitemap.json')
            );
        }
    });

};