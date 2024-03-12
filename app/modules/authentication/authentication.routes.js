const express = require("express");
const router = express.Router();
const AuthCtrl = require("./authentication.controller");
const resp = require("../../helpers/responseHelpers");
module.exports = router;
const UserCtrl = require("../user/user.controller");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const uploadImage = require('../../helpers/helper');
const postDocument = require('../shared/documents/document.controller');
const UserModel = require('../projects/models/users.model').UserModel;
const Users = require('../projects/models/users.model.js').UserModel;
const sgMail = require('@sendgrid/mail');
const EmailFormat = require('../mails/mailhelper/email-store/email-formats');
const postTeam = require("../projects/models/team.model").TeamModel;
var mongoose = require('mongoose');
const Member = require("../projects/models/member.model").MemberModel;
const axios = require('axios');
const RoleBase_SingIn_SingUpModel = require('../../modules/RoleBased/role_base_login.model').RoleBase_SingIn_SingUpModel;
const role_base_loginCtrl = require("../RoleBased/RoleBaseLogin/role_base_login.controller");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
require('dotenv').config({ path: '.env' });

const AWS = require("aws-sdk");
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

var S3bucketName;
var BucketURL;

S3bucketName = process.env.AWS_S3_BUCKET;
BucketURL = process.env.AWS_S3_BUCKET_URL;

router.post("/signup", (req, res) => {
    
    req.body.user.emailId = req.body.user.email;
    if (req.body.user) {
        UserModel.findOne({
            emailId: req.body.user.emailId
        }, function (err, user) {
            
            
            if (err) {
                
                
                
                req.body.user["iniReg"] = "Native";
                
                const email = req.body.user.emailId;
                if (req.body.user["confirmPassword"] != req.body.user["password"]) {
                    return res.status(501).send(`Both password should be same`);
                }

                req.body.user["user_name"] =
                    email.substring(0, email.indexOf("@")) +
                    "_" +
                    email.substring(email.indexOf("@") + 1, email.indexOf(".")) +
                    "_" +
                    email.substring(email.indexOf(".") + 1, email.length);
                delete req.body.user["confirmPassword"];
                let user_data = AuthCtrl.capitaliseFirstLetter(req.body.user);
                AuthCtrl.signUpUser(user_data, (err1, docs) => {
                    if (err1) {
                        if (err1.name && err1.name === "ValidationError") {
                            resp.errorResponse(res, "Required Fields Are Missing");
                        } else if (err1.code && err1.code === 11000) {
                            resp.alreadyRegistered(res, "Email Id Already Registered");
                        } else {
                            resp.errorResponse(res, "Internal Server Error");
                        }
                    } else if (docs) {
                        resp.successPostResponse(res, docs, "Successfully Signed Up New User");
                    } else {
                        resp.noRecordsFound(res, "Can't Add New User");
                    }
                });
            } else if (user) {
                return res.status(501).send(`Email ID already exist`);
            } else {
                
                
                req.body.user["iniReg"] = "Native";
                const email = req.body.user.emailId;
                if (req.body.user["confirmPassword"] != req.body.user["password"]) {
                    return res.status(501).send(`Both password should be same`);
                }

                req.body.user["user_name"] =
                    email.substring(0, email.indexOf("@")) +
                    "_" +
                    email.substring(email.indexOf("@") + 1, email.indexOf(".")) +
                    "_" +
                    email.substring(email.indexOf(".") + 1, email.length);
                delete req.body.user["confirmPassword"];
                let user_data = AuthCtrl.capitaliseFirstLetter(req.body.user);
                AuthCtrl.signUpUser(user_data, (err, docs) => {
                    if (err) {
                        if (err.name && err.name === "ValidationError") {
                            resp.errorResponse(res, "Required Fields Are Missing");
                        } else if (err.code && err.code === 11000) {
                            resp.alreadyRegistered(res, "Email Id Already Registered");
                        } else {
                            resp.errorResponse(res, "Internal Server Error");
                        }
                    } else if (docs) {
                        resp.successPostResponse(res, docs, "Successfully Signed Up New User");
                    } else {
                        resp.noRecordsFound(res, "Can't Add New User");
                    }
                });
            }

        });

    } else {
        resp.missingBody(res, "Missing Body");
    }
});


