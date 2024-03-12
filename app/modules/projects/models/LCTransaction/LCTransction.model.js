const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LCTransaction = new Schema({
    id: {
        type: String,
    },
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    doc: {
        type: String,
    },
    date: {
        type: String,
        default: new Date().toLocaleDateString()
    },
    deleteflag: {
        type: String,
        default: "0"
    },
    bundel: {
        type: Array,
    },
    pipo: [{
        type: Schema.ObjectId,
        ref: 'pi_po'
    }],
    FLCRefNo: {
        type: String,
    },
    IssuanceDate: {
        type: String,
    },
    Documents: {
        type: Array,
    },
    SendApproval:{
        type: Boolean,
        default:false
    }
}, { timestamps: true });

module.exports = mongoose.model("LCTransaction", LCTransaction);
