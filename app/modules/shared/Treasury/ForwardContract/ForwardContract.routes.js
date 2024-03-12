const express = require("express");
const router = express.Router();
module.exports = router;
const ForwardContractModel = require("./ForwardContract.controller");
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
const schedule = require('node-schedule');
const sgMail = require("@sendgrid/mail");
const Member = require("../../../projects/models/member.model").MemberModel;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var S3bucketName;
var BucketURL;

S3bucketName = process.env.AWS_S3_BUCKET;
BucketURL = process.env.AWS_S3_BUCKET_URL;




router.post("/add", async (req, res, next) => {
  req.body.data.userId = req.user[0].companyId;
  req.body.data.file = req.user[0].sideMenu;
  req.body.data.deleteflag = "0";
  req.body.data.date7days = addDays(new Date(req.body?.data.ToDate), 7)
  req.body.data.date3days = addDays(new Date(req.body?.data.ToDate), 3)
  req.body.data.date1days = addDays(new Date(req.body?.data.ToDate), 1)
  req.body.data.dateduesdays = addDays(new Date(req.body?.data.ToDate), 0)
  req.body.data.userDetails = req.user[0]
  ForwardContractModel.addForwardContract(req.body, (err, resp) => {
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
  ForwardContractModel.ForwardContract_get({ userId: req.user[0].companyId}, (err, resp) => {
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
  req.body.data.date7days = addDays(new Date(req.body?.data.ToDate), 7)
  req.body.data.date3days = addDays(new Date(req.body?.data.ToDate), 3)
  req.body.data.date1days = addDays(new Date(req.body?.data.ToDate), 1)
  req.body.data.dateduesdays = addDays(new Date(req.body?.data.ToDate), 0)
  ForwardContractModel.ForwardContract_update({ userId: req.user[0].companyId, id: req.body.id, data: req.body.data }, (err, resp) => {
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

var copenhagenHour = 15;//You can set any hour at which you want to schedule a job
var copenHagenMinutes = 0;//You can set any minute
var date = new Date();
date.setUTCHours(copenhagenHour - 1);//-1 defines the UTC time offset for a particular timezone
date.setUTCMinutes(copenHagenMinutes);

schedule.scheduleJob({hour: date.getHours(), minute: date.getMinutes()}, async function () {
  
  try {
    ForwardContractModel.ForwardContract_All({}, async (err, resp) => {
      resp.forEach((respelement) => {
        var bool = { bool: false, days: '' };
        if (new Date(respelement?.date7days).toLocaleDateString() == new Date().toLocaleDateString() && respelement?.MailSend7days == false) {
          bool.bool = true;
          bool.days = { MailSend7days: true }
        }
        if (new Date(respelement?.date3days).toLocaleDateString() == new Date().toLocaleDateString() && respelement?.MailSend3days == false) {
          bool.bool = true;
          bool.days = { MailSend3days: true }
        }
        if (new Date(respelement?.date1days).toLocaleDateString() == new Date().toLocaleDateString() && respelement?.MailSend1days == false) {
          bool.bool = true;
          bool.days = { MailSend1days: true }
        }
        if (new Date(respelement?.dateduesdays).toLocaleDateString() == new Date().toLocaleDateString() && respelement?.MailSendduesdays == false) {
          bool.bool = true;
          bool.days = { MailSendduesdays: true }
        }
        if (bool?.bool == true) {
          Member.find({ teamId: respelement.userId, deleteflag: '0' }, function (err, user) {
            var emaillist = []
            
            user.forEach(element => {
              emaillist.push(element?.email)
            });
            ForwardContractModel.ForwardContract_update({ userId: respelement.userId, id: respelement._id, data: bool.days }, (err, resp) => {
              var useremail = respelement?.userDetails?.emailId;
              emaillist.push(useremail)
              
              var data = new ForwardContract(respelement).getdata()
              var tableheader = `<thead><tr>`
              var tabletbody = `<tbody><tr>`
              for (const key in data) {
                const element = data[key];
                tableheader += `<th scope="col">${key}</th>`
                tabletbody += `<td scope="row">${element}</td>`
              }

              tableheader += '</tr>'
              tabletbody += '</tr>'
              var html_template = `
                <!DOCTYPE html>
                  <html>
                  <head>
                      <meta charset="utf-8" />
                      <base href="/" />
                      <title>AI based imports and exports | DocMachine</title>
                      <meta name="description"
                          content="Simplifying imports and exports to automatic processes using AI, File Bill of Entry | Shipping Bills & manage Reports through IDPMS, EDPMS to complete customs clearing">
                      <meta name="viewport" content="width=device-width, initial-scale=1" />
                      </head>
                  
                    <body style="background:#F0F2FC;">
                        <table class="table" style="background: white;
                        padding: 10px;
                        border-radius: 5px;
                        box-shadow: 0px 0px 2px 2px #c5c5c5;">${tableheader} ${tabletbody} <table>
                    </body>
                  </html>
                  `
              let uniqueArray = emaillist.filter(function (item, pos) {
                return emaillist.indexOf(item) == pos;
              })
              const msg = {
                to: uniqueArray,
                from: "noreply@bharathexim.com",
                subject: `Reminder forward no. ${data?.ForwardRefNo}/due on date ${data?.ToDate}`,
                text: `Message from ${useremail}`,
                html: html_template,
              };
              
              sgMail.send(msg).then(() => {
                
              }).catch((error) => {
                console.error(error?.response?.body.errors);
              });
            });
          });
        }
        // 
      });
    });
  } catch (error) {
    
  }

});

function addDays(dateObj, numDays) {
  dateObj.setDate(dateObj.getDate() - numDays);
  return dateObj;
}

class ForwardContract {
  constructor(data) {
    this.data = data;
  }

  getdata() {
    return {
      BookingDate: this.data?.BookingDate,
      ForwardRefNo: this.data?.ForwardRefNo,
      BuySell: this.data?.BuySell,
      Currency: this.data?.Currency,
      BookingAmount: this.data?.BookingAmount,
      UtilizedAmount: this.data?.UtilizedAmount,
      CancellationDate: this.data?.CancellationDate,
      CancellationAmount: this.data?.CancellationAmount,
      AvailableAmount: this.data?.AvailableAmount,
      FromDate: this.data?.FromDate,
      ToDate: this.data?.ToDate,
      NetRate: this.data?.NetRate,
      CancellationRate: this.data?.CancellationRate,
      BookedUnderFacility: this.data?.BookedUnderFacility,
      ImportExport: this.data?.ImportExport,
      Status: this.data?.Status,
      Underlying: this.data?.Underlying,
    }
  }
}