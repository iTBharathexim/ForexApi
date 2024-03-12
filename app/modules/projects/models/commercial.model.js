const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commercialSchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    commercialNumber: {
        type: String,
    },
    pipo: [{
        type: Schema.ObjectId,
        ref: 'pi_po'
    }],
    commercialDoc: {
        type: String,
    },
    buyerName: {
        type: Array,
    },
    commercialDate: {
        type: String,
    },
    sbNo: {
        type: String,
    },
    currency: {
        type: String,
    },
    amount: {
        type: Number,
    },
    InvoiceNumber: {
        type: String
    },
    InvoiceDate: {
        type: String
    },
    AirwaybillNumber: {
        type: String
    },
    InvoiceValue: {
        type: String
    },
    FreightValue: {
        type: String
    },
    InsuranceValue: {
        type: String
    },
    MiscCharges: {
        type: String
    },
    ThirdParty: {
        type: String
    },
    deleteflag: {
        type: String,
        default: '0'
    },
    sbRef: [{
        type: Schema.ObjectId,
        ref: 'masterrecord'
    }],
    AdvanceInfo: {
        type: Array,
    },
    AdvanceNo: {
        type: String,
    },
    AdvanceCurrency: {
        type: String,
    },
    AdvanceAmount: {
        type: String,
    },
    ORM_Ref: [{
        type: Schema.ObjectId,
        ref: 'irAdvice'
    }],
    IRM_REF: [{
        type: Schema.ObjectId,
        ref: 'irAdvice'
    }],
    TransctionEnabled: {
        type: Boolean,
        default: false
    },
    BoeNo: {
        type: String,
    },
    BoeRef: [{
        type: Schema.ObjectId,
        ref: 'boerecords'
    }],
    AirwayBillRef: [{
        type: Schema.ObjectId,
        ref: 'airwayBlCopy'
    }],
    type: {
        type: String,
    },
    MatchOffData: {
        type: Object
    },
    AdditionalDocuments: {
        type: Array,
    },
    BalanceAmount: {
        type: String,
        default: '-1'
    },
}, { timestamps: true });

module.exports = mongoose.model("commercial", commercialSchema);
