const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otherDocSchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    otherDocNumber: {
        type: String,
    },
    otherDocName: {
        type: String,
    },
    pipo: {
        type: Array,
    },
    doc: {
        type: String,
    },
    buyerName: {
        type: Array,
    },
    otherDocDate: {
        type: String,
    },
    AdditionalDocuments: {
        type: Array,
    }
},{timestamps: true });

module.exports = mongoose.model("otherDoc", otherDocSchema);