const express = require("express");
const router = express.Router();
module.exports = router;
const uploadImage2 = require('../../../helpers/helper3');
const postDocument = require('../documents/document.controller');
const irAdviceModel = require('../irAdvice/irAdvice.model');
const postIrAdvice = require('../irAdvice/irAdvice.controller');
var mongoose = require('mongoose');
const moment = require("moment");

router.post("/uploadFile", async (req, res, next) => {
    if (true) {
        try {
            const myFile = req.file;
            const name = myFile.originalname.replace(/ /g, "_");
            const size = (myFile.size / 1024).toFixed(2).toString() + "KB";
            const result = await uploadImage2(myFile);
            postDocument.addDocument({
                userId: req.user[0].companyId,
                docName: name,
                docSize: size,
                docType: myFile.mimetype
            }, (err, resp) => {
                if (err) {
                    res
                        .status(400)
                        .json({
                            message: "Some error",
                            //data: imageUrl
                        })
                } else if (res) {
                    // 
                    // 
                    result.userId = `${req.user[0].companyId}`;
                    irAdviceModel.addIrAdviceFile(result, (er1, resp1) => {
                        if (er1) {
                            res
                                .status(400)
                                .json({
                                    message: "Some error",
                                    //data: imageUrl
                                })
                        } else if (resp1) {
                            res
                                .status(201)
                                .json({
                                    message: "Success!!!",
                                    data: resp1
                                })
                        }

                    })
                } else {
                    res
                        .status(400)
                        .json({
                            message: "Some error",
                            //data: imageUrl
                        })
                }
            })

        } catch (error) {
            next(error)
        }
    } else {
        // res.unauthorized(res, "Unauthorized");
    }

});

router.get("/get", async (req, res, next) => {
    postIrAdvice.getIrAdvice({
        userId: req.user[0].companyId,
        filetype: req.user[0]?.sideMenu
    }, (err, resp) => {
        if (err) {
            res
                .status(400)
                .json({
                    message: "Some error",

                })
        } else if (resp) {
            // 
            res.status(200)
                .json({
                    message: "Upload was successful",
                    data: resp
                })
        } else {
            res
                .status(400)
                .json({
                    message: "Some error",

                })
        }
    })
});

router.post("/getbyPartyName", async (req, res, next) => {
    postIrAdvice.getIrOrAdvice({ userId: req.user[0].companyId, partyName: req.body.partyName, file: req.user[0].sideMenu }, (err, resp) => {
        if (err) {
            res.status(400).json({ message: "Some error" })
        } else if (resp) {
            res.status(200).json({ message: "Upload was successful", data: resp })
        } else {
            res.status(400).json({ message: "Some error" })
        }
    })
});

router.post("/add", async (req, res, next) => {
    req.body.data.userId = req.user[0].companyId;
    postIrAdvice.addIrAdviceFile(req.body?.data, (er1, resp1) => {
        if (er1) {
            res.status(400).json({ message: "Some Error" })
        } else if (resp1) {
            res.status(201).json({ message: "FirexAdvice added Successfully", data: resp1 })
        }
    })
});

router.post("/update", async (req, res, next) => {
    req.body.master.irdate = moment(new Date()).format("YYYY-MM-DD");
    if (req.body._id == null && req.body._id == undefined) {
        req.body.master.userId = req.user[0].companyId;
    }
    postIrAdvice.updateIrAdvice(
        req.body._id, req.body.master, (err, resp) => {
            if (err) {
                res
                    .status(400)
                    .json({
                        message: "Some error",

                    })
            } else if (resp) {
                res.status(200)
                    .json({
                        message: "Upload was successful",
                        data: resp
                    })
            } else {
                res
                    .status(400)
                    .json({
                        message: "Some error",

                    })
            }
        })
});

router.post("/updateByIrAdvice", async (req, res, next) => {
    postIrAdvice.updateIrAdviceByIrAdvice(
        req.body._id, req.body.master, (err, resp) => {
            if (err) {
                res.status(400)
                    .json({
                        message: "Some error",

                    })
            } else if (resp) {
                res.status(200)
                    .json({
                        message: "Upload was successful",
                        data: resp
                    })
            } else {
                res
                    .status(400)
                    .json({
                        message: "Some error",

                    })
            }
        })
});

