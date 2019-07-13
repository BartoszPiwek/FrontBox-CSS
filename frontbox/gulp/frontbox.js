const argv = require('yargs').argv;
import * as config from "./../../config";

export function getModeName() {
    if (argv.prod) {
        return 'prod';
    }
    else {
        return 'dev';
    }
}

export function destPath() {
    return `./public/${argv.prod ? 'prod' : 'dev'}`;
}