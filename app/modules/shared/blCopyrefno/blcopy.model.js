const blcopyFile = require("../../projects/models/blcopyref.model");

function addblcopyFile(project, callback) {
    blcopyFile.create(project.blcopy, (err, res) => {
        if (err) {            
            callback(err, null);
        } else if (res) {
            
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getblcopy(user, callback) {
    blcopyFile.find({ userId: user.userId,file: user.filetype }).populate('SbRef').populate('pipo').populate({
        path: 'pipo',
        populate: {
            path: 'AdviceRef'
        }
    }).populate({
        path: 'pipo',
        populate: {
            path: 'TransactionRef'
        }
    }).sort({ '_id': -1 }).exec( function(err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}
function getSingleblcopy(user, callback) {
    blcopyFile.find({ blcopyrefNumber: user.userId }).populate('pipo').exec( function(err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}
function updateblcopy(id, bene, callback) {
    blcopyFile.updateOne({
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

function updateblcopySB(id, bene, callback) {
    blcopyFile.updateOne({
            _id: id,
        }, { $set:{SbRef:bene?.SbRef} },
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
const getDocSubmitedNoAwaited = async (req,res) => {
    try {
        let importData = await blcopyFile.aggregate([
            { $match: { "file": "import",userId: req.user[0].companyId } },
            {
                $group: {
                    _id: '$buyerName',
                    blcopyrefNumber : { $addToSet: '$blcopyrefNumber' },
                    toTalcount: { $sum: 1 },
                }
            }
        ])

        let exportData = await blcopyFile.aggregate([
            { $match: { "file": "export",userId: req.user[0].companyId } },
            {
                $group: {
                    _id: '$buyerName',
                    blcopyrefNumber : { $addToSet: '$blcopyrefNumber' },
                    toTalcount: { $sum: 1 },
                }
            }
        ])
        return {import:importData ,export: exportData}
    } catch (error) {
        return error
    }
}

const getTotalBillLogdement = async () => {
    try {
        let count = await blcopyFile.find({ blcopyrefNumber: { "$exists": true, "$ne": "" } }).count()
        return count
    } catch (error) {
        return error
    }
}

const billLoedgmentData = async (req) => {
    var data = {}
    try {
        let totalImportEntries = await blcopyFile.count({ "file": "import", userId: req.user[0].companyId })
        let currencyWiseImportData = await blcopyFile.aggregate([
            { $match: { "file": "import", userId: req.user[0].companyId } },
            {
                $group: {
                    _id: "$buyerName",
                    totalItems: { $sum: 1 },
                    "totalAmount": {
                        "$sum": {
                            "$toDouble": "$amount",
                        }
                    }
                }
            }
        ])
        let totalExportEntries = await blcopyFile.count({ "file": "export", userId: req.user[0].companyId})
        let currencyWiseExportData = await blcopyFile.aggregate([
            { $match: { "file": "export", userId: req.user[0].companyId} },
            {
                $group: {
                    _id: '$buyerName',
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

module.exports = {
    addblcopyFile: addblcopyFile,
    getSingleblcopy: getSingleblcopy,
    getblcopy: getblcopy,
    updateblcopy: updateblcopy,
    getDocSubmitedNoAwaited: getDocSubmitedNoAwaited,
    getTotalBillLogdement: getTotalBillLogdement,
    updateblcopySB:updateblcopySB,
    billLoedgmentData:billLoedgmentData
};

