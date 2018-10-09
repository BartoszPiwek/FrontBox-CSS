module.exports = {

    begin: ['public/prod/'],
    end: [
        'public/prod/css/critical*.css',
        'public/prod/images/svg/',
        'public/prod/js/frontbox.js',
        'public/prod/js/frontbox/',
        'public/prod/js/libs',
        'public/prod/js/frontbox-debug.js',
        'public/prod/includes',
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