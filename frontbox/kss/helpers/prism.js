const Prism = require("prismjs");
require("prismjs/components/prism-scss");
require("prismjs/components/prism-pug");

module.exports = function(Handlebars) {
	Handlebars.registerHelper("prism", function(value, lang) {
		if (lang && typeof lang === "string") {
			lang = lang;
		} else {
			lang = "scss";
		}

		try {
			return Prism.highlight(value, Prism.languages[lang], lang);
		} catch (e) {
			console.log(e);
		}
	});
};
