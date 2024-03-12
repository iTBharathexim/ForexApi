const express = require('express');
const router = express.Router();
let jsonData = require('../ErrorListJson/StatusCodeList.json');
const db = require("../../db.js");
const mongoose = require("mongoose");

router.all('*', function (err,req, res, next) {
    Interceptor(req,res,next);
});

function Interceptor(req, res, next) {
    db.main().then(() => {
        var send = res.send;
        res.send = function (body) {
            send.call(this, body);
            mongoose.connection.close();
            mongoose.disconnect();
        };
        next();
    }).catch(() => next());
}

module.exports = router;