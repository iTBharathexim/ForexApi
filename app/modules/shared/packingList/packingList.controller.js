const packingListModel = require("./packingList.model");

function addPackingListFile(newPackage, callback) {
    packingListModel.addPackingListFile(newPackage, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getSinglePackingList(userId, callback) {    
    packingListModel.getSinglePackingList(userId, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getPackingList(userId, callback) {
    packingListModel.getPackingList(userId, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function updatePackingList(id, bene, callback) {    
    packingListModel.updatePackingList(id, bene, (err, res) => {
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
    addPackingListFile: addPackingListFile,
    getSinglePackingList: getSinglePackingList,
    getPackingList: getPackingList,
    updatePackingList: updatePackingList,
};