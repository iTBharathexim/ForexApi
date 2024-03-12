const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AWS_BILLING_SCHEMA = new Schema({
    userId: {
        type: String,
    },
    UserInformation: {
        type: Object,
    },
},{timestamps: true });

module.exports = mongoose.model("AWS_BILLING", AWS_BILLING_SCHEMA);
