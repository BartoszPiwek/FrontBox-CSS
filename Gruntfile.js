/*!******************************************************************
Framework:      FrontBox 1.0.4 (github.com/BartoszPiwek/FrontBox)
Author:         Bartosz Piwek
********************************************************************/

/**
 * Settings
 */
var SETTINGS = require('./grunt-settings/settings');

/**
 * Task Runner
 */
module.exports = function(grunt) {

    /* Load NPM Tasks */
    const addTask = ( taskName, tasks ) => {
        grunt.config.merge({
            [taskName]: tasks,
        });
    };

    /* NPM Tasks */
    const
    less = require('./grunt-settings/tasks/css/less')(SETTINGS);

    // require('jit-grunt')(grunt, {
    //     sprite: 'grunt-spritesmith',
    //     autocolor: 'node_modules/frontbox-grunt/tasks/autocolor.js',
    //     autoclass: 'node_modules/frontbox-grunt/tasks/autoclass.js',
    //     autosvg: 'node_modules/frontbox-grunt/tasks/autosvg.js',
    //     autometa: 'node_modules/frontbox-grunt/tasks/autometa.js',
    // });
    // require('connect-livereload')();
    // grunt.loadNpmTasks('grunt-w3c-html-validation');
    // grunt.loadNpmTasks('grunt-css-statistics');
    // grunt.loadNpmTasks('grunt-html');
    // grunt.loadNpmTasks('grunt-combine-media-queries');


    // grunt.initConfig({
    //     pkg: grunt.file.readJSON('package.json'),

    //     /**
    //      * HTML
    //      */

    //     // Minify HTML files
    //     htmlmin             : require(`./grunt-settings/tasks/html/htmlmin`), 
    //     // Compile Pug templates
    //     pug                 : require('./grunt-settings/tasks/html/pug')(SETTINGS), 
    //     // Prettify HTML files
    //     prettify            : require('./grunt-settings/tasks/html/prettify'),
    //     // Insert inline SVG
    //     autosvg             : require('./grunt-settings/tasks/html/autosvg'),
    //     // Hash files
    //     hash_res            : require('./grunt-settings/tasks/html/hash_res'),
    //     // W3C Markup Validation Service
    //     validation          : require('./grunt-settings/tasks/html/validation')(SETTINGS),

    //     /**
    //      * JavaScript
    //      */

    //     // JavaScript parser/compressor/beautifier
    //     uglify              : require('./grunt-settings/tasks/js/uglify')(SETTINGS), 
    //     // The compiler for next generation JavaScript
    //     babel               : require('./grunt-settings/tasks/js/babel')(SETTINGS), 
    //     // JavaScript file and module loader
    //     requirejs           : require('./grunt-settings/tasks/js/requirejs'), 
    //     // Remove dev scripts
    //     strip_code          : require('./grunt-settings/tasks/js/strip_code')(SETTINGS), 
    //     // organize your browser code and load modules installed by npm
    //     browserify          : require('./grunt-settings/tasks/js/browserify')(SETTINGS),

    //     /**
    //      * Graphic assets 
    //      */

    //     // Compress png,jpg,gif
    //     image               : require('./grunt-settings/tasks/assets/image')(SETTINGS),
    //     // Converting a set of images into a spritesheet
    //     sprite              : require('./grunt-settings/tasks/assets/sprite'),
    //     // Generate favicons
    //     realFavicon         : require('./grunt-settings/tasks/assets/realFavicon')(SETTINGS), 
    //     // Compress SVG
    //     svgmin              : require('./grunt-settings/tasks/assets/svgmin'), 

    //     /**
    //      * CSS tasks
    //      */

    //     /* LESS Compile */
    //     less                : require('./grunt-settings/tasks/css/less')(SETTINGS), 
    //     /* PostCSS is a tool for transforming styles with JS plugins */
    //     postcss             : require('./grunt-settings/tasks/css/postcss')(SETTINGS), 
    //     /* Remove unused CSS style */
    //     uncss               : require('./grunt-settings/tasks/css/uncss')(SETTINGS), 
    //     /* Critical extracts & inlines critical-path (above-the-fold) CSS from HTML */
    //     critical            : require('./grunt-settings/tasks/css/critical'), 
    //     /* Colors to variables */
    //     autocolor           : require('./grunt-settings/tasks/css/autocolor'),
    //     /* Parses stylesheets and returns an object with statistics */
    //     cssstats            : require('./grunt-settings/tasks/css/cssstats'), 

    //     /**
    //      * Other
    //      */

    //     // Start a static web server
    //     connect             : require('./grunt-settings/tasks/other/connect'), 
    //     // Copy files and folders
    //     copy                : require('./grunt-settings/tasks/other/copy')(SETTINGS),
    //     // Clear files and folders
    //     clean               : require('./grunt-settings/tasks/other/clean')(SETTINGS),
    //     // Grunt plugin for executing shell commands
    //     exec                : require('./grunt-settings/tasks/other/exec')(SETTINGS),
    //     // Run tasks whenever watched files change
    //     watch               : require('./grunt-settings/tasks/other/watch'),

    // });

    // /**
    //  * Register tasks
    //  */

    // grunt.registerTask('default', ['dev']);
    grunt.registerTask('default', () => {
        console.log(grunt.task.current.name);
    });

    grunt.registerTask('style', () => {

        require('grunt-contrib-less')(grunt);

        addTask( 'less', less );

        grunt.task.run([
            'less:dev_style_base',
            'less:dev_style_utilities',
            'less:dev_style_main',
        ]);

    });

    // // Create virtual host
    // grunt.registerTask('up', ['connect:prod:keepalive']);

    // // Generate DEV version
    // grunt.registerTask('dev', [
    //     // Copy
    //     'newer:copy:img',
    //     'newer:copy:html',
    //     'newer:copy:static_CSS',
    //     'newer:copy:fonts',
    //     'newer:copy:other', 
    //     // CSS
    //     'less:dev_style_grid',
    //     'less:dev_style_base',
    //     'less:dev_style_utilities',
    //     'less:dev_style_main',
    //     // HTML
    //     'pug:dev',
    //     'pug:debug',
    //     // Assets
    //     'svgmin',
    //     'autosvg:dev',
    //     'autosvg:debug',
    //     // JS
    //     'browserify:dev',
    //     // Other
    //     'connect:dev',
    //     'watch'
    // ]);

    // // Generate PROD version
    // grunt.registerTask('prod', [

    //     // Begin
    //     'clean:begin',

    //     // Images
    //     'favicon',
    //     // 'sprite',

    //     'copy:prod',

    //     'image',
    //     'svgmin',

    //     // HTML
    //     'pug:prod',

    //     // JavaScript
    //     'prod:js',

    //     // CSS
    //     'prod:style',
    //     // Critical CSS
    //     //'critical',
    //     //'processhtml:critical',



    //     // General
    //     // 'hash_res',

    //     // HTML end
    //     'autosvg:prod',
    //     // 'htmlmin',

    //     // END
    //     'clean:end',
    //     'validation',
    // ]);

    // grunt.registerTask('prod:js', [
    //     'browserify:prod',
    //     'strip_code:prod',
    //     'babel',
    //     'uglify',
    // ]);
    // grunt.registerTask('prod:style', [
    //     'less:prod_style_grid',
    //     'less:prod_style_base',
    //     'less:prod_style_utilities',
    //     'less:prod',
    //     // 'exec:get_wordpress_sitemap',
    //     'load_sitemap_json',
    //     // 'uncss',
    //     'postcss:prod',
    //     'postcss:min',
    // ]);

    // // Style tasks
    // grunt.registerTask('colors', ['autocolor']);

    // // Addon tasks
    // grunt.registerTask('libs', ['copy:libs']);
    // grunt.registerTask('favicon', ['realFavicon']);
    // grunt.registerTask('doc', ['dss']);
    // grunt.registerTask('start', ['clean:begin']);
    // grunt.registerTask('test', 'dev');

    // // Wordpress
    // grunt.registerTask('load_sitemap_json', () => {
    //     if (SETTINGS.isWordpress) {
    //         grunt.config.set(
    //             'uncss.prod.options.urls',
    //             grunt.file.readJSON('./sitemap.json')
    //         );
    //     }
    // });

};