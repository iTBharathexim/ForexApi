const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const buyer_beneficiary_creditSchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    document: {
        type: String,
    },
    pi_poNo: {
        type: String,
    },
    benneName: {
        type: String,
    },
    buyerName: {
        type: String,
    },
    amount: {
        type: Number,
    },
    ApplicantName: {
        type: String,
    },
    LCIssuingBank: {
        type: String,
    },
    SupplierName: {
        type: String,
    },
    SupplierBankNameSWIFTCode: {
        type: String,
    },
    Currency: {
        type: String,
    },
    LCNoBOENo: {
        type: String,
    },
    LCBOEAmount: {
        type: String,
    },
    Tenor: {
        type: String,
    },
    Commodity: {
        type: String,
    },
    LatestdateofShipment: {
        type: String,
    },
    OriginOfGoods: {
        type: String,
    },
    PortofLoading: {
        type: String,
    },
    PortofDischarge: {
        type: String,
    },
    NumberofShipment: {
        type: String,
    },
    ConfirmationChargesborneby: {
        type: String,
    },
    LendingBankNameandSwiftcode: {
        type: String,
    },
    TermSOFR: {
        type: String,
    },
    ROISpread: {
        type: String,
    },
    ArrangementFee: {
        type: String,
    },
    AcceptReject: {
        type: String,
        default: 'AcceptReject'
    },
    dataRef: {
        type: Object
    },
    documents: {
        type: Array
    },
    deleteflag: {
        type: String,
        default: '0'
    },
    pipo: [{
        type: Schema.ObjectId,
        ref: 'pi_po'
    }],
    extradata:{
        type: Object
    },
    BOE: {
        type: Object
    }
}, { collection: 'buyer_beneficiary_credit', timestamps: true });
const buyer_beneficiary_creditModel = mongoose.model("buyer_beneficiary_credit", buyer_beneficiary_creditSchema);
module.exports = {
    Buyer_Beneficiary_CreditModel: buyer_beneficiary_creditModel,
    buyer_beneficiary_creditSchema: buyer_beneficiary_creditSchema
}
