module.exports = {
    
    options: {
        process: true,
        recursive: true,
        includeBase: 'src/template/includes/',
        // data: html_variables,
        customBlockTypes: ['build-files/embed_scripts.js']
    },
    dev: {
        options: {
            environment: 'dev'
        },
        files: [{
            expand: true,
            cwd: 'public/dev/',
            src: ['*.html'],
            dest: 'public/dev/',
            ext: '.html'
        }]
    },
    prod: {
        options: {
            environment: 'prod'
        },
        files: [{
            expand: true,
            cwd: 'public/prod/',
            src: ['*.html'],
            dest: 'public/prod/',
            ext: '.html'
        }]
    },
    critical: {
        options: {
            environment: 'critical'
        },
        files: [{
            expand: true,
            cwd: 'public/prod/',
            src: ['*.html', 'debug/*.html'],
            dest: 'public/prod/',
            ext: '.html'
        }]
    }

};