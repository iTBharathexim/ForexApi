const express = require("express");
const router = express.Router();
module.exports = router;
const postMember = require('../member/member.controller');
const uploadImage1 = require('../../../helpers/helper');
const sgMail = require('@sendgrid/mail');
const EmailTemplate = require("../../projects/model_helpers/email_template");
const UserCtrl = require("../../user/user.controller");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


router.post("/post", async (req, res, next) => {
    getEmailvalidation(req.user[0].companyId).then((email) => {

        if (EmailExists(email, req.body.member.email) == false) {
            req.body.member.teamId = req.user[0].companyId;

            postMember.addMember(req.body.member, req.user[0], (err, resp) => {
                if (err) {

                    res
                        .status(400)
                        .json({
                            message: "Some error",

                        })
                } else if (resp) {
                    res.status(200)
                        .json({
                            message: "Member added Successfully",
                            data: resp
                        })
                } else {
                    res
                        .status(400)
                        .json({
                            message: "Some error",

                        })
                }
            });

        } else {
            res.status(200)
                .json({
                    message: "already exits email id..",

                })
        }
    })

});

router.post("/qrreset", async (req, res, next) => {
    req.body.userdetails.teamId = req.user[0].companyId;

    postMember.sendResetQR(req.body.userdetails, req.user[0], (err, resp) => {
        if (err) {
            res.status(400).json({ message: "Some error" })
        } else if (resp) {
            res.status(200).json({ message: "QR reset otp Successfully", data: resp })
        } else {
            res.status(400).json({ message: "Some error" })
        }
    });
});

router.post("/check", async (req, res, next) => {
});
function EmailExists(obj, email) {
    return obj.some(function (el) {
        return el.email === email;
    });
}

router.post("/get", async (req, res, next) => {
    postMember.getMember(
        req.user[0].companyId, (err, resp) => {
            if (err) {
                res.status(400).json({
                    message: "Some error",
                })
            } else if (resp) {
                res.status(200).json({
                    data: resp
                })
            } else {
                res.status(400).json({
                    message: "Some error",
                })
            }
        })

});

router.post("/update", async (req, res, next) => {
    postMember.UpdateMemeber(req.body.id, req.body.member, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some error",
            })
        } else if (resp) {
            res.status(200).json({
                data: resp
            })
        } else {
            res.status(400).json({
                message: "Some error",
            })
        }
    })
});

router.post("/UPDATE_USER_MEMBER", async (req, res, next) => {
    postMember.UpdateMemeber(req.body.email, {
        name: req.body.member.name,
        Subscription: req.body.member.UnderSubscription,
        UnderSubscriptionCheckBox: req.body.member.UnderSubscriptionCheckBox,
        imageUrl: req.body.member.imageUrl,
        "DMS": req.body.member['DMS'],
        "Teasury": req.body.member['Teasury'],
        "Transaction": req.body.member['Transaction']
    }, (err, resp) => {
        if (err) {
            res.status(400).json({ message: "Some error" })
        } else if (resp) {
            let user = UserCtrl.UpdateUserByEmail(req.body.email, {
                Subscription: req.body.member.UnderSubscription,
                Role_Type: req.body.member.Role_Type,
                RoleCheckbox: req.body.member.UnderSubscriptionCheckBox,
                "DMS": req.body.member['DMS'],
                "Teasury": req.body.member['Teasury'],
                "Transaction": req.body.member['Transaction']
            })
            res.status(200).json({ data: [resp, user] })
        } else {
            res.status(400).json({ message: "Some error" })
        }
    })

});
function getEmailvalidation(companyId) {
    return new Promise((resolve, reject) => {
        postMember.getMember(companyId, (err, resp) => {
            if (err) {
                reject(err);
            } else {
                resolve(resp);
            }
        })
    })
}

router.post("/uploadImage", async (req, res, next) => {
    let fileType = req.body.fileType;
    const result = await uploadImage1.uploadImageNormal(req.file, req.user[0].companyId);
    var obj = {
        [fileType]: result
    };
    if (result) {
        if (fileType) {
            res.status(200).json({
                message: "File Added",
                data: obj,
                publicUrl: obj
            })
        } else {
            res.status(200).json({
                message: "Image Added",
                data: result,
                publicUrl: result
            })
        }
    } else {
        res.status(400).json({
            message: "Some error",
        })
    }
});

router.post("/uploadPdf2Image", async (req, res, next) => {
    let fileType = req.body.fileType;
    const result = await uploadImage1.uploadImagePdf2Image(req.file, req.user[0].companyId);
    var obj = { [fileType]: result };
    if (result) {
        if (fileType) {
            res.status(200).json({
                message: "File Added",
                data: obj,
                publicUrl: obj
            })
        } else {
            res.status(200).json({
                message: "Image Added",
                data: result,
                publicUrl: result
            })
        }
    } else {
        res.status(400).json({
            message: "Some error",
        })
    }
});

router.post("/deleteUserRole", async (req, res, next) => {
    postMember.deleteMemeber(req.body.data, (err, resp) => {
        if (err) {
            res.status(400).json({ message: "Some error" })
        } else if (resp) {
            res.status(200).json({ status: true })
        } else {
            res.status(400).json({ message: "Some error", status: false })
        }
    })
});
