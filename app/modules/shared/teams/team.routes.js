const express = require("express");
const router = express.Router();
module.exports = router;
const postTeam = require('../teams/team.controller');
var mongoose = require('mongoose');

router.post("/post", async (req, res, next) => {


  if (req.body.team.userId == '' || req.body.team.userId == null || req.body.team.userId == undefined) {
    req.body.team.userId = req.user[0]._id;
  }

  postTeam.addTeam(req.body, (err, resp) => {

    if (err) {

      res
        .status(400)
        .json({
          message: "Some error",

        })
    } else if (resp) {

      res.status(200).json({ message: "Team Added Successfully", data: resp })
    } else {
      res
        .status(400)
        .json({
          message: "Some error",

        })
    }
  });

});

router.post("/get", async (req, res, next) => {

  postTeam.getTeam(req.user[0].companyId, (err, resp) => {

    if (err) {

      res
        .status(400)
        .json({
          message: "Some error",

        })
    } else if (resp) {

      res.status(200)
        .json({
          message: "Team Getting Successfully",
          data: resp
        })
    } else {
      res
        .status(400)
        .json({
          message: "Some error",

        })
    }
  });

});

router.post("/getTeamByUser", async (req, res, next) => {

  postTeam.getTeam(req.body.companyId, (err, resp) => {

    if (err) {

      res.status(400).json({ message: "Some error" })
    } else if (resp) {

      res.status(200).json({ message: "getTeam Getting Successfully", data: resp })
    } else {
      res.status(400).json({ message: "Some error" })
    }
  });
});
router.post("/getbyid", async (req, res, next) => {
  postTeam.getTeambyId(req.body.id, (err, resp) => {
    if (err) {
      res.status(400).json({ message: "Some error" })
    } else if (resp) {

      res.status(200).json({ message: "getTeam Getting Successfully", data: resp })
    } else {
      res.status(400).json({ message: "Some error" })
    }
  });
});

router.post("/update", async (req, res, next) => {
  postTeam.updateTeam(
    req.user[0].companyId,
    req.body.team
    , (err, resp) => {
      if (err) {
        res
          .status(400)
          .json({
            message: "Some error",

          })
      } else if (resp) {

        res.status(200)
          .json({
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
router.post("/Team_Update", async (req, res, next) => {
  delete req.body.team['_id'];
  postTeam.updateTeam({ _id: req.body.id }, req.body.team, (err, resp) => {
    if (err) {

      res
        .status(400)
        .json({
          message: "Some error",

        })
    } else if (resp) {

      res.status(200)
        .json({
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
router.post("/getUser", async (req, res, next) => {

  res.status(200).json({ message: "User Details", data: req.user })
});

router.post("/getUserById", async (req, res, next) => {

  await postTeam.getTeamMember(req.body.email, (err, response) => {
    res.status(200).json({ message: "User Details", data: response });
  });
});
