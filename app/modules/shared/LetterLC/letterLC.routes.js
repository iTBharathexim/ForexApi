const express = require("express");
const router = express.Router();
module.exports = router;
const postLetterLC = require("./letterLC.controller");
const moment = require("moment");

router.post("/post", async(req, res, next) => {
    req.body.letterLC.userId = req.user[0].companyId;
    req.body.letterLC.date = moment(new Date()).format("YYYY-MM-DD");
    postLetterLC.addLetterLCFile(req.body, (err, resp) => {
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

router.post("/getSingleLetterLC", async(req, res, next) => {
    
    
    postLetterLC.getSingleLetterLC({
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
router.post("/filetype", async(req, res, next) => {
    
    postLetterLC.getLetterLC({
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
router.get("/get", async(req, res, next) => {
    
    postLetterLC.getLetterLC({
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

router.post("/update", async(req, res, next) => {
    
    postLetterLC.updateLetterLC(req.body.id, req.body.pipo, (err, resp) => {
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
