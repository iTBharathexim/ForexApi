const LetterLCModel = require("./letterLC.model");

function addLetterLCFile(newPackage, callback) {
    LetterLCModel.addLetterLCFile(newPackage, (err, res) => {
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

function getSingleLetterLC(userId, callback) {
    
    LetterLCModel.getSingleLetterLC(userId, (err, res) => {
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

function getLetterLC(userId, callback) {
    
    LetterLCModel.getLetterLC(userId, (err, res) => {
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

function updateLetterLC(id, bene, callback) {
    
    LetterLCModel.updateLetterLC(id, bene, (err, res) => {
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
    addLetterLCFile: addLetterLCFile,
    getSingleLetterLC: getSingleLetterLC,
    getLetterLC: getLetterLC,
    updateLetterLC: updateLetterLC,
};