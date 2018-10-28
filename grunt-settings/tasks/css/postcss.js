module.exports = function(SETTINGS) {

    return {

        prod: {
            options: {
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 2 versions', 'ie >= 8', 'Android >= 4.0.0', 'Safari >= 7.1', 'iOS >= 6']
                    }), 
                    // add vendor prefixes
                    require('postcss-pxtorem')({
                        rootValue: 10,
                        unitPrecision: 5,
                        propWhiteList: [],
                        selectorBlackList: [],
                        replace: true,
                        mediaQuery: false,
                        minPixelValue: 0
                    }),
                    require('postcss-momentum-scrolling')([
                        'scroll',
                        'auto',
                        'inherit'
                    ]),
                ],
                map: false
            },
            src: `${SETTINGS.pathToProd}/${SETTINGS.pathToMainCSS}/style.prod.css`
        },
    
        min: {
            options: {
                processors: [
                    require('cssnano')({
                        zindex: false,
                        autoprefixer: false
                    }) // minify the result
                ],
                map: false
            },
            src: `${SETTINGS.pathToProd}/${SETTINGS.pathToMainCSS}/style.prod.css`
        }
    
    };

};