const CouponCodeDiscountProductModel = require('./CouponCodeSchema.js').CouponCodeDiscountProductModel;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const validators = require("../../../helpers/validators.js");
const EmailFormat = require('../../mails/mailhelper/email-store/email-formats.js');
const bcrypt = require('bcryptjs');

const addUser = (user) => {
    let emailId = user.emailId;
    return new Promise((resolve, reject) => {
        CouponCodeDiscountProductModel.find({ emailId: emailId }, (err, res) => {
            
            if (res.length == 0) {
                
                user.companyId = user?.userId;
                user.fullName = user.termsCondition;
                user.last_name = user.last_name;
                user.termsAndCondition = user.termsCondition;
                
                CouponCodeDiscountProductModel.create(user, (err, res) => {
                    if (err) {
                        reject(err);
                    } else if (res) {
                        resolve({ status: true, msg: "Created SucessFully...." });
                    } else {
                        reject(null);
                    }
                });
            } else {
                resolve({ status: false, msg: 'Already exit email id....' })
            }
        });
    })
};

const login = (authString) => {
    return new Promise((resolve, reject) => {
        validators.decodeAuthString(authString, (email, password) => {
            if (email && password) {
                
                CouponCodeDiscountProductModel.find({ emailId: email }, (err, res) => {
                    
                    if (err) {
                        resolve(err);
                    } else if (res[0].password) {
                        bcrypt.compare(password, res[0].password, (err, same) => {
                            
                            if (err) {
                                resolve(err);
                            } else if (same) {
                                validators.generateJWTTokenRole({ id: res[0]._id, role: res[0]?.role }, (err, token) => {
                                    
                                    resolve({
                                        token: token,
                                        message: 'TFA Auth verified',
                                        data: res
                                    });
                                });
                            } else {
                                resolve(null);
                            }
                        });
                    } else {
                        return resolve({ name: 'wrong mode of login' });
                    }
                });
            } else {
                resolve(null);
            }
        });

    });

};

const TradeAppLogin = (email, password) => {
    return new Promise((resolve, reject) => {
        CouponCodeDiscountProductModel.find({ emailId: email }, (err, res) => {
            
            if (err) {
                resolve(err);
            } else if (res[0]?.password) {
                bcrypt.compare(password, res[0].password, (err, same) => {
                    
                    if (err) {
                        resolve(err);
                    } else if (same) {
                        validators.generateJWTTokenRole({ id: res[0]._id, role: res[0]?.role }, (err, token) => {
                            
                            resolve({
                                token: token,
                                message: 'TFA Auth verified',
                                data: res[0]
                            });
                        });
                    } else {
                        resolve(null);
                    }
                });
            } else {
                return resolve({ error: 'Email and Password not matched...' });
            }
        });
    });
};

const TradeAppLoginMPIN = (email, password) => {
    return new Promise((resolve, reject) => {
        CouponCodeDiscountProductModel.find({ emailId: email, MPIN: password }, (err, res) => {
            
            if (err) {
                resolve(err);
            } else if (res[0]?.password) {
                resolve({
                    message: 'TFA Auth verified',
                    data: res[0]
                });
            } else {
                return resolve({ error: 'Email and Password not matched...' });
            }
        });
    });
};

const TradeAppResetPassword = (email, password) => {
    return new Promise((resolve, reject) => {
        CouponCodeDiscountProductModel.find({ emailId: email }, (err, res) => {
            
            if (err) {
                resolve(err);
            } else {
                validators.hashPassword(password, function (err, hash) {
                    if (err) {
                    } else if (hash) {
                        CouponCodeDiscountProductModel.updateOne({ emailId: email }, { password: hash }, (err, data) => {
                            validators.generateJWTTokenRole({ id: res[0]._id, role: res[0]?.role }, (err, token) => {
                                
                                resolve({
                                    token: token,
                                    message: 'password updated successfully',
                                });
                            });
                        });
                    } else {
                        resolve(null);
                    }
                });
            }
        });
    });
};

