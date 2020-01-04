/*!
 * FrontBox 1.3.0
 * Copyright Bartosz Piwek
 * https://github.com/BartoszPiwek/FrontBox
 */
import { Gulpclass, Task } from "gulpclass/Decorators";
import { configBrowser } from "./config";
import { Copy } from "./frontbox/gulp/copy";
import { DocumentationStyle } from "./frontbox/gulp/documentation-style";
import { websiteDestinationPath } from "./frontbox/gulp/frontbox";

export const browserSync = require('browser-sync').create();

const argv = require('yargs').argv;
const del = require('del');
const documentationStyle = new DocumentationStyle();
const copy = new Copy();

@Gulpclass()
export class Gulpfile {

  @Task()
  async createServer() {
    browserSync.init({
      ...configBrowser,
      server: {
        baseDir: `${websiteDestinationPath}`
      }
    });
  }

  @Task()
  async buildWebsite() {
    if (argv.clean || argv.prod || argv.new) {
      del.sync(`${websiteDestinationPath}`);
    }

    // copy.init().map(task => {
    //   task();
    // })
    copy.init();

    // await parallel(copy.init());

    if (argv.server) {
      this.createServer();
    }

    //TODO:clean end
  }

  @Task()
  async documentationStyle() {
    documentationStyle.run();
    documentationStyle.style();

    if (argv.watch) {
      documentationStyle.watch();
    }

    if (argv.server) {
      documentationStyle.server();
    }
  }
}