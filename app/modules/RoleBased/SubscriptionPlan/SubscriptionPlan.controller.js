const SubscriptionPlanModel = require('./SubscriptionPlan.model');

const add = (userDetails) => {
    return new Promise((resolve, reject) => {
        SubscriptionPlanModel.add(userDetails).then((callback) => {
            resolve(callback);
        })
    })
};

const get = () => {
    return new Promise((resolve, reject) => {
        SubscriptionPlanModel.get().then((callback) => {
            resolve(callback);
        })
    })
};

const update = (id,data) => {
    return new Promise((resolve, reject) => {
        SubscriptionPlanModel.update(id,data).then((callback) => {
            resolve(callback);
        })
    })
};

const deletedata = (id) => {
    return new Promise((resolve, reject) => {
        SubscriptionPlanModel.deletedata(id).then((callback) => {
            resolve(callback);
        })
    })
};

module.exports = {
    add,
    get,
    update,
    deletedata
};
