const ForwardContractModel = require("../../../projects/models/Treasury/Forward-Contract/Forward-Contract.model.js").ForwardContractModel;
var ObjectId = require('mongoose').Types.ObjectId;

function addForwardContract(project, callback) {
    ForwardContractModel.create(project.data, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function ForwardContract_get(project, callback) {
    ForwardContractModel.find({ userId: project.userId}, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    }).sort({ '_id': -1 });
}
function ForwardContract_All(project, callback) {
    ForwardContractModel.find({}, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function ForwardContract_update(project, callback) {
    ForwardContractModel.updateOne({ userId: project.userId, _id: ObjectId(project.id) }, { $set: project.data }, (err, res) => {
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
    addForwardContract: addForwardContract,
    ForwardContract_get: ForwardContract_get,
    ForwardContract_update: ForwardContract_update,
    ForwardContract_All: ForwardContract_All
};
