module.exports = {

    "version": null,

    /**
     * Path
     */
    "pathToMainCSS": './css', 
    "pathToDev": "./public/dev",
    "pathToProd": "./public/prod",
    "pathToModulesDev": "'../css'",
    "pathToModulesProd": "'./public/prod/css'",

    "pathToFavicon": "src/template/includes/favicon.html",

    /**
     * Prefix
     */
    "prefixFaviconHTML": "/images/favicon/",

    /**
     * Functions
     */
    "getYear": "<%= grunt.template.today('yyyy') %>",

    /**
     * Project type
     */
    "isWordpress": false,

};