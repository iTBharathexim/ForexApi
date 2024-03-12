const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("../../../helpers/validators");
const TeamSchema = new Schema(
    {
        userId: {
            type: String,
        },
        teamName: {
            type: String,
        },
        iec: {
            type: String,
        },
        AdCode: {
            type: Array,
        },
        adress: {
            type: String,
        },
        phone: {
            type: String,
        },
        caEmail: {
            type: String,
        },
        chaEmail: {
            type: String,
        },
        gst: {
            type: String,
        },

        location: {
            type: Schema.Types.Mixed,
        },

        commodity: {
            type: Schema.Types.Mixed,
        },
        bankDetails: {
            type: Schema.Types.Mixed,
        },
        BranchName: {
            type: String,
        },
        BranchAddress: {
            type: String,
        },
        letterHead: {
            type: String,
        },
        roundSeal: {
            type: String,
        },
        forSeal: {
            type: String,
        },
        Starhousecertificate_Details: {
            type: Object,
        },
        member: {
            type: Array
        },
        file: {
            type: Array
        },
        AuthorizationTallyToken: {
            type: String
        }
    },
    { timestamps: true }
);
const Team = mongoose.model("teams", TeamSchema);

module.exports = {
    TeamModel: Team,
    TeamSchema: TeamSchema
};