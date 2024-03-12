const CouponCodeDiscount = require("../CouponCode/CouponCodeSchema").CouponCodeDiscountProductModel;
const Product = require("./CouponCodeProductSchema").CouponCodeProductModel;

exports.addCouponCodeDiscount = async (req, res) => {
    const {
        couponCodeName,
        productId,
        discount,
        discountStatus,
        expirationTime,
    } = req.body;

    if (discount && expirationTime) {
        try {
            const { price } = await Product.findOne({ _id: productId })
                .select("price")
                .exec();

            const originalPrice = price;

            const totalPrice = originalPrice - discount;
            const endDate = new Date(expirationTime);
            let currentDate = new Date().getTime(); // new Date().getTime() returns value in number
            

            CouponCodeDiscount.findOne({ productId }).exec(
                (newCouponCodePrice, couponCodePriceUpdate) => {
                    if (!couponCodePriceUpdate) {
                        // it is newCouponCodeprice
                        if (
                            productId &&
                            couponCodeName.length >= 5 &&
                            couponCodeName.length <= 15
                        ) {
                            const couponCodeDiscount = new CouponCodeDiscount({
                                couponCodeName,
                                discountStatus,
                                productId,
                                discount,
                                originalPrice,
                                finalPrice: totalPrice,
                                expirationTime: endDate,
                            });

                            couponCodeDiscount
                                .save()
                                .then((couponDiscountProduct) => {
                                    
                                    return res.status(201).json({
                                        status: true,
                                        message: `Congrats,You have received Rs ${discount} as a product`,
                                        couponDiscountProduct,
                                    });
                                })

                                .catch((error) => {
                                    
                                    return res.status(400).json({
                                        status: false,
                                        message: "Something went wrong.You might have missed some field",
                                        error,
                                    });
                                });
                        } else {
                            return res.status(403).json({
                                status: false,
                                message: "Unmatched Coupon Code. Discount Denied !!",
                            });
                        }
                    }

                    if (couponCodePriceUpdate) {
                        // it is update discount product of existing productID
                        const discountObj = {
                            couponCodeName,
                            discountStatus,
                            productId,
                            discount,
                            originalPrice,
                            finalPrice: totalPrice,
                            expirationTime: endDate,
                        };

                        // for update ,coupon code must be between 5 and 15

                        if (
                            discountObj.couponCodeName.length >= 5 &&
                            couponCodeName.length <= 15
                        ) {
                            // if coupon code expires,then it cannot be updated
                            CouponCodeDiscount.findOneAndUpdate({ productId: productId },
                                discountObj,

                                {
                                    new: true, // it returns the document after it is updated in database
                                    upsert: true, // if no such couponcode status type found in mongodb, then value is not updated in databse
                                }
                            ).exec((error, couponDiscountProduct) => {
                                if (error) {
                                    
                                    return res.status(400).json({
                                        status: false,
                                        message: "Opps...Coupon Code Discount cannot be updated",
                                    });
                                }
                                if (couponDiscountProduct) {
                                    return res.status(201).json({
                                        status: true,
                                        message: `Coupon Code Discount is updated...`,
                                        couponDiscountProduct,
                                    });
                                }
                            });
                        } else {
                            return res.status(400).json({
                                status: false,
                                message: "Coupon Code length must be between 5 and 15.",
                            });
                        }
                    }
                }
            );
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: "Invalid Product id or Coupon Code...",
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: "Something went Wrong, Discount or expiration time is invalid ",
        });
    }
};

exports.InsertDB = async (req, res) => {
    
    try {
        Product.create(req?.body?.data, (err, res1) => {
            if (err) {
                res.json({ err: err, status: false })
            }
            res.json({ data: res1, status: true })
        })
    } catch (err) {
        
    }
};

exports.CouponInsertDB = async (req, res) => {
    
    try {
        CouponCodeDiscount.create(req?.body?.data, (err, res1) => {
            if (err) {
                res.json({ err: err, status: false })
            }
            res.json({ data: res1, status: true })
        })
    } catch (err) {
        
    }
};


exports.getProduct = async (req, res) => {
    try {
        CouponCodeDiscount.find({}, (err, res1) => {
            if (err) {
                res.json({ err: err, status: false })
            }
            res.json({ data: res1, status: true })
        })
    } catch (err) {
        
    }
};

exports.CouponValidation = async (req, res) => {
    try {
        CouponCodeDiscount.findOne({ couponCodeName: req?.body?.couponCodeName }, (err, res1) => {
            if (err) {
                res.json({ err: err, status: false })
            }
            if (compareDates(new Date(), new Date(res1?.expirationTime))) {

            }
            res.json({ data: res1, status: true })
        })
    } catch (err) {
        
    }
    const compareDates = (d1, d2) => {
        let date1 = new Date(d1).getTime();
        let date2 = new Date(d2).getTime();
        if (date1 == date2) {
            
            return true;
        }
        return false;
    };
};