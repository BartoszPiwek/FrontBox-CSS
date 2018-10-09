module.exports = {
    
    prod: {
        options: {
            svgo: true,
            zopflipng: ['-y'],
            cache: false,
        },
        files: [{
            expand: true,
            cwd: 'public/prod/images',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'public/prod/images',
            filter: 'isFile',
        }]
    }

};