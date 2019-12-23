module.exports = function (Handlebars) {
  'use strict';

  Handlebars.registerHelper('kssArguments', function (doc, block) {
    var output = [];
    var regex = /^(\$\S+)\s*: (.+)\s*: (\S+)\s*/gm;
    var test;

    while ((test = regex.exec(doc)) !== null) {
      this.argument = {};
      this.argument.variable = test[1];
      this.argument.type = test[2];
      this.argument.value = test[3];

      output.push(block.fn(this));
    }

    return output.join('');
  });
};