router.post("/updateByOrAdvice", async (req, res, next) => {
    postIrAdvice.updateIrAdviceByIrAdvice(
        req.body._id, req.body.master, (err, resp) => {
            if (err) {
                res
                    .status(400)
                    .json({
                        message: "Some error",

                    })
            } else if (resp) {
                // 
                res.status(200)
                    .json({
                        message: "Upload was successful",
                        data: resp
                    })
            } else {
                res
                    .status(400)
                    .json({
                        message: "Some error",

                    })
            }
        })
});

router.post("/getIrAdviceByIrAdvice", async (req, res, next) => {
    postIrAdvice.getIrAdviceByIrAdvice({
        billNo: req.body.billNo,
        userId: req.user[0].companyId
    }, (err, resp) => {
        if (err) {
            res
                .status(400)
                .json({
                    message: "Some error",

                })
        } else if (resp) {
            // 
            res.status(200)
                .json({
                    message: "Upload was successful",
                    data: resp
                })
        } else {
            res
                .status(400)
                .json({
                    message: "Some error",

                })
        }
    })
});

router.post("/getOrAdviceByOrAdvice", async (req, res, next) => {
    postIrAdvice.getIrAdviceByIrAdvice({
        billNo: req.body.billNo,
        userId: req.user[0].companyId
    }, (err, resp) => {
        if (err) {
            res
                .status(400)
                .json({
                    message: "Some error",

                })
        } else if (resp) {
            res.status(200)
                .json({
                    message: "Upload was successful",
                    data: resp
                })
        } else {
            res
                .status(400)
                .json({
                    message: "Some error",

                })
        }
    })
});

router.post("/getIrAdviceByBillNo", async (req, res, next) => {
    postIrAdvice.getIrAdviceByBillNo({
        billNo: req.body.billNo,
        userId: req.user[0].companyId
    }, (err, resp) => {
        if (err) {
            res
                .status(400)
                .json({
                    message: "Some error",

                })
        } else if (resp) {
            res.status(200)
                .json({
                    message: "Upload was successful",
                    data: resp
                })
        } else {
            res
                .status(400)
                .json({
                    message: "Some error",

                })
        }
    })
});


router.post("/getOrAdviceByBillNo", async (req, res, next) => {
    postIrAdvice.getIrAdviceByBillNo({
        billNo: req.body.billNo,
        userId: req.user[0].companyId
    }, (err, resp) => {
        if (err) {
            res
                .status(400)
                .json({
                    message: "Some error",

                })
        } else if (resp) {
            res.status(200)
                .json({
                    message: "Upload was successful",
                    data: resp
                })
        } else {
            res
                .status(400)
                .json({
                    message: "Some error",

                })
        }
    })
});

router.post("/updateIrAdvice", async (req, res, next) => {
    postIrAdvice.updateIrAdviceByIr(
        req.body._id, req.body.master, req.user[0].companyId, (err, resp) => {
            if (err) {
                res
                    .status(400)
                    .json({
                        message: "Some error",

                    })
            } else if (resp) {
                res.status(200)
                    .json({
                        message: "Upload was successful",
                        data: resp
                    })
            } else {
                res
                    .status(400)
                    .json({
                        message: "Some error",

                    })
            }
        })
});

router.post("/updateOrAdvice", async (req, res, next) => {
    postIrAdvice.updateIrAdviceByIr(
        req.body._id, req.body.master, req.user[0].companyId, (err, resp) => {
            if (err) {
                res
                    .status(400)
                    .json({
                        message: "Some error",

                    })
            } else if (resp) {
                // 
                res.status(200)
                    .json({
                        message: "Upload was successful",
                        data: resp
                    })
            } else {
                res
                    .status(400)
                    .json({
                        message: "Some error",

                    })
            }
        })
});

router.get("/getInwardByPipo/:pipo", async (req, res, next) => {
    let data = await postIrAdvice.getInwarByPipo(req, res)
    res.send(data)
});

router.post("/getByIdBillNo", async (req, res, next) => {
    let data = await postIrAdvice.getByIdBillNo(req, res)
    res.send(data)
});

router.post("/getInvoice_No", async (req, res, next) => {
    var db = mongoose.connection.collection((req.body.tableName));
    var queryupdate = Object.keys(req.body.query);
    await db.find({ userId: req.user[0].companyId }).toArray().then((item) => {
        var result = item.filter((value) => ((value[queryupdate[0]]) != undefined ? (value[queryupdate[0]]).toLowerCase() : '').indexOf(req.body.query[queryupdate[0]].toLowerCase()) != -1)
        res.status(200).json({ data: result })
    }, (err) => {
        res.status(200).json({
            data: [],
            error: err
        });
    });
});



