/*!************************************************************************
Framework:      FrontBox 1.1.0
Author:         Bartosz Piwek
Repository:     https://github.com/BartoszPiwek/FrontBox
************************************************************************!*/

/*=========================================================================
|| Settings
=========================================================================*/
var 
SETTINGS    = require('./settings/settings'),
NEWER       = '',
KEEPALIVE   = false,
TASKS       = {
    watch: null,
},
DEV         = true;

/* Style run tasks */
var RUN = {
    STYLE   : [],
    JS      : [],
    HTML    : [],
    END     : [],
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
        DEV = true;
        
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

            'run_end',

        ]);

    });

    /**
     * Register Other Tasks
     */

    grunt.registerTask('html', () => {

        SETTINGS.version = 'dev';
        NEWER = 'newer:';
        
        grunt.task.run([

            'init_watch',
            'init_server',
            'init_html',

            'watch_html',

            'run_begin',
            'run_html',
            'run_server',
            'run_watch',

        ]);

    });

    grunt.registerTask('favicon', () => {

        grunt.loadNpmTasks('grunt-real-favicon');

        TASKS.realFavicon = {
            init: {
                options: {
                    iconsPath: `${SETTINGS.prefixFaviconHTML}`,
                    html: [`${SETTINGS.pathToFavicon}`],
                    design: {
                      ios: {
                        pictureAspect: 'noChange'
                      },
                      desktopBrowser: {},
                      windows: {
                        pictureAspect: 'noChange',
                        backgroundColor: '#da532c',
                        onConflict: 'override'
                      },
                      androidChrome: {
                        pictureAspect: 'noChange',
                        themeColor: '#ffffff',
                        manifest: {
                          name: 'example.com',
                          display: 'browser',
                          orientation: 'notSet',
                          onConflict: 'override'
                        }
                      },
                      safariPinnedTab: {
                        pictureAspect: 'blackAndWhite',
                        threshold: 73.4375,
                        themeColor: '#5bbad5'
                      }
                    },
                    settings: {
                      compression: 1,
                      scalingAlgorithm: 'Mitchell',
                      errorOnImageTooSmall: false
                    },
                },
                src: './src/images/favicon.png',
                dest: './src/images/favicon'
            }
        };
        
        grunt.task.run([
            'run_begin',
            'realFavicon',
        ]);

    });

    grunt.registerTask('up', () => {
        SETTINGS.version = 'prod';
        KEEPALIVE = true;
        
        grunt.task.run([
            'init_server',
            'run_begin',
            'run_server',
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

            video: {
                files: [{
                    expand: true,
                    cwd: 'src/video/',
                    src: '*',
                    dest: `public/${SETTINGS.version}/video/`,
                    filter: 'isFile'
                }],
            },

            audio: {
                files: [{
                    expand: true,
                    cwd: 'src/audio/',
                    src: '*',
                    dest: `public/${SETTINGS.version}/audio/`,
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

        /* No HTML Preprocessor */
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

                /* Load tasks */
                grunt.loadNpmTasks('grunt-contrib-less');

                var modifyVars = SETTINGS;

                if (SETTINGS.framework === 'frontbox') {

                    TASKS.less = {
                
                        main: {
                            options: {
                                compress: false,
                                sourceMap: DEV,
                                sourceMapFilename: `public/${SETTINGS.version}/style.${SETTINGS.version}.css.map`,
                                sourceMapURL: `style.${SETTINGS.version}.css.map`,
                                sourceMapBasepath: '../',
                                sourceMapRootpath: '/',
                                modifyVars: modifyVars,
                                javascriptEnabled: true,
                                plugins: [require('less-plugin-glob')],
                            },
                            src: `src/style/style.less`,
                            dest: `public/${SETTINGS.version}/style.${SETTINGS.version}.css`,
                        },
                        
                    };

                    /* Development version */
                    if ( SETTINGS.version === 'dev' ) {

                        TASKS.less = Object.assign( TASKS.less, {
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
                        });

                    }

                    RUN.STYLE = RUN.STYLE.concat([
                        'less',
                    ]);

                }

                /* No FrontBox-CSS project */
                else {
                    TASKS.less = {
                        main: {
                            options: {
                                compress: false,
                                sourceMap: sourceMap,
                                sourceMapFilename: `public/${SETTINGS.version}/style.${SETTINGS.version}.css.map`,
                                sourceMapURL: `style.${SETTINGS.version}.css.map`,
                                sourceMapBasepath: '../',
                                sourceMapRootpath: '/',
                                modifyVars: modifyVars,
                                javascriptEnabled: true,
                                plugins: [require('less-plugin-glob')],
                            },
                            src: `src/style/style.less`,
                            dest: `public/${SETTINGS.version}/style.${SETTINGS.version}.css`,
                        },
                        
                    };
                    
                    /* Style run tasks */
                    
                    RUN.STYLE = RUN.STYLE.concat([
                        'less:main',
                    ]);
                }


                
                break;
        
            default:
                break;
        }

        /* Production mode configuration */
        if (SETTINGS.version === 'prod') {

            grunt.loadNpmTasks('grunt-postcss');

            let 
            postCSS = { 
                init: { 
                    options: { processors: [], map: false },
                    src: `public/${SETTINGS.version}/style.${SETTINGS.version}.css`,
                },
            },
            initProcessors = [
                /**
                 * Parse CSS and add vendor prefixes to rules by Can I Use
                 * https://github.com/postcss/autoprefixer
                 */
                require('autoprefixer')({
                    browsers: ['last 2 versions', 'ie >= 8', 'Android >= 4.0.0', 'Safari >= 7.1', 'iOS >= 6']
                }),
                /**
                 * Convert pixel units to rem (root em) units
                 * https://github.com/cuth/postcss-pxtorem
                 */
                require('postcss-pxtorem')({
                    rootValue: 16,
                    unitPrecision: 5,
                    propWhiteList: [],
                    selectorBlackList: [],
                    replace: true,
                    mediaQuery: false,
                    minPixelValue: 0
                }),
            ];

            /**
             * Pack same CSS media query rules into one
             * https://github.com/hail2u/node-css-mqpacker
             */
            if ( SETTINGS.cssTasks.includes('css-mqpacker') ) {
                initProcessors.push(
                    require("css-mqpacker")
                );
            }

            RUN.STYLE = RUN.STYLE.concat([
                'postcss:init'
            ]);

            /**
             * Takes your nicely formatted CSS and runs it through many focused optimisations, 
             * to ensure that the final result is as small as possible for a production 
             * environment.
             * https://github.com/cssnano/cssnano
             */
            postCSS.min = {
                options: {
                    processors: [
                        require('cssnano')({
                            zindex: false,
                            autoprefixer: false
                        })
                    ],
                    map: false
                },
                src: `public/${SETTINGS.version}/style.${SETTINGS.version}.css`,
            };

            RUN.END = RUN.END.concat([
                'postcss:min'
            ]);

            /* Concat configuration */
            postCSS.init.options.processors = initProcessors;
            TASKS.postcss = postCSS;

        }

    });

    /* HTML */
    grunt.registerTask('init_html', () => {

        switch (SETTINGS.htmlPreprocessor) {
            case 'pug':
            
                TASKS.pug = {};

                grunt.loadNpmTasks('grunt-contrib-pug');

                // if ( SETTINGS.framework === 'frontbox' ) {
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
                            filters: require("./settings/tasks/html/pug-filters")(SETTINGS),
                        }
                    };

                    /* Debug Framework */
                    if ( SETTINGS.debug ) {
                        TASKS.pug.debug = {
                            files: [{
                                expand: true,
                                cwd: 'src/debug/',
                                src: ['**/*.pug', '!includes/**'],
                                dest: `public/${SETTINGS.version}/debug/`,
                                ext: '.html'
                            }],
                            options: {
                                data: SETTINGS,
                                filters: require("./settings/tasks/html/pug-filters")(SETTINGS),
                            }
                        };

                    }

                // else {
                    
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
                        options: {
                            plugin: [],
                            browserifyOptions: {
                                debug: DEV
                            }
                        },
                        files: [{
                            expand: true,
                            cwd: `src/js/`,
                            src: `*.${SETTINGS.jsExtension}`,
                            dest: `public/${SETTINGS.version}/js/`,
                            filter: `isFile`,
                            ext: `.${SETTINGS.version}.js`,
                        }],
                    };

                    console.log(TASKS.browserify.init);
                    

                }

                else {
                    
                }

                if (SETTINGS.jsExtension === 'ts') {
                    TASKS.browserify.init.options.plugin.push('tsify');
                }

                RUN.JS = RUN.JS.concat([
                    'browserify'
                ]);
                
                break;
        
            default:
                break;
        }

        /* Production mode configuration */
        if ( SETTINGS.version === 'prod' ) {

            /**
             * Remove sections of code from production builds that are only needed in development and test environments
             * https://github.com/nuzzio/grunt-strip-code
             */
            if ( SETTINGS.jsTasks.includes('strip_code') ) {

                grunt.loadNpmTasks('grunt-strip-code');

                TASKS.strip_code = {
                    options: {
                        blocks: [{
                            start_block: "/* test-code */",
                            end_block: "/* end-test-code */"
                        }]
                    },
                    init: {
                        src: `${SETTINGS.pathToProd}/js/app.prod.js`,
                    },
                };

                RUN.JS = RUN.JS.concat([
                    'strip_code'
                ]);

            }
            
            /**
             * The compiler for next generation JavaScript
             * https://github.com/babel/babel
             */
            if ( SETTINGS.jsTasks.includes('babel') ) {

                grunt.loadNpmTasks('grunt-babel');

                TASKS.babel = {
                    options: {
                        sourceMap: false,
                        "presets": [
                            ["env", {
                              "targets": {
                                "browsers": [
                                  "Chrome >= 52",
                                  "FireFox >= 44",
                                  "Safari >= 7",
                                  "Explorer 11",
                                  "last 4 Edge versions"
                                ]
                              },
                              "useBuiltIns": 'usage'
                            }],
                            "react",
                          ],
                          "ignore": [
                            "node_modules"
                          ],
                          "plugins": [
                            "transform-decorators-legacy",
                            "transform-class-properties",
                            "syntax-class-properties"
                          ]
                    },
                    init: {
                        files: [{
                            expand: true,
                            cwd: `${SETTINGS.pathToProd}/js/`,
                            src: '*.js',
                            dest: `public/${SETTINGS.version}/js/`,
                            filter: `isFile`,
                        }],
                    },
                };

                RUN.JS = RUN.JS.concat([
                    'babel'
                ]);

            }
            
            /**
             * UglifyJS is a JavaScript parser, minifier, compressor and beautifier toolkit.
             * https://github.com/mishoo/UglifyJS2
             */
            if ( SETTINGS.jsTasks.includes('uglify') ) {

                grunt.loadNpmTasks('grunt-contrib-uglify');

                TASKS.uglify = {
                    options: {
                        preserveComments: false,
                        drop_console: true,
                    },
                    init: {
                        files: [{
                            expand: true,
                            cwd: `${SETTINGS.pathToProd}/js/`,
                            src: '*.js',
                            dest: `public/${SETTINGS.version}/js/`,
                            filter: `isFile`,
                        }],
                    },
                };

                RUN.JS = RUN.JS.concat([
                    'uglify'
                ]);

            }

        }

    });

    /* Watch */
    grunt.registerTask('init_watch', () => {

        grunt.loadNpmTasks( 'grunt-newer' );
        grunt.loadNpmTasks( 'grunt-contrib-watch' );
        
        TASKS.watch = require('./settings/tasks/other/watch');

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
                    },
                    keepalive: KEEPALIVE,
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
            `${NEWER}copy:video`, 
            `${NEWER}copy:audio`, 
        ]);  

        if (!SETTINGS.htmlPreprocessor) {
            grunt.task.run([
                `${NEWER}copy:html`,
            ]);  
        }

    });

    /* Style */
    grunt.registerTask('run_style', () => {

        grunt.task.run( RUN.STYLE );  

    });

    /* HTML */
    grunt.registerTask('run_html', () => {

        switch (SETTINGS.htmlPreprocessor) {

            /* PUG config */
            case 'pug':

                /* FrontBox LESS config */
                // if (SETTINGS.framework === 'frontbox') {

                    grunt.task.run([
                        'pug',
                    ]);  

                // }
                // else {
                //     /* Non frontbox project */
                // }
                
                break;

            default:
                break;
        }

    });

    /* JavaScript */
    grunt.registerTask('run_js', () => {

        grunt.task.run( RUN.JS );  

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

    /* End */
    grunt.registerTask('run_end', () => {

        grunt.task.run( RUN.END );

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
                    options: {
                        spawn: false,
                    }
                },
                fonts: {
                    files: ["src/fonts/*"],
                    tasks: [`${NEWER}copy:fonts`],
                    options: {
                        spawn: false,
                    }
                },
                other: {
                    files: ["src/*"],
                    tasks: [`${NEWER}copy:other`],
                    options: {
                        spawn: false,
                    }
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

                        let options = {
                            style_base: {
                                files: [
                                    "src/style/base.less",
                                    "src/style/variables/**/*",
                                    "sec/style/frontbox/**/*"
                                ],
                                tasks: ["less:base"],
                                options: {
                                    spawn: false,
                                }
                            },
                            style_grid: {
                                files: [
                                    "src/style/grid.less",
                                    "src/style/frontbox/variables.less",
                                    "src/style/frontbox/functions.less",
                                    "src/style/frontbox/grid.less"
                                ],
                                tasks: ["less:grid"],
                                options: {
                                    spawn: false,
                                }
                            },
                            style_utilities: {
                                files: [
                                    "src/style/utilities.less",
                                    "src/style/utilities/*.less"
                                ],
                                tasks: ["less:utilities"],
                                options: {
                                    spawn: false,
                                }
                            },
                            style_main: {
                                files: [
                                    "src/style/style.less",
                                    "src/style/*/**.less",
                                ],
                                tasks: ["less:main"],
                                options: {
                                    spawn: false,
                                }
                            },
                        };

                        /* Watch plugins when working with framework */
                        if ( SETTINGS.workingWithFrontbox ) {
                            options.style_main.files.push( `${SETTINGS.pathToFrontBoxPlugins}/*/**.less`  );
                        }

                        TASKS.watch = Object.assign({}, TASKS.watch, options);

                    }

                    else {
                        let options = {
                            init: {
                                files: [
                                    "src/style/*.less",
                                ],
                                tasks: ["less"],
                                options: {
                                    spawn: false,
                                }
                            },
                        };
                        TASKS.watch = Object.assign({}, TASKS.watch, options);

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
                // if (SETTINGS.framework === 'frontbox') {

                    TASKS.watch = Object.assign({}, TASKS.watch, {

                        pug: {
                            files: ['src/template/*.pug'],
                            tasks: [`${NEWER}pug:init`],
                            options: {
                                spawn: false,
                            }
                        },

                        pug_includes: {
                            files: ['src/template/includes/*.pug'],
                            tasks: ['pug:init',],
                            options: {
                                spawn: false,
                            }
                        },

                    });

                    if (SETTINGS.debug) {
                        TASKS.watch = Object.assign({}, TASKS.watch, {
                            
                            pug_debug: {
                                files: ["./src/debug/**/*.pug"],
                                tasks: [`${NEWER}pug:debug`],
                                options: {
                                    spawn: false,
                                }
                            },

                        });
                    }

                // }

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
                // if (SETTINGS.framework === 'frontbox') {

                    TASKS.watch = Object.assign({}, TASKS.watch, {

                        browserify: {
                            files: [`src/js/**/*`],
                            tasks: [`browserify`],
                            options: {
                                spawn: false,
                            }
                        }

                    });

                // }

                // else {
                //     /* Non frontbox project */
                // }
                
                break;
            
            default:
                break;

        }

    });

};