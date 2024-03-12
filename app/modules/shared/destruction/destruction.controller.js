const DestructionModel = require("./destruction.model");

function addDestructionFile(newPackage, callback) {
    DestructionModel.addDestructionFile(newPackage, (err, res) => {
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

function getSingleDestruction(userId, callback) {
    
    DestructionModel.getSingleDestruction(userId, (err, res) => {
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

function getDestruction(userId, callback) {
    
    DestructionModel.getDestruction(userId, (err, res) => {
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

function updateDestruction(id, bene, callback) {
    
    DestructionModel.updateDestruction(id, bene, (err, res) => {
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
    addDestructionFile: addDestructionFile,
    getSingleDestruction: getSingleDestruction,
    getDestruction: getDestruction,
    updateDestruction: updateDestruction,
};