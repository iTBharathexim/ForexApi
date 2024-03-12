const packingListFile = require("../../projects/models/packingList.model");

function addPackingListFile(project, callback) {
    packingListFile.create(project.packingList, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getPackingList(user, callback) {

    packingListFile.find({ userId: user.userId,file:user?.file}).
    populate('pipo').
    populate('sbRef').sort({'_id': -1}).exec(function(err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getSinglePackingList(user, callback) {
    packingListFile.find({ packingListNumber: user.userId }, function(err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updatePackingList(id, bene, callback) {
    packingListFile.updateOne({
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
    addPackingListFile: addPackingListFile,
    getPackingList: getPackingList,
    getSinglePackingList: getSinglePackingList,
    updatePackingList: updatePackingList,
};
