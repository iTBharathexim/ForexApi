const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BenchMarksSchema = new Schema({
    userId: {
        type: String,
    },
    currentdate: {
        type: String,
    },
    REPO_RATE: {
        type: Object,
        "rate": {
            type: String,
            default: '0'
        },
        "1M": {
            type: String,
            default: '0'
        },
        "3M": {
            type: String,
            default: '0'
        },
        "6M": {
            type: String,
            default: '0'
        },
        "12M": {
            type: String,
            default: '0'
        },
        TBILL: {
            type: String,
        },
        asdate: {
            type: String,
        },
        Status: {
            type: String,
        },
    },
    EURIBOR: {
        type: Object,
        "rate": {
            type: String,
            default: '0'
        },
        "1M": {
            type: String,
            default: '0'
        },
        "3M": {
            type: String,
            default: '0'
        },
        "6M": {
            type: String,
            default: '0'
        },
        "12M": {
            type: String,
            default: '0'
        },
        TBILL: {
            type: String,
        },
        asdate: {
            type: String,
        },
        Status: {
            type: String,
        },
    },
    MIBOR_OVERNIGHT: {
        type: Object,
        "rate": {
            type: String,
            default: '0'
        },
        "1M": {
            type: String,
            default: '0'
        },
        "3M": {
            type: String,
            default: '0'
        },
        "6M": {
            type: String,
            default: '0'
        },
        "12M": {
            type: String,
            default: '0'
        },
        TBILL: {
            type: String,
        },
        asdate: {
            type: String,
        },
        Status: {
            type: String,
        },
    },
    SOFR: {
        type: Object,
        "rate": {
            type: String,
            default: '0'
        },
        "1M": {
            type: String,
            default: '0'
        },
        "3M": {
            type: String,
            default: '0'
        },
        "6M": {
            type: String,
            default: '0'
        },
        "12M": {
            type: String,
            default: '0'
        },
        TBILL: {
            type: String,
        },
        asdate: {
            type: String,
        },
        Status: {
            type: String,
        },
    },
    SONIA: {
        type: Object,
        "rate": {
            type: String,
            default: '0'
        },
        "1M": {
            type: String,
            default: '0'
        },
        "3M": {
            type: String,
            default: '0'
        },
        "6M": {
            type: String,
            default: '0'
        },
        "12M": {
            type: String,
            default: '0'
        },
        TBILL: {
            type: String,
        },
        asdate: {
            type: String,
        },
        Status: {
            type: String,
        },
    }
}, { collection: 'BenchMarks', timestamps: true });
const BenchMarks = mongoose.model("BenchMarks", BenchMarksSchema);
module.exports = {
    BenchMarksModel: BenchMarks,
    BenchMarksSchema: BenchMarksSchema,
    mongoose: mongoose
};