const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EbrcCopySchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    EbrcNumber: {
        type: String,
    },
    amount: {
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
    ebrcdate: {
        type: String,
    },
    deleteflag: {
        type : String,
        default :'0'
    }
},{timestamps: true });

module.exports = mongoose.model("EBRC", EbrcCopySchema);