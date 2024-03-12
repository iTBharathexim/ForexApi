const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const debitNoteSchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    debitNoteNumber: {
        type: String,
    },
    totalDebitAmount: {
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
    commercialNumber: {
        type: String
    },
    AdditionalDocuments: {
        type: Array,
    }
},{timestamps: true });

module.exports = mongoose.model("DebitNote", debitNoteSchema);
