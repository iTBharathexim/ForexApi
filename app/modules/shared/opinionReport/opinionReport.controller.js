const OpinionReportModel = require("./opinionReport.model");

function addOpinionReportFile(newPackage, callback) {
    OpinionReportModel.addOpinionReportFile(newPackage, (err, res) => {
        // 
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getSingleOpinionReport(userId, callback) {
    
    OpinionReportModel.getSingleOpinionReport(userId, (err, res) => {
        // 
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getOpinionReport(userId, callback) {
    
    OpinionReportModel.getOpinionReport(userId, (err, res) => {
        // 
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function updateOpinionReport(id, bene, callback) {
    
    OpinionReportModel.updateOpinionReport(id, bene, (err, res) => {
        // 
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

module.exports = {
    addOpinionReportFile: addOpinionReportFile,
    getSingleOpinionReport: getSingleOpinionReport,
    getOpinionReport: getOpinionReport,
    updateOpinionReport: updateOpinionReport,
};