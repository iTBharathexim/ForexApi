const express = require("express");
const router = express.Router();
const uploadImage = require('../../../helpers/helper');
const uploadImage1 = require('../../../helpers/helper2');
const uploadImage2 = require('../../../helpers/helper3');
const uploadImage3 = require('../../../helpers/helper4');
const postDocument = require('../documents/document.controller');
const MasterModel = require('../masterFile/master.model');
const BoeModel = require('../boeFile/boe.model');
const irAdviceModel = require('../irAdvice/irAdvice.model');
const helper = require("../../../helpers/helper");
const Master = require("../../projects/models/masterFile.model").MasterModel;
const Boe = require("../../projects/models/boefile.model").BoeModel;
const irAdvice = require("../../projects/models/irAdvice.model").irAdviceModel;
const AWS = require("aws-sdk");

router.post("/uploadFile", async (req, res, next) => {
    var delayInMilliseconds = 1000 * 20;
    if (req.user) {

        try {
            const myFile = req.file;
            const name = myFile.originalname.replace(/ /g, "_");
            const size = (myFile.size / 1024).toFixed(2).toString() + "KB";
            const result = await uploadImage.uploadImage(req.user[0].companyId, myFile);

            postDocument.addDocument({
                userId: req.user[0].companyId,
                docName: name,
                docSize: size,
                docType: myFile.mimetype
            }, (err, resp) => {
                if (err) {

                    res
                        .status(400)
                        .json({
                            message: "Some error",
                            //data: imageUrl
                        })
                } else if (res) {

                    result[0].userId = `${req.user[0].companyId}`;
                    result[0].doc = result[1];
                    if (result[0].sbno) {

                        Master.findOne({ sbno: result[0].sbno, userId: result[0].userId }, (err1, doc) => {
                            if (!err1) {
                                if (doc) {
                                    res
                                        .status(200)
                                        .json({
                                            message: "This file already uploaded",
                                            data: result[0],
                                            publicUrl: result[1],
                                        })
                                } else {
                                    res
                                        .status(201)
                                        .json({
                                            message: "Shipping bill added successfully",
                                            publicUrl: result[1],
                                            data: result[0]
                                        })

                                }
                            } else {
                                //
                                res
                                    .status(200)
                                    .json({
                                        message: "This file already uploaded",
                                        data: result[0],
                                        publicUrl: result[1],
                                    })

                            }

                        })
                    } else if (result[0].boeNumber) {
                        Boe.findOne({
                            boeNumber: result[0].boeNumber,
                            userId: result[0].userId
                        }, (err1, doc) => {
                            if (!err1) {
                                if (doc) {
                                    res
                                        .status(200)
                                        .json({
                                            message: "This file already uploaded",
                                            data: result[0],
                                            publicUrl: result[1],
                                        })
                                } else {
                                    BoeModel.addBoeFile(result[0], (er1, resp1) => {
                                        if (er1) {
                                            res
                                                .status(400)
                                                .json({
                                                    message: "Some error",
                                                    //data: imageUrl
                                                })
                                        } else if (resp1) {
                                            res
                                                .status(201)
                                                .json({
                                                    message: "BOE added successfully",
                                                    publicUrl: result[1],
                                                    data: resp1
                                                })
                                        }

                                    })
                                }
                            } else {
                                //
                                res
                                    .status(200)
                                    .json({
                                        message: "hjhjhjhjjh",
                                        data: result[0],
                                        publicUrl: result[1],
                                    })

                            }

                        })


                    } else {
                        if (result[0]?.sbno == '') {
                            result[0].sbno = '0'
                        }
                        res.status(200).json({
                            message: "Image Added",
                            data: result[0],
                            publicUrl: result[1]
                        })
                    }

                } else {
                    res
                        .status(400)
                        .json({
                            message: "Some error",
                            //data: imageUrl
                        })
                }
            })

        } catch (error) {
            next(error)
        }
    } else {
        // res.unauthorized(res, "Unauthorized");
    }

});
router.post("/uploadFileSB", async (req, res, next) => {
    if (req.user) {
        try {
            const myFile = req.file;
            const name = myFile.originalname.replace(/ /g, "_");
            const size = (myFile.size / 1024).toFixed(2).toString() + "KB";
            const result = await uploadImage.uploadImageSB(req.user[0].companyId, myFile);

            postDocument.addDocument({
                userId: req.user[0].companyId,
                docName: name,
                docSize: size,
                docType: myFile.mimetype
            }, (err, resp) => {
                if (err) {

                    res
                        .status(400)
                        .json({
                            message: "Some error",
                        })
                } else if (res) {

                    result[0].userId = `${req.user[0].companyId}`;
                    result[0].doc = result[1];
                    if (result[0].sbno) {

                        Master.findOne({ sbno: result[0].sbno, userId: result[0].userId }, (err1, doc) => {
                            if (!err1) {
                                if (doc) {
                                    res
                                        .status(200)
                                        .json({
                                            message: "This file already uploaded",
                                            data: result[0],
                                            publicUrl: result[1],
                                        })
                                } else {
                                    res
                                        .status(201)
                                        .json({
                                            message: "Shipping bill added successfully",
                                            publicUrl: result[1],
                                            data: result[0]
                                        })

                                }
                            } else {
                                //
                                res
                                    .status(200)
                                    .json({
                                        message: "This file already uploaded",
                                        data: result[0],
                                        publicUrl: result[1],
                                    })

                            }

                        })
                    } else if (result[0].boeNumber) {
                        Boe.findOne({
                            boeNumber: result[0].boeNumber,
                            userId: result[0].userId
                        }, (err1, doc) => {
                            if (!err1) {
                                if (doc) {
                                    res
                                        .status(200)
                                        .json({
                                            message: "This file already uploaded",
                                            data: result[0],
                                            publicUrl: result[1],
                                        })
                                } else {
                                    BoeModel.addBoeFile(result[0], (er1, resp1) => {
                                        if (er1) {
                                            res
                                                .status(400)
                                                .json({
                                                    message: "Some error",
                                                    //data: imageUrl
                                                })
                                        } else if (resp1) {
                                            res
                                                .status(201)
                                                .json({
                                                    message: "BOE added successfully",
                                                    publicUrl: result[1],
                                                    data: resp1
                                                })
                                        }

                                    })
                                }
                            } else {
                                //
                                res
                                    .status(200)
                                    .json({
                                        message: "hjhjhjhjjh",
                                        data: result[0],
                                        publicUrl: result[1],
                                    })

                            }

                        })


                    } else {
                        if (result[0]?.sbno == '') {
                            result[0].sbno = '0'
                        }
                        res.status(200).json({
                            message: "Image Added",
                            data: result[0],
                            publicUrl: result[1]
                        })
                    }

                } else {
                    res
                        .status(400)
                        .json({
                            message: "Some error",
                            //data: imageUrl
                        })
                }
            })

        } catch (error) {
            next(error)
        }
    } else {
        // res.unauthorized(res, "Unauthorized");
    }

});
router.post("/uploadFileBOE", async (req, res, next) => {
    if (req.user) {
        try {
            const myFile = req.file;
            const name = myFile.originalname.replace(/ /g, "_");
            const size = (myFile.size / 1024).toFixed(2).toString() + "KB";
            const result = await uploadImage.uploadImageBOE(req.user[0].companyId, myFile);

            postDocument.addDocument({
                userId: req.user[0].companyId,
                docName: name,
                docSize: size,
                docType: myFile.mimetype
            }, (err, resp) => {
                if (err) {
                    
                    res.status(400).json({
                        message: "Some error",
                    })
                } else if (resp) {
                    res.status(200).json({
                        message: "This file uploaded",
                        data: result[0],
                        publicUrl: result[1],
                    })
                } else {
                    
                    res.status(400).json({
                        message: "Some error",
                    })
                }
            })

        } catch (error) {
            next(error)
        }
    }
});
router.post("/inward/uploadFile", async (req, res, next) => {
    var delayInMilliseconds = 1000 * 20;
    if (req.user) {
        try {
            const myFile = req.file;
            const name = myFile.originalname.replace(/ /g, "_");
            const size = (myFile.size / 1024).toFixed(2).toString() + "KB";
            const result = await uploadImage.uploadImageInward(req.user[0].companyId, myFile);
            res.status(200).json({ data: result, publicUrl: result[1] })
        } catch (error) {
            next(error)
        }
    } else {
        // res.unauthorized(res, "Unauthorized");
    }
});

