const express = require("express");
const router = express.Router();
const DeviceTrackingOnboardingScreenCtrl = require("./DeviceTrackingOnboardingScreen.controller");

router.post("/register", (req, res) => {
    DeviceTrackingOnboardingScreenCtrl.addUser(req.body?.data).then((userres) => {
        res.status(200).json(userres);
    })
});

router.post("/get", (req, res) => {
    DeviceTrackingOnboardingScreenCtrl.TradeAppLogin(req?.body?.deviceId).then((docs) => {
        res.json({ data: docs});
    })
});

router.post("/update", (req, res) => {
    DeviceTrackingOnboardingScreenCtrl.TradeAppLoginMPIN(req?.body?.deviceId, req?.body?.data).then((docs) => {
        res.json({ docs: docs, Authenticated: "Authenticated" });
    })
});

router.post("/TradeAppResetPassword", (req, res) => {
    DeviceTrackingOnboardingScreenCtrl.TradeAppResetPassword(req?.body?.email, req?.body?.password).then((docs) => {
        res.json({ docs: docs, Authenticated: "Authenticated" });
    })
});

router.post("/getUser", (req, res) => {
    DeviceTrackingOnboardingScreenCtrl.getUser(req.body.emailId).then((userres) => {
        res.status(200).send(userres);
    })
});

router.get("/getUserDetails", (req, res) => {
    DeviceTrackingOnboardingScreenCtrl.getUserDetails().then((userres) => {
        res.status(200).send(userres);
    })
});

var SOCKET_IO = null;
var CacheMemory = null;

module.exports = {
    router: router,
    SocketLoad: async (io, myCache) => {
        CacheMemory = myCache
        io.on('connection', async (client) => {
            
            SOCKET_IO = client;
        });
    }
};
