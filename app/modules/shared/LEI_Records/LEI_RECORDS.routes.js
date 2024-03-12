const express = require("express");
const router = express.Router();
module.exports = router;
const axios = require('axios');

router.post("/post", async (req, res, next) => {
    
    try {
        const res1 = axios.get("https://api.gleif.org/api/v1/lei-records?page[size]=100&page[number]=1&filter[lei]=" + req?.body?.lei);
        res1.then(response => {
            
            res.json(response.data).status(200);
            next();
        })
    } catch (error) {
        
    }
});