router.post("/login", (req, res) => {
    
    
    if (req.headers && req.headers.authorization) {
        headers = req.get("authorization");
        headers = headers.split(" ");
        const mode_of_reg = "Native";
        AuthCtrl.userLogin(headers[1], mode_of_reg, (err, docs) => {
            
            if (err != false) {
                if (err) {
                    if (err.name && err.name === "wrong mode of login") {
                        resp.alreadyRegisteredWithGoogle(res,
                            "Email logged in through google please login through Google!");
                    } else {
                        resp.errorResponse(res)
                    };
                } else if (docs) {
                    resp.successPostResponse(res, docs, "Authenticated");
                } else {
                    if (err == false) {
                        resp.noRecordsFound(res, 'Login attempt has failed too many times. Please reset your password.');
                    }
                    resp.noRecordsFound(res, "Login unsuccessful!, Please check the details");
                }
            } else {
                resp.noRecordsFound(res, 'Login attempt has failed too many times. Please reset your password.');
            }
        });
    } else {
        resp.missingBody(res, "Missing Email-ID/Password");
    }
});

router.post("/SingIn", (req, res) => {
    
    
    if (req.headers && req.headers.authorization) {
        headers = req.get("authorization");
        headers = headers.split(" ");
        
        role_base_loginCtrl.LoginRole(headers[1]).then((docs) => {
            res.status(200).send({ docs, Authenticated: "Authenticated" });
        }).catch((err) => {
            res.status(400).send({ err: err, Authenticated: "Invalid Email-ID/Password" });
        });
    } else {
        res.status(400).send({ err: 'Missing Email-ID/Password', Authenticated: "Invalid Email-ID/Password" });
    }
});

router.post("/getUser", (req, res) => {
    
    
    RoleBase_SingIn_SingUpModel.findOne({ emailId: req.body.emailId }).then((userres) => {
        
        res.status(200).send(userres);
    })
});

router.post("/getLogInInfo", (req, res) => {
    
    
    UserModel.findOne({ emailId: req.body.emailId }).then((userres) => {
        
        res.status(200).send(userres);
    })
});

router.post("/emailverification", function (req, res) {
    if (req.user) {
        AuthCtrl.verifyEmail(req.query.emailId, req.body.emailIdVerified, function (
            err,
            docs
        ) {
            if (err) {
                resp.errorResponse(res);
            } else if (docs) {
                resp.successPostResponse(res, "Email Id successfully verified");
            } else {
                resp.noRecordsFound(res, "No Email Id  Found");
            }
        });
    } else {
        resp.missingBody(res, "Missing Body");
    }
});

router.get("/verify/:token", function (req, res, next) {
    try {
        let user = jwt.verify(req.params.token, SECRET);
        AuthCtrl.verifyEmail(user._id, true, function (err, docs) {
            if (err) {
                resp.errorResponse(res);
            } else if (docs) {
                resp.successPostResponse(res, docs);
            } else {
                resp.noRecordsFound(res, "Invalid Token");
            }
        });
    } catch (err) {
        res.json(err.name);
    }
});

router.put("/forgotpsw", function (req, res) {
    if (req.body.emailId) {
        UserModel.findOne({
            emailId: req.body.emailId
        }, function (err, user) {
            if (err) {
                resp.errorResponse(res, err, 200, "User Not found with this emailId");
            } else if (user) {
                AuthCtrl.forgotpsw(req.body.emailId, function (err, docs) {
                    if (err) {
                        resp.errorResponse(res, err, 200, "Internal Server Error, Please Try Again Later");
                    } else if (docs) {
                        resp.successPostResponse(res, 200, `Password Reset Link Has Been Sent To Your Email Id ${req.body.emailId}`);
                    } else {
                        resp.errorResponse(res, null, 200, "Invalid Email Id");
                    }
                });
            } else {
                resp.errorResponse(res, err, 200, `Password Reset Link Has Been Sent To Your Email Id ${req.body.emailId}`);
            }
        });
    } else {
        resp.errorResponse(res, null, 200, "Your input field is empty...");
    }
});

router.put("/updatepsw", function (req, res) {
    if (req.body.emailId && req.body.newPassword) {
        UserCtrl.resetpsw(req.body.emailId, req.body.newPassword, function (
            err,
            docs
        ) {
            if (err) {
                resp.errorResponse(
                    res,
                    err,
                    501,
                    "Internal Server Error, Please Try Again Later"
                );
            } else if (docs) {
                resp.successPostResponse(
                    res,
                    null,
                    `Password Has Been Updated Successfully`
                );
            } else {
                resp.errorResponse(res, null, 401, "Invalid Email Id");
            }
        });
    } else {
        resp.missingBody(res, "Missing Body");
    }
});


