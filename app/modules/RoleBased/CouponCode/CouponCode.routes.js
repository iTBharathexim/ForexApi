const express = require("express");
const router = express.Router();
const UserCtrl = require("./CouponCode.controller");
module.exports = router;
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

router.post("/SendOtpEmail", (req, res) => {
    
    UserCtrl.OTP_SEND_EMAIL(req).then((userres) => {
        
        res.status(200).json(userres);
    })
});

router.post("/SendOtpMobile", (req, res) => {
    
    try{
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
    }catch(error){
      
    }
 
});

function publish(){
// Create publish parameters
var params = {
    Message: 'Helloooooo', /* required */
    TopicArn: 'arn:aws:sns:ap-south-1:678678708072:SEND_OTP_MOBILE'
  };
  
  // Create promise and SNS service object
  var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
  
  // Handle promise's fulfilled/rejected states
  publishTextPromise.then(
    function(data) {
      
      
    }).catch(
      function(err) {
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