const express = require("express");
const router = express.Router();
module.exports = router;
const postCommercial = require("./commercial.controller");
const moment = require("moment");

router.post("/post", async(req, res, next) => {
    req.body.commercial.userId = req.user[0].companyId;
    req.body.commercial.commercialDate = moment(new Date()).format("YYYY-MM-DD");;
    postCommercial.addCommercialFile(req.body, (err, resp) => {
        if (err) {            
            res.status(400).json({
                message: "Some error",
            });
        } else if (resp) {
            res.status(200).json({
                message: "CommercialDoc added Successfully",
                data: resp,
            });
        } else {
            res.status(400).json({
                message: "Some error",
            });
        }
    });
});

router.post("/getSingleCommercial", async(req, res, next) => {
    postCommercial.getSingleCommercial({
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
    postCommercial.getCommercial({
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

router.get("/getByFiletype/:filetype/:pipo", async(req, res, next) => {
    postCommercial.getCommercialByFile({
            userId: req.user[0].companyId,
            filetype:req.params.filetype,
            pipoId:req.params.pipo,
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
    
    postCommercial.updateCommercial(req.body.id, req.body.pipo, (err, resp) => {
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
