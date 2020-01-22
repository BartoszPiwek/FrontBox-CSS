module.exports = function (Handlebars) {
	"use strict";

	Handlebars.registerHelper("kssArguments", function (doc, block) {
		const regex = /^.*/gm;
		let output = [];
		let test;

		while ((test = regex.exec(doc)) !== null) {
			let elements = test[0].split(" : ").map(v => v.trim());

			this.argument = {};
			this.argument.variable = elements[0];
			this.argument.type = elements[1];
			this.argument.value = elements[2];
			output.push(block.fn(this));
		}

		return output.join("");
	});
};
