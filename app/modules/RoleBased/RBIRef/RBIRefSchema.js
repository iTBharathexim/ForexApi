const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RBIRefSchema = new Schema({
    userId: {
        type: String,
    },
    asdate:{
        type: String,
    },
    Status:{
        type: String,
    },
    USD: {
        type: String,
        default:'0'
    },
    EUR: {
        type: String,
        default:'0'
    },
    GBP: {
        type: String,
        default:'0'
    },
    AUD: {
        type: String,
        default:'0'
    },
    HKD: {
        type: String,
        default:'0'
    },
    JPY: {
        type: String,
        default:'0'
    },
    CHF: {
        type: String,
        default:'0'
    },
    CNY: {
        type: String,
        default:'0'
    },
    SGD: {
        type: String,
        default:'0'
    },
    INR: {
        type: String,
        default:'0'
    },
}, { collection: 'RBIRef', timestamps: true });
const RBIRef = mongoose.model("RBIRef", RBIRefSchema);
module.exports = {
    RBIRefModel: RBIRef,
    RBIRefSchema: RBIRefSchema,
    mongoose: mongoose
};