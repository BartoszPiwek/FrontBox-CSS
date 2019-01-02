module.exports = (SETTINGS) => {
    
    return {
        prod: {
            options: {
                reset: true,
                stoponerror: false,
                // remotePath: 'http://decodize.com/',
                // remoteFiles: ['html/moving-from-wordpress-to-octopress/',
                //               'css/site-preloading-methods/'], //or
                // remoteFiles: 'validation-files.json', // JSON file contains array of page paths.
                relaxerror: ['Bad value X-UA-Compatible for attribute http-equiv on element meta.'], //ignores these errors
                generateReport: true,
                errorHTMLRootDir: "./logs/",
                useTimeStamp: false,
                errorTemplate: "./grunt-settings/template/validation.handlebars"
            },
            files: [{
                expand: true,
                cwd: `${SETTINGS.pathToProd}`,
                src: ['*.html'],
                dest: `${SETTINGS.pathToProd}`,
                ext: '.html'
            }]
        }
    };

};