router.post("/inward-disposal/uploadFile", async (req, res, next) => {
    if (req.user) {
        try {
            const myFile = req.file;
            const name = myFile.originalname.replace(/ /g, "_");
            const size = (myFile.size / 1024).toFixed(2).toString() + "KB";
            const result = await uploadImage.uploadImageInwardDisposal(req.user[0].companyId, myFile);
            res.status(200).json({ data: result, publicUrl: result[1] })
        } catch (error) {
            next(error)
        }
    }
});

router.post("/InwardOutward/uploadFile", async (req, res, next) => {
    if (req.user) {
        try {
            const myFile = req.file;
            const name = myFile.originalname.replace(/ /g, "_");
            const size = (myFile.size / 1024).toFixed(2).toString() + "KB";
            const result = await uploadImage.uploadImageInwardOutward(req.user[0].companyId, myFile);

            postDocument.addDocument({
                userId: req.user[0].companyId,
                docName: name,
                docSize: size,
                docType: myFile.mimetype

            }, (err, resp) => {
                if (err) {
                    res
                        .status(400)
                        .json({
                            message: "Some error",
                            //data: imageUrl
                        })
                } else if (res) {

                    result[0].userId = `${req.user[0].companyId}`;
                    result[0].doc = result[1];

                    if (result[0].billNo && result[0].billNo != 'Amount') {
                        irAdvice.findOne({
                            billNo: result[0].billNo,
                            userId: result[0].userId,
                        }, (err1, doc) => {
                            if (!err1) {
                                if (doc) {
                                    res
                                        .status(200)
                                        .json({
                                            message: "This file already uploaded",
                                            data: result[0],
                                            publicUrl: result[1],
                                        })
                                } else {
                                    res
                                        .status(201)
                                        .json({
                                            message: "FirexAdvice added Successfully",
                                            publicUrl: result[1],
                                            data: result[0]
                                        })
                                }
                            } else {
                                res
                                    .status(200)
                                    .json({
                                        message: "SjSjSj",
                                        data: result[0],
                                        publicUrl: result[1]
                                    })
                            }
                        })
                    } else {
                        if (result[0]?.billNo == '' || result[0]?.billNo == undefined) {
                            result[0].billNo = '0'
                        }

                        res.status(200).json({
                            message: "Image Added",
                            data: result[0],
                            publicUrl: result[1]
                        })
                    }

                } else {
                    res
                        .status(400)
                        .json({
                            message: "Some error",
                            //data: imageUrl
                        })
                }
            })

        } catch (error) {
            next(error)
        }
    } else {
        // res.unauthorized(res, "Unauthorized");
    }
});
router.post("/uploadFile1", async (req, res, next) => {
    var delayInMilliseconds = 1000 * 20;
    if (req.user) {
        try {
            const myFile = req.file;
            const name = myFile.originalname.replace(/ /g, "_");
            const size = (myFile.size / 1024).toFixed(2).toString() + "KB";
            const result = await uploadImage1.uploadImage(req.user[0].companyId, myFile);

            postDocument.addDocument({
                userId: req.user[0].companyId,
                docName: name,
                docSize: size,
                docType: myFile.mimetype
            }, (err, resp) => {
                if (err) {
                    res
                        .status(400)
                        .json({
                            message: "Some error",
                            //data: imageUrl
                        })
                } else if (res) {

                    result[0].userId = `${req.user[0].companyId}`;
                    result[0].doc = result[1];


                    if (result[0].pdfflag == 1) {
                        res
                            .status(200)
                            .json({
                                message: "This other pdf file uploaded",
                                data: result[0],
                                publicUrl: result[1],
                            })
                    }
                    else if (result[0].sbno) {
                        Master.findOne({ sbno: result[0].sbno, userId: result[0].userId }, (err1, doc) => {
                            if (!err1) {
                                if (doc) {
                                    res
                                        .status(200)
                                        .json({
                                            message: "This file already uploaded",
                                            data: result[0],
                                            publicUrl: result[1],
                                        })
                                } else {
                                    MasterModel.addMasterFile(result[0], (er1, resp1) => {
                                        if (er1) {
                                            res
                                                .status(400)
                                                .json({
                                                    message: "Some error",
                                                    //data: imageUrl
                                                })
                                        } else if (resp1) {
                                            res
                                                .status(201)
                                                .json({
                                                    message: "Shipping bill added successfully",
                                                    publicUrl: result[1],
                                                    data: resp1
                                                })
                                        }

                                    })
                                }
                            } else {
                                //
                                res
                                    .status(200)
                                    .json({
                                        message: "This file already uploaded",
                                        data: result[0],
                                        publicUrl: result[1],
                                    })

                            }

                        })
                    } else if (result[0].boeNumber) {
                        Boe.findOne({
                            boeNumber: result[0].boeNumber,
                            userId: result[0].userId
                        }, (err1, doc) => {
                            if (!err1) {
                                if (doc) {
                                    res
                                        .status(200)
                                        .json({
                                            message: "This file already uploaded",
                                            data: result[0],
                                            publicUrl: result[1],
                                        })
                                } else {
                                    res
                                        .status(201)
                                        .json({
                                            message: "BOE added successfully",
                                            publicUrl: result[1],
                                            data: result[0]
                                        })
                                    // BoeModel.addBoeFile(result[0], (er1, resp1) => {
                                    //     if (er1) {
                                    //         res
                                    //             .status(400)
                                    //             .json({
                                    //                 message: "Some error",
                                    //                 //data: imageUrl
                                    //             })
                                    //     } else if (resp1) {
                                    //         res
                                    //             .status(201)
                                    //             .json({
                                    //                 message: "BOE added successfully",
                                    //                 publicUrl: result[1],
                                    //                 data: resp1
                                    //             })
                                    //     }

                                    // })
                                }
                            } else {
                                //
                                res
                                    .status(200)
                                    .json({
                                        message: "hjhjhjhjjh",
                                        data: result[0],
                                        publicUrl: result[1],
                                    })

                            }

                        })


                    }


                } else {
                    res
                        .status(400)
                        .json({
                            message: "Some error",
                            //data: imageUrl
                        })
                }
            })

        } catch (error) {
            next(error)
        }
    } else {
        // res.unauthorized(res, "Unauthorized");
    }

});

