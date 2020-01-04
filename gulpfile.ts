/*!
 * FrontBox 1.3.0
 * Copyright Bartosz Piwek
 * https://github.com/BartoszPiwek/FrontBox
 */
import { Gulpclass, Task } from "gulpclass/Decorators";
import { configBrowser } from "./config";
import { FrontboxGulpCopy } from "./frontbox/gulp/copy";
import { FrontboxGulpDocumentationStyle } from "./frontbox/gulp/documentation-style";
import { websiteDestinationPath } from "./frontbox/gulp/frontbox";
import { Html } from "./frontbox/gulp/html";
import { FrontboxGulpScript } from "./frontbox/gulp/script";
import { FrontboxGulpStyle } from "./frontbox/gulp/style";

export const browserSync = require('browser-sync').create();

const argv = require('yargs').argv;
const del = require('del');
const documentationStyle = new FrontboxGulpDocumentationStyle();
const copy = new FrontboxGulpCopy();
const html = new Html();
const script = new FrontboxGulpScript();
const style = new FrontboxGulpStyle();

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

    copy.init();
    html.init();
    script.init();
    style.init();

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