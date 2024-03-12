var dataGathererService = require('./dataGathererModule/dataGathererService');
var htmlGenerator = require('./pdfTemplate/htmlGenerator');
var generatePDF = require('./pdfGenerator/pdfGenerator');

var constants = require('./constants');
const path = require('path');

let express = require('express');
let router = express.Router();
let fs = require('fs');
router.post('/generate', function(req, res, next) {
    
    var templateFile = req.body.template ? req.body.template : './modules/pdfGenerationModule/pdfTemplate/template.ejs';
    var filename = req.body.filename + '.pdf';
    var outputFile = constants.PDF_OUTPUT_DIR + filename;
    
    return dataGathererService(req.body.data) // Gets Data
        .then(function(data) {
            
            return htmlGenerator(templateFile, data); // Builds HTML
        })
        .then(function(html) {
            
            return generatePDF(html, req.body.format ? req.body.format : {}, null, (data) => {
                res.send({ file: "data:application/octet-stream;base64," + data, filename: filename, success: true })
            }, (error) => {
                
            }); // Builds PDF
        })
        .catch(function(err) {
            
            res.send({ "errors": err });
            return false;
        });
});
module.exports = router;