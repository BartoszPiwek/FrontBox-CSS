module.exports = {
    
    dev: {
        expand: true,
        src: ['*.html', "*.php"],
        cwd: 'public/dev/',
        flatten: true,
        options: {
            output_directory: "public/dev/",
            svg_directory: "src/images/svg/",
            debug_log: true,
        },
    },
    prod: {
        expand: true,
        src: ['*.html', "*.php"],
        cwd: 'public/prod/',
        flatten: true,
        options: {
            output_directory: "public/prod/",
            svg_directory: "src/images/svg/",
            debug_log: true,
        },
    },

};