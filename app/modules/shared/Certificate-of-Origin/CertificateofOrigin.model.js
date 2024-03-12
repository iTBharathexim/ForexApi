const airwayBlCopyFile = require("../../projects/models/CertificateofOrigin.model");

function addAirwayBlcopyFile(project, callback) {
    airwayBlCopyFile.create(project.data, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {

            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

async function getAirwayBlcopy(user, callback) {
    await airwayBlCopyFile.find({ userId: user.userId, $or: [{ "deleteflag": '0' }, { "deleteflag": '-1' }] }).populate('pipo').populate('CIRef').sort({ '_id': -1 }).then((data) => {
        callback(null, data);
    });
}

function getSingleAirwayBlcopy(user, callback) {
    airwayBlCopyFile.find({ airwayBlCopyNumber: user.userId, deleteflag: '0' }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {

            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateAirwayBlcopy(id, bene, callback) {
    airwayBlCopyFile.updateOne({
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
    addAirwayBlcopyFile: addAirwayBlcopyFile,
    getSingleAirwayBlcopy: getSingleAirwayBlcopy,
    getAirwayBlcopy: getAirwayBlcopy,
    updateAirwayBlcopy: updateAirwayBlcopy,
};
