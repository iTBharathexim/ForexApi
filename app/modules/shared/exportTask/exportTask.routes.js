const express = require("express");
const router = express.Router();
module.exports = router;
const task = require("./exportTask.controller");
const moment = require("moment");
router.post("/post", async (req, res, next) => {
    req.body.task.date =  moment(new Date()).format("YYYY-MM-DD");;
    req.body.task.userId = req.user[0].companyId;
    task.addTaskFile(req.body, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some error",
            });
        } else if (resp) {
            res.status(200).json({
                message: "Pipo added Successfully",
                data: resp,
            });
        } else {
            res.status(400).json({
                message: "Some error",
            });
        }
    });
});


router.get("/get", async (req, res, next) => {
    
    task.getTask(
        {
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

    
    task.updateTask(
        req.body.id, req.body.task
        , (err, resp) => {
            if (err) {
                
                res
                    .status(400)
                    .json({
                        message: "Some error",

                    })
            } else if (resp) {
                
                res.status(200)
                    .json({
                        data: resp
                    })
            } else {
                res
                    .status(400)
                    .json({
                        message: "Some error",

                    })
            }
        })

});

router.post("/getFromType", async (req, res, next) => {

    
    req.body.userId = req.user[0].companyId;
    task.getType(
        req.body
        , (err, resp) => {
            if (err) {
                
                res
                    .status(400)
                    .json({
                        message: "Some error",

                    })
            } else if (resp) {
                
                res.status(200)
                    .json({
                        data: resp
                    })
            } else {
                res
                    .status(400)
                    .json({
                        message: "Some error",

                    })
            }
        })

});

router.post("/getOne", async (req, res, next) => {
    
    task.getOne(
        {
            id: req.body.id,
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



