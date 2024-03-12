const express = require("express");
const router = express.Router();
const SubscriptionPlanCtrl = require("./SubscriptionPlan.controller");
module.exports = router;

router.post("/add", (req, res) => {
    
    SubscriptionPlanCtrl.add(req.body?.data).then((userres) => {
        
        res.status(200).json(userres);
    }).catch((err) => {
        res.status(400).json({ error: err });
    })
});

router.get("/get", (req, res) => {
    
    SubscriptionPlanCtrl.get().then((userres) => {
        
        res.status(200).json(userres);
    }).catch((err) => {
        res.status(400).json({ error: err });
    })
});

router.post("/update", (req, res) => {
    
    SubscriptionPlanCtrl.update(req.body?.id, req.body?.data).then((userres) => {
        
        res.status(200).json(userres);
    }).catch((err) => {
        res.status(400).json({ error: err });
    })
});

router.post("/delete", (req, res) => {
    
    SubscriptionPlanCtrl.deletedata(req.body?.id).then((userres) => {
        
        res.status(200).json(userres);
    }).catch((err) => {
        res.status(400).json({ error: err });
    })
});