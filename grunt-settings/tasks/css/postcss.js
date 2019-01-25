module.exports = function(SETTINGS) {

    return {

        prod: {
            options: {
                processors: [
                    /**
                     * Parse CSS and add vendor prefixes to rules by Can I Use
                     * https://github.com/postcss/autoprefixer
                     */
                    require('autoprefixer')({
                        browsers: ['last 2 versions', 'ie >= 8', 'Android >= 4.0.0', 'Safari >= 7.1', 'iOS >= 6']
                    }), 
                    /**
                     * Convert pixel units to rem (root em) units
                     * https://github.com/cuth/postcss-pxtorem
                     */
                    require('postcss-pxtorem')({
                        rootValue: 10,
                        unitPrecision: 5,
                        propWhiteList: [],
                        selectorBlackList: [],
                        replace: true,
                        mediaQuery: false,
                        minPixelValue: 0
                    }),
                    /**
                     * Pack same CSS media query rules into one
                     * https://github.com/hail2u/node-css-mqpacker
                     */
                    require("css-mqpacker"),
                ],
                map: false
            },
            src: `${SETTINGS.pathToMainCSSProd}/${SETTINGS.pathToMainCSS}/style.prod.css`
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
            src: `${SETTINGS.pathToMainCSSProd}/${SETTINGS.pathToMainCSS}/style.prod.css`
        }
    
    };

};