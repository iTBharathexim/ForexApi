const pipoFile = require("../../projects/models/PI_PO.model");
const insuranceFile = require("../../projects/models/insurance.model");
const MasterModel = require("../../projects/models/masterFile.model").MasterModel;
var ObjectId = require('mongoose').Types.ObjectId;
var mongoose = require('mongoose');
const boeFile = require("../../projects/models/boefile.model").BoeModel;

function addPipoFile(project, callback) {
    pipoFile.create(project.pipo, (err, res) => {
        if (err) {
            
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}


async function getPipo(user, callback) {
    const callBackFunc = async (err, receiver) => {
        if (err) {
            callback(err, null);
        } else if (receiver) {
            callback(null, receiver);
        } else {
            callback(null, null);
        }
    }
    await pipoFile.find({ userId: user.userId, file: user?.filetype, $or: [{ "deleteflag": '0' }, { "deleteflag": '-1' }] }).
        populate('TransactionRef')
        .populate('lcRef')
        .populate('debitNoteRef')
        .populate('creditNoteRef')
        .populate('packingListRef')
        .populate('MasterServiceRef')
        .populate('billOfExchangeRef')
        .populate('destructionRef')
        .populate('commercialRef')
        .populate('airwayBlCopyRef')
        .populate('insuranceRef')
        .populate('SwiftCopyRef')
        .populate('sbRef')
        .populate('ebrcRef')
        .populate('boeRef')
        .populate('tryPartyAgreementRef')
        .populate('opinionReportRef')
        .populate('blcopyRefs')
        .populate('AdviceRef')
        .populate({
            path: 'sbRef',
            populate: {
                path: 'irRef'
            }
        }).populate({
            path: 'commercialRef',
            populate: {
                path: 'sbRef'
            }
        }).populate({
            path: 'commercialRef',
            populate: {
                path: 'pipo'
            }
        }).sort({ '_id': -1 }).exec(callBackFunc);
}

async function getPipoNo(user, callback) {
    const callBackFunc = async (err, receiver) => {
        if (err) {
            callback(err, null);
        } else if (receiver) {
            callback(null, receiver);
        } else {
            callback(null, null);
        }
    }
    await pipoFile.find({
        userId: user.userId, file: user?.filetype,
        $or: [{ "deleteflag": '0' }, { "deleteflag": '-1' }]
    },
        { _id: 1, pi_poNo: 1, buyerName: 1, benneName: 1, file: 1, createdAt: 1 }).exec(callBackFunc)
}

async function getPipoNoCustom(user, callback) {
    const callBackFunc = async (err, receiver) => {
        if (err) {
            callback(err, null);
        } else if (receiver) {
            callback(null, receiver);
        } else {
            callback(null, null);
        }
    }
    let query = user?.query;
    query['userId'] = user.userId
    query['file'] = user?.filetype
    query['$or'] = [{ "deleteflag": '0' }, { "deleteflag": '-1' }]
    await pipoFile.find(query, { _id: 1, pi_poNo: 1, buyerName: 1, benneName: 1, file: 1, createdAt: 1 }).exec(callBackFunc)
}

function getSinglePipo(data, callback) {
    const callbackFunc = (err, user) => {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    }
    if (ObjectId.isValid(data?.id)) {
        pipoFile.find({ _id: data?.id, userId: data?.userId })
            .populate('lcRef')
            .populate('debitNoteRef')
            .populate('creditNoteRef')
            .populate('packingListRef')
            .populate('MasterServiceRef')
            .populate('billOfExchangeRef')
            .populate('destructionRef')
            .populate('commercialRef')
            .populate('airwayBlCopyRef')
            .populate('insuranceRef')
            .populate('sbRef')
            .populate('boeRef')
            .populate('SwiftCopyRef')
            .populate('ebrcRef')
            .populate('blcopyRefs')
            .populate('tryPartyAgreementRef')
            .populate('opinionReportRef')
            .populate('AdviceRef')
            .populate({
                path: 'sbRef',
                populate: {
                    path: 'irRef'
                }
            })
            .exec(callbackFunc);
    } else {
        pipoFile.find({ pi_poNo: id, userId: data?.userId })
            .populate('lcRef')
            .populate('debitNoteRef')
            .populate('creditNoteRef')
            .populate('packingListRef')
            .populate('MasterServiceRef')
            .populate('billOfExchangeRef')
            .populate('destructionRef')
            .populate('commercialRef')
            .populate('airwayBlCopyRef')
            .populate('insuranceRef')
            .populate('sbRef')
            .populate('boeRef')
            .populate('SwiftCopyRef')
            .populate('ebrcRef')
            .populate('blcopyRefs')
            .populate('tryPartyAgreementRef')
            .populate('opinionReportRef')
            .populate('AdviceRef')
            .populate({
                path: 'sbRef',
                populate: {
                    path: 'irRef'
                }
            })
            .exec(callbackFunc);
    }
}

function updatePipo(id, bene, callback) {
    
    pipoFile.updateOne({ _id: id, }, { $set: bene }, function (err, user) {
        if (err) {
            callback(err, null);
            throw err;
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateSinglePipo(id, file, doc, callback) {
    pipoFile.updateOne({ _id: id }, {
        [file]: doc
    }, { multi: true },
        function (err, numberAffected) {
            if (err) {
                callback(err, null);
            } else if (numberAffected) {
                callback(null, numberAffected);
            } else {
                callback(null, null);
            }
        });
}

function updateManyPipo(pipo, file, doc, data, userId, callback) {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let advanceOutwardDate = `${day}-${month}-${year}`;
    let billUnderDate = `${day}-${month}-${year}`;
    if (file == 'advanceOutward') {
        pipoFile.updateMany({ pi_poNo: { $in: pipo } }, {
            $set: {
                [file]: doc,
                ['advanceOutwardDate']: advanceOutwardDate
            }
        }, { multi: true },
            function (err, records) {
                if (err) {
                    callback(err, null);
                } else if (records) {
                    callback(null, records);
                } else {
                    callback(null, null);
                }
            });
    } else if (file == 'billUnder') {
        pipoFile.updateMany({ pi_poNo: { $in: pipo } }, {
            $set: {
                [file]: doc,
                ['billUnderDate']: billUnderDate
            }
        }, { multi: true },
            function (err, records) {
                if (err) {

                    callback(err, null);
                } else if (records) {
                    callback(null, records);
                } else {
                    callback(null, null);
                }
            });
    } else {
        let temp = {};
        let listofupdates = [
            "lcRef",
            "sbRef",
            "debitNoteRef",
            "creditNoteRef",
            "packingListRef",
            "MasterServiceRef",
            "billOfExchangeRef",
            "destructionRef",
            "commercialRef",
            "airwayBlCopyRef",
            "insuranceRef",
            "swiftCopyRef",
            "ebrcRef",
            "tryPartyAgreementRef",
            "opinionReportRef",
            "blcopyRefs",
            "TransactionRef",
            "AdviceRef",
            "boeRef",
            "CertificateofOriginRef",
            "InwardRemittanceTracker",
            'balanceAmount']
        for (let i in listofupdates) {
            if (data[listofupdates[i]]) {
                temp[listofupdates[i]] = data[listofupdates[i]];
            }
        }
        pipoFile.find({ _id: { $in: pipo }, userId: userId }, function (err, values) {
            var operations = [];
            values.forEach(eachPipo => {
                let newvalues = {};
                for (let i in temp) {
                    if (!newvalues[i]) {
                        newvalues[i] = [];
                    }
                    if (eachPipo[i]) {
                        newvalues[i] = eachPipo[i];
                        for (let j in temp[i]) {
                            newvalues[i].push(temp[i][j]);
                        }
                        let removeduplicates = {};
                        for (let k in newvalues[i]) {
                            removeduplicates[newvalues[i][k]] = newvalues[i][k];
                        }
                        let removedDuplicates = [];
                        for (let l in removeduplicates) {
                            removedDuplicates.push(removeduplicates[l]);
                        }
                        newvalues[i] = removedDuplicates;
                    }
                }
                operations.push(pipoFile.updateOne({
                    _id: eachPipo._id,
                }, {
                    [file]: doc,
                    ...newvalues,
                }, { multi: true }));

            });
            Promise.all(operations).then((records) => {
                if (records) {
                    callback(null, records);
                } else {
                    callback(null, null);
                }
            }, (error) => {
                if (error) {
                    callback(error, null);
                }
            });
        })
    }

}

function updateManyPipo1(pipo, file, callback) {
    pipoFile.updateMany({ pi_poNo: { $in: pipo } }, { $set: file }, { multi: true },
        function (err, records) {
            if (err) {
                callback(err, null);
            } else if (records) {
                callback(null, records);
            } else {
                callback(null, null);
            }
        });
}

function getManyPipo(pipo, id, callback) {
    pipoFile.find({
        pi_poNo: {
            $in: pipo
        },
        userId: id
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

function getPipoByBene(user, callback) {
    pipoFile.find({ benneName: user.beneName, userId: user.userId }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }

    });
}


const getPipobasedOnNumberAndcurrency = async (req, res) => {
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
        let currencyWiseExportData = await pipoFile.aggregate([
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

        let buyerWiseExportData = await pipoFile.aggregate([
            { $match: { "file": "export", userId: req.user[0].companyId, } },
            {
                $group: {
                    _id: '$buyerName',
                    totalItems: { $sum: 1 },
                    value: { $addToSet: { currency: '$currency', amount: { $toDouble: "$amount" } } }
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
                res[value.currency].amount = parseFloat(res[value.currency].amount) + parseFloat(value.amount);
                
                return res;
            }, {});
            return { ...data, convertData: result }
        })

        // 

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

const Orderpendingforshipment = async (req, res) => {
    var data = {}
    try {
        let totalImportEntries = await pipoFile.count({ "file": "import", userId: req.user[0].companyId, boeRef: [] })
        let currencyWiseImportData = await pipoFile.aggregate([
            { $match: { "file": "import", userId: req.user[0].companyId, boeRef: [] } },
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
        let totalExportEntries = await pipoFile.count({ "file": "export", userId: req.user[0].companyId, sbRef: [] })
        let currencyWiseExportData = await pipoFile.aggregate([
            { $match: { "file": "export", userId: req.user[0].companyId, sbRef: [] } },
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
        data = {
            import: { count: totalImportEntries, ImportData: currencyWiseImportData },
            export: { count: totalExportEntries, ImportData: currencyWiseExportData }
        }
        return data
    } catch (err) {
        return err
    }
}
const getAllExcelDownloaddata = async (req, res) => {
    var data = {}
    try {
        let currencyWiseImportData = await pipoFile.aggregate([
            { $match: { "file": "export", userId: req.user[0].companyId } },
            {
                "$group": {
                    _id: '$currency',
                    value: { $addToSet: { currency: '$currency', amount: '$amount', buyerName: '$buyerName' } },
                }
            }
        ]);
        data = [];
        for (let index = 0; index < currencyWiseImportData.length; index++) {
            currencyWiseImportData[index]['value'].forEach(element => {
                data.push(element)
            });
        }
        return { data: data }
    } catch (err) {
        return err
    }
}



const getOrderPendingforShipment = async (req, res) => {
    let currentDate = new Date()
    let fromDate = new Date()
    let toDate = new Date()

    if (req.query.filtertype === 'Day') {
        fromDate.setDate(currentDate.getDate() - 1)
    } else if (req.query.filtertype === 'Week') {
        fromDate.setDate(currentDate.getDate() - 7)
    } else if (req.query.filtertype === 'Month') {
        fromDate.setMonth(currentDate.getMonth() - 1)
    } else if (req.query.filtertype === 'Financial Quarter') {
        fromDate.setMonth(currentDate.getMonth() - 3)
    } else if (req.query.filtertype === 'Year') {
        fromDate.setFullYear(currentDate.getFullYear() - 1)
    }

    try {
        let exportData = {}
        let shippingExportFullData = await pipoFile.aggregate([
            { $match: { "file": "export" } },
            {
                $lookup:
                {
                    from: "masterrecord",
                    localField: "pi_poNo",
                    foreignField: "pipo",
                    as: "shippingFullData"
                }
            },
            {
                $match: {
                    "shippingFullData": { "$eq": [] }
                },
            },
            { $group: { _id: null, count: { $sum: 1 } } }
        ])

        let shippingExportPartialData = await pipoFile.aggregate([
            { $match: { "file": "export" } },
            {
                $lookup:
                {
                    from: "masterrecord",
                    localField: "pi_poNo",
                    foreignField: "pipo",
                    as: "shippingPartialData"
                }
            },
            {
                $match: {
                    "shippingPartialData": { "$ne": [] }
                }
            },
            {
                $match: {
                    "shippingPartialData.createdAt": { $gt: fromDate, $lt: toDate }
                }
            },

        ]).project({ "pi_poNo": 1, "shippingPartialData": 1, 'amount': 1, })

        if (shippingExportFullData.length > 0) {
            shippingExportFullData = shippingExportFullData[0].count
            exportData.fullCount = shippingExportFullData
        }
        exportData.pendingCount = shippingExportPartialData.length
        exportData.partialData = shippingExportPartialData
        let importData = {}
        let shippingImportFullData = await boeFile.aggregate([
            { $match: { "file": "import" } },
            {
                $lookup:
                {
                    from: "masterrecord",
                    localField: "pi_poNo",
                    foreignField: "pipo",
                    as: "shippingFullData"
                }
            },
            {
                $match: {
                    "shippingFullData": { "$eq": [] }
                },
            },
            { $group: { _id: null, count: { $sum: 1 } } }
        ])

        let shippingImportPartialData = await boeFile.aggregate([
            { $match: { "file": "import" } },
            {
                $lookup:
                {
                    from: "masterrecord",
                    localField: "pi_poNo",
                    foreignField: "pipo",
                    as: "shippingPartialData"
                }
            },
            {
                $match: {
                    "shippingPartialData": { "$ne": [] }
                }
            }
            , {
                $match: {
                    "shippingPartialData.createdAt": { $gt: fromDate, $lt: toDate }
                }
            }
        ]).project({ "pi_poNo": 1, "shippingPartialData": 1, 'amount': 1, })
        shippingImportPartialData = shippingImportPartialData.filter((data) => data.amount > data.shippingPartialData[0].fobValue)
        if (shippingImportFullData.length > 0) {
            shippingImportFullData = shippingImportFullData[0].count
            importData.fullCount = shippingImportFullData
        } else {
            importData.fullCount = 0
        }
        importData.pendingCount = shippingImportPartialData.length
        importData.partialData = shippingImportPartialData
        return { import: importData, export: exportData }
    } catch (error) {
    }
}


const getPipos = async (req, res) => {
    const { limit, offset } = getPagination(req.query.page, 100);
    let filter = {}
    let filter2 = {}
    if (req.query.buyer && req.query.buyer !== '') {
        filter = { ...filter, "buyerName": req.query.buyer }
        filter2 = { ...filter, "buyerName": req.query.buyer }
    }
    if (req.query.type && req.query.type !== '') {
        filter = { ...filter, "file": req.query.type }
        filter2 = { ...filter, "file": req.query.type }
    }
    if (req.query.location && req.query.location !== '') {
        filter = { ...filter, "location": req.query.location }
        filter2 = { ...filter, "location": req.query.location }
    }

    if (req.query.commodity && req.query.commodity !== '') {
        filter = { ...filter, "commodity": req.query.commodity }
        filter2 = { ...filter, "commodity": req.query.commodity }
    }
    filter = { ...filter, userId: req.user[0].companyId, deleteflag: '0' }
    filter2 = { ...filter2, userId: req.user[0].companyId, deleteflag: '-1' }
    let data1 = await pipoFile.paginate(filter, { offset, limit, sort: { _id: -1 } })
    let data2 = await pipoFile.paginate(filter2, { offset, limit, sort: { _id: -1 } })
    for (let index = 0; index < data1.docs.length; index++) {
        data2.docs.push(data1.docs[index]);
    }
    return data2;
}

const getPipoByid = async (req, res) => {
    let data = await pipoFile.findOne({ _id: req.params.id, deleteflag: 0 })
    return data
}

const deletePIPOByid = async (req, res) => {
    let data = await pipoFile.deleteOne({ _id: req.params.id })
    return data
}

const deleteflag = async (req, res) => {
    let data = await pipoFile.updateOne({ _id: req.body.id }, { $set: { deleteflag: '-1', StatusApproval: 'Pending' } })
    return data
}


const updatePipoByid = async (req, res) => {
    let data = await pipoFile.updateOne({ _id: req.params.id }, { $set: req.body })
    return data
}
const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};


const getPipoByCustomer = async (req, res) => {
    var data = '';
    if (req.file == 'import') {
        data = await pipoFile.find({ userId: req.userId, deleteflag: req.deleteflag, file: req.file, benneName: req.benneName }).populate('debitNoteRef')
            .populate('creditNoteRef')
            .populate('packingListRef')
            .populate('MasterServiceRef')
            .populate('billOfExchangeRef')
            .populate('destructionRef')
            .populate('commercialRef')
            .populate('airwayBlCopyRef')
            .populate('insuranceRef')
            .populate('sbRef')
            .populate('boeRef')
            .populate('SwiftCopyRef')
            .populate('ebrcRef')
            .populate('blcopyRefs')
            .populate('tryPartyAgreementRef')
            .populate('opinionReportRef')
            .populate('AdviceRef')
            .populate({
                path: 'sbRef',
                populate: {
                    path: 'irRef'
                }
            })
    }
    else {
        data = await pipoFile.find({ userId: req.userId, deleteflag: req.deleteflag, file: req.file, buyerName: req.benneName }).populate('debitNoteRef')
            .populate('creditNoteRef')
            .populate('packingListRef')
            .populate('MasterServiceRef')
            .populate('billOfExchangeRef')
            .populate('destructionRef')
            .populate('commercialRef')
            .populate('airwayBlCopyRef')
            .populate('insuranceRef')
            .populate('sbRef')
            .populate('boeRef')
            .populate('SwiftCopyRef')
            .populate('ebrcRef')
            .populate('blcopyRefs')
            .populate('tryPartyAgreementRef')
            .populate('opinionReportRef')
            .populate('AdviceRef')
            .populate({
                path: 'sbRef',
                populate: {
                    path: 'irRef'
                }
            })
    }
    return data;
}

const getPipoByType = async (req, res) => {
    let data = await pipoFile.find({ userId: req.userId, deleteflag: req.deleteflag, file: req.filetype }, { "pi_poNo": 1, "_id": 1 }).populate('debitNoteRef')
        .populate('creditNoteRef')
        .populate('packingListRef')
        .populate('MasterServiceRef')
        .populate('billOfExchangeRef')
        .populate('destructionRef')
        .populate('commercialRef')
        .populate('airwayBlCopyRef')
        .populate('insuranceRef')
        .populate('sbRef')
        .populate('boeRef')
        .populate('SwiftCopyRef')
        .populate('ebrcRef')
        .populate('blcopyRefs')
        .populate('tryPartyAgreementRef')
        .populate('opinionReportRef')
        .populate('AdviceRef')
        .populate({
            path: 'sbRef',
            populate: {
                path: 'irRef'
            }
        });
    return data;
}

function getPipoByBeneBuyer(user, callback) {
    const callBackFunc = async (err, receiver) => {
        if (err) {
            callback(err, null);
        } else if (receiver) {
            data = await pipoFile.find({ userId: user.userId, deleteflag: '0', file: user.file, benneName: user.benneName })
                .populate('debitNoteRef')
                .populate('creditNoteRef')
                .populate('packingListRef')
                .populate('MasterServiceRef')
                .populate('billOfExchangeRef')
                .populate('destructionRef')
                .populate('commercialRef')
                .populate('airwayBlCopyRef')
                .populate('insuranceRef')
                .populate('sbRef')
                .populate('boeRef')
                .populate('SwiftCopyRef')
                .populate('ebrcRef')
                .populate('blcopyRefs')
                .populate('tryPartyAgreementRef')
                .populate('opinionReportRef')
                .populate('AdviceRef')
                .populate({
                    path: 'sbRef',
                    populate: {
                        path: 'irRef'
                    }
                })
            callback(null, data);
        } else {
            callback(null, null);
        }
    }
    pipoFile.find({ userId: user.userId, deleteflag: '0', file: user.file, benneName: user.benneName })
        .populate('lcRef')
        .populate('debitNoteRef')
        .populate('creditNoteRef')
        .populate('packingListRef')
        .populate('MasterServiceRef')
        .populate('billOfExchangeRef')
        .populate('destructionRef')
        .populate('commercialRef')
        .populate('airwayBlCopyRef')
        .populate('insuranceRef')
        .populate('SwiftCopyRef')
        .populate('sbRef')
        .populate('ebrcRef')
        .populate('boeRef')
        .populate('tryPartyAgreementRef')
        .populate('opinionReportRef')
        .populate('TransactionRef')
        .populate('blcopyRefs')
        .populate({
            path: 'sbRef',
            populate: {
                path: 'irRef'
            }
        })
        .exec(callBackFunc)
}

module.exports = {
    addPipoFile: addPipoFile,
    getPipo: getPipo,
    getSinglePipo: getSinglePipo,
    updatePipo: updatePipo,
    updateSinglePipo: updateSinglePipo,
    updateManyPipo: updateManyPipo,
    getManyPipo: getManyPipo,
    getPipoByBene: getPipoByBene,
    updateManyPipo1: updateManyPipo1,
    getPipobasedOnNumberAndcurrency: getPipobasedOnNumberAndcurrency,
    getOrderPendingforShipment: getOrderPendingforShipment,
    getPipos: getPipos,
    updatePipoByid: updatePipoByid,
    deletePIPOByid: deletePIPOByid,
    getPipoByid: getPipoByid,
    getAllExcelDownloaddata: getAllExcelDownloaddata,
    deleteflag: deleteflag,
    getPipoByCustomer: getPipoByCustomer,
    getPipoByType: getPipoByType,
    getPipoByBeneBuyer: getPipoByBeneBuyer,
    getPipoNo: getPipoNo,
    getPipoNoCustom: getPipoNoCustom,
    Orderpendingforshipment:Orderpendingforshipment
};
