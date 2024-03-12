const BuyerModel = require("./buyer.model");

function addBuyerFile(newPackage, callback) {
    BuyerModel.addBuyerFile(newPackage, (err, res) => {
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

function getSingleBuyer(userId, callback) {
    
    BuyerModel.getSingleBuyer(userId, (err, res) => {
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

function getBuyerByName(name, callback) {
    
    BuyerModel.getBuyerByName(name, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, nul);
        }
    });
}

function getBuyer(userId, callback) {
    BuyerModel.getBuyer(userId, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function updateBuyer(id, buyer, callback) {
    BuyerModel.updateBuyer(id, buyer, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function DeleteBuyer(id, callback) {
    BuyerModel.DeleteBuyer(id, (err, res) => {
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
    addBuyerFile: addBuyerFile,
    getBuyer: getBuyer,
    getSingleBuyer: getSingleBuyer,
    updateBuyer: updateBuyer,
    getBuyerByName: getBuyerByName,
    DeleteBuyer:DeleteBuyer
};
