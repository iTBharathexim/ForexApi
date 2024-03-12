const ForwardContractModel = require("./ForwardContract.model");

function addForwardContract(newPackage, callback) {
    ForwardContractModel.addForwardContract(newPackage, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function ForwardContract_get(newPackage, callback) {
    ForwardContractModel.ForwardContract_get(newPackage, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function ForwardContract_All(newPackage, callback) {
    ForwardContractModel.ForwardContract_All(newPackage, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}


function ForwardContract_update(newPackage, callback) {
    ForwardContractModel.ForwardContract_update(newPackage, (err, res) => {
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
    addForwardContract: addForwardContract,
    ForwardContract_get: ForwardContract_get,
    ForwardContract_update: ForwardContract_update,
    ForwardContract_All:ForwardContract_All
};
