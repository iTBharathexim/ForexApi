const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ApprovalSchema = new Schema({
    id: {
        type: String,
    },
    comment: {
        type: String,
    },
    tableName: {
        type: String,
    },
    deleteflag: {
        type: String
    },
    userdetails: {
        type: Object
    },
    status: {
        type: String,
    },
    dummydata: {
        type: Object
    },
    data: {
        type: Object
    },
    rejectcomment: {
        type: String,
        default: ''
    },
    Types: {
        type: String
    },
    FileType: {
        type: String
    },
    documents: {
        type: Array
    },
    TypeOfPage: {
        type: String
    },
    userId: {
        type: String
    },
    SendMailData: {
        type: Object
    },
    UniqueId: {
        type: String,
        default: ''
    },
    RejectData: {
        type: Object
    },
    commercialRef: [{
        type: Schema.ObjectId,
        ref: 'commercial'
    }],
}, { timestamps: true, collection: 'approval' });


module.exports = mongoose.model("approval", ApprovalSchema); 