const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AirwayBlCopySchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    CertificateOriginNumber: {
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
    date: {
        type: String,
    },
    CIRef: [{
        type: Schema.ObjectId,
        ref: 'commercial'
    }],
    commercialNumber:{
        type: String,
    },
    deleteflag:{
     type: String,
     default:'0'
    },
    CommercialNumber:{
        type: Object,
    },
    AdditionalDocuments: {
        type: Array,
    }
},{timestamps: true });

module.exports = mongoose.model("CertificateofOrigin", AirwayBlCopySchema);
