module.exports = function(SETTINGS) {

    return {

        options: {
            blocks: [{
                start_block: "/* test-code */",
                end_block: "/* end-test-code */"
            }]
        },
        prod: {
            src: `${SETTINGS.pathToProd}/js/app.prod.js`,
        },

    };

};