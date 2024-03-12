const LetterLCModel = require("./LCTransaction.model");

function addTransactionLC(newPackage, callback) {
    LetterLCModel.addTransactionLC(newPackage, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getTransactionLC(newPackage, callback) {
    LetterLCModel.getTransactionLC(newPackage, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function updateTransactionLC(id, data, callback) {
    LetterLCModel.updateTransactionLC(id, data, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function deleteTransactionLC(id, callback) {
    LetterLCModel.deleteTransactionLC(id, (err, res) => {
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
    addTransactionLC: addTransactionLC,
    getTransactionLC: getTransactionLC,
    updateTransactionLC: updateTransactionLC,
    deleteTransactionLC:deleteTransactionLC
};