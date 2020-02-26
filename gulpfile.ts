/*!
 * FrontBox-CSS 1.5.0
 * Bartosz Piwek
 * https://github.com/BartoszPiwek/FrontBox
 */

import { Gulpclass, Task } from "gulpclass/Decorators";
import { configBrowser, configDocumentationStyle } from "./config";
import { FrontboxGulpCopy } from "./frontbox/gulp/copy";
import { FrontboxGulpDocumentationStyle } from "./frontbox/gulp/documentation-style";
import { websiteDestinationPath } from "./frontbox/gulp/frontbox";
import { FrontboxGulpHTML } from "./frontbox/gulp/html";
import { FrontboxGulpScript } from "./frontbox/gulp/script";
import { FrontboxGulpStyle } from "./frontbox/gulp/style";

export const browserSync = require("browser-sync").create();

const argv = require("yargs").argv;
const del = require("del");
const documentationStyle = new FrontboxGulpDocumentationStyle();
let copy: FrontboxGulpCopy;
let script: FrontboxGulpScript;
let style: FrontboxGulpStyle;
let html: FrontboxGulpHTML;

@Gulpclass()
export class Gulpfile {
	@Task()
	async createServer() {
		browserSync.init({
			...configBrowser,
			server: {
				baseDir: websiteDestinationPath
			}
		});
	}

	@Task('buildWebsite')
	async buildWebsite() {
		style = new FrontboxGulpStyle();
		html = new FrontboxGulpHTML();
		script = new FrontboxGulpScript();
		copy = new FrontboxGulpCopy();

		if (argv.clean || argv.prod || argv.new) {
			del.sync(websiteDestinationPath);
		}

		copy.start();
		html.start();
		script.start();
		style.start();

		if (argv.server && !argv.prod) {
			this.createServer();
		}

		//TODO:clean end
	}

	@Task()
	async documentationStyle() {
		style = new FrontboxGulpStyle({
			destinationPath: `${configDocumentationStyle.dest}/style`,
			includePrefix: false
		});

		if (argv.clean) {
			del.sync(`${configDocumentationStyle}`);
		}

		documentationStyle.run();
		documentationStyle.style();
		documentationStyle.styleIframe();

		style.start();

		if (argv.watch) {
			documentationStyle.watch();
		}

		if (argv.server) {
			documentationStyle.server();
		}
	}
}
