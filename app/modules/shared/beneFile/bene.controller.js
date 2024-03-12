const BeneModel = require("./bene.model");

function addBeneFile(newPackage, callback) {
  BeneModel.addBeneFile(newPackage, (err, res) => {
    if (err) {
      callback(err, null);
    } else if (res) {
      callback(null, res);
    } else {
      callback(null, null);
    }
  });
}

function getSingleBene(userId, callback) {
  BeneModel.getSingleBene(userId, (err, res) => {
    if (err) {
      callback(err, null);
    } else if (res) {
      callback(null, res);
    } else {
      callback(null, null);
    }
  });
}

function getBeneByName(name, callback) {
  BeneModel.getBeneByName(name, (err, res) => {
    if (err) {
      callback(err, null);
    } else if (res) {
      callback(null, res);
    } else {
      callback(null, nul);
    }
  });
}

function getBene(userId, callback) {
  BeneModel.getBene(userId, (err, res) => {
    if (err) {
      callback(err, null);
    } else if (res) {
      callback(null, res);
    } else {
      callback(null, null);
    }
  });
}

function updateBene(id, bene, callback) {
  BeneModel.updateBene(id, bene, (err, res) => {
    if (err) {
      callback(err, null);
    } else if (res) {
      callback(null, res);
    } else {
      callback(null, null);
    }
  });
}

function DeleteBene(id, callback) {
  BeneModel.DeleteBene(id, (err, res) => {
    if (err) {
      callback(err, null);
    } else if (res) {
      callback(null, res);
    } else {
      callback(null, null);
    }
  });
}


module.exports = {
  addBeneFile: addBeneFile,
  getBene: getBene,
  getSingleBene: getSingleBene,
  updateBene: updateBene,
  getBeneByName: getBeneByName,
  DeleteBene:DeleteBene
};
