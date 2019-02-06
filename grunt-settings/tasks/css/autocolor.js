module.exports = {

    automatic: {
        expand: true,
        src: '**',
        cwd: 'src/style',
        filter: 'isFile'
    },
    options: {
        variableFile: "src/style/variables/colors.less",
        prefix: "@"
    }

};