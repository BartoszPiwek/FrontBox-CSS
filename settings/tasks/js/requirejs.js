module.exports = {

    prod: {
        options: {
            almond: true,
            baseUrl: 'src/js',
            wrap: true,
            name: 'main',
            include: ['libs/almond', 'main'],
            optimize: "none",
            out: 'public/prod/js/frontbox.js'
        }
    }

};