const express = require("express");
const router = express.Router();
const misc = require("../../helpers/misc");
const resp = require("../../helpers/responseHelpers");
const ApprovalCtrl = require("./approval.controller");
const { request } = require("../../config");
const SECRET = process.env.SECRET;
module.exports = router;
var mongoose = require('mongoose');

router.post("/get", (req, res) => {
  misc.checkUser(req, res).then((user) => {
    
    if(req.body.query!=null && req.body.query!=undefined){
        var db = mongoose.connection.collection((req.body.tableName));
        db.find(req.body.query).toArray().then( (data) => resp.successGetResponse(res, data),
     (err) => {
        
        resp.errorResponse(res, err)
    } )
    }else{
        resp.errorResponse(res,{error:'db name not found...'})
    }
    
  });
});

// ApprovalCtrl.get(user).then(
//     (data) => resp.successGetResponse(res, data),
//     (err) => resp.errorResponse(res, err)
//   );