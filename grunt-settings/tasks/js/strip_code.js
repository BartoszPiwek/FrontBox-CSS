module.exports = {

    options: {
        blocks: [{
            start_block: "/* test-code */",
            end_block: "/* end-test-code */"
        }]
    },
    prod: {
        src: 'public/prod/js/main.js',
    },

};