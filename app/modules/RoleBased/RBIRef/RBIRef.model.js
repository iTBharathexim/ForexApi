const RBIRefModel = require('./RBIRefSchema.js').RBIRefModel;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const EmailFormat = require('../../mails/mailhelper/email-store/email-formats.js');

const addUser = (user) => {
    return new Promise((resolve, reject) => {
        RBIRefModel.create(user, (err, res) => {
            if (err) {
                reject(err);
            } else if (res) {
                resolve({ status: true, msg: "Created SucessFully...." });
            } else {
                reject(null);
            }
        });
    })
};

const getUser = (userId) => {
    return new Promise((resolve, reject) => {
        RBIRefModel.find({}, (err, res) => {
            if (err) {
                resolve(err);
            }
            resolve(res);
        });
    });
};

const getUserDetails = () => {
    return new Promise((resolve, reject) => {
        RBIRefModel.find({}, (err, res) => {
            if (err) {
                resolve(err);
            }
            resolve(res);
        });
    });
};

const updateUserById = async (id, data) => {
    return new Promise((resolve, reject) => {
        delete data?._id
        RBIRefModel.updateOne({ _id: id }, { $set: data }, (err, res) => {
            if (err) {
                resolve({ result: res, msg: 'Somethings wrong...', status: false })
            }
            RBIRefModel.find({ _id: id }, (err, res1) => {
                resolve({ result: res, msg: 'Sucessfully Update', status: true, data: res1 })
            })
        });
    });
}

const updateUserByEmail = async (id, data) => {
    let result = RBIRefModel.updateOne({ emailId: id }, { $set: data });
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
            RBIRefModel.updateOne({
                emailId: req.body.emailId
            }, { $set: { "emailIdVerified": false } }, function (err, user) {
                RBIRefModel.findOne({
                    emailId: req.body.emailId
                }, function (err, UserData) {
                    
                    if (err) {
                        
                        resolve({
                            message: "Not verified",
                            data: resp
                        })
                    } else if (user) {
                        main({
                            companyName: "Bharathexim",
                            emailId: req.body.emailId, // list of receivers
                            subject: "OTP Send Registration", // Subject line
                            text: "OTP Send Registration", // plain text body
                            otp: UserData?.emailIdOTP
                        }).then((res) => {
                            resolve({
                                message: "Otp send your email Successfully",
                                data: user,
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
            });
        }
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
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">${Object?.companyName}</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing ${Object?.companyName}. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${Object?.otp}</h2>
    <p style="font-size:0.9em;">Regards,<br />${Object?.companyName}</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>${Object?.companyName} Inc</p>
      <p>1600 Amphitheatre Parkway</p>
      <p>California</p>
    </div>
  </div>
</div>
        `, // html body
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
    updateUserById,
    updateUserByEmail,
    update_email,
    getUser,
    OTP_SEND_EMAIL,
    getUserDetails,
    RazorpayPlanAll,
    RazorpaySubscriptionAll,
    RazorpayOrderAll,
    RazorpayPaymentsAll,
    createOrder,
    OrderById,
    RazorpayPaymentsbyOrderId
};