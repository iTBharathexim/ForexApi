const FXMarginDetailsModel = require('./RBIRef.model');

const addUser = (userDetails) => {
    return new Promise((resolve, reject) => {
        FXMarginDetailsModel.addUser(userDetails).then((callback) => {
            resolve(callback);
        })
    })
};

const getUser = (userDetails) => {
    return new Promise((resolve, reject) => {
        FXMarginDetailsModel.getUser(userDetails).then((callback) => {
            resolve(callback);
        })
    })
};

const getUserDetails = () => {
    return new Promise((resolve, reject) => {
        FXMarginDetailsModel.getUserDetails().then((callback) => {
            resolve(callback);
        })
    })
};

const LoginRole = (userDetails) => {
    return new Promise((resolve, reject) => {
        FXMarginDetailsModel.login(userDetails).then((callback) => {
          
            resolve(callback);
        })
    })
};

const TradeAppLogin = (email,passport) => {
    return new Promise((resolve, reject) => {
        FXMarginDetailsModel.TradeAppLogin(email,passport).then((callback) => {
          
            resolve(callback);
        })
    })
};

const TradeAppLoginMPIN = (email,passport) => {
    return new Promise((resolve, reject) => {
        FXMarginDetailsModel.TradeAppLoginMPIN(email,passport).then((callback) => {
          
            resolve(callback);
        })
    })
};

const TradeAppResetPassword = (email,passport) => {
    return new Promise((resolve, reject) => {
        FXMarginDetailsModel.TradeAppResetPassword(email,passport).then((callback) => {
          
            resolve(callback);
        })
    })
};

const update_email = (userDetails) => {
    return new Promise((resolve, reject) => {
        FXMarginDetailsModel.update_email(userDetails).then((callback) => {
            resolve(callback);
        })
    })
};

const updateUserById = (id,data) => {
    return new Promise((resolve, reject) => {
        FXMarginDetailsModel.updateUserById(id,data).then((callback) => {
            resolve(callback);
        })
    })
};

const OTP_SEND_EMAIL = (data) => {
    return new Promise((resolve, reject) => {
        FXMarginDetailsModel.OTP_SEND_EMAIL(data).then((callback) => {
            resolve(callback);
        })
    })
};

const RazorpayPlanAll = () => {
    return new Promise((resolve, reject) => {
        FXMarginDetailsModel.RazorpayPlanAll().then((callback) => {
            resolve(callback);
        })
    })
};

const RazorpaySubscriptionAll = () => {
    return new Promise((resolve, reject) => {
        FXMarginDetailsModel.RazorpaySubscriptionAll().then((callback) => {
            resolve(callback);
        })
    })
};

const RazorpayOrderAll = () => {
    return new Promise((resolve, reject) => {
        FXMarginDetailsModel.RazorpayOrderAll().then((callback) => {
            resolve(callback);
        })
    })
};

const RazorpayPaymentsAll = () => {
    return new Promise((resolve, reject) => {
        FXMarginDetailsModel.RazorpayPaymentsAll().then((callback) => {
            resolve(callback);
        })
    })
};

const createOrder = (data) => {
    return new Promise((resolve, reject) => {
        FXMarginDetailsModel.createOrder(data).then((callback) => {
            resolve(callback);
        })
    })
};

const OrderById = (data) => {
    return new Promise((resolve, reject) => {
        FXMarginDetailsModel.OrderById(data).then((callback) => {
            resolve(callback);
        })
    })
};

const RazorpayPaymentsbyOrderId = (id) => {
    return new Promise((resolve, reject) => {
        FXMarginDetailsModel.RazorpayPaymentsbyOrderId(id).then((callback) => {
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
    TradeAppLoginMPIN,
    getUserDetails,
    RazorpaySubscriptionAll,
    RazorpayPlanAll,
    RazorpayOrderAll,
    RazorpayPaymentsAll,
    createOrder,
    RazorpayPaymentsbyOrderId,
    OrderById
};
