module.exports = {

    // HTML
    html: {
        files: ['src/template/**/*.pug'],
        tasks: ['pug:dev'],
        options: {
            spawn: false,
        }
    },

    // Style
    dev_style_base: {
        files: ['src/less/base.less', 'src/less/variables/*/**.less', 'sec/less/frontbox/*/**.less'],
        tasks: ['less:dev_style_base'],
        options: {
            spawn: true,
        }
    },
    dev_style_grid: {
        files: ['src/less/grid.less', 'src/less/frontbox/variables.less', 'sec/less/frontbox/functions'],
        tasks: ['less:dev_style_grid'],
        options: {
            spawn: true,
        }
    },
    dev_style_main: {
        files: ['src/less/**/*.less'],
        tasks: ['less:dev_style_main'],
        options: {
            spawn: true,
        }
    },
    dev_style_utilities: {
        files: ['src/less/utilities.less', 'src/less/utilities/*.less'],
        tasks: ['less:dev_style_utilities'],
        options: {
            spawn: true,
        }
    },

    // Assets
    images: {
        files: ['src/images/**/*.jpg', 'src/images/**/*.png'],
        tasks: ['newer:copy:dev'],
        options: {
            spawn: false,
        }
    },
    svg: {
        files: ['src/images/svg/*.svg'],
        tasks: ['svgmin'],
        options: {
            spawn: false,
        }
    },

    // Javascript
    js: {
        files: ['src/js/**/*.js'],
        tasks: ['browserify:dev'],
        options: {
            spawn: false,
        }
    },
    // js_frontbox: {
    //     files: ['src/js/frontbox/*.js'],
    //     tasks: ['copy:dev_frontbox', 'preprocess:dev_frontbox'],
    //     options: {
    //         spawn: false,
    //     }
    // },

    // Reload
    livereload: {
        options: {
            livereload: true,
            spawn: true,
        },
        files: ['src/*/**']
    },

    // Grunt
    grunt: { files: ['Gruntfile.js'] }

};