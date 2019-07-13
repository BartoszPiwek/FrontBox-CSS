/* Config */
const argv = require('yargs').argv;

export function getMode() {
    return argv.prod ? 'prod' : 'dev';
}
export function destPath() {
    return `public/${getMode()}`;
}