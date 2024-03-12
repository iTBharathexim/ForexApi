const swiftCopyFile = require("../../projects/models/swift.model");

function addSwiftFile(project, callback) {
    swiftCopyFile.create(project.swift, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {

            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}
function getSwift(user, callback) {
    swiftCopyFile.find({ userId: user.userId, file: user.filetype }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    }).populate('pipo');
}
function getSingleSwift(user, callback) {
    swiftCopyFile.find({ swiftCopyNumber: user.userId }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {

            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}
function updateSwift(id, bene, callback) {
    swiftCopyFile.updateOne({
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
    addSwiftFile: addSwiftFile,
    getSingleSwift: getSingleSwift,
    getSwift: getSwift,
    updateSwift: updateSwift,
};
