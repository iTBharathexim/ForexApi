const express = require("express");
const router = express.Router();
module.exports = router;
const postLetterLC = require("./LCTransaction.controller");

router.post("/post", async (req, res, next) => {
    req.body.LCTransaction.userId = req.user[0].companyId;
    postLetterLC.addTransactionLC(req.body, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some error",
            });
        } else if (resp) {
            res.status(200).json({
                message: "letterLC added Successfully",
                data: resp,
            });
        } else {
            res.status(400).json({
                message: "Some error",
            });
        }
    });
});

router.get("/get", async (req, res, next) => {
    postLetterLC.getTransactionLC(req.user[0].companyId, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some error",
            });
        } else if (resp) {
            res.status(200).json({
                message: "letterLC added Successfully",
                data: resp,
            });
        } else {
            res.status(400).json({
                message: "Some error",
            });
        }
    });
});

router.post("/update", async (req, res, next) => {
    postLetterLC.updateTransactionLC(req.body.id, req.body.LCTransaction, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some error",
            });
        } else if (resp) {
            res.status(200).json({
                message: "letterLC added Successfully",
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
    postLetterLC.deleteTransactionLC(req.body.id, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some error",
            });
        } else if (resp) {
            res.status(200).json({
                message: "letterLC added Successfully",
                data: resp,
            });
        } else {
            res.status(400).json({
                message: "Some error",
            });
        }
    });
});