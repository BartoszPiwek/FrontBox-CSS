module.exports = function(SETTINGS){
    
    return {
        dev: {
            files: [{
                expand: true,
                cwd: 'src/template/',
                src: ['**/*.pug'],
                dest: 'public/dev/',
                ext: '.html'
            }],
            options: {
                data: SETTINGS.dev,
                filters: {
                    pageName: function(block) {
                        return block;
                    },
                }
            }
        },
        prod: {
            files: [{
                expand: true,
                cwd: 'src/template/',
                src: ['**/*.pug'],
                dest: 'public/prod/',
                ext: '.html'
            }],
            options: {
                data: SETTINGS.prod,
                filters: {
                    pageName: function(block) {
                        return block;
                    },
                }
            }
        },

    };
    
};