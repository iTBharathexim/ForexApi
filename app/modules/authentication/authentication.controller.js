const bcrypt = require('bcryptjs');
const UserModel = require("../user/user.model");
const validators = require("../../helpers/validators");
const EmailTemplate = require("../projects/model_helpers/email_template");
const EmailTemplates = require('../mails/mailhelper/email-store/email-templates');
const Email = require('../../helpers/mail');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const postUser = require("../projects/models/users.model").UserModel;

function signUpUser(data, callback) {
    validators.hashPassword(data.password, (err, hash) => {
        if (err) {
            callback(err, null);
        } else if (hash) {
            data.password = hash;
            data.otpDone = 'no';
            data.termsAndCondition = true;
            let date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            data.date = `${day}/${month}/${year}`;
            UserModel.addUser(data, (err, res) => {


                if (err) {
                    callback(err, null);
                } else if (res) {
                    validators.generateJWTToken(res._id, (err, token) => {
                        if (err) {
                            callback(err, null);
                        } else if (res) {

                            // ********** Post sign up activation **************
                            const activationMailObj = { user: { first_name: data.first_name, last_name: data.last_name }, host: data.origin, userToken: token, to: [{ 'email': data.emailId, 'name': data.first_name + ' ' + data.last_name, 'type': 'to' }], heading: 'Welcome !' };
                            // Function Name: mailObj

                            // ********** super admin email notify on new registration from same company **************
                            const mailObj = { newUser: { first_name: data.first_name, last_name: data.last_name, email: data.emailId }, host: data.origin, to: [{ 'email': 'admin@wrked.com', 'name': 'wrked', 'type': 'to' }, { 'email': 'eswervarma@uipep.com', 'name': 'wrked', 'type': 'cc' }], heading: 'New User Registration' };
                            // Function Name: toAdminNewUser

                            callback(null, token, res);
                            // // Function
                            EmailTemplates.activationMail(activationMailObj, (err, response) => {

                                if (err) {
                                    callback(err, null);
                                } else {

                                    EmailTemplates.toWrkedAdminNewUser(mailObj, (err, response) => {

                                        if (err) {
                                            callback(err, null);
                                        } else {
                                            callback(null, token);
                                        }
                                    });
                                }
                            });

                        } else {
                            callback(null, null);
                        }
                    });
                } else {
                    callback(null, null)
                }
            });
        } else {
            callback(null, null);
        }
    });
}

function contact(data, callback) {
    const mailData = {
        from: data.contactData.EmailId,
        to: 'narendra@uipep.com',
        subject: 'From Wrked.com',
        text: `${data.contactData.MobileNo} <${data.contactData.EmailId}> \n${data.contactData.text}`,
    };
    Email.sendMail(mailData, function (error, info) {
        if (error) {

            next(error, null);
        } else {

            next(null, info.response);
        }
    });
}

function capitaliseFirstLetter(data) {
    data['fullName'] = data.fullName.charAt(0).toUpperCase() + data.fullName.slice(1);
    return data;
}

function socialLogin(user, callback) {
    validators.generateJWTToken(user._id, callback);
}

function userUpdate(user, data, callback) {
    UserModel.findUserAndUpdate(user.emailId, data, (err, res) => {
        if (err) {
            callback(err, null);

        } else if (res) {
            validators.generateJWTToken(user._id, callback);
        } else {
            callback(null, null);
        }
    })
}

