module.exports = {

  /* Livereload */
  livereload: {
    options: {
      livereload: true,
      spawn: true
    },
    files: ["src/**/*"]
  },

  /* Grunt */
  grunt: { 
    files: [
      "Gruntfile.js",
      "grunt-settings/**/*",
    ] 
  }
};
