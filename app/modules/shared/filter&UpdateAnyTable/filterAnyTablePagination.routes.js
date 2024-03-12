const express = require("express");
const router = express.Router();
module.exports = router;
var mongoose = require('mongoose');

router.post("/filterAnyTablePagination", async (req, res, next) => {
    try {
        req.body.query['userId'] = req.user[0].companyId
        req.body.query['file'] = req.user[0].sideMenu
        
    } catch (err) {
        res.status(400).json({ error: err })
        
    }
});

const LIST_OF_MODEL = (req, res) => {
    return {
        pi_po: async () => {
            const pipoFile = require("../../projects/models/PI_PO.model");
            req.body.query["file"] = req?.user[0]?.sideMenu;
            req.body.query["$or"] = [{ "deleteflag": '0' }, { "deleteflag": '-1' }]
            
            let TOTAL_PAGE = await pipoFile.count(req.body.query)
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
                        path: 'CI_REF'
                    }
                }).limit(req.body?.filterPage?.limit).sort({ '_id': -1 }).then((data) => {
                    res.json({ data: data, TOTAL_PAGE: TOTAL_PAGE });
                });
        },
        commercials: async () => {
            const commercialFile = require("../../projects/models/commercial.model");
            req.body.query["$or"] = [{ "deleteflag": '0' }, { "deleteflag": '-1' }]
            
            let TOTAL_PAGE = await commercialFile.count(req.body.query)
            await commercialFile.find(req.body.query).populate('pipo').populate('sbRef').limit(req.body?.filterPage?.limit).sort({ '_id': -1 }).then((data) => {
                res.json({ data: data, TOTAL_PAGE: TOTAL_PAGE });
            });
        },
        masterrecord: async () => {
            const postMasterFile = require("../../projects/models/masterFile.model").MasterModel;
            req.body.query["file"] = req?.user[0]?.sideMenu;
            req.body.query["$or"] = [{ "deleteflag": '0' }, { "deleteflag": '-1' }]
            
            let TOTAL_PAGE = await postMasterFile.count(req.body.query)
            await postMasterFile.find(req.body.query).populate('pipo').populate({
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
                populate('debitnotedetails').populate('sbNo').limit(req.body?.filterPage?.limit).sort({ '_id': -1 }).then((data) => {
                    res.json({ data: data, TOTAL_PAGE: TOTAL_PAGE });
                });
        },
        airwayblcopies: async () => {
            const airwayBlCopyFile = require("../../projects/models/airwayBlCopy.model");
            req.body.query["$or"] = [{ "deleteflag": '0' }, { "deleteflag": '-1' }]
            
            let TOTAL_PAGE = await airwayBlCopyFile.count(req.body.query)
            await airwayBlCopyFile.find(req.body.query).populate('pipo').populate('sbRef').limit(req.body?.filterPage?.limit).sort({ '_id': -1 }).then((data) => {
                res.json({ data: data, TOTAL_PAGE: TOTAL_PAGE });
            });
        },
        packinglists: async () => {
            const packingListFile = require("../../projects/models/packingList.model");
            req.body.query["$or"] = [{ "deleteflag": '0' }, { "deleteflag": '-1' }]
            
            let TOTAL_PAGE = await packingListFile.count(req.body.query)
            await packingListFile.find(req.body.query).populate('pipo').populate('sbRef').populate('boeRef').limit(req.body?.filterPage?.limit).sort({ '_id': -1 }).then((data) => {
                res.json({ data: data, TOTAL_PAGE: TOTAL_PAGE });
            });
        },
        CertificateOfOrigin: async () => {
            const CertificateofOrigin = require("../../projects/models/CertificateofOrigin.model");
            req.body.query["$or"] = [{ "deleteflag": '0' }, { "deleteflag": '-1' }]
            
            let TOTAL_PAGE = await CertificateofOrigin.count(req.body.query)
            await CertificateofOrigin.find(req.body.query).populate('pipo').populate('CIRef').limit(req.body?.filterPage?.limit).sort({ '_id': -1 }).then((data) => {
                res.json({ data: data, TOTAL_PAGE: TOTAL_PAGE });
            });
        },
        billofexchanges: async () => {
            const billOfExchangeFile = require("../../projects/models/billOfExchange.model");
            req.body.query["$or"] = [{ "deleteflag": '0' }, { "deleteflag": '-1' }]
            
            let TOTAL_PAGE = await billOfExchangeFile.count(req.body.query)
            await billOfExchangeFile.find(req.body.query).populate('pipo').populate('sbRef').limit(req.body?.filterPage?.limit).sort({ '_id': -1 }).then((data) => {
                res.json({ data: data, TOTAL_PAGE: TOTAL_PAGE });
            });
        },
        creditNote: async () => {
            const creditNoteFile = require("../../projects/models/creditNote.model");
            req.body.query["$or"] = [{ "deleteflag": '0' }, { "deleteflag": '-1' }]
            
            let TOTAL_PAGE = await creditNoteFile.count(req.body.query)
            await creditNoteFile.find(req.body.query).populate('pipo').limit(req.body?.filterPage?.limit).sort({ '_id': -1 }).then((data) => {
                res.json({ data: data, TOTAL_PAGE: TOTAL_PAGE });
            });
        },
        debitnotes: async () => {
            const debitNoteFile = require("../../projects/models/debitNote.model");
            req.body.query["$or"] = [{ "deleteflag": '0' }, { "deleteflag": '-1' }]
            
            let TOTAL_PAGE = await debitNoteFile.count(req.body.query)
            await debitNoteFile.find(req.body.query).populate('pipo').limit(req.body?.filterPage?.limit).sort({ '_id': -1 }).then((data) => {
                res.json({ data: data, TOTAL_PAGE: TOTAL_PAGE });
            });
        },
        insurances: async () => {
            const insuranceFile = require("../../projects/models/insurance.model");
            req.body.query["$or"] = [{ "deleteflag": '0' }, { "deleteflag": '-1' }]
            
            let TOTAL_PAGE = await insuranceFile.count(req.body.query)
            await insuranceFile.find(req.body.query).populate('pipo').limit(req.body?.filterPage?.limit).sort({ '_id': -1 }).then((data) => {
                res.json({ data: data, TOTAL_PAGE: TOTAL_PAGE });
            });
        },
        letterlcs: async () => {
            const letterLCFile = require("../../projects/models/letterLC.model");
            req.body.query["$or"] = [{ "deleteflag": '0' }, { "deleteflag": '-1' }]
            
            let TOTAL_PAGE = await letterLCFile.count(req.body.query)
            await letterLCFile.find(req.body.query).populate('pipo').limit(req.body?.filterPage?.limit).sort({ '_id': -1 }).then((data) => {
                res.json({ data: data, TOTAL_PAGE: TOTAL_PAGE });
            });
        },
        masterservices: async () => {
            const masterServiceFile = require("../../projects/models/masterService.model");
            req.body.query["$or"] = [{ "deleteflag": '0' }, { "deleteflag": '-1' }]
            
            let TOTAL_PAGE = await masterServiceFile.count(req.body.query)
            await masterServiceFile.find(req.body.query).populate('pipo').limit(req.body?.filterPage?.limit).sort({ '_id': -1 }).then((data) => {
                res.json({ data: data, TOTAL_PAGE: TOTAL_PAGE });
            });
        },
        thirdparties: async () => {
            const thirdPartyFile = require("../../projects/models/thirdParty.model");
            req.body.query["$or"] = [{ "deleteflag": '0' }, { "deleteflag": '-1' }]
            
            let TOTAL_PAGE = await thirdPartyFile.count(req.body.query)
            await thirdPartyFile.find(req.body.query).populate('pipo').populate('sbNo').limit(req.body?.filterPage?.limit).sort({ '_id': -1 }).then((data) => {
                res.json({ data: data, TOTAL_PAGE: TOTAL_PAGE });
            });
        },
        opinionreports: async () => {
            const OpinionReportFile = require("../../projects/models/opinionReports.model");
            req.body.query["$or"] = [{ "deleteflag": '0' }, { "deleteflag": '-1' }]
            
            let TOTAL_PAGE = await OpinionReportFile.count(req.body.query)
            await OpinionReportFile.find(req.body.query).populate('pipo').populate('sbNo').limit(req.body?.filterPage?.limit).sort({ '_id': -1 }).then((data) => {
                res.json({ data: data, TOTAL_PAGE: TOTAL_PAGE });
            });
        },
        Inward_remittance: async () => {
            const Inward_Remittance = require("../../projects/models/Inward_remittance.model");
            req.body.query["$or"] = [{ "deleteflag": '0' }, { "deleteflag": '-1' }]
            let file = req.body.query['file']
            delete req.body.query['file']
            req.body.query['fileType'] = file
            
            try {
                let TOTAL_PAGE = await Inward_Remittance.count(req.body.query)
                await Inward_Remittance.find({ ...req.body.query }).populate('pipoRef').populate('AdviceRef').limit(req.body?.filterPage?.limit).sort({ '_id': -1 }).then((data) => {
                    res.json({ data: data, TOTAL_PAGE: TOTAL_PAGE });
                });
            }
            catch (err) {
                
            }

        },
        iradvices: async () => {
            const irAdviceFile = require("../../projects/models/irAdvice.model").irAdviceModel;
            req.body.query["$or"] = [{ "deleteflag": '0' }, { "deleteflag": '-1' }]
            if (req.body.query['id'] != undefined) {
                req.body.query['_id'] = mongoose.Types.ObjectId(req.body?.query.id)
                delete req.body.query['id'];
            }
            
            let TOTAL_PAGE = await irAdviceFile.count(req.body.query)
            await irAdviceFile.find(req.body.query).populate('pipo').populate('sbNo').populate('BOE_Ref').limit(req.body?.filterPage?.limit).sort({ '_id': -1 }).then((data) => {
                res.json({ data: data, TOTAL_PAGE: TOTAL_PAGE });
            });
        },
        destructions: async () => {
            const destructionFile = require("../../projects/models/destruction.model");
            req.body.query["$or"] = [{ "deleteflag": '0' }, { "deleteflag": '-1' }]
            
            let TOTAL_PAGE = await destructionFile.count(req.body.query)
            await destructionFile.find(req.body.query).populate('pipo').populate('sbRef').limit(req.body?.filterPage?.limit).sort({ '_id': -1 }).then((data) => {
                res.json({ data: data, TOTAL_PAGE: TOTAL_PAGE });
            });
        },
        blCopy: async () => {
            const blcopyref = require("../../projects/models/blcopyref.model");
            req.body.query["$or"] = [{ "deleteflag": '0' }, { "deleteflag": '-1' }]
            
            let TOTAL_PAGE = await blcopyref.count(req.body.query)
            await blcopyref.find(req.body.query).populate('pipo').populate('SbRef').limit(req.body?.filterPage?.limit).sort({ '_id': -1 }).then((data) => {
                res.json({ data: data, TOTAL_PAGE: TOTAL_PAGE });
            });
        },
        EBRC: async () => {
            const EBRC = require("../../projects/models/EBRC.model");
            req.body.query["$or"] = [{ "deleteflag": '0' }, { "deleteflag": '-1' }]
            
            let TOTAL_PAGE = await EBRC.count(req.body.query)
            await EBRC.find(req.body.query).populate('pipo').limit(req.body?.filterPage?.limit).sort({ '_id': -1 }).then((data) => {
                res.json({ data: data, TOTAL_PAGE: TOTAL_PAGE });
            });
        },
        SwiftCopyDocuments: async () => {
            const SwiftCopyDocuments = require("../../projects/models/swift.model");
            req.body.query["$or"] = [{ "deleteflag": '0' }, { "deleteflag": '-1' }]
            
            let TOTAL_PAGE = await SwiftCopyDocuments.count(req.body.query)
            await SwiftCopyDocuments.find(req.body.query).populate('pipo').limit(req.body?.filterPage?.limit).sort({ '_id': -1 }).then((data) => {
                res.json({ data: data, TOTAL_PAGE: TOTAL_PAGE });
            });
        },
        boerecords: async () => {
            const boeFile = require("../../projects/models/boefile.model").BoeModel;
            req.body.query["$or"] = [{ "deleteflag": '0' }, { "deleteflag": '-1' }]
            
            let TOTAL_PAGE = await boeFile.count(req.body.query)
            await boeFile.find(req.body.query).populate('pipo').populate('CI_REF').populate({
                path: 'CI_REF',
                populate: {
                    path: 'ORM_Ref'
                },
                populate: {
                    path: 'BoeRef'
                }
            }).populate('packingdetails').limit(req.body?.filterPage?.limit).sort({ '_id': -1 }).then((data) => {
                res.json({ data: data, TOTAL_PAGE: TOTAL_PAGE });
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
        users: async () => {
            const UserModel = require("../../projects/models/users.model").UserModel;
            delete req.body.query['file'];
            delete req.body.query['userId'];
            
            await UserModel.find(req.body.query).then((data) => {
                res.json({ data: data });
            });
        },
        LCTransaction: async () => {
            const LetterLCModel = require("../../projects/models/LCTransaction/LCTransction.model");
            delete req.body.query['file'];
            
            let TOTAL_PAGE = await LetterLCModel.count(req.body.query)
            await LetterLCModel.find(req.body.query).populate('pipo').limit(req.body?.filterPage?.limit).sort({ '_id': -1 }).then((data) => {
                res.json({ data: data, TOTAL_PAGE: TOTAL_PAGE });
            });
        },
        Beneficiary: async () => {
            const beneFile = require("../../projects/models/bene.model").BeneModel;
            delete req.body.query['file'];
            
            let TOTAL_PAGE = await beneFile.count(req.body.query)
            await beneFile.find(req.body.query).populate('pipo').limit(req.body?.filterPage?.limit).sort({ '_id': -1 }).then((data) => {
                res.json({ data: data, TOTAL_PAGE: TOTAL_PAGE });
            });
        },
        LC: async () => {
            const letterLCFile = require("../../projects/models/letterLC.model");
            
            let TOTAL_PAGE = await letterLCFile.count(req.body.query)
            await letterLCFile.find(req.body.query).populate('pipo').limit(req.body?.filterPage?.limit).sort({ '_id': -1 }).then((data) => {
                res.json({ data: data, TOTAL_PAGE: TOTAL_PAGE });
            });
        },
    }
}