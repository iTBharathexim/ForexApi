const BankInformationFile = require("../../projects/models/BankInformantion.model");

function addBank(newPackage, callback) {
    BankInformationFile.find({ BankUniqueId: newPackage?.BankUniqueId }, (err, res) => {
        BankInformationFile.create(newPackage, (err, res) => {
            if (err) {
                callback(err, null);
            } else if (res) {
                callback(null, res);
            } else {
                callback(null, null);
            }
        });
    });
}

function getAllBank(userId, callback) {
    BankInformationFile.find({}, { value: 1, BankUniqueId: 1 }, (err, res) => {
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
