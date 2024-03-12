const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AirwayBlCopySchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    date: {
        type: String,
    },
    airwayBlCopyNumber: {
        type: String,
    },
    pipo: [{
        type: Schema.ObjectId,
        ref: 'pi_po'
    }],
    blCopyDoc: {
        type: String,
    },
    buyerName: {
        type: Array,
    },
    airwayBlCopydate: {
        type: String,
    },
    sbNo: {
        type: String,
    },
    sbRef: [{
        type: Schema.ObjectId,
        ref: 'masterrecord'
    }],
    commercialNumber: {
        type: String,
    },
    commercialRef: [{
        type: Schema.ObjectId,
        ref: 'commercial'
    }],
    deleteflag: {
        type: String,
        default: '0'
    },
    CommercialNumber: {
        type: Object,
    },
    AdditionalDocuments: {
        type: Array,
    }
}, { timestamps: true });

module.exports = mongoose.model("airwayBlCopy", AirwayBlCopySchema);
