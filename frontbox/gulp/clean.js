/* Libs */
import { del } from 'del';
import { destPath } from './frontbox';
/* Config */
import * as config from './../../config';
const argv = require('yargs').argv;

export function clean_first(cb) {
  if (argv.new) {
    del(config.projectDevFiles);
    cb();
  } else if (argv.clean) {
    del(`${destPath()}/`);
    cb();
  } else {
    cb();
  }
}