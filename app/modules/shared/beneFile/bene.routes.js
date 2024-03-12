const express = require("express");
const router = express.Router();
module.exports = router;
const postBene = require("../beneFile/bene.controller");

router.post("/post", async (req, res, next) => {
  req.body.bene.userId = req.user[0].companyId;
  postBene.addBeneFile(req.body, (err, resp) => {
    if (err) {
      res.status(400).json({
        message: "Some error",
      });
    } else if (resp) {

      res.status(200).json({
        message: "Bene added Successfully",
        data: resp,
      });
    } else {
      res.status(400).json({
        message: "Some error",
      });
    }
  });
});

router.post("/getSingleBene", async (req, res, next) => {


  postBene.getSingleBene(
    {
      userId: req.body.id,
    },
    (err, resp) => {
      if (err) {

        res.status(400).json({
          message: "Some error",
        });
      } else if (resp) {

        res.status(200).json({
          data: resp,
        });
      } else {
        res.status(400).json({
          message: "Some error",
        });
      }
    }
  );
});

router.post("/getByName", async (req, res, next) => {


  postBene.getBeneByName({ beneName: req.body.beneName[0] }, (err, resp) => {
    if (err) {

      res.status(400).json({
        message: "Some Error",
      });
    } else if (resp) {

      res.status(200).json({
        data: resp,
      });
    } else {
      res.status(400).json({
        message: "Some Error",
      });
    }
  });
});

router.post("/get", async (req, res, next) => {

  postBene.getBene(
    {
      userId: req.user[0].companyId,
    },
    (err, resp) => {
      if (err) {

        res.status(400).json({
          message: "Some error",
        });
      } else if (resp) {

        res.status(200).json({
          data: resp,
        });
      } else {
        res.status(400).json({
          message: "Some error",
        });
      }
    }
  );
});

router.post("/update", async (req, res, next) => {
  postBene.updateBene(req.body.id, req.body.bene, (err, resp) => {
    if (err) {
      res.status(400).json({
        message: "Some error",
      });
    } else if (resp) {
      res.status(200).json({
        data: resp,
      });
    } else {
      res.status(400).json({
        message: "Some error",
      });
    }
  });
});

router.post("/delete", async (req, res, next) => {
  postBene.DeleteBene(req.body.id, (err, resp) => {
    if (err) {
      res.status(400).json({
        message: "Some error",
      });
    } else if (resp) {
      res.status(200).json({
        data: resp,
      });
    } else {
      res.status(400).json({
        message: "Some error",
      });
    }
  });
});