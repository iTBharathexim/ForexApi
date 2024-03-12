const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("../../../helpers/validators");
const BoeSchema = new Schema({
    userId: {
        type: String,
    },
    dischargePort: {
        type: String,
    },
    origin: {
        type: String,
    },
    boeNumber: {
        type: String,
    },
    boeDate: {
        type: String,
    },
    benneName: {
        type: Array,
    },
    iecCode: {
        type: String,
    },
    iecName: {
        type: String,
    },
    adCode: {
        type: String,
    },
    adBillNo: {
        type: String,
    },
    invoiceNumber: {
        type: String,
    },
    invoiceAmount: {
        type: Number,
        default: 0
    },
    currency: {
        type: String,
    },
    settledAmount: {
        type: String,
    },
    status: {
        type: String,
    },
    freightAmount: {
        type: String,
        default: '0'
    },
    freightCurrency: {
        type: String,
    },
    insuranceAmount: {
        type: Number,
        default: 0
    },
    insuranceCurrency: {
        type: String,
    },
    discountAmount: {
        type: Number,
        default: 0
    },
    discountCurrency: {
        type: String,
    },
    miscellaneousAmount: {
        type: Number,
        default: 0
    },
    miscellaneousCurrency: {
        type: String,
    },
    commissionAmount: {
        type: Number,
        default: 0
    },
    commissionCurrency: {
        type: String,
    },
    beneName: {
        type: String,
    },
    doc: {
        type: String,
    },
    pipo: [{
        type: Schema.ObjectId,
        ref: 'pi_po'
    }],
    CI_REF: [{
        type: Schema.ObjectId,
        ref: 'commercial'
    }],
    packingdetails: [{
        type: Schema.ObjectId,
        ref: 'packingList'
    }],
    file: {
        type: String,
    },
    deleteflag: {
        type: String,
        default: '0'
    },
    commercialNumber: {
        type: Array
    },
    CI_DETAILS: {
        type: Object
    },
    AWBNo: {
        type: String
    },
    balanceAmount: {
        type: String,
        default:'-1'
    },
    moredata:{
     type:Array
    },
    alertmsg:{
        type: Boolean,
        default:false
    },
    weeklist:{
        type: Array
    },
    ORMNumber: {
        type: String,
    },
    ORMDate: {
        type: String,
    },
    ORMCurrency: {
        type: String,
    },
    ORMAmount: {
        type: String,
    },
    ORMCommision: {
        type: String,
    },
    ORMRecAmo: {
        type: String,
        default: '0'
    },
    ORMdetails: {
        type: Array
    },
    MatchOffData: {
        type: Object
    },
    AdditionalDocuments: {
        type: Array,
    }
}, { timestamps: true });
const boe = mongoose.model("boerecords", BoeSchema);

module.exports = {
    BoeModel: boe,
    BoeSchema: BoeSchema
};