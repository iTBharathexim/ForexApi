const postMasterFile = require("../../projects/models/masterFile.model").MasterModel;
const boeFile = require("../../projects/models/boefile.model").BoeModel;

function addMasterFile(project, callback) {
    postMasterFile.create(project, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

async function getMaster(user, callback) {
    await postMasterFile.find({ userId: user.userId, file: user?.filetype, $or: [{ "deleteflag": '0' }, { "deleteflag": '-1' }] }).populate('pipo')
        .populate({
            path: 'pipo',
            populate: {
                path: 'airwayBlCopyRef'
            }
        }).populate({
            path: 'pipo',
            populate: {
                path: 'commercialRef'
            },
            populate: {
                path: 'AdviceRef'
            }
        }).populate('blcopydetails').
        populate('blcopyRef').
        populate('commercialdetails').
        populate({
            path: 'commercialdetails',
            populate: {
                path: 'IRM_REF'
            }
        }).
        populate('packingdetails').
        populate('debitnotedetails').sort({ '_id': -1 }).then((getuser) => {
            callback(null, getuser);
        });
}

async function getMasterbuyerName(user, callback) {
    await postMasterFile.find({ userId: user.userId, file: user?.filetype, buyerName: user?.buyerName, $or: [{ "deleteflag": '0' }, { "deleteflag": '-1' }] }).populate('pipo')
        .populate({
            path: 'pipo',
            populate: {
                path: 'airwayBlCopyRef'
            }
        }).populate({
            path: 'pipo',
            populate: {
                path: 'commercialRef'
            },
            populate: {
                path: 'AdviceRef'
            }
        }).populate('blcopydetails').
        populate('commercialdetails').
        populate({
            path: 'commercialdetails',
            populate: {
                path: 'IRM_REF'
            }
        }).
        populate('packingdetails').
        populate('debitnotedetails').sort({ '_id': -1 }).then((getuser) => {
            callback(null, getuser);
        });
}

async function getMasterById(user, callback) {
    await postMasterFile.find({ userId: user.userId }).populate('pipo')
        .populate({
            path: 'pipo',
            populate: {
                path: 'airwayBlCopyRef'
            }
        }).populate({
            path: 'pipo',
            populate: {
                path: 'commercialRef'
            },
            populate: {
                path: 'AdviceRef'
            }
        }).populate('blcopydetails').
        populate('commercialdetails').
        populate('packingdetails').
        populate({
            path: 'commercialdetails',
            populate: {
                path: 'IRM_REF'
            }
        }).
        populate('debitnotedetails').then((getuser) => {
            callback(null, getuser);
        });
}

async function getAllMaster(user, callback) {
    await postMasterFile.find({}).populate('pipo')
        .populate({
            path: 'pipo',
            populate: {
                path: 'airwayBlCopyRef'
            }
        }).populate({
            path: 'pipo',
            populate: {
                path: 'commercialRef'
            },
            populate: {
                path: 'AdviceRef'
            }
        }).populate('blcopydetails').
        populate('commercialdetails').
        populate('packingdetails').
        populate({
            path: 'commercialdetails',
            populate: {
                path: 'IRM_REF'
            }
        }).
        populate('debitnotedetails').then((getuser) => {
            callback(null, getuser);
        });
}


function getOneMaster(project, callback) {
    postMasterFile.findOne({
        _id: project.id
    }, function (err, data) {
        if (err) {
            callback(err, null);
        } else if (data) {
            callback(null, data);
        } else {
            callback(null, null);
        }
    });
}

function updateMasterNew(id, project, callback) {
    postMasterFile.updateOne({ _id: id }, { $set: project }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateMasterWeek(id, project, callback) {
    postMasterFile.updateOne({ _id: id }, { $set: project }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}


function updateMasterBySb(project, sbno, id, callback) {
    project.deleteflag = '0';
    postMasterFile.updateOne({
        sbno: sbno,
        userId: id,
    }, { $set: project }, { multi: true, upsert: true }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateMaster(project, sbno, id, callback) {
    project.deleteflag = '0';
    postMasterFile.updateOne({
        sbno: sbno,
        userId: id,
    }, { $set: project }, { multi: true, upsert: true }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getMasterBySb(user, callback) {
    postMasterFile.findOne({ sbno: user.sbno, userId: user.userId }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {

            callback(null, user);
        } else {
            callback(null, null);
        }
    })
}
const getSBDetialsByPIPO = async (pipoNumber) => {
    let pipoDetails = await postMasterFile.find({ pipo: pipoNumber }, { _id: 1, pipo: 1, sbno: 1, sbdate: 1, fobValue: 1, fobCurrency: 1 })
    return pipoDetails
}


const getSBbasedOnNumberAndcurrency = async (req, res) => {
    var data = {}
    try {
        let currencyWiseImportData = await boeFile.aggregate([
            { $match: { "file": "import", userId: req.user[0].companyId, } },
            {
                $group: {
                    _id: '$currency',
                    totalItems: { $sum: 1 },
                    "totalAmount": {
                        "$sum": {
                            "$toDouble": "$invoiceAmount",
                        }
                    }

                }
            }
        ])
        let currencyWiseExportData = await postMasterFile.aggregate([
            { $match: { "file": "export", userId: req.user[0].companyId, } },
            {
                $group: {
                    _id: '$fobCurrency',
                    totalItems: { $sum: 1 },
                    "totalAmount": {
                        "$sum": {
                            "$toDouble": "$fobValue",
                        }
                    }

                }
            }
        ])
        let buyerWiseExportData = await postMasterFile.aggregate([
            { $match: { "file": "export", userId: req.user[0].companyId, } },
            {
                $group: {
                    _id: '$buyerName',
                    totalItems: { $sum: 1 },
                    value: { $addToSet: { currency: '$fobCurrency', amount: '$fobValue' } }

                }
            }
        ])
        let buyerWiseImportData = await boeFile.aggregate([
            { $match: { "file": "import", userId: req.user[0].companyId, } },
            {
                $group: {
                    _id: '$benneName',
                    totalItems: { $sum: 1 },
                    value: { $addToSet: { currency: '$currency', amount: '$invoiceAmount' } }

                }
            }
        ])
        buyerWiseImportData = buyerWiseImportData.map((data) => {
            let result = [];
            data.value.filter(x => x.currency).reduce(function (res, value) {
                
                if (!res[value.currency]) {
                    res[value.currency] = { currency: value.currency, amount: 0 };
                    result.push(res[value.currency])
                }
                res[value.currency].amount += parseInt(value.amount)
                return res;
            }, {});
            return { ...data, convertData: result }
        })
        buyerWiseExportData = buyerWiseExportData.map((data) => {
            let result = [];
            data.value.filter(x => x.currency).reduce(function (res, value) {
                if (!res[value.currency]) {
                    res[value.currency] = { currency: value.currency, amount: 0 };
                    result.push(res[value.currency])
                }
                res[value.currency].amount += parseInt(value.amount)
                return res;
            }, {});
            return { ...data, convertData: result }

        })

        let importData = {
            currencyWise: currencyWiseImportData,
            buyerWise: buyerWiseImportData
        }

        let exportData = {
            currencyWise: currencyWiseExportData,
            buyerWise: buyerWiseExportData
        }

        data = { import: importData, export: exportData }
        return data
    } catch (err) {
        return err
    }
}

const getSBPendingSubmission = async (req, res) => {
    let formDate = new Date()
    let toDate = new Date()
    formDate.setDate(toDate.getDate() + 21)
    let importData = await postMasterFile.aggregate([
        { $match: { balanceAvai: "-1", "file": "import" } },
        {
            $group: {
                _id:  ['$buyerName','$fobCurrency'],
                toTalcount: { $sum: 1 },
                toTalAmount: {
                    "$sum": {
                        "$toInt": "$fobValue",
                    }
                },
            }
        }
    ])
    let exportData = await postMasterFile.aggregate([
        { $match: { balanceAvai: "-1", "file": "export" } },
        {
            $group: {
                _id:  ['$buyerName','$fobCurrency'],
                toTalcount: { $sum: 1 },
                toTalAmount: {
                    "$sum": {
                        "$toInt": "$fobValue",
                    }
                },

            }
        }
    ])

    return { import: importData, export: exportData }
}



module.exports = {
    addMasterFile: addMasterFile,
    getMaster: getMaster,
    getOneMaster: getOneMaster,
    updateMaster: updateMaster,
    updateMasterBySb: updateMasterBySb,
    getMasterBySb: getMasterBySb,
    getSBbasedOnNumberAndcurrency: getSBbasedOnNumberAndcurrency,
    getSBPendingSubmission: getSBPendingSubmission,
    getSBDetialsByPIPO: getSBDetialsByPIPO,
    getAllMaster: getAllMaster,
    updateMasterWeek: updateMasterWeek,
    updateMasterNew: updateMasterNew,
    getMasterById: getMasterById,
    getMasterbuyerName: getMasterbuyerName
};
