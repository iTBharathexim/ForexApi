const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const insuranceSchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    insuranceNumber: {
        type: String,
    },
    StartDate: {
        type: String,
    },
    Expirydate: {
        type: String,
    },
    insuranceAmount: {
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
    UtilizationAddition:{
        type: Array,
    },
    deleteflag: {
        type: String, default: "0"
    },
    AdditionalDocuments: {
        type: Array,
    }
}, { timestamps: true });

module.exports = mongoose.model("insurance", insuranceSchema);
