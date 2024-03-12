const express = require("express");
const router = express.Router();
module.exports = router;
const postOpinionReport = require("./opinionReport.controller");
const moment = require("moment");

router.post("/post", async(req, res, next) => {
    req.body.opinionReport.userId = req.user[0].companyId;
    // req.body.opinionReport.date = moment(new Date()).format("YYYY-MM-DD")
    postOpinionReport.addOpinionReportFile(req.body, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some error",
            });
        } else if (resp) {
            
            res.status(200).json({
                message: "OpinionReport added Successfully",
                data: resp,
            });
        } else {
            res.status(400).json({
                message: "Some error",
            });
        }
    });
});
router.post("/filetype", async(req, res, next) => {
    
    postOpinionReport.getOpinionReport({
            userId: req.user[0].companyId,
            file:req.body.file
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
router.post("/getSingleOpinionReport", async(req, res, next) => {
    
    
    postOpinionReportNote.getSingleOpinionReport({
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
    
    postOpinionReport.getOpinionReport({
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
    
    postOpinionReport.updateOpinionReport(req.body.id, req.body.pipo, (err, resp) => {
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

// router.get("/get", async(req, res, next) => {
//     
//     
//     airwayBlCopyFile.find((err, rec) => {
//         
//         if (err) {
//             res.send("oops something went wrong")
//         } else {

//             for (let file of rec) {
//                 let newAtribute = {
//                         file: 'export'
//                     }
//                     // let fileObject = Object.assign(file, newAtribute)
//                     // return res.send(fileObject)
//                 airwayBlCopyFile.updateOne({
//                         _id: file._id,
//                     }, { $set: newAtribute },
//                     (errs, updatedDoc) => {
//                         if (errs) {
//                             
//                         } else {
//                             
//                         }
//                     })

//             }
//             // res.json({
//             //     allRecords: rec[0]._id
//             // })
//         }
//     })
// })
