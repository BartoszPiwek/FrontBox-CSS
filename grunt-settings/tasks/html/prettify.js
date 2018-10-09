module.exports = {

    options: {
        "indent": 4,
        "condense": true,
        "indent_inner_html": true,
    },
    html: {
        files: [{
            expand: true,
            cwd: 'public/prod/',
            src: ['*.html'],
            dest: 'public/prod/',
            ext: '.html'
        }]
    }

};