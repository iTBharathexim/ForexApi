const masterServiceFile = require("../../projects/models/masterService.model");

function addMasterServiceFile(project, callback) {    
    masterServiceFile.create(project.masterService, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

async function getMasterService(user, callback) {
    await masterServiceFile.find({ userId: user.userId, file: user.file, $or: [{ deleteflag: '0' }, { deleteflag: '-1' }] }).populate('pipo').sort({'_id': -1}).then((user) => {
        callback(null, user);
    });
}

function getSingleMasterService(user, callback) {   
    masterServiceFile.find({ masterServiceNumber: user.userId }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateMasterService(id, bene, callback) {
    masterServiceFile.updateOne({
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
    addMasterServiceFile: addMasterServiceFile,
    getMasterService: getMasterService,
    getSingleMasterService: getSingleMasterService,
    updateMasterService: updateMasterService,
};
