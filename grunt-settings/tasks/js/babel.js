module.exports = function(SETTINGS) {

    return {

        options: {
            sourceMap: false,
            presets: ['env'],
            compact: false,
        },
        prod: {
            src: `${SETTINGS.pathToProd}/js/app.prod.js`,
            dest: `${SETTINGS.pathToProd}/js/app.prod.js`,
        },

    };

};