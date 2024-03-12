const express = require("express");
const router = express.Router();
module.exports = router;
const Buyer_Beneficiary_CreditModel = require("./buyer_credit.controller");
const fs = require("fs");
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const serviceKey = path.join("./", "root-booking-369711-aaad9db4cbfe.json");
const storageConf = { keyFilename: serviceKey };
const storage = new Storage(storageConf);
const myBucket = storage.bucket("bharathexim-files");
const axios = require('axios');
const { PDFDocument } = require('pdf-lib');
const AWS = require("aws-sdk");
const { send } = require("process");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

var S3bucketName;
var BucketURL;

S3bucketName = process.env.AWS_S3_BUCKET;
BucketURL = process.env.AWS_S3_BUCKET_URL;




router.post("/add", async (req, res, next) => {
  req.body.data.userId = req.user[0].companyId;
  req.body.data.deleteflag = "0";
  Buyer_Beneficiary_CreditModel.addPipoFile(req.body, (err, resp) => {
    if (err) {
      res.status(400).json({
        message: "Some error",
      });
    } else if (resp) {
      res.status(200).json({
        message: "Pipo added Successfully",
        data: resp,
      });
    } else {
      res.status(400).json({
        message: "Some error",
      });
    }
  });
});

router.get("/get", async (req, res, next) => {
  Buyer_Beneficiary_CreditModel.buyer_beneficiary_credit_get({ userId: req.user[0].companyId }, (err, resp) => {
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
  Buyer_Beneficiary_CreditModel.buyer_beneficiary_credit_update({ userId: req.user[0].companyId, id: req.body.id, data: req.body.data }, (err, resp) => {
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