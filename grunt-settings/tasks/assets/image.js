module.exports = function(SETTINGS){

    return {

        prod: {
            options: {
                svgo: true,
                //zopflipng: ['-y'],
                pngquant: false,
                zopflipng: false,
                optipng: ['-strip all', '-fix', '-o7', '-force'],
                mozjpeg: ['-optimize', '-progressive'],
                jpegRecompress: false,
                guetzli: false,
                gifsicle: true,
                cache: false,
            },
            files: [{
                expand: true,
                cwd: `${SETTINGS.pathToProd}/images`,
                src: ['**/*.{png,jpg,gif}'],
                dest: `${SETTINGS.pathToProd}/images`,
                filter: 'isFile',
            }]
        }

    };
};