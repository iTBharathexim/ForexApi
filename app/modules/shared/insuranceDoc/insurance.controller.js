const InsuranceModel = require("./insurance.model");

function addInsuranceFile(newPackage, callback) {
    InsuranceModel.addInsuranceFile(newPackage, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getSingleInsurance(userId, callback) {
    
    InsuranceModel.getSingleInsurance(userId, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getInsurance(userId, callback) {
    
    InsuranceModel.getInsurance(userId, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function updateInsurance(id, bene, callback) {
    
    InsuranceModel.updateInsurance(id, bene, (err, res) => {
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
    addInsuranceFile: addInsuranceFile,
    getSingleInsurance: getSingleInsurance,
    getInsurance: getInsurance,
    updateInsurance: updateInsurance,
};