const pug = require("pug");

module.exports = function(Handlebars) {
	Handlebars.registerHelper("pug", function(value) {
		const regex = /\..*\n( .*\n)+/gm;
		let output = [];
		let test;

		while ((test = regex.exec(value + "\n")) !== null) {
			let pugArray = test[0].split("\n");
			pugArray = pugArray.map(v => " " + v);
			pugArray.unshift(".output-item");

			output.push(pugArray.join("\n"));
		}

		try {
			return pug.render(output.join("\n"), {
				pretty: true
			});
		} catch (e) {
			console.log(e);
		}
	});
};