const getUser = (email) => {
    return new Promise((resolve, reject) => {
        CouponCodeDiscountProductModel.find({ emailId: email }, (err, res) => {
            if (err) {
                resolve(err);
            }
            resolve(res);
        });
    });
};

const updateUserById = async (id, data) => {
    return new Promise((resolve, reject) => {
        let result = CouponCodeDiscountProductModel.updateOne({ _id: id }, { $set: data }, (err, res) => {
            if (err) {
                resolve({ result: res, msg: 'Somethings wrong...', status: false })
            }
            resolve({ result: res, msg: 'Sucessfully Update', status: true })
        });
    });
}

const updateUserByEmail = async (id, data) => {
    let result = CouponCodeDiscountProductModel.updateOne({ emailId: id }, { $set: data });
    return result
}

function update_email(req) {
    return new Promise((resolve, reject) => {
        if (req.body.emailId) {
            UserModel.updateOne({
                emailId: req.body.emailId
            }, { $set: { "emailIdVerified": true } }, function (err, user) {
                
                if (err) {
                    
                    resolve({
                        message: "Not verified",
                        data: resp
                    })
                } else if (user) {
                    const html = EmailFormat.generalFormat({ html: `User Logged in with ${req.body.emailId} to DocMachine please check `, heading: "New User Registered", host: process.env.WEBSITE_URL });
                    const msg = {
                        to: ['noreply@bharathexim.com'], // Change to your recipient
                        from: "noreply@bharathexim.com", // Change to your verified sender
                        subject: "New User Registered",
                        text: "New User Registered",
                        html: html
                    };

                    sgMail
                        .send(msg)
                        .then(() => {
                            resolve({
                                message: "Verified Successfully",
                                data: user
                            })
                        })
                        .catch((error) => {
                            console.error(JSON.stringify(error));
                            resolve({
                                message: "Not verified",
                                data: resp
                            })
                        });
                } else {
                    resolve({
                        message: "Not verified",
                        data: resp
                    })
                }
            }
            );
        }
    });

}

function OTP_SEND_EMAIL(req) {
    return new Promise((resolve, reject) => {
        if (req.body.emailId) {
            CouponCodeDiscountProductModel.updateOne({
                emailId: req.body.emailId
            }, { $set: { "emailIdVerified": true } }, function (err, user) {
                CouponCodeDiscountProductModel.findOne({
                    emailId: req.body.emailId
                }, function (err, UserData) {
                    
                    if (err) {
                        
                        resolve({
                            message: "Not verified",
                            data: resp
                        })
                    } else if (user) {
                        const html = EmailFormat.generalFormat({
                            html: `User Logged in with ${req.body.emailId} to DocMachine please check\n
                        EMail OTP : ${UserData?.emailIdOTP}`, heading: "New User Registered", host: process.env.WEBSITE_URL
                        });
                        const msg = {
                            to: req.body.emailId, // Change to your recipient
                            from: "noreply@bharathexim.com", // Change to your verified sender
                            subject: "New User Registered",
                            text: "New User Registered",
                            html: html
                        };
                        
                        sgMail
                            .send(msg)
                            .then((res) => {
                                resolve({
                                    message: "Otp send your email Successfully",
                                    data: user,
                                    status: true,
                                    sgMail: res,
                                })
                            })
                            .catch((error) => {
                                console.error(JSON.stringify(error));
                                resolve({
                                    message: "something wrong...",
                                    data: resp,
                                    status: false
                                })
                            });
                    } else {
                        resolve({
                            message: "something wrong...",
                            data: resp,
                            status: false
                        })
                    }
                })
            });
        }
    });

}

module.exports = {
    addUser,
    login,
    updateUserById,
    updateUserByEmail,
    update_email,
    getUser,
    TradeAppLogin,
    TradeAppResetPassword,
    OTP_SEND_EMAIL,
    TradeAppLoginMPIN
};