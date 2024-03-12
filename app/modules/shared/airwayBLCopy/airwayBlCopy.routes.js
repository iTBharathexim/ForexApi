const express = require("express");
const router = express.Router();
module.exports = router;
const postAirwayBlCopy = require("./airwayBlCopy.controller");
const moment = require("moment");

router.post("/post", async(req, res, next) => {
    req.body.airwayBlCopy.userId = req.user[0].companyId;
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    req.body.airwayBlCopy.date = moment(new Date()).format("YYYY-MM-DD");
    postAirwayBlCopy.addAirwayBlcopyFile(req.body, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some error",
            });
        } else if (resp) {
            res.status(200).json({
                message: "airrwayblcopyno added Successfully",
                data: resp,
            });
        } else {
            res.status(400).json({
                message: "Some error",
            });
        }
    });
});
router.post("/getSingleAirwayBlcopy", async(req, res, next) => {
    postAirwayBlCopy.getSingleAirwayBlcopy({
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

router.post("/get", async(req, res, next) => {
    postAirwayBlCopy.getAirwayBlcopy({
            userId: req.user[0].companyId,
            filetype:req.user[0]?.sideMenu,
            PipoNo:req.body?.PipoNo,
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
    
    postAirwayBlCopy.updateAirwayBlcopy(req.body.id, req.body.pipo, (err, resp) => {
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
