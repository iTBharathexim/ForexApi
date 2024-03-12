const express = require("express");
const router = express.Router();
const UserCtrl = require("./LiveTradeApp.controller");
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

router.post("/SingUp", (req, res) => {
    
    UserCtrl.addUser(req.body).then((userres) => {
        
        res.status(200).json(userres);
    })
});

router.post("/TradeAppLogin", (req, res) => {
    UserCtrl.TradeAppLogin(req?.body?.email, req?.body?.password).then((docs) => {
        
        let KEYS = ('TradeAppLogin')?.toString();
        CacheMemory.set(KEYS?.toString(), { user: docs }, 10000);
        res.json({ docs: docs, Authenticated: "Authenticated" });
    })
});

router.post("/TradeAppLoginMPIN", (req, res) => {
    UserCtrl.TradeAppLoginMPIN(req?.body?.email, req?.body?.MPIN).then((docs) => {
        
        res.json({ docs: docs, Authenticated: "Authenticated" });
    })
});

router.post("/TradeAppResetPassword", (req, res) => {
    UserCtrl.TradeAppResetPassword(req?.body?.email, req?.body?.password).then((docs) => {
        
        res.json({ docs: docs, Authenticated: "Authenticated" });
    })
});

router.post("/getUser", (req, res) => {
    
    UserCtrl.getUser(req.body.emailId).then((userres) => {
        
        res.status(200).send(userres);
    })
});

router.get("/getUserDetails", (req, res) => {
    
    UserCtrl.getUserDetails().then((userres) => {
        
        res.status(200).send(userres);
    })
});

router.post("/updateemail", (req, res) => {
    
    UserCtrl.update_email(req).then((userres) => {
        
        res.status(200).send(userres);
    })
});

router.post("/update", (req, res) => {
    
    UserCtrl.updateUserById(req?.body?.id, req?.body?.data).then((userres) => {
        
        res.status(200).json(userres);
    })
});

router.post("/LogoutAllDevice", (req, res) => {
    UserCtrl.updateUserById(req?.body?.id, req?.body?.data).then((userres) => {
        SOCKET_IO.emit("userDetails", userres?.data)
        res.status(200).json(userres);
    })
});


router.post("/updatebyAndroidIOS", (req, res) => {
    
    UserCtrl.updateUserByEmail(req?.body?.id, req?.body?.data).then((userres) => {
        
        res.status(200).json(userres);
    })
});

router.post("/updatedeviceId", (req, res) => {
    
    UserCtrl.getUser(req?.body?.id).then((userdata) => {
        if (userdata?.length != 0) {
            let userDevicId = userdata[0]?.deviceId != undefined ? userdata[0]?.deviceId : [];
            userDevicId.push(req?.body?.deviceId);
            userDevicId = userDevicId?.filter(function (item, pos) {
                return userDevicId.indexOf(item) == pos;
            })
            UserCtrl.updateUserByEmail(req?.body?.id, { deviceId: userDevicId }).then((userres) => {
                res.status(200).json(userres);
            })
        }
    })
});

router.post("/SendOtpEmail", (req, res) => {
    
    UserCtrl.OTP_SEND_EMAIL(req).then((userres) => {
        
        res.status(200).json(userres);
    })
});

router.post("/SendOtpMobile", (req, res) => {
    
    UserCtrl.OTP_SEND_MOBILE(req).then((userres) => {
        
        res.status(200).json(userres);
    })
});

router.post("/CONTACT_US_EMAIL", (req, res) => {
    
    UserCtrl.CONTACT_US_EMAIL(req).then((userres) => {
        
        res.status(200).json(userres);
    })
});

router.post('/webhook', (req, res) => {
    
    res.sendStatus(200);
});

router.get("/RazorpaySubscriptionAll", (req, res) => {
    UserCtrl.RazorpaySubscriptionAll().then((userres) => {
        res.status(200).json(userres);
    })
});

router.get("/RazorpayPlanAll", (req, res) => {
    UserCtrl.RazorpayPlanAll().then((userres) => {
        res.status(200).json(userres);
    })
});

router.get("/RazorpayOrderAll", (req, res) => {
    UserCtrl.RazorpayOrderAll().then((userres) => {
        res.status(200).json(userres);
    })
});

router.post("/RazorpayPaymentsAll", (req, res) => {
    UserCtrl.RazorpayPaymentsAll().then((userres) => {
        res.status(200).json(userres);
    })
});

router.post("/createOrder", (req, res) => {
    UserCtrl.createOrder(req.body?.data).then((userres) => {
        res.status(200).json(userres);
    })
});

router.post("/OrderById", (req, res) => {
    UserCtrl.OrderById(req.body?.id).then((userres) => {
        res.status(200).json(userres);
    })
});

router.post("/RazorpayPaymentsbyOrderId", (req, res) => {
    UserCtrl.RazorpayPaymentsbyOrderId(req.body?.id).then((userres) => {
        res.status(200).json(userres);
    })
});

var admin = require("firebase-admin");
var serviceAccount = require("../../../google-services.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://deltatrade-3ac72-default-rtdb.firebaseio.com"
});

router.post("/PushNotification", (req, res) => {
    
    let registrationToken = req?.body?.registrationToken
    const message = {
        token: registrationToken,
        notification: {
            title: req?.body?.title,
            body: req?.body?.body,
        },
    };
    admin.messaging().send(message).then((res) => {
        res.json({ data: res, status: true })
    }).catch((error) => {
        res.json({ error: error, status: false })
    });
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

var SOCKET_IO = null;
var CacheMemory = null;

module.exports = {
    router: router,
    SocketLoad: async (io, myCache) => {
        CacheMemory = myCache
        io.on('connection', async (client) => {
            
            SOCKET_IO = client;
        });
    }
};
