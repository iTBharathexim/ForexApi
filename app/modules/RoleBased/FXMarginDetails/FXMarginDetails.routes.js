const express = require("express");
const router = express.Router();
const FXMarginDetailsCtrl = require("./FXMarginDetails.controller");
const CouponCodeDiscount = require("../CouponCode/CouponCodeSchema").CouponCodeDiscountProductModel;
const moment = require("moment");

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set region
AWS.config.update({
    region: 'ap-south-1',
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
});

router.post("/post", (req, res) => {
    
    FXMarginDetailsCtrl.addUser(req.body).then((userres) => {
        
        let KEYS = (req.body?.data?.userId + '_FXMarginDetails')?.toString();
        let success = myCache.set(KEYS?.toString(), { FXMarginDetails: userres?.result }, 10000);
        
        res.status(200).json(userres);
    })
});

router.post("/TradeAppLogin", (req, res) => {
    FXMarginDetailsCtrl.TradeAppLogin(req?.body?.email, req?.body?.password).then((docs) => {
        
        res.json({ docs: docs, Authenticated: "Authenticated" });
    })
});

router.post("/TradeAppLoginMPIN", (req, res) => {
    FXMarginDetailsCtrl.TradeAppLoginMPIN(req?.body?.email, req?.body?.MPIN).then((docs) => {
        
        res.json({ docs: docs, Authenticated: "Authenticated" });
    })
});

router.post("/TradeAppResetPassword", (req, res) => {
    FXMarginDetailsCtrl.TradeAppResetPassword(req?.body?.email, req?.body?.password).then((docs) => {
        
        res.json({ docs: docs, Authenticated: "Authenticated" });
    })
});

router.post("/get", (req, res) => {
    if (req.body?.userId != undefined) {
        FXMarginDetailsCtrl.getUser(req.body).then((userres) => {
            res.json({ FXMarginDetails: userres });
        })
    }
});

router.get("/getUserDetails", (req, res) => {
    
    FXMarginDetailsCtrl.getUserDetails().then((userres) => {
        
        res.status(200).send(userres);
    })
});

router.post("/updateemail", (req, res) => {
    
    FXMarginDetailsCtrl.update_email(req).then((userres) => {
        
        res.status(200).send(userres);
    })
});

router.post("/update", (req, res) => {
    
    FXMarginDetailsCtrl.updateUserById(req?.body?.id, req?.body?.data).then((userres) => {
        let KEYS = (req.body?.id + '_FXMarginDetails')?.toString();
        let success = myCache.set(KEYS?.toString(), { FXMarginDetails: userres?.result }, 10000);
        
        res.status(200).json(userres);
    })
});

router.post("/SendOtpEmail", (req, res) => {
    
    FXMarginDetailsCtrl.OTP_SEND_EMAIL(req).then((userres) => {
        
        res.status(200).json(userres);
    })
});

router.post('/webhook', (req, res) => {
    
    res.sendStatus(200);
});

router.get("/RazorpaySubscriptionAll", (req, res) => {
    FXMarginDetailsCtrl.RazorpaySubscriptionAll().then((userres) => {
        res.status(200).json(userres);
    })
});

router.get("/RazorpayPlanAll", (req, res) => {
    FXMarginDetailsCtrl.RazorpayPlanAll().then((userres) => {
        res.status(200).json(userres);
    })
});

router.get("/RazorpayOrderAll", (req, res) => {
    FXMarginDetailsCtrl.RazorpayOrderAll().then((userres) => {
        res.status(200).json(userres);
    })
});

router.post("/RazorpayPaymentsAll", (req, res) => {
    FXMarginDetailsCtrl.RazorpayPaymentsAll().then((userres) => {
        res.status(200).json(userres);
    })
});

router.post("/createOrder", (req, res) => {
    FXMarginDetailsCtrl.createOrder(req.body?.data).then((userres) => {
        res.status(200).json(userres);
    })
});

router.post("/OrderById", (req, res) => {
    FXMarginDetailsCtrl.OrderById(req.body?.id).then((userres) => {
        res.status(200).json(userres);
    })
});

router.post("/RazorpayPaymentsbyOrderId", (req, res) => {
    FXMarginDetailsCtrl.RazorpayPaymentsbyOrderId(req.body?.id).then((userres) => {
        res.status(200).json(userres);
    })
});

router.post("/CouponValidation", (req, res) => {
    
    try {
        CouponCodeDiscount.find({ couponCodeName: req?.body?.couponCodeName }, (err, res1) => {
            if (err) {
                res.json({ err: err })
            }
            if (res1?.length != 0) {
                if (compareDates(new Date(res1[0]?.StartDate), new Date(res1[0]?.EndDate))) {
                    res.json({ data: res1, status: true })
                } else {
                    res.json({ data: res1, status: false })
                }
            } else {
                res.json({ data: res1, notfound: true })
            }
        })
    } catch (err) {
        
    }

    const compareDates = (d1, d2) => {
        var dateFrom = moment(new Date(d1)).format("YYYY-MM-DD");
        var dateTo = moment(new Date(d2)).format("YYYY-MM-DD");
        var dateCheck = moment(new Date()).format("YYYY-MM-DD")
        var d1 = dateFrom.split("-");
        var d2 = dateTo.split("-");
        var c = dateCheck.split("-");
        var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);
        var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
        var check = new Date(c[2], parseInt(c[1]) - 1, c[0]);
        return check >= from && check <= to;
    };
});

var myCache = null;
function callMemoryCache(NodeCache) {
    myCache = NodeCache;
    
}
module.exports = { router: router, callMemoryCache: callMemoryCache };