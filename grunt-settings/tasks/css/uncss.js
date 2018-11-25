module.exports = function(SETTINGS) {

    var
    searchFiles = [];

    if (SETTINGS.isWordpress) {
        searchFiles = ['**/*.php'];
    }
    else {
        searchFiles = [`${SETTINGS.pathToProd}/**/*.html`];
    }

    return {

        prod: {
            options: {
                ignore: [
                    /\.select2*/,
                    /\.js_.*/,
                    /\.js-.*/,
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
                    `${SETTINGS.pathToMainCSS}/style.prod.css`
                ],
                // Overwritten in load_sitemap_and_uncss task
                urls : [], 
            },
            files: [{
                src: searchFiles,
                dest: `${SETTINGS.pathToProd}/${SETTINGS.pathToMainCSS}/style.prod.css`
            }]
        },

    };
};