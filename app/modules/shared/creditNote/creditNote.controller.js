const CreditNoteModel = require("./creditNote.model");

function addCreditFile(newPackage, callback) {
    CreditNoteModel.addCreditFile(newPackage, (err, res) => { 
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getSingleCredit(userId, callback) {
    CreditNoteModel.getSingleCredit(userId, (err, res) => { 
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getCredit(userId, callback) {
    CreditNoteModel.getCredit(userId, (err, res) => { 
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function updateCredit(id, bene, callback) {
    CreditNoteModel.updateCredit(id, bene, (err, res) => { 
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
    addCreditFile: addCreditFile,
    getSingleCredit: getSingleCredit,
    getCredit: getCredit,
    updateCredit: updateCredit,
};