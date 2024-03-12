const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("../../../helpers/validators");
const UserSchema = new Schema({
    iniReg: {
        type: String,
        enum: ["Native", "Google", "Facebook"]
    },
    gid: {
        type: String,
    },
    fid: {
        type: String,
    },
    fullName: {
        type: String,
    },
    last_name: {
        type: String,
    },
    mobileNo: {
        type: String,
    },
    companyId: {
        type: String,
    },
    pricing: {
        type: String,
    },
    termsAndCondition: {
        type: Boolean
    },
    password: {
        type: String,
        minlength: 4
    },
    emailId: {
        type: String,
        unique: true,
        required: [true, ["Email Id Is Required"]],
        validate: {
            validator: function (email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re?.test(email);
            },
            message: "Not a valid email id"
        }
    },
    emailIdVerified: {
        type: Boolean,
        default: false
    },
    phoneVerified: {
        type: Boolean,
        default: false
    },
    website: {
        type: String
    },
    facebook: {
        type: String
    },
    linkedIn: {
        type: String
    },
    twitter: {
        type: String
    },
    user_name: {
        type: String
    },
    companyName: {
        type: String
    },
    adress: {
        type: [{
            pincode: {
                type: Number,
            },
            flat_number: {
                type: String,
            },

            area: {
                type: String,
            },
            landmark: {
                type: String,
            },
            city: {
                type: String,
            },
        }]
    },
    members_list: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teamMember',
    }],
    location: {
        type: String
    },
    role: {
        type: String
    },
    verified: {
        type: String
    },
    date: {
        type: String
    },
    otpDone: {
        type: String
    },
    sideMenu: {
        type: String,
        default: 'export'
    },
    Subscription: {
        type: String,
    },
    Role_Type: {
        type: String,
    },
    Login_Limit: {
        type: String,
    },
    RoleCheckbox: {
        type: String,
    },
    otpDetails: Schema.Types.Mixed,
    isLoggin: {
        type: Boolean,
        default: false
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
    disabled: {
        type: Boolean,
        default: false
    },
    otpdisabled: {
        type: Boolean,
        default: false
    },
    TOTAL_ATTEMPT: {
        type: Number,
        default: 0
    },
    LoginToken: {
        type: Array,
        default: []
    }
}, { timestamps: true });
const User = mongoose.model("users", UserSchema);
module.exports = {
    UserModel: User,
    UserSchema: UserSchema
};