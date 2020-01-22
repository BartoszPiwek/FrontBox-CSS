/* Import libs */
import { dest, series, src, watch } from "gulp";
import * as gulpif from "gulp-if";
import * as sass from "gulp-sass";
import * as sassGlob from "gulp-sass-glob";
import * as sourcemaps from "gulp-sourcemaps";
import { Gulpclass, Task } from "gulpclass/Decorators";
import * as kss from "kss";
import { configDocumentationStyle } from "../../config";

const argv = require("yargs").argv;
const browserSync = require("browser-sync").create();

@Gulpclass()
export class FrontboxGulpDocumentationStyle {
	@Task()
	server() {
		browserSync.init({
			open: false,
			host: "localhost",
			proxy: false,
			port: 8081,
			server: {
				baseDir: `./${configDocumentationStyle.dest}/`
			}
		});
	}

	@Task("run")
	async run() {
		return await kss({
			source: [`src/style/`],
			builder: "./frontbox/kss/",
			title: "FrontBox-CSS Debug Style Guide",
			css: ["./assets/style.css"],
			custom: ["Function", "Output", "OutputCSS", "Icons", "Usage", "Arguments", "Title"],
			extend: "./frontbox/kss/helpers",
			homepage: "./../../README.md",
			destination: configDocumentationStyle.dest
		}).then(() => {
			browserSync.reload();
		});
	}

	@Task("style")
	style() {
		return src(`frontbox/kss/style/kss.scss`, {
			allowEmpty: true
		})
			.pipe(gulpif(!argv.prod, sourcemaps.init({ loadMaps: true })))
			.pipe(sassGlob())
			.pipe(sass())
			.pipe(gulpif(!argv.prod, sourcemaps.write(`./`, { sourceRoot: "./" })))
			.pipe(dest(`${configDocumentationStyle.dest}/style`))
			.pipe(browserSync.stream());
	}

	@Task("styleIframe")
	styleIframe() {
		return src(`frontbox/kss/style/iframe.scss`, {
			allowEmpty: true
		})
			.pipe(sassGlob())
			.pipe(sass())
			.pipe(dest(`${configDocumentationStyle.dest}/style`))
			.pipe(browserSync.stream());
	}

	@Task()
	watch() {
		watch(["frontbox/kss/**/*.scss"], series("style"));

		watch(["frontbox/kss/**/*.hbs"], series("run"));

		watch(["frontbox/kss/**/iframe.scss"], series("styleIframe"));

		watch([`${configDocumentationStyle.dest}/style/**/*.css`], series("run"));
	}
}