router.post("/uploadFile2", async (req, res, next) => {
    var delayInMilliseconds = 1000 * 20;
    if (req.user) {
        try {
            const myFile = req.file;
            const name = myFile.originalname.replace(/ /g, "_");
            const size = (myFile.size / 1024).toFixed(2).toString() + "KB";
            const result = await uploadImage2.uploadImage(req.user[0].companyId, myFile);

            postDocument.addDocument({
                userId: req.user[0].companyId,
                docName: name,
                docSize: size,
                docType: myFile.mimetype

            }, (err, resp) => {
                if (err) {
                    res
                        .status(400)
                        .json({
                            message: "Some error",
                            //data: imageUrl
                        })
                } else if (res) {

                    result[0].userId = `${req.user[0].companyId}`;
                    result[0].doc = result[1];

                    if (result[0].billNo && result[0].billNo != 'Amount') {
                        irAdvice.findOne({
                            billNo: result[0].billNo,
                            userId: result[0].userId,
                        }, (err1, doc) => {
                            if (!err1) {
                                if (doc) {
                                    res
                                        .status(200)
                                        .json({
                                            message: "This file already uploaded",
                                            data: result[0],
                                            publicUrl: result[1],
                                        })
                                } else {
                                    res
                                        .status(201)
                                        .json({
                                            message: "FirexAdvice added Successfully",
                                            publicUrl: result[1],
                                            data: result[0]
                                        })
                                }
                            } else {
                                res
                                    .status(200)
                                    .json({
                                        message: "SjSjSj",
                                        data: result[0],
                                        publicUrl: result[1]
                                    })
                            }
                        })
                    } else {
                        if (result[0]?.billNo == '' || result[0]?.billNo == undefined) {
                            result[0].billNo = '0'
                        }

                        res.status(200).json({
                            message: "Image Added",
                            data: result[0],
                            publicUrl: result[1]
                        })
                    }

                } else {
                    res
                        .status(400)
                        .json({
                            message: "Some error",
                            //data: imageUrl
                        })
                }
            })

        } catch (error) {
            next(error)
        }
    } else {
        // res.unauthorized(res, "Unauthorized");
    }

});