router.put("/updateemail", function (req, res) {
    
    if (req.body.emailId) {
        UserModel.updateOne({
            emailId: req.body.emailId,
        },

            { $set: { "emailIdVerified": true } },
            function (err, user) {
                
                if (err) {
                    
                    res.status(400)
                        .json({
                            message: "Not verified",
                            data: resp
                        })
                } else if (user) {
                    const html = EmailFormat.generalFormat({ html: `User Logged in with ${req.body.emailId} to DocMachine please check `, heading: "New User Registered", host: process.env.WEBSITE_URL });
                    const msg = {
                        to: ['noreply@bharathexim.com'], // Change to your recipient
                        from: "noreply@bharathexim.com", // Change to your verified sender
                        subject: "New User Registered",
                        text: "New User Registered",
                        html: html
                    };

                    sgMail
                        .send(msg)
                        .then(() => {
                            res.status(200)
                                .json({
                                    message: "Verified Successfully",
                                    data: user
                                })
                        })
                        .catch((error) => {
                            console.error(JSON.stringify(error));
                            res.status(400)
                                .json({
                                    message: "Not verified",
                                    data: resp
                                })
                        });
                    //

                } else {
                    res.status(400)
                        .json({
                            message: "Not verified",
                            data: resp
                        })
                }
            }
        );
    } else {
        resp.missingBody(res, "Missing Body");
    }
});

router.put("/RoleBase_Update_Email", function (req, res) {
    
    if (req.body.emailId) {
        RoleBase_SingIn_SingUpModel.updateOne({
            emailId: req.body.emailId,
        }, { $set: { "emailIdVerified": true } },
            function (err, user) {
                
                if (err) {
                    
                    res.status(400).json({
                        message: "Not verified",
                        data: resp
                    })
                } else if (user) {
                    const html = EmailFormat.generalFormat({ html: `User Logged in with ${req.body.emailId} to DocMachine please check `, heading: "New User Registered", host: process.env.WEBSITE_URL });
                    const msg = {
                        to: ['noreply@bharathexim.com'], // Change to your recipient
                        from: "noreply@bharathexim.com", // Change to your verified sender
                        subject: "New User Registered",
                        text: "New User Registered",
                        html: html
                    };

                    sgMail.send(msg).then(() => {
                        res.status(200)
                            .json({
                                message: "Verified Successfully",
                                data: user
                            })
                    }).catch((error) => {
                        console.error(JSON.stringify(error));
                        res.status(400)
                            .json({
                                message: "Not verified",
                                data: resp
                            })
                    });
                } else {
                    res.status(400)
                        .json({
                            message: "Not verified",
                            data: resp
                        })
                }
            }
        );
    } else {
        resp.missingBody(res, "Missing Body");
    }
});



router.get('/getAllUser', (req, res) => {
    UserModel.find((err, doc) => {
        if (!err) {
            res.status(200)
                .json({
                    message: "All User getting successfully",
                    data: doc
                })
        } else { 
        }
    })
});


router.put('/updateOneUser', (req, res) => {
    
    UserModel.updateOne({
        _id: req.body.id
    }, { $set: { "verified": req.body.data } }, function (err, user) {
        
        if (err) {
            
            res.status(400)
                .json({
                    message: "User not Updated",
                    data: err
                })
        } else if (user) {
            if (req.body.data == 'yes') {
                

                var content = 'Your account is verified by DocMachine, please use this emailId as your username'
            } else if (req.body.data == 'no') {
                
                var content = 'Your account is taken back by DocMachine'
            } else if (req.body.data == 'declined') {
                
                res.status(200)
                    .json({
                        message: "Account Declined successfully",
                        data: user
                    });
                return
            }
            
            const html = EmailFormat.generalFormat({ html: content, heading: "User Approval" });
            const msg = {
                to: req.body.emailId, // Change to your recipient
                from: "noreply@bharathexim.com", // Change to your verified sender
                subject: "Account verification from DocMachine",
                text: "New User Registered",
                html: html
            };
            sgMail
                .send(msg)
                .then(() => {
                    
                    res.status(200)
                        .json({
                            message: "Updated successfully",
                            data: user
                        })
                })
                .catch((error) => {
                    
                    console.error(error);
                    res.status(400)
                        .json({
                            message: "Not verified",
                            data: resp
                        })
                });


            
            //callback(null, user);
        } else {
            res.status(400)
                .json({
                    message: "error"
                })
        }

    });
});

router.post("/deleteUser", function (req, res) {
    
    if (req.body) {
        UserModel.deleteOne({ _id: req.body.id }, function (err, user) {
            
            if (!err) {
                
                
                res.status(200)
                    .json({
                        message: "User Deleted Successfully",
                        data: user
                    })
            } else { 
            }
        })
    } else {
        resp.missingBody(res, "Missing Body");
    }
});

