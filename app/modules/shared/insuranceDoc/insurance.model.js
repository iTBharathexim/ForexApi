const insuranceFile = require("../../projects/models/insurance.model");

function addInsuranceFile(project, callback) {
    insuranceFile.create(project.insurance, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {

            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}


async function getInsurance(user, callback) {
    const callBackFunc = async (err, receiver) => {
        if (err) {
            callback(err, null);
        } else if (receiver) {

            callback(null, receiver);
        } else {
            callback(null, null);
        }
    }
    insuranceFile.find({ userId: user.userId,  $or: [{ "deleteflag": '0' }, { "deleteflag": '-1' }] }).populate('pipo').sort({ '_id': -1 }).exec(callBackFunc)
}

function getSingleInsurance(user, callback) {
    insuranceFile.find({ insuranceNumber: user.userId }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateInsurance(id, bene, callback) {
    insuranceFile.updateOne({
        _id: id,
    }, { $set: bene },
        function (err, user) {
            if (err) {
                callback(err, null);
            } else if (user) {
                callback(null, user);
            } else {
                callback(null, null);
            }
        }
    );
}

module.exports = {
    addInsuranceFile: addInsuranceFile,
    getInsurance: getInsurance,
    getSingleInsurance: getSingleInsurance,
    updateInsurance: updateInsurance,
};
