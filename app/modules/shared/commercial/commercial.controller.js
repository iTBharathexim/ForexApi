const commercialModel = require("./commercial.model");
function addCommercialFile(newPackage, callback) {
    commercialModel.addCommercialFile(newPackage, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }

    });
}

function getSingleCommercial(userId, callback) {    
    commercialModel.getSingleCommercial(userId, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getCommercial(userId, callback) {    
    commercialModel.getCommercial(userId, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getCommercialByFile(userId, filetype, pipoId, callback) {    
    commercialModel.getCommercialByFile(userId, filetype, pipoId, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function updateCommercial(id, bene, callback) {    
    commercialModel.updateCommercial(id, bene, (err, res) => {
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
    addCommercialFile: addCommercialFile,
    getSingleCommercial: getSingleCommercial,
    getCommercial: getCommercial,
    updateCommercial: updateCommercial,
    getCommercialByFile:getCommercialByFile,
};