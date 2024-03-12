const beneFile = require("../../projects/models/bene.model").BeneModel;
function addBeneFile(project, callback) {
  beneFile.create(project.bene, (err, res) => {
    if (err) {
      callback(err, null);
    } else if (res) {
      callback(null, res);
    } else {
      callback(null, null);
    }
  });
}

function getBene(user, callback) {
  beneFile.find({ userId: user.userId }, function (err, user) { 
    if (err) {
      callback(err, null);
    } else if (user) {
      
      callback(null, user);
    } else {
      callback(null, null);
    }
  });
}

function getSingleBene(user, callback) {
  beneFile.find({ _id: user.userId }, function (err, user) {    
    if (err) {
      callback(err, null);
    } else if (user) {
      callback(null, user);
    } else {
      callback(null, null);
    }
  });
}

function getBeneByName(name, callback) {
  beneFile.findOne({ beneName: name.beneName }, function (err, user) {
    if (err) {
      callback(err, null);
    } else if (user) {
      callback(null, user);
    } else {
      callback(null, null);
    }
  });
}

function updateBene(id, bene, callback) {
  beneFile.updateOne(
    {
      _id: id,
    },
    { $set: bene },
    function (err, user) {
      
      if (err) {
        
        callback(err, null);
      } else if (user) {
        
        callback(null, user);
      } else {
        callback(null, null);
      }
    }
  );
}

function DeleteBene(id, callback) {
  beneFile.deleteOne({_id: id},function (err, user) {
      if (err) {
        callback(err, null);
      } else if (user) {
        callback(null, user);
      } else {
        callback(null, null);
      }
    }
  );
}

module.exports = {
  addBeneFile: addBeneFile,
  getBene: getBene,
  getSingleBene: getSingleBene,
  updateBene: updateBene,
  getBeneByName: getBeneByName,
  DeleteBene:DeleteBene
};
