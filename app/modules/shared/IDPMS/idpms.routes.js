const express = require("express");
const router = express.Router();
module.exports = router;
const postIdpms = require("./idpms.controller");

// create Idpms
router.post("/addIdpms", async (req, res, next) => {
    postIdpms.addIdpms({ data: req.body?.data, userId: req.user[0].companyId, type: req?.body?.type }, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some error",
                error: err,
            })
        } else if (resp) {
            postIdpms.getIdpmsAll({
                userId: req.user[0].companyId,
            }, (err, len) => {
                res.status(200).json({
                    message: "Idpms data sent successfully",
                    data: resp,
                    TotalLength: len
                })
            });
        } else {
            res.status(400).json({
                message: "Some error"
            })
        }
    });
});

// get Idpms
router.get("/getIdpms", async (req, res, next) => {
    postIdpms.getIdpms({
        userId: req.user[0].companyId,
        limit: 10
    }, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some error"
            })
        } else if (resp) {
            postIdpms.getIdpmsAll({
                userId: req.user[0].companyId,
            }, (err, len) => {
                res.status(200).json({
                    message: "Idpms data sent successfully",
                    data: resp,
                    TotalLength: len
                })
            });
        } else {
            res.status(400).json({ message: "Some error" })
        }
    })
});

// post Idpms
router.post("/getIdpmsbylimit", async (req, res, next) => {
    postIdpms.getIdpms({
        userId: req.user[0].companyId,
        limit: req?.body?.limit
    }, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some error"
            })
        } else if (resp) {
            postIdpms.getIdpmsAll({
                userId: req.user[0].companyId,
            }, (err, len) => {
                res.status(200).json({
                    message: "Idpms data sent successfully",
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
    postIdpms.getIdpmsCleared({
        userId: req.user[0].companyId,
        limit: req?.body?.limit
    }, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some error"
            })
        } else if (resp) {
            postIdpms.getIdpmsAllCleared({
                userId: req.user[0].companyId,
            }, (err, len) => {
                res.status(200).json({
                    message: "Idpms data sent successfully",
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
    postIdpms.updateIdpms(
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

router.post("/updateByIdpms", async (req, res, next) => {
    postIdpms.updateIdpmsByIdpms(
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

router.get("/getIdpmsByIdpms", async (req, res, next) => {
    postIdpms.getIdpmsByIdpms({
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

router.get("/getIdpmsBysbNo", async (req, res, next) => {
    postIdpms.getIdpmsBySbno({
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
