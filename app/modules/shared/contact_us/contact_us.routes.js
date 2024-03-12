const express = require("express");
const router = express.Router();
module.exports = router;
const postEdpms = require("./contact_us.controller");

// create contcatus
router.post("/post", async (req, res, next) => {
    req.body.userId = req.user[0].companyId;
    postEdpms.addEdpms(req.body, (err, resp) => {
        if (err) {
            res.status(400).json({message: "Some error",error: err})
        } else if (resp) {
            res.status(200).json({message: "Thank you your request send..."})
        } else {
            res.status(400).json({ message: "Some error"});
        }
    });
});

// get getcontcatus
router.get("/getcontcatus", async (req, res, next) => {
    postEdpms.getEdpms({
        userId: req.user[0].companyId,
        limit: 10
    }, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some error"
            })
        } else if (resp) {
            postEdpms.getEdpmsAll({
                userId: req.user[0].companyId,
            }, (err, len) => {
                res.status(200).json({
                    message: "getcontcatus data sent successfully",
                    data: resp,
                    TotalLength: len
                })
            });
        } else {
            res.status(400).json({ message: "Some error" })
        }
    })
});

// post EDPMS
router.post("/getEDPMSbylimit", async (req, res, next) => {
    postEdpms.getEdpms({
        userId: req.user[0].companyId,
        limit: req?.body?.limit
    }, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some error"
            })
        } else if (resp) {
            postEdpms.getEdpmsAll({
                userId: req.user[0].companyId,
            }, (err, len) => {
                res.status(200).json({
                    message: "EDPMS data sent successfully",
                    data: resp,
                    TotalLength: len
                })
            });
        } else {
            res.status(400).json({
                message: "Some error"
            })
        }
    })
});

// getcleared
router.post("/getcleared", async (req, res, next) => {
    postEdpms.getEdpmsCleared({
        userId: req.user[0].companyId,
        limit: req?.body?.limit
    }, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some error"
            })
        } else if (resp) {
            postEdpms.getEdpmsAllCleared({
                userId: req.user[0].companyId,
            }, (err, len) => {
                res.status(200).json({
                    message: "EDPMS data sent successfully",
                    data: resp,
                    TotalLength: len
                })
            });
        } else {
            res.status(400).json({
                message: "Some error"
            })
        }
    })

});

router.post("/update", async (req, res, next) => {
    postEdpms.updateEdpms(
        req.body._id, req.body.master, (err, resp) => {
            if (err) {
                res.status(400).json({
                    message: "Some error"
                })
            } else if (resp) {
                res.status(200).json({
                    message: "Upload was successful",
                    data: resp
                })
            } else {
                res.status(400).json({
                    message: "Some error"
                })
            }
        })
});

router.post("/updateByEdpms", async (req, res, next) => {
    postEdpms.updateEdpmsByEdpms(
        req.body._id, req.body.master, (err, resp) => {
            if (err) {
                res.status(400).json({
                    message: "Some error",
                })
            } else if (resp) {
                res.status(200).json({
                    message: "Upload was successful",
                    data: resp
                })
            } else {
                res.status(400).json({
                    message: "Some error"
                })
            }
        })
});

router.get("/getEdpmsByEdpms", async (req, res, next) => {
    postEdpms.getEdpmsByEdpms({
        sbNo: req.body.sbNo,
        userId: req.user[0].companyId
    }, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some error"
            })
        } else if (resp) {
            res.status(200).json({
                message: "Upload was successful",
                data: resp
            })
        } else {
            res.status(400).json({
                message: "Some error"
            })
        }
    })
});

router.get("/getEdpmsBysbNo", async (req, res, next) => {
    postEdpms.getEdpmsBySbno({
        sbNo: req.body.sbNo,
        userId: req.user[0].companyId
    }, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some error"
            })
        } else if (resp) {
            res.status(200).json({
                message: "Upload was successful",
                data: resp
            })
        } else {
            res.status(400).json({
                message: "Some error"
            })
        }
    })
});
