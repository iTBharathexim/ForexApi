const destructionFile = require("../../projects/models/destruction.model");

function addDestructionFile(project, callback) {
    destructionFile.create(project.destruction, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}


async function getDestruction(user, callback) {    
    await destructionFile.find({ userId: user.userId,file:user?.file,$or:[{"deleteflag":'0'},{"deleteflag":'-1'}]}).populate('pipo').sort({'_id': -1}).then((data)=> {
        callback(null,data);
    });
}

function getSingleDestruction(user, callback) {
    destructionFile.find({ destructionNumber: user.userId }, function(err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateDestruction(id, bene, callback) {
    destructionFile.updateOne({
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
    addDestructionFile: addDestructionFile,
    getDestruction: getDestruction,
    getSingleDestruction: getSingleDestruction,
    updateDestruction: updateDestruction,
};
