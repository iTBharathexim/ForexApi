const billOfExchangeModel = require("./billOfExchange.model");

function addBillOfExchangeFile(newPackage, callback) {
    billOfExchangeModel.addBillOfExchangeFile(newPackage, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }

    });
}

function getSingleBillOfExchange(userId, callback) {
    
    billOfExchangeModel.getSingleBillOfExchange(userId, (err, res) => {
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

function getBillOfExchange(userId, callback) {
    
    billOfExchangeModel.getBillOfExchange(userId, (err, res) => {
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

function updateBillOfExchange(id, bene, callback) {
    
    billOfExchangeModel.updateBillOfExchange(id, bene, (err, res) => {
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
    addBillOfExchangeFile: addBillOfExchangeFile,
    getSingleBillOfExchange: getSingleBillOfExchange,
    getBillOfExchange: getBillOfExchange,
    updateBillOfExchange: updateBillOfExchange,
};