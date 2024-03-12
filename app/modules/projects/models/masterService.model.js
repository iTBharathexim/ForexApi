const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const masterServiceSchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    masterServiceNumber: {
        type: String,
    },
    masterServiceAmount: {
        type: Number,
    },
    StartDate: {
        type: String,
    },
    Expirydate: {
        type: String,
    },
    pipo:[{
        type: Schema.ObjectId,
        ref: 'pi_po'
    }],
    doc: {
        type: String,
    },
    PartyName: {
        type: Object,
    },
    buyerName: {
        type: Object,
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
        type: String,
        default:"0"
    },
    AdditionalDocuments: {
        type: Array,
    }
},{timestamps: true });

module.exports = mongoose.model("MasterService", masterServiceSchema);
