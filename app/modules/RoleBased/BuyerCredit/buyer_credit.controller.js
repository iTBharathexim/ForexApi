const Buyer_Beneficiary_CreditModel = require("./buyer_beneficiary_credit.model");

function addPipoFile(newPackage, callback) {
    Buyer_Beneficiary_CreditModel.addbuyer_beneficiary_credit(newPackage, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function buyer_beneficiary_credit_get(newPackage, callback) {
    Buyer_Beneficiary_CreditModel.buyer_beneficiary_credit_get(newPackage, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function buyer_beneficiary_credit_update(newPackage, callback) {
    Buyer_Beneficiary_CreditModel.buyer_beneficiary_credit_update(newPackage, (err, res) => {
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
    addPipoFile: addPipoFile,
    buyer_beneficiary_credit_get: buyer_beneficiary_credit_get,
    buyer_beneficiary_credit_update: buyer_beneficiary_credit_update
};
