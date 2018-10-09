module.exports = {

    automatic: {
        expand: true,
        src: '**',
        cwd: 'src/less',
        filter: 'isFile'
    },
    options: {
        variableFile: "src/less/variables/colors.less",
        prefix: "@"
    }

};