router.post("/uploadFile", async (req, res, next) => {
    try {
        const myFile = req.file;
        
        const imageUrl = await uploadImage(myFile);
        postDocument.addDocument({
            userId: 'skjsksksksk',
            docName: myFile.originalname,
            docSize: myFile.size,
            docType: myFile.mimetype
        }, (err, resp) => {
            if (err) {
                res
                    .status(400)
                    .json({
                        message: "Some error",
                        data: imageUrl
                    })
            } else if (res) {
                res
                    .status(200)
                    .json({
                        message: "Upload was successful",
                        data: imageUrl
                    })
            } else {
                res
                    .status(400)
                    .json({
                        message: "Some error",
                        data: imageUrl
                    })
            }
        })

    } catch (error) {
        next(error)
    }
});

router.post("/deleteThumbPathFromS3", function (req, res, next) {
    var thumb = req.body.thumb;
    if (thumb) {
        var paramsDelete = { Bucket: "narendra123/projects/temp", Key: thumb.key };
        AWSS3 = new aws.S3({
            params: { Bucket: "narendra123/projects/temp" },
            accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
        });
        AWSS3.deleteObject(paramsDelete, function (err, data) {
            if (!err) {
                if (data) {
                    
                    res.status(200);
                    res.json(data);
                }
            } else if (err) {
                
            }
        });
    }
});


router.post("/documentSend", function (req, res) {
    if (req.body.emailId) {
        UserModel.findOne({
            emailId: req.body.emailId
        }, function (err, user) {
            
            
            if (err) {
                
                resp.errorResponse(
                    res,
                    err,
                    501,
                    "User Not found with this emailId"
                );
            } else if (user) {
                AuthCtrl.documentSend(req.body.emailId, req.body.byteArray, function (err, docs) {
                    if (err) {
                        resp.errorResponse(
                            res,
                            err,
                            501,
                            "Internal Server Error, Please Try Again Later"
                        );
                    } else if (docs) {
                        resp.successPostResponse(
                            res,
                            null,
                            `Documents Successfully Send to ${req.body.emailId}`
                        );
                    } else {
                        resp.errorResponse(res, null, 401, "Invalid Email Id");
                    }
                });
            } else {
                resp.errorResponse(
                    res,
                    err,
                    501,
                    "User Not found with this emailId"
                );
            }

        });
    } else {
        resp.missingBody(res, "Missing Body");
    }

});
router.post("/getUser", async (req, res, next) => {
    
    var COMPANY_DETAILS = [];
    await postTeam.find({ userId: req.body.companyId }, async (err, resp) => {
        COMPANY_DETAILS = resp;
        if (COMPANY_DETAILS.length == 0) {
            await postTeam.find({ _id: mongoose.Types.ObjectId(req.body.companyId) }, (err1, resp1) => {
                COMPANY_DETAILS = resp1;
            });
        }
        if (err) {
            
            res.status(400).json({ res: COMPANY_DETAILS, error: err, status: 400, message: "Some error, Please Try Again Later" });
        } else if (COMPANY_DETAILS) {
            res.status(200).json({ message: "getTeam Getting Successfully", data: COMPANY_DETAILS })
        } else {
            res.status(400).json({ res: COMPANY_DETAILS, error: err, status: 400, message: "Some error, Please Try Again Later" });
        }
        
    });
});

router.post("/getUserbyEmail", async (req, res, next) => {
    
    if (req.body.emailId) {
        UserModel.findOne({
            emailId: req.body.emailId
        }, function (err, user) {
            
            
            if (err) {
                
                res.send({ result: [] });
            } else if (user) {
                res.send({ result: user });
            } else {
                res.send({ result: [] });
            }
        });
    } else {
        res.send({ result: [] });
    }
});

router.post("/updateddisbaled", async (req, res, next) => {
    
    if (req.body.emailId) {
        await UserModel.updateOne({
            emailId: req.body.emailId
        }, { $set: req?.body?.query }, function (err, user) {
            
            
            if (err) {
                
                res.send({ result: [] });
            } else if (user) {
                res.send({ result: user });
            } else {
                res.send({ result: [] });
            }
        });
    } else {
        res.send({ result: [] });
    }
});

router.post("/qrreset", async (req, res, next) => {
    
    AuthCtrl.resetQR(req.body.userdetails, function (err, docs) {
        if (err) {
            resp.errorResponse(
                res,
                err,
                404,
                "Internal Server Error, Please Try Again Later"
            );
        } else if (docs) {
            resp.successPostResponse(
                res,
                200,
                `Qr Images Successfully Send to ${req.body.userdetails.emailId}`
            );
        } else {
            resp.errorResponse(res, err, 404, "Invalid Email Id");
        }
    });
});


