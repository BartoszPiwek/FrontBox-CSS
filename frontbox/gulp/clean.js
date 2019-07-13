/* Libs */
import { del } from 'del';
import { destPath } from './frontbox';
/* Config */
import * as config from './../../config';
const argv = require('yargs').argv;

export function clean_first(cb) {
  console.log('Clean');
  if (argv.new) {
    console.log('Clean new');

    del(config.projectDevFiles);
  } else if (argv.clean) {
    console.log('Clean dest ');
    del(`${destPath()}/`);
    cb();
  } else {
    console.log('Skip clean');
    cb();
  }
}