const express = require("express");
const router = express.Router();
const misc = require("../../helpers/misc");
const resp = require("../../helpers/responseHelpers");
const ExportBillLodgementCtrl = require("./ExportBillLodgement.controller");
const schedule = require('node-schedule');
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const Member = require("../projects/models/member.model").MemberModel;
const Users = require('../projects/models/users.model.js').UserModel;
module.exports = router;
const moment = require('moment')

router.get("/get", (req, res) => {
  misc.checkUser(req, res).then((user) => {
    ExportBillLodgementCtrl.get(req).then(
      (data) => resp.successGetResponse(res, data),
      (err) => resp.errorResponse(res, err)
    );
  });
});

router.post("/getById", (req, res) => {
  misc.checkUser(req, res).then((user) => {
    ExportBillLodgementCtrl.getById(req).then(
      (data) => resp.successGetResponse(res, data),
      (err) => resp.errorResponse(res, err)
    );
  });
});

router.post("/getByIdData", (req, res) => {
  ExportBillLodgementCtrl.getById(req).then(
    (data) => {res.send({result:data})},
    (err) => res.json(err)
  );
});

router.post("/add", (req, res) => {
  req.body.data.userId = req.user[0].companyId;
  req.body.data.deleteflag = '0';
  req.body.data.UniqueId = req.body.data?.UserDetails;
  req.body.data.weeklist = getWeekJSON(moment(new Date()).format("YYYY-MM-DD"))
  req.body.data.date = moment(new Date()).format("YYYY-MM-DD")
  ExportBillLodgementCtrl.add(req.body.data).then(
    (data) => {
      res.json(data)
    },
    (err) => res.json(err)
  );
});

router.post("/updateiR", (req, res) => {
  req.body.data.userId = req.user[0].companyId;
  ExportBillLodgementCtrl.UpdateByiRAdvice(req.body.data).then(
    (data) => {
      res.json(data)
    },
    (err) => res.json(err)
  );
});

router.post("/update", (req, res) => {
  ExportBillLodgementCtrl.UpdateByid(req.body.id, req.body.data).then(
    (data) => {
      res.json(data)
    },
    (err) => res.json(err)
  );
});


router.post("/delete", (req, res) => {
  ExportBillLodgementCtrl.deletebyId(req.body.data).then((data) => { res.json(data) },
    (err) => res.json(err)
  );
});

router.post("/Amount_Update", (req, res) => {
  ExportBillLodgementCtrl.Amount_Update(req.body).then((data) => { res.json(data) }, (err) => res.json(err));
});

router.post("/Amount_UpdateSB", (req, res) => {
  ExportBillLodgementCtrl.Amount_UpdateSB(req.body).then((data) => { res.json(data) }, (err) => res.json(err));
});

router.get("/getByIdTransactionType", async (req, res) => {
  await ExportBillLodgementCtrl.getAllTransactionById(req.user[0].companyId, 'Export-Direct-Dispatch').then(async (resp) => {
    if (resp) {
      await ExportBillLodgementCtrl.getAllTransactionById(req.user[0].companyId, 'Inward-Remitance-Dispoal').then(async (resp1) => {
        if (resp) {
          res.json({ data: resp, INWARD_DISPOSAL: resp1 })
        }
      }).catch((err) => {
        res.json({ data: '' })
      })
    }
  }).catch((err) => {
    res.json({ data: '' })
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
            // 
            const msg = {
              to: uniqueArray,
              from: "noreply@bharathexim.com",
              subject: `Reminder Export-Direct-Dispatch not submitted bank`,
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
    await ExportBillLodgementCtrl.getAllTransaction('Export-Direct-Dispatch').then(async (resp) => {
      if (resp) {
        for (let index = 0; index < resp.length; index++) {
          const element = resp[index];
          if (element?.Ref_Data == undefined) {
            await Member.find({ teamId: element.userId, deleteflag: '0' }, async function (err, user) {
              var emaillist = ['it@bharathexim.com']
              user.forEach(async (element) => {
                await emaillist.push(element?.email)
              });
              if (bundel_data[element.userId] != undefined) {
                bundel_data[element.userId]['emaillist'] = (emaillist);
                for (let index = 0; index < element?.weeklist.length; index++) {
                  const weeklist_element = element?.weeklist[index];
                  if (weeklist_element?.date == new Date().toDateString() && weeklist_element?.status == false) {
                    weeklist_element.status = true;
                    var data = new ModifiyTransaction(element?.data).getTransaction();
                    ExportBillLodgementCtrl.UpdateStatusWeek(element?.id, { weeklist: element?.weeklist }).then(async (resp1) => {
                      await bundel_data[element.userId]['data'].push({ data: data, weekdata: weeklist_element });
                    })
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

class ModifiyTransaction {
  constructor(data) {
    this.data = data;
  }

  getTransaction() {
    return {
      ShippingBill: this.data.Shipping_bill_list ? JSON.stringify(new ModifiyShippingBill(this.data.Shipping_bill_list).getShippingBill()) : '',
      Charges_to_Bank: this.data.Charges_to_Bank ? JSON.stringify(this.data.Charges_to_Bank) : '',
      Total_SB_Amount: this.data.Total_SB_Amount ? this.data.Total_SB_Amount : '',
      Total_FIRX_Amount: this.data.Total_FIRX_Amount ? this.data.Total_FIRX_Amount : '',
      Total_Reaming_Amount: this.data.Total_Reaming_Amount ? this.data.Total_Reaming_Amount : '',
    }
  }
}

class ModifiyShippingBill {
  constructor(data) {
    this.data = data;
  }

  getShippingBill() {
    var temp = [];
    this.data.forEach(element => {
      temp.push(JSON.stringify({
        sbno: element?.sbno ? element?.sbno : '',
        sbdate: element?.sbdate ? element?.sbdate : '',
        adBillNo: element?.adBillNo ? element?.adBillNo : '',
        portCode: element?.portCode ? element?.portCode : '',
        ieccode: element?.ieccode ? element?.ieccode : '',
        iecName: element?.iecName ? element?.iecName : '',
        adCode: element?.adCode ? element?.adCode : '',
        leodate: element?.leodate ? element?.leodate : '',
        Currency: element?.fobCurrency ? element?.fobCurrency : '',
        'SB Amount': element?.fobValue ? element?.fobValue : '',
        buyerName: element?.buyerName ? element?.buyerName : [],
      }))
    });
    return temp.join(',')
  }
}