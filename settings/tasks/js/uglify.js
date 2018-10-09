module.exports = {
    
    options: {
        preserveComments: false,
        drop_console: true,
    },
    prod: {
        files: {
            'public/prod/js/scripts.js': ['public/prod/js/frontbox.js']
        }
    },

};