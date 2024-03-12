const IdpmsModel = require('./idpms.model');

function addIdpms(newPackage, callback) {
    IdpmsModel.addIdpms(newPackage, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getIdpms(userId, callback) {
    IdpmsModel.getIdpms(userId, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function updateIdpms(id, newPackage, callback) {
    IdpmsModel.updateIdpms(id, newPackage, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function updateIdpmsByIdpms(id, newPackage, callback) {
    IdpmsModel.updateIdpmsByIdpms(id, newPackage, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getIdpmsByIdpms(billNo, callback) {
    IdpmsModel.getIdpmsByIdpms(billNo, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getIdpmsBySb(billNo, callback) {
    IdpmsModel.getIdpmsBySb(billNo, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getIdpmsAll(user, callback) {
    IdpmsModel.getIdpmsAll(user, function(err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    })
}

function getIdpmsAllCleared(user, callback) {
    IdpmsModel.getIdpmsAllCleared(user, function(err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    })
}


function getIdpmsCleared(user, callback) {
    IdpmsModel.getIdpmsCleared(user, function(err, user) {
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
    addIdpms: addIdpms,
    getIdpms: getIdpms,
    updateIdpms: updateIdpms,
    updateIdpmsByIdpms: updateIdpmsByIdpms,
    getIdpmsByIdpms: getIdpmsByIdpms,
    getIdpmsBySb: getIdpmsBySb,
    getIdpmsAll:getIdpmsAll,
    getIdpmsCleared:getIdpmsCleared,
    getIdpmsAllCleared:getIdpmsAllCleared
};
