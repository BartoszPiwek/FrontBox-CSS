/*!************************************************************************
Framework:      FrontBox 1.1.0
Author:         Bartosz Piwek
Repository:     https://github.com/BartoszPiwek/FrontBox
**************************************************************************/

/*=========================================================================
|| Settings
=========================================================================*/
var 
SETTINGS    = require('./grunt-settings/settings'),
NEWER       = '';
TASKS       = {
    watch: null,
};

/*=========================================================================
|| Register Tasks
=========================================================================*/
module.exports = function(grunt) {

    /**
     * Register Main Tasks
     */

    grunt.registerTask('default', [
        'dev',
    ]);

    grunt.registerTask('dev', () => {

        SETTINGS.version = 'dev';
        NEWER = 'newer:';
        
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

    grunt.registerTask('prod', () => {

        SETTINGS.version = 'prod';
        
        grunt.task.run([

            'init_copy',
            'init_style',
            'init_html',
            'init_js',

            'run_begin',
            'run_copy',
            'run_style',
            'run_html',
            'run_js',

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

                var sourceMap = false;
                if ( SETTINGS.version === 'dev' ) {
                    sourceMap = true;
                }

                var modifyVars = {
                    pathToModulesDev: SETTINGS.pathToModulesDev,
                    pathToModulesProd: SETTINGS.pathToModulesProd,
                    isWordpress: SETTINGS.isWordpress,
                    version: SETTINGS.version,
                };

                if (SETTINGS.framework === 'frontbox') {

                    TASKS.less = {

                        grid: {
                            options: {
                                compress: false,
                                sourceMap: true,
                                sourceMapFilename: `public/${SETTINGS.version}/css/grid.css.map`,
                                sourceMapURL: 'grid.css.map',
                                sourceMapBasepath: '../',
                                sourceMapRootpath: '/',
                                modifyVars: modifyVars,
                                javascriptEnabled: true,
                            },
                            src: `src/style/grid.less`,
                            dest: `public/${SETTINGS.version}/css/grid.css`,
                        },
                
                        base: {
                            options: {
                                compress: false,
                                sourceMap: true,
                                sourceMapFilename: `public/${SETTINGS.version}/css/base.css.map`,
                                sourceMapURL: 'base.css.map',
                                sourceMapBasepath: '../',
                                sourceMapRootpath: '/',
                                modifyVars: modifyVars,
                                javascriptEnabled: true,
                            },
                            src: `src/style/base.less`,
                            dest: `public/${SETTINGS.version}/css/base.css`,
                        },
                
                        utilities: {
                            options: {
                                compress: false,
                                sourceMap: true,
                                sourceMapFilename: `public/${SETTINGS.version}/css/utilities.css.map`,
                                sourceMapURL: 'utilities.css.map',
                                sourceMapBasepath: '../',
                                sourceMapRootpath: '/',
                                modifyVars: modifyVars,
                                javascriptEnabled: true,
                            },
                            src: `src/style/utilities.less`,
                            dest: `public/${SETTINGS.version}/css/utilities.css`,
                        },
                
                        main: {
                            options: {
                                compress: false,
                                sourceMap: true,
                                sourceMapFilename: `public/${SETTINGS.version}/style.${SETTINGS.version}.css.map`,
                                sourceMapURL: `style.${SETTINGS.version}.css.map`,
                                sourceMapBasepath: '../',
                                sourceMapRootpath: '/',
                                modifyVars: modifyVars,
                                javascriptEnabled: true,
                            },
                            src: `src/style/style.less`,
                            dest: `public/${SETTINGS.version}/style.${SETTINGS.version}.css`,
                        },
                        
                    };
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

        grunt.loadNpmTasks( 'grunt-newer' );
        grunt.loadNpmTasks( 'grunt-contrib-watch' );
        
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
     * Register Run Tasks
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
            `${NEWER}copy:img`,
            `${NEWER}copy:fonts`,
            `${NEWER}copy:other`, 
        ]);  

        if (!SETTINGS.htmlPreprocessor) {
            grunt.task.run([
                `${NEWER}copy:html`,
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
                        'less:grid',
                        'less:base',
                        'less:utilities',
                        'less:main',
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
                    tasks: [`${NEWER}copy:img`],
                },
                fonts: {
                    files: ["src/fonts/*"],
                    tasks: [`${NEWER}copy:fonts`],
                },
                other: {
                    files: ["src/*"],
                    tasks: [`${NEWER}copy:other`],
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

                            style_base: {
                                files: [
                                    "src/style/base.less",
                                    "src/style/variables/**/*",
                                    "sec/style/frontbox/**/*"
                                ],
                                tasks: ["less:base"],
                            },
                            style_grid: {
                                files: [
                                    "src/style/grid.less",
                                    "src/style/frontbox/variables.less",
                                    "src/style/frontbox/functions.less",
                                    "src/style/frontbox/grid.less"
                                ],
                                tasks: ["less:grid"],
                            },
                            style_utilities: {
                                files: [
                                    "src/style/utilities.less",
                                    "src/style/utilities/*.less"
                                ],
                                tasks: ["less:utilities"],
                            },
                            style_main: {
                                files: [
                                    "src/style/style.less",
                                    "src/style/*/**.less",
                                ],
                                tasks: ["less:main"],
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
                            tasks: [`${NEWER}pug:init`],
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
                                tasks: [`${NEWER}pug:debug`],
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