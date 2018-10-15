module.exports = function(SETTINGS) {

    return {

        options: {
            sourceMap: false,
            presets: ['env']
        },
        prod: {
            src: `${SETTINGS.pathToProd}/js/app.prod.js`,
            dest: `${SETTINGS.pathToProd}/js/app.prod.js`,
        },

    };

};