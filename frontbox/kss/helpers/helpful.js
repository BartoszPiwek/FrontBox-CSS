exports.pugWrapInElement = function(code, tags) {
	const regexSearchParentsWithContent = /\..*\n( .*\n)+/gm;
	let output = [];
	let test;
	tags = tags.reverse();

	while ((test = regexSearchParentsWithContent.exec(code + "\n")) !== null) {
		let pugArray = test[0].split("\n");

		tags.forEach(function(element) {
			pugArray = pugArray.map(v => " " + v);
			pugArray.unshift(element);
			console.log(pugArray);
		});

		output.push(pugArray.join("\n"));
	}

	return output.join("\n");
};
