const express = require("express");
const router = express.Router();
module.exports = router;
const postEbrc = require("./ebrc.controller");
const moment = require("moment");

router.post("/post", async(req, res, next) => {
    req.body.ebrc.userId = req.user[0].companyId;
    req.body.ebrc.date = moment(new Date()).format("YYYY-MM-DD");
    postEbrc.addEbrcFile(req.body, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some error",
            });
        } else if (resp) {
            res.status(200).json({
                message: "EBRC added Successfully",
                data: resp,
            });
        } else {
            res.status(400).json({
                message: "Some error",
            });
        }
    });
});
router.post("/getSingleEbrc", async(req, res, next) => {
    postEbrc.getSingleEbrc({
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
    
    postEbrc.getEbrc({
            userId: req.user[0].companyId,
            filetype: req.user[0]?.sideMenu
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
    
    postEbrc.updateEbrc(req.body.id, req.body.pipo, (err, resp) => {
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
