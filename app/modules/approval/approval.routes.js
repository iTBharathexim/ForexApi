const express = require("express");
const router = express.Router();
const misc = require("../../helpers/misc");
const resp = require("../../helpers/responseHelpers");
const ApprovalCtrl = require("./approval.controller");
const { request } = require("../../config");
const SECRET = process.env.SECRET;
module.exports = router;


router.get("/getApproval", (req, res) => {
  misc.checkUser(req, res).then((user) => {
    ApprovalCtrl.get(user).then(
      (data) => resp.successGetResponse(res, data),
      (err) => resp.errorResponse(res, err)
    );
  });
});

router.post("/add", (req, res) => {
    ApprovalCtrl.addApproval(req.body.data,req).then(
      (data) => {
        res.json(data)
      },
      (err) => res.json(err)
    );
});

router.post("/getPendingStatus", (req, res) => {
  ApprovalCtrl.getAllApproval('-1',req.body.FileType,req).then((data) => 
    {res.json(data)},
    (err) => res.json(err)
  );
});

router.post("/get", (req, res) => {
  ApprovalCtrl.getById(req.body.id,req).then((data) => 
    {res.json(data)},
    (err) => res.json(err)
  );
});

router.post("/getVerifyStatus", (req, res) => {
  ApprovalCtrl.getAllApproval('1',req.body.FileType,req).then((data) => 
    {res.json(data)},
    (err) => res.json(err)
  );
});
router.post("/getApprovedStatus", (req, res) => {
  ApprovalCtrl.getAllApproval('2',req.body.FileType,req).then((data) => 
    {res.json(data)},
    (err) => res.json(err)
  );
});
router.post("/getRejectStatus", (req, res) => {
  ApprovalCtrl.getAllApproval("3",req.body.FileType,req).then((data) => 
    {res.json(data)},
    (err) => res.json(err)
  );
});

router.post("/getDownloadStatus", (req, res) => {
  req.body.userId=req.user[0].companyId
  req.body.FileType=req.user[0].sideMenu
  ApprovalCtrl.getAllApprovalById(req.body).then((data) => 
    {res.json(data)},
    (err) => res.json(err)
  );
});

router.post("/UpdateDownloadStatus", (req, res) => {
  ApprovalCtrl.UpdateStatus(req,req.body.data).then((data) => 
    {res.json(data)},
    (err) => res.json(err)
  );
});

router.post("/UpdateStatus", (req, res) => {
  ApprovalCtrl.UpdateStatusNoraml(req,req.body.data).then((data) => 
    {res.json(data)},
    (err) => res.json(err)
  );
});

router.post("/UpdateApproval", (req, res) => {
  ApprovalCtrl.UpdateApprovalStatus(req,req.body.data).then((data) => 
    {res.json(data)},
    (err) => res.json(err)
  );
});

router.post("/getDataAnyTable", (req, res) => {
  ApprovalCtrl.getDataAnyTable(req).then((data) => 
    {res.json(data)},
    (err) => res.json(err)
  );
});

router.post("/UpdateAnyTable", (req, res) => {
  ApprovalCtrl.UpdateAnyTable(req).then((data) =>{res.json(data)},(err) => res.json(err));
});

router.post("/delete", (req, res) => {
  ApprovalCtrl.deletebyId(req.body.data,req).then((data) => 
    {res.json(data)},
    (err) => res.json(err)
  );
});

router.post("/delete_by_id", (req, res) => {
  ApprovalCtrl.delete_by_Id(req.body).then((data) => 
    {res.json(data)},
    (err) => res.json(err)
  );
});

router.post("/reject", (req, res) => {
  ApprovalCtrl.RejectId(req.body.data,req).then((data) => 
    {res.json(data)},
    (err) => res.json(err)
  );
});