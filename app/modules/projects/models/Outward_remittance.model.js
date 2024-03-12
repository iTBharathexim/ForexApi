const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pi_poSchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    document: {
        type: String,
    },
    pipoTerm: Schema.Types.Mixed,
    BankName: {
        type: String,
    },
    Outward_reference_number: {
        type: String,
    },
    currency: {
        type: String,
    },
    amount: {
        type: Number,
    },
    Remitter_Name: {
        type: String,
    },
    Bill_lodgment_Number: {
        type: String,
    },
    Outward_amount_for_disposal: {
        type: String,
    },
    Credit_Account_Number: {
        type: String,
    },
    Charges_Account_Number: {
        type: String,
    },
    deleteflag: {
        type: String
    },
    AdditionalDocuments: {
        type: Array,
    }
},{collection:'Outward_remittance',timestamps: true });

module.exports = mongoose.model("Outward_remittance", pi_poSchema);
