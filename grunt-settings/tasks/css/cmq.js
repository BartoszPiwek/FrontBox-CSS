module.exports = function(SETTINGS) {

    return {

        options: {
            log: true
        },
        your_target: {
            files: [{
                src: `${SETTINGS.pathToProd}/${SETTINGS.pathToMainCSS}/style.prod.css`,
                dest: `${SETTINGS.pathToProd}/${SETTINGS.pathToMainCSS}/style.prod.css`,
            }]
        }

    };
};