const express = require("express");
const router = express.Router();
module.exports = router;
const uploadImage = require('../../../helpers/helper2');
const postDocument = require('../documents/document.controller');
const BoeModel = require('../boeFile/boe.model');
const postBoe = require('../boeFile/boe.controller');

const schedule = require('node-schedule');
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const Member = require("../../projects/models/member.model").MemberModel;
const Users = require('../../projects/models/users.model.js').UserModel;

router.post("/uploadFile", async (req, res, next) => {
  if (true) {
    try {
      const myFile = req.file;
      const name = myFile.originalname.replace(/ /g, "_");
      const size = (myFile.size / 1024).toFixed(2).toString() + "KB";
      const result = await uploadImage(myFile);
      postDocument.addDocument({
        userId: req.user[0].companyId,
        docName: name,
        docSize: size,
        docType: myFile.mimetype
      }, (err, resp) => {
        if (err) {
          res
            .status(400)
            .json({
              message: "Some error",
              //data: imageUrl
            })
        } else if (res) {
          result.userId = `${req.user[0].companyId}`;
          BoeModel.addBoeFile(result, (er1, resp1) => {
            if (er1) {
              res
                .status(400)
                .json({
                  message: "Some error",
                  //data: imageUrl
                })
            }
            else if (resp1) {
              res
                .status(201)
                .json({
                  message: "Success!!!",
                  data: resp1
                })
            }

          })
        } else {
          res
            .status(400)
            .json({
              message: "Some error",
              //data: imageUrl
            })
        }
      })

    } catch (error) {
      next(error)
    }
  }
  else {
    // res.unauthorized(res, "Unauthorized");
  }

});

router.get("/get", async (req, res, next) => {
  postBoe.getBoe({ userId: req.user[0].companyId }, (err, resp) => {
    if (err) {
      res.status(400).json({ message: "Some error" })
    } else if (resp) {
      res.status(200).json({ message: "Upload was successful", data: resp })
    } else {
      res.status(400).json({ message: "Some error" })
    }
  })
});

router.get("/getByIdScheduler", async (req, res, next) => {
  postBoe.getBoe({ userId: req.user[0].companyId }, (err, resp) => {
    if (err) {
      res.status(400).json({ message: "Some error" })
    } else if (resp) {
      res.status(200).json({ message: "Upload was successful", data: resp })
    } else {
      res.status(400).json({ message: "Some error" })
    }
  })
});

router.post("/getbyPartName", async (req, res, next) => {
  postBoe.getBoebyPartName({ userId: req.user[0].companyId, benneName: req.body.benneName }, (err, resp) => {
    if (err) {
      res.status(400).json({ message: "Some error" })
    } else if (resp) {
      res.status(200).json({ message: "Upload was successful", data: resp })
    } else {
      res.status(400).json({ message: "Some error" })
    }
  })
});

