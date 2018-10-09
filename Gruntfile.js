/*!******************************************************************
Framework:   FrontBox 1.0.4 (github.com/BartoszPiwek/FrontBox)
Author:      Bartosz Piwek
********************************************************************/
'use strict';
// var fs = require('fs');

//=========================================================================
// Settings

var SETTINGS = {};

// Main
SETTINGS.dev = require('./grunt-settings/settings');
SETTINGS.dev.version = 'dev';
SETTINGS.prod = require('./grunt-settings/settings');
SETTINGS.prod.version = 'prod';
// HTML
SETTINGS.htmlmin = require('./grunt-settings/tasks/html/htmlmin');
SETTINGS.prettify = require('./grunt-settings/tasks/html/prettify');
SETTINGS.autosvg = require('./grunt-settings/tasks/html/autosvg');
SETTINGS.processhtml = require('./grunt-settings/tasks/html/processhtml');
SETTINGS.hash_res = require('./grunt-settings/tasks/html/hash_res');
SETTINGS.pug = require('./grunt-settings/tasks/html/pug')(SETTINGS);
// JavaScript
SETTINGS.uglify = require('./grunt-settings/tasks/js/uglify');
SETTINGS.babel = require('./grunt-settings/tasks/js/babel');
SETTINGS.requirejs = require('./grunt-settings/tasks/js/requirejs');
SETTINGS.strip_code = require('./grunt-settings/tasks/js/strip_code');
// Graphic assets
SETTINGS.image = require('./grunt-settings/tasks/assets/image');
SETTINGS.sprite = require('./grunt-settings/tasks/assets/sprite');
SETTINGS.favicons = require('./grunt-settings/tasks/assets/favicons');
SETTINGS.svgmin = require('./grunt-settings/tasks/assets/svgmin');
// CSS
SETTINGS.less = require('./grunt-settings/tasks/css/less')(SETTINGS);
SETTINGS.postcss = require('./grunt-settings/tasks/css/postcss');
SETTINGS.uncss = require('./grunt-settings/tasks/css/uncss');
SETTINGS.critical = require('./grunt-settings/tasks/css/critical');
SETTINGS.autocolor = require('./grunt-settings/tasks/css/autocolor');
SETTINGS.cmq = require('./grunt-settings/tasks/css/cmq');
SETTINGS.cssstats = require('./grunt-settings/tasks/css/cssstats');
// Other
SETTINGS.copy = require('./grunt-settings/tasks/other/copy')(SETTINGS);
SETTINGS.connect = require('./grunt-settings/tasks/other/connect');
SETTINGS.clean = require('./grunt-settings/tasks/other/clean');
SETTINGS.watch = require('./grunt-settings/tasks/other/watch');

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

        htmlmin: SETTINGS.htmlmin, // Minify HTML files
        processhtml: SETTINGS.processhtml, // Process HTML
        pug: SETTINGS.pug, // Compile Pug templates
        prettify: SETTINGS.prettify, // Prettify HTML files
        autosvg: SETTINGS.autosvg, // Insert inline SVG
        hash_res: SETTINGS.hash_res, // Hash files

        /**
         * JavaScript
         */

        uglify: SETTINGS.uglify, // Uglify
        babel: SETTINGS.babel, // The compiler for next generation JavaScript
        requirejs: SETTINGS.requirejs, // JavaScript file and module loader
        strip_code: SETTINGS.strip_code, // Remove dev scripts
        browserify: {
            dev: {
                files: {
                    'public/dev/js/main.js': ['src/js/main.js']
                },
            },
            prod: {
                files: {
                    'public/prod/js/main.js': ['src/js/main.js']
                },
            }
        },

        /**
         * Graphic assets 
         */

        image: SETTINGS.image, // Compress png,jpg,gif
        sprite: SETTINGS.sprite, // Converting a set of images into a spritesheet
        favicons: SETTINGS.favicons, // Generate favicons
        svgmin: SETTINGS.svgmin, // Compress SVG

        /**
         * CSS tasks
         */

        less: SETTINGS.less, // LESS Compile
        postcss: SETTINGS.postcss, // Add vendor prefixes to CSS rules using values from Can I Use
        uncss: SETTINGS.uncss, // Delete unused css class, id
        critical: SETTINGS.critical, // Create critical css
        autocolor: SETTINGS.autocolor, // Colors to variables
        cmq: SETTINGS.cmq, // Combine matching media queries into one media query definition
        cssstats: SETTINGS.cssstats, // Create CSS statistics 

        /**
         * Other
         */
        
        connect: SETTINGS.connect, // VirtualHost
        copy: SETTINGS.copy, // Copy
        clean: SETTINGS.clean, // Remove files

        /**
         * Prod tasks
         */

        // DSS
        dss: {
            docs: {
                files: {
                    'docs/': 'src/less/**/*.less',
                },
                options: {
                    template_index: 'dss.handlebars',
                    template: 'template/',
                    include_empty_files: false,
                    parsers: {
                        // Finds @link in comment blocks
                        // link: function(i, line, block){
              
                        //   // Replace link with HTML wrapped version
                        //   var exp = /(b(https?|ftp|file)://[-A-Z])/g;
                        //   line.replace(exp, "<a href='$1'>$1</a>");
                        //   return line;
                        // }
                    }
                }
            }
        },

        /**
         * Watch
         */

        watch: SETTINGS.watch,

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
        'newer:copy:js',
        'newer:copy:html',
        'newer:copy:static_CSS',
        'newer:copy:fonts',
        'newer:copy:other', 
        // HTML
        'pug:dev',
        // CSS
        'less:dev_style_grid',
        'less:dev_style_base',
        'less:dev_style_utilities',
        'less:dev_style_main',
        // Assets
        'svgmin',
        'autosvg:dev',
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

        'copy:prod',

        'image',
        'svgmin',


        // HTML
        'pug:prod',

        // CSS
        // 'autoclass',
        'less:prod',
        'cmq',
        'uncss',
        'postcss:prod',
        'postcss:min',
        // Critical CSS
        //'critical',
        //'processhtml:critical',

        // JavaScript
        'prod:js',

        // General
        'hash_res',

        // HTML end
        'autosvg:prod',
        'htmlmin',

        // END
        'clean:end',
    ]);

    grunt.registerTask('prod:js', [
        'strip_code:prod',
        'browserify:prod',
        'babel',
        'uglify',
    ]);

    // Style tasks
    grunt.registerTask('colors', ['autocolor']);

    // Addon tasks
    grunt.registerTask('libs', ['copy:libs']);
    grunt.registerTask('favicon', ['favicons']);
    grunt.registerTask('doc', ['dss']);
    grunt.registerTask('begin', ['clean:begin']);

};
