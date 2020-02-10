// /* Libs */
// import { dest, src } from "gulp";
// import favicons from "gulp-favicons";
// import newer from "gulp-newer";
// import svgmin from "gulp-svgmin";
// /* Config */
// import { websiteDestinationPath } from "./frontbox";

// export function generateFavicon() {
// 	const element = config.path.assets.favicon;
// 	return src(`${element.file}`)
// 		.pipe(newer(`${element.desc}`))
// 		.pipe(
// 			favicons({
// 				appName: config.website.name,
// 				appDescription: config.website.description,
// 				background: config.website.color,
// 				path: element.htmlAssets,
// 				url: config.website.url,
// 				display: "standalone",
// 				orientation: "portrait",
// 				scope: "/",
// 				version: 1.0,
// 				logging: false,
// 				html: element.htmlDesc,
// 				pipeHTML: true,
// 				replace: true
// 			})
// 		)
// 		.pipe(dest(`${element.desc}`));
// }
// export function minifySvg() {
// 	const element = config.path.assets.svg;
// 	return src(element.files)
// 		.pipe(newer(`${websiteDestinationPath}/${element.dest}`))
// 		.pipe(
// 			svgmin({
// 				plugins: [
// 					{ removeXMLProcInst: true },
// 					{ removeComments: true },
// 					{ removeDoctype: true },
// 					{ removeViewBox: false },
// 					{ removeUselessStrokeAndFill: true },
// 					{ removeStyleElement: true },
// 					{
// 						removeAttrs: {
// 							attrs: [
// 								"xmlns",
// 								"fill",
// 								"class",
// 								"stroke",
// 								"width",
// 								"height",
// 								"id"
// 							]
// 						}
// 					}
// 				]
// 			})
// 		)
// 		.pipe(dest(`${element.dest}`));
// }
