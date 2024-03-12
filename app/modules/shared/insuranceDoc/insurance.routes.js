const express = require("express");
const router = express.Router();
module.exports = router;
const postInsurance = require("./insurance.controller");
const moment = require("moment");

router.post("/post", async (req, res, next) => {
    req.body.insurance.userId = req.user[0].companyId;
    req.body.insurance.date = moment(new Date()).format("YYYY-MM-DD");
    postInsurance.addInsuranceFile(req.body, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some error",
            });
        } else if (resp) {
            res.status(200).json({
                message: "InsuranceDoc added Successfully",
                data: resp,
            });
        } else {
            res.status(400).json({
                message: "Some error",
            });
        }
    });
});

router.post("/getSingleInsurance", async (req, res, next) => {
    postInsurance.getSingleInsurance({
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

router.get("/get", async (req, res, next) => {

    postInsurance.getInsurance({
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

    postInsurance.updateInsurance(req.body.id, req.body.pipo, (err, resp) => {
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
