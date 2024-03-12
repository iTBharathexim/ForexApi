const BlCopyModel = require("./blcopy.model");

function addblcopyFile(newPackage, callback) {
    BlCopyModel.addblcopyFile(newPackage, (err, res) => {
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

function getSingleblcopy(userId, callback) {
    
    BlCopyModel.getSingleblcopy(userId, (err, res) => {
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
function getblcopy(userId, callback) {
    
    BlCopyModel.getblcopy(userId, (err, res) => {
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
function updateblcopy(id, bene, callback) {
    
    BlCopyModel.updateblcopy(id, bene, (err, res) => {
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
function updateblcopySB(id, bene, callback) {
    
    BlCopyModel.updateblcopySB(id, bene, (err, res) => {
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
    addblcopyFile: addblcopyFile,
    getSingleblcopy: getSingleblcopy,
    getblcopy: getblcopy,
    updateblcopy: updateblcopy,
    updateblcopySB:updateblcopySB
};