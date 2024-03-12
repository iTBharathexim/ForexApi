const edpmsFile = require("../../projects/models/edpms.model").edpms;
var mongoose = require('mongoose');

async function addEdpms(project, callback) {
    var promises = [];
    comparedata(project.userId, project?.data, project?.type).then((comparedatares) => {
        
        for (let i = 0; i < project?.data?.length; i++) {
            let element = project?.data[i];
            if (element.sbNo != null && element.sbNo != undefined && element.sbNo != '') {
                delete element?.sbdata
                delete element?.isActive
                element['uploaddata'] = JSON.stringify(element);
                try {
                    getEdpmsQuery({ sbNo: element.sbNo, adCode: element?.adCode, userId: project.userId }, (err, data) => {
                        if (data?.length == 0) {
                            edpmsFile.create(element, function (err, data) { });
                        } else {
                            edpmsFile.updateOne({ _id: mongoose.Types.ObjectId(data[0]?._id) }, { $set: element }, function (err, data2) {
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
                edpmsFile.updateOne({ _id: mongoose.Types.ObjectId(element?._id) }, { $set: { cleared: 'cleared' } }, function (err, data) { })
            });
            await getEdpms({ userId: project.userId, limit: project?.data?.length }, function (err, user) {
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

function getEdpms(user, callback) {
    edpmsFile.find({ userId: user.userId, cleared: 'not-cleared' }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {

            callback(null, user);
        } else {
            callback(null, null);
        }
    }).sort({ sbNo: -1 }).limit(user?.limit);
}

function getEdpmsQuery(user, callback) {
    edpmsFile.find(user, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {

            callback(null, user);
        } else {
            callback(null, null);
        }
    }).sort({ sbNo: -1 })
}

function getEdpmsAll(user, callback) {
    edpmsFile.find({ userId: user.userId, cleared: 'not-cleared' }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    }).countDocuments();
}

function getEdpmsCleared(user, callback) {
    edpmsFile.find({ userId: user.userId, cleared: 'cleared' }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    }).sort({ sbNo: -1 }).limit(user?.limit);
}

function getEdpmsAllCleared(user, callback) {
    edpmsFile.find({ userId: user.userId, cleared: 'cleared' }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    }).countDocuments();
}

function getOneEdpms(ID, callback) {
    edpmsFile.findOne({
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

function updateEdpms(id, project, callback) {
    edpmsFile.updateOne({
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

function updateEdpmsByEdpms(id, project, callback) {
    irAdviceFile.updateOne({
        sbNo: id
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

function getEdpmsByEdpms(user, callback) {
    edpmsFile.findOne({ sbNo: user.sbNo, userId: user.userId }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getEdpmsBySbno(user, callback) {
    edpmsFile.find({ sbNo: user.sbNo, userId: user.userId }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

const getEDPMSData = async (req, res) => {
    try {
        let data = {}
        let totalEDPMSEntries = await edpmsFile.count({ userId: req.user[0].companyId })
        let uploadData = await edpmsFile.aggregate([
            { $match: { userId: req.user[0].companyId } },
            {
                $lookup:
                {
                    from: "masterrecord",
                    localField: "sbNo",
                    foreignField: "sbno",
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

        let pendingData = await edpmsFile.aggregate([
            { $match: { userId: req.user[0].companyId } },
            {
                $lookup:
                {
                    from: "masterrecord",
                    localField: "sbNo",
                    foreignField: "sbno",
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
        data = { totalEDPMSEntries: totalEDPMSEntries, uploadData: uploadData, pendingData: pendingData }
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
                            if (!res?.includes(element?.sbNo)) {
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
                            if (!res?.includes(element?.sbNo)) {
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
            if (!temp.includes((element['sbNo'])?.toString()?.toLowerCase())) {
                await temp.push(element['sbNo'])
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
    addEdpms: addEdpms,
    getEdpms: getEdpms,
    updateEdpms: updateEdpms,
    getOneEdpms: getOneEdpms,
    updateEdpmsByEdpms: updateEdpmsByEdpms,
    getEdpmsByEdpms: getEdpmsByEdpms,
    getEdpmsBySbno: getEdpmsBySbno,
    getEDPMSData: getEDPMSData,
    getEdpmsAll: getEdpmsAll,
    getEdpmsCleared: getEdpmsCleared,
    getEdpmsAllCleared: getEdpmsAllCleared,
    getEdpmsQuery: getEdpmsQuery
};
