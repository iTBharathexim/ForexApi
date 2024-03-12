const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlrefCopySchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    blcopyrefNumber: {
        type: String,
    },
    amount: {
        type: String,
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
    blcopyrefdate: {
        type: String,
    },
    SbRef: [{
        type: Schema.ObjectId,
        ref: 'masterrecord'
    }],
    LodgementData: {
        type: Object
    },
    deleteflag: {
        type: String,
        default: '0'
    },
    AdditionalDocuments: {
        type: Array,
    }
}, { timestamps: true });

module.exports = mongoose.model("blcopyRef", BlrefCopySchema);
