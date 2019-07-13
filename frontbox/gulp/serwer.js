export const browserSync = require('browser-sync').create();

export function server() {
  browserSync.init({
    open: config.browsersync.open,
    host: config.browsersync.host,
    proxy: config.browsersync.proxy,
    port: config.browsersync.port,
    server: {
      baseDir: `${destPath()}/`
    }
  });
}