const RoleBase_SingIn_SingUpModel = require('../../../modules/RoleBased/role_base_login.model').RoleBase_SingIn_SingUpModel;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const EmailTemplate = require("../../projects/model_helpers/email_template");
const validators = require("../../../helpers/validators");
const bcrypt = require('bcryptjs');
const Users = require('../../projects/models/users.model.js').UserModel;

const addUser = (user) => {
    let emailId = user.emailId;
    return new Promise((resolve, reject) => {
        validators.hashPassword(user.password, (err, hash) => {
            user.password = hash;
            RoleBase_SingIn_SingUpModel.find({ emailId: emailId }, (err, res) => {
                if (res.length == 0) {
                    user.companyId = user?.userId;
                    RoleBase_SingIn_SingUpModel.create(user, (err, res1) => {
                        user.fullName=user.termsCondition;
                        user.last_name=user.last_name;
                        user.termsAndCondition=user.termsCondition;
                        
                        Users.create(user, (err, res) => {
                            if (err) {
                                reject(err);
                            } else if (res) {
                                let resp = JSON.parse(JSON.stringify(res));
                                if (delete resp.password) {
                                    EmailTemplate.sendRoleVerifyEmail({ emailId }, (err, res) => {
                                        if (err) {
                                            reject(err);
                                        } else if (res) {
                                            resolve(res);
                                        } else {
                                            reject(null);
                                        }
                                    });
                                } else {
                                    EmailTemplate.sendRoleVerifyEmail({ emailId }, (err, res) => {
                                        if (err) {
                                            reject(err);
                                        } else if (res) {
                                            resolve(res);
                                        } else {
                                            reject(null);
                                        }
                                    });
                                }
                            } else {
                                reject(null);
                            }
                        });
                    });
                } else {
                    resolve('Already exit email id....')
                }
            });
        });
    })
};

const login = (authString) => {
    return new Promise((resolve, reject) => {
        validators.decodeAuthString(authString, (email, password) => {
            if (email && password) {
                
                RoleBase_SingIn_SingUpModel.find({ emailId: email }, (err, res) => {
                    
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

const getUser = (email) => {
    return new Promise((resolve, reject) => {
        RoleBase_SingIn_SingUpModel.find({ emailId: email }, (err, res) => {
            if (err) {
                resolve(err);
            }
            resolve(res);
        });
    });
};
const updateUserById = async (id, data) => {
    let result = RoleBase_SingIn_SingUpModel.updateOne({ _id: id }, { $set: data });
    return result
}
const updateUserByEmail = async (id, data) => {
    let result = RoleBase_SingIn_SingUpModel.updateOne({ emailId: id }, { $set: data });
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

module.exports = {
    addUser,
    login,
    updateUserById,
    updateUserByEmail,
    update_email,
    getUser
};