router.post("/filterAnyTable", async (req, res, next) => {
    try {
        req.body.query['userId'] = req.user[0].companyId
        req.body.query['file'] = req.user[0].sideMenu
        
    } catch (err) {
        res.status(400)
        
    }
});

router.post("/UpdateAnyTable", async (req, res, next) => {
    try {
        req.body.id['userId'] = req.user[0].companyId
        req.body.id['file'] = req.user[0].sideMenu
        
    } catch (err) {
        res.status(400)
        
    }
});

const LIST_OF_MODEL = (req, res) => {
    return {
        airwayblcopies: async () => {
            const airwayBlCopyFile = require("../../projects/models/airwayBlCopy.model");
            
            await airwayBlCopyFile.find(req.body.query).populate('pipo').populate('sbRef').sort({ '_id': -1 }).then((data) => {
                res.json({ data: data });
            });
        },
        billofexchanges: async () => {
            const billOfExchangeFile = require("../../projects/models/billOfExchange.model");
            
            await billOfExchangeFile.find(req.body.query).populate('pipo').populate('sbRef').sort({ '_id': -1 }).then((data) => {
                res.json({ data: data });
            });
        },
        commercials: async () => {
            const commercialFile = require("../../projects/models/commercial.model");
            
            await commercialFile.find(req.body.query).populate('pipo').populate('sbRef').populate('BoeRef').populate('ORM_Ref').sort({ '_id': -1 }).then((data) => {
                res.json({ data: data });
            });
        },
        creditNote: async () => {
            const creditNoteFile = require("../../projects/models/creditNote.model");
            
            await creditNoteFile.find(req.body.query).populate('pipo').populate('sbRef').sort({ '_id': -1 }).then((data) => {
                res.json({ data: data });
            });
        },
        debitnotes: async () => {
            const debitNoteFile = require("../../projects/models/debitNote.model");
            
            await debitNoteFile.find(req.body.query).populate('pipo').populate('sbRef').sort({ '_id': -1 }).then((data) => {
                res.json({ data: data });
            });
        },
        destructions: async () => {
            const destructionFile = require("../../projects/models/destruction.model");
            
            await destructionFile.find(req.body.query).populate('pipo').populate('sbRef').sort({ '_id': -1 }).then((data) => {
                res.json({ data: data });
            });
        },
        insurances: async () => {
            const insuranceFile = require("../../projects/models/insurance.model");
            
            await insuranceFile.find(req.body.query).populate('pipo').populate('sbRef').sort({ '_id': -1 }).then((data) => {
                res.json({ data: data });
            });
        },
        iradvices: async () => {
            const irAdviceFile = require("../../projects/models/irAdvice.model").irAdviceModel;
            
            await irAdviceFile.find(req.body.query).populate('pipo').populate('sbNo').sort({ '_id': -1 }).then((data) => {
                res.json({ data: data });
            });
        },
        Inward_remittance: async () => {
            const Inward_Remittance = require("../../projects/models/Inward_remittance.model");
            
            await Inward_Remittance.find(req.body.query).populate('pipo').populate('sbNo').sort({ '_id': -1 }).then((data) => {
                res.json({ data: data });
            });
        },
        letterlcs: async () => {
            const letterLCFile = require("../../projects/models/letterLC.model");
            
            await letterLCFile.find(req.body.query).populate('pipo').populate('sbNo').sort({ '_id': -1 }).then((data) => {
                res.json({ data: data });
            });
        },
        masterservices: async () => {
            const masterServiceFile = require("../../projects/models/masterService.model");
            
            await masterServiceFile.find(req.body.query).populate('pipo').populate('sbNo').sort({ '_id': -1 }).then((data) => {
                res.json({ data: data });
            });
        },
        opinionreports: async () => {
            const OpinionReportFile = require("../../projects/models/opinionReports.model");
            
            await OpinionReportFile.find(req.body.query).populate('pipo').populate('sbNo').sort({ '_id': -1 }).then((data) => {
                res.json({ data: data });
            });
        },
        packinglists: async () => {
            const packingListFile = require("../../projects/models/packingList.model");
            
            await packingListFile.find(req.body.query).populate('pipo').populate('sbNo').sort({ '_id': -1 }).then((data) => {
                res.json({ data: data });
            });
        },
        thirdparties: async () => {
            const thirdPartyFile = require("../../projects/models/thirdParty.model");
            
            await thirdPartyFile.find(req.body.query).populate('pipo').populate('sbNo').sort({ '_id': -1 }).then((data) => {
                res.json({ data: data });
            });
        },
        masterrecord: async () => {
            const postMasterFile = require("../../projects/models/masterFile.model").MasterModel;
            
            await postMasterFile.find(req.body.query).populate('pipo').populate('sbNo').sort({ '_id': -1 }).then((data) => {
                res.json({ data: data });
            });
        },
        pi_po: async () => {
            const pipoFile = require("../../projects/models/PI_PO.model");
            req.body.query["file"] = req?.user[0]?.sideMenu
            req.body.query["$or"] = [{ "deleteflag": '0' }, { "deleteflag": '-1' }]
            
            await pipoFile.find(req.body.query).
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
                }).populate({
                    path: 'boeRef',
                    populate: {
                        path: 'CI_REF',
                        populate:[{
                            path: 'AirwayBillRef'
                        }]
                    }
                }).sort({ '_id': -1 }).then((data) => {
                    res.json({ data: data });
                });
        },
        boerecords: async () => {
            const boeFile = require("../../projects/models/boefile.model").BoeModel;
            
            await boeFile.find(req.body.query).populate('pipo').populate('CI_REF').populate({
                path: 'CI_REF',
                populate: {
                    path: 'ORM_Ref'
                },
                populate: {
                    path: 'BoeRef'
                }
            }).sort({ '_id': -1 }).then((data) => {
                res.json({ data: data });
            });
        },
        ForwardContract: async () => {
            const ForwardContractModel = require("../../projects/models/Treasury/Forward-Contract/Forward-Contract.model").ForwardContractModel;
            
            await ForwardContractModel.find(req.body.query).sort({ '_id': -1 }).then((data) => {
                res.json({ data: data });
            });
        },
        ExportTransaction: async () => {
            const ExportTransaction = require('../../ExportBillLodgement/ExportBillLodgement.model');
            delete req.body.query['file'];
            req.body.query['fileType'] = req.user[0].sideMenu
            
            try {
                await ExportTransaction.find(req.body.query).populate('pipo').
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
                    populate('commercialRef').populate('LodgementAdviceCopy').
                    populate({
                        path: 'LodgementAdviceCopy',
                        populate: {
                            path: 'SbRef'
                        }
                    }).populate("ORMRef").populate("BOERef").populate("LCTransactionRef").sort({ '_id': -1 }).then((data) => {
                        res.json({ data: data });
                    });
            } catch (error) {
                
            }
        },
        Inward_remittance: async () => {
            const Inward_Remittance = require("../../projects/models/Inward_remittance.model");
            delete req.body.query['file'];
            req.body.query['fileType'] = req.user[0].sideMenu
            
            await Inward_Remittance.find(req.body.query).populate('pipo').sort({ '_id': -1 }).then((data) => {
                res.json({ data: data });
            });
        },
        users: async () => {
            const UserModel = require("../../projects/models/users.model").UserModel;
            delete req.body.query['file'];
            delete req.body.query['userId'];
            
            await UserModel.find(req.body.query).then((data) => {
                res.json({ data: data });
            });
        }
    }
}

