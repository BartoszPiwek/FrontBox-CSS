module.exports = function(SETTINGS){

    return {

        icons: {
            options: {
                trueColor: true,
                precomposed: true,
                appleTouchBackgroundColor: "auto",
                coast: true,
                windowsTile: true,
                tileBlackWhite: false,
                tileColor: "auto",
                html: `${SETTINGS.pathToFavicon}`,
                HTMLPrefix: `${SETTINGS.prefixFaviconHTML}`
            },
            src: 'src/images/favicon.png',
            dest: 'src/images/favicon'
        }

    };

};