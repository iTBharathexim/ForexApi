const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("../../../helpers/validators");
const DocumentSchema = new Schema({
    userId: {
        type: String,
    },
    docName: {
        type: String,
    },
    docSize: {
        type: String,
    },
    docType: {
        type: String,
    },
    Status: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }
);
const document = mongoose.model("documents", DocumentSchema);

module.exports = {
    DocumentModel: document,
    DocumentSchema: DocumentSchema
};