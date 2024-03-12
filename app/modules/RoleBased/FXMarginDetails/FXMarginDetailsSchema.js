const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FXMarginDetailsSchema = new Schema({
    userId: {
        type: String,
    },
    inward: {
        type: Object,
        USD: {
            type: String,
            default: "0"
        },
        EUR: {
            type: String,
            default: "0"
        },
        GBP: {
            type: String,
            default: "0"
        },
        AUD: {
            type: String,
            default: "0"
        },
        HKD: {
            type: String,
            default: "0"
        },
        JPY: {
            type: String,
            default: "0"
        },
        CHF: {
            type: String,
            default: "0"
        },
        CNY: {
            type: String,
            default: "0"
        },
        EUR: {
            type: String,
            default: "0"
        },
        SGD: {
            type: String,
            default: "0"
        },
        INR: {
            type: String,
            default: "0"
        },
    },
    outward: {
        type: Object,
        USD: {
            type: String,
            default: "0"
        },
        EUR: {
            type: String,
            default: "0"
        },
        GBP: {
            type: String,
            default: "0"
        },
        AUD: {
            type: String,
            default: "0"
        },
        HKD: {
            type: String,
            default: "0"
        },
        JPY: {
            type: String,
            default: "0"
        },
        CHF: {
            type: String,
            default: "0"
        },
        CNY: {
            type: String,
            default: "0"
        },
        EUR: {
            type: String,
            default: "0"
        },
        SGD: {
            type: String,
            default: "0"
        },
        INR: {
            type: String,
            default: "0"
        },
    },
    Type: {
        type: String,
        default: "InwardOutward"
    }
}, { collection: 'FXMarginDetails', timestamps: true });
const FXMarginDetails = mongoose.model("FXMarginDetails", FXMarginDetailsSchema);
module.exports = {
    FXMarginDetailsModel: FXMarginDetails,
    FXMarginDetailsSchema: FXMarginDetailsSchema,
    mongoose: mongoose
};