const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("../../../helpers/validators");
const BuyerSchema = new Schema({
    buyerName: {
        type: String,
    },
    userId: {
        type: String,
    },
    buyerAdrs: {
        type: String,
    },
    buyerbank: {
        type: String,
    },
    buyerbankaddress: {
        type: String,
    },
    ConsigneeName: {
        type: String,
    },
    ConsigneeAddress: {
        type: String,
    },
},
    { timestamps: true }
);
const buyer = mongoose.model("buyerrecord", BuyerSchema, "buyerrecord");

module.exports = {
    BuyerModel: buyer,
    BuyerSchema: BuyerSchema
};