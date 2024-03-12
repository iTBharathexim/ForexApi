const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("../../../helpers/validators");
const irAdviceSchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    billNo: {
        type: String,
    },
    sbNo: [{
        type: Schema.ObjectId,
        ref: 'MasterService'
    }],
    CI_REF: [{
        type: Schema.ObjectId,
        ref: 'commercial'
    }],
    TrackerRef: [{
        type: Schema.ObjectId,
        ref: 'Inward_remittance'
    }],
    sbno: {
        type: Array,
    },
    date: {
        type: String,
    },
    customer: {
        type: String,
    },
    buyerName: {
        type: Array,
    },
    beneficiaryName: {
        type: Array,
    },
    partyName: {
        type: String,
    },
    exchangeRate: {
        type: String,
    },
    currency: {
        type: String,
    },
    amount: {
        type: String,
    },
    commision: {
        type: String,
    },
    recievedDate: {
        type: String,
    },
    conversionDate: {
        type: String,
    },
    recievedAmount: {
        type: String,
    },
    convertedAmount: {
        type: String,
    },
    commodity: {
        type: String,
    },
    location: {
        type: String,
    },
    origin: {
        type: String,
    },
    pipo: [{
        type: Schema.ObjectId,
        ref: 'pi_po'
    }],
    BOE_Ref: [{
        type: Schema.ObjectId,
        ref: 'boerecords'
    }],
    doc: {
        type: String
    },
    irdate: {
        type: String,
    },
    deleteflag: {
        type: String, default: "0"
    },
    AvailableAmount: {
        type: String,
        default: "0"
    },
    BankName: {
        type: Object
    },
    PaymentType: {
        type: String
    },
    CommissionUsed: {
        type: Boolean,
        default: false
    },
    UsedAmount: {
        type: String,
        default: "0"
    },
    BalanceAvail: {
        type: String,
        default: "-1"
    },
    MatchOffData: {
        type: Object
    },
    AdditionalDocuments: {
        type: Array,
    },
    BOE_DETAIILS:{
        type: Array
    },
}, { timestamps: true });
const irAdvice = mongoose.model("irAdvice", irAdviceSchema);

module.exports = {
    irAdviceModel: irAdvice,
    irAdviceSchema: irAdviceSchema
};
