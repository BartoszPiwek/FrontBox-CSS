module.exports = function (Handlebars) {
  'use strict';

  Handlebars.registerHelper('kssDescription', function (doc, block) {
    this.description = doc;
  });
};