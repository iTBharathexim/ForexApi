const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const creditNoteSchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    creditNoteNumber: {
        type: String,
    },
    creditNoteAmount: {
        type: String,
    },
    pipo:[{
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
        type: String,default:"0"
    },
    AdditionalDocuments: {
        type: Array,
    }
},{timestamps: true });

module.exports = mongoose.model("creditNote", creditNoteSchema);
