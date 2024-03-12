const otherDocModel = require("./otherDoc.model");

function addOtherDocFile(newPackage, callback) {
    otherDocModel.addOtherDocFile(newPackage, (err, res) => {
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

function getSingleOtherDoc(userId, callback) {
    
    otherDocModel.getSingleOtherDoc(userId, (err, res) => {
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

function getOtherDoc(userId, callback) {
    
    otherDocModel.getOtherDoc(userId, (err, res) => {
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

function updateOtherDoc(id, bene, callback) {
    
    otherDocModel.updateOtherDoc(id, bene, (err, res) => {
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
    addOtherDocFile: addOtherDocFile,
    getSingleOtherDoc: getSingleOtherDoc,
    getOtherDoc: getOtherDoc,
    updateOtherDoc: updateOtherDoc,
};