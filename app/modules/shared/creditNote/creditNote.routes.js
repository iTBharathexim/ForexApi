const express = require("express");
const router = express.Router();
module.exports = router;
const postCreditNote = require("./creditNote.controller");
const moment = require("moment");

router.post("/post", async(req, res, next) => {
    req.body.credit.userId = req.user[0].companyId;
    req.body.credit.date =  moment(new Date()).format("YYYY-MM-DD");
    postCreditNote.addCreditFile(req.body, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some error",
            });
        } else if (resp) {
            res.status(200).json({
                message: "Credit Note added Successfully",
                data: resp,
            });
        } else {
            res.status(400).json({
                message: "Some error",
            });
        }
    });
});

router.post("/getSingleCredit", async(req, res, next) => {    
    postCreditNote.getSingleCredit({
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
    postCreditNote.getCredit({
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
    postCreditNote.updateCredit(req.body.id, req.body.pipo, (err, resp) => {
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