router.post("/uploadFile4", async (req, res, next) => {
    var delayInMilliseconds = 1000 * 20;
    if (req.user) {
        try {
            const myFile = req.file;
            const name = myFile.originalname.replace(/ /g, "_");
            const size = (myFile.size / 1024).toFixed(2).toString() + "KB";
            const result = await uploadImage2.uploadImage(req.user[0].companyId, myFile);

            postDocument.addDocument({
                userId: req.user[0].companyId,
                docName: name,
                docSize: size,
                docType: myFile.mimetype

            }, (err, resp) => {
                if (err) {
                    res
                        .status(400)
                        .json({
                            message: "Some error",
                            //data: imageUrl
                        })
                } else if (res) {

                    result[0].userId = `${req.user[0].companyId}`;
                    result[0].doc = result[1];

                    if (result[0].billNo) {
                        irAdvice.findOne({
                            billNo: result[0].billNo,
                            userId: result[0].userId,
                        }, (err1, doc) => {


                            if (!err1) {
                                if (doc) {
                                    res
                                        .status(200)
                                        .json({
                                            message: "This file already uploaded",
                                            data: result[0],
                                            publicUrl: result[1],
                                        })
                                } else {


                                    irAdviceModel.addIrAdviceFile(result[0], (er1, resp1) => {
                                        if (er1) {
                                            res
                                                .status(400)
                                                .json({
                                                    message: "Some Error",
                                                })
                                        } else if (resp1) {

                                            res
                                                .status(201)
                                                .json({
                                                    message: "FirexAdvice added Successfully",
                                                    publicUrl: result[1],
                                                    data: resp1
                                                })
                                        }
                                    })
                                }
                            } else {
                                if (result[0]?.billNo == '') {
                                    result[0].billNo = '0'
                                }
                                res.status(200).json({
                                    message: "Image Added",
                                    data: result[0],
                                    publicUrl: result[1]
                                })
                            }
                        })
                    } else {
                        if (result[0]?.billNo == '') {
                            result[0].billNo = '0'
                        }
                        res.status(200).json({
                            message: "Image Added",
                            data: result[0],
                            publicUrl: result[1]
                        })
                    }

                } else {
                    if (result[0]?.billNo == '') {
                        result[0].billNo = '0'
                    }
                    res.status(200).json({
                        message: "Image Added",
                        data: result[0],
                        publicUrl: result[1]
                    })
                }
            })

        } catch (error) {
            next(error)
        }
    } else {
        // res.unauthorized(res, "Unauthorized");
    }

});

