module.exports = function(SETTINGS) {

    var modifyVarsDev, modifyVarsProd;

    modifyVarsDev = {
        pathToModulesDev: SETTINGS.pathToModulesDev,
        pathToModulesProd: SETTINGS.pathToModulesProd,
        isWordpress: SETTINGS.isWordpress,
    };
    modifyVarsProd = JSON.parse(JSON.stringify(modifyVarsDev));
    modifyVarsProd.version = 'prod';
    modifyVarsDev.version = 'dev';

    return {

        options: {
            javascriptEnabled: true,
            modifyVars: modifyVarsDev,
        },

        /**
         * Development version
         */

        dev_style_main: {
            options: {
                compress: false,
                sourceMap: true,
                sourceMapFilename: `${SETTINGS.pathToMainCSS}/style.dev.css.map`,
                sourceMapURL: 'style.dev.css.map',
                sourceMapBasepath: '../',
                sourceMapRootpath: '/',
            },
            src: `src/less/style.less`,
            dest: `${SETTINGS.pathToMainCSS}/style.dev.css`,
        },

        dev_style_grid: {
            options: {
                compress: false,
                sourceMap: true,
                sourceMapFilename: `${SETTINGS.pathToDev}/css/grid.css.map`,
                sourceMapURL: 'grid.css.map',
                sourceMapBasepath: '../',
                sourceMapRootpath: '/',
            },
            src: `src/less/grid.less`,
            dest: `${SETTINGS.pathToDev}/css/grid.css`,
        },

        dev_style_base: {
            options: {
                compress: false,
                sourceMap: true,
                sourceMapFilename: `${SETTINGS.pathToDev}/css/base.css.map`,
                sourceMapURL: 'base.css.map',
                sourceMapBasepath: '../',
                sourceMapRootpath: '/',
            },
            src: `src/less/base.less`,
            dest: `${SETTINGS.pathToDev}/css/base.css`,
        },

        dev_style_utilities: {
            options: {
                compress: false,
                sourceMap: true,
                sourceMapFilename: `${SETTINGS.pathToDev}/css/utilities.css.map`,
                sourceMapURL: 'utilities.css.map',
                sourceMapBasepath: '../',
                sourceMapRootpath: '/',
            },
            src: `src/less/utilities.less`,
            dest: `${SETTINGS.pathToDev}/css/utilities.css`,
        },

        /**
         * Productive version
         */

        prod: {
            options: {
                compress: false,
                sourceMap: false,
                modifyVars: modifyVarsProd,
            },
            src: `src/less/style.less`,
            dest: `${SETTINGS.pathToMainCSS}/style.prod.css`,
        },
        prod_style_grid: {
            options: {
                compress: false,
                sourceMap: false,
                modifyVars: modifyVarsProd,
            },
            src: `src/less/grid.less`,
            dest: `${SETTINGS.pathToDev}/css/grid.prod.css`,
        },

        prod_style_base: {
            options: {
                compress: false,
                sourceMap: false,
                modifyVars: modifyVarsProd,
            },
            src: `src/less/base.less`,
            dest: `${SETTINGS.pathToDev}/css/base.prod.css`,
        },

        prod_style_utilities: {
            options: {
                compress: false,
                sourceMap: false,
                modifyVars: modifyVarsProd,
            },
            src: `src/less/utilities.less`,
            dest: `${SETTINGS.pathToDev}/css/utilities.prod.css`,
        },

    };
};