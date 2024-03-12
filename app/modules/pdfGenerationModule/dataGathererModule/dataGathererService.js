var data = require('./data');
var constants = require('./../constants');

function dataGathererService(html) {
  return new Promise(function(resolve, reject) {
    var dataForPDF = prepareDataForPDF(html);
    resolve(dataForPDF);
  });
}

function prepareDataForPDF(html) {
  var dataForPDF = {};

  dataForPDF.html = html;
  return dataForPDF;
}

module.exports = dataGathererService;
