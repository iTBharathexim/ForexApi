const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BankInformationSchema = new Schema({
    userId: {
        type: String,
    },
    value: {
        type: String
    },
    BankUniqueId: {
        type: String
    },
    PDF_Url_List: {
        type: Array
    },
}, { timestamps: true });

module.exports = mongoose.model("BankInformation", BankInformationSchema);
