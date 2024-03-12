const DebitNoteModel = require("./debitNote.model");

function addDebitFile(newPackage, callback) {
    DebitNoteModel.addDebitFile(newPackage, (err, res) => {
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

function getSingleDebit(userId, callback) {
    
    DebitNoteModel.getSingleDebit(userId, (err, res) => {
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

function getDebit(userId, callback) {
    
    DebitNoteModel.getDebit(userId, (err, res) => {
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

function updateDebit(id, bene, callback) {
    
    DebitNoteModel.updateDebit(id, bene, (err, res) => {
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
    addDebitFile: addDebitFile,
    getSingleDebit: getSingleDebit,
    getDebit: getDebit,
    updateDebit: updateDebit,
};