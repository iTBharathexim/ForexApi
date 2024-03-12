const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LiveTradeAppSchema = new Schema({
    userId: {
        type: String,
    },
    firstName: {
        type: String,
    },
    last_name: {
        type: String,
    },
    password: {
        type: String,
        minlength: 4
    },
    emailId: {
        type: String,
        unique: true,
    },
    companyId: {
        type: String
    },
    companyName: {
        type: String
    },
    mobileNo: {
        type: String,
    },
    emailIdOTP: {
        type: String,
        default: generateOTP()
    },
    MobileOTP: {
        type: String,
        default: generateOTP()
    },
    emailIdVerified: {
        type: Boolean,
        default: false
    },
    MobileOTPVerified: {
        type: Boolean,
        default: false
    },
    termscondition: {
        type: Boolean,
        default: false
    },
    role: {
        type: String
    },
    isLoggin: {
        type: Boolean,
        default: false
    },
    CoupanCode: {
        type: String
    },
    MPIN: {
        type: String
    },
    FreeTrailPeroid: {
        type: Boolean,
        default: false
    },
    TrailDays: {
        type: String,
        default: "0"
    },
    FreeTrailPeroidStratDate: {
        type: String,
    },
    FreeTrailPeroidEndDate: {
        type: String,
    },
    ExpiredTimeStamp: {
        type: String,
    },
    LoginCounter: {
        type: Number,
        default: 0
    },
    CouponVerified: {
        type: Boolean,
        default: false
    },
    DisplayMode: {
        type: String,
        default: 'Light'
    },
    DeviceInfoRegistartion: {
        type: Object,
    },
    DeviceInfoLogin: {
        type: Object,
    },
    PaymentStatus: {
        type: Array,
    },
    order_id: {
        type: Object,
    },
    order_status: {
        type: Object,
    },
    PlanDetails: {
        type: Object,
    },
    UserSession: {
        type: Object,
    },
    deviceId: {
        type: Array,
    },
    discount: {
        type: String,
        default: '0'
    },
    lastactivetime:{
        type: String,
        default: '7875756'
    },
    SubcriptionExpired: {
        type: Boolean,
        default: false
    },
    OnboardingScreen: {
        type: Boolean,
        default: false
    },
}, { collection: 'LiveTradeApp', timestamps: true });
const LiveTradeApp = mongoose.model("LiveTradeApp", LiveTradeAppSchema);
module.exports = {
    LiveTradeAppModel: LiveTradeApp,
    LiveTradeAppSchema: LiveTradeAppSchema,
    mongoose: mongoose
};

// Function to generate OTP 
function generateOTP() {
    let digits =
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}