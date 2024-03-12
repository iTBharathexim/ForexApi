const MasterServiceModel = require("./masterService.model");

function addMasterServiceFile(newPackage, callback) {
    MasterServiceModel.addMasterServiceFile(newPackage, (err, res) => {
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

function getSingleMasterService(userId, callback) {
    
    MasterServiceModel.getSingleMasterService(userId, (err, res) => {
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

function getMasterService(userId, callback) {
    
    MasterServiceModel.getMasterService(userId, (err, res) => {
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

function updateMasterService(id, bene, callback) {
    
    MasterServiceModel.updateMasterService(id, bene, (err, res) => {
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
    addMasterServiceFile: addMasterServiceFile,
    getSingleMasterService: getSingleMasterService,
    getMasterService: getMasterService,
    updateMasterService: updateMasterService,
};