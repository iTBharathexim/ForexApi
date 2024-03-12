const edpmsModel = require('./edpms.model');

function addEdpms(newPackage, callback) {
    edpmsModel.addEdpms(newPackage, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getEdpms(userId, callback) {
    edpmsModel.getEdpms(userId, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getEdpmsQuery(userId, callback) {
    edpmsModel.getEdpmsQuery(userId, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}


function updateEdpms(id, newPackage, callback) {
    edpmsModel.updateEdpms(id, newPackage, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function updateEdpmsByEdpms(id, newPackage, callback) {
    edpmsModel.updateEdpmsByEdpms(id, newPackage, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getEdpmsByEdpms(billNo, callback) {
    edpmsModel.getEdpmsByEdpms(billNo, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getEdpmsBySb(billNo, callback) {
    edpmsModel.getEdpmsBySb(billNo, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getEdpmsAll(user, callback) {
    edpmsModel.getEdpmsAll(user, function(err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    })
}

function getEdpmsAllCleared(user, callback) {
    edpmsModel.getEdpmsAllCleared(user, function(err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    })
}


function getEdpmsCleared(user, callback) {
    edpmsModel.getEdpmsCleared(user, function(err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    })
} 
module.exports = {
    addEdpms: addEdpms,
    getEdpms: getEdpms,
    updateEdpms: updateEdpms,
    updateEdpmsByEdpms: updateEdpmsByEdpms,
    getEdpmsByEdpms: getEdpmsByEdpms,
    getEdpmsBySb: getEdpmsBySb,
    getEdpmsAll:getEdpmsAll,
    getEdpmsCleared:getEdpmsCleared,
    getEdpmsAllCleared:getEdpmsAllCleared,
    getEdpmsQuery:getEdpmsQuery
};
