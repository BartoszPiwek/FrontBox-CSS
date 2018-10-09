module.exports = {

    /**
     * HTML <head>
     */
    "website_author": "Bartosz Piwek", // {String | Boolean}
    "website_title": "Website Title", // Required! {String}
    "website_description": "Website Description", // Required! {String}
    "website_locale": "pl_PL", // Required! {String}
    "website_color": "#339933", // {String HEX color}

    
    "website_infoOldBrowser": true, // {Boolean}
    "website_infoOffJavascript": true, // {Boolean}
    "website_criticalCSS": false, // {Boolean}
    "navbar_fixed": false,

    /**
     * Functions
     */
    "getYear": "<%= grunt.template.today('yyyy') %>",

};