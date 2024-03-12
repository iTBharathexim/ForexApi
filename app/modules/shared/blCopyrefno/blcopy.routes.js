const express = require("express");
const router = express.Router();
module.exports = router;
const postblcopy = require("./blcopy.controller");
const moment = require("moment");

router.post("/post", async(req, res, next) => {
    req.body.blcopy.userId = req.user[0].companyId;
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    req.body.blcopy.blcopyrefdate = moment(new Date()).format("YYYY-MM-DD");
    postblcopy.addblcopyFile(req.body, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some error",
            });
        } else if (resp) {
            res.status(200).json({
                message: "blcopyrefno added Successfully",
                data: resp,
            });
        } else {
            res.status(400).json({
                message: "Some error",
            });
        }
    });
});
router.post("/getSingleblcopy", async(req, res, next) => {  
    postblcopy.getSingleblcopy({
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
    
    postblcopy.getblcopy({
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
    
    postblcopy.updateblcopy(req.body.id, req.body.pipo, (err, resp) => {
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

router.post("/updateSB", async(req, res, next) => {
    
    postblcopy.updateblcopySB(req.body.id, req.body.data, (err, resp) => {
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