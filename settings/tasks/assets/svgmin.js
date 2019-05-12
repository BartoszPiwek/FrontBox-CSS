module.exports = {

    options: {
        plugins: [
            {
                removeViewBox: false
            },
            {
                removeUselessStrokeAndFill: true
            },
            {
                removeStyleElement: true,
            },
            {
                removeAttrs: 
                {
                    attrs: ['xmlns', 'fill', 'stroke', 'width', 'height']
                }
            },
        ]
    },
    dev: {
        files: [{
            expand: true,
            dest: 'src/images/svg/',
            src: ['**/*.svg', '!**/*_.svg'],
            cwd: 'src/images/svg/'
        }]
    }

};