router.post("/getEamilByIdUserMember", (req, res) => {
    getEamilByIdUserMember(req.body).then(
        (data) => res.send(data),
        (err) => res.send(err).sendStatus(400))
});
const getEamilByIdUserMember = (query) => {
    return new Promise((resolve, reject) => {
        Users.find({ emailId: query?.email }).then((Userdata) => {
            Member.find({ email: query?.email }).then((memberdata) => {
                var arr3 = mergeByProperty(Userdata?.length, memberdata?.length, Userdata, memberdata);
                
                resolve(arr3)
            })
        },
            (err) => reject(err)
        )
    })
};

router.post("/documentSendMail", async function (req, res) {
    
    if (req.body.emailId) {
        UserModel.findOne({
            emailId: req.body.emailId
        }, async function (err, user) {
            
            
            if (err) {
                
                resp.errorResponse(res, err,
                    501,
                    "User Not found with this emailId"
                );
            } else if (user) {
                removeurl([req.body.byteArray]).then(async (newUrl) => {
                    try {
                        
                        var s3Params = {
                            Bucket: S3bucketName,
                            Key: newUrl[0]
                        };
                        let readStream = await s3.getObject(s3Params).createReadStream();
                        const fs = require('fs'); //note fs/promises, not fs here
                        let writeStream = fs.createWriteStream(`app/tempFolder/convertImage/${newUrl[0]?.split("/")[1]}`);
                        readStream.on('close', async function () {
                            
                            const fs = require('fs'); //note fs/promises, not fs here
                            // Member
                            Member.find({
                                teamId: user?.companyId
                            }, async function (err, MemberData) {
                                let MEMBER_LIST = [req.body.emailId];
                                MemberData?.forEach(element => {
                                    MEMBER_LIST.push(element?.email)
                                });
                                const contents = fs.readFileSync(`app/tempFolder/convertImage/${newUrl[0]?.split("/")[1]}`, { encoding: 'base64' });
                                AuthCtrl.documentSend(removeDuplicates(MEMBER_LIST), contents, function (err, docs) {
                                    if (err) {
                                        resp.errorResponse(
                                            res,
                                            err,
                                            501,
                                            "Internal Server Error, Please Try Again Later"
                                        );
                                    } else if (docs) {
                                        resp.successPostResponse(
                                            res,
                                            null,
                                            `Documents Successfully Send to ${MEMBER_LIST?.join(',')}`
                                        );
                                    } else {
                                        resp.errorResponse(res, null, 401, "Invalid Email Id");
                                    }
                                });
                            })

                        }).pipe(writeStream);
                    } catch (error) {
                        
                    }

                })
            } else {
                resp.errorResponse(
                    res,
                    err,
                    501,
                    "User Not found with this emailId"
                );
            }

        });
    } else {
        resp.missingBody(res, "Missing Body");
    }
});

function removeDuplicates(arr) { 
    return arr.filter((item, 
        index) => arr.indexOf(item) === index); 
} 

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
                if (element?.indexOf(urlelement) != -1 || element?.indexOf(/^data:.+;base64,/, "") != -1) {
                    temp.push(element?.replace(urlelement + '/', ''))
                }
            });
        });
        await resolve(temp);
    })
}

function NewMergePdfs(filePath) {
    return new Promise(async (resolve, reject) => {
        try {
            const fs = require('fs/promises'); //note fs/promises, not fs here
            const pdfData = await fs.readFile(filePath);
            const mergedPdf = await PDFDocument.create();
            const pdfDoc = await PDFDocument.load(pdfData);
            const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
            await copiedPages.forEach(async (page) => {
                await mergedPdf.addPage(page);
            });
            const pdfDataUri = await mergedPdf.saveAsBase64({ dataUri: true });
            var data_pdf = await pdfDataUri.substring(pdfDataUri.indexOf(',') + 1);
            var merge = 'data:application/pdf;base64,' + data_pdf;
            await resolve({ merge: merge, pdfDataUri: pdfDataUri, data_pdf: data_pdf })
        } catch (err) {
            await resolve({ merge: "", pdfDataUri: "", data_pdf: "" });
            
        }
    })
}

function mergeByProperty(length1, length2, data1, data2) {
    var temp = [];
    for (let index = 0; index < parseInt(length1) + parseInt(length2); index++) {
        temp.push({ Userdata: data1, memberdata: data2 })
    }
    return temp;
}