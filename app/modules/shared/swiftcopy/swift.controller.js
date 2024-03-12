const SwiftCopyModel = require("./swift.model");

function addSwiftFile(newPackage, callback) {
    SwiftCopyModel.addSwiftFile(newPackage, (err, res) => {
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

function getSingleSwift(userId, callback) {
    
    SwiftCopyModel.getSingleSwift(userId, (err, res) => {
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
function getSwift(userId, callback) {
    
    SwiftCopyModel.getSwift(userId, (err, res) => {
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
function updateSwift(id, bene, callback) {
    
    SwiftCopyModel.updateSwift(id, bene, (err, res) => {
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
    addSwiftFile: addSwiftFile,
    getSingleSwift: getSingleSwift,
    getSwift: getSwift,
    updateSwift: updateSwift,
};