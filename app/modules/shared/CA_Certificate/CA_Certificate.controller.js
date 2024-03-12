const CA_CertificateModel = require("./CA_Certificate.model");

function addPipoFile(newPackage, callback) {
    CA_CertificateModel.addCA_Certificate(newPackage, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function CA_Certificate_get(newPackage, callback) {
    CA_CertificateModel.CA_Certificate_get(newPackage, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function CA_Certificate_RequestType_get(newPackage, callback) {
    CA_CertificateModel.CA_Certificate_RequestType_get(newPackage, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}


function CA_Certificate_getAll(newPackage, callback) {
    CA_CertificateModel.CA_Certificate_getAll(newPackage, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function CA_Certificate_update(newPackage, callback) {
    CA_CertificateModel.CA_Certificate_update(newPackage, (err, res) => {
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
    addPipoFile: addPipoFile,
    CA_Certificate_get: CA_Certificate_get,
    CA_Certificate_update: CA_Certificate_update,
    CA_Certificate_getAll:CA_Certificate_getAll,
    CA_Certificate_RequestType_get:CA_Certificate_RequestType_get
};
