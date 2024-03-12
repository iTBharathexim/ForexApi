const express = require("express");
const router = express.Router();
module.exports = router;

router.post("/UpdateAnyTable", async (req, res, next) => {
  try {
      req.body.id['userId'] = req.user[0].companyId
      req.body.id['file'] = req.user[0].sideMenu
      
  } catch (err) {
      res.status(400)
      
  }
});

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
          
          let id = {_id:mongoose.Types.ObjectId(req.body.id?.id)}
          
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