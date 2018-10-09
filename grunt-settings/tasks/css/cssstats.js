module.exports = {

    options: {
        htmlOutput: true,
        jsonOutput: false,
        uniqueDeclarations: [
            'font-size',
            'float',
            'width',
            'height',
            'color',
            'background-color'
        ],
        addOrigin: false,
        addRawCss: true,
        addHtmlStyles: true,
        addGraphs: true,
    },
    dev: {
        files: {
            'logs': ['public/dev/css/style.css'],
        }
    },
    prod: {
        files: {
            'logs': ['public/prod/css/style.css'],
        }
    },

};