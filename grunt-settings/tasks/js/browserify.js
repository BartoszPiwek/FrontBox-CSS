/**
 * https://www.npmjs.com/package/grunt-browserify
 */

module.exports = function(SETTINGS) {

    return {

        dev: {
            options: {
            browserifyOptions: {
               debug: true,
            },
        },
            src: `src/js/app.js`,
            dest: `${SETTINGS.pathToDev}/js/app.dev.js`,
        },

        prod: {
            options: {
            browserifyOptions: {
               debug: false,
            },
        },
            src: `src/js/app.js`,
            dest: `${SETTINGS.pathToProd}/js/app.prod.js`,
        },

    };

};