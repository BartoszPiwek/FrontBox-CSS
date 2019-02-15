module.exports = function(SETTINGS) {

    var modifyVars = {
        pathToModulesDev: SETTINGS.pathToModulesDev,
        pathToModulesProd: SETTINGS.pathToModulesProd,
        isWordpress: SETTINGS.isWordpress,
        version: SETTINGS.version,
    };
    
    return {

        /**
         * Development version
         */

        dev_style_grid: {
            options: {
                compress: false,
                sourceMap: true,
                sourceMapFilename: `${SETTINGS.pathToDev}/css/grid.css.map`,
                sourceMapURL: 'grid.css.map',
                sourceMapBasepath: '../',
                sourceMapRootpath: '/',
                modifyVars: modifyVars,
                javascriptEnabled: true,
            },
            src: `src/style/grid.less`,
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
                modifyVars: modifyVars,
                javascriptEnabled: true,
            },
            src: `src/style/base.less`,
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
                modifyVars: modifyVars,
                javascriptEnabled: true,
            },
            src: `src/style/utilities.less`,
            dest: `${SETTINGS.pathToDev}/css/utilities.css`,
        },

        dev_style_main: {
            options: {
                compress: false,
                sourceMap: true,
                sourceMapFilename: `${SETTINGS.pathToDev}/${SETTINGS.pathToMainCSS}/style.dev.css.map`,
                sourceMapURL: 'style.dev.css.map',
                sourceMapBasepath: '../',
                sourceMapRootpath: '/',
                modifyVars: modifyVars,
                javascriptEnabled: true,
            },
            src: `src/style/style.less`,
            dest: `${SETTINGS.pathToDev}/${SETTINGS.pathToMainCSS}/style.dev.css`,
        },

    };
};