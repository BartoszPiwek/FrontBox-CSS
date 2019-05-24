const argv = require('yargs').argv;

export function getModeName() {
    if ( argv.prod ) {
        return 'prod';
    }
    else {
        return 'dev';
    }
}