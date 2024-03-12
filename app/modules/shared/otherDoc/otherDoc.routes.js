const express = require("express");
const router = express.Router();
module.exports = router;
const postOtherDoc = require("./otherDoc.controller");
const moment = require("moment");

router.post("/post", async(req, res, next) => {   
    req.body.otherDoc.userId = req.user[0].companyId;
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    req.body.otherDoc.otherDocDate =  moment(new Date()).format("YYYY-MM-DD")
    postOtherDoc.addOtherDocFile(req.body, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some error",
            });
        } else if (resp) {
            res.status(200).json({
                message: "OtherDoc added Successfully",
                data: resp,
            });
        } else {
            res.status(400).json({
                message: "Some error",
            });
        }
    });
});

router.post("/getSingleOtherDoc", async(req, res, next) => {
    
    
    postOtherDoc.getSingleOtherDoc({
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
    
    postOtherDoc.getOtherDoc({
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
    
    postOtherDoc.updateOtherDoc(req.body.id, req.body.pipo, (err, resp) => {
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
