const UserModelHelper = require("../projects/model_helpers/user_model.helper");
const bcrypt = require('bcryptjs');
const validators = require("../../helpers/validators");
const Users = require('../projects/models/users.model.js').UserModel;
const ProfileDetailsModel = require('../projects/models/ProfileDetails').ProfileDetailsModel;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const EmailTemplate = require("../projects/model_helpers/email_template");
const Member = require("../projects/models/member.model").MemberModel;


const addUser = (user, callback) => {
    let emailId = user.emailId;
    Users.create(user, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            let resp = JSON.parse(JSON.stringify(res));
            if (delete resp.password) {
                EmailTemplate.sendVerifyEmail({ emailId }, (err, res) => {
                    if (err) {
                        callback(err, null);
                    } else if (res) {
                        callback(null, res);
                    } else {
                        callback(null, null);
                    }
                });
            } else {
                EmailTemplate.sendVerifyEmail({ emailId }, (err, res) => {
                    if (err) {
                        callback(err, null);
                    } else if (res) {
                        callback(null, res);
                    } else {
                        callback(null, null);
                    }
                });
            }
        } else {
            callback(null, null);
        }
    });
};

const login = (query, callback) => {
    UserModelHelper.find({ query }, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res.length > 0) {
            callback(null, res);
        } else {
            callback("User Model Result", "Invalid email");
        }
    });
};

const findUser = (query, callback) => {
    UserModelHelper.find({ query: query }, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res.length > 0) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
};

const getAll = () => {
    return new Promise((resolve, reject) => {
        Users.find({}).then(
            (data) => resolve(data),
            (err) => reject(err)
        )
    })
};

const findUserAndUpdate = (query, data, callback) => {
    UserModelHelper.update({ query: query, update: data, options: { new: true, select: '-password' } }, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
};

const createProfile = (userDetails, profileDetails) => {
    return new Promise((resolve, reject) => {
        Users.update({ _id: userDetails._id }, profileDetails, { new: true }).then(
            (data) => resolve(data),
            (err) => reject(err)
        )
    })
};

const getProfileDetailsById = (query) => {
    return new Promise((resolve, reject) => {
        Users.findOne(query).then(
            (data) => resolve(data),
            (err) => reject(err)
        )
    })
};
const getEamilByIdUserMember = (query) => {
    return new Promise((resolve, reject) => {
        Users.findOne(query).then((userDetails) => {
            Member.findOne({ email: query?.emailId }).then((memberdata) => {
                resolve({ UserDetails: userDetails, MemberDetails: memberdata })
            })
        },
            (err) => reject(err)
        )
    })
};
const getAllUserMember = (query) => {
    return new Promise((resolve, reject) => {
        Users.find({}).then((userDetails) => {
            Member.find({}).then((memberdata) => {
                resolve({ UserDetails: userDetails, MemberDetails: memberdata })
            })
        },
            (err) => reject(err)
        )
    })
};
const updateProfileDetails = (query, updateData) => {
    return new Promise((resolve, reject) => {
        UserModelHelper.update(query, updateData, { new: true }).then(
            (data) => {
                resolve(data)
            },
            (err) => {
                reject(err)
            }
        )
    })
};


const updateUserById = async (id, data) => {
    let result = Users.updateOne({ _id: id }, { $set: data });
    return result
}

const updateUserByEmail = async (id, data) => {
    let result = Users.updateOne({ emailId: id }, { $set: data });
    return result
}

const updateUserByCompanyId = async (id, data) => {
    let result = Users.updateMany({ companyId: id }, { $set: data });
    return result
}

module.exports = {
    addUser,
    login,
    findUserAndUpdate,
    findUser,
    createProfile,
    getProfileDetailsById,
    updateProfileDetails,
    updateUserById,
    updateUserByEmail,
    getEamilByIdUserMember,
    getAllUserMember,
    updateUserByCompanyId,
    Users: Users,
    getAll: getAll
};