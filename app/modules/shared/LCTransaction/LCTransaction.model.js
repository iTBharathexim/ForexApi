const letterLCFile = require("../../projects/models/LCTransaction/LCTransction.model");
var mongoose = require('mongoose');

function addTransactionLC(project, callback) {
    letterLCFile.create(project.LCTransaction, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getTransactionLC(project, callback) {
    letterLCFile.find({ userId: project }, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function updateTransactionLC(id, data, callback) {
    letterLCFile.updateOne({ _id: mongoose.Types.ObjectId(id) }, { $set: data }, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function deleteTransactionLC(id, callback) {
    letterLCFile.deleteOne({ _id: mongoose.Types.ObjectId(id) }, (err, res) => {
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
    addTransactionLC: addTransactionLC,
    getTransactionLC: getTransactionLC,
    updateTransactionLC: updateTransactionLC,
    deleteTransactionLC: deleteTransactionLC
};
