const buyerFile = require("../../projects/models/buyer.model").BuyerModel;
function addBuyerFile(project, callback) {
    // 
    buyerFile.create(project.buyer, (err, res) => {
        if (err) {

            callback(err, null);
        } else if (res) {

            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getBuyer(user, callback) {
    buyerFile.find({ userId: user.userId }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getSingleBuyer(user, callback) {
    buyerFile.find({ _id: user.userId }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {

            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getBuyerByName(name, callback) {
    buyerFile.findOne({ buyerName: name.buyerName }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {

            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateBuyer(id, buyer, callback) {
    buyerFile.updateOne({ _id: id, }, { $set: buyer },
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

function DeleteBuyer(id, callback) {
    buyerFile.deleteOne({ _id: id }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

module.exports = {
    addBuyerFile: addBuyerFile,
    getBuyer: getBuyer,
    getSingleBuyer: getSingleBuyer,
    updateBuyer: updateBuyer,
    getBuyerByName: getBuyerByName,
    DeleteBuyer: DeleteBuyer
};
