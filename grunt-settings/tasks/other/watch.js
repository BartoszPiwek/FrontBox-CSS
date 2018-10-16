module.exports = {

    // HTML/PHP
    PHP: {
        files: ['*.php', 'template-parts/*.php', 'inc/**/*.php'],
        options: {
            livereload: true,
            spawn: true,
        },
    },
    pug: {
        files: ['./src/template/**/*.pug'],
        tasks: ['newer:pug:dev'],
        options: {
            spawn: true,
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
        files: ['src/less/grid.less', 'src/less/frontbox/variables.less', 'src/less/frontbox/functions.less', 'src/less/frontbox/grid.less'],
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
        files: ['src/images/**/*'],
        tasks: ['newer:copy:img'],
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

    // Reload
    livereload: {
        options: {
            livereload: true,
            spawn: true,
        },
        files: ['src/**/*']
    },

    // Grunt
    grunt: { files: ['Gruntfile.js'] }

};