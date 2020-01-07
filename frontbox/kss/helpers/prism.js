const Prism = require("prismjs");
require("prismjs/components/prism-scss");

module.exports = function(Handlebars) {
	Handlebars.registerHelper("prism", function(value) {
		try {
			return Prism.highlight(value, Prism.languages.scss, "scss");
		} catch (e) {
			console.log(e);
		}
	});
};
