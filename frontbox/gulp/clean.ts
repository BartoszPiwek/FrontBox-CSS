/* Libs */
const del = require('del');
/* Config */
import * as config from '../../config.back';
import { destPath } from './frontbox';
const argv = require('yargs').argv;

export function cleanBegin(cb) {
  if (argv.new) {
    del.sync(config.projectDevFiles);
    cb();
  } else if (argv.clean || argv.prod) {
    del.sync(`${destPath()}`);
    cb();
  } else {
    cb();
  }
}
export function cleanEnd(cb) {
  if (argv.prod) {
    del.sync([`${destPath()}/bootstrap`, `${destPath()}/plugins`]);
    cb();
  } else {
    cb();
  }
}