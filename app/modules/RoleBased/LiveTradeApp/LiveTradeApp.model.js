const LiveTradeAppModel = require('./LiveTradeSchema').LiveTradeAppModel;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const validators = require("../../../helpers/validators.js");
const EmailFormat = require('../../mails/mailhelper/email-store/email-formats');
const bcrypt = require('bcryptjs');

const addUser = (user) => {
    let emailId = user.emailId;
    return new Promise((resolve, reject) => {
        LiveTradeAppModel.find({ emailId: emailId }, (err, res) => {

            if (res.length == 0) {

                user.companyId = user?.userId;
                user.fullName = user.termsCondition;
                user.last_name = user.last_name;
                user.termsAndCondition = user.termsCondition;

                LiveTradeAppModel.create(user, (err, res) => {
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

                LiveTradeAppModel.find({ emailId: email }, (err, res) => {

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
        LiveTradeAppModel.find({ emailId: email }, (err, res) => {

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
        LiveTradeAppModel.find({ emailId: email, MPIN: password }, (err, res) => {
            if (err) {
                resolve({ error: err });
            } else if (res[0]?.MPIN) {
                validators.generateJWTTokenRole({ id: res[0]._id, }, (err, token) => {
                    let SubcriptionExpired = compareDates(res[0]?.ExpiredTimeStamp);
                    console.log(res[0]?.ExpiredTimeStamp, SubcriptionExpired, "SubcriptionExpired")
                    if (res[0]?.ExpiredTimeStamp != undefined && res[0]?.ExpiredTimeStamp != null && res[0]?.ExpiredTimeStamp != '') {
                        LiveTradeAppModel.updateOne({ emailId: email }, { $set: { SubcriptionExpired: SubcriptionExpired } }, (err, updateres) => {
                            resolve({
                                token: token,
                                message: 'TFA Auth verified',
                                data: res[0]
                            });
                        })
                    } else {
                        resolve({
                            token: token,
                            message: 'TFA Auth verified',
                            data: res[0]
                        });
                    }
                });
            } else {
                return resolve({ error: 'Invalid User name or Password...' });
            }
        });
    });
};

const moment = require("moment");
const compareDates = (d1) => {
    let dateCheck = moment(new Date()).unix();
    console.log(d1, dateCheck, "compareDates")
    return dateCheck <= parseInt(d1);
};

const TradeAppResetPassword = (email, password) => {
    return new Promise((resolve, reject) => {
        LiveTradeAppModel.find({ emailId: email }, (err, res) => {
            if (err) {
                resolve(err);
            } else {
                validators.hashPassword(password, function (err, hash) {
                    if (err) {
                    } else if (hash) {
                        LiveTradeAppModel.updateOne({ emailId: email }, { password: hash }, (err, data) => {
                            validators.generateJWTTokenRole({ id: res[0]._id }, (err, token) => {
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
        LiveTradeAppModel.find({ emailId: email }, (err, res) => {
            if (err) {
                resolve(err);
            }
            resolve(res);
        });
    });
};

const getUserDetails = () => {
    return new Promise((resolve, reject) => {
        LiveTradeAppModel.find({}, (err, res) => {
            if (err) {
                resolve(err);
            }
            resolve(res);
        });
    });
};

const updateUserById = async (id, data) => {
    return new Promise((resolve, reject) => {
        LiveTradeAppModel.updateOne({ _id: id }, { $set: data }, (err, res) => {
            if (err) {

                resolve({ result: res, msg: 'Somethings wrong...', status: false })
            }
            LiveTradeAppModel.find({ _id: id }, (err, userdata) => {
                if (err) {
                    resolve(err);
                }
                resolve({ result: res, msg: 'Sucessfully Update', status: true, data: userdata })
            });
        });
    });
}

const updateUserByEmail = async (id, data) => {
    return new Promise((resolve, reject) => {
        let result = LiveTradeAppModel.updateOne({ emailId: id }, { $set: data }, (err, res) => {
            if (err) {

                resolve({ result: res, msg: 'Somethings wrong...', status: false })
            }
            resolve({ result: res, msg: 'Sucessfully Update', status: true })
        });
    });
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
            const newOTP = generateOTP()?.toString();
            LiveTradeAppModel.updateOne({
                emailId: req.body.emailId
            }, { $set: { emailIdOTP: newOTP } }, function (err, UserData) {
                LiveTradeAppModel.findOne({
                    emailId: req.body.emailId
                }, function (err, UserData) {
                    if (err) {
                        resolve({
                            message: "Not verified",
                            data: resp
                        })
                    } else if (UserData) {
                        console.log(UserData, "UserData")
                        main({
                            companyName: "Bharathexim",
                            emailId: req.body.emailId, // list of receivers
                            subject: req.body?.subject, // Subject line
                            text: req.body?.subject, // plain text body
                            otp: UserData?.emailIdOTP
                        }).then((res) => {
                            resolve({
                                message: "Otp send your email Successfully",
                                data: UserData,
                                status: true,
                                sgMail: res,
                            })
                        }).catch((err) => {
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
            })

        }
    });
}

// Function to generate OTP 
function generateOTP() {
    let digits =
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

function OTP_SEND_MOBILE(req) {
    return new Promise((resolve, reject) => {
        if (req.body.emailId) {
            const newOTP = generateOTP()?.toString();
            LiveTradeAppModel.updateOne({
                emailId: req.body.emailId
            }, { $set: { MobileOTP: newOTP } }, function (err, UserData) {
                LiveTradeAppModel.findOne({
                    emailId: req.body.emailId
                }, function (err, UserData) {

                    if (err) {

                        resolve({
                            message: "Not verified",
                            data: UserData
                        })
                    } else if (UserData) {
                        const axios = require('axios')
                        let url = `https://control.msg91.com/api/v5/otp?template_id=65af5a75d6fc0507ca47d0c2&otp=${UserData?.MobileOTP}&mobile=${'91' + UserData?.mobileNo}`;
                        let headers = {
                            "accept": "application/json",
                            "content-type": "application/json",
                            "authkey": "412895AYo2j9cx6592ed91P1"
                        }
                        axios({
                            method: 'post',
                            url: url,
                            headers: headers,
                            body: null
                        }).then((res) => {

                            resolve({
                                message: "Otp send your registered mobile no.",
                                status: true,
                                MSG91: res?.data
                            })
                        }).catch(err => {

                            resolve({
                                message: "Otp not send your registered mobile no.",
                                status: true,
                                MSG91: [],
                                data: UserData,
                                error: err
                            })
                        })
                    } else {
                        resolve({
                            message: "something wrong...",
                            status: false
                        })
                    }
                })
            })

        }
    });
}

function CONTACT_US_EMAIL(req) {
    return new Promise((resolve, reject) => {
        ContactUsMain(req.body?.data).then((res) => {

            resolve({
                message: "Otp send your email Successfully",
                status: true,
                sgMail: res,
            })
        }).catch((err) => {
            resolve({
                message: "something wrong...",
                status: false
            })
        });
    });
}


const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "smtp.mailer91.com",
    port: 587,
    secureConnection: false, // TLS requires secureConnection to be false,
    tls: { rejectUnauthorized: false },
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "emailer@support.bharathexim.com",
        pass: "SaT9wHuGvsapyRJc",
    },
});

async function main(Object) {
    const info = await transporter.sendMail({
        from: '<support@bharathexim.com>', // sender address
        to: Object?.emailId, // list of receivers
        subject: Object?.subject, // Subject line
        text: Object?.text, // plain text body
        html: `
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Bharathexim</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>${Object?.subject}</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${Object?.otp}</h2>
    <p style="font-size:0.9em;">Regards,<br />Bharathhexim</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Bharathhexim Inc</p>
      <p>1600 Amphitheatre Parkway</p>
      <p>California</p>
    </div>
  </div>
</div>
        `, // html body
    });

}

async function ContactUsMain(dataObj) {

    return new Promise(async (resolve, reject) => {
        let content = ``;
        content = content + `
                    <p>Company Name : ${dataObj?.CompanyName}</p><br/>
                    <p>Name : ${dataObj?.Name}</p><br/>
                    <p>Email Id : ${dataObj?.EmailId}</p><br/>
                    <p>Mobil No. : ${dataObj?.Phone}</p><br/>
                    <p>Subject : ${dataObj?.Subject}</p><br/>
                    <p>Message : <br/>` + dataObj?.Message + `</p><br/>`;
        const html = EmailFormat.generalFormat({ html: content, heading: "Contact Us", host: process.env.WEBSITE_URL });
        const info = await transporter.sendMail({
            from: '<support@bharathexim.com>', // sender address
            to: [dataObj?.EmailId, 'business@bharathexim.com'], // list of receivers
            subject: dataObj?.CompanyName + ' | ' + dataObj?.Subject, // Subject line
            text: dataObj?.Subject, // plain text body
            html: html, // html body
        })

        resolve(info);
    });
}

const Razorpay = require('razorpay');
const { isMoment } = require('moment');
const instance = new Razorpay({ key_id: 'rzp_live_YDjE76c4yZAjIi', key_secret: 'HAFDYMQp5QJB5A2L0DEmHYRn' })
const RazorpayPlanAll = async () => {
    return await instance.plans.all();
}

const RazorpaySubscriptionAll = async () => {
    return await instance.subscriptions.all();
}

const RazorpayOrderAll = async () => {
    return await instance.orders.all();
}

const RazorpayPaymentsAll = async () => {
    return (await instance.payments.all())
}

const RazorpayPaymentsbyOrderId = async (id) => {
    return (await instance.payments.all()).items?.filter((item) => item?.order_id == id);
}

const OrderById = async (id) => {
    return (await instance.orders.all()).items?.filter((item) => item?.id == id);
}

const createOrder = async (data) => {
    return new Promise(async (resolve, reject) => {
        await instance.orders.create({
            "amount": data["amount"],
            "currency": "INR",
            "receipt": data["receipt"],
            "notes": data["notes"]
        }).then(async (result) => {
            resolve(result)
        }).catch((error) => {

            resolve(error)
        });
    })
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
    TradeAppLoginMPIN,
    getUserDetails,
    RazorpayPlanAll,
    RazorpaySubscriptionAll,
    RazorpayOrderAll,
    RazorpayPaymentsAll,
    createOrder,
    OrderById,
    RazorpayPaymentsbyOrderId,
    CONTACT_US_EMAIL,
    OTP_SEND_MOBILE
};