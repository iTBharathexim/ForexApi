const express = require("express");
const router = express.Router();
const misc = require("../../helpers/misc");
const resp = require("../../helpers/responseHelpers");
const RealTimeNotificationCtrl = require("./RealTimeNotification.controller");
const { request } = require("../../config");
const SECRET = process.env.SECRET;
module.exports = router;
const SocketIO= require("../../../Socket.io");

// 
// SocketIO.getSocketProperties().on('connection', (socket) => {
//   
//   socket.on('disconnect', () => {
//       
//   });
//   socket.on('received', function (data) {
//       
//   });
// })
router.get("/get", (req, res) => {
  misc.checkUser(req, res).then((user) => {
    RealTimeNotificationCtrl.get(req).then(
      (data) => resp.successGetResponse(res, data),
      (err) => resp.errorResponse(res, err)
    );
  });
});

router.post("/getById", (req, res) => {
  misc.checkUser(req, res).then((user) => {
    RealTimeNotificationCtrl.getById(req).then(
      (data) => resp.successGetResponse(res, data),
      (err) => resp.errorResponse(res, err)
    );
  });
});

router.post("/add", (req, res) => {
  
  req.body.data.userId= req.user[0].companyId;
  req.body.data.deleteflag='0';
  req.body.data.UniqueId=req.body.data?.UserDetails;
  RealTimeNotificationCtrl.add(req.body.data).then(
      (data) => {
        
        res.json(data)
      },
      (err) => res.json(err)
    );
});

router.post("/updateiR", (req, res) => {
  
  req.body.data.userId= req.user[0].companyId;
  RealTimeNotificationCtrl.UpdateByiRAdvice(req.body.data).then(
      (data) => {
        
        res.json(data)
      },
      (err) => res.json(err)
    );
});

router.post("/update", (req, res) => {
  
  RealTimeNotificationCtrl.UpdateByid(req.body.id,req.body.data).then(
      (data) => {
        
        res.json(data)
      },
      (err) => res.json(err)
    );
});


router.post("/delete", (req, res) => {
  RealTimeNotificationCtrl.deletebyId(req.body.data).then((data) => 
    {res.json(data)},
    (err) => res.json(err)
  );
});

router.post("/Amount_Update", (req, res) => {
  RealTimeNotificationCtrl.Amount_Update(req.body).then((data)=>{res.json(data)},(err)=>res.json(err));
});