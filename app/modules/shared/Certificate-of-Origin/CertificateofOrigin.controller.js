const AirwayBlCopyModel = require("./CertificateofOrigin.model");

function addAirwayBlcopyFile(newPackage, callback) {
    AirwayBlCopyModel.addAirwayBlcopyFile(newPackage, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }

    });
}

function getSingleAirwayBlcopy(userId, callback) {
    AirwayBlCopyModel.getSingleAirwayBlcopy(userId, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getAirwayBlcopy(userId, callback) {
    AirwayBlCopyModel.getAirwayBlcopy(userId, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function updateAirwayBlcopy(id, bene, callback) {
    AirwayBlCopyModel.updateAirwayBlcopy(id, bene, (err, res) => {
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
    addAirwayBlcopyFile: addAirwayBlcopyFile,
    getSingleAirwayBlcopy: getSingleAirwayBlcopy,
    getAirwayBlcopy: getAirwayBlcopy,
    updateAirwayBlcopy: updateAirwayBlcopy,
};