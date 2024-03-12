const express = require("express");
const router = express.Router();
module.exports = router;
const postAirwayBlCopy = require("./aws-billing.controller");

// var billing = require('aws-billing')('678678708072',process.env.AWS_S3_ACCESS_KEY_ID,process.env.AWS_S3_SECRET_ACCESS_KEY ,process.env.AWS_S3_BUCKET, 'ap-south-1');
 
// billing(function (err, costs) {
//     
// });

// var config = { 
//     apiVersion: "2012-10-17",
//     accessKeyId : process.env.AWS_S3_ACCESS_KEY_ID,
//     secretAccessKey : process.env.AWS_S3_SECRET_ACCESS_KEY,
//     region: "ap-south-1"
// }

// 

// var CostExplorer = require('aws-cost-explorer');
// var ce = CostExplorer(config);

// 
// var costexplorer = new AWS.CostExplorer({apiVersion: "2012-10-17",});
// 
// var date = new Date();
// var StartDate = moment().startOf('month').format('YYYY-MM-DD');
// var EndDate = moment(date).add(1,'d').format('YYYY-MM-DD');
// 
// 
// var costParams = {
//     TimePeriod: {
//         End: EndDate, 
//         Start: StartDate
//     },
//     Granularity: 'DAILY',
//     Metrics: ['BlendedCost']
// }
// 
// costexplorer.getCostAndUsage(params, function(err, data) {
//   if (err) 
//   else     
// });

router.post("/post", async(req, res, next) => {
    req.body.airwayBlCopy.userId = req.user[0].companyId;
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    req.body.airwayBlCopy.airwayBlCopydate = `${day}-${month}-${year}`;
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
