module.exports = function(SETTINGS) {

    return {

        options: {
            sourceMap: false,
            presets: ['env']
        },
        dist: {
            src: `${SETTINGS.pathToProd}/js/app.prod.js`,
            desc: `${SETTINGS.pathToProd}/js/app.prod.js`,
        },

    };

};