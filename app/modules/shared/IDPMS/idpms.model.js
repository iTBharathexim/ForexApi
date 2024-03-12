const IdpmsFile = require("../../projects/models/idpms.model").Idpms;
var mongoose = require('mongoose');

async function addIdpms(project, callback) {
    var promises = [];
    comparedata(project.userId, project?.data, project?.type).then((comparedatares) => {
        
        for (let i = 0; i < project?.data?.length; i++) {
            let element = project?.data[i];
            if (element.boeno != null && element.boeno != undefined && element.boeno != '') {
                delete element?.boedata
                delete element?.isActive
                element['uploaddata'] = JSON.stringify(element);
                try {
                    getEdpmsQuery({ boeno: element.boeno, adCode: element?.adCode, userId: project.userId }, (err, data) => {
                        if (data?.length == 0) {
                            IdpmsFile.create(element, function (err, data) { });
                        } else {
                            IdpmsFile.updateOne({ _id: mongoose.Types.ObjectId(data[0]?._id) }, { $set: element }, function (err, data2) {
                                promises.push(data2)
                            })
                        }
                    })
                } catch (error) {
                    
                }
            }
        }
        Promise.all(promises).then(async (res) => {
            await comparedatares.forEach(element => {
                IdpmsFile.updateOne({ _id: mongoose.Types.ObjectId(element?._id) }, { $set: { cleared: 'cleared' } }, function (err, data) { })
            });
            await getIdpms({ userId: project.userId, limit: project?.data?.length }, function (err, user) {
                if (err) {
                    callback(err, null);
                } else if (user) {
                    callback(null, user);
                } else {
                    callback(null, null);
                }
            })
        }, err => {
            callback(err, null);
        });
    })
}

function getEdpmsQuery(user, callback) {
    IdpmsFile.find(user, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {

            callback(null, user);
        } else {
            callback(null, null);
        }
    }).sort({ sbNo: -1 })
}

function getIdpms(user, callback) {
    IdpmsFile.find({ userId: user.userId, cleared: 'not-cleared' }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {

            callback(null, user);
        } else {
            callback(null, null);
        }
    }).sort({ boeno: -1 }).limit(user?.limit);
}

function getIdpmsAll(user, callback) {
    IdpmsFile.find({ userId: user.userId, cleared: 'not-cleared' }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    }).countDocuments();
}

function getIdpmsCleared(user, callback) {
    IdpmsFile.find({ userId: user.userId, cleared: 'cleared' }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    }).sort({ boe: -1 }).limit(user?.limit);
}

function getIdpmsAllCleared(user, callback) {
    IdpmsFile.find({ userId: user.userId, cleared: 'cleared' }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    }).countDocuments();
}

function getOneIdpms(ID, callback) {
    IdpmsFile.findOne({
        _id: ID
    }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateIdpms(id, project, callback) {
    IdpmsFile.updateOne({
        _id: id
    }, { $set: project }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateIdpmsByIdpms(id, project, callback) {
    irAdviceFile.updateOne({
        boe: id
    }, { $set: project }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getIdpmsByIdpms(user, callback) {
    IdpmsFile.findOne({ boeno: user.boeno, userId: user.userId }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getIdpmsByboe(user, callback) {
    IdpmsFile.find({ boeno: user.boeno, userId: user.userId }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

const getIdpmsData = async (req, res) => {
    try {
        let data = {}
        let totalIdpmsEntries = await IdpmsFile.count({ userId: req.user[0].companyId })
        let uploadData = await IdpmsFile.aggregate([
            { $match: { userId: req.user[0].companyId } },
            {
                $lookup:
                {
                    from: "boerecords",
                    localField: "boeno",
                    foreignField: "boeno",
                    as: "docs"
                }
            },
            {
                $match: {
                    "docs": { "$ne": [] }
                },
            },
            { $group: { _id: null, count: { $sum: 1 } } }
        ])

        if (uploadData.length > 0) {
            uploadData = uploadData[0].count
        }

        let pendingData = await IdpmsFile.aggregate([
            { $match: { userId: req.user[0].companyId } },
            {
                $lookup:
                {
                    from: "boerecords",
                    localField: "boeno",
                    foreignField: "boeno",
                    as: "docs"
                }
            },
            {
                $match: {
                    "docs": { "$eq": [] }
                },
            },
            { $group: { _id: null, count: { $sum: 1 } } }
        ])
        if (pendingData.length > 0) {
            pendingData = pendingData[0].count
        }
        data = { totalIdpmsEntries: totalIdpmsEntries, uploadData: uploadData, pendingData: pendingData }
        return data
    } catch (err) {
    }
}

function comparedata(userId, project, type) {
    return new Promise(async (resolve, reject) => {
        await getAllSBExcelSheet(project).then(async (res) => {
            
            if (res?.length != 0) {
                let temp = [];
                if (type === "All") {
                    await getEdpmsQuery({ userId: userId, cleared: 'not-cleared' }, async function (err, user) {
                        for (let index = 0; index < user?.length; index++) {
                            const element = user[index];
                            if (!res?.includes(element?.boeno)) {
                                temp.push(element)
                            }
                            if ((index + 1) == user?.length) {
                                resolve(temp);
                            }
                        }
                        if (user?.length == 0) {
                            resolve([])
                        }
                    })
                } else {
                    await getEdpmsQuery({ userId: userId, adCode: project[0]?.adCode,cleared: 'not-cleared' }, async function (err, user) {
                        for (let index = 0; index < user?.length; index++) {
                            const element = user[index];
                            if (!res?.includes(element?.boeno)) {
                                temp.push(element)
                            }
                            if ((index + 1) == user?.length) {
                                resolve(temp);
                            }
                        }
                        if (user?.length == 0) {
                            resolve([])
                        }
                    })
                }
            } else {
                await resolve([])
            }
        })
    });
}

async function getAllSBExcelSheet(data) {
    var temp = [];
    return new Promise(async (resolve, reject) => {
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            if (!temp.includes((element['boeno'])?.toString()?.toLowerCase())) {
                await temp.push(element['boeno'])
            }
            if ((index + 1) == data.length) {
                await resolve(temp);
            }
        }
        if (data.length == 0) {
            await resolve([]);
        }
    })
}

module.exports = {
    addIdpms: addIdpms,
    getIdpms: getIdpms,
    updateIdpms: updateIdpms,
    getOneIdpms: getOneIdpms,
    updateIdpmsByIdpms: updateIdpmsByIdpms,
    getIdpmsByIdpms: getIdpmsByIdpms,
    getIdpmsByboe: getIdpmsByboe,
    getIdpmsData: getIdpmsData,
    getIdpmsAll: getIdpmsAll,
    getIdpmsCleared: getIdpmsCleared,
    getIdpmsAllCleared: getIdpmsAllCleared
};