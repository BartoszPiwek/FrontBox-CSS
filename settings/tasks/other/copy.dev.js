module.exports = function(SETTINGS){

    return {

       
        // img
        img: {
            expand: true,
            cwd: 'src/images/',
            src: ['**/*'],
            dest: `${SETTINGS.pathToDev}/images/`,
            filter: 'isFile'
        },
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