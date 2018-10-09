/**
 * Spritesmith
 * Regular and retina images must be in the same folder
 * cssTemplate:
 * spritesmith-default.less
 * spritesmith-responsive.less
 */

module.exports = {

    icons: {
        src: 'src/images/sprites/icons/*.png',
        dest: 'src/images/sprite-icon.png',
        destCss: 'src/less/automatic/sprite-icon.less',
        cssTemplate: 'build-files/spritesmith-default.less',
        imgPath: '@spriteIconsPath',
        padding: 2,
        algorithmOpts: {
            sort: false
        },
        cssFormat: 'css',
        cssOpts: {
            cssClass: function(item) {
                return '.' + item.name;
            }
        },
        retinaSrcFilter: ['src/images/sprites/icons/*@2x.png'],
        retinaDest: 'src/images/2x/sprites-icons.png'
    },

};