const express = require("express");
const router = express.Router();
const SECRET = process.env.SECRET;
module.exports = router;
var mongoose = require('mongoose');

router.post("/deletealldata", async (req, res) => {
  let allkeys = Object.keys(mongoose.connection?.collections);
  allkeys = allkeys?.filter((item) => item != 'user' && item != 'users' && item != 'teams' && item != 'profiledetails' && item != 'teamMember' && item != 'RoleBase_SingIn_SingUp' && item != 'CA_Certificate' && item != 'ForwardContract');
  // 
  var deletionstatus = [];
  try {
    for (let index = 0; index < allkeys.length; index++) {
      const element = allkeys[index];
      var db = await mongoose.connection.collection((element).toLowerCase());
      deletionstatus.push(db.deleteMany({ userId: req.body.companyId }))
    }
    Promise.all(deletionstatus).then((values) => {
      res.json({ staus: 200, message: "delete all data sccuessfuly...", data: values })
    }).catch((error) => {
      res.json({ staus: 400, message: "can't delete all data...", error: error })
    });
  } catch (error) {
    res.sendStatus(400).json({ staus: 400, message: "can't delete all data...", error: error })
  }
});

router.get("/getAllCompanyId", async (req, res) => {
  let allkeys = Object.keys(mongoose.connection?.collections);
  allkeys = allkeys?.filter((item) => item != 'user' && item != 'users' && item != 'teams' && item != 'profiledetails' && item != 'teamMember' && item != 'RoleBase_SingIn_SingUp' && item != 'CA_Certificate' && item != 'ForwardContract');
  var db = await mongoose.connection.model(('teams').toLowerCase());
  db.find({}).then((response) => {
    res.json({ staus: 200, message: "find data", data: response, CollectionName: allkeys })
  }).catch((error) => {
    res.json({ staus: 400, message: "somethings wrong...", error: error })
  })
});

router.post("/deletebyCollectionName", async (req, res) => {
  var deletionstatus = [];
  try {
    var db = await mongoose.connection.collection((req.body.CollectionName).toLowerCase());
    deletionstatus.push(db.deleteMany({ userId: req.body.companyId }))
    Promise.all(deletionstatus).then((values) => {
      res.json({ staus: 200, message: "delete all data sccuessfuly...", data: values })
    }).catch((error) => {
      res.json({ staus: 400, message: "can't delete all data...", error: error })
    });
  } catch (error) {
    res.sendStatus(400).json({ staus: 400, message: "can't delete all data...", error: error })
  }
});

router.post("/getCollectionNameData", async (req, res) => {
  try {
    var db = await mongoose.connection.model((req.body.CollectionName).toLowerCase());
    db.find({ userId: req.body.companyId }).then((values) => {
      res.json({ staus: 200, message: "delete all data sccuessfuly...", data: values, userId: req.body.companyId, CollectionName: req.body.CollectionName })
    }).catch((error) => {
      res.json({ staus: 400, message: "can't delete all data...", error: error, userId: req.body.companyId, CollectionName: req.body.CollectionName })
    });
  } catch (error) {
    res.json({ staus: 400, message: "can't delete all data...", error: error, userId: req.body.companyId, CollectionName: req.body.CollectionName })
  }
});

router.post("/add", async (req, res) => {
  try {
    var db = await mongoose.connection.model((req.body.CollectionName).toLowerCase());
    
    req.body.data?.forEach((element, index) => {
      delete element["_id"];
      if ((index + 1) == req.body.data?.length) {
        db.insertMany(req.body.data).then((res1) => {
          res.json({ staus: 200, message: "added all data sccuessfuly...", userId: req.body.companyId, CollectionName: req.body.CollectionName })
        }).catch((err) => res.json({ staus: 400, message: "can't delete all data...", error: error, userId: req.body.companyId, CollectionName: req.body.CollectionName }))
      }
    });
  } catch (error) {
    res.json({ staus: 400, message: "can't delete all data...", error: error, userId: req.body.companyId, CollectionName: req.body.CollectionName })
  }
});
