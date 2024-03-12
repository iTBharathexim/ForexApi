const express = require("express");
const router = express.Router();
module.exports = router;
const postBillOfExchange = require("./billOfExchange.controller");
const moment = require("moment");

router.post("/post", async(req, res, next) => {
    req.body.billOfExchange.userId = req.user[0].companyId;
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    req.body.billOfExchange.billOfExchangeDate = moment(new Date()).format("YYYY-MM-DD");
    postBillOfExchange.addBillOfExchangeFile(req.body, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some error",
            });
        } else if (resp) {
            res.status(200).json({
                message: "billOfExchangeDoc added Successfully",
                data: resp,
            });
        } else {
            res.status(400).json({
                message: "Some error",
            });
        }
    });
});

router.post("/getSingleBillOfExchange", async(req, res, next) => {
    
    
    postBillOfExchange.getSingleBillOfExchange({
            userId: req.body.id,
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

router.get("/get", async(req, res, next) => {
    
    postBillOfExchange.getBillOfExchange({
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

router.post("/filetype", async(req, res, next) => {
    
    postBillOfExchange.getBillOfExchange({
            userId: req.user[0].companyId,
            file:req.body.file
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
router.post("/update", async(req, res, next) => {
    
    postBillOfExchange.updateBillOfExchange(req.body.id, req.body.pipo, (err, resp) => {
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
