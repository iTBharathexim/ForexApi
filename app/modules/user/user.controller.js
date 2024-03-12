const bcrypt = require('bcryptjs');
const resp = require('../../helpers/responseHelpers');
const UserModel = require('./user.model.js');
const validators = require('../../helpers/validators');
const EmailTemplate = require("../projects/model_helpers/email_template");
const Member = require("../projects/models/member.model").MemberModel;

const createProfile = (userDetails, profileDetails) => {
    return new Promise((resolve, reject) => {
        UserModel.createProfile(userDetails, profileDetails).then(
            (data) => resolve(data),
            (err) => reject(err)
        )
    })
};

const updateUser = (query, userDetails, callback) => {
    UserModel.findUserAndUpdate(query, userDetails, callback);
};
const updateUserData = (query, data, callback) => {
    UserModel.findUserAndUpdate(query, { profileDetails: data }, callback)
};

const findUser = (query, callback) => {
    UserModel.findUser(query, callback);
};

const getProfile = (user) => {
    return new Promise((resolve, reject) => {
        UserModel.getProfileDetailsById({ _id: user._id }).then((data) => {
            Member.find({ teamId: data.companyId }).then((d) => {
                data['members_list'] = d;
                resolve(data)
            })
        },
            (err) => reject(err)
        )
    })
};
const getProfilebyId = (companyId) => {
    return new Promise((resolve, reject) => {
        UserModel.getProfileDetailsById({ companyId: companyId._id, role: 'manager' }).then((data) => {
            Member.find({ teamId: data.companyId }).then((d) => {
                data['members_list'] = d;
                resolve(data)
            })
        },
            (err) => reject(err)
        )
    })
};
const getProfileById = (user) => {

    return new Promise((resolve, reject) => {
        UserModel.getProfileDetailsById({ emailId: user.email }).then(
            (data) => { resolve(data) },
            (err) => reject(err)
        )
    })
};

const updateProfile = (query, profileDetails) => {
    return new Promise((resolve, reject) => {
        UserModel.updateProfileDetails(query, profileDetails).then(
            (data) => resolve(data),
            (err) => reject(err)
        )
    })
};


const resetpsw = (query, data, callback) => {
    validators.hashPassword(data, function (err, hash) {
        if (err) {
        } else if (hash) {
            data = hash;
            UserModel?.Users?.updateOne({ emailId: query }, { $set: { TOTAL_ATTEMPT: 0 } }, function (err, res) {
                UserModel?.Users?.updateOne({ emailId: query }, { $set: { disabled: false } }, function (err, res) {})
            })
            UserModel.findUserAndUpdate({ emailId: query }, { password: data }, callback);
        } else {
            callback(null, null);
        }
    });
};

function verifyEmail(emailId, emailIdVerified, callback) {
    EmailTemplate.sendVerificationEmailTemplate({ emailId }, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    })
    // UserModel.findUserAndUpdate({ emailId }, { emailIdVerified }, function (err, res) {
}

const UpdateUserByid = async (id, data) => {
    const user = await UserModel.updateUserById(id, data)
    return user
}

const getAll = async () => {
    const user = await UserModel.getAll()
    return user
}

const updateUserByCompanyId = async (id, data) => {
    const user = await UserModel.updateUserByCompanyId(id, data)
    return user
}

const UpdateUserByEmail = async (id, data) => {
   const user = await UserModel.updateUserByEmail(id, data)
    return user
}
const getEamilByIdUserMember = (user) => {

    return new Promise((resolve, reject) => {
        UserModel.getEamilByIdUserMember({ emailId: user.email }).then(
            (data) => { resolve(data) },
            (err) => reject(err)
        )
    })
};
const getAllUserMember = (user) => {

    return new Promise((resolve, reject) => {
        UserModel.getAllUserMember().then(
            (data) => { resolve(data) },
            (err) => reject(err)
        )
    })
};
module.exports = {
    resetpsw,
    createProfile,
    getProfile,
    updateProfile,
    verifyEmail,
    updateUser,
    updateUserData,
    findUser,
    UpdateUserByid,
    getProfileById,
    UpdateUserByEmail,
    getEamilByIdUserMember,
    getAllUserMember,
    getProfilebyId,
    updateUserByCompanyId,
    getAll:getAll
};
