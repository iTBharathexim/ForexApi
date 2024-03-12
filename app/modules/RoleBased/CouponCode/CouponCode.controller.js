const UserModel = require('./CouponCode.model.js');

const addUser = (userDetails) => {
    return new Promise((resolve, reject) => {
        UserModel.addUser(userDetails).then((callback) => {
            resolve(callback);
        })
    })
};

const getUser = (userDetails) => {
    return new Promise((resolve, reject) => {
        UserModel.getUser(userDetails).then((callback) => {
            resolve(callback);
        })
    })
};

const LoginRole = (userDetails) => {
    return new Promise((resolve, reject) => {
        UserModel.login(userDetails).then((callback) => {
          
            resolve(callback);
        })
    })
};

const TradeAppLogin = (email,passport) => {
    return new Promise((resolve, reject) => {
        UserModel.TradeAppLogin(email,passport).then((callback) => {
          
            resolve(callback);
        })
    })
};

const TradeAppLoginMPIN = (email,passport) => {
    return new Promise((resolve, reject) => {
        UserModel.TradeAppLoginMPIN(email,passport).then((callback) => {
          
            resolve(callback);
        })
    })
};

const TradeAppResetPassword = (email,passport) => {
    return new Promise((resolve, reject) => {
        UserModel.TradeAppResetPassword(email,passport).then((callback) => {
          
            resolve(callback);
        })
    })
};

const update_email = (userDetails) => {
    return new Promise((resolve, reject) => {
        UserModel.update_email(userDetails).then((callback) => {
            resolve(callback);
        })
    })
};

const updateUserById = (id,data) => {
    return new Promise((resolve, reject) => {
        UserModel.updateUserById(id,data).then((callback) => {
            resolve(callback);
        })
    })
};

const OTP_SEND_EMAIL = (data) => {
    return new Promise((resolve, reject) => {
        UserModel.OTP_SEND_EMAIL(data).then((callback) => {
            resolve(callback);
        })
    })
};

module.exports = {
    addUser,
    update_email,
    LoginRole,
    getUser,
    TradeAppLogin,
    TradeAppResetPassword,
    updateUserById,
    OTP_SEND_EMAIL,
    TradeAppLoginMPIN
};
