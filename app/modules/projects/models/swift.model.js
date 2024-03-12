const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const swiftCopySchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    swiftCopyNumber: {
        type: String,
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
    date: {
        type: String,
    },
    deleteflag: {
        type : String,
        default :'0'
    },
    AdditionalDocuments: {
        type: Array,
    }
},{timestamps: true });

module.exports = mongoose.model("SwiftCopy", swiftCopySchema);
