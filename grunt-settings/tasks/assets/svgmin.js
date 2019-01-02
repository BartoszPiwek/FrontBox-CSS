module.exports = {

    dev: {
        options: {
            plugins: [
                { removeViewBox: false },
                { removeUselessStrokeAndFill: true },
                { removeStyleElement: true, },
                { removeAttrs: 
                    { attrs: ['xmlns', 'fill', 'id', 'stroke', 'width', 'height'] }
                },
            ]
        },
        files: [{
            expand: true,
            dest: 'src/images/svg/',
            src: ['*.svg', '!_*.svg'],
            cwd: 'src/images/svg/'
        }]
    },
    devWithColors: {
        options: {
            plugins: [
                { removeViewBox: false },
                { removeUselessStrokeAndFill: true },
                { removeStyleElement: true, },
                { removeAttrs: 
                    { attrs: ['xmlns', 'id', 'stroke', 'width', 'height'] }
                },
            ]
        },
        files: [{
            expand: true,
            dest: 'src/images/svg/',
            src: ['_*.svg'],
            cwd: 'src/images/svg/'
        }]
    }

};