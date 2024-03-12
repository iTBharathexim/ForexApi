const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CouponCodeProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    discount: {
        type: Number
    },
    productPictures: [{
        img: {
            type: String,
        },
    },],
    createdBy: {
        default: "SuperAdmin",
        type: String,
    },
}, { collection: 'CouponCodeProduct', timestamps: true });
const CouponCodeProduct = mongoose.model("CouponCodeProduct", CouponCodeProductSchema);
module.exports = {
    CouponCodeProductModel: CouponCodeProduct,
    CouponCodeProductSchema: CouponCodeProductSchema,
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