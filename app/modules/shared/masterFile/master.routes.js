const express = require("express");
const router = express.Router();
module.exports = router;
const postMaster = require('../masterFile/master.controller');
const postPipo = require("../PI_PO/pi_po.controller");

const schedule = require('node-schedule');
const sgMail = require("@sendgrid/mail");
const { resolve } = require("path");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const Member = require("../../projects/models/member.model").MemberModel;
const Users = require('../../projects/models/users.model.js').UserModel;

router.get("/get", async (req, res, next) => {
    postMaster.getMaster({
        userId: req.user[0].companyId,
        filetype: req.user[0]?.sideMenu
    }, (err, resp) => {
        if (err) {
            res.status(400).json({ message: "Some error" })
        } else if (resp) {
            res.status(200).json({ message: "Getting Master data", data: resp })
        } else {
            res.status(400).json({ message: "Some error" })
        }
    })
});

router.post("/buyerName", async (req, res, next) => {
    postMaster.getMasterbuyerName({
        userId: req.user[0].companyId,
        filetype: req.user[0]?.sideMenu,
        buyerName: req?.body?.buyerName
    }, (err, resp) => {
        if (err) {
            res.status(400).json({ message: "Some error" })
        } else if (resp) {
            res.status(200).json({ message: "Getting Master data", data: resp })
        } else {
            res.status(400).json({ message: "Some error" })
        }
    })
});

router.get("/getSbByPipo/:pipo", async (req, res, next) => {
    let data = await postMaster.getSbByPipo(req, res)
    res.send(data)

});

router.post("/add", async (req, res, next) => {
    req.body.data.userId = req.user[0].companyId;
    req.body.data.weeklist = getWeekJSON(req.body.data?.sbdate)
    postMaster.addMasterFile(req.body.data, (er1, resp1) => {
        if (er1) {
            res.status(400).json({ message: "Some Error" })
        } else if (resp1) {
            res.status(200).json({ message: "Shipping bill added successfully", data: resp1 })
        }
    })
});

router.post("/update", async (req, res, next) => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    req.body.master.uploaddate = `${day}-${month}-${year}`;
    postMaster.updateMaster(req.body._id, req.body.master, (err, resp) => {
        if (err) {
            res.status(400).json({ message: "Some error" })
        } else if (resp) {
            res.status(200).json({ message: "Upload was successful", data: resp })
        } else {
            res.status(400).json({ message: "Some error" })
        }
    })
});

router.post("/updateBlCopyRef", async (req, res, next) => {
    postMaster.updateMaster(req.body._id, req.body.master, (err, resp) => {
        if (err) {
            res.status(400).json({ message: "Some error" })
        } else if (resp) {
            res.status(200).json({ message: "updated was successful", data: resp })
        } else {
            res.status(400).json({ message: "Some error" })
        }
    })
});


