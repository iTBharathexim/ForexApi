const express = require("express");
const router = express.Router();
module.exports = router;
const Inward_remittance = require("./Inward_remittance.controller");

router.post("/post", async (req, res, next) => {
  req.body.Inward_remittance.userId = req.user[0].companyId;
  req.body.Inward_remittance.deleteflag = "0";
  req.body.Inward_remittance.fileType =  req?.user[0]?.sideMenu;
  Inward_remittance.addPipoFile(req.body, (err, resp) => {
    if (err) {
      
      res.status(400).json({
        message: "Some error",
      });
    } else if (resp) {
      
      res.status(200).json({
        message: "Inward_remittance added Successfully",
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
  Inward_remittance.getPipo({
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

router.get("/getSomeInfo", async (req, res, next) => {
  Inward_remittance.getSomeInfo({
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
  Inward_remittance.updatePipo(req.body.id, req.body.data, (err, resp) => {
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
