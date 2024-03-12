const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mongoosePaginate = require("mongoose-paginate-v2");

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
    pi_poNo: {
        type: String,
    },
    benneName: {
        type: String,
    },
    buyerName: {
        type: String,
    },
    MaterialTypes: {
        type: String,
    },
    ConsigneeName: {
        type: String,
    },
    RemitterName: {
        type: Object,
    },
    currency: {
        type: String,
    },
    PCReferanceDetails: {
        type: Array
    },
    ModeofTransport: {
        type: Array
    },
    amount: {
        type: Number,
    },
    incoterm: {
        type: String,
    },
    lastDayShipment: {
        type: String,
    },
    ttDate: {
        type: String,
    },
    ttUSD: {
        type: String,
    },
    recDate: {
        type: String,
    },
    recUSD: {
        type: Number,
    },
    commission: {
        type: Number,
    },
    conversionDate: {
        type: String,
    },
    conversionRate: {
        type: Number,
    },
    convertedAmount: {
        type: Number,
    },
    firxNumber: {
        type: String,
    },
    invoiceValueUSD: {
        type: String,
    },
    exchRate: {
        type: String,
    },
    discountAllowed: {
        type: Number,
    },
    damagesUSD: {
        type: Number,
    },
    goodsShortageUSD: {
        type: Number,
    },
    insuranceAmount: {
        type: Number,
    },
    insuranceNumber: {
        type: Number,
    },
    letterOfCreditNumber: {
        type: Number,
    },
    letterOfCreditAmount: {
        type: Number,
    },
    opinionReportNumber: {
        type: Number,
    },
    opinionReportAmount: {
        type: Number,
    },
    masterServiceNumber: {
        type: Number,
    },
    masterServiceAmount: {
        type: Number,
    },
    xyz: {
        type: String,
    },
    waa: {
        type: String,
    },
    creditNoteStatus: {
        type: String,
    },
    egmNO: {
        type: String,
    },
    egmDate: {
        type: String,
    },
    statusOfRodtep: {
        type: String,
    },
    rodtepAmount: {
        type: String,
    },
    escriptNote: {
        type: String,
    },
    docSubmissionInBank: {
        type: String,
    },
    statusOfBankReco: {
        type: String,
    },
    firxNumberSettledAgainst: {
        type: String,
    },
    balanceIfAny: {
        type: String,
    },
    paymentTerm: Schema.Types.Mixed,

    pcRefNo: {
        type: String,
    },
    date: {
        type: String,
    },
    purchasedate: {
        type: String,
    },
    dueDate: {
        type: String,
    },
    doc: {
        type: String,
    },

    doc1: {
        type: String,
    },
    blCopy: {
        type: String,
    },
    commercialInvoice: {
        type: String,
    },
    agreement: {
        type: String,
    },
    debitNote: {
        type: String,
    },
    creditNote: {
        type: String,
    },
    sb: {
        type: String,
    },
    hssAgreement: {
        type: String,
    },
    lcCopy: {
        type: String,
    },
    deliveryOrder: {
        type: String,
    },
    insuranceCopy: {
        type: String,
    },
    boe: {
        type: String,
    },
    billOfExchange: {
        type: String,
    },
    tryPartyAgreement: {
        type: String,
    },
    airwayBlcopy: {
        type: String,
    },
    commercial: {
        type: String,
    },
    destruction: {
        type: String,
    },
    otherDoc: {
        type: String,
    },
    swiftCopy: {
        type: String,
    },
    EBRC: {
        type: String,
    },
    blcopyref: {
        type: String,
    },
    swiftCopyDate: {
        type: Date,
    },
    opinionReport: {
        type: String,
    },
    packingList: {
        type: String,
    },
    caCb: {
        type: String,
    },
    fbgDocument: {
        type: String,
    },
    caCertificate: {
        type: String,
    },
    advanceOutward: {
        type: String,
    },
    advanceOutwardDate: {
        type: String,
    },

    advanceOutwardRef: [{
        type: Schema.ObjectId,
        ref: 'advanceOutward'
    }],

    directImport: {
        type: String,
    },
    collectionBill: {
        type: String,
    },
    letterOfCredit: {
        type: String,
    },
    nonlcUsance: {
        type: String,
    },
    nonlcSight: {
        type: String,
    },
    lcUsance: {
        type: String,
    },
    lcSight: {
        type: String,
    },
    billUnder: {
        type: String,
    },
    billUnderDate: {
        type: String,
    },
    invoiceReduction: Schema.Types.Mixed,
    lcIssuance: Schema.Types.Mixed,
    lcIssuance1: Schema.Types.Mixed,
    location: {
        type: String
    },
    commodity: {
        type: Array
    },
    paymentDate: {
        type: String
    },
    ttAmount: {
        type: String
    },
    ttCurrency: {
        type: String
    },
    ccyRate: {
        type: String
    },
    ttAmountINR: {
        type: String
    },
    ormNumber: {
        type: String
    },
    totalDedu: {
        type: String
    },
    finalAmo: {
        type: String
    },
    debitNoteStatus: {
        type: String
    },
    boeSubmit: {
        type: String
    },
    lcRef: [{
        type: Schema.ObjectId,
        ref: 'LetterLC'
    }],
    debitNoteRef: [{
        type: Schema.ObjectId,
        ref: 'DebitNote'
    }],
    creditNoteRef: [{
        type: Schema.ObjectId,
        ref: 'creditNote'
    }],
    packingListRef: [{
        type: Schema.ObjectId,
        ref: 'packingList'
    }],
    MasterServiceRef: [{
        type: Schema.ObjectId,
        ref: 'MasterService'
    }],
    billOfExchangeRef: [{
        type: Schema.ObjectId,
        ref: 'billOfExchange'
    }],
    destructionRef: [{
        type: Schema.ObjectId,
        ref: 'destruction'
    }],
    commercialRef: [{
        type: Schema.ObjectId,
        ref: 'commercial'
    }],
    airwayBlCopyRef: [{
        type: Schema.ObjectId,
        ref: 'airwayBlCopy'
    }],
    boeRef: [{
        type: Schema.ObjectId,
        ref: 'boerecords'
    }],
    insuranceRef: [{
        type: Schema.ObjectId,
        ref: 'insurance'
    }],
    tryPartyAgreementRef: [{
        type: Schema.ObjectId,
        ref: 'ThirdParty'
    }],
    opinionReportRef: [{
        type: Schema.ObjectId,
        ref: 'opinionReports'
    }],
    sbRef: [{
        type: Schema.ObjectId,
        ref: 'masterrecord'
    }],
    SwiftCopyRef: [{
        type: Schema.ObjectId,
        ref: 'SwiftCopy'
    }],
    ebrcRef: [{
        type: Schema.ObjectId,
        ref: 'EBRC'
    }],
    blcopyRefs: [{
        type: Schema.ObjectId,
        ref: 'blcopyRef'
    }],
    TransactionRef: [{
        type: Schema.ObjectId,
        ref: 'ExportTransaction'
    }],
    AdviceRef: [{
        type: Schema.ObjectId,
        ref: 'irAdvice'
    }],
    CertificateofOriginRef: [{
        type: Schema.ObjectId,
        ref: 'CertificateofOrigin'
    }],
    InwardRemittanceTracker: [{
        type: Schema.ObjectId,
        ref: 'Inward_remittance'
    }],
    deleteflag: {
        type: String
    },
    StatusApproval: {
        type: String
    },
    payableAmount: {
        type: Number,
    },
    balanceAmount: {
        type: String,
        default: '-1'
    },
    HSCODE: {
        type: String
    },
    UtilizedAmount: {
        type: String
    },
    AvailableAmount: {
        type: String,
        default: '-1'
    },
    AdditionalDocuments: {
        type: Array,
    },
    TransActionType: {
        type: Array
    },
}, { collection: 'pi_po', timestamps: true });
pi_poSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("pi_po", pi_poSchema);
