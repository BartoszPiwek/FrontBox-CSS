module.exports = {

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

    version                 : null,

    /* Path */
    pathToPublic            : 'public',
    pathToFrontBoxPlugins   : './../FrontBox-Plugins',

    "pathToMainCSS"         : './css', 
    "pathToMainCSSDev"      : './public/dev', 
    "pathToMainCSSProd"     : './public/prod', 
    "pathToDev"             : "./public/dev",
    "pathToProd"            : "./public/prod",
    "pathToModulesDev"      : "'../css'",
    "pathToModulesProd"     : "'./public/prod/css'",

    "pathToFavicon"         : "src/template/includes/favicon.html",

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

};