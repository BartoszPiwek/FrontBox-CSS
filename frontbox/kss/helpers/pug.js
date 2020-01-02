"use strict";

const pug = require("pug");

module.exports = function(Handlebars) {
	Handlebars.registerHelper("pug", function(value) {
		try {
			return pug.render(value, {
				pretty: true
			});
		} catch (e) {
			console.log(e);
		}
	});
};
