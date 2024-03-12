const BenchMarksModel = require('./BenchMarks.model');

const addUser = (userDetails) => {
    return new Promise((resolve, reject) => {
        BenchMarksModel.addUser(userDetails).then((callback) => {
            resolve(callback);
        })
    })
};

const getUser = (userDetails) => {
    return new Promise((resolve, reject) => {
        BenchMarksModel.getUser(userDetails).then((callback) => {
            resolve(callback);
        })
    })
};

const getUserDetails = () => {
    return new Promise((resolve, reject) => {
        BenchMarksModel.getUserDetails().then((callback) => {
            resolve(callback);
        })
    })
};

const LoginRole = (userDetails) => {
    return new Promise((resolve, reject) => {
        BenchMarksModel.login(userDetails).then((callback) => {
            
            resolve(callback);
        })
    })
};

const TradeAppLogin = (email, passport) => {
    return new Promise((resolve, reject) => {
        BenchMarksModel.TradeAppLogin(email, passport).then((callback) => {
            
            resolve(callback);
        })
    })
};

const TradeAppLoginMPIN = (email, passport) => {
    return new Promise((resolve, reject) => {
        BenchMarksModel.TradeAppLoginMPIN(email, passport).then((callback) => {
            
            resolve(callback);
        })
    })
};

const TradeAppResetPassword = (email, passport) => {
    return new Promise((resolve, reject) => {
        BenchMarksModel.TradeAppResetPassword(email, passport).then((callback) => {
            
            resolve(callback);
        })
    })
};

const update_email = (userDetails) => {
    return new Promise((resolve, reject) => {
        BenchMarksModel.update_email(userDetails).then((callback) => {
            resolve(callback);
        })
    })
};

const updateUserById = async (id, data) => {
    return new Promise((resolve, reject) => {
        BenchMarksModel.updateUserById(id, data).then(async (callback) => {
            
           await resolve(callback);
        })
    })
};

const OTP_SEND_EMAIL = (data) => {
    return new Promise((resolve, reject) => {
        BenchMarksModel.OTP_SEND_EMAIL(data).then((callback) => {
            resolve(callback);
        })
    })
};

const RazorpayPlanAll = () => {
    return new Promise((resolve, reject) => {
        BenchMarksModel.RazorpayPlanAll().then((callback) => {
            resolve(callback);
        })
    })
};

const RazorpaySubscriptionAll = () => {
    return new Promise((resolve, reject) => {
        BenchMarksModel.RazorpaySubscriptionAll().then((callback) => {
            resolve(callback);
        })
    })
};

const RazorpayOrderAll = () => {
    return new Promise((resolve, reject) => {
        BenchMarksModel.RazorpayOrderAll().then((callback) => {
            resolve(callback);
        })
    })
};

const RazorpayPaymentsAll = () => {
    return new Promise((resolve, reject) => {
        BenchMarksModel.RazorpayPaymentsAll().then((callback) => {
            resolve(callback);
        })
    })
};

const createOrder = (data) => {
    return new Promise((resolve, reject) => {
        BenchMarksModel.createOrder(data).then((callback) => {
            resolve(callback);
        })
    })
};

const OrderById = (data) => {
    return new Promise((resolve, reject) => {
        BenchMarksModel.OrderById(data).then((callback) => {
            resolve(callback);
        })
    })
};

const RazorpayPaymentsbyOrderId = (id) => {
    return new Promise((resolve, reject) => {
        BenchMarksModel.RazorpayPaymentsbyOrderId(id).then((callback) => {
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
