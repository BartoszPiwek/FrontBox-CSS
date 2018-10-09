module.exports = {
    
    dev: {
        options: {
            port: 8181,
            base: 'public/dev',
            hostname: 'localhost',
            livereload: true,
            open: {
                opn: true,
                target: 'http://localhost:8181',
                appName: 'chrome',
            }
        }
    },
    prod: {
        options: {
            port: 8282,
            base: 'public/prod',
            keepalive: true,
            hostname: 'localhost',
            debug: true,
            livereload: false,
            open: {
                opn: true,
                target: 'http://localhost:8282',
                appName: 'chrome --no-sandbox',
            }
        }
    }

};