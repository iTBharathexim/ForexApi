const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubscriptionPlanSchema = new Schema({
    PlanName: {
        type: String,
        required: true,
    },
    CompanyName: {
        type: String,
        required: true,
    },
    Currency: {
        type: String,
    },
    Amount: {
        type: Number,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    TotalMonthDays: {
        type: String,
    },
}, { collection: 'SubscriptionPlan', timestamps: true });
const SubscriptionPlan = mongoose.model("SubscriptionPlan", SubscriptionPlanSchema);
module.exports = {
    SubscriptionPlanModel: SubscriptionPlan,
    SubscriptionPlanSchema: SubscriptionPlanSchema,
    mongoose: mongoose
};