const EbrcCopyModel = require("./ebrc.model");

function addEbrcFile(newPackage, callback) {
    EbrcCopyModel.addEbrcFile(newPackage, (err, res) => {
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

function getSingleEbrc(userId, callback) {
    
    EbrcCopyModel.getSingleEbrc(userId, (err, res) => {
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
function getEbrc(userId, callback) {
    
    EbrcCopyModel.getEbrc(userId, (err, res) => {
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
function updateEbrc(id, bene, callback) {
    
    EbrcCopyModel.updateEbrc(id, bene, (err, res) => {
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
    addEbrcFile: addEbrcFile,
    getSingleEbrc: getSingleEbrc,
    getEbrc: getEbrc,
    updateEbrc: updateEbrc,
};