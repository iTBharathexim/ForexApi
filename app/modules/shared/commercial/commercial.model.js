const commercialFile = require("../../projects/models/commercial.model");

function addCommercialFile(project, callback) {
    commercialFile.create(project.commercial, (err, res) => {
        if (err) {
            
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

async function getCommercial(user, callback) {
    await commercialFile.find({ userId: user.userId, file: user?.filetype, $or: [{ "deleteflag": '0' }, { "deleteflag": '-1' }] }).populate('pipo')
        .populate('sbRef').
        populate('IRM_REF').
        populate('BoeRef').
        populate('ORM_Ref').sort({ '_id': -1 }).then((getuser) => {
            callback(null, getuser);
        });
}

function getCommercialByFile(user, callback) {
    let pipovalue = user.pipoId.split(",")
    commercialFile.find({ userId: user.userId, file: user.filetype, pipo: { $in: pipovalue } }).populate('pipo').exec(function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {

            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getSingleCommercial(user, callback) {
    commercialFile.find({ commercialNumber: user.userId }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {

            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateCommercial(id, bene, callback) {
    commercialFile.updateOne({
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
    addCommercialFile: addCommercialFile,
    getCommercial: getCommercial,
    getSingleCommercial: getSingleCommercial,
    updateCommercial: updateCommercial,
    getCommercialByFile: getCommercialByFile,
};
