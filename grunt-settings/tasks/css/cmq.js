module.exports = function(SETTINGS) {

    return {

        options: {
            log: true
        },
        your_target: {
            files: [{
                src: `${SETTINGS.pathToMainCSS}/style.prod.css`,
                dest: `${SETTINGS.pathToMainCSS}/style.prod.css`,
            }]
        }

    };
};