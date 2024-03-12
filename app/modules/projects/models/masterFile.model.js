const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("../../../helpers/validators");
const MasterSchema = new Schema({
    userId: {
        type: String,
    },
    uploaddate: {
        type: String,
    },
    adBillNo: {
        type: String,
    },
    sbno: {
        type: String,
    },
    sbdate: {
        type: String,
    },
    portCode: {
        type: String,
    },
    ieccode: {
        type: String,
    },
    iecName: {
        type: String,
    },
    adCode: {
        type: String,
    },
    leodate: {
        type: String,
    },
    processingStaus: {
        type: String,
    },
    fobCurrency: {
        type: String,
    },
    fobValue: {
        type: Number,
    },
    invoices: {
        type: Array
    },
    realizedFobCurrency: {
        type: String,
    },
    realizedFobValue: {
        type: Number,
    },
    equivalentFobValue: {
        type: Number,
    },
    freightCurrency: {
        type: String,
    },
    freightValue: {
        type: Number,
    },
    realizedFreightCurrency: {
        type: String,
    },
    realizedFreightValue: {
        type: Number,
    },
    insuranceCurrency: {
        type: String,
    },
    insuranceValue: {
        type: Number,
    },
    realizedInsuranceValue: {
        type: Number,
    },
    bankingCharges: {
        type: Number,
    },
    expectedPaymentlastdate: {
        type: String,
    },
    AddedDate: {
        type: String,
    },
    modifiedDate: {
        type: String,
    },
    beneName: {
        type: String,
    },
    buyerName: {
        type: Array,
    },
    doc: {
        type: String
    },
    file: {
        type: String,
    },
    pipo: [{
        type: Schema.ObjectId,
        ref: 'pi_po'
    }],
    irRef: [{
        type: Schema.ObjectId,
        ref: 'irAdvice'
    }],
    exporterLocationCode: {
        type: String,
    },
    countryOfFinaldestination: {
        type: String,
    },
    consigneeName: {
        type: String,
    },
    exchangeRate: {
        type: String,
    },
    blCopyDoc: Schema.Types.Mixed,
    commercialDoc: Schema.Types.Mixed,
    packingDoc: Schema.Types.Mixed,
    DebitNote: Schema.Types.Mixed,
    deleteflag: {
        type: String,
        default: '0'
    },
    balanceAvai: {
        type: String,
        default: '-1'
    },
    firxNumber: {
        type: String,
    },
    firxDate: {
        type: String,
    },
    firxCurrency: {
        type: String,
    },
    firxAmount: {
        type: String,
    },
    firxCommision: {
        type: String,
    },
    firxRecAmo: {
        type: String,
        default: '0'
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
    blcopydetails: [{
        type: Schema.ObjectId,
        ref: 'airwayBlCopy'
    }],
    blcopyRef: [{
        type: Schema.ObjectId,
        ref: 'blcopyRef'
    }],
    commercialdetails: [{
        type: Schema.ObjectId,
        ref: 'commercial'
    }],
    packingdetails: [{
        type: Schema.ObjectId,
        ref: 'packingList'
    }],
    debitnotedetails: [{
        type: Schema.ObjectId,
        ref: 'DebitNote'
    }],
    creditnotedetails: [{
        type: Schema.ObjectId,
        ref: 'creditNote'
    }],
    TrackerRef: [{
        type: Schema.ObjectId,
        ref: 'Inward_remittance'
    }],
    TrackerData: {
        type: Object
    },
    firxdetails: {
        type: Array
    },
    alertmsg: {
        type: Boolean,
        default: false
    },
    weeklist: {
        type: Array
    },
    MatchOffData: {
        type: Object
    },
    TransactionStatus: {
        type: Boolean,
        default: false
    },
    AdditionalDocuments: {
        type: Array,
    },
    AMOUNT_STATUS: {
        type: String,
        default: "Not Use"
    }
}, { timestamps: true });
const Master = mongoose.model("masterrecord", MasterSchema, "masterrecord");

module.exports = {
    MasterModel: Master,
    MasterSchema: MasterSchema
};
