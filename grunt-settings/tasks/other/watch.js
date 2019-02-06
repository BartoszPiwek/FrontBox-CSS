module.exports = {

  // HTML/PHP
  PHP: {
    files: ["*.php", "template-parts/*.php", "inc/**/*.php"],
    options: {
      livereload: true,
      spawn: true
    }
  },
  pug: {
    files: ['./src/template/*.pug'],
    tasks: [
      'newer:pug:dev',
      'newer:autosvg:dev',
    ],
    options: {
      spawn: true
    }
  },
  pug_includes: {
    files: ['./src/template/includes/*.pug'],
    tasks: [
        'pug:dev',
    ],
    options: {
        spawn: true,
    }
},
  pug_dev: {
    files: ["./src/debug/**/*.pug"],
    tasks: [
      "newer:pug:debug",
      "newer:autosvg:debug"
    ],
    options: {
      spawn: true
    }
  },

  // Style
  dev_style_base: {
    files: [
      "src/style/variables/**/*.less",
      "src/style/frontbox/**/*.less"
    ],
    tasks: ["less:dev_style_base"],
    options: {
      spawn: true
    }
  },
  dev_style_grid: {
    files: [
      "src/style/grid.less",
      "src/style/frontbox/variables.less",
      "src/style/frontbox/functions.less",
      "src/style/frontbox/grid.less"
    ],
    tasks: ["less:dev_style_grid"],
    options: {
      spawn: true
    }
  },
  dev_style_main: {
    files: ["src/style/*/**.less"],
    tasks: [
      "less:dev_style_main"
    ],
    options: {
      spawn: true
    }
  },
  dev_style_utilities: {
    files: [
      "src/style/utilities.less",
      "src/style/utilities/*.less"
    ],
    tasks: ["less:dev_style_utilities"],
    options: {
      spawn: true
    }
  },

  // Assets
  images: {
    files: ["src/images/**/*"],
    tasks: ["newer:copy:img"],
    options: {
      spawn: false
    }
  },
  video: {
    files: ["src/video/**/*"],
    tasks: ["newer:copy:video"],
    options: {
      spawn: false
    }
  },
  svg: {
    files: ["src/images/svg/*.svg"],
    tasks: ["svgmin"],
    options: {
      spawn: false
    }
  },

  // Javascript
  js: {
    files: ["src/js/**/*.js"],
    tasks: ["browserify:dev"],
    options: {
      spawn: false
    }
  },

  // Reload
  livereload: {
    options: {
      livereload: true,
      spawn: true
    },
    files: ["src/**/*"]
  },

  // Grunt
  grunt: { files: ["Gruntfile.js"] }
};
