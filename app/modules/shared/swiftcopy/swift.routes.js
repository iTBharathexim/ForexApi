const express = require("express");
const router = express.Router();
module.exports = router;
const postSwiftCopy = require("./swift.controller");
const moment = require("moment");

router.post("/post", async(req, res, next) => {
    req.body.swift.userId = req.user[0].companyId;
    req.body.swift.date =  moment(new Date()).format("YYYY-MM-DD");
    postSwiftCopy.addSwiftFile(req.body, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some error",
            });
        } else if (resp) {
            res.status(200).json({
                message: "swift Copy added Successfully",
                data: resp,
            });
        } else {
            res.status(400).json({
                message: "Some error",
            });
        }
    });
});

router.post("/getSingleSwift", async(req, res, next) => {
    postSwiftCopy.getSingleSwift({
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
    
    postSwiftCopy.getSwift({
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
    
    postSwiftCopy.updateSwift(req.body.id, req.body.pipo, (err, resp) => {
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
