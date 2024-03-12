const CA_CertificateModel = require("../../projects/models/CA_Certificate.model").CA_CertificateModel;
var ObjectId = require('mongoose').Types.ObjectId;
var mongoose = require('mongoose');

function addCA_Certificate(project, callback) {

    CA_CertificateModel.create(project.data, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function CA_Certificate_get(project, callback) {
    CA_CertificateModel.find({ userId: project.userId }, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function CA_Certificate_RequestType_get(project, callback) {
    CA_CertificateModel.find({ userId: project.userId,RequestType:project.Type }, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}
function CA_Certificate_getAll(project, callback) {
    CA_CertificateModel.find({}, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}
function CA_Certificate_update(project, callback) {
    CA_CertificateModel.updateOne({ userId: project.userId, _id: ObjectId(project.id) }, { $set: project.data }, (err, res) => {
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
    addCA_Certificate: addCA_Certificate,
    CA_Certificate_get: CA_Certificate_get,
    CA_Certificate_update: CA_Certificate_update,
    CA_Certificate_getAll:CA_Certificate_getAll,
    CA_Certificate_RequestType_get:CA_Certificate_RequestType_get
};
