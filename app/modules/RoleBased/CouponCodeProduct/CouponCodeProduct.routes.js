const express = require("express");
const router = express.Router();
const { addCouponCodeDiscount, InsertDB, getProduct, CouponInsertDB } = require("./CouponCodeProduct.controller");
router.post("/couponCode-discount", addCouponCodeDiscount);
router.post("/Add", InsertDB);
router.post("/AddCoupon", CouponInsertDB);
router.post("/CouponValidation", CouponInsertDB);
router.get("/getProduct", getProduct);

module.exports = router;