/*!******************************************************************
Framework:      FrontBox 1.1.0 (github.com/BartoszPiwek/FrontBox)
Author:         Bartosz Piwek
********************************************************************/

/*=========================================================================
|| Settings
=========================================================================*/
var 
SETTINGS    = require('./grunt-settings/settings'),
TASKS       = {
    watch: null,
};

/*=========================================================================
|| Register Tasks
=========================================================================*/
module.exports = function(grunt) {

    grunt.registerTask('default', [
        'run:dev',
    ]);
    grunt.registerTask('run:dev', () => {

        SETTINGS.version = 'dev';
        
        grunt.task.run([

            'init_watch',
            'init_server',
            'init_copy',
            'init_style',
            'init_html',
            'init_js',

            'watch_copy',
            'watch_style',
            'watch_html',
            'watch_js',

            'run_begin',
            'run_copy',
            'run_style',
            'run_html',
            'run_js',
            'run_server',
            'run_watch',

        ]);

    });

    /**
     * Register Init Tasks
     */

    /* Copy */
    grunt.registerTask('init_copy', () => {

        grunt.loadNpmTasks('grunt-contrib-copy');

        TASKS.copy = {

            img: {
                files: [{
                    expand: true,
                    cwd: 'src/images/',
                    src: ['**/*'],
                    dest: `public/${SETTINGS.version}/images/`,
                    filter: 'isFile'
                }],
            },

            fonts: {
                files: [{
                    expand: true,
                    cwd: 'src/fonts/',
                    src: '*',
                    dest: `public/${SETTINGS.version}/fonts/`,
                    filter: 'isFile'
                }],
            },

            other: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: '*',
                    dest: `public/${SETTINGS.version}/`,
                    filter: 'isFile'
                }],
            },

        };

        /* None HTML Preprocessor */
        if (!SETTINGS.htmlPreprocessor) {
            TASKS.copy.html = {
                files: [{
                    expand: true,
                    cwd: 'src/template/',
                    src: ['**/*.html'],
                    dest: `public/${SETTINGS.version}/`,
                    filter: 'isFile'
                }]
            };
        }

    });

    /* Style */
    grunt.registerTask('init_style', () => {

        switch (SETTINGS.cssPreprocessor) {
            case 'less':

                grunt.loadNpmTasks('grunt-contrib-less');

                if (SETTINGS.framework === 'frontbox') {
                    if (SETTINGS.version === 'dev') {
                        TASKS.less = require('./grunt-settings/tasks/css/less.dev')(SETTINGS);
                    }              
                    else {
                        // TASKS.less = require('./grunt-settings/tasks/css/less.dev')(SETTINGS);
                    }
                }
                else {
                    
                }
                
                break;
        
            default:
                break;
        }

    });

    /* HTML */
    grunt.registerTask('init_html', () => {

        TASKS.pug = {};

        switch (SETTINGS.htmlPreprocessor) {
            case 'pug':

                grunt.loadNpmTasks('grunt-contrib-pug');

                if (SETTINGS.framework === 'frontbox') {
                    TASKS.pug.init = {
                        files: [{
                            expand: true,
                            cwd: 'src/template/',
                            src: ['**/*.pug', '!includes/**'],
                            dest: `public/${SETTINGS.version}/`,
                            ext: '.html'
                        }],
                        options: {
                            data: SETTINGS,
                            filters: require("./grunt-settings/tasks/html/pug-filters")(SETTINGS),
                        }
                    };

                    /* Debug Framework */
                    if (SETTINGS.debug) {
                        TASKS.pug.debug = {
                            files: [{
                                expand: true,
                                cwd: 'src/debug/',
                                src: ['**/*.pug'],
                                dest: `public/${SETTINGS.version}/debug/`,
                                ext: '.html'
                            }],
                            options: {
                                data: SETTINGS,
                                filters: require("./grunt-settings/tasks/html/pug-filters")(SETTINGS),
                            }
                        };
                    }

                }

                else {
                    
                }
                
                break;
        
            default:
                break;
        }

    });

    /* JavaScript */
    grunt.registerTask('init_js', () => {

        TASKS.browserify = {};

        switch (SETTINGS.jsPreprocessor) {
            case 'browserify':

                grunt.loadNpmTasks('grunt-browserify');

                if (SETTINGS.framework === 'frontbox') {
                    TASKS.browserify.init = {
                        src: `src/js/app.js`,
                        dest: `public/${SETTINGS.version}/js/app.${SETTINGS.version}.js`,
                    };

                }

                else {
                    
                }
                
                break;
        
            default:
                break;
        }

    });

    /* Watch */
    grunt.registerTask('init_watch', () => {

        grunt.loadNpmTasks( 'grunt-contrib-watch' );
        grunt.loadNpmTasks( 'grunt-newer' );
        
        TASKS.watch = require('./grunt-settings/tasks/other/watch');

    });

    /* Server */
    grunt.registerTask('init_server', () => {

        require('connect-livereload')();
        require('grunt-contrib-connect')(grunt);

        TASKS.connect = {
            init: {
                options: {
                    port: 8181,
                    base: `${SETTINGS.pathToPublic}/${SETTINGS.version}`,
                    hostname: 'localhost',
                    livereload: true,
                    open: {
                        opn: true,
                        target: 'http://localhost:8181',
                        appName: 'chrome',
                    }
                }
            },
        };

    });

    /**
     * Register Main Tasks
     */

    /* Begin */
    grunt.registerTask('run_begin', () => {

        if (SETTINGS.debug) {
            console.log(TASKS);
        }

        grunt.initConfig(TASKS);

    });

    /* Copy */
    grunt.registerTask('run_copy', () => {

        grunt.task.run([
            'newer:copy:img',
            'newer:copy:fonts',
            'newer:copy:other', 
        ]);  

        if (!SETTINGS.htmlPreprocessor) {
            grunt.task.run([
                'newer:copy:html',
            ]);  
        }

    });

    /* Style */
    grunt.registerTask('run_style', () => {

        switch (SETTINGS.cssPreprocessor) {
            case 'less':

                /* FrontBox LESS config */
                if (SETTINGS.framework === 'frontbox') {

                    grunt.task.run([
                        'less:dev_style_grid',
                        'less:dev_style_base',
                        'less:dev_style_utilities',
                        'less:dev_style_main',
                    ]);  

                }
                else {
                    /* Non frontbox project */
                }
                
                break;
            
            /* SASS config */
            case 'sass':  
            
            break;
            
            default:
                break;
        }

    });

    /* HTML */
    grunt.registerTask('run_html', () => {

        switch (SETTINGS.htmlPreprocessor) {

            /* PUG config */
            case 'pug':

                /* FrontBox LESS config */
                if (SETTINGS.framework === 'frontbox') {

                    grunt.task.run([
                        'pug',
                    ]);  

                }
                else {
                    /* Non frontbox project */
                }
                
                break;

            default:
                break;
        }

    });

    /* JavaScript */
    grunt.registerTask('run_js', () => {

        switch (SETTINGS.jsPreprocessor) {

            /* PUG config */
            case 'browserify':

                /* FrontBox LESS config */
                if (SETTINGS.framework === 'frontbox') {

                    grunt.task.run([
                        'browserify',
                    ]);  

                }
                else {
                    /* Non frontbox project */
                }
                
                break;

            default:
                break;
        }

    });

    /* Watch */
    grunt.registerTask('run_watch', () => {

        grunt.task.run([
            'watch',
        ]);

    });

    /* Server */
    grunt.registerTask('run_server', () => {

        grunt.task.run([
            'connect:init',
        ]);

    });

    /**
     * Register Watch Tasks
     */

    /* Copy */
    grunt.registerTask('watch_copy', () => {

        if ( SETTINGS.version === 'dev' ) {
            
            TASKS.watch = Object.assign({}, TASKS.watch, {
                img: {
                    files: ["src/images/**/*"],
                    tasks: ["newer:copy:img"],
                },
                fonts: {
                    files: ["src/fonts/*"],
                    tasks: ["newer:copy:fonts"],
                },
                other: {
                    files: ["src/*"],
                    tasks: ["newer:copy:other"],
                },
            });
            
        }

    });

    /* Style */
    grunt.registerTask('watch_style', () => {

        if ( SETTINGS.version === 'dev' ) {
            
            switch (SETTINGS.cssPreprocessor) {
                
                /* LESS config */
                case 'less':

                    /* FrontBox LESS config */
                    if (SETTINGS.framework === 'frontbox') {

                        TASKS.watch = Object.assign({}, TASKS.watch, {

                            dev_style_base: {
                                files: [
                                    "src/less/base.less",
                                    "src/less/variables/**/*.less",
                                    "sec/less/frontbox/**/*.less"
                                ],
                                tasks: ["less:dev_style_base"],
                            },
                            dev_style_grid: {
                                files: [
                                    "src/less/grid.less",
                                    "src/less/frontbox/variables.less",
                                    "src/less/frontbox/functions.less",
                                    "src/less/frontbox/grid.less"
                                ],
                                tasks: ["less:dev_style_grid"],
                            },
                            dev_style_utilities: {
                                files: [
                                    "src/less/utilities.less",
                                    "src/less/utilities/*.less"
                                ],
                                tasks: ["less:dev_style_utilities"],
                            },
                            dev_style_main: {
                                files: [
                                    "src/less/style.less",
                                    "src/less/*/**.less",
                                ],
                                tasks: ["less:dev_style_main"],
                            },

                        });

                    }

                    else {
                        /* Non frontbox project */
                    }
                    
                    break;
                
                /* SASS config */
                case 'sass':
                    break;
                
                default:
                    break;
            }
        }

    });

    /* HTML */
    grunt.registerTask('watch_html', () => {

        switch (SETTINGS.htmlPreprocessor) {
            
            /* PUG config */
            case 'pug':

                /* FrontBox config */
                if (SETTINGS.framework === 'frontbox') {

                    TASKS.watch = Object.assign({}, TASKS.watch, {

                        pug: {
                            files: ['src/template/*.pug'],
                            tasks: ['newer:pug:init',],
                        },
                        pug_includes: {
                            files: ['src/template/includes/*.pug'],
                            tasks: ['pug:init',],
                        },

                    });

                    if (SETTINGS.debug) {
                        TASKS.watch = Object.assign({}, TASKS.watch, {
                            
                            pug_debug: {
                                files: ["./src/debug/**/*.pug"],
                                tasks: ["newer:pug:debug"],
                            },

                        });
                    }

                }

                else {
                    /* Non frontbox project */
                }
                
                break;
            
            default:
                break;
        }

    });

    /* JavaScript */
    grunt.registerTask('watch_js', () => {
            
        switch (SETTINGS.jsPreprocessor) {
                
            /* Browserify config */
            case 'browserify':

                /* FrontBox config */
                if (SETTINGS.framework === 'frontbox') {

                    TASKS.watch = Object.assign({}, TASKS.watch, {

                        browserify: {
                            files: ["src/js/**/*.js"],
                            tasks: ["browserify"],
                        }

                    });

                }

                else {
                    /* Non frontbox project */
                }
                
                break;
            
            default:
                break;

        }

    });

};