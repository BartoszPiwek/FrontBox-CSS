module.exports = function(SETTINGS) {

    return {

        prod: {
            options: {
                ignore: [
                    /\.select2*/,
                    /\.js_.*/,
                    /expanded/,
                    /js/,
                    /wp-/,
                    /align/,
                    /admin-bar/,
                    /\.*slick*/,
                    /\.*active*/,
                ],
                ignoreSheets: [
                    /fonts.googleapis/,
                ],
                stylesheets: [
                    `${SETTINGS.pathToMainCSS}style.prod.css`
                ],
                // Overwritten in load_sitemap_and_uncss task
                urls : [], 
            },
            files: [{
                src: ['**/*.php'],
                dest: `${SETTINGS.pathToMainCSS}/style.prod.css`
            }]
        },

    };
};