function userLogin(authString, mode_user_reg, callback) {
    validators.decodeAuthString(authString, (email, password) => {
        if (email && password) {
            UserModel.login({ emailId: email }, (err, res) => {
                if (res != 'Invalid email') {
                    if (res[0]?.disabled == false) {
                        if (err) {
                            callback(err, null);
                        } else if (res[0].password) {
                            if (mode_user_reg === 'Google' || mode_user_reg === 'Facebook') {
                                return callback({ error: 'wrong mode of login' }, null);
                            } else {
                                bcrypt.compare(password, res[0].password, (err, same) => {
                                    if (err) {
                                        callback(err, null);
                                    } else if (same) {
                                        if (res[0].otpDone == 'no') {
                                            const secret = speakeasy.generateSecret({
                                                length: 10,
                                                name: res[0].fullName,
                                                issuer: 'DocMachine'
                                            });
                                            var url = speakeasy.otpauthURL({
                                                secret: secret.base32,
                                                label: res[0].fullName,
                                                issuer: 'DocMachine',
                                                encoding: 'base32'
                                            });
                                            QRCode.toDataURL(url, (err, dataURL) => {
                                                let data = {
                                                    secret: '',
                                                    tempSecret: secret.base32,
                                                    dataURL,
                                                    tfaURL: url
                                                };
                                                postUser.updateOne({
                                                    _id: res[0]._id
                                                }, { $set: { "otpDetails": data } }, function (err, user) {
                                                    if (err) {
                                                        callback(err, null);
                                                    } else if (user) {
                                                        validators.generateJWTToken(res[0]._id, (err, token) => {
                                                            callback(null, {
                                                                token: token,
                                                                role: res[0].role,
                                                                message: 'TFA Auth needs to be verified',
                                                                tempSecret: secret.base32,
                                                                dataURL,
                                                                tfaURL: secret.otpauth_url
                                                            });
                                                        });
                                                    } else {
                                                        callback(null, null);
                                                    }
                                                });
                                            });
                                        } else if (res[0].otpDone == 'yes') {
                                            validators.generateJWTToken(res[0]._id, (err, token) => {
                                                callback(null, {
                                                    token: token,
                                                    role: res[0].role,
                                                });
                                                postUser?.findOne({ emailId: email }, function (err, res) {
                                                    var tokenlist = res?.LoginToken;
                                                    tokenlist.push({ token: token, date: new Date()})
                                                    postUser?.updateOne({ emailId: email }, { $set: { TOTAL_ATTEMPT: 0, disabled: false, LoginToken: tokenlist } }, function (err, res) { })
                                                })
                                            });
                                        } else {
                                            const secret = speakeasy.generateSecret({
                                                length: 10,
                                                name: res[0].fullName,
                                                issuer: 'DocMachine'
                                            });
                                            var url = speakeasy.otpauthURL({
                                                secret: secret.base32,
                                                label: res[0].fullName,
                                                issuer: 'DocMachine',
                                                encoding: 'base32'
                                            });
                                            QRCode.toDataURL(url, (err, dataURL) => {
                                                let data = {
                                                    secret: '',
                                                    tempSecret: secret.base32,
                                                    dataURL,
                                                    tfaURL: url
                                                };
                                                postUser.updateOne({
                                                    _id: res[0]._id
                                                }, { $set: { "otpDetails": data } }, function (err, user) {
                                                    if (err) {
                                                        callback(err, null);
                                                    } else if (user) {
                                                        validators.generateJWTToken(res[0]._id, (err, token) => {
                                                            callback(null, {
                                                                token: token,
                                                                role: res[0].role,
                                                                message: 'TFA Auth needs to be verified',
                                                                tempSecret: secret.base32,
                                                                dataURL,
                                                                tfaURL: secret.otpauth_url
                                                            });
                                                        });
                                                    } else {
                                                        callback(null, null);
                                                    }
                                                });
                                            });
                                        }
                                    } else {
                                        postUser?.findOne({ emailId: email }, function (err, res) {
                                            if (parseInt(res?.TOTAL_ATTEMPT) < 9) {
                                                postUser?.updateOne({ emailId: email }, { $set: { TOTAL_ATTEMPT: parseInt(res?.TOTAL_ATTEMPT) + 1 } }, function (err, res) {
                                                    
                                                })
                                            } else {
                                                postUser?.updateOne({ emailId: email }, { $set: { disabled: true } }, function (err, res) {
                                                    
                                                })
                                            }
                                        })
                                        callback(null, null);
                                    }
                                });
                            }
                        } else {
                            return callback({ name: 'wrong mode of login' }, null);
                        }
                    } else {
                        callback(false, null);
                    }
                } else {
                    callback(null, null);
                }
            });
        } else {
            callback(null, null);
        }
    });
}

function verifyEmail(emailId, emailIdVerified, callback) {
    UserModel.findUserAndUpdate({ emailId }, { emailIdVerified }, function (err, res) {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function forgotpsw(emailId, callback) {
    EmailTemplate.sendForgotEmail({ emailId }, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function documentSend(emailId, byteArray, callback) {
    EmailTemplate.sendDocuments({ emailId:emailId, byteArray:byteArray }, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}
function resetQR(project, callback) {
    EmailTemplate.sendResetQR(project, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}
module.exports = {
    signUpUser: signUpUser,
    userLogin: userLogin,
    verifyEmail: verifyEmail,
    forgotpsw: forgotpsw,
    socialLogin: socialLogin,
    userUpdate: userUpdate,
    contact: contact,
    capitaliseFirstLetter: capitaliseFirstLetter,
    documentSend: documentSend,
    resetQR: resetQR
};
