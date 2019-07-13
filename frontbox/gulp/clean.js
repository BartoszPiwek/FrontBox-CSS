/* Libs */
import { del } from 'del';
import { destPath } from './frontbox';
/* Config */
import * as config from './../../config';
const argv = require('yargs').argv;

export function cleanBegin(cb) {
  if (argv.new) {
    del(config.projectDevFiles);
    cb();
  } else if (argv.clean || argv.prod) {
    del(`${destPath()}`);
    cb();
  } else {
    cb();
  }
}
export function cleanEnd(cb) {
  if (argv.prod) {
    del([`${destPath()}/bootstrap`, `${destPath()}/plugins`]);
    cb();
  } else {
    cb();
  }
}