const debitNoteFile = require("../../projects/models/debitNote.model");
const letterLCFile = require("../../projects/models/letterLC.model");

function addDebitFile(project, callback) {
    debitNoteFile.create(project.debit, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}


async function getDebit(user, callback) {
    await debitNoteFile.find({ userId: user.userId,file:user?.filetype,$or:[{"deleteflag":'0'},{"deleteflag":'-1'}]}).populate('pipo').sort({'_id': -1}).then((data)=> {
        callback(null,data);
    });
}

function getSingleDebit(user, callback) {
    debitNoteFile.find({ debitNoteNumber: user.userId }, function(err, user) {    
        if (err) {
            
            callback(err, null);
        } else if (user) {
            
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateDebit(id, bene, callback) {
    debitNoteFile.updateOne({
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
    addDebitFile: addDebitFile,
    getDebit: getDebit,
    getSingleDebit: getSingleDebit,
    updateDebit: updateDebit,
};
