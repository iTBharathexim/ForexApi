const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("../../../helpers/validators");
const BeneSchema = new Schema({
    benneName: {
        type: String,
    },
    userId: {
        type: String,
    },
    beneAdrs: {
        type: String,
    },
    beneBankName: {
        type: String,
    },
    beneAccNo: {
        type: String,
    },
    beneBankAdress: {
        type: String,
    },
    beneBankSwiftCode: {
        type: String,
    },
    sortCode: {
        type: String,
    },
    iban: {
        type: String,
    },
    beneBankbranchName: {
        type: String,
    },
    gst: {
        type: String,
    },
    interBankSwiftCode: {
        type: String,
    },
    interBankName: {
        type: String,
    },
    pipo: [{
        type: Schema.ObjectId,
        ref: 'pi_po'
    }],
    deleteflag: {
        type: String,
        default: '0'
    }
},
    { timestamps: true }
);
const bene = mongoose.model("benerecord", BeneSchema, "benerecord");

module.exports = {
    BeneModel: bene,
    BeneSchema: BeneSchema
};