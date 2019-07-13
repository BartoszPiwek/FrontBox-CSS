/* Import libs */
import { del } from 'del';
import { destPath } from './frontbox';
import * as config from './../../config';

export function clean_prod() {
  return del(`${destPath()}/`);
}

export function clean_start() {
  return del(`${config.projectDevFiles}`);
}