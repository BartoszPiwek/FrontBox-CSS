/*!
 * FrontBox-CSS 1.5.0
 * Bartosz Piwek
 * https://github.com/BartoszPiwek/FrontBox
 */

import { Gulpclass, SequenceTask, Task } from "gulpclass/Decorators";
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
	async createServer(done) {
		if (argv.server) {
			return browserSync.init({
				...configBrowser,
				server: {
					baseDir: websiteDestinationPath
				}
			});
		} else {
			done();
		}
	}

	@Task()
	async cleanWebsite(done) {
		if (argv.clean || argv.prod || argv.new) {
			return del.sync(websiteDestinationPath);
		} else {
			done();
		}
	}

	@SequenceTask()
	buildWebsite() {
		style = new FrontboxGulpStyle();
		html = new FrontboxGulpHTML();
		script = new FrontboxGulpScript();
		copy = new FrontboxGulpCopy();

		return [
			"cleanWebsite",
			"buildDevWebsite",
			"buildProdWebsite",
			"createServer"
		];
	}

	@Task()
	async buildDevWebsite(done) {
		await copy.start();
		await html.start();
		await script.start();
		await style.start();

		done();
	}

	@Task()
	async buildProdWebsite(done) {
		if (argv.prod) {
			style.concatFiles();
		} else {
			done();
		}
	}

	@Task()
	async buildStyleDocumentation() {
		style = new FrontboxGulpStyle({
			destinationPath: `${configDocumentationStyle.dest}/style`
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
