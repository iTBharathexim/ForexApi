const express = require("express");
const router = express.Router();
const BenchMarksCtrl = require("./BenchMarks.controller");
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
    
    BenchMarksCtrl.addUser(req.body).then((userres) => {
        
        res.status(200).json(userres);
    })
});

router.post("/TradeAppLogin", (req, res) => {
    BenchMarksCtrl.TradeAppLogin(req?.body?.email, req?.body?.password).then((docs) => {
        
        res.json({ docs: docs, Authenticated: "Authenticated" });
    })
});

router.post("/TradeAppLoginMPIN", (req, res) => {
    BenchMarksCtrl.TradeAppLoginMPIN(req?.body?.email, req?.body?.MPIN).then((docs) => {
        
        res.json({ docs: docs, Authenticated: "Authenticated" });
    })
});

router.post("/TradeAppResetPassword", (req, res) => {
    BenchMarksCtrl.TradeAppResetPassword(req?.body?.email, req?.body?.password).then((docs) => {
        
        res.json({ docs: docs, Authenticated: "Authenticated" });
    })
});

router.post("/get", (req, res) => {
    BenchMarksCtrl.getUser(req.body).then((userres) => {
        
        res.status(200).send(userres);
    })
});

router.get("/getUserDetails", (req, res) => {
    
    BenchMarksCtrl.getUserDetails().then((userres) => {
        
        res.status(200).send(userres);
    })
});

router.post("/updateemail", (req, res) => {
    
    BenchMarksCtrl.update_email(req).then((userres) => {
        
        res.status(200).send(userres);
    })
});

var myCache = null;
function callMemoryCache(NodeCache) {
    myCache = NodeCache;
    
}
module.exports = { router: router, callMemoryCache: callMemoryCache };

router.post("/update", (req, res) => {
    
    BenchMarksCtrl.updateUserById(req?.body?.id, req?.body?.data).then((userres) => {
        
        res.status(200).json(userres);
    })
});

router.post("/SendOtpEmail", (req, res) => {
    
    BenchMarksCtrl.OTP_SEND_EMAIL(req).then((userres) => {
        
        res.status(200).json(userres);
    })
});

router.post('/webhook', (req, res) => {
    
    res.sendStatus(200);
});

router.get("/RazorpaySubscriptionAll", (req, res) => {
    BenchMarksCtrl.RazorpaySubscriptionAll().then((userres) => {
        res.status(200).json(userres);
    })
});

router.get("/RazorpayPlanAll", (req, res) => {
    BenchMarksCtrl.RazorpayPlanAll().then((userres) => {
        res.status(200).json(userres);
    })
});

router.get("/RazorpayOrderAll", (req, res) => {
    BenchMarksCtrl.RazorpayOrderAll().then((userres) => {
        res.status(200).json(userres);
    })
});

router.post("/RazorpayPaymentsAll", (req, res) => {
    BenchMarksCtrl.RazorpayPaymentsAll().then((userres) => {
        res.status(200).json(userres);
    })
});

router.post("/createOrder", (req, res) => {
    BenchMarksCtrl.createOrder(req.body?.data).then((userres) => {
        res.status(200).json(userres);
    })
});

router.post("/OrderById", (req, res) => {
    BenchMarksCtrl.OrderById(req.body?.id).then((userres) => {
        res.status(200).json(userres);
    })
});

router.post("/RazorpayPaymentsbyOrderId", (req, res) => {
    BenchMarksCtrl.RazorpayPaymentsbyOrderId(req.body?.id).then((userres) => {
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

router.post("/SendOtpMobile", (req, res) => {
    
    try {
        Subscribe();
        publish();
        var params = {
            Message: 'Hello Abhishek', /* required */
            PhoneNumber: '+91-9305798167',
        };
        var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();
        publishTextPromise.then(
            function (data) {
                
            }).catch(
                function (err) {
                    console.error(err, err.stack);
                });
    } catch (error) {
        
    }

});


function publish() {
    // Create publish parameters
    var params = {
        Message: 'Helloooooo', /* required */
        TopicArn: 'arn:aws:sns:ap-south-1:678678708072:SEND_OTP_MOBILE'
    };

    // Create promise and SNS service object
    var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();

    // Handle promise's fulfilled/rejected states
    publishTextPromise.then(
        function (data) {
            
            
        }).catch(
            function (err) {
                console.error(err, err.stack);
            });
}

function Subscribe() {
    var params = {
        Protocol: 'SMS', /* required */
        TopicArn: 'arn:aws:sns:ap-south-1:678678708072:SEND_OTP_MOBILE', /* required */
        Endpoint: '+91-9305798167'
    };

    // Create promise and SNS service object
    var subscribePromise = new AWS.SNS({ apiVersion: '2010-03-31' }).subscribe(params).promise();

    // Handle promise's fulfilled/rejected states
    subscribePromise.then(
        function (data) {
            
        }).catch(
            function (err) {
                console.error(err, err.stack);
            });
}