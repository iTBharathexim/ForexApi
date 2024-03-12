const thirdPartyFile = require("../../projects/models/thirdParty.model");

function addThirdFile(project, callback) {
    thirdPartyFile.create(project.third, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {

            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}
async function getThird(user, callback) {
    var temp = ['0', '-1'];
    var DATA = [];
    for (let index = 0; index < temp.length; index++) {
        const element = temp[index];
        await thirdPartyFile.find({ userId: user.userId, deleteflag: element }).populate('pipo').sort({'_id': -1}).then((getuser) => {
            if (getuser.length != 0) {
                for (let j = 0; j < getuser.length; j++) {
                    DATA.push(getuser[j]);
                }
            }
            if ((index + 1) == temp.length) {
                callback(null, DATA);
            }
        });
    }
}

function getSingleThird(user, callback) {
    thirdPartyFile.find({ thirdNumber: user.userId }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateThird(id, bene, callback) {
    thirdPartyFile.updateOne({
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
    addThirdFile: addThirdFile,
    getThird: getThird,
    getSingleThird: getSingleThird,
    updateThird: updateThird,
};
