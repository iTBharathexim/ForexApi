const express = require("express");
const router = express.Router();
module.exports = router;
const postDebitNote = require("./debitNote.controller");
const moment = require("moment");

router.post("/post", async(req, res, next) => {
    req.body.debit.userId = req.user[0].companyId;
    req.body.debit.date =  moment(new Date()).format("YYYY-MM-DD");
    postDebitNote.addDebitFile(req.body, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some error",
            });
        } else if (resp) {
            res.status(200).json({
                message: "Debit Note added Successfully",
                data: resp,
            });
        } else {
            res.status(400).json({
                message: "Some error",
            });
        }
    });
});

router.post("/getSingleDebit", async(req, res, next) => {
    postDebitNote.getSingleDebit({
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
    postDebitNote.getDebit({
            userId: req.user[0].companyId,
            filetype:req.user[0]?.sideMenu
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
    
    postDebitNote.updateDebit(req.body.id, req.body.pipo, (err, resp) => {
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
