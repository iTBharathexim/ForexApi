const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ExportTransactionSchema = new Schema({
    data: {
        type: Object
    },
    date: {
        type: String
    },
    TypeTransaction: {
        type: String
    },
    Ref_Data: {
        type: Object
    },
    ArrayObject: {
        type: Array
    },
    userId: {
        type: String
    },
    fileType: {
        type: String
    },
    UserDetails: {
        type: String
    },
    pipo: [{
        type: Schema.ObjectId,
        ref: 'pi_po'
    }],
    UniqueId: {
        type: String
    },
    deleteflag: {
        type: String,
        default: '0'
    },
    alertmsg: {
        type: Boolean,
        default: false
    },
    weeklist: {
        type: Array
    },
    commercialRef: [{
        type: Schema.ObjectId,
        ref: 'commercial'
    }],
    SBRef: [{
        type: Schema.ObjectId,
        ref: 'masterrecord'
    }],
    IRAdviceRef: [{
        type: Schema.ObjectId,
        ref: 'irAdvice'
    }],
    MT103Ref: [{
        type: Schema.ObjectId,
        ref: 'Inward_remittance'
    }],
    LodgementAdviceCopy: [{
        type: Schema.ObjectId,
        ref: 'blcopyRef'
    }],
    EBRCRef: [{
        type: Schema.ObjectId,
        ref: 'EBRC'
    }],
    BOERef: [{
        type: Schema.ObjectId,
        ref: 'boerecords'
    }],
    ORMRef: [{
        type: Schema.ObjectId,
        ref: 'irAdvice'
    }],
    LCTransactionRef: [{
        type: Schema.ObjectId,
        ref: 'LCTransaction'
    }],
}, { timestamps: true, collection: 'ExportTransaction' });

module.exports = mongoose.model("ExportTransaction", ExportTransactionSchema); 