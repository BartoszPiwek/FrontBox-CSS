module.exports = function(SETTINGS) {

    return {

        options: {
            preserveComments: false,
            drop_console: true,
        },
        prod: {
            src: `${SETTINGS.pathToProd}/js/app.prod.js`,
            dest: `${SETTINGS.pathToProd}/js/app.prod.js`,
        },

    };

};