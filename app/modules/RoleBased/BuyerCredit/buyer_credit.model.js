const Buyer_Beneficiary_CreditModel = require("../../projects/models/buyer_beneficiary_credit.model").Buyer_Beneficiary_CreditModel;
var ObjectId = require('mongoose').Types.ObjectId;
var mongoose = require('mongoose');

function addbuyer_beneficiary_credit(project, callback) {
    Buyer_Beneficiary_CreditModel.create(project.data, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function buyer_beneficiary_credit_get(project, callback) {
    Buyer_Beneficiary_CreditModel.find({ userId: project.userId }, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function buyer_beneficiary_credit_update(project, callback) {
    Buyer_Beneficiary_CreditModel.updateOne({ userId: project.userId, _id: ObjectId(project.id) }, { $set: project.data }, (err, res) => {
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
    addbuyer_beneficiary_credit: addbuyer_beneficiary_credit,
    buyer_beneficiary_credit_get: buyer_beneficiary_credit_get,
    buyer_beneficiary_credit_update: buyer_beneficiary_credit_update
};