router.post("/update", async (req, res, next) => {
  postBoe.updateBoe(
    req.body._id, req.body.master, (err, resp) => {
      if (err) {
        res
          .status(400)
          .json({
            message: "Some error",

          })
      } else if (resp) {

        res.status(200)
          .json({
            message: "Upload was successful",
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

router.post("/updateByBoe", async (req, res, next) => {
  postBoe.updateBoeByBoe(
    req.body._id, req.body.master, (err, resp) => {
      if (err) {
        res
          .status(400)
          .json({
            message: "Some error",

          })
      } else if (resp) {

        res.status(200)
          .json({
            message: "Upload was successful",
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

router.post("/post", (req, res) => {
  req.body.data.userId = req.user[0].companyId;
  req.body.data.weeklist = getWeekJSON(req.body.data?.boeDate)
  postBoe.addBoeFile(req.body.data, (err, data) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(data)
  });
});


router.post("/getBoeByBoe", async (req, res, next) => {
  postBoe.getBoeByBoe(
    {
      boeNumber: req.body.boeNumber,
      userId: req.user[0].companyId
    }, (err, resp) => {
      if (err) {

        res
          .status(400)
          .json({
            message: "Some error",

          })
      } else if (resp) {

        res.status(200)
          .json({
            message: "Upload was successful",
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

router.post("/getBoeByBene", async (req, res, next) => {
  postBoe.getBoeByBene({
    beneName: req.body.bene,
    userId: req.user[0].companyId
  }, (err, resp) => {
    if (err) {
      res.status(400).json({
        message: "Some error",
      })
    } else if (resp) {
      res.status(200)
        .json({
          message: "Upload was successful",
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

router.post("/getBoebyPipo", async (req, res, next) => {
  postBoe.getBoebyPipo({
    userId: req.user[0].companyId,
    benneName: req.body.benneNamez
  }, (err, resp) => {
    if (err) {
      res.status(400).json({
        message: "Some error",
      })
    } else if (resp) {
      res.status(200)
        .json({
          message: "Upload was successful",
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


var copenhagenHour = 15;//You can set any hour at which you want to schedule a job
var copenHagenMinutes = 0;//You can set any minute
var date = new Date();
date.setUTCHours(copenhagenHour - 1);//-1 defines the UTC time offset for a particular timezone
date.setUTCMinutes(copenHagenMinutes);

schedule.scheduleJob({hour: date.getHours(), minute: date.getMinutes()}, async function () {
  var bundel_data = [];
  
  try {
    getUserList().then(async (res) => {
      bundel_data = res;
      getdata(bundel_data).then((resdata) => {
        var tableheader = `<thead><tr>`
        var tabletbody = `<tbody>`
        for (const key in resdata) {
          const element = resdata[key];
          if (element?.data.length != 0) {
            var keys = Object.keys(element?.data[0]?.data);
            keys.forEach(element => {
              tableheader += `<th scope="col">${element}</th>`
            });
            element?.data?.forEach(data_element => {
              tabletbody += `<tr>`
              for (const key in data_element?.data) {
                const element = data_element?.data[key];
                tabletbody += `<td scope="row">${element}</td>`
              }
              tabletbody += `</tr>`
            });

            tableheader += '</tr>'
            var html_template = `
                            <table class="table" style="background: white;
                            padding: 10px;
                            border-radius: 5px;
                            box-shadow: 0px 0px 2px 2px #c5c5c5;">${tableheader} ${tabletbody} <table>`;

            let uniqueArray = element?.emaillist?.filter(function (item, pos) {
              return element?.emaillist?.indexOf(item) == pos;
            })
            
            const msg = {
              to: uniqueArray,
              from: "noreply@bharathexim.com",
              subject: `Reminder BOE not submitted bank`,
              text: `Message from admin`,
              html: html_template,
            };
            
            sgMail.send(msg).then(() => {
              
            }).catch((error) => {
              console.error(error?.response?.body.errors);
            });
          }
        }
      })
    })
  } catch (error) {
    
  }
})

function getUserList() {
  var bundel_data = {};
  return new Promise(async (resolve, reject) => {
    await Users.find({}, async (err, res) => {
      await res.forEach(element => {
        if (element.companyId != undefined) {
          bundel_data[element.companyId] = {
            data: [],
            emaillist: []
          }
        }
      });
      await resolve(bundel_data);
    });
  })
}

function getdata(bundel_data) {
  return new Promise(async (resolve, reject) => {
    await postBoe.getBoeAll({}, async (err, resp) => {
      if (resp) {
        for (let index = 0; index < resp.length; index++) {
          const element = resp[index];
          if (element?.balanceAmount != '0') {
            await Member.find({ teamId: element.userId, deleteflag: '0' }, async function (err, user) {
              var emaillist = ['it@bharathexim.com']
              user.forEach(async (element) => {
                await emaillist.push(element?.email)
              });
              var data = new BOE(element).getBoe();
              var data2 = new ModifiyBOE(element).getBoe();
              if (bundel_data[element.userId] != undefined) {
                bundel_data[element.userId]['emaillist'] = (emaillist);
                for (let index = 0; index < element?.weeklist?.length; index++) {
                  const weeklist_element = element?.weeklist[index];
                  if (weeklist_element?.date == new Date().toDateString() && weeklist_element?.status == false) {
                    weeklist_element.status = true;
                    await bundel_data[element.userId]['data'].push({ data: data2, weekdata: weeklist_element });
                    postBoe.updateBoe(data?.id, { weeklist: data?.weeklist }, async function (err, resp1) { });
                  }
                }
              }
            });
          }
          if ((index + 1) == resp.length) {
            await resolve(bundel_data);
          }
        }
      }
    })
  })
}

class BOE {
  constructor(data) {
    this.data = data;
  }

  getBoe() {
    return {
      userId: this.data.userId ? this.data.userId : '',
      dischargePort: this.data.dischargePort ? this.data.dischargePort : '',
      boeNumber: this.data.boeNumber ? this.data.boeNumber : '',
      boeDate: this.data.boeDate ? this.data.boeDate : '',
      iecCode: this.data.iecCode ? this.data.iecCode : '',
      iecName: this.data.iecName ? this.data.iecName : '',
      adCode: this.data.adCode ? this.data.adCode : '',
      weeklist: this.data.weeklist ? this.data.weeklist : '',
      invoiceNumber: this.data.invoiceNumber ? this.data.invoiceNumber : '',
      invoiceAmount: this.data.invoiceAmount ? this.data.invoiceAmount : '',
      currency: this.data.currency ? this.data.currency : '',
      settledAmount: this.data.settledAmount ? this.data.settledAmount : '',
      status: this.data.status ? this.data.status : '',
      freightAmount: this.data.freightAmount ? this.data.freightAmount : '',
      freightCurrency: this.data.freightCurrency ? this.data.freightCurrency : '',
      insuranceAmount: this.data.insuranceAmount ? this.data.insuranceAmount : '',
      insuranceCurrency: this.data.insuranceCurrency ? this.data.insuranceCurrency : '',
      discountAmount: this.data.discountAmount ? this.data.discountAmount : '',
      discountCurrency: this.data.discountCurrency ? this.data.discountCurrency : '',
      miscellaneousAmount: this.data.miscellaneousAmount ? this.data.miscellaneousAmount : '',
      miscellaneousCurrency: this.data.miscellaneousCurrency ? this.data.miscellaneousCurrency : '',
      commissionAmount: this.data.commissionAmount ? this.data.commissionAmount : '',
      commissionCurrency: this.data.commissionCurrency ? this.data.commissionCurrency : '',
      AWBNo: this.data.AWBNo ? this.data.AWBNo : '',
      id: this.data._id ? this.data._id : ''
    }
  }
}

class ModifiyBOE {
  constructor(data) {
    this.data = data;
  }

  getBoe() {
    return {
      dischargePort: this.data.dischargePort ? this.data.dischargePort : '',
      boeNumber: this.data.boeNumber ? this.data.boeNumber : '',
      boeDate: this.data.boeDate ? this.data.boeDate : '',
      iecCode: this.data.iecCode ? this.data.iecCode : '',
      iecName: this.data.iecName ? this.data.iecName : '',
      adCode: this.data.adCode ? this.data.adCode : '',
      invoiceNumber: this.data.invoiceNumber ? this.data.invoiceNumber : '',
      invoiceAmount: this.data.invoiceAmount ? this.data.invoiceAmount : '',
      currency: this.data.currency ? this.data.currency : '',
      settledAmount: this.data.settledAmount ? this.data.settledAmount : '',
      status: this.data.status ? this.data.status : '',
      freightAmount: this.data.freightAmount ? this.data.freightAmount : '',
      freightCurrency: this.data.freightCurrency ? this.data.freightCurrency : '',
      insuranceAmount: this.data.insuranceAmount ? this.data.insuranceAmount : '',
      insuranceCurrency: this.data.insuranceCurrency ? this.data.insuranceCurrency : '',
      discountAmount: this.data.discountAmount ? this.data.discountAmount : '',
      discountCurrency: this.data.discountCurrency ? this.data.discountCurrency : '',
      miscellaneousAmount: this.data.miscellaneousAmount ? this.data.miscellaneousAmount : '',
      miscellaneousCurrency: this.data.miscellaneousCurrency ? this.data.miscellaneousCurrency : '',
      commissionAmount: this.data.commissionAmount ? this.data.commissionAmount : '',
      commissionCurrency: this.data.commissionCurrency ? this.data.commissionCurrency : '',
      AWBNo: this.data.AWBNo ? this.data.AWBNo : ''
    }
  }
}

function getWeekJSON(date) {
  let week = 21 / 7;
  var listweek = [];
  for (let i = 0; i < week; i++) {
    let d = new Date(date);
    d.setDate(d.getDate() + 7 * (i + 1))
    listweek.push({ date: d.toDateString(), status: false })
  }
  return listweek;
}