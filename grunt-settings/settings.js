module.exports = {

    "version": null,

    /**
     * Path
     */
    "pathToMainCSS": 'public/dev/css', 
    "pathToDev": "public/dev",
    "pathToProd": "public/prod",
    "pathToModulesDev": "'.'",
    "pathToModulesProd": "'.'",

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