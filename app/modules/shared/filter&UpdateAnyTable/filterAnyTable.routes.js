const express = require("express");
const router = express.Router();
module.exports = router;

router.post("/filterAnyTable", async (req, res, next) => {
  try {
      req.body.query['userId'] = req.user[0].companyId
      req.body.query['file'] = req.user[0].sideMenu
      
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
          
          await commercialFile.find(req.body.query).populate('pipo').populate('sbRef').sort({ '_id': -1 }).then((data) => {
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