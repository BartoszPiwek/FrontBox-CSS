module.exports = {

    prod: {
        options: {
            ignore: [
                /\.js_.*/
            ],
            stylesheets: ['css/style.css']
        },
        files: [{
            src: 'public/prod/*.html',
            dest: 'public/prod/css/style.css'
        }]
    },
    
};