module.exports = function(SETTINGS){
    
    var 
    modifyVarsDev, modifyVarsProd,
    filters;

    modifyVarsDev = JSON.parse(JSON.stringify(SETTINGS));
    modifyVarsProd = JSON.parse(JSON.stringify(SETTINGS));

    modifyVarsDev.version = 'dev';
    modifyVarsProd.version = 'prod';

    filters = require("./pug-filters");

    return {

        dev: {
            files: [{
                expand: true,
                cwd: 'src/template/',
                src: ['**/*.pug', '!includes/**'],
                dest: `${SETTINGS.pathToDev}/`,
                ext: '.html'
            }],
            options: {
                data: modifyVarsDev,
                filters: filters,
            }
        },

        prod: {
            files: [{
                expand: true,
                cwd: 'src/template/',
                src: ['**/*.pug', '!includes/**'],
                dest: `${SETTINGS.pathToProd}/`,
                ext: '.html'
            }],
            options: {
                data: modifyVarsProd,
                filters: filters,
            }
        },

        // Debug
        debug: {
            files: [{
                expand: true,
                cwd: 'src/debug/',
                src: ['**/*.pug'],
                dest: `${SETTINGS.pathToDev}/debug/`,
                ext: '.html'
            }],
            options: {
                data: modifyVarsDev,
                filters: filters,
            }
        },

    };
    
};