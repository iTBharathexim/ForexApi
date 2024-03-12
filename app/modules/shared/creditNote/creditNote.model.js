const creditNoteFile = require("../../projects/models/creditNote.model");

function addCreditFile(project, callback) {   
    creditNoteFile.create(project.credit, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

async function getCredit(user, callback) {
    await creditNoteFile.find({ userId: user.userId,file:user?.filetype,$or:[{"deleteflag":'0'},{"deleteflag":'-1'}]}).populate('pipo').sort({'_id': -1}).then((data)=> {
        callback(null,data);
    });
}

function getSingleCredit(user, callback) {
    creditNoteFile.find({ creditNoteNumber: user.userId }, function(err, user) {        
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateCredit(id, bene, callback) {
    creditNoteFile.updateOne({
            _id: id,
        }, { $set: bene },
        function(err, user) {
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
    addCreditFile: addCreditFile,
    getCredit: getCredit,
    getSingleCredit: getSingleCredit,
    updateCredit: updateCredit,
};
