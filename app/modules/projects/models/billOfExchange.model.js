const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billOfExchangeSchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    DATE: {
        type: String,
    },
    CI_DATE: {
        type: String,
    },
    BL_DATE: {
        type: String,
    },
    sbNo: {
        type: String,
    },
    SbRef: [{
        type: Schema.ObjectId,
        ref: 'masterrecord'
    }],
    billExchangeNumber: {
        type: String,
    },
    CommericalNoList: {
        type: Array
    },
    BLCopy: {
        type: Object
    },
    pipo: [{
        type: Schema.ObjectId,
        ref: 'pi_po'
    }],
    doc: {
        type: String,
    },
    buyerName: {
        type: Array,
    },
    billOfExchangeDate: {
        type: String,
    },
    deleteflag: {
        type: String,
        default: '0'
    },
    AdditionalDocuments: {
        type: Array,
    }
}, { timestamps: true });

module.exports = mongoose.model("billOfExchange", billOfExchangeSchema);
