const express = require("express");
const router = express.Router();
module.exports = router;
const Outward_remittance = require("./Outward_remittance.controller");

router.post("/post", async (req, res, next) => {
  req.body.Inward_remittance.userId = req.user[0].companyId;
  req.body.Inward_remittance.deleteflag = "0";
  Outward_remittance.addPipoFile(req.body, (err, resp) => {
    if (err) {
      res.status(400).json({
        message: "Some error",
      });
    } else if (resp) {
      res.status(200).json({
        message: "Outward_remittance added Successfully",
        data: resp,
      });
    } else {
      res.status(400).json({
        message: "Some error",
      });
    }
  });
});

router.get("/get", async (req, res, next) => {
  Inward_remittance.getData(
    {
      userId: req.user[0].companyId,
      deleteflag: 0,
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

router.post("/update", async (req, res, next) => {
  
  Outward_remittance.updateData(req.body.id, req.body.pipo, (err, resp) => {
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
