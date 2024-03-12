const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CA_CertificateSchema = new Schema({
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
    BOE: {
        type: Object
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
    RequestType:{
        type: String,
    }
}, { collection: 'CA_Certificate', timestamps: true });
const CA_CertificateModel = mongoose.model("CA_Certificate", CA_CertificateSchema);
module.exports = {
    CA_CertificateModel: CA_CertificateModel,
    CA_CertificateSchema: CA_CertificateSchema
}
