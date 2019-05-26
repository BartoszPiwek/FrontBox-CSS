module.exports = function(SETTINGS){

    return {

        get_wordpress_sitemap: {
            command: `curl --silent --output sitemap.json ${SETTINGS.url}/?show_sitemap`
        },

    };
    
};