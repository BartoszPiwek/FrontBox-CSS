module.exports = {

    options: {
        plugins: [{
            removeViewBox: false
        }, {
            removeUselessStrokeAndFill: true
        }, {
            removeAttrs: {
                attrs: ['xmlns', 'fill', 'stroke', 'width', 'height']
            }
        }]
    },
    dev: {
        files: [{
            expand: true,
            dest: 'src/images/svg/',
            src: ['**/*.svg'],
            cwd: 'src/images/svg/'
        }]
    }

};