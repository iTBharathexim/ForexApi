const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("../../../helpers/validators");
const MemberSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    role: {
        type: String,
    },
    teamId: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    deleteflag: {
        type: String,
    },
    UnderSubscriptionCheckBox: {
        type: String,
    },
    Subscription: {
        type: String,
    },
    DMS: {
        type: Boolean,
        default: false
    },
    Teasury: {
        type: Boolean,
        default: false
    },
    Transaction: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true }
);
const member = mongoose.model("teamMember", MemberSchema, "teamMember");

module.exports = {
    MemberModel: member,
    MemberSchema: MemberSchema
};