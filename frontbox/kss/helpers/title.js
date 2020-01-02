module.exports = function (Handlebars) {
  'use strict';

  Handlebars.registerHelper('kssTitle', function (doc, block) {
    this.title = doc;
  });
};