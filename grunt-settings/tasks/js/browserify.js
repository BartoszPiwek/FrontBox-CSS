module.exports = function(SETTINGS) {

    return {

        dev: {
            src: `src/js/app.js`,
            dest: `${SETTINGS.pathToDev}/js/app.dev.js`,
        },

        prod: {
            src: `src/js/app.js`,
            dest: `${SETTINGS.pathToProd}/js/app.dev.js`,
        }

    };

};