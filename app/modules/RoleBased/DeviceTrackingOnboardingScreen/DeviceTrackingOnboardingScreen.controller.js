const UserModel = require('./DeviceTrackingOnboardingScreen.model');

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

const getUserDetails = () => {
    return new Promise((resolve, reject) => {
        UserModel.getUserDetails().then((callback) => {
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

const TradeAppLogin = (email) => {
    return new Promise((resolve, reject) => {
        UserModel.TradeAppLogin(email).then((callback) => {
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

const OTP_SEND_MOBILE = (data) => {
    return new Promise((resolve, reject) => {
        UserModel.OTP_SEND_MOBILE(data).then((callback) => {
            resolve(callback);
        })
    })
};


const CONTACT_US_EMAIL = (data) => {
    return new Promise((resolve, reject) => {
        UserModel.CONTACT_US_EMAIL(data).then((callback) => {
            resolve(callback);
        })
    })
};

const RazorpayPlanAll = () => {
    return new Promise((resolve, reject) => {
        UserModel.RazorpayPlanAll().then((callback) => {
            resolve(callback);
        })
    })
};

const RazorpaySubscriptionAll = () => {
    return new Promise((resolve, reject) => {
        UserModel.RazorpaySubscriptionAll().then((callback) => {
            resolve(callback);
        })
    })
};

const RazorpayOrderAll = () => {
    return new Promise((resolve, reject) => {
        UserModel.RazorpayOrderAll().then((callback) => {
            resolve(callback);
        })
    })
};

const RazorpayPaymentsAll = () => {
    return new Promise((resolve, reject) => {
        UserModel.RazorpayPaymentsAll().then((callback) => {
            resolve(callback);
        })
    })
};

const createOrder = (data) => {
    return new Promise((resolve, reject) => {
        UserModel.createOrder(data).then((callback) => {
            resolve(callback);
        })
    })
};

const OrderById = (data) => {
    return new Promise((resolve, reject) => {
        UserModel.OrderById(data).then((callback) => {
            resolve(callback);
        })
    })
};

const RazorpayPaymentsbyOrderId = (id) => {
    return new Promise((resolve, reject) => {
        UserModel.RazorpayPaymentsbyOrderId(id).then((callback) => {
            resolve(callback);
        })
    })
};

const updateUserByEmail = async (id, data) => {
    return new Promise((resolve, reject) => {
        UserModel.updateUserByEmail(id,data).then((callback) => {
            resolve(callback);
        })
    })
}

module.exports = {
    addUser,
    update_email,
    LoginRole,
    getUser,
    TradeAppLogin,
    TradeAppResetPassword,
    updateUserById,
    updateUserByEmail,
    OTP_SEND_EMAIL,
    TradeAppLoginMPIN,
    getUserDetails,
    RazorpaySubscriptionAll,
    RazorpayPlanAll,
    RazorpayOrderAll,
    RazorpayPaymentsAll,
    createOrder,
    RazorpayPaymentsbyOrderId,
    OrderById,
    CONTACT_US_EMAIL,
    OTP_SEND_MOBILE
};
