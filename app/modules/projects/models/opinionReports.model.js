const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const opinionReportsSchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    opinionReportNumber: {
        type: String,
    },
    opinionReportAmount: {
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
    ForeignPartyName: {
        type: Object,
    },
    ReportDate: {
        type: String,
    },
    ReportRatings: {
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

module.exports = mongoose.model("opinionReports", opinionReportsSchema);
