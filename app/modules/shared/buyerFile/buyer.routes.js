const express = require("express");
const router = express.Router();
module.exports = router;
const postBuyer = require("../buyerFile/buyer.controller");

router.post("/post", async (req, res, next) => {
    req.body.buyer.userId = req.user[0].companyId;
    postBuyer.addBuyerFile(req.body, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some error",
            });
        } else if (resp) {
            res.status(200).json({
                message: "Buyer added Successfully",
                data: resp,
            });
        } else {
            res.status(400).json({
                message: "Some error",
            });
        }
    });
});

router.post("/getSingleBuyer", async (req, res, next) => {
    postBuyer.getSingleBuyer({ userId: req.body.id},(err, resp) => {
            if (err) {
                res.status(400).json({
                    message: "Some error",
                });
            } else if (resp) {
                res.status(200).json({
                    data: resp,
                });
            } else {
                res.status(400).json({
                    message: "Some error",
                });
            }
        }
    );
});

router.post("/getByName", async (req, res, next) => {
    postBuyer.getBuyerByName({ buyerName: req.body.buyerName }, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some Error",
            });
        } else if (resp) {

            res.status(200).json({
                data: resp,
            });
        } else {
            res.status(400).json({
                message: "Some Error",
            });
        }
    });
});

router.post("/get", async (req, res, next) => {
    postBuyer.getBuyer(
        {
            userId: req.user[0].companyId,
        },
        (err, resp) => {
            if (err) {

                res.status(400).json({
                    message: "Some error",
                });
            } else if (resp) {

                res.status(200).json({
                    data: resp,
                });
            } else {
                res.status(400).json({
                    message: "Some error",
                });
            }
        }
    );
});

router.post("/update", async (req, res, next) => {
    postBuyer.updateBuyer(req.body.id, req.body.buyer, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some error",
            });
        } else if (resp) {

            res.status(200).json({
                data: resp,
            });
        } else {
            res.status(400).json({
                message: "Some error",
            });
        }
    });
});

router.post("/delete", async (req, res, next) => {
    postBuyer.DeleteBuyer(req.body.id,(err, resp) => {
        if (err) {
            res.status(400).json({message: "Some error"});
        } else if (resp) {
            res.status(200).json({data: resp});
        } else {
            res.status(400).json({ message: "Some error"});
        }
    });
});