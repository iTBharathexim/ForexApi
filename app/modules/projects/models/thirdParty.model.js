const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thirdPartySchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    triPartyAgreementDate: {
        type: String,
    },
    triPartyAgreementNumber: {
        type: String,
    },
    triPartyAgreementAmount: {
        type: Number,
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
    currency: {
        type: String,
    },
    date: {
        type: String,
    },
    deleteflag: {
        type: String,
        default: "0"
    },
    PartyDetails: {
        type: Array,
    },
    PartyAddress1: {
        type: String,
    },
    PartyAddress2: {
        type: String,
    },
    PartyAddress3: {
        type: String,
    },
    PartyName1: {
        type: String,
    },
    PartyName2: {
        type: String,
    },
    PartyName3: {
        type: String,
    },
    AdditionalDocuments: {
        type: Array,
    }
},{timestamps: true });

module.exports = mongoose.model("ThirdParty", thirdPartySchema);
