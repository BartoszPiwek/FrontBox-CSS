/**
 * Spritesmith
 * Regular and retina images must be in the same folder
 * cssTemplate:
 * spritesmith-default.less
 * spritesmith-responsive.less
 */

module.exports = {

    patroni: {
        src: 'src/images/sprite-patroni/*.png',
        dest: 'src/images/sprite-patroni.png',
        destCss: 'src/less/automatic/sprite-patroni.less',
        cssTemplate: 'grunt-settings/template/spritesmith.handlebars',
        imgPath: '@spritePatroniPath',
        padding: 2,
        cssSpritesheetName: 'sprite-patroni',
        algorithmOpts: {
            sort: false
        },
        cssFormat: 'css',
        cssOpts: {
            cssClass: function(item) {
                return '.' + item.name;
            }
        },
        retinaSrcFilter: ['src/images/sprite-patroni/*@2x.png'],
        retinaDest: 'src/images/sprite-patroni@2x.png',
    },

};