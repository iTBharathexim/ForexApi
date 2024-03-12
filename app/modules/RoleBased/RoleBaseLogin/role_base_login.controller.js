const UserModel = require('./role_base_login.model.js');

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
const update_email = (userDetails) => {
    return new Promise((resolve, reject) => {
        UserModel.update_email(userDetails).then((callback) => {
            resolve(callback);
        })
    })
};

module.exports = {
    addUser,
    update_email,
    LoginRole,
    getUser
};
