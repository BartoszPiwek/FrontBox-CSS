module.exports = {

    options: {
        javascriptEnabled: true,
    },
    dev_style_main: {
        options: {
            compress: false,
            sourceMap: true,
            sourceMapFilename: 'public/dev/css/style.css.map',
            sourceMapURL: 'style.css.map',
            sourceMapBasepath: '../',
            sourceMapRootpath: '/',
            modifyVars: {
                version: 'dev',
            }
        },
        files: {
            "public/dev/css/style.css": "src/less/style.less"
        }
    },
    dev_style_grid: {
        options: {
            compress: false,
            sourceMap: true,
            sourceMapFilename: 'public/dev/css/grid.css.map',
            sourceMapURL: 'grid.css.map',
            sourceMapBasepath: '../',
            sourceMapRootpath: '/',
        },
        files: {
            "public/dev/css/grid.css": "src/less/grid.less"
        }
    },
    dev_style_base: {
        options: {
            compress: false,
            sourceMap: true,
            sourceMapFilename: 'public/dev/css/base.css.map',
            sourceMapURL: 'base.css.map',
            sourceMapBasepath: '../',
            sourceMapRootpath: '/',
        },
        files: {
            "public/dev/css/base.css": "src/less/base.less"
        }
    },
    dev_style_utilities: {
        options: {
            compress: false,
            sourceMap: true,
            sourceMapFilename: 'public/dev/css/utilities.css.map',
            sourceMapURL: 'utilities.css.map',
            sourceMapBasepath: '../',
            sourceMapRootpath: '/',
        },
        files: {
            "public/dev/css/utilities.css": "src/less/utilities.less"
        }
    },
    prod: {
        options: {
            compress: false,
            sourceMap: false,
            modifyVars: {
                version: 'prod',
            }
        },
        files: {
            "public/prod/css/style.css": "src/less/style.less"
        }
    }

};