const UPDATE_LIST_OF_MODEL = (req, res) => {
    return {
        airwayblcopies: async () => {
            const airwayBlCopyFile = require("../../projects/models/airwayBlCopy.model");
            
            await airwayBlCopyFile.updateOne(req.body.id, { $set: req.body.query }, function (err, data) {
                res.json({ data: data, err: err });
            })
        },
        billofexchanges: async () => {
            const billOfExchangeFile = require("../../projects/models/billOfExchange.model");
            
            await billOfExchangeFile.updateOne(req.body.id, { $set: req.body.query }, function (err, data) {
                res.json({ data: data, err: err });
            })
        },
        commercials: async () => {
            const commercialFile = require("../../projects/models/commercial.model");
            req.body.id["_id"] = mongoose.Types.ObjectId(req.body.id?._id)
            
            await commercialFile.updateOne(req.body.id, { $set: req.body.query }, function (err, data) {
                res.json({ data: data, err: err });
            })
        },
        creditNote: async () => {
            const creditNoteFile = require("../../projects/models/creditNote.model");
            
            await creditNoteFile.updateOne(req.body.id, { $set: req.body.query }, function (err, data) {
                res.json({ data: data, err: err });
            })
        },
        debitnotes: async () => {
            const debitNoteFile = require("../../projects/models/debitNote.model");
            
            await debitNoteFile.updateOne(req.body.id, { $set: req.body.query }, function (err, data) {
                res.json({ data: data, err: err });
            })
        },
        destructions: async () => {
            const destructionFile = require("../../projects/models/destruction.model");
            
            await destructionFile.updateOne(req.body.id, { $set: req.body.query }, function (err, data) {
                res.json({ data: data, err: err });
            })
        },
        insurances: async () => {
            const insuranceFile = require("../../projects/models/insurance.model");
            
            await insuranceFile.updateOne(req.body.id, { $set: req.body.query }, function (err, data) {
                res.json({ data: data, err: err });
            })
        },
        iradvices: async () => {
            const irAdviceFile = require("../../projects/models/irAdvice.model").irAdviceModel;
            
            await irAdviceFile.updateOne(req.body.id, { $set: req.body.query }, function (err, data) {
                res.json({ data: data, err: err });
            })
        },
        Inward_remittance: async () => {
            const Inward_Remittance = require("../../projects/models/Inward_remittance.model");
            
            await Inward_Remittance.updateOne(req.body.id, { $set: req.body.query }, function (err, data) {
                res.json({ data: data, err: err });
            })
        },
        letterlcs: async () => {
            const letterLCFile = require("../../projects/models/letterLC.model");
            
            await letterLCFile.updateOne(req.body.id, { $set: req.body.query }, function (err, data) {
                res.json({ data: data, err: err });
            })
        },
        masterservices: async () => {
            const masterServiceFile = require("../../projects/models/masterService.model");
            
            await masterServiceFile.updateOne(req.body.id, { $set: req.body.query }, function (err, data) {
                res.json({ data: data, err: err });
            })
        },
        opinionreports: async () => {
            const OpinionReportFile = require("../../projects/models/opinionReports.model");
            
            await OpinionReportFile.updateOne(req.body.id, { $set: req.body.query }, function (err, data) {
                res.json({ data: data, err: err });
            })
        },
        packinglists: async () => {
            const packingListFile = require("../../projects/models/packingList.model");
            
            await packingListFile.updateOne(req.body.id, { $set: req.body.query }, function (err, data) {
                res.json({ data: data, err: err });
            })
        },
        thirdparties: async () => {
            const thirdPartyFile = require("../../projects/models/thirdParty.model");
            
            await thirdPartyFile.updateOne(req.body.id, { $set: req.body.query }, function (err, data) {
                res.json({ data: data, err: err });
            })
        },
        masterrecord: async () => {
            const postMasterFile = require("../../projects/models/masterFile.model").MasterModel;
            let id = {_id:mongoose.Types.ObjectId(req.body.id?._id)}
            
            await postMasterFile.updateOne(id, { $set: req.body.query }, function (err, data) {
                res.json({ data: data, err: err });
            })
        },
        pi_po: async () => {
            const pipoFile = require("../../projects/models/PI_PO.model");
            req.body.id["_id"] = mongoose.Types.ObjectId(req.body.id?._id)
            
            await pipoFile.updateOne(req.body.id, { $set: req.body.query }, function (err, data) {
                
                
                res.json({ data: data, err: err });
            })
        },
        boerecords: async () => {
            const boeFile = require("../../projects/models/boefile.model").BoeModel;
            
            await boeFile.updateOne(req.body.id, { $set: req.body.query }, function (err, data) {
                res.json({ data: data, err: err });
            })
        },
        ForwardContract: async () => {
            const ForwardContractModel = require("../../projects/models/Treasury/Forward-Contract/Forward-Contract.model").ForwardContractModel;
            
            await ForwardContractModel.updateOne(req.body.id, { $set: req.body.query }, function (err, data) {
                res.json({ data: data, err: err });
            })
        },
        ExportTransaction: async () => {
            const ExportTransaction = require('../../ExportBillLodgement/ExportBillLodgement.model');
            
            let id = {_id:mongoose.Types.ObjectId(req.body.id?.id!=undefined?req.body.id?.id:req.body.id)}
            
            await ExportTransaction.updateOne(id, { $set: req.body.query }, function (err, data) {
                res.json({ data: data, err: err });
            })
        },
        Inward_remittance: async () => {
            const Inward_Remittance = require("../../projects/models/Inward_remittance.model");
            
            await Inward_Remittance.updateOne(req.body.id, { $set: req.body.query }, function (err, data) {
                res.json({ data: data, err: err });
            })
        },
        LCTransaction: async () => {
            const letterLCFile = require("../../projects/models/LCTransaction/LCTransction.model");
            
            let id = {_id:mongoose.Types.ObjectId(req.body.id?.id)}
            await letterLCFile.updateOne(id, { $set: req.body.query }, function (err, data) {
                res.json({ data: data, err: err });
            })
        }
    }
}