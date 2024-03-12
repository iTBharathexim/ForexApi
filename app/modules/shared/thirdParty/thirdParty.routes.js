const express = require("express");
const router = express.Router();
module.exports = router;
const postThirdParty = require("./thirdParty.controller");
const moment = require("moment");

router.post("/post", async (req, res, next) => {
    req.body.third.userId = req.user[0].companyId;
    req.body.third.date = moment(new Date()).format("YYYY-MM-DD");
    postThirdParty.addThirdFile(req.body, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some error",
            });
        } else if (resp) {
            res.status(200).json({
                message: "Third added Successfully",
                data: resp,
            });
        } else {
            res.status(400).json({
                message: "Some error",
            });
        }
    });
});

router.post("/getSingleThird", async (req, res, next) => {
    postThirdParty.getSingleThird({
        userId: req.body.id,
    }, (err, resp) => {
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

router.get("/get", async (req, res, next) => {

    postThirdParty.getThird({
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

router.post("/update", async (req, res, next) => {

    postThirdParty.updateThird(req.body.id, req.body.pipo, (err, resp) => {
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