router.post("/uploadFile3", async (req, res, next) => {
    var delayInMilliseconds = 1000 * 20;
    if (req.user) {
        try {
            const myFile = req.file;
            const name = myFile.originalname.replace(/ /g, "_");
            const size = (myFile.size / 1024).toFixed(2).toString() + "KB";
            
            const result = await uploadImage3.uploadImage(req.user[0].companyId, myFile);
            postDocument.addDocument({
                userId: req.user[0].companyId,
                docName: name,
                docSize: size,
                docType: myFile.mimetype
            }, (err, resp) => {
                if (err) {
                    res.status(400).json({ message: "Some error", })
                } else if (res) {
                    result[0].userId = `${req.user[0].companyId}`;
                    res
                        .status(200)
                        .json({
                            message: "This file uploaded",
                            data: result,
                        })
                } else {
                    res.status(400).json({
                        message: "Some error",
                    })
                }
            })
        } catch (error) {
            next(error)
        }
    } else {
        // res.unauthorized(res, "Unauthorized");
    }

});
function setSocketProperties(obj) {
    helper.getSocketProperties(obj);
}



var S3bucketName;
var BucketURL;

S3bucketName = process.env.AWS_S3_BUCKET;
BucketURL = process.env.AWS_S3_BUCKET_URL;

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
})


router.post("/uploadFiletoS3Bucket", async (req, res, next) => {
    var buf = Buffer.from(req.body.buffer.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    if (req.body.type.includes('application/pdf')) {
        buf = Buffer.from(req.body.buffer.replace(/^data:.+;base64,/, ""), 'base64');
    }
    const params = {
        Bucket: S3bucketName,
        Key: req.user[0].companyId + '/' + req.body.fileName,
        Body: buf,
        ContentEncoding: 'base64',
        ContentType: req.body.type
    }
    s3.putObject(params, async function (err, data) {
        if (err) {
            
            
        } else {
            await s3.getObject({ Bucket: S3bucketName, Key: params?.Key }, (err, result) => {
                
                var publicUrl = `${BucketURL}/${params?.Key}`;
                res.send({ url: publicUrl, buffer: result?.Body })
            })
        }
    });
});

router.post("/getReadS3File", async (req, res, next) => {
    removeurl([req?.body?.fileName]).then((newurllist) => {
        var s3Params = ''
        if (newurllist?.length != 0) {
            s3Params = {
                Bucket: S3bucketName,
                Key: newurllist[0]
            };
        } else {
            s3Params = {
                Bucket: S3bucketName,
                Key: req?.body?.fileName
            };
        }
        s3.getObject(s3Params, function (err, data) {
            if (err) {
                res.json({ pdf: '' })
            } else {
                res.json({ pdf: data.Body })
            }
        });
    });
});

function removeurl(data) {
    return new Promise(async (resolve, reject) => {
        var temp = [];
        var listUrl = [
            'https://devapp.bharathexim.com',
            'https://liveassets.bharathexim.com',
            'https://devassets.bharathexim.com',
            'https://www.bharathexim.com',
            'http://localhost:4200',
            'https://staging.bharathexim.com'];
        await data.forEach(async (element) => {
            await listUrl.forEach(urlelement => {
                if (element?.indexOf(urlelement) != -1) {
                    temp.push(element?.replace(urlelement + '/', ''))
                }
            });
        });
        await resolve(temp);
    })
}
module.exports = {
    router: router,
    setSocketProperties: setSocketProperties
};
