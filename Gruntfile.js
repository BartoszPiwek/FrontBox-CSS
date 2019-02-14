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

            'watch_copy',
            'watch_style',
            'watch_html',

            'run_begin',
            'run_copy',
            'run_style',
            'run_html',
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
                    dest: `${SETTINGS.pathToDev}/images/`,
                    filter: 'isFile'
                }],
            },

            fonts: {
                files: [{
                    expand: true,
                    cwd: 'src/fonts/',
                    src: '*',
                    dest: `${SETTINGS.pathToDev}/fonts/`,
                    filter: 'isFile'
                }],
            },

            other: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: '*',
                    dest: `${SETTINGS.pathToDev}/`,
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
                    dest: `${SETTINGS.pathToDev}/`,
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
                            dest: `${SETTINGS.pathToDev}/`,
                            ext: '.html'
                        }],
                        options: {
                            data: SETTINGS,
                            filters: require("./grunt-settings/tasks/html/pug-filters")(SETTINGS),
                        }
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

        require( 'grunt-contrib-watch' )(grunt);
        grunt.loadNpmTasks('grunt-newer');
        
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
                        'pug:init',
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
            
            TASKS.watch = {
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
            };
            
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

        if ( SETTINGS.version === 'dev' ) {
            
            switch (SETTINGS.htmlPreprocessor) {
                
                /* PUG config */
                case 'pug':

                    /* FrontBox LESS config */
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
                    }

                    else {
                        /* Non frontbox project */
                    }
                    
                    break;
                
                default:
                    break;
            }
        }

    });

};