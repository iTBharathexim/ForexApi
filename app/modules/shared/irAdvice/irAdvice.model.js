const irAdviceFile = require("../../projects/models/irAdvice.model").irAdviceModel;
const MasterModel = require('../masterFile/master.model');

function addIrAdviceFile(project, callback) {
    irAdviceFile.create(project, (err, res) => {
        if (err) {

            callback(err, null);
        } else if (res) {

            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getIrAdvice(user, callback) {
    irAdviceFile.find({ userId: user.userId, file: user?.filetype }).populate('pipo').populate('sbNo').sort({ '_id': -1 }).exec(function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {

            callback(null, user);
        } else {
            callback(null, null);
        }

    });
}

function getIrOrAdvice(user, callback) {
    let filter = user?.file != 'import' ? { buyerName: [user.partyName] } : { beneficiaryName: [user.partyName] }
    irAdviceFile.find({ userId: user.userId, file: user?.file, ...filter }).populate('pipo').populate('sbNo').sort({ '_id': -1 }).exec(function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {

            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getOneIrAdvice(project, callback) {
    irAdviceFile.findOne({
        _id: "6059ba551bb7562f8abb4421"
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

function updateIrAdvice(id, project, callback) {
    if (id != null && id != undefined) {
        irAdviceFile.updateOne({
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
    } else {
        irAdviceFile.insertMany(project, function (err, user) {
            if (err) {
                callback(err, null);
            } else if (user) {

                callback(null, user);
            } else {
                callback(null, null);
            }
        });
    }

}

function updateIrAdviceByIrAdvice(id, project, callback) {
    irAdviceFile.updateOne({
        billNo: id
    }, { $set: project }, { upsert: true }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {

            callback(null, user);
        } else {
            callback(null, null);
        }

    }); i
}

function getIrAdviceByIrAdvice(user, callback) {
    irAdviceFile.findOne({ billNo: user.billNo, userId: user.userId }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getIrAdviceByBillNo(user, callback) {
    irAdviceFile.find({ billNo: user.billNo, userId: user.userId }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }

    });
}

async function updateIrAdviceByIr(id, project, userId, callback) {
    var updateMasterBySb = async (sbId, irID, callback) => {
        updateShippingBillWithIR = async (data) => {
            let irRef = data.irRef;
            let removeDup = {};
            removeDup[irID] = true;
            for (let i in irRef) {
                removeDup[i] = true;
            }
            irRef = [];
            for (let i in removeDup) {
                irRef.push(i);
            }
            data.irRef = irRef;
            var def = new Promise((resolve, reject) => {
                MasterModel.updateMaster(sbId, data, (data) => {
                    resolve(data);
                });
            });
            return def.promise;
        }
        return new Promise((resolve, reject) => {
            MasterModel.getOneMaster({ id: sbId }, async (err, data) => {
                if (err) {
                    resolve(false);
                } else if (data && data._id) {
                    await updateShippingBillWithIR(data);
                    resolve(true);
                }
            });
        });
    }
    var list = [];
    for (let i in project.sbNo) {
        list.push(updateMasterBySb(project.sbNo[i], id));
    }
    var result = await Promise.all(list).then(success => {

    })
    irAdviceFile.updateOne({
        userId: userId,
        billNo: id
    }, project, { multi: true, upsert: true }, function (err, user) {

        if (err) {

            callback(err, null);
        } else if (user) {

            callback(null, user);
        } else {
            callback(null, null);
        }

    });
}

const getInwardbasedOnNumberAndcurrency = async (req, res) => {
    try {
        let currencyWiseImportData = await irAdviceFile.aggregate([
            { $match: { "file": "import", userId: req.user[0].companyId } },
            {
                $group: {
                    _id: '$currency',
                    totalItems: { $sum: 1 },
                    "totalAmount": {
                        "$sum": {
                            "$toDouble": "$amount",
                        }
                    }
                }
            }
        ])
        let currencyWiseExportData = await irAdviceFile.aggregate([
            { $match: { "file": "export", userId: req.user[0].companyId } },
            {
                $group: {
                    _id: '$currency',
                    totalItems: { $sum: 1 },
                    "totalAmount": {
                        "$sum": {
                            "$toDouble": "$amount",
                        }
                    }

                }
            }
        ])

        let buyerWiseExportData = await irAdviceFile.aggregate([
            { $match: { "file": "export", userId: req.user[0].companyId } },
            {
                $group: {
                    _id: '$partyName',
                    totalItems: { $sum: 1 },
                    value: { $addToSet: { currency: '$currency', amount: { $toDouble: '$amount' } } }
                }
            }
        ])

        let buyerWiseImportData = await irAdviceFile.aggregate([
            { $match: { "file": "import", userId: req.user[0].companyId } },
            {
                $group: {
                    _id: '$partyName',
                    totalItems: { $sum: 1 },
                    value: { $addToSet: { currency: '$currency', amount: { $toDouble: '$amount' } } }

                }
            }
        ])

        buyerWiseExportData = buyerWiseExportData.map((data) => {
            let result = [];
            data.value.filter(x => x.currency).reduce(function (res, value) {
                if (!res[value.currency]) {
                    res[value.currency] = { currency: value.currency, amount: 0 };
                    result.push(res[value.currency])
                }
                res[value.currency].amount += parseFloat(value.amount);
                return res;
            }, {});
            return { ...data, convertData: result }
        })
        buyerWiseImportData = buyerWiseImportData.map((data) => {
            let result = [];
            data.value.filter(x => x.currency).reduce(function (res, value) {
                if (!res[value.currency]) {
                    res[value.currency] = { currency: value.currency, amount: 0 };
                    result.push(res[value.currency])
                }
                res[value.currency].amount += parseFloat(value.amount);
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
        let data = { import: importData, export: exportData }
        return data
    } catch (err) {
        return err
    }
}


const getTotalInwardRemitances = async (req, res) => {
    try {
        let exportData = {}
        let totalExportCount = await irAdviceFile.count({ userId: req.user[0].companyId, file: "export", AvailableAmount: "-1" })
        let exportInward = await irAdviceFile.aggregate([
            { $match: { userId: req.user[0].companyId, file: "export", AvailableAmount: "-1" } },
            {
                $group: {
                    _id: null,
                    pendingCount: { $sum: 1 },
                    toTalAmount: {
                        $sum: { $toDouble: "$amount" }
                    },
                }
            }
        ])

        exportData = { totalCount: totalExportCount, exportInwardData: exportInward }
        let importData = {}
        let totalImportCount = await irAdviceFile.count({ userId: req.user[0].companyId, file: "import", AvailableAmount: "-1" })
        let importAmount = await irAdviceFile.aggregate([
            { $match: { userId: req.user[0].companyId, file: "import", AvailableAmount: "-1" } },
            {
                $group: {
                    _id: null,
                    pendingCount: { $sum: 1 },
                    toTalAmount: {
                        $sum: { $toDouble: "$amount" }
                    },
                }
            }
        ])
        importData = { totalCount: totalImportCount, importInwardData: importAmount }
        return { import: importData, export: exportData }
    } catch (err) {
        return err
    }
}

const getInwarByPipo = async (pipoNumber) => {
    let data = await irAdviceFile.find({ pipo: pipoNumber })
    return data
}
const getByIdBillNo = async (pipoNumber) => {

    let data = await irAdviceFile.find({ billNo: pipoNumber })
    return data
}

module.exports = {
    addIrAdviceFile: addIrAdviceFile,
    getIrAdvice: getIrAdvice,
    getOneIrAdvice: getOneIrAdvice,
    updateIrAdvice: updateIrAdvice,
    updateIrAdviceByIrAdvice: updateIrAdviceByIrAdvice,
    getIrAdviceByIrAdvice: getIrAdviceByIrAdvice,
    getIrAdviceByBillNo: getIrAdviceByBillNo,
    updateIrAdviceByIr: updateIrAdviceByIr,
    getInwardbasedOnNumberAndcurrency: getInwardbasedOnNumberAndcurrency,
    getTotalInwardRemitances: getTotalInwardRemitances,
    getInwarByPipo: getInwarByPipo,
    getByIdBillNo: getByIdBillNo,
    getIrOrAdvice: getIrOrAdvice
};