router.post("/updateBySb", async (req, res, next) => {
    postMaster.updateMasterBySb(
        req.body.master, req.body.sbno, req.user[0].companyId, (err, resp) => {
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

router.post("/getMasterBySb", async (req, res, next) => {
    postMaster.getMasterBySb({
        sbno: req.body.sbno,
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

router.get("/mergePISb", async (req, res) => {
    postMaster.getMaster({
        userId: req.user[0].companyId,
    }, (err, masterData) => {
        if (err) {
            res.json({
                message: "data not found, Some Error"
            })
        } else {
            postPipo.getPipo({
                userId: req.user[0].companyId,
            },
                (err, pipoData) => {
                    let mergeData = []
                    let index = []
                    if (err) {
                        res.status(400).json({
                            message: "Some error",
                        });
                    } else {
                        let i = 0
                        for (let master of masterData) {
                            for (let pi of pipoData) {
                                let currentpipo = master.pipo[0]
                                if (currentpipo == pi.pi_poNo) {
                                    let newData = {}
                                    newData.sbno = master.sbno
                                    newData.sbdate = master.sbdate
                                    newData.portCode = master.portCode
                                    newData.pipo = master.pipo
                                    newData.iecName = master.iecName
                                    newData.ieccode = master.ieccode
                                    newData.exporterLocationCode = master.exporterLocationCode
                                    newData.countryOfFinaldestination = master.countryOfFinaldestination
                                    newData.consigneeName = master.consigneeName
                                    newData.adCode = master.adCode
                                    newData.userId = master.userId
                                    newData.buyerName = master.buyerName
                                    newData.exchangeRate = master.exchangeRate
                                    newData.uploaddate = master.uploaddate
                                    newData.file = master.file
                                    newData.sbDoc = master.doc
                                    newData['amount'] = pi.amount
                                    newData['paymentTerm'] = pi.paymentTerm
                                    newData['commercial'] = pi.commercial
                                    newData['lastDayShipment'] = pi.lastDayShipment
                                    newData['paymentTerm'] = pi.paymentTerm
                                    newData['pipoDate'] = pi.date
                                    newData['location'] = pi.location
                                    newData['poDoc1'] = pi.doc1
                                    newData['piDoc'] = pi.doc
                                    newData['document'] = pi.document
                                    newData['purchasedate'] = pi.document
                                    newData['airwayBlcopy'] = pi.airwayBlcopy
                                    newData['sb'] = pi.sb
                                    newData['packingList'] = pi.packingList

                                    mergeData.push(newData)
                                    index.push(i)

                                }
                                i++;
                            }
                        }
                        res.json({ mergeData: mergeData })
                    }
                })

        }
    })
});


router.get("/getScheduler", async (req, res) => {
    
    try {
        await postMaster.getMasterById({ userId: req.user[0].companyId }, async (err, resp) => {
            
            if (resp) {
                res.json({ data: resp })
            }
        })
    } catch (error) {
        
    }
});

// var rule = new schedule.RecurrenceRule();
// rule.second = 2;
// ruleServices.hour = new schedule.Range(0,0,5);
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
                        var sbno = [];
                        var sbdate = [];
                        var keys = Object.keys(element?.data[0]?.data);
                        keys.forEach(element => {
                            tableheader += `<th scope="col">${element}</th>`
                        });
                        element?.data?.forEach(data_element => {
                            tabletbody += `<tr>`
                            sbno.push(data_element?.data['sbno'])
                            sbdate.push(data_element?.data['sbdate'])
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
                            subject: `Reminder Shipping bill not submitted bank  Sb No. ${sbno?.join(',')}/ due on date ${sbdate.join(',')}`,
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
        await postMaster.getAllMaster({}, async (err, resp) => {
            if (resp) {
                for (let index = 0; index < resp.length; index++) {
                    const element = resp[index];
                    if (element?.balanceAvai != '0' && element?.alertmsg == false) {
                        await Member.find({ teamId: element.userId, deleteflag: '0' }, async function (err, user) {
                            var emaillist = ['it@bharathexim.com']
                            user.forEach(async (element) => {
                                await emaillist.push(element?.email)
                            });
                            var data = new ShippingBill(element).getShippingBill();
                            var data2 = new ModifiyShippingBill(element).getShippingBill();
                            if (bundel_data[element.userId] != undefined) {
                                bundel_data[element.userId]['emaillist'] = (emaillist);
                                for (let index = 0; index < element?.weeklist.length; index++) {
                                    const weeklist_element = element?.weeklist[index];
                                    if (weeklist_element?.date == new Date().toDateString() && weeklist_element?.status == false) {
                                        weeklist_element.status = true;
                                        postMaster.updateMasterWeek(data?.id, { weeklist: data?.weeklist }, async function (err, resp1) {
                                            await bundel_data[element.userId]['data'].push({ data: data2, weekdata: weeklist_element });
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

class Invoice {
    constructor(data) {
        this.data = data;
    }
    getInvoice() {
        return {
            sno: this.data.sno ? this.data.sno : '',
            invoiceno: this.data.invoiceno ? this.data.invoiceno : '',
            amount: this.data.amount ? this.data.amount : '',
            currency: this.data.currency ? this.data.currency : '',
        }
    }
}

class ShippingBill {
    constructor(data) {
        this.data = data;
    }

    getShippingBill() {
        return {
            sbno: this.data.sbno ? this.data.sbno : '',
            sbdate: this.data.sbdate ? this.data.sbdate : '',
            adBillNo: this.data.adBillNo ? this.data.adBillNo : '',
            portCode: this.data.portCode ? this.data.portCode : '',
            ieccode: this.data.ieccode ? this.data.ieccode : '',
            iecName: this.data.iecName ? this.data.iecName : '',
            adCode: this.data.adCode ? this.data.adCode : '',
            leodate: this.data.leodate ? this.data.leodate : '',
            processingStaus: this.data.processingStaus ? this.data.processingStaus : '',
            Currency: this.data.fobCurrency ? this.data.fobCurrency : '',
            'SB Amount': this.data.fobValue ? this.data.fobValue : '',
            weeklist: this.data.weeklist ? this.data.weeklist : '',
            realizedFobCurrency: this.data.realizedFobCurrency ? this.data.realizedFobCurrency : '',
            realizedFobValue: this.data.realizedFobValue ? this.data.realizedFobValue : '',
            equivalentFobValue: this.data.equivalentFobValue ? this.data.equivalentFobValue : '',
            invoices: createInvoice(this.data.invoices) ? this.data.invoices : [],
            freightCurrency: this.data.freightCurrency ? this.data.freightCurrency : '',
            freightValue: this.data.freightValue ? this.data.freightValue : '',
            realizedfreightCurrency: this.data.realizedfreightCurrency ? this.data.realizedfreightCurrency : '',
            realizedfreightValue: this.data.realizedfreightValue ? this.data.realizedfreightValue : '',
            insuranceCurrency: this.data.insuranceCurrency ? this.data.insuranceCurrency : '',
            insuranceValue: this.data.insuranceValue ? this.data.insuranceValue : '',
            realizedInsuranceValue: this.data.realizedInsuranceValue ? this.data.realizedInsuranceValue : '',
            bankingCharges: this.data.bankingCharges ? this.data.bankingCharges : '',
            expectedPaymentlastdate: this.data.expectedPaymentlastdate ? this.data.expectedPaymentlastdate : '',
            AddedDate: this.data.AddedDate ? this.data.AddedDate : '',
            modifiedDate: this.data.modifiedDate ? this.data.modifiedDate : '',
            exporterLocationCode: this.data.exporterLocationCode ? this.data.exporterLocationCode : '',
            countryOfFinaldestination: this.data.countryOfFinaldestination ? this.data.countryOfFinaldestination : '',
            consigneeName: this.data.consigneeName ? this.data.consigneeName : '',
            exchangeRate: this.data.exchangeRate ? this.data.exchangeRate : '',
            irRef: this.data.irRef ? this.data.irRef : [],
            buyerName: this.data.buyerName ? this.data.buyerName : [],
            id: this.data._id ? this.data._id : ''
        }
    }
}

class ModifiyShippingBill {
    constructor(data) {
        this.data = data;
    }

    getShippingBill() {
        return {
            sbno: this.data.sbno ? this.data.sbno : '',
            sbdate: this.data.sbdate ? this.data.sbdate : '',
            adBillNo: this.data.adBillNo ? this.data.adBillNo : '',
            portCode: this.data.portCode ? this.data.portCode : '',
            ieccode: this.data.ieccode ? this.data.ieccode : '',
            iecName: this.data.iecName ? this.data.iecName : '',
            adCode: this.data.adCode ? this.data.adCode : '',
            leodate: this.data.leodate ? this.data.leodate : '',
            processingStaus: this.data.processingStaus ? this.data.processingStaus : '',
            Currency: this.data.fobCurrency ? this.data.fobCurrency : '',
            'SB Amount': this.data.fobValue ? this.data.fobValue : '',
            realizedFobCurrency: this.data.realizedFobCurrency ? this.data.realizedFobCurrency : '',
            realizedFobValue: this.data.realizedFobValue ? this.data.realizedFobValue : '',
            equivalentFobValue: this.data.equivalentFobValue ? this.data.equivalentFobValue : '',
            invoices: createInvoice(this.data.invoices) ? this.data.invoices : [],
            freightCurrency: this.data.freightCurrency ? this.data.freightCurrency : '',
            freightValue: this.data.freightValue ? this.data.freightValue : '',
            realizedfreightCurrency: this.data.realizedfreightCurrency ? this.data.realizedfreightCurrency : '',
            realizedfreightValue: this.data.realizedfreightValue ? this.data.realizedfreightValue : '',
            insuranceCurrency: this.data.insuranceCurrency ? this.data.insuranceCurrency : '',
            insuranceValue: this.data.insuranceValue ? this.data.insuranceValue : '',
            realizedInsuranceValue: this.data.realizedInsuranceValue ? this.data.realizedInsuranceValue : '',
            bankingCharges: this.data.bankingCharges ? this.data.bankingCharges : '',
            expectedPaymentlastdate: this.data.expectedPaymentlastdate ? this.data.expectedPaymentlastdate : '',
            AddedDate: this.data.AddedDate ? this.data.AddedDate : '',
            modifiedDate: this.data.modifiedDate ? this.data.modifiedDate : '',
            exporterLocationCode: this.data.exporterLocationCode ? this.data.exporterLocationCode : '',
            countryOfFinaldestination: this.data.countryOfFinaldestination ? this.data.countryOfFinaldestination : '',
            consigneeName: this.data.consigneeName ? this.data.consigneeName : '',
            exchangeRate: this.data.exchangeRate ? this.data.exchangeRate : '',
            irRef: this.data.irRef ? this.data.irRef : [],
            buyerName: this.data.buyerName ? this.data.buyerName : [],
        }
    }
}

function createInvoice(data) {
    let invoice = [];
    for (let i in data) {
        invoice.push(new Invoice(i))
    }
    return invoice;
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