const BankInformantion = require("./BankInformation.model");

function addBank(newPackage, callback) {
    BankInformantion.addBank(newPackage, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getAllBank(userId, callback) {
    BankInformantion.getAllBank(userId, (err, res) => {
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
    addBank: addBank,
    getAllBank: getAllBank,
};
