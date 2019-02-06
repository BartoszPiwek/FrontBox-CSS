module.exports = {
    
    // Version { automatic set }
    version                 : null,
    isDebug                 : true,
    // Lang
    website_locale          : 'pl-PL',

    /* Path */
    "pathToCSS"             : 'css', 
    "pathToMainCSS"         : '..', 
    "pathToDev"             : "./public/dev",
    "pathToProd"            : "./public/prod",

    "pathToFavicon"         : "src/template/includes/favicon.html",

    /* Prefix */
    "prefixFaviconHTML"     : "/images/favicon/",

    /* Functions */
    "getYear"               : "<%= grunt.template.today('yyyy') %>",

    /* Project type */
    "isWordpress"           : false,

};