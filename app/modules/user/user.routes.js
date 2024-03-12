const express = require("express");
const router = express.Router();
const misc = require("../../helpers/misc");
const resp = require("../../helpers/responseHelpers");
const UserCtrl = require("./user.controller");
const AWS = require("../../helpers/aws-S3");
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();
const UserModel = require("./user.model");
const jwt = require("jsonwebtoken");
const { request } = require("../../config");
const SECRET = process.env.SECRET;
var Member = require("../projects/models/member.model").MemberModel;
const Users = require('../projects/models/users.model.js').UserModel;
const schedule = require('node-schedule');
module.exports = router;

router.get("/profile", (req, res) => {
  misc.checkUser(req, res).then((user) => {
    UserCtrl.getProfile(user).then((data) => {
      res.json({ result: data })
    },
      (err) => resp.errorResponse(res, err)
    );
  });
});

router.post("/getprofilebyId", (req, res) => {
  UserCtrl.getProfileById(req.body).then(
    (data) => res.send(data).sendStatus(200),
    (err) => res.send(err).sendStatus(400))
});

router.post("/getEamilByIdUserMember", (req, res) => {
  UserCtrl.getEamilByIdUserMember(req.body).then(
    (data) => res.send(data),
    (err) => res.send(err).sendStatus(400))
});
router.get("/getAllUserMember", (req, res) => {
  UserCtrl.getAllUserMember(req.body).then(
    (data) => res.send(data),
    (err) => res.send(err).sendStatus(400))
});

router.patch("/updateUserById/:id", async (req, res) => {
  let user = await UserCtrl.UpdateUserByid(req.params.id, req.body)
  res.send(user)
});

router.get("/getAll", async (req, res) => {
  let user = await UserCtrl.getAll()
  res.send(user)
});

router.patch("/updateUserByCompanyId/:id", async (req, res) => {
  let user = await UserCtrl.updateUserByCompanyId(req.params.id, req.body)
  res.send(user)
});

var copenhagenHour = 15;//You can set any hour at which you want to schedule a job
var copenHagenMinutes = 0;//You can set any minute
var date = new Date();
date.setUTCHours(copenhagenHour - 1);//-1 defines the UTC time offset for a particular timezone
date.setUTCMinutes(copenHagenMinutes);

schedule.scheduleJob({hour: date.getHours(), minute: date.getMinutes()}, async function () {
  var bundel_data = [];
  
  try {
    getUserList().then(async (res) => {
      res.forEach(async (element) => {
        let tokenlist = [];
        await element?.LoginToken.forEach(tokenelement => {
          if (new Date(tokenelement?.date).toLocaleDateString() == new Date().toLocaleDateString()) {
            tokenlist.push(tokenelement)
          }
        });
        if (tokenlist.length!=0) {
          await Users?.updateOne({ _id: element?._id }, { $set: { LoginToken: tokenlist } }, function (err, res) { })
        }
      });
    })
  } catch (error) {
    
  }
})

function getUserList() {
  return new Promise(async (resolve, reject) => {
    await Users.find({}, async (err, res) => {
      await resolve(res);
    });
  })
}