module.exports = function(SETTINGS){

    return {

        begin: [
            `${SETTINGS.pathToProd}`,
        ],
        end: [
            `${SETTINGS.pathToProd}/css/critical*.css`,
            `${SETTINGS.pathToProd}/includes`,
            `${SETTINGS.pathToProd}/js/frontbox`,
            `${SETTINGS.pathToProd}/js/libs`,
            `${SETTINGS.pathToProd}/js/app.dev.js`,
            `${SETTINGS.pathToProd}/js/app.js`,
        ],
        dev: [
            'public/dev/*.html'
        ],
        pageres: [
            'logs/localhost*.png',
        ],
        start: [
            'README.md',
            'LICENSE',
            'CHEATSHEET.md',
            'CHANGELOG.md',
            'gitfiles/',
            'docs',
        ],
        
    };
};