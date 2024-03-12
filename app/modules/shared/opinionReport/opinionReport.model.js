const OpinionReportFile = require("../../projects/models/opinionReports.model");

function addOpinionReportFile(project, callback) {

    OpinionReportFile.create(project.opinionReport, (err, res) => {
        if (err) {

            callback(err, null);
        } else if (res) {

            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

async function getOpinionReport(user, callback) {
    await OpinionReportFile.find({ userId: user.userId, file: user.file, $or: [{ "deleteflag": '0' }, { "deleteflag": '-1' }] }).populate('pipo').sort({ '_id': -1 }).then((getuser) => {
        callback(null, getuser);
    });
}

function getSingleOpinionReport(user, callback) {
    OpinionReportFile.find({ opinionReportNumber: user.userId }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateOpinionReport(id, bene, callback) {


    OpinionReportFile.updateOne({
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
    addOpinionReportFile: addOpinionReportFile,
    getOpinionReport: getOpinionReport,
    getSingleOpinionReport: getSingleOpinionReport,
    updateOpinionReport: updateOpinionReport,
};
