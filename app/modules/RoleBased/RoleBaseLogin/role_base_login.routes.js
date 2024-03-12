const express = require("express");
const router = express.Router();
const UserCtrl = require("./role_base_login.controller");
module.exports = router;

router.post("/SingUp", (req, res) => {
    req.body.userId = req.user[0].companyId;
    req.body.companyName = req.user[0].companyName;
    
    UserCtrl.addUser(req.body).then((userres) => {
        
        res.status(200).send(userres);
    })
});

router.post("/SingIn", (req, res) => {
    if (req.headers && req.headers.authorization) {
        headers = req.get("authorization");
        headers = headers.split(" ");        
        UserCtrl.LoginRole(headers[1], mode_of_reg).then((docs) => {
            if (err) {
                res.status(400).send({err:err, Authenticated:"Invalid Email-ID/Password"});
            } else if (docs) {
                res.status(200).send({res:res, docs:docs,Authenticated: "Authenticated"});
            } else {
                res.status(400).send({res:res, Authenticated:"Invalid Email-ID/Password"});
            }
        }).catch((err)=>{
            res.status(400).send({err:err, Authenticated:"Invalid Email-ID/Password"});
        });
    } else {
        res.status(400).send({err:'Missing Email-ID/Password', Authenticated:"Invalid Email-ID/Password"});
    }
});

router.post("/getUser", (req, res) => {
    
    UserCtrl.getUser(req.body.emailId).then((userres) => {
        
        res.status(200).send(userres);
    })
});

router.post("/updateemail", (req, res) => {
    
    UserCtrl.update_email(req).then((userres) => {
        
        res.status(200).send(userres);
    })
});