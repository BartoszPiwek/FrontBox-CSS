module.exports = function(SETTINGS) {

    return {

        options: {
            javascriptEnabled: true,
            modifyVars: SETTINGS.dev,
        },

        /**
         * Development version
         */

        dev_style_main: {
            options: {
                compress: false,
                sourceMap: true,
                sourceMapFilename: `${SETTINGS.dev.pathToMainCSS}/style.css.map`,
                sourceMapURL: 'style.css.map',
                sourceMapBasepath: '../',
                sourceMapRootpath: '/',
            },
            src: `src/less/style.less`,
            dest: `${SETTINGS.dev.pathToMainCSS}/style.css`,
        },

        dev_style_grid: {
            options: {
                compress: false,
                sourceMap: true,
                sourceMapFilename: `${SETTINGS.dev.pathToDev}/css/grid.css.map`,
                sourceMapURL: 'grid.css.map',
                sourceMapBasepath: '../',
                sourceMapRootpath: '/',
            },
            src: `src/less/grid.less`,
            dest: `${SETTINGS.dev.pathToDev}/css/grid.css`,
        },

        dev_style_base: {
            options: {
                compress: false,
                sourceMap: true,
                sourceMapFilename: `${SETTINGS.dev.pathToDev}/css/base.css.map`,
                sourceMapURL: 'base.css.map',
                sourceMapBasepath: '../',
                sourceMapRootpath: '/',
            },
            src: `src/less/base.less`,
            dest: `${SETTINGS.dev.pathToDev}/css/base.css`,
        },

        dev_style_utilities: {
            options: {
                compress: false,
                sourceMap: true,
                sourceMapFilename: `${SETTINGS.dev.pathToDev}/css/utilities.css.map`,
                sourceMapURL: 'utilities.css.map',
                sourceMapBasepath: '../',
                sourceMapRootpath: '/',
            },
            src: `src/less/utilities.less`,
            dest: `${SETTINGS.dev.pathToDev}/css/utilities.css`,
        },

        /**
         * Productive version
         */

        prod: {
            options: {
                compress: false,
                sourceMap: false,
                modifyVars: SETTINGS.prod,
            },
            src: `src/less/style.less`,
            dest: `${SETTINGS.prod.pathToMainCSS}/css/style.prod.css`,
        },

    };
};