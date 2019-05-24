module.exports = {
    
    "browsersync": {
        "open": false,
        "host": "localhost",
        "proxy": false,
        "port": 8080
    },

    /**
     * Main
     */
    // Declare the language of a Web page
    website_locale          : 'pl-PL',
    website_color           : '#e7be54',
    website_author          : 'Bartosz Piwek',

    /**
     * Informations
     */
    // Disable javascripts
    website_info_off_javascript     : true,
    // Using old browser
    website_info_old_browser        : true, 


    /* Tasks */
    path: {
        style: {
            main: {
                files: './src/style/style.less',
                dest: '',
                watch: [
                    './src/style/style.less',
                    './src/style/*/**.less',
                ]
            },
            base: {
                files: './src/style/base.less',
                dest: 'css/',
                watch: [
                    './src/style/base.less',
                    "./src/style/variables/**/*",
                    "./src/style/frontbox/**/*"
                ]
            },
            grid: {
                files: './src/style/grid.less',
                dest: 'css/',
                watch: [
                    './src/style/grid.less',
                    "./src/style/frontbox/variables.less",
                    "./src/style/frontbox/functions.less",
                    "./src/style/frontbox/grid.less"
                ]
            },
            utilities: {
                files: './src/style/utilities.less',
                dest: 'css/',
                watch: [
                    './src/style/utilities.less',
                    "./src/style/utilities/*.less"
                ]
            },
        },
        script: {
            main: {
                files: 'src/scripts/app.ts',
                dest: '',
                watch: [
                    'src/scripts/app.ts',
                    'src/scripts/frontbox/**/*.ts',
                ] 
            } 
        },
        pug: {
            main: {
                files: './src/template/*.pug',
                dest: '',
                watch: [
                    './src/template/*.pug',
                ]  
            },
            include: {
                files: './src/template/*.pug',
                dest: '',
                watch: [
                    './src/template/includes/*.pug'
                ]  
            },
        },
        copy: {
            image: {
                files: './src/images/**/*',
                dest: 'images',
                watch: [
                    './src/images/**/*',
                ]  
            },
            fonts: {
                files: './src/fonts/*.{eot|woff2|woff|ttf|svg}',
                dest: 'fonts',
                watch: [
                    './src/fonts/*.{eot|woff2|woff|ttf|svg}',
                ]  
            },
            other: {
                files: './src/other/*',
                dest: 'other',
                watch: [
                    './src/other/*',
                ]  
            },
            video: {
                files: './src/video/*',
                dest: 'video',
                watch: [
                    './src/video/*',
                ]  
            },
            audio: {
                files: './src/audio/*',
                dest: 'audio',
                watch: [
                    './src/audio/*',
                ]  
            },
        }
    },

    pathToPublic            : 'public',
    pathToFrontBoxPlugins   : './../FrontBox-Plugins',

    "pathToMainCSS"         : './css', 
    "pathToMainCSSDev"      : './public/dev', 
    "pathToMainCSSProd"     : './public/prod', 
    "pathToDev"             : "./public/dev",
    "pathToProd"            : "./public/prod",
    "pathToModulesDev"      : "'../css'",
    "pathToModulesProd"     : "'./public/prod/css'",

    "pathToFavicon"         : "./src/template/includes/favicon.html",

    /* Prefix */
    "prefixFaviconHTML"     : "/images/favicon/",

    /* Functions */
    "getYear"               : "<%= grunt.template.today('yyyy') %>",

    /* Project type */
    "isWordpress"           : false, 

    /* Framework */
    framework               : 'frontbox', // false,frontbox
    cssPreprocessor         : 'less', // false,less,sass
    htmlPreprocessor        : 'pug', // false,pug
    jsPreprocessor          : 'browserify', // false,browserify
    jsExtension             : 'ts',

    /**
     * Productive options 
     * css-mqpacker|
     */
    cssTasks                : ['css-mqpacker'],
    jsTasks                 : ['babel', 'strip_code', 'uglify'],

    /* Debug */
    debug                   : true,
    workingWithFrontbox     : true,
    
}