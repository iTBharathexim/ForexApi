const express = require("express");
const router = express.Router();
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const postUser = require("../../projects/models/users.model").UserModel;
module.exports = router;

router.post("/verify", async (req, res, next) => {
    var otp = '';
    if (req.body.data['OTP'] != undefined) {
        otp = req.body.data['OTP'];
    } else {
        otp = req.body.data;
    }

    let isVerified = speakeasy.totp.verify({
        secret: req.user[0].otpDetails.tempSecret,
        encoding: 'base32',
        token: otp
    });
    
    if (isVerified) {
        if (req.body.data['OTP'] != undefined) {
            postUser.updateOne({ _id: req.user[0]._id },
                {
                    $set: {
                        "otpDone": 'yes', "Subscription": req.body.data['Subscription'],
                        "Role_Type": req.body.data['Role'], "Login_Limit": req.body.data['Login_Limit'],
                        "RoleCheckbox": req.body.data['RoleCheckbox']
                    }
                }, function (err, user) {
                    if (err) {
                        callback(err, null);
                    } else if (user) {
                        return res.send({
                            "status": 200,
                            "message": "Two-factor Auth is enabled successfully"
                        });
                    } else {
                        callback(null, null);
                    }
                });
        } else {
            postUser.updateOne(
                {
                    _id: req.user[0]._id
                },
                { $set: { "otpDone": 'yes' } }, function (err, user) {

                    if (err) {

                        callback(err, null);
                    } else if (user) {
                        return res.send({
                            "status": 200,
                            "message": "Two-factor Auth is enabled successfully"
                        });
                    } else {
                        callback(null, null);
                    }
                });
        }
    }
    else {
        return res.send({
            "status": 403,
            "message": "Invalid Auth Code, verification failed. Please verify the system Date and Time"
        });
    }
});

router.post("/SingUpverify", async (req, res, next) => {
    let isVerified = speakeasy.totp.verify({
        secret: req.user[0].otpDetails.tempSecret,
        encoding: 'base32',
        token: req.body['OTP']
    });

    if (isVerified) {
        if (req.body['OTP'] != undefined) {
            let object = {
                "otpDone": 'yes',
                "Subscription": req.body['Subscription'],
                "Role_Type": req.body['Role'],
                "Login_Limit": req.body['Login_Limit'],
                "RoleCheckbox": req.body['RoleCheckbox'],
                "DMS": req.body['DMS'],
                "Teasury": req.body['Teasury'],
                "Transaction": req.body['Transaction'],
            }
            if (req.body['AdminRole'] == 'member') {
                object = {
                    "otpDone": 'yes',
                    "Subscription": req.body['Subscription'],
                    "Role_Type": req.body['Role'],
                    "Login_Limit": req.body['Login_Limit'],
                    "RoleCheckbox": req.body['RoleCheckbox'],
                    "DMS": req.body['DMS'],
                    "Teasury": req.body['Teasury'],
                    "Transaction": req.body['Transaction'],
                    "companyName": req.body['companyName']
                }
            }
            postUser.updateOne({
                _id: req.user[0]._id
            },
                {
                    $set: object
                }, function (err, user) {
                    if (err) {
                        callback(err, null);
                    } else if (user) {
                        return res.send({
                            "status": 200,
                            "message": "Two-factor Auth is enabled successfully"
                        });
                    } else {
                        callback(null, null);
                    }

                });
        } else {
            postUser.updateOne(
                {
                    _id: req.user[0]._id
                },
                { $set: { "otpDone": 'yes' } }, function (err, user) {
                    if (err) {
                        callback(err, null);
                    } else if (user) {
                        return res.send({
                            "status": 200,
                            "message": "Two-factor Auth is enabled successfully"
                        });
                    } else {
                        callback(null, null);
                    }
                });
        }
    }
    else {
        return res.send({
            "status": 403,
            "message": "Invalid Auth Code, verification failed. Please verify the system Date and Time"
        });
    }
});

router.post("/login/verify", async (req, res, next) => {
    let isVerified = speakeasy.totp.verify({
        secret: req.user[0].otpDetails.tempSecret,
        encoding: 'base32',
        token: req.body.data
    });
    if (isVerified) {
        postUser.updateOne({ _id: req.user[0]._id },
            { $set: { "otpDone": 'yes', isLoggin: true } }, function (err, user) {
                if (err) {
                } else if (user) {
                    postUser?.updateOne({ _id: req.user[0]._id }, { $set: { TOTAL_ATTEMPT: 0 } }, function (err, res) {
                        postUser?.updateOne({ _id: req.user[0]._id }, { $set: { otpdisabled: false } }, function (err, res) { })
                    })
                    return res.send({
                        "status": 200,
                        "message": "Two-factor Auth is enabled successfully"
                    });
                }
            })
    } else {
        postUser?.findOne({ _id: req.user[0]._id }, function (err, re2s) {
            if (re2s?.disabled == false) {
                if (parseInt(re2s?.TOTAL_ATTEMPT) < 9) {
                    postUser?.updateOne({ _id: req.user[0]._id }, { $set: { TOTAL_ATTEMPT: parseInt(re2s?.TOTAL_ATTEMPT) + 1 } }, function (err, res1) {
                        return res.send({
                            "status": 403,
                            "message": "Invalid Auth Code, verification failed. Please verify the system Date and Time"
                        });
                    })
                } else {
                    postUser?.updateOne({ _id: req.user[0]._id }, { $set: { otpdisabled: true } }, function (err, res1) {
                        return res.send({
                            "status": 403,
                            "message": "OTP attempt has failed too many times. Please reset your OTP."
                        });
                    })
                }
            } else {
                return res.send({
                    "status": 403,
                    "message": "OTP attempt has failed too many times. Please reset your OTP."
                });
            }
        })
    }
});

router.post("/loginlogout", async (req, res, next) => {
    postUser.updateOne({ _id: req.user[0]._id }, { $set: { isLoggin: req.body.status } }, function (err, user) {
        if (err) {
        } else if (user) {
            res.send({
                "status": 200,
                "message": "Two-factor Auth is enabled successfully"
            });
        }
    });
});

router.post("/delete", async (req, res, next) => {
    postUser.updateOne(
        {
            _id: req.user[0]._id
        },
        { $set: { "otpDone": 'no' } }, function (err, user) {
            if (err) {
                return res.send({
                    "status": 402,
                    "message": "Not removed"
                });
            } else if (user) {
                return res.send({
                    "status": 200,
                    "message": "Two-factor Auth is removed successfully"
                });
            } else {
                callback(null, null);
            }
        });
});

