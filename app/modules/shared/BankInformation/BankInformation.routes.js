const express = require("express");
const router = express.Router();
module.exports = router;
const BankInformantion = require("./BankInformation.controller");

router.post("/post", async (req, res, next) => {
    req.body.data.userId = req.user[0].companyId;
    
    BankInformantion.addBank(req.body?.data, (err, resp) => {
        if (err) {
            res.status(400).json({
                message: "Some error",
            });
        } else if (resp) {
            res.status(200).json({
                message: "bank added Successfully",
                data: resp,
            });
        } else {
            res.status(400).json({
                message: "Some error",
            });
        }
    });
});

router.get("/getAllBankList", async (req, res, next) => {
    BankInformantion.getAllBank({},
        (err, resp) => {
            if (err) {
                res.status(400).json({ message: "Some error" });
            } else if (resp) {
                res.status(200).send(removeDuplicateObjects(resp, 'BankUniqueId'));
            } else {
                res.status(400).json({ message: "Some error" });
            }
        }
    );
});

function removeDuplicateObjects(array, property) {
    const uniqueIds = [];
    const unique = array.filter(element => {
        const isDuplicate = uniqueIds.includes(element[property]);
        if (!isDuplicate) {
            uniqueIds.push(element[property]);
            return true;
        }
        return false;
    });
    return unique;
}