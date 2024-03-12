const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CouponCodeDiscountProductSchema = new Schema({
    couponCodeName: {
        type: String,
        min: 5,
        max: 15,
        trim: true,
        required: true,
    },
    // productId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "CouponCodeProduct",
    // },
    discount: {
        type: String,
    },
    discountStatus: {
        type: Boolean,
    },
    originalPrice: {
        type: Number,
    },
    finalPrice: {
        type: Number,
    },
    TrailDays: {
        type: String,
        required: true,
    },
    StartDate: {
        type: String,
        required: true,
    },
    EndDate: {
        type: String,
        required: true,
    },
}, { collection: 'CouponCodeDiscountProduct', timestamps: true });
const CouponCodeDiscountProduct = mongoose.model("CouponCodeDiscountProduct", CouponCodeDiscountProductSchema);
module.exports = {
    CouponCodeDiscountProductModel: CouponCodeDiscountProduct,
    CouponCodeDiscountProductSchema: CouponCodeDiscountProductSchema,
    mongoose: mongoose
};