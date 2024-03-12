const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pi_poSchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    BankName: {
        type: String,
    },
    BuyerName: {
        type: Object,
    },
    Inward_reference_number: {
        type: String,
    },
    currency: {
        type: String,
    },
    amount: {
        type: String,
    },
    Remitter_Name: {
        type: String,
    },
    Bill_lodgment_Number: {
        type: String,
    },
    Inward_amount_for_disposal: {
        type: String,
    },
    Credit_Account_Number: {
        type: String,
    },
    Charges_Account_Number: {
        type: String,
    },
    TrackerRef: {
        type: Object
    },
    pipoRef: [{
        type: Schema.ObjectId,
        ref: 'pi_po'
    }],
    AdviceRef: [{
        type: Schema.ObjectId,
        ref: 'irAdvice'
    }],
    SubmitDate: {
        type: String
    },
    deleteflag: {
        type: String,
        default: "0"
    },
    AdditionalDocuments: {
        type: Array,
    },
    fileType: {
        type: String,
        default: "export"
    }
}, { collection: 'Inward_remittance', timestamps: true });

module.exports = mongoose.model("Inward_remittance", pi_poSchema);
