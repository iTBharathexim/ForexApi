const resp = require('../../helpers/responseHelpers');
const ApprovalModel = require('./ExportBillLodgement.model.js');
const postMasterFile = require("../projects/models/masterFile.model").MasterModel;

var mongoose = require('mongoose');
const get = (req) => {
    return new Promise((resolve, reject) => {
        ApprovalModel.find({ userId: req.user[0].companyId, deleteflag: '2' }).populate('pipo').
            populate('commercialRef').
            populate({
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
            }).then(
                (data) => { resolve(data) },
                (err) => reject(err)
            )
    })
};
const getById = (req) => {
    return new Promise((resolve, reject) => {
        ApprovalModel.find({ userId: req.user[0].companyId, _id: mongoose.Types.ObjectId(req.body.id), deleteflag: '2' }).
            populate('commercialRef').
            populate({
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
            populate('pipo').then(
                (data) => { resolve(data) },
                (err) => reject(err)
            )
    })
};
const add = (data) => {
    return new Promise((resolve, reject) => {
        var book1 = new ApprovalModel(data);
        book1.save(function (err, book) {
            if (err) {
                reject(err)
                console.error(err);
                return;
            } else {
                resolve(book);
            }
        });
    })
};
const UpdateByiRAdvice = (data) => {
    return new Promise((resolve, reject) => {
        ApprovalModel.updateOne({ pipo_id: data?.id }, { $set: data }, { upsert: true }).then(
            (data) => resolve(data),
            (err) => reject(err)
        )
    });
};


const getAll = (id, fileType) => {
    return new Promise((resolve, reject) => {
        ApprovalModel.find({ deleteflag: id, FileType: fileType })
        populate('commercialRef').
            populate({
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
            }).then(
                (data) => resolve(data),
                (err) => reject(err)
            )
    })
};

const getAllTransaction = (type) => {
    return new Promise((resolve, reject) => {
        ApprovalModel.find({ TypeTransaction: type }).
            populate('commercialRef').
            populate({
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
            }).populate('pipo').then(
                (data) => resolve(data),
                (err) => reject(err)
            )
    })
};

const getAllTransactionById = (id, type) => {
    return new Promise((resolve, reject) => {
        ApprovalModel.find({ userId: id, TypeTransaction: type }).
            populate('commercialRef').
            populate({
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
            }).populate('pipo').then((data) => resolve(data), (err) => reject(err))
    })
};


const getAllById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            ApprovalModel.find(id, (err, data) => {
                resolve(data)
            }).populate('commercialRef').
                populate({
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
                }).populate('pipo').
                populate({
                    path: 'pipo',
                    populate: {
                        path: 'AdviceRef'
                    },

                }).populate({
                    path: 'pipo',
                    populate: {
                        path: 'boeRef'
                    }
                }).populate('IRAdviceRef').populate('SBRef').
                populate({
                    path: 'SBRef',
                    populate: {
                        path: 'blcopyRef'
                    }
                }).
                populate('commercialRef').populate('LodgementAdviceCopy').
                populate({
                    path: 'LodgementAdviceCopy',
                    populate: {
                        path: 'SbRef'
                    }
                }).populate("ORMRef").populate("BOERef").populate("LCTransactionRef").sort({ '_id': -1 });
        } catch (error) {
            
            reject(error)
        }

    })
};

const deletebyId = (req) => {
    return new Promise(async (resolve, reject) => {
        var db = mongoose.connection.collection((req.tableName).toLowerCase());
        db.deleteOne({ _id: mongoose.Types.ObjectId(req.Tableid) }).then((data) => 
            (err) => 
        ApprovalModel.updateMany({ _id: req.id }, { $set: { deleteflag: req.deleteflag, status: req.status } }).then(
            (data) => resolve(data),
            (err) => reject(err)
        )
    })
};

const Amount_Update = (req) => {
    return new Promise(async (resolve, reject) => {
        var db = mongoose.connection.collection((req.tableName).toLowerCase());
        db.updateOne({ _id: mongoose.Types.ObjectId(req.id) }, { $set: req.query }, { new: true }).then((data) => resolve(data), (err) => reject(err))
    })
};

const Amount_UpdateSB = (req) => {
    return new Promise(async (resolve, reject) => {
        postMasterFile.find({ _id: mongoose.Types.ObjectId(req.id) }).then((res) => {
            
            res[0]['firxdetails'].push(req.query)
            postMasterFile.updateOne({ _id: mongoose.Types.ObjectId(req.id) }, { $set: { firxdetails: res[0]?.firxdetails } }, { upsert: true }).then((data) => resolve(data), (err) => reject(err))
        })
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

const RejectId = async (req) => {
    return new Promise(async (resolve, reject) => {
        var db = await mongoose.connection.collection((req.tableName).toLowerCase());
        db.updateMany({ _id: mongoose.Types.ObjectId(req.Tableid) }, { $set: { deleteflag: '0', StatusApproval: req.status } }).then((data) => { },
            (err) => 
        ApprovalModel.updateMany({ _id: req.id }, { $set: { deleteflag: '3', status: req.status, rejectcomment: req.comment } }).then(
            (data) => resolve(data),
            (err) => reject(err))
    })
};

const UpdateStatus = async (req, data) => {
    return new Promise(async (resolve, reject) => {
        ApprovalModel.updateMany({ _id: req.body._id }, { $set: data }).then(
            (data) => resolve(data),
            (err) => reject(err))
    })
};

const UpdateStatusWeek = async (id, data) => {
    return new Promise(async (resolve, reject) => {
        ApprovalModel.updateOne({ _id: id }, { $set: data }).then(
            (data) => resolve(data),
            (err) => reject(err))
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
const UpdateByid = (id, data) => {
    return new Promise((resolve, reject) => {
        try {
            
            getAllById({ _id: mongoose.Types.ObjectId(id) }).then((res) => {
                var temp = res[0]?.Ref_Data != undefined ? Object.assign(data,res[0]?.Ref_Data) : data;
                
                // for (const key in data) {
                //     for (const key2 in data[key]) {
                //         temp[key][key2] = data[key][key2]
                //     }
                // }
                ApprovalModel.updateOne({ _id: mongoose.Types.ObjectId(id) }, { $set: { Ref_Data: temp } }, { upsert: false }).then(
                    (data) => resolve(data),
                    (err) => reject(err)
                )
            })
        } catch (error) {
            
        }

    });
}
module.exports = {
    get,
    UpdateUserByid,
    add,
    getAll,
    deletebyId,
    RejectId,
    getAllById,
    UpdateStatus,
    delete_by_Id,
    Amount_Update,
    UpdateByid,
    UpdateByiRAdvice,
    getById,
    Amount_UpdateSB,
    getAllTransaction,
    UpdateStatusWeek,
    getAllTransactionById: getAllTransactionById
};
