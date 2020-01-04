const argv = require('yargs').argv;

export const getMode: string = argv.prod ? 'prod' : 'dev';
export const websiteDestinationPath: string = `public/${getMode}`;