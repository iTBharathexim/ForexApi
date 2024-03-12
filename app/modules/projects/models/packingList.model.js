const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packingListSchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    packingListNumber: {
        type: String,
    },
    packingCurrency: {
        type: String,
    },
    packingListAmount: {
        type: Number,
    },
    pipo: [{
        type: Schema.ObjectId,
        ref: 'pi_po'
    }],
    packingDoc: {
        type: String,
    },
    buyerName: {
        type: Array,
    },
    packingListDate: {
        type: String,
    },
    sbNo:{
        type:String,
    },
    currency: {
        type: String,
    },
    sbRef: [{
        type: Schema.ObjectId,
        ref: 'masterrecord'
    }],
    boe:{
        type:String,
    },
    boeRef: [{
        type: Schema.ObjectId,
        ref: 'boerecords'
    }],
    deleteflag:{
        type:String,
        default:'0'
    },
    AdditionalDocuments: {
        type: Array,
    }
},{timestamps: true });

module.exports = mongoose.model("packingList", packingListSchema);
