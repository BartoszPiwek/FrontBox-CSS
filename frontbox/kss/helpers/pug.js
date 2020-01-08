const pug = require("pug");
const frontboxKssHelpful = require("./helpful");

module.exports = function(Handlebars) {
	Handlebars.registerHelper("pug", function(value, args, foo) {
		// if (args && args[0]) {
		value = frontboxKssHelpful.pugWrapInElement(value, [
			".debug-element",
			".debug-element__content"
		]);
		// }

		try {
			return pug.render(value, {
				pretty: true
			});
		} catch (e) {
			console.log(e);
		}
	});
};
