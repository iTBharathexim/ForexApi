const SubscriptionPlanModel = require('./SubscriptionPlanSchema').SubscriptionPlanModel;

const add = (user) => {
    return new Promise((resolve, reject) => {
        // if (user?.PlanName?.toLowerCase() == ("Monhtly Plan").toLowerCase()) {
        //     user['TotalMonthDays'] = 1;
        // } else if (user?.PlanName?.toLowerCase() == ("Quarterly Plan").toLowerCase()) {
        //     user['TotalMonthDays'] = 3;
        // } else if (user?.PlanName?.toLowerCase() == ("Half Yearly Plan").toLowerCase()) {
        //     user['TotalMonthDays'] = 6;
        // } else if (user?.PlanName?.toLowerCase() == ("Yearly Plan").toLowerCase()) {
        //     user['TotalMonthDays'] = 12;
        // } else {
        //     user['TotalMonthDays'] = 0;
        // }
        SubscriptionPlanModel.create(user, (err, res) => {
            if (err) {
                reject(err);
            } else if (res) {
                resolve({ status: true, msg: "Created SucessFully...." });
            } else {
                reject(null);
            }
        });
    })
};

function getTotalMonthDays() {
    var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
    return d.getDate();
}
const get = () => {
    return new Promise((resolve, reject) => {
        SubscriptionPlanModel.find({}, (err, res) => {
            if (err) {
                reject({ status: false, error: err, data: res });
            } else if (res) {
                resolve({ status: true, data: res });
            } else {
                reject({ status: false, data: res });
            }
        }).sort({ _id: -1 });
    })
};

const update = (id, data) => {
    return new Promise((resolve, reject) => {
        SubscriptionPlanModel.updateOne({ _id: id }, { $set: data }, (err, res) => {
            if (err) {
                reject({ status: false, error: err, data: res });
            } else if (res) {
                resolve({ status: true, data: res });
            } else {
                reject({ status: false, data: res });
            }
        });
    })
};

const deletedata = (id) => {
    return new Promise((resolve, reject) => {
        SubscriptionPlanModel.deleteOne({ _id: id }, (err, res) => {
            if (err) {
                reject({ status: false, error: err, data: res });
            } else if (res) {
                resolve({ status: true, data: res });
            } else {
                reject({ status: false, data: res });
            }
        });
    })
};

module.exports = {
    add,
    get,
    update,
    deletedata
};