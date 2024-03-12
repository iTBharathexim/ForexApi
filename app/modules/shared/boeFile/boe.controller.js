const BoeModel = require('./boe.model');

function addBoeFile(newPackage, callback) {
    BoeModel.addBoeFile(newPackage, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}
function getBoe(userId, callback) {
    BoeModel.getBoe(userId, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getBoeAll(userId, callback) {
    BoeModel.getBoeAll(userId, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getBoebyPartName(userId, callback) {
    BoeModel.getbyPartName(userId, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}
function updateBoe(id, newPackage, callback) {
    BoeModel.updateBoe(id, newPackage, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function updateBoeByBoe(id, newPackage, callback) {
    BoeModel.updateBoeByBoe(id, newPackage, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getBoeByBoe(boeNumber, callback) {
    BoeModel.getBoeByBoe(boeNumber, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function addBoe(boeNumber, callback) {
    BoeModel.addBoeFile(boeNumber, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getBoeByBene(beneName, callback) {
    BoeModel.getBoeByBene(beneName, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getBoebyPipo(beneName, callback) {
    BoeModel.getBoebyPipo(beneName, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getBoeData(beneName, callback) {
    BoeModel.getBoeData(beneName, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getBoeDatabyPendingSubmission(beneName, callback) {
    BoeModel.getBoeDatabyPendingSubmission(beneName, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getBoeDatabySubmission(beneName, callback) {
    BoeModel.getBoeDatabySubmission(beneName, (err, res) => {
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
    addBoeFile: addBoeFile,
    getBoe: getBoe,
    updateBoe: updateBoe,
    updateBoeByBoe: updateBoeByBoe,
    getBoeByBoe: getBoeByBoe,
    getBoeByBene: getBoeByBene,
    addBoe:addBoe,
    getBoebyPartName:getBoebyPartName,
    getBoeAll:getBoeAll,
    getBoeData:getBoeData,
    getBoeDatabySubmission:getBoeDatabySubmission,
    getBoeDatabyPendingSubmission:getBoeDatabyPendingSubmission,
    getBoebyPipo:getBoebyPipo
};
