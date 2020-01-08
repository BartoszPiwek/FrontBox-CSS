const pug = require("pug");
const frontboxKssHelpful = require("./helpful");

module.exports = function(Handlebars) {
	Handlebars.registerHelper("pug", function(value, wrapClasses) {
		if (wrapClasses && typeof wrapClasses === "string") {
			value = frontboxKssHelpful.pugWrapInElement(
				value,
				wrapClasses.split(",")
			);
		}

		try {
			return pug.render(value, {
				pretty: true
			});
		} catch (e) {
			console.log(e);
		}
	});
};
