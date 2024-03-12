const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const idpmsSchema = new Schema({
    userId: {
        type: String,
    },
    bank: {
        type: String,
    },
    boeno: {
        type: String
    },
    boeDate: {
        type: String,
    },
    adCode: {
        type: String,
    },
    ShippingPortal: {
        type: String,
    },
    ImportAgency: {
        type: String
    },
    IEPAN: {
        type: String
    },
    IECode: {
        type: String
    },
    IEName: {
        type: String
    },
    IEAddress: {
        type: String
    },
    portCode: {
        type: String,
    },
    idpmsStatus: {
        type: String,
    },
    boeAmount: {
        type: String,
    },
    boeBalanceAmount: {
        type: String,
    },
    statusMeaning: {
        type: String,
    },
    systemStatus: {
        type: String,
    },
    docAvailable: {
        type: Boolean,
    },
    action: {
        type: Array,
    },
    cleared: {
        type: String,
        default: 'not-cleared'
    },
    uploaddata: {
        type: Object
    }
}, { timestamps: true });

const IDPMS = mongoose.model("Idpms", idpmsSchema);

module.exports = {
    Idpms: IDPMS,
    IdpmsSchema: idpmsSchema
};
