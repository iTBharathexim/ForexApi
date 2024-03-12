const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ForwardContractSchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    document: {
        type: String,
    },
    BookingDate: {
        type: String,
    },
    ForwardRefNo: {
        type: String,
    },
    BuySell: {
        type: String,
    },
    Currency: {
        type: String,
    },
    BookingAmount: {
        type: String,
    },
    UtilizedDate: {
        type: String,
    },
    UtilizedAmount: {
        type: String,
    },
    UtilizedRefereance: {
        type: Array,
    },
    CancellationDate: {
        type: String,
    },
    CancellationAmount: {
        type: String,
    },
    AvailableAmount: {
        type: String,
    },
    FromDate: {
        type: String,
    },
    ToDate: {
        type: String,
    },
    NetRate: {
        type: String,
    },
    CancellationRate: {
        type: String,
    },
    BookedUnderFacility: {
        type: String,
    },
    ImportExport: {
        type: String,
    },
    Status: {
        type: String,
    },
    Underlying: {
        type: String,
    },
    extradata: {
        type: Object
    },
    date7days: {
        type: String,
    },
    date3days: {
        type: String,
    },
    date1days: {
        type: String,
    },
    dateduesdays: {
        type: String,
    },
    MailSend7days: {
        type: Boolean,
        default:false
    },
    MailSend3days: {
        type: Boolean,
        default:false
    },
    MailSend1days: {
        type: Boolean,
        default:false
    },
    MailSendduesdays: {
        type: Boolean,
        default:false
    },
    userDetails: {
        type: Object
    },
}, { collection: 'ForwardContract', timestamps: true });
const ForwardContractModel = mongoose.model("ForwardContract", ForwardContractSchema);
module.exports = {
    ForwardContractModel: ForwardContractModel,
    ForwardContractSchema: ForwardContractSchema
}
