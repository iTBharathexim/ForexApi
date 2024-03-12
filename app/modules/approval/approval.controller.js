const resp = require('../../helpers/responseHelpers');
const ApprovalModel = require('./approval.model.js');
const pipoFile = require("../projects/models/PI_PO.model");
var mongoose = require('mongoose');
const getApproval = (id) => {
    return new Promise((resolve, reject) => {
        ApprovalModel.findOne({ _id: id, userId: req.user[0].companyId, FileType: req.user[0].sideMenu }).then(
            (data) => resolve(data),
            (err) => reject(err)
        )
    })
};
const addApproval = (data, req) => {
    let id = ''
    if (data?.FileType == 'import' && data?.TypeOfPage == 'Transaction') {
        id = 'TXNARIM_' + (Math.random().toString(8).slice(2)).toUpperCase();
    } else if (data?.FileType == 'import' && data?.TypeOfPage == 'summary') {
        id = 'DELDOCIM_' + (Math.random().toString(8).slice(2)).toUpperCase();
    } else if (data?.FileType == 'export' && data?.TypeOfPage == 'Transaction') {
        id = 'TXNEXPLA_' + (Math.random().toString(8).slice(2)).toUpperCase();
    } else if (data?.FileType == 'export' && data?.TypeOfPage == 'summary') {
        id = 'DELDOCEX_' + (Math.random().toString(8).slice(2)).toUpperCase();
    } else if (data?.FileType == 'export' && data?.TypeOfPage == 'BuyerAddition') {
        id = 'ADD_EXP_' + (Math.random().toString(8).slice(2)).toUpperCase();
    }
    return new Promise((resolve, reject) => {
        data.userId = req.user[0].companyId
        data.UniqueId = id;
        var book1 = new ApprovalModel(data);
        book1.save(function (err, book) {
            if (err) {
                reject(err)
                console.error(err);
                return;
            } else {
                
                if (data?.Types != 'downloadPDF' && data?.Types != 'BuyerAddition' && data?.Types != 'BeneficiaryAddition') {
                    var db = mongoose.connection.collection((data.tableName).toLowerCase());
                    db.update({ _id: mongoose.Types.ObjectId(data.id) }, { $set: { deleteflag: data.deleteflag } }).then((data) => 
                        (err) => 
                }
                resolve(book);
            }
            
        });
    })
};

const getAllApproval = (id, fileType, req) => {
    return new Promise((resolve, reject) => {
        ApprovalModel.find({ '$or': [{ deleteflag: id == '3' ? '0' : id }, { deleteflag: id }], userId: req.user[0].companyId, FileType: req.user[0].sideMenu }).
        populate('commercialRef').populate({
            path: 'commercialRef',
            populate: {
                path: 'sbRef'
            }
        }).
        populate({
            path: 'commercialRef',
            populate: {
                path: 'IRM_REF'
            }
        }).
       sort({ '_id': -1 }).then(
            (data) => resolve(data),
            (err) => reject(err)
        )
    })
};
const getById = (id, req) => {
    return new Promise((resolve, reject) => {
        // 
        ApprovalModel.find({ id: id, userId: req.user[0].companyId, FileType: req.user[0].sideMenu })
        .populate('commercialRef').populate({
            path: 'commercialRef',
            populate: {
                path: 'sbRef'
            }
        }).
        populate({
            path: 'commercialRef',
            populate: {
                path: 'IRM_REF'
            }
        }).
         sort({ '_id': -1 }).
        then(
            (data) => { resolve(data) },
            (err) => reject(err)
        )
    })
};

const getAllApprovalById = (id) => {
    return new Promise((resolve, reject) => {
        ApprovalModel.find(id).
        populate('commercialRef')
        .populate({
            path: 'commercialRef',
            populate: {
                path: 'sbRef'
            }
        }).
        populate({
            path: 'commercialRef',
            populate: {
                path: 'IRM_REF'
            }
        }).
        sort({ '_id': -1 }).then(
            (data) => resolve(data),
            (err) => reject(err)
        )
    })
};

const deletebyId = (req, req1) => {
    return new Promise(async (resolve, reject) => {
        var db = mongoose.connection.collection((req.tableName).toLowerCase());
        db.deleteOne({ _id: mongoose.Types.ObjectId(req.Tableid) }).then((data) => 
            (err) => 
        ApprovalModel.updateMany({ _id: req.id, userId: req1.user[0].companyId }, { $set: { deleteflag: req.deleteflag, status: req.status } }).then(
            (data) => resolve(data),
            (err) => reject(err)
        )
    })
};

const delete_by_Id = (req) => {
    
    return new Promise(async (resolve, reject) => {
        var db = mongoose.connection.collection((req.tableName).toLowerCase());
        db.deleteOne({ _id: mongoose.Types.ObjectId(req.id) }).then((data) => resolve(data),
            (err) => {
                
                reject(err, 'db.updateOne')
            })
    })
};

const RejectId = async (req, req2) => {
    
    return new Promise(async (resolve, reject) => {
        if (req?.Types != 'downloadPDF' && req?.Types != 'BuyerAddition' && req?.Types != 'BeneficiaryAddition') {
            var db = await mongoose.connection.collection((req.tableName).toLowerCase());
            db.updateMany({ _id: mongoose.Types.ObjectId(req.Tableid) }, { $set: { deleteflag: '0', StatusApproval: req.status } }).then((data) => 
                (err) => 
        }
        ApprovalModel.updateMany({ _id: mongoose.Types.ObjectId(req.id), userId: req2.user[0].companyId }, { $set: { deleteflag: '3', status: req.status, rejectcomment: req.comment } }).then(
            (data) => resolve(data),
            (err) => reject(err))
    })
};

const UpdateStatus = async (req, ResData) => {
    return new Promise(async (resolve, reject) => {
        ApprovalModel.updateMany({ _id: req.body?.data?._id, userId: req.user[0].companyId }, { $set: ResData }).then(
            async (data) => {
                var db = await mongoose.connection.collection(req.body.TransactionTableName);
                db.updateOne({ UniqueId: req.body.TransactionTableId }, { $set: { deleteflag: ResData?.deleteflag } }).then((data) => {
                    
                    resolve(data);
                },
                    (err) => 
            },
            (err) => reject(err))
    })
};

const UpdateStatusNoraml = async (req, ResData) => {
    return new Promise(async (resolve, reject) => {
        ApprovalModel.updateMany({ _id: req.body?.data?._id, userId: req.user[0].companyId }, { $set: ResData }).then(async (data) => { resolve(data); },
            (err) => reject(err))
    })
};


const UpdateApprovalStatus = async (req, ResData) => {
    return new Promise(async (resolve, reject) => {
        ApprovalModel.updateOne({ id: req.body?.id, userId: req.user[0].companyId }, { $set: ResData }).then(async (data) => { resolve(data); },
            (err) => reject(err))
    })
};

const getDataAnyTable = async (req) => {
    return new Promise(async (resolve, reject) => {
        var db = await mongoose.connection.model((req.body.tableName).toLowerCase());
        await db.find({ userId: req.user[0].companyId, _id: mongoose.Types.ObjectId(req.body.id) }).then((data) => resolve(data), (err) => resolve(err));
    })
};

const UpdateAnyTable = async (req) => {
    return new Promise(async (resolve, reject) => {
        var db = await mongoose.connection.model((req.body.tableName).toLowerCase());
        await db.updateOne({ userId: req.user[0].companyId, _id: mongoose.Types.ObjectId(req.body.id) }, { $set: req.body?.data }).then((data) => resolve(data), (err) => resolve(err));
    })
};

const UpdateUserByid = (id, data) => {
    return new Promise((resolve, reject) => {
        ApprovalModel.updateOne(id, data).then(
            (data) => resolve(data),
            (err) => reject(err)
        )
    });
}

module.exports = {
    getApproval,
    UpdateUserByid,
    addApproval,
    getAllApproval,
    deletebyId,
    RejectId,
    getAllApprovalById,
    UpdateStatus,
    delete_by_Id,
    getById,
    UpdateStatusNoraml,
    UpdateApprovalStatus,
    getDataAnyTable,
    UpdateAnyTable
};

