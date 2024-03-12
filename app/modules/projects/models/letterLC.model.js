const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const letterLCSchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    letterOfCreditNumber: {
        type: String,
    },
    Expirydate: {
        type: String,
    },
    LastDateofShipment: {
        type: String,
    },
    letterOfCreditAmount: {
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
    AdditionalDocuments: {
        type: Array,
    }
}, { timestamps: true });

module.exports = mongoose.model("LetterLC", letterLCSchema);
