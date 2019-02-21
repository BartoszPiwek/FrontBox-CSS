module.exports = function(SETTINGS){

    return {

        // Libs
        // TODO match witch libs_database file
        libs: {
            files: {
                // jQuery
                'src/js/libs/jquery.js': 'node_modules/jquery/dist/jquery.js',
                // picturefill
                'src/js/libs/picturefill.js': 'node_modules/picturefill/dist/picturefill.js',
                // Select2
                'src/js/libs/select2.js': 'node_modules/select2/dist/js/select2.js',
                'src/less/libs/select2.less': 'node_modules/select2/dist/css/select2.css',
                // tooltipster
                'src/js/libs/tooltipster.js': 'node_modules/tooltipster/dist/js/tooltipster.main.js',
                'src/less/libs/tooltipster.main.less': 'node_modules/toltipster/dist/css/tooltipster.main.css',
                // bLazy (https://www.npmjs.com/package/blazy)
                'src/js/libs/blazy.js': 'node_modules/blazy/blazy.js',
                // Cookies
                'src/js/libs/js-cookies.js': 'node_modules/js-cookie/src/js.cookie.js',
                // Validator
                'src/js/libs/validate.min.js': 'node_modules/jquery-validation/dist/jquery.validate.min.js',
            }
        },
        
        // img
        img: {
            expand: true,
            cwd: 'src/images/',
            src: ['**/*'],
            dest: `${SETTINGS.pathToDev}/images/`,
            filter: 'isFile'
        },
        // JS
        // js: {
        //     files: [{
        //         expand: true,
        //         cwd: 'src/js/',
        //         src: ['**/*.js'],
        //         dest: `${SETTINGS.pathToDev}/js/`,
        //         filter: 'isFile',
        //     }],
        // },
        // HTML
        html: {
            files: [{
                expand: true,
                cwd: 'src/template/',
                src: ['**/*.html'],
                dest: `${SETTINGS.pathToDev}/`,
                filter: 'isFile'
            }]
        },
        // Static CSS
        static_CSS: {
            files: [{
                expand: true,
                cwd: 'src/css',
                src: '*.css',
                dest: `${SETTINGS.pathToDev}/css/`,
                filter: 'isFile'
            }],
        },
        // Fonts
        fonts: {
            files: [{
                expand: true,
                cwd: 'src/fonts/',
                src: '*',
                dest: `${SETTINGS.pathToDev}/fonts/`,
                filter: 'isFile'
            }],
        },
        // Other files
        other: {
            files: [{
                expand: true,
                cwd: 'src/',
                src: '*',
                dest: `${SETTINGS.pathToDev}/`,
                filter: 'isFile'
            }],
        },
        // PROD version
        prod: {
            files: [
                // Images
                {
                    expand: true,
                    cwd: 'src/images/',
                    src: '**',
                    dest: `${SETTINGS.pathToProd}/images/`,
                    filter: 'isFile'
                },
                // JavaScript
                {
                    expand: true,
                    cwd: 'src/js/',
                    src: ['*.js'],
                    dest: `${SETTINGS.pathToProd}/js/`,
                    filter: 'isFile'
                },
                // HTML
                {
                    expand: true,
                    cwd: 'src/template/',
                    src: ['**/*.html'],
                    dest: `${SETTINGS.pathToProd}/`,
                    filter: 'isFile'
                },
                // Fonts
                {
                    expand: true,
                    cwd: 'src/fonts/',
                    src: '**',
                    dest: `${SETTINGS.pathToProd}/fonts/`,
                    filter: 'isFile'
                },
                // Static CSS
                {
                    expand: true,
                    cwd: 'src/css',
                    src: '*.css',
                    dest: `${SETTINGS.pathToProd}/css/`,
                    filter: 'isFile'
                },
                // Other files
                {
                    expand: true,
                    cwd: 'src/',
                    src: '.*',
                    dest: `${SETTINGS.pathToProd}/`,
                    filter: 'isFile'
                },
            ]
